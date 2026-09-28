"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SceneOneWilderness() {
  const sceneRef = useRef<HTMLElement>(null);
  const wildernessRef = useRef<HTMLDivElement>(null);
  const highwayPreviewRef = useRef<HTMLDivElement>(null);
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
          wildernessRef.current,
          {
            opacity: 1,
            scale: 1.02,
          },
          {
            opacity: 1,
            scale: 1.1,
            duration: 0.6,
            ease: "none",
          },
          0
        )

        .fromTo(
          glowRef.current,
          {
            opacity: 0.15,
            scale: 0.85,
          },
          {
            opacity: 0.58,
            scale: 1.28,
            duration: 0.55,
            ease: "none",
          },
          0.05
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
          0.12
        )

        .to(
          textRef.current,
          {
            opacity: 1,
            duration: 0.3,
          },
          0.3
        )

        .to(
          textRef.current,
          {
            opacity: 0,
            y: -35,
            duration: 0.18,
            ease: "none",
          },
          0.5
        )

        .fromTo(
          highwayPreviewRef.current,
          {
            opacity: 0,
            scale: 1.04,
          },
          {
            opacity: 1,
            scale: 1.04,
            duration: 0.22,
            ease: "none",
          },
          0.58
        )

        .to(
          wildernessRef.current,
          {
            opacity: 0,
            duration: 0.22,
            ease: "none",
          },
          0.58
        )

        .to(
          highwayPreviewRef.current,
          {
            opacity: 1,
            scale: 1.04,
            duration: 0.35,
            ease: "none",
          },
          0.8
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
      id="scene-01-wilderness"
      className="scene"
    >
      <div
        ref={wildernessRef}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('/scenery/wilderness-hero.png')",
        }}
      />

      <div
        ref={highwayPreviewRef}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('/scenery/highway-hero.png')",
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
            The Wilderness
          </p>

          <h1 className="mx-auto mt-4 text-center text-4xl font-semibold leading-tight text-[var(--brand-ivory)] drop-shadow-[0_4px_18px_rgba(0,0,0,0.85)] md:text-6xl">
            The journey begins in the wilderness.
          </h1>

          <p className="scene-one-subtitle">
            Before the way is revealed, there is a place of waiting, searching, and preparation.
          </p>

          <div className="journey-prompt mt-8">
            Begin The Journey

            <span className="text-2xl soft-float">
              ⌄
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}