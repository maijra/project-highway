"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

export default function MusicControl() {
  const audioRef =
    useRef<HTMLAudioElement>(null);

  const [playing, setPlaying] =
    useState(false);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.volume = 0.3;

    const beginPlayback = async () => {
      try {
        await audio.play();
      } catch {
        /*
         * The Enter Journey button will
         * provide the required interaction.
         */
      }
    };

    const beginJourneyMusic = () => {
      void beginPlayback();
    };

    /*
     * Try automatic playback for browsers
     * that already allow this website.
     */
    void beginPlayback();

    /*
     * Enter Journey sends this event.
     * Because it comes directly from a click,
     * browsers will allow the song to play.
     */
    window.addEventListener(
      "project-highway:start-music",
      beginJourneyMusic
    );

    return () => {
      window.removeEventListener(
        "project-highway:start-music",
        beginJourneyMusic
      );
    };
  }, []);

  const toggleMusic = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (!audio.paused) {
      audio.pause();
      return;
    }

    try {
      await audio.play();
    } catch {
      /*
       * Keep the control available if
       * playback is temporarily blocked.
       */
    }
  };

  return (
    <div className="music-control">
      <audio
        ref={audioRef}
        src="/audio/goodness-of-god.mp3"
        autoPlay
        loop
        preload="auto"
        onPlay={() =>
          setPlaying(true)
        }
        onPause={() =>
          setPlaying(false)
        }
      />

      <button
        type="button"
        className={`music-control-button ${
          playing
            ? "music-control-button-playing"
            : ""
        }`}
        onClick={toggleMusic}
        aria-label={
          playing
            ? "Pause background music"
            : "Play background music"
        }
      >
        <span
          className="music-control-icon"
          aria-hidden="true"
        >
          {playing ? "Ⅱ" : "♪"}
        </span>

        <span className="music-control-label">
          {playing
            ? "Pause Music"
            : "Play Music"}
        </span>
      </button>
    </div>
  );
}