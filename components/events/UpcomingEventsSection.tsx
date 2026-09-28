"use client";

import { useEffect, useState, type FormEvent } from "react";

const MINISTRY_EMAIL = "contact@isaiah358.com";

const months = [
  "january", "february", "march", "april", "may", "june",
  "july", "august", "september", "october", "november", "december",
];

const doves = [
  { src: "/prayer/prayer-dove-1.png", className: "events-dove-one" },
  { src: "/prayer/prayer-dove-2.png", className: "events-dove-two" },
  { src: "/prayer/prayer-dove-3.png", className: "events-dove-three" },
  { src: "/prayer/prayer-dove-1.png", className: "events-dove-four" },
  { src: "/prayer/prayer-dove-2.png", className: "events-dove-five" },
  { src: "/prayer/prayer-dove-3.png", className: "events-dove-six" },
  { src: "/prayer/prayer-dove-1.png", className: "events-dove-seven" },
  { src: "/prayer/prayer-dove-2.png", className: "events-dove-eight" },
  { src: "/prayer/prayer-dove-3.png", className: "events-dove-nine" },
  { src: "/prayer/prayer-dove-1.png", className: "events-dove-ten" },
];

const events = [
  {
    month: "SEP",
    day: "26",
    year: "2026",
    title: '"Tea Talk" Brunch',
    time: "11:00 AM",
    note: "Free admission with RSVP",
    className: "event-card-featured",
    requiresRsvp: true,
  },
  {
    month: "OCT",
    day: "23–25",
    year: "2026",
    title: "Church Anniversary",
    time: "",
    note: "Three-day anniversary celebration",
    className: "",
    requiresRsvp: false,
  },
  {
    month: "NOV",
    day: "29",
    year: "2026",
    title: "Jacob's Blessings",
    time: "3:00 PM",
    note: "",
    className: "",
    requiresRsvp: false,
  },
  {
    month: "FEB",
    day: "19–20",
    year: "",
    title: "Wise Women's Conference",
    time: "",
    note: "",
    className: "",
    requiresRsvp: false,
  },
];

type EventItem = (typeof events)[number];
type SubmitStatus = "idle" | "sending" | "success" | "error";

export default function UpcomingEventsSection() {
  const [rsvpEvent, setRsvpEvent] = useState<EventItem | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [guests, setGuests] = useState("1");
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");

  useEffect(() => {
    if (!rsvpEvent) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && submitStatus !== "sending") {
        setRsvpEvent(null);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [rsvpEvent, submitStatus]);

  const submitRsvp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!rsvpEvent || submitStatus === "sending") return;

    setSubmitStatus("sending");

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
            _subject: `New RSVP — ${rsvpEvent.title}`,
            event: rsvpEvent.title,
            date: `${rsvpEvent.month} ${rsvpEvent.day}${
              rsvpEvent.year ? `, ${rsvpEvent.year}` : ""
            }`,
            time: rsvpEvent.time || "To be announced",
            name: name.trim(),
            email: email.trim(),
            phone: phone.trim() || "Not provided",
            number_attending: guests,
          }),
        }
      );

      const result = (await response.json()) as {
        success?: boolean | string;
        message?: string;
      };

      if (
        !response.ok ||
        (result.success !== true && result.success !== "true")
      ) {
        throw new Error(result.message || "RSVP submission failed.");
      }

      setSubmitStatus("success");
    } catch (error) {
      console.error("RSVP submission error:", error);
      setSubmitStatus("error");
    }
  };

  const closeRsvp = () => {
    if (submitStatus === "sending") return;
    setRsvpEvent(null);
    setName("");
    setEmail("");
    setPhone("");
    setGuests("1");
    setSubmitStatus("idle");
  };

  return (
    <section id="events" className="events-section">
      <div className="events-background" />
      <div className="events-shade" />

      <div className="events-calendar-layer" aria-hidden="true">
        {months.map((month, index) => (
          <img
            key={month}
            src={`/events/calendar-${month}.png`}
            alt=""
            className={`events-calendar-page events-calendar-page-${index + 1}`}
          />
        ))}
      </div>

      <div className="events-dove-layer" aria-hidden="true">
        {doves.map((dove, index) => (
          <div
            key={`${dove.src}-${index}`}
            className={`events-dove-wrap ${dove.className}`}
          >
            <img src={dove.src} alt="" className="events-dove-image" />
          </div>
        ))}
      </div>

      <div className="events-inner">
        <header className="events-heading">
          <p className="events-eyebrow">Stay Connected</p>
          <h2 className="events-title">Upcoming Events</h2>
          <p className="events-intro">
            Join Isaiah 35:8 Ministries for worship, fellowship, special
            gatherings, and upcoming ministry opportunities.
          </p>
        </header>

        <div className="events-grid events-grid-real">
          {events.map((event, index) => (
            <article
              key={`${event.month}-${event.day}-${event.title}`}
              className={`event-card event-card-real ${event.className}`}
            >
              <div className="event-date-block">
                <span className="event-date-month">{event.month}</span>
                <span className="event-date-day">{event.day}</span>
                {event.year && (
                  <span className="event-date-year">{event.year}</span>
                )}
              </div>

              <div className="event-real-copy">
                <p className="event-status">
                  {index === 0 ? "Next Event" : "Upcoming"}
                </p>
                <h3>{event.title}</h3>
                {event.time && (
                  <p className="event-time">{event.time}</p>
                )}
                {event.note && (
                  <p className="event-description">{event.note}</p>
                )}
                {event.requiresRsvp && (
                  <button
                    type="button"
                    className="event-rsvp-button"
                    onClick={() => setRsvpEvent(event)}
                  >
                    RSVP Now <span aria-hidden="true">→</span>
                  </button>
                )}
              </div>

              <span className="event-card-number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
            </article>
          ))}
        </div>
      </div>

      {rsvpEvent && (
        <div
          className="event-rsvp-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) closeRsvp();
          }}
        >
          <form
            className="event-rsvp-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="event-rsvp-title"
            onSubmit={submitRsvp}
          >
            <button
              type="button"
              className="event-rsvp-close"
              aria-label="Close RSVP form"
              onClick={closeRsvp}
              disabled={submitStatus === "sending"}
            >
              ×
            </button>

            <p className="event-rsvp-eyebrow">Reserve Your Place</p>
            <h3 id="event-rsvp-title">{rsvpEvent.title}</h3>
            <p className="event-rsvp-date">
              {rsvpEvent.month} {rsvpEvent.day}
              {rsvpEvent.year ? `, ${rsvpEvent.year}` : ""}
              {rsvpEvent.time ? ` • ${rsvpEvent.time}` : ""}
            </p>

            {submitStatus === "success" ? (
              <div role="status">
                <p>Thank you! Your RSVP has been submitted.</p>
                <button
                  type="button"
                  className="event-rsvp-submit"
                  onClick={closeRsvp}
                >
                  Done
                </button>
              </div>
            ) : (
              <>
                <label>
                  Full Name
                  <input
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                    disabled={submitStatus === "sending"}
                  />
                </label>

                <label>
                  Email Address
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                    disabled={submitStatus === "sending"}
                  />
                </label>

                <label>
                  Phone Number <span>(optional)</span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    disabled={submitStatus === "sending"}
                  />
                </label>

                <label>
                  Number Attending
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={guests}
                    onChange={(event) => setGuests(event.target.value)}
                    required
                    disabled={submitStatus === "sending"}
                  />
                </label>

                <button
                  type="submit"
                  className="event-rsvp-submit"
                  disabled={submitStatus === "sending"}
                >
                  {submitStatus === "sending" ? "Sending…" : "Send RSVP"}
                </button>

                {submitStatus === "error" && (
                  <p role="alert">
                    We couldn’t send your RSVP. Please try again.
                  </p>
                )}
              </>
            )}
          </form>
        </div>
      )}
    </section>
  );
}