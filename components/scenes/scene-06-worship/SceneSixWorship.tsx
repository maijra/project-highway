"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SceneSixWorship() {
  const sceneRef = useRef<HTMLElement>(null);
  const worshipRef = useRef<HTMLDivElement>(null);
  const churchPreviewRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sceneRef.current,
          start: "top top",
          end: "+=220%",
          scrub: 1,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .fromTo(
          worshipRef.current,
          {
            opacity: 1,
            scale: 1.02,
          },
          {
            opacity: 1,
            scale: 1.02,
            duration: 0.18,
            ease: "none",
          },
          0
        )

        .to(
          worshipRef.current,
          {
            scale: 1.08,
            duration: 0.5,
            ease: "none",
          },
          0.18
        )

        .fromTo(
          glowRef.current,
          {
            opacity: 0.25,
            scale: 0.9,
          },
          {
            opacity: 0.75,
            scale: 1.4,
            duration: 0.55,
            ease: "none",
          },
          0.08
        )

        .fromTo(
          textRef.current,
          {
            opacity: 0,
            y: 40,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.18,
            ease: "power2.out",
          },
          0.16
        )

        .to(
          textRef.current,
          {
            opacity: 1,
            duration: 0.3,
          },
          0.32
        )

        .to(
          textRef.current,
          {
            opacity: 0,
            y: -35,
            duration: 0.18,
            ease: "none",
          },
          0.52
        )

        .fromTo(
          churchPreviewRef.current,
          {
            opacity: 0,
            scale: 1.04,
          },
          {
            opacity: 1,
            scale: 1.02,
            duration: 0.22,
            ease: "none",
          },
          0.62
        )

        .to(
          worshipRef.current,
          {
            opacity: 0,
            duration: 0.22,
            ease: "none",
          },
          0.62
        )

        .to(
          churchPreviewRef.current,
          {
            opacity: 1,
            scale: 1.02,
            duration: 0.35,
            ease: "none",
          },
          0.82
        );
    }, sceneRef);

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === sceneRef.current) {
          trigger.kill();
        }
      });

      context.revert();
    };
  }, []);

  return (
    <section
      ref={sceneRef}
      id="scene-06-worship"
      className="scene"
    >
      <div
        ref={worshipRef}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('/scenery/worship.png')",
        }}
      />

      <div
        ref={churchPreviewRef}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('/scenery/church.png')",
        }}
      />

      <div className="overlay-dark" />

      <div
        ref={glowRef}
        className="horizon-light"
      />

      <div
        ref={textRef}
        className="relative z-10 flex min-h-screen items-start justify-center px-6 pt-[7vh] text-center"
      >
        <div className="w-full max-w-5xl text-center">

          <p className="eyebrow">
            Worship Fills The Air
          </p>

          <h2 className="mx-auto mt-4 text-center text-4xl font-semibold leading-tight text-[var(--brand-ivory)] drop-shadow-[0_4px_18px_rgba(0,0,0,0.85)] md:text-6xl">
            Songs of praise rise along the way.
          </h2>

          <p className="scene-one-subtitle">
            Worship fills the journey as the travelers continue toward the light.
          </p>

          <div className="journey-prompt mt-8">
            Keep Walking

            <span className="text-2xl soft-float">
              ⌄
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}