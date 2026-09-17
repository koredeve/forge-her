"use client";
import React, { useState, useRef, useEffect } from "react";

const HER_VIDEOS = {
  vacuum: "/videos/hollow.mp4",
  deadbug: "/videos/hollow.mp4",
  hipdip: "/videos/sidep.mp4",
  flutter: "/videos/legraise.mp4",
  situp: "/videos/hollow.mp4",
  birddog: "/videos/dog.mp4",
  twist: "/videos/hollow.mp4",
  glutebridge: "/videos/squat.mp4",
  donkey: "/videos/dog.mp4",
  hydrant: "/videos/dog.mp4",
  clamshell: "/videos/sidep.mp4",
  curtsy: "/videos/bulg.mp4",
  frogpump: "/videos/squat.mp4",
  bulg: "/videos/bulg.mp4",
  squat: "/videos/squat.mp4",
  calf: "/videos/calf.mp4",
  chestprayer: "/videos/pushup.mp4",
  inclinepush: "/videos/pushup.mp4",
  pushup: "/videos/pushup.mp4",
  kneepush: "/videos/pushup.mp4",
  tricepdip: "/videos/dip.mp4",
  shouldertap: "/videos/plank.mp4",
  pikepush: "/videos/pike.mp4",
  doorwayrow: "/videos/row.mp4",
  mountainclimber: "/videos/burpee.mp4",
  flye: "/videos/diamond.mp4",
  cobra: "/videos/dloc.mp4",
  wallslide: "/videos/dloc.mp4",
  superman: "/videos/dog.mp4",
  downdog: "/videos/dog.mp4",
  default: "/videos/pushup.mp4"
};

export default function ExerciseVideoPlayer({ exerciseId, exerciseName, category }) {
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);

  const videoSrc = HER_VIDEOS[exerciseId] || HER_VIDEOS.default;

  const toggleSpeed = () => {
    const nextRate = playbackRate === 1 ? 0.5 : 1;
    setPlaybackRate(nextRate);
    if (videoRef.current) {
      videoRef.current.playbackRate = nextRate;
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div
      style={{
        position: "relative",
        background: "#080a0c",
        borderRadius: "14px",
        overflow: "hidden",
        border: "1px solid rgba(255, 112, 166, 0.3)",
        marginTop: "12px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.6)"
      }}
    >
      <video
        ref={videoRef}
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline
        style={{
          width: "100%",
          maxHeight: "360px",
          display: "block",
          objectFit: "cover",
          filter: "contrast(105%) brightness(95%)"
        }}
      />

      {/* Floating Controls Bar */}
      <div
        style={{
          position: "absolute",
          bottom: "10px",
          left: "10px",
          right: "10px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "rgba(13, 15, 18, 0.8)",
          backdropFilter: "blur(10px)",
          padding: "6px 12px",
          borderRadius: "10px",
          border: "1px solid rgba(255, 255, 255, 0.1)"
        }}
      >
        <button
          onClick={togglePlay}
          style={{
            background: "none",
            border: "none",
            color: "#fff",
            fontSize: "14px",
            cursor: "pointer",
            fontWeight: "700"
          }}
        >
          {isPlaying ? "⏸ Pause" : "▶ Play"}
        </button>

        <span style={{ fontSize: "11px", color: "var(--mut)", fontWeight: "600" }}>
          60 FPS HD Form
        </span>

        <button
          onClick={toggleSpeed}
          style={{
            background: playbackRate === 0.5 ? "var(--acc)" : "rgba(255,255,255,0.1)",
            color: playbackRate === 0.5 ? "#0d0f12" : "#fff",
            border: "none",
            borderRadius: "6px",
            padding: "3px 8px",
            fontSize: "11px",
            fontWeight: "800",
            cursor: "pointer"
          }}
        >
          {playbackRate}x {playbackRate === 0.5 ? "Slow-Mo" : ""}
        </button>
      </div>
    </div>
  );
}
