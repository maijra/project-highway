"use client";

import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import SceneOneWilderness from "./scene-01-wilderness/SceneOneWilderness";
import SceneTwoHighway from "./scene-02-highway/SceneTwoHighway";
import SceneThreeTravelers from "./scene-03-travelers/SceneThreeTravelers";
import SceneFourBloom from "./scene-04-bloom/SceneFourBloom";
import SceneFiveStreams from "./scene-05-streams/SceneFiveStreams";
import SceneSixWorship from "./scene-06-worship/SceneSixWorship";
import SceneSevenChurch from "./scene-07-church/SceneSevenChurch";
import SceneEightBeyond from "./scene-08-beyond/SceneEightBeyond";

export default function JourneyExperience() {
  const journeyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const refresh = () => {
      ScrollTrigger.refresh();
    };

    const timer = window.setTimeout(refresh, 250);

    window.addEventListener("load", refresh);
    window.addEventListener("resize", refresh);

    const playJourney = () => {
      const journey = journeyRef.current;

      if (!journey) return;

      ScrollTrigger.refresh();

      const start = journey.offsetTop;
      const end = start + journey.scrollHeight - window.innerHeight;

      const duration = 52000;
      const startedAt = performance.now();

      window.scrollTo({
        top: start,
        behavior: "auto",
      });

      const animate = (now: number) => {
        const elapsed = now - startedAt;
        const progress = Math.min(elapsed / duration, 1);

        const eased =
          progress < 0.5
            ? 2 * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 2) / 2;

        const position = start + (end - start) * eased;

        window.scrollTo(0, position);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    };

    window.addEventListener("project-highway:play-journey", playJourney);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("load", refresh);
      window.removeEventListener("resize", refresh);
      window.removeEventListener(
        "project-highway:play-journey",
        playJourney
      );
    };
  }, []);

  return (
    <div
      ref={journeyRef}
      id="journey"
      className="journey-experience"
    >
      <SceneOneWilderness />
      <SceneTwoHighway />
      <SceneThreeTravelers />
      <SceneFourBloom />
      <SceneFiveStreams />
      <SceneSixWorship />
      <SceneSevenChurch />
      <SceneEightBeyond />
    </div>
  );
}
