"use client";

import { ReactNode, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type ImmersiveBackgroundProps = {
  children: ReactNode;
};

export default function ImmersiveBackground({
  children,
}: ImmersiveBackgroundProps) {
  const worldRef = useRef<HTMLDivElement>(null);
  const backgroundImageRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const atmosphereRef = useRef<HTMLDivElement>(null);
  const roadLightRef = useRef<HTMLDivElement>(null);
  const spiritLayerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      /*
       * IMPORTANT:
       *
       * The Journey ends at approximately 1.14.
       * So this begins there too.
       *
       * No second entrance.
       */

      gsap.set(backgroundImageRef.current, {
        scale: 1.14,
        yPercent: 0,
      });

      /*
       * Only begin moving AFTER we are
       * already inside the webpage.
       */

      gsap.to(backgroundImageRef.current, {
        scale: 1.19,
        yPercent: -4,

        ease: "none",

        scrollTrigger: {
          trigger: worldRef.current,

          start: "top top",
          end: "bottom top",

          scrub: 2.8,
        },
      });

      /*
       * Keep the beginning already bright.
       */

      gsap.set(glowRef.current, {
        opacity: 0.66,
        scale: 1.08,
      });

      gsap.to(glowRef.current, {
        opacity: 0.82,
        scale: 1.18,

        ease: "none",

        scrollTrigger: {
          trigger: worldRef.current,
          start: "top top",
          end: "bottom 20%",
          scrub: 2.8,
        },
      });

      gsap.set(roadLightRef.current, {
        opacity: 0.26,
        scaleY: 1,
      });

      gsap.to(roadLightRef.current, {
        opacity: 0.44,
        scaleY: 1.12,

        ease: "none",

        scrollTrigger: {
          trigger: worldRef.current,
          start: "top top",
          end: "bottom 20%",
          scrub: 2.5,
        },
      });

      gsap.set(atmosphereRef.current, {
        opacity: 0.38,
      });

      gsap.to(atmosphereRef.current, {
        opacity: 0.52,
        yPercent: -3,

        ease: "none",

        scrollTrigger: {
          trigger: worldRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 3,
        },
      });

      /*
       * Spirits already exist when the page begins.
       */

      gsap.set(spiritLayerRef.current, {
        opacity: 0.72,
      });

      const spirits =
        gsap.utils.toArray<HTMLElement>(
          ".spirit-figure"
        );

      spirits.forEach((spirit, index) => {
        gsap.to(spirit, {
          y:
            index % 2 === 0
              ? -14
              : -20,

          x:
            index % 3 === 0
              ? 4
              : index % 3 === 1
              ? -4
              : 0,

          duration:
            3.6 + index * 0.15,

          repeat: -1,

          yoyo: true,

          ease: "sine.inOut",
        });
      });
    }, worldRef);

    return () => context.revert();
  }, []);

  return (
    <div
      ref={worldRef}
      className="immersive-world"
    >
      <div className="immersive-base" />

      <div
        ref={backgroundImageRef}
        className="immersive-highway-image"
      >
        <Image
          src="/scenery/welcome-highway-clean.png"
          alt=""
          fill
          sizes="100vw"
          priority={false}
          aria-hidden="true"
        />
      </div>

      <div className="immersive-highway-overlay" />

      <div
        ref={glowRef}
        className="immersive-highway-glow"
      />

      <div
        ref={roadLightRef}
        className="immersive-road-light"
      />

      <div
        ref={spiritLayerRef}
        className="immersive-spirit-layer"
        aria-hidden="true"
      >
        <span className="spirit-figure spirit-one" />
        <span className="spirit-figure spirit-two" />
        <span className="spirit-figure spirit-three" />
        <span className="spirit-figure spirit-four" />
        <span className="spirit-figure spirit-five" />
        <span className="spirit-figure spirit-six" />
        <span className="spirit-figure spirit-seven" />
        <span className="spirit-figure spirit-eight" />
        <span className="spirit-figure spirit-nine" />
        <span className="spirit-figure spirit-ten" />
        <span className="spirit-figure spirit-eleven" />
        <span className="spirit-figure spirit-twelve" />
      </div>

      <div
        ref={atmosphereRef}
        className="immersive-atmosphere"
      />

      <div className="immersive-bottom-fade" />

      <div className="immersive-content">
        {children}
      </div>
    </div>
  );
}