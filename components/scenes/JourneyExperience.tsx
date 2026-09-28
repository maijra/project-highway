"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

type JourneyScene = {
  image: string;
  duration: number;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  prompt?: string;
};

const JOURNEY_SCENES: JourneyScene[] = [
  {
    image: "/scenery/wilderness-hero.png",
    duration: 7500,
    eyebrow: "The Wilderness",
    title: "The journey begins in the wilderness.",
    subtitle: "Waiting. Searching. Preparation.",
    prompt: "Begin The Journey",
  },
  {
    image: "/scenery/highway-hero.png",
    duration: 7500,
    eyebrow: "The Way Is Revealed",
    title: "A highway shall be there...",
    prompt: "Keep Going",
  },
  {
    image: "/scenery/travelers.png",
    duration: 7500,
    eyebrow: "Walk The Way",
    title: "You were never meant to walk alone.",
    prompt: "Continue Walking",
  },
  {
    image: "/scenery/bridge-3a.png",
    duration: 2000,
  },
  {
    image: "/scenery/bridge-3b.png",
    duration: 2000,
  },
  {
    image: "/scenery/blooms-desert.png",
    duration: 7500,
    eyebrow: "The Wilderness Rejoices",
    title: "The desert shall rejoice and blossom.",
    subtitle: "What was once dry begins to live again.",
    prompt: "Keep Walking",
  },
  {
    image: "/scenery/bridge-4a.png",
    duration: 2000,
  },
  {
    image: "/scenery/bridge-4b.png",
    duration: 2000,
  },
  {
    image: "/scenery/streams.png",
    duration: 7500,
    eyebrow: "Waters In The Wilderness",
    title: "Waters shall break out in the wilderness.",
    subtitle: "Streams begin to flow through the land.",
    prompt: "Follow The Way",
  },
  {
    image: "/scenery/bridge-5a.png",
    duration: 2000,
  },
  {
    image: "/scenery/bridge-5b.png",
    duration: 2000,
  },
  {
    image: "/scenery/worship.png",
    duration: 7500,
    eyebrow: "Worship Fills The Air",
    title: "Songs of praise rise along the way.",
    subtitle: "Worship fills the journey.",
    prompt: "Keep Walking",
  },
  {
    image: "/scenery/bridge-6a.png",
    duration: 2000,
  },
  {
    image: "/scenery/bridge-6b.png",
    duration: 2000,
  },
  {
    image: "/scenery/church.png",
    duration: 7500,
    eyebrow: "The Journey Leads Home",
    title: "The church comes into view.",
    subtitle: "A place of worship appears along the way.",
    prompt: "Continue Forward",
  },
  {
    image: "/scenery/bridge-7a.png",
    duration: 2000,
  },
  {
    image: "/scenery/bridge-7b.png",
    duration: 2000,
  },
  {
    image: "/scenery/beyond.png",
    duration: 7500,
    eyebrow: "The Journey Continues",
    title: "Faith does not end at the church doors.",
    subtitle:
      "The road continues beyond the building. The journey of faith continues forward.",
    prompt: "Continue The Journey",
  },
];

export default function JourneyExperience() {
  const stageRef = useRef<HTMLDivElement>(null);

  const [journeyStarted, setJourneyStarted] =
    useState(false);

  const [activeScene, setActiveScene] =
    useState(-1);

  /*
   * The Journey no longer creates its own Welcome screen.
   * It now hands off directly to the real #welcome section
   * rendered by app/page.tsx.
   */
  const goToWelcome = useCallback(() => {
    setActiveScene(-1);

    requestAnimationFrame(() => {
      document
        .getElementById("welcome")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    });
  }, []);

  const startJourney = () => {
    window.dispatchEvent(
      new Event("project-highway:start-music")
    );

    setActiveScene(0);
    setJourneyStarted(true);

    requestAnimationFrame(() => {
      stageRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  /*
   * Navbar Home / Welcome requests still work,
   * but now they go to the ONE real Welcome section.
   */
  useEffect(() => {
    const handleWelcomeRequest = () => {
      goToWelcome();
    };

    window.addEventListener(
      "project-highway:go-to-welcome",
      handleWelcomeRequest
    );

    return () => {
      window.removeEventListener(
        "project-highway:go-to-welcome",
        handleWelcomeRequest
      );
    };
  }, [goToWelcome]);

  /*
   * Automatically advance through every Journey scene.
   */
  useEffect(() => {
    if (!journeyStarted || activeScene < 0) {
      return;
    }

    if (
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches
    ) {
      const reducedMotionTimer =
        window.setTimeout(goToWelcome, 250);

      return () => {
        window.clearTimeout(reducedMotionTimer);
      };
    }

    const timer = window.setTimeout(() => {
      const nextScene = activeScene + 1;

      if (nextScene >= JOURNEY_SCENES.length) {
        goToWelcome();
      } else {
        setActiveScene(nextScene);
      }
    }, JOURNEY_SCENES[activeScene].duration);

    return () => {
      window.clearTimeout(timer);
    };
  }, [
    activeScene,
    goToWelcome,
    journeyStarted,
  ]);

  return (
    <section
      id="home"
      className="journey-wrapper"
    >
      <div
        ref={stageRef}
        className="journey-stage"
      >
        {!journeyStarted && (
          <div className="journey-entry-screen">
            <div className="journey-entry-content">
              <p className="journey-entry-eyebrow">
                Isaiah 35:8 Ministries
              </p>

              <h1>Welcome To The Highway</h1>

              <p>
                Experience the journey through the
                wilderness, along the Highway of
                Holiness, and into worship.
              </p>

              <button
                type="button"
                className="journey-enter-button"
                onClick={startJourney}
              >
                <span>Enter The Journey</span>
                <span aria-hidden="true">→</span>
              </button>

              <button
                type="button"
                className="journey-enter-button journey-welcome-shortcut"
                onClick={goToWelcome}
              >
                Go Straight to Welcome
              </button>
            </div>
          </div>
        )}

        {journeyStarted && activeScene >= 0 && (
          <button
            type="button"
            className="journey-skip-button"
            onClick={goToWelcome}
            aria-label="Skip the journey and go to the welcome section"
          >
            <span>Skip Journey</span>

            <span
              className="journey-skip-arrow"
              aria-hidden="true"
            >
              →
            </span>
          </button>
        )}

        {JOURNEY_SCENES.map(
          (scene, index) => (
            <div
              key={scene.image}
              className="journey-layer journey-sequenced-layer"
              style={{
                backgroundImage: `url('${scene.image}')`,
                opacity:
                  activeScene === index ? 1 : 0,
                transform:
                  activeScene === index
                    ? "scale(1.045)"
                    : "scale(1.015)",
              }}
            />
          )
        )}

        <div className="journey-overlay" />
        <div className="journey-glow" />

        {JOURNEY_SCENES.map(
          (scene, index) => {
            if (!scene.title) {
              return null;
            }

            return (
              <div
                key={`${scene.image}-copy`}
                className="journey-text journey-sequenced-copy"
                style={{
                  opacity:
                    activeScene === index ? 1 : 0,
                  transform:
                    activeScene === index
                      ? "translateY(0)"
                      : "translateY(24px)",
                }}
              >
                {scene.eyebrow && (
                  <p className="eyebrow">
                    {scene.eyebrow}
                  </p>
                )}

                <h2 className="journey-title">
                  {scene.title}
                </h2>

                {scene.subtitle && (
                  <p className="journey-subtitle">
                    {scene.subtitle}
                  </p>
                )}

                {scene.prompt && (
                  <p className="journey-prompt">
                    {scene.prompt}
                  </p>
                )}
              </div>
            );
          }
        )}

        <style jsx>{`
          .journey-entry-screen {
            position: absolute;
            inset: 0;
            z-index: 10000;
            display: grid;
            place-items: center;
            padding: 28px;
            pointer-events: auto;
            text-align: center;
            background:
              radial-gradient(
                circle at 50% 38%,
                rgba(232, 207, 118, 0.2),
                transparent 42%
              ),
              linear-gradient(
                to bottom,
                rgba(0, 0, 0, 0.24),
                rgba(0, 0, 0, 0.68)
              ),
              url("/scenery/wilderness-hero.png")
                center 46% / cover no-repeat;
          }

          .journey-entry-content {
            width: min(760px, 94vw);
            padding: clamp(32px, 6vw, 64px);
            border: 1px solid
              rgba(232, 207, 118, 0.38);
            border-radius: 30px;
            background: rgba(8, 8, 8, 0.5);
            box-shadow: 0 28px 80px
              rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(10px);
          }

          .journey-entry-eyebrow {
            margin: 0 0 14px;
            color: #e8cf76;
            font-size: 0.76rem;
            font-weight: 700;
            letter-spacing: 0.28em;
            text-transform: uppercase;
          }

          .journey-entry-content h1 {
            margin: 0;
            color: #f8f3e7;
            font-family:
              Georgia,
              "Times New Roman",
              serif;
            font-size: clamp(
              2.5rem,
              6vw,
              5.4rem
            );
            font-weight: 500;
            line-height: 1.02;
          }

          .journey-entry-content
            > p:not(.journey-entry-eyebrow) {
            width: min(620px, 100%);
            margin: 22px auto 0;
            color: rgba(248, 243, 231, 0.82);
            font-size: clamp(
              1rem,
              1.7vw,
              1.18rem
            );
            line-height: 1.65;
          }

          .journey-enter-button {
            position: relative;
            z-index: 10001;
            min-height: 54px;
            margin-top: 30px;
            padding: 0 28px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 14px;
            border: 1px solid
              rgba(232, 207, 118, 0.85);
            border-radius: 999px;
            color: #1a1207;
            background: linear-gradient(
              135deg,
              #f1d985,
              #cda83c
            );
            box-shadow: 0 12px 34px
              rgba(0, 0, 0, 0.34);
            font: inherit;
            font-size: 0.78rem;
            font-weight: 800;
            letter-spacing: 0.14em;
            text-transform: uppercase;
            cursor: pointer;
            pointer-events: auto;
            touch-action: manipulation;
          }

          .journey-enter-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 16px 42px
              rgba(212, 175, 55, 0.24);
          }

          .journey-welcome-shortcut {
            margin-left: 12px;
            color: #f8f3e7;
            background: rgba(8, 8, 8, 0.6);
          }

          .journey-sequenced-layer {
            transition:
              opacity 1.8s ease,
              transform 9s linear;
          }

          .journey-sequenced-copy {
            transition:
              opacity 1.35s ease 0.28s,
              transform 1.35s ease 0.28s;
          }

          @media (max-width: 600px) {
            .journey-entry-screen {
              padding: 16px;
            }

            .journey-entry-content {
              padding: 34px 22px;
            }

            .journey-enter-button {
              width: min(300px, 100%);
            }

            .journey-welcome-shortcut {
              margin-left: 0;
            }
          }
        `}</style>
      </div>
    </section>
  );
}
