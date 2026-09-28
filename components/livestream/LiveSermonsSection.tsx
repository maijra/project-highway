"use client";

import { useState } from "react";

type Service = {
  label: string;
  title: string;
  embedSrc: string;
};

const services: Service[] = [
  {
    label: "Sunday Service · Sep 27, 2026",
    title: "Sunday Worship Service",
    embedSrc:
      "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Fisaiah358Ministries%2Fvideos%2F2301591770641981%2F&show_text=false&width=267&t=0",
  },
  {
    label: "Wednesday Service · Sep 23, 2026",
    title: "Wednesday Worship Service",
    embedSrc:
      "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Fisaiah358Ministries%2Fvideos%2F2515022135685550%2F&show_text=false&width=267&t=0",
  },
  {
    label: "Previous Service",
    title: "Isaiah 35:8 Worship Service",
    embedSrc:
      "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Fisaiah358Ministries%2Fvideos%2F974448802344497%2F&show_text=false&width=267&t=0",
  },
  {
    label: "Previous Service",
    title: "Isaiah 35:8 Worship Service",
    embedSrc:
      "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Fisaiah358Ministries%2Fvideos%2F2352265195578248%2F&show_text=false&width=267&t=0",
  },
  {
    label: "Previous Service",
    title: "Isaiah 35:8 Worship Service",
    embedSrc:
      "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Fisaiah358Ministries%2Fvideos%2F2262182874568672%2F&show_text=false&width=267&t=0",
  },
  {
    label: "Previous Service",
    title: "Isaiah 35:8 Worship Service",
    embedSrc:
      "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Fisaiah358Ministries%2Fvideos%2F1597033038719363%2F&show_text=false&width=267&t=0",
  },
];

export default function LiveSermonsSection() {
  const [selectedIndex, setSelectedIndex] =
    useState(0);

  const selectedService = services[selectedIndex];
  const selectedVideoUrl =
    new URL(selectedService.embedSrc).searchParams.get("href") ||
    "https://www.facebook.com/isaiah358Ministries/";

  const handleSelectService = (
    index: number
  ) => {
    setSelectedIndex(index);

    window.requestAnimationFrame(() => {
      document
        .getElementById("live-player")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
    });
  };

  return (
    <section
      id="live"
      className="live-section"
    >
      <div className="live-background" />
      <div className="live-overlay" />

      <div className="live-inner">
        <header className="live-heading">
          <p className="live-eyebrow">
            Worship With Us
          </p>

          <h2 className="live-title">
            Watch Live
          </h2>

          <p className="live-intro">
            Join Isaiah 35:8 Ministries for
            worship, the Word, prayer, and
            fellowship wherever you are.
          </p>
        </header>

        <div className="live-grid">
          <div className="live-feature">
            <div
              id="live-player"
              className="live-screen live-video-screen"
            >
              <div className="live-status">
                <span className="live-dot" />

                <span>
                  {selectedService.label}
                </span>
              </div>

              <div className="live-player-frame">
                <iframe
                  key={selectedService.embedSrc}
                  className="live-facebook-player"
                  src={selectedService.embedSrc}
                  title={`${selectedService.label}: ${selectedService.title}`}
                  scrolling="no"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>

              <div className="live-video-footer">
                <div>
                  <p className="live-screen-kicker">
                    Isaiah 35:8 Ministries
                  </p>

                  <h3>
                    {selectedService.title}
                  </h3>
                </div>

                <a
                  className="live-primary-button"
                  href={selectedVideoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span aria-hidden="true">▶</span>
                  <span>Watch Live</span>
                </a>
              </div>

            </div>
          </div>

          <aside className="live-side-panel">
            <div className="live-side-block">
              <p className="live-side-label">
                Stay Connected
              </p>

              <h3>
                Missed The Live Service?
              </h3>

              <p>
                Select a service below. Play it in
                the video above, or use the gold
                button to watch it on Facebook.
              </p>
            </div>

            <div className="live-message-list">
              {services.map(
                (service, index) => {
                  const isActive =
                    selectedIndex === index;

                  return (
                    <button
                      key={service.embedSrc}
                      type="button"
                      className={[
                        "live-message-card",
                        "live-service-selector",
                        isActive
                          ? "live-message-card-active"
                          : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      onClick={() =>
                        handleSelectService(
                          index
                        )
                      }
                      aria-pressed={isActive}
                    >
                      <span
                        className="live-service-play"
                        aria-hidden="true"
                      >
                        ▶
                      </span>

                      <span className="live-preview-copy">
                        <span className="live-preview-topline">
                          <span className="live-message-number">
                            {String(
                              index + 1
                            ).padStart(
                              2,
                              "0"
                            )}
                          </span>

                          <span className="live-message-label">
                            {service.label}
                          </span>
                        </span>

                        <span className="live-preview-title">
                          {service.title}
                        </span>

                        <span className="live-select-state">
                          {isActive
                            ? "Currently Selected"
                            : "Select Service"}
                        </span>
                      </span>
                    </button>
                  );
                }
              )}
            </div>

            <div className="live-scripture">
              <span
                className="live-scripture-mark"
                aria-hidden="true"
              >
                “
              </span>

              <p>
                Faith comes by hearing, and
                hearing by the word of God.
              </p>

              <span className="live-scripture-reference">
                Romans 10:17
              </span>
            </div>
          </aside>
        </div>
      </div>

      <style jsx>{`
        .live-player-frame {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          min-height: 500px;
          overflow: hidden;
          background: #050505;
        }

        .live-facebook-player {
          display: block;
          flex: 0 0 auto;
          width: 267px;
          height: 476px;
          min-height: 0;
          max-width: 100%;
          border: 0;
          background: #050505;
        }

        .live-status {
          pointer-events: none;
        }

        .live-primary-button {
          display: inline-flex;
          min-height: 48px;
          align-items: center;
          justify-content: center;
          gap: 11px;
          padding: 0 22px;
          border: 1px solid
            rgba(248, 223, 137, 0.7);
          border-radius: 999px;
          color: #1c0a0e;
          background: linear-gradient(
            135deg,
            #f3df94,
            #c89c3e
          );
          font: inherit;
          font-size: 0.7rem;
          font-weight: 850;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          cursor: pointer;
          transition:
            transform 220ms ease,
            box-shadow 220ms ease;
        }

        .live-primary-button:hover {
          transform: translateY(-2px);
          box-shadow:
            0 10px 25px
              rgba(218, 178, 73, 0.3);
        }

        .live-primary-button:focus-visible {
          outline: 3px solid #ffffff;
          outline-offset: 4px;
        }

        .live-audio-notice {
          margin: 13px 0 0;
          color: rgba(
            255,
            255,
            255,
            0.72
          );
          font-size: 0.75rem;
          line-height: 1.6;
          text-align: right;
        }

        .live-service-selector {
          position: relative;
          z-index: 4;
          display: flex;
          width: 100%;
          align-items: center;
          gap: 17px;
          text-align: left;
          cursor: pointer;
          appearance: none;
        }

        .live-service-selector * {
          pointer-events: none;
        }

        .live-service-play {
          display: grid;
          width: 54px;
          height: 54px;
          flex: 0 0 54px;
          place-items: center;
          border: 1px solid
            rgba(232, 207, 118, 0.52);
          border-radius: 50%;
          color: #e8cf76;
          background: rgba(
            20,
            7,
            11,
            0.76
          );
          transition:
            color 220ms ease,
            background 220ms ease,
            transform 220ms ease;
        }

        .live-service-selector:hover
          .live-service-play,
        .live-message-card-active
          .live-service-play {
          color: #21080e;
          background: #e8cf76;
          transform: scale(1.07);
        }

        .live-preview-copy {
          display: flex;
          min-width: 0;
          flex: 1;
          flex-direction: column;
          gap: 7px;
        }

        .live-select-state {
          color: rgba(
            232,
            207,
            118,
            0.76
          );
          font-size: 0.61rem;
          font-weight: 800;
          letter-spacing: 0.13em;
          text-transform: uppercase;
        }

        @media (max-width: 900px) {
          .live-player-frame {
            min-height: 500px;
          }

        }

        @media (max-width: 600px) {
          .live-player-frame {
            min-height: 476px;
          }


          .live-video-footer {
            align-items: stretch;
            flex-direction: column;
          }

          .live-primary-button {
            width: 100%;
          }

          .live-audio-notice {
            text-align: center;
          }
        }
      `}</style>
    </section>
  );
}
