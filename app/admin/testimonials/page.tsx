"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";

const ADMIN_EMAIL = "contact@isaiah358.com";

type Testimony = {
  id: string;
  name: string;
  phone: string | null;
  email: string | null;
  testimony: string;
  permission_to_share: boolean;
  published_name: string | null;
  status: string;
  created_at: string;
};

type StatusFilter = "all" | "pending" | "approved" | "rejected";

const box: React.CSSProperties = {
  background: "rgba(29, 21, 29, 0.94)",
  border: "1px solid rgba(235, 199, 125, 0.45)",
  borderRadius: 18,
  padding: 24,
};

const field: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: 8,
  border: "1px solid #bda778",
  background: "#fff",
  color: "#241820",
};

const button: React.CSSProperties = {
  padding: "11px 18px",
  borderRadius: 8,
  border: 0,
  background: "#e9c878",
  color: "#241820",
  fontWeight: 700,
  cursor: "pointer",
};

export default function TestimonialAdminPage() {
  const supabase = useMemo(
    () =>
      createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
      ),
    []
  );

  const [code, setCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [checking, setChecking] = useState(true);
  const [testimonies, setTestimonies] = useState<Testimony[]>([]);
  const [displayNames, setDisplayNames] = useState<Record<string, string>>({});
  const [busyId, setBusyId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("pending");

  const loadTestimonies = useCallback(async () => {
    const { data, error } = await supabase
      .from("testimonials")
      .select(
        "id, name, phone, email, testimony, permission_to_share, published_name, status, created_at"
      )
      .order("created_at", { ascending: false });

    if (error) {
      setMessage(`Could not load testimonies: ${error.message}`);
      return;
    }

    const rows = (data ?? []) as Testimony[];
    setTestimonies(rows);

    setDisplayNames((current) => {
      const next = { ...current };
      for (const row of rows) {
        if (!(row.id in next)) {
          next[row.id] = row.published_name || row.name;
        }
      }
      return next;
    });
  }, [supabase]);

  const visibleTestimonies = useMemo(
    () =>
      statusFilter === "all"
        ? testimonies
        : testimonies.filter((row) => row.status === statusFilter),
    [statusFilter, testimonies]
  );

  const statusCounts = useMemo(
    () => ({
      all: testimonies.length,
      pending: testimonies.filter((row) => row.status === "pending").length,
      approved: testimonies.filter((row) => row.status === "approved").length,
      rejected: testimonies.filter((row) => row.status === "rejected").length,
    }),
    [testimonies]
  );

  useEffect(() => {
    let active = true;

    async function checkLogin() {
      const { data, error } = await supabase.auth.getUser();
      if (!active) return;

      if (!error && data.user?.email?.toLowerCase() === ADMIN_EMAIL) {
        setSignedIn(true);
        await loadTestimonies();
      }

      if (active) setChecking(false);
    }

    void checkLogin();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!active) return;

      const signedInAsAdmin =
        session?.user.email?.toLowerCase() === ADMIN_EMAIL;

      setSignedIn(signedInAsAdmin);
      setChecking(false);

      if (signedInAsAdmin) {
        void loadTestimonies();
      }
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [supabase, loadTestimonies]);

  async function sendCode() {
    setMessage("");
    setSending(true);

    const { error } = await supabase.auth.signInWithOtp({
      email: ADMIN_EMAIL,
      options: {
        shouldCreateUser: false,
        emailRedirectTo: `${window.location.origin}/admin/testimonials`,
      },
    });

    setSending(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    setCodeSent(true);
    setMessage(
      `Check ${ADMIN_EMAIL}. Enter the six-digit code here, or use the email link; both return to this review dashboard.`
    );
  }

  async function verifyCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    const enteredCode = code.trim();
    if (!/^\d{6}$/.test(enteredCode)) {
      setMessage("Enter the six-digit code from the email.");
      return;
    }

    setSending(true);
    const { data, error } = await supabase.auth.verifyOtp({
      email: ADMIN_EMAIL,
      token: enteredCode,
      type: "email",
    });
    setSending(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    if (data.user?.email?.toLowerCase() !== ADMIN_EMAIL) {
      await supabase.auth.signOut();
      setMessage("This account is not authorized to review testimonies.");
      return;
    }

    setCode("");
    setSignedIn(true);
    await loadTestimonies();
  }

  async function handleSignOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      setMessage(error.message);
      return;
    }

    setSignedIn(false);
    setCodeSent(false);
    setCode("");
    setTestimonies([]);
    setMessage("");
  }

  async function review(row: Testimony, decision: "approved" | "rejected") {
    setMessage("");

    if (decision === "approved" && !row.permission_to_share) {
      setMessage("This person did not give permission to share their story.");
      return;
    }

    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || userData.user?.email?.toLowerCase() !== ADMIN_EMAIL) {
      setSignedIn(false);
      setMessage("Your admin session has ended. Please sign in again.");
      return;
    }

    const publishedName = (displayNames[row.id] || row.name).trim();

    if (decision === "approved" && !publishedName) {
      setMessage("Enter a public display name before approving.");
      return;
    }

    setBusyId(row.id);

    const { data, error } = await supabase
      .from("testimonials")
      .update({
        status: decision,
        published_name: decision === "approved" ? publishedName : null,
      })
      .eq("id", row.id)
      .select("id");

    setBusyId(null);

    if (error) {
      setMessage(`Could not save decision: ${error.message}`);
      return;
    }

    if (!data?.length) {
      setMessage("No testimony was updated. Refresh the list and try again.");
      await loadTestimonies();
      return;
    }

    setMessage(
      decision === "approved"
        ? "Testimony published. It will appear after the public page refreshes."
        : row.status === "approved"
          ? "Testimony removed from the public website."
          : "Testimony rejected."
    );

    await loadTestimonies();
  }

  async function deleteTestimony(row: Testimony) {
    setMessage("");

    const confirmed = window.confirm(
      `Permanently delete the testimony from ${row.name}? This cannot be undone.`
    );

    if (!confirmed) return;

    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || userData.user?.email?.toLowerCase() !== ADMIN_EMAIL) {
      setSignedIn(false);
      setMessage("Your admin session has ended. Please sign in again.");
      return;
    }

    setBusyId(row.id);

    const { data, error } = await supabase
      .from("testimonials")
      .delete()
      .eq("id", row.id)
      .select("id");

    setBusyId(null);

    if (error) {
      setMessage(`Could not delete testimony: ${error.message}`);
      return;
    }

    if (!data?.length) {
      setMessage(
        "The testimony was not deleted. The Supabase delete policy may still need to be added."
      );
      return;
    }

    setMessage("Testimony permanently deleted.");
    await loadTestimonies();
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "clamp(24px, 5vw, 72px)",
        background:
          "radial-gradient(circle at top, #493224, #1a151d 65%, #100e16)",
        color: "#fff5dc",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ maxWidth: 850, margin: "0 auto" }}>
        <p style={{ color: "#e9c878", letterSpacing: 3 }}>
          ISAIAH 35:8 MINISTRIES
        </p>
        <h1 style={{ fontSize: "clamp(30px, 5vw, 48px)" }}>
          Testimony Review
        </h1>

        {message && (
          <p role="status" style={{ color: "#f3d995", lineHeight: 1.5 }}>
            {message}
          </p>
        )}

        {checking ? (
          <p>Checking your admin session…</p>
        ) : !signedIn ? (
          <div style={{ ...box, maxWidth: 460 }}>
            <h2>Church admin sign in</h2>
            <p>Sign in as {ADMIN_EMAIL} using a code sent by email.</p>

            {!codeSent ? (
              <button
                type="button"
                onClick={() => void sendCode()}
                disabled={sending}
                style={{ ...button, opacity: sending ? 0.5 : 1 }}
              >
                {sending ? "Sending…" : "Email me a sign-in code"}
              </button>
            ) : (
              <>
                <form onSubmit={verifyCode}>
                  <label htmlFor="admin-code">Six-digit email code</label>
                  <input
                    id="admin-code"
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    maxLength={6}
                    required
                    value={code}
                    onChange={(event) => setCode(event.target.value)}
                    style={{ ...field, margin: "8px 0 20px" }}
                  />

                  <button
                    type="submit"
                    disabled={sending}
                    style={{ ...button, opacity: sending ? 0.5 : 1 }}
                  >
                    {sending ? "Checking…" : "Sign in"}
                  </button>
                </form>

                <button
                  type="button"
                  onClick={() => void sendCode()}
                  disabled={sending}
                  style={{
                    ...button,
                    background: "transparent",
                    color: "#f3d995",
                    marginTop: 14,
                    paddingLeft: 0,
                  }}
                >
                  Send a new code
                </button>
              </>
            )}
          </div>
        ) : (
          <>
            <div
              style={{
                display: "flex",
                gap: 12,
                flexWrap: "wrap",
                marginBottom: 24,
              }}
            >
              <button
                type="button"
                onClick={() => void loadTestimonies()}
                style={button}
              >
                Refresh list
              </button>
              <button
                type="button"
                onClick={() => void handleSignOut()}
                style={{ ...button, background: "#eee4d3" }}
              >
                Sign out
              </button>
            </div>

            <div
              aria-label="Filter testimonies"
              style={{
                display: "flex",
                gap: 10,
                flexWrap: "wrap",
                marginBottom: 24,
              }}
            >
              {(
                [
                  ["pending", "Pending"],
                  ["approved", "Published"],
                  ["rejected", "Rejected"],
                  ["all", "All"],
                ] as const
              ).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={statusFilter === value}
                  onClick={() => setStatusFilter(value)}
                  style={{
                    ...button,
                    background:
                      statusFilter === value ? "#e9c878" : "transparent",
                    color: statusFilter === value ? "#241820" : "#f3d995",
                    border: "1px solid rgba(235, 199, 125, 0.55)",
                  }}
                >
                  {label} ({statusCounts[value]})
                </button>
              ))}
            </div>

            {visibleTestimonies.length === 0 ? (
              <div style={box}>No testimonies in this category.</div>
            ) : (
              visibleTestimonies.map((row) => (
                <article key={row.id} style={{ ...box, marginBottom: 18 }}>
                  <p style={{ color: "#e9c878" }}>
                    Submitted by {row.name}
                    {row.created_at
                      ? ` · ${new Date(row.created_at).toLocaleString()}`
                      : ""}
                  </p>

                  <p>
                    Status:{" "}
                    <strong style={{ textTransform: "capitalize" }}>
                      {row.status === "approved" ? "Published" : row.status}
                    </strong>
                  </p>

                  <p style={{ whiteSpace: "pre-wrap", lineHeight: 1.7 }}>
                    {row.testimony}
                  </p>

                  <p>
                    Permission to share:{" "}
                    <strong>{row.permission_to_share ? "Yes" : "No"}</strong>
                  </p>

                  <p>
                    Contact: {row.email || "No email"}
                    {row.phone ? ` · ${row.phone}` : ""}
                  </p>

                  <label htmlFor={`display-name-${row.id}`}>
                    Public display name
                  </label>
                  <input
                    id={`display-name-${row.id}`}
                    value={displayNames[row.id] ?? row.name}
                    onChange={(event) =>
                      setDisplayNames((current) => ({
                        ...current,
                        [row.id]: event.target.value,
                      }))
                    }
                    style={{
                      ...field,
                      display: "block",
                      maxWidth: 340,
                      margin: "8px 0 18px",
                    }}
                  />

                  <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                    {row.status === "pending" && (
                      <>
                        <button
                          type="button"
                          disabled={busyId !== null || !row.permission_to_share}
                          onClick={() => void review(row, "approved")}
                          style={{
                            ...button,
                            opacity:
                              busyId !== null || !row.permission_to_share
                                ? 0.5
                                : 1,
                          }}
                        >
                          Approve and publish
                        </button>
                        <button
                          type="button"
                          disabled={busyId !== null}
                          onClick={() => void review(row, "rejected")}
                          style={{
                            ...button,
                            background: "#eee4d3",
                            opacity: busyId !== null ? 0.5 : 1,
                          }}
                        >
                          Reject
                        </button>
                      </>
                    )}

                    {row.status === "approved" && (
                      <button
                        type="button"
                        disabled={busyId !== null}
                        onClick={() => void review(row, "rejected")}
                        style={{
                          ...button,
                          background: "#eee4d3",
                          opacity: busyId !== null ? 0.5 : 1,
                        }}
                      >
                        Remove from website
                      </button>
                    )}

                    {row.status === "rejected" && (
                      <button
                        type="button"
                        disabled={busyId !== null || !row.permission_to_share}
                        onClick={() => void review(row, "approved")}
                        style={{
                          ...button,
                          opacity:
                            busyId !== null || !row.permission_to_share ? 0.5 : 1,
                        }}
                      >
                        Publish again
                      </button>
                    )}

                    <button
                      type="button"
                      disabled={busyId !== null}
                      onClick={() => void deleteTestimony(row)}
                      style={{
                        ...button,
                        background: "#8f2635",
                        color: "#fff",
                        opacity: busyId !== null ? 0.5 : 1,
                      }}
                    >
                      {busyId === row.id ? "Working…" : "Delete permanently"}
                    </button>
                  </div>
                </article>
              ))
            )}
          </>
        )}
      </div>
    </main>
  );
}
