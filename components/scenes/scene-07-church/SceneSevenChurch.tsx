"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SceneSevenChurch() {
  const sceneRef = useRef<HTMLElement>(null);
  const churchRef = useRef<HTMLDivElement>(null);
  const beyondPreviewRef = useRef<HTMLDivElement>(null);
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
          churchRef.current,
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
          churchRef.current,
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
            opacity: 0.78,
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
          beyondPreviewRef.current,
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
          churchRef.current,
          {
            opacity: 0,
            duration: 0.22,
            ease: "none",
          },
          0.62
        )

        .to(
          beyondPreviewRef.current,
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
      id="scene-07-church"
      className="scene"
    >
      <div
        ref={churchRef}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('/scenery/church.png')",
        }}
      />

      <div
        ref={beyondPreviewRef}
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
            The Journey Leads Home
          </p>

          <h2 className="mx-auto mt-4 text-center text-4xl font-semibold leading-tight text-[var(--brand-ivory)] drop-shadow-[0_4px_18px_rgba(0,0,0,0.85)] md:text-6xl">
            The church comes into view.
          </h2>

          <p className="scene-one-subtitle">
            A place of worship appears ahead as the travelers continue along the way.
          </p>

          <div className="journey-prompt mt-8">
            Continue Forward

            <span className="text-2xl soft-float">
              ⌄
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}