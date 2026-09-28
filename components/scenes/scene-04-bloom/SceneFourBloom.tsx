"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SceneFourBloom() {
  const sceneRef = useRef<HTMLElement>(null);
  const bloomRef = useRef<HTMLDivElement>(null);
  const streamsPreviewRef = useRef<HTMLDivElement>(null);
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
          bloomRef.current,
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
          bloomRef.current,
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
            opacity: 0.72,
            scale: 1.35,
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
          streamsPreviewRef.current,
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
          bloomRef.current,
          {
            opacity: 0,
            duration: 0.22,
            ease: "none",
          },
          0.62
        )

        .to(
          streamsPreviewRef.current,
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
      id="scene-04-bloom"
      className="scene"
    >
      <div
        ref={bloomRef}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('/scenery/blooms-desert.png')",
        }}
      />

      <div
        ref={streamsPreviewRef}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('/scenery/streams.png')",
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
            The Wilderness Rejoices
          </p>

          <h2 className="mx-auto mt-4 text-center text-4xl font-semibold leading-tight text-[var(--brand-ivory)] drop-shadow-[0_4px_18px_rgba(0,0,0,0.85)] md:text-6xl">
            The desert shall rejoice and blossom.
          </h2>

          <p className="scene-one-subtitle">
            What was once dry begins to live again.
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