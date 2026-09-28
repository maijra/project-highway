"use client";

import { useEffect } from "react";
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
  useEffect(() => {
    const refresh = () => {
      ScrollTrigger.refresh();
    };

    const timer = window.setTimeout(refresh, 250);

    window.addEventListener("load", refresh);
    window.addEventListener("resize", refresh);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("load", refresh);
      window.removeEventListener("resize", refresh);
    };
  }, []);

  return (
    <div id="home" className="journey-experience">
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
