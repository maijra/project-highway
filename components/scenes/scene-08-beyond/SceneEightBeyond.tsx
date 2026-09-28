"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SceneEightBeyond() {
  const sceneRef = useRef<HTMLElement>(null);
  const beyondRef = useRef<HTMLDivElement>(null);
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
          beyondRef.current,
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
          beyondRef.current,
          {
            scale: 1.12,
            duration: 0.72,
            ease: "none",
          },
          0.18
        )

        .fromTo(
          glowRef.current,
          {
            opacity: 0.28,
            scale: 0.9,
          },
          {
            opacity: 0.9,
            scale: 1.5,
            duration: 0.62,
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
            duration: 0.42,
          },
          0.32
        )

        .to(
          textRef.current,
          {
            opacity: 0,
            y: -35,
            duration: 0.2,
            ease: "none",
          },
          0.7
        )

        .to(
          beyondRef.current,
          {
            scale: 1.16,
            duration: 0.28,
            ease: "none",
          },
          0.72
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
      id="scene-08-beyond"
      className="scene"
    >
      <div
        ref={beyondRef}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('/scenery/beyond.png')",
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
            The Journey Continues
          </p>

          <h2 className="mx-auto mt-4 text-center text-4xl font-semibold leading-tight text-[var(--brand-ivory)] drop-shadow-[0_4px_18px_rgba(0,0,0,0.85)] md:text-6xl">
            Faith does not end at the church doors.
          </h2>

          <p className="scene-one-subtitle">
            The road continues beyond the building, carrying faith into everyday life.
          </p>

          <div className="journey-prompt mt-8">
            Continue The Journey

            <span className="text-2xl soft-float">
              ⌄
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}