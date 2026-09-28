"use client";

import { ChangeEvent, FormEvent, useState } from "react";

const MINISTRY_EMAIL =
  "contact@isaiah358.com";

type PrayerFormData = {
  name: string;
  phone: string;
  email: string;
  request: string;
  isPrivate: boolean;
};

const initialFormData: PrayerFormData = {
  name: "",
  phone: "",
  email: "",
  request: "",
  isPrivate: false,
};

export default function PrayerSection() {
  const [formData, setFormData] =
    useState<PrayerFormData>(initialFormData);

  const [submitted, setSubmitted] =
    useState(false);

  const [sending, setSending] =
    useState(false);

  const [submitError, setSubmitError] =
    useState("");

  function handleChange(
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) {
    const { name, value, type } = event.target;

    const checked =
      type === "checkbox" &&
      "checked" in event.target
        ? event.target.checked
        : false;

    setFormData((previous) => ({
      ...previous,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (sending) return;

    setSending(true);
    setSubmitError("");

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
            _subject: `Prayer Request from ${
              formData.name.trim() || "Website Visitor"
            }`,
            _template: "table",
            formType: "Prayer Request",
            name: formData.name,
            phone: formData.phone || "Not provided",
            email: formData.email || "Not provided",
            privateRequest: formData.isPrivate ? "Yes" : "No",
            prayerRequest: formData.request,
          }),
        }
      );

      const result = await response.json().catch(() => null);

      if (
        !response.ok ||
        result?.success === false ||
        result?.success === "false"
      ) {
        throw new Error("Prayer request delivery failed.");
      }

      setSubmitted(true);
      setFormData(initialFormData);
    } catch {
      setSubmitError(
        "We could not send your prayer request. Please check your connection and try again."
      );
    } finally {
      setSending(false);
    }
  }

  function handleReset() {
    setFormData(initialFormData);
    setSubmitted(false);
    setSubmitError("");
    setSending(false);
  }

  return (
    <section
      id="prayer"
      className="prayer-section"
    >
      <div className="prayer-background" />

      <div
        className="prayer-dove-layer"
        aria-hidden="true"
      >
        <div className="prayer-dove prayer-dove-one">
          <img
            src="/prayer/prayer-dove-1.png"
            alt=""
            className="prayer-dove-image prayer-dove-flap-fast"
          />
        </div>

        <div className="prayer-dove prayer-dove-two">
          <img
            src="/prayer/prayer-dove-2.png"
            alt=""
            className="prayer-dove-image prayer-dove-flap-medium"
          />
        </div>

        <div className="prayer-dove prayer-dove-three">
          <img
            src="/prayer/prayer-dove-3.png"
            alt=""
            className="prayer-dove-image prayer-dove-flap-slow"
          />
        </div>

        <div className="prayer-dove prayer-dove-four">
          <img
            src="/prayer/prayer-dove-1.png"
            alt=""
            className="prayer-dove-image prayer-dove-flap-medium"
          />
        </div>

        <div className="prayer-dove prayer-dove-five">
          <img
            src="/prayer/prayer-dove-2.png"
            alt=""
            className="prayer-dove-image prayer-dove-flap-fast"
          />
        </div>

        <div className="prayer-dove prayer-dove-six">
          <img
            src="/prayer/prayer-dove-3.png"
            alt=""
            className="prayer-dove-image prayer-dove-flap-slow"
          />
        </div>
      </div>

      <div className="prayer-overlay" />

      <div className="prayer-inner">
        <div className="prayer-heading">
          <p className="prayer-eyebrow">
            We Believe In Prayer
          </p>

          <h2 className="prayer-title">
            Prayer Changes Things
          </h2>

          <p className="prayer-intro">
            Whatever you are carrying, you do not have
            to carry it alone. Isaiah 35:8 Ministries
            is here to stand with you in faith and prayer.
          </p>
        </div>

        <div className="prayer-grid">
          <div className="prayer-message-card">
            <div className="prayer-message-glow" />

            <p className="prayer-card-eyebrow">
              A Place To Be Heard
            </p>

            <h3>
              How Can We Pray For You?
            </h3>

            <p>
              Share what is on your heart. Prayer
              requests can be kept private, and our
              ministry will be able to lift your need
              before God in prayer.
            </p>

            <div className="prayer-scripture">
              <span className="prayer-quote">
                “
              </span>

              <p>
                The effectual fervent prayer of a
                righteous man availeth much.
              </p>

              <span>
                James 5:16
              </span>
            </div>
          </div>

          <div
            id="prayer-request"
            className="prayer-form-card"
          >
            {!submitted ? (
              <>
                <div className="prayer-form-heading">
                  <p className="prayer-card-eyebrow">
                    Prayer Request
                  </p>

                  <h3>
                    Share Your Request
                  </h3>

                  <p>
                    Fill out the form below and send your
                    request directly to our ministry prayer
                    team without leaving the website.
                  </p>
                </div>

                <form
                  className="prayer-form"
                  onSubmit={handleSubmit}
                >
                  <div className="prayer-field-row prayer-field-row-three">
                    <label className="prayer-field">
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

                    <label className="prayer-field">
                      <span>Phone Number</span>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Phone number"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </label>

                    <label className="prayer-field">
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

                  <label className="prayer-field">
                    <span>Prayer Request</span>
                    <textarea
                      name="request"
                      rows={7}
                      placeholder="Share your prayer request..."
                      value={formData.request}
                      onChange={handleChange}
                      required
                    />
                  </label>

                  <label className="prayer-private">
                    <input
                      type="checkbox"
                      name="isPrivate"
                      checked={formData.isPrivate}
                      onChange={handleChange}
                    />

                    <span>
                      Keep this prayer request private.
                    </span>
                  </label>

                  <button
                    type="submit"
                    className="prayer-submit-button"
                    disabled={sending}
                  >
                    <span>
                      {sending
                        ? "Sending Prayer Request..."
                        : "Send Prayer Request"}
                    </span>
                    <span aria-hidden="true">→</span>
                  </button>

                  {submitError && (
                    <p className="prayer-form-error" role="alert">
                      {submitError}
                    </p>
                  )}

                  <p className="prayer-form-note">
                    Your request will be delivered securely
                    to {MINISTRY_EMAIL}.
                  </p>
                </form>
              </>
            ) : (
              <div className="prayer-confirmation-card">
                <div
                  className="prayer-confetti"
                  aria-hidden="true"
                >
                  <span className="prayer-confetti-piece confetti-one" />
                  <span className="prayer-confetti-piece confetti-two" />
                  <span className="prayer-confetti-piece confetti-three" />
                  <span className="prayer-confetti-piece confetti-four" />
                  <span className="prayer-confetti-piece confetti-five" />
                  <span className="prayer-confetti-piece confetti-six" />
                  <span className="prayer-confetti-piece confetti-seven" />
                  <span className="prayer-confetti-piece confetti-eight" />
                  <span className="prayer-confetti-piece confetti-nine" />
                  <span className="prayer-confetti-piece confetti-ten" />
                  <span className="prayer-confetti-piece confetti-eleven" />
                  <span className="prayer-confetti-piece confetti-twelve" />
                </div>

                <div className="prayer-confirmation-icon">
                  <span aria-hidden="true">🙏</span>
                </div>

                <p className="prayer-card-eyebrow">
                  Thank You For Sharing
                </p>

                <h3>
                  Your Prayer Request Was Sent
                </h3>

                <p className="prayer-confirmation-text">
                  Your prayer request has been submitted to
                  Isaiah 35:8 Ministries. We will be standing
                  with you in faith and prayer.
                </p>

                <div className="prayer-confirmation-actions">
                  <button
                    type="button"
                    className="prayer-submit-button prayer-confirmation-link"
                    onClick={handleReset}
                  >
                    <span>Send Another Request</span>
                    <span aria-hidden="true">→</span>
                  </button>
                </div>

                <p className="prayer-form-note">
                  Prayer requests are sent to{" "}
                  {MINISTRY_EMAIL}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
