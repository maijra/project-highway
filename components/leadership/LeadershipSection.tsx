"use client";

import Image from "next/image";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

type LeaderKey = "bishop" | "pastor";

const leaderBiographies = {
  bishop: {
    role: "Presiding Bishop",
    name: "Bishop Jerry E. Jones",
    image: "/leadership/bishop-jerry-jones.png",
    paragraphs: [
      "Bishop Jerry E. Jones was born in Jackson, Mississippi, and raised in Lima, Ohio. At the age of 16, he lost his mother, Alicia, whose prayers and faith in God left a lasting spiritual foundation in his life.",
      "In 1988, Bishop Jones married his beloved wife, Betti. Together, they have been blessed with eight children, 25 grandchildren, and nine great-grandchildren.",
      "Bishop Jones gave his life to Christ in 1994 under the leadership of Reverend Betty Hampton and was ordained an Elder in 1998. Through the years, he faithfully served in Sunday School, Bible Study, the Prayer Band, Street Ministry, facility maintenance, prison ministry, and numerous other areas of service.",
      "After relocating his family to Douglasville, Georgia, in 2004, he continued serving under established spiritual leadership. In 2010, he answered God’s call to establish Isaiah 35:8 Ministries and was installed as pastor through the laying on of hands by the late Overseer Earnest Wilson and Overseer Almeda Warren. In 2024, he was elevated and consecrated as Bishop Prelate of Greater United Holiness Churches.",
      "Bishop Jones enjoys spending time with his family and watching sports. His favorite scripture is Psalm 37:25, and his testimony remains: “Every time I turn around, God blesses me.”",
    ],
  },

  pastor: {
    role: "Pastor",
    name: "Pastor Betti A. Jones",
    image: "/leadership/pastor-betti-jones.png",
    paragraphs: [
      "Pastor Betti A. Jones was born and raised in Sidney, Ohio, to Overseer Almeda Warren and James Daniel. She is the fifth of eight children.",
      "In 1988, she married Bishop Jerry E. Jones. Together, they have been blessed with eight children, 25 grandchildren, and nine great-grandchildren.",
      "Pastor Jones accepted Christ in 1994 under the leadership of Overseer Betty Hampton at Mt. Zion Holy Union Church of God, where she faithfully served until 2004. That same year, God led her family to Douglasville, Georgia, where she continues to reside and serve in ministry.",
      "She earned a Bachelor of Science degree in Business Administration in 2008 and a Master of Business Administration degree in 2010. That same year, she was ordained into ministry and continued supporting her husband’s pastoral calling and the work of Isaiah 35:8 Ministries.",
      "In 2013, Pastor Jones founded Wise Women Wanted, a women’s ministry based on Proverbs 14:1 and dedicated to empowering women through the Word of God, fellowship, wisdom, and shared life experiences. In 2025, she was installed as Pastor of Isaiah 35:8 Ministries, where she serves alongside her husband to advance the Kingdom of God.",
      "Her life and ministry are grounded in faith, family, service, and helping others discover their God-given purpose. Her declaration is: “The safest place in the whole wide world is in the will of God!”",
    ],
  },
} satisfies Record<
  LeaderKey,
  {
    role: string;
    name: string;
    image: string;
    paragraphs: string[];
  }
>;

export default function LeadershipSection() {
  const [activeLeader, setActiveLeader] =
    useState<LeaderKey | null>(null);

  useEffect(() => {
    if (!activeLeader) return;

    const previousOverflow = document.body.style.overflow;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveLeader(null);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [activeLeader]);

  const biography = activeLeader
    ? leaderBiographies[activeLeader]
    : null;

  const biographyModal = biography ? (
    <div
      className="leader-modal-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.currentTarget === event.target) {
          setActiveLeader(null);
        }
      }}
    >
      <section
        className="leader-cloud-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="leader-modal-title"
      >
        <button
          type="button"
          className="leader-modal-close"
          aria-label="Close biography"
          onClick={() => setActiveLeader(null)}
        >
          ×
        </button>

        <div className="leader-modal-portrait">
          <Image
            src={biography.image}
            alt={biography.name}
            width={520}
            height={680}
            className="leader-modal-image"
          />
        </div>

        <div className="leader-modal-copy">
          <p className="leader-modal-role">
            {biography.role}
          </p>

          <h3 id="leader-modal-title">
            {biography.name}
          </h3>

          <div className="leader-modal-scroll">
            {biography.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>
    </div>
  ) : null;

  return (
    <section
      id="leadership"
      className="leadership-section"
    >
      <div className="leadership-sanctuary-background" />

      <div className="leadership-light leadership-light-left" />
      <div className="leadership-light leadership-light-right" />

      <div
        className="leadership-particles"
        aria-hidden="true"
      >
        {Array.from({ length: 10 }, (_, index) => (
          <span
            key={index}
            className={`leadership-particle particle-${
              [
                "one",
                "two",
                "three",
                "four",
                "five",
                "six",
                "seven",
                "eight",
                "nine",
                "ten",
              ][index]
            }`}
          />
        ))}
      </div>

      <div className="leadership-inner">
        <div className="leadership-heading">
          <p className="leadership-eyebrow">
            Called To Serve
          </p>

          <h2 className="leadership-main-title">
            Our Leadership
          </h2>

          <p className="leadership-intro">
            Guided by faith, grounded in the Word, and
            committed to serving God&apos;s people with
            purpose, love, and integrity.
          </p>

          <div
            className="leadership-line"
            aria-hidden="true"
          >
            <span />
          </div>
        </div>

        <div className="leadership-grid">
          <article className="leader-panel">
            <div className="leader-portrait-area">
              <div className="leadership-glow" />
              <div className="leader-ring" />

              <Image
                src="/leadership/bishop-jerry-jones.png"
                alt="Bishop Jerry E. Jones"
                width={700}
                height={900}
                className="leader-image"
                priority
              />
            </div>

            <div className="leader-copy">
              <p className="leader-role">
                Presiding Bishop
              </p>

              <h3 className="leader-name">
                Bishop Jerry E. Jones
              </h3>

              <div
                className="leader-name-line"
                aria-hidden="true"
              />

              <p className="leader-description">
                Serving with a heart for ministry,
                Bishop Jerry E. Jones leads with faith,
                wisdom, and a commitment to guiding
                God&apos;s people along the way of
                holiness.
              </p>

              <button
                type="button"
                className="leader-link"
                onClick={() =>
                  setActiveLeader("bishop")
                }
              >
                <span>Meet Bishop Jerry</span>

                <span
                  className="leader-link-arrow"
                  aria-hidden="true"
                >
                  →
                </span>
              </button>
            </div>
          </article>

          <div
            className="leadership-center-symbol"
            aria-hidden="true"
          >
            <span className="center-symbol-line" />
            <span className="center-symbol-cross">
              ✝
            </span>
            <span className="center-symbol-line" />
          </div>

          <article className="leader-panel">
            <div className="leader-portrait-area">
              <div className="leadership-glow" />
              <div className="leader-ring" />

              <Image
                src="/leadership/pastor-betti-jones.png"
                alt="Pastor Betti A. Jones"
                width={700}
                height={900}
                className="leader-image"
                priority
              />
            </div>

            <div className="leader-copy">
              <p className="leader-role">
                Pastor
              </p>

              <h3 className="leader-name">
                Pastor Betti A. Jones
              </h3>

              <div
                className="leader-name-line"
                aria-hidden="true"
              />

              <p className="leader-description">
                Pastor Betti A. Jones serves with
                compassion, faith, and a deep love for
                God&apos;s people, encouraging others to
                grow in purpose and continue forward in
                their walk with Christ.
              </p>

              <button
                type="button"
                className="leader-link"
                onClick={() =>
                  setActiveLeader("pastor")
                }
              >
                <span>Meet Pastor Betti</span>

                <span
                  className="leader-link-arrow"
                  aria-hidden="true"
                >
                  →
                </span>
              </button>
            </div>
          </article>
        </div>

        <div className="leadership-closing">
          <div className="leadership-closing-line" />

          <p>
            Leadership is not simply a position. It is
            a calling to serve.
          </p>

          <span className="leadership-closing-mark">
            ✦
          </span>
        </div>
      </div>

      {biographyModal &&
        createPortal(
          biographyModal,
          document.body
        )}
    </section>
  );
}