"use client";

import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";

const MINISTRY_EMAIL = "contact@isaiah358.com";

type PublishedTestimony = {
  id: string;
  display_name: string;
  testimony: string;
  published_at: string;
};

type TestimonyFormData = {
  name: string;
  phone: string;
  email: string;
  testimony: string;
  permissionToShare: boolean;
};

const initialFormData: TestimonyFormData = {
  name: "",
  phone: "",
  email: "",
  testimony: "",
  permissionToShare: false,
};

export default function TestimonialSection() {
  const supabase = useMemo(
    () =>
      createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
      ),
    []
  );

  const [testimonials, setTestimonials] = useState<PublishedTestimony[]>([]);
  const [loadingTestimonials, setLoadingTestimonials] = useState(true);
  const [testimonialsError, setTestimonialsError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<TestimonyFormData>(initialFormData);
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [emailNotice, setEmailNotice] = useState("");

  useEffect(() => {
    let active = true;

    async function loadTestimonials() {
      const { data, error } = await supabase.rpc(
        "get_published_testimonials"
      );

      if (!active) return;

      if (error) {
        setTestimonialsError(
          "Approved testimonies could not be loaded right now."
        );
      } else {
        setTestimonials((data ?? []) as PublishedTestimony[]);
      }

      setLoadingTestimonials(false);
    }

    void loadTestimonials();

    return () => {
      active = false;
    };
  }, [supabase]);

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value, type } = event.target;
    const checked =
      type === "checkbox" && "checked" in event.target
        ? event.target.checked
        : false;

    setFormData((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;

    setSending(true);
    setSubmitError("");
    setEmailNotice("");

    const name = formData.name.trim();
    const phone = formData.phone.trim();
    const email = formData.email.trim();
    const testimony = formData.testimony.trim();

    try {
      const { error } = await supabase.rpc("submit_testimony", {
        p_name: name,
        p_phone: phone,
        p_email: email,
        p_testimony: testimony,
        p_permission_to_share: formData.permissionToShare,
      });

      if (error) throw error;

      // The database submission is complete. Request the existing email
      // notification separately so an email problem cannot discard the story.
      try {
        const response = await fetch(
          `https://formsubmit.co/ajax/${MINISTRY_EMAIL}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              _subject: `Website Testimony from ${name}`,
              _template: "table",
              formType: "Website Testimony",
              name,
              phone: phone || "Not provided",
              email: email || "Not provided",
              permissionToShare: formData.permissionToShare ? "Yes" : "No",
              testimony,
            }),
          }
        );

        const result = await response.json().catch(() => null);

        if (
          !response.ok ||
          result?.success === false ||
          result?.success === "false"
        ) {
          setEmailNotice(
            "Your testimony was saved for ministry review, but the email notification did not go through."
          );
        }
      } catch {
        setEmailNotice(
          "Your testimony was saved for ministry review, but the email notification did not go through."
        );
      }

      setSubmitted(true);
      setFormData(initialFormData);
    } catch {
      setSubmitError(
        "We could not save your testimony. Please check your connection and try again."
      );
    } finally {
      setSending(false);
    }
  }

  function openForm() {
    setShowForm(true);

    requestAnimationFrame(() => {
      document.getElementById("testimonial-submit-form")?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    });
  }

  function resetForm() {
    setFormData(initialFormData);
    setSubmitted(false);
    setShowForm(false);
    setSubmitError("");
    setEmailNotice("");
    setSending(false);
  }

  return (
    <section id="testimonials" className="testimonial-section">
      <div className="testimonial-background" />

      <div className="testimonial-starfield" aria-hidden="true">
        {Array.from({ length: 34 }, (_, index) => (
          <span
            key={index}
            className={`testimonial-star testimonial-star-${(index % 12) + 1}`}
          />
        ))}
      </div>

      <div
        className="testimonial-transition-bridge"
        aria-hidden="true"
      />

      <div className="testimonial-light-streaks" aria-hidden="true">
        <span className="testimonial-streak streak-one" />
        <span className="testimonial-streak streak-two" />
        <span className="testimonial-streak streak-three" />
        <span className="testimonial-streak streak-four" />
        <span className="testimonial-streak streak-five" />
      </div>

      <div className="testimonial-overlay" />

      <div className="testimonial-inner">
        <div className="testimonial-heading">
          <p className="testimonial-eyebrow">Stories Of Faith</p>
          <h2 className="testimonial-title">Testimonies</h2>
          <p className="testimonial-intro">
            Every testimony is a reminder that God is still moving,
            still answering, and still transforming lives.
          </p>
          <div className="testimonial-heading-line" aria-hidden="true">
            <span />
          </div>
        </div>

        {loadingTestimonials && (
          <p className="testimonial-intro" role="status">
            Loading testimonies...
          </p>
        )}

        {testimonialsError && (
          <p className="testimonial-intro" role="alert">
            {testimonialsError}
          </p>
        )}

        {!loadingTestimonials && !testimonialsError && (
          <div className="testimonial-grid">
            {testimonials.length > 0 ? (
              testimonials.map((testimonial, index) => (
                <article key={testimonial.id} className="testimonial-card">
                  <div className="testimonial-glow" aria-hidden="true" />
                  <div
                    className="testimonial-quote-mark"
                    aria-hidden="true"
                  >
                    “
                  </div>

                  <p className="testimonial-card-label">
                    Testimony {index + 1}
                  </p>

                  <blockquote>{testimonial.testimony}</blockquote>

                  <div className="testimonial-person">
                    <span className="testimonial-person-line" />
                    <p>{testimonial.display_name}</p>
                  </div>

                  <span
                    className="testimonial-number"
                    aria-hidden="true"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </article>
              ))
            ) : (
              <article className="testimonial-card">
                <div className="testimonial-glow" aria-hidden="true" />
                <div
                  className="testimonial-quote-mark"
                  aria-hidden="true"
                >
                  “
                </div>
                <p className="testimonial-card-label">Stories Of Faith</p>
                <blockquote>
                  Approved testimonies will appear here soon.
                </blockquote>
                <div className="testimonial-person">
                  <span className="testimonial-person-line" />
                  <p>Isaiah 35:8 Ministries</p>
                </div>
              </article>
            )}
          </div>
        )}

        <div className="testimonial-share">
          <p className="testimonial-share-eyebrow">Your Story Matters</p>
          <h3>Has God Done Something In Your Life?</h3>
          <p>
            We would love to hear how God has moved in your life,
            answered a prayer, strengthened your faith, or used Isaiah
            35:8 Ministries to encourage you.
          </p>

          <button
            type="button"
            className="testimonial-share-button"
            onClick={openForm}
          >
            <span>Share Your Testimony</span>
            <span aria-hidden="true">→</span>
          </button>
        </div>

        {showForm && (
          <div
            id="testimonial-submit-form"
            className="testimonial-form-card"
          >
            {!submitted ? (
              <>
                <div className="testimonial-form-heading">
                  <p className="testimonial-share-eyebrow">
                    Share Your Story
                  </p>
                  <h3>Submit Your Testimony</h3>
                  <p>
                    Tell us what God has done in your life. The ministry
                    will review your testimony before sharing it publicly.
                  </p>
                </div>

                <form
                  className="testimonial-form"
                  onSubmit={handleSubmit}
                >
                  <div className="testimonial-field-row">
                    <label className="testimonial-field">
                      <span>Name</span>
                      <input
                        type="text"
                        name="name"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </label>

                    <label className="testimonial-field">
                      <span>Phone</span>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Phone number"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </label>

                    <label className="testimonial-field">
                      <span>Email (Optional)</span>
                      <input
                        type="email"
                        name="email"
                        placeholder="Email address"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </label>
                  </div>

                  <label className="testimonial-field">
                    <span>Your Testimony</span>
                    <textarea
                      name="testimony"
                      rows={8}
                      placeholder="Share your testimony..."
                      value={formData.testimony}
                      onChange={handleChange}
                      minLength={10}
                      required
                    />
                  </label>

                  <label className="testimonial-permission">
                    <input
                      type="checkbox"
                      name="permissionToShare"
                      checked={formData.permissionToShare}
                      onChange={handleChange}
                    />
                    <span>
                      I give Isaiah 35:8 Ministries permission to share
                      this testimony publicly.
                    </span>
                  </label>

                  <button
                    type="submit"
                    className="testimonial-submit-button"
                    disabled={sending}
                  >
                    <span>
                      {sending ? "Sending Testimony..." : "Send Testimony"}
                    </span>
                    <span aria-hidden="true">→</span>
                  </button>

                  {submitError && (
                    <p className="testimonial-form-error" role="alert">
                      {submitError}
                    </p>
                  )}

                  <p className="testimonial-form-note">
                    Your testimony will be saved for ministry review.
                    Stories are shared publicly only with your permission
                    and after approval.
                  </p>
                </form>
              </>
            ) : (
              <div className="testimonial-confirmation">
                <div className="testimonial-confetti" aria-hidden="true">
                  {Array.from({ length: 34 }, (_, index) => (
                    <span
                      key={index}
                      className={`testimonial-confetti-piece testimonial-confetti-${(index % 12) + 1}`}
                    />
                  ))}
                </div>

                <div
                  className="testimonial-confirmation-star"
                  aria-hidden="true"
                >
                  ✦
                </div>

                <p className="testimonial-share-eyebrow">
                  Thank You For Sharing
                </p>
                <h3>Your Testimony Was Submitted</h3>
                <p>
                  Your testimony has been saved for Isaiah 35:8
                  Ministries to review. Thank you for sharing your
                  story of faith.
                </p>

                {emailNotice && (
                  <p className="testimonial-form-error" role="status">
                    {emailNotice}
                  </p>
                )}

                <div className="testimonial-confirmation-actions">
                  <button
                    type="button"
                    className="testimonial-submit-button"
                    onClick={resetForm}
                  >
                    Submit Another Testimony
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}