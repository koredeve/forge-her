"use client";
import React, { useState, useRef, useEffect } from "react";

const HER_VIDEOS = {
  vacuum: "/videos/vacuum.mp4",
  deadbug: "/videos/deadbug.mp4",
  hipdip: "/videos/hipdip.mp4",
  flutter: "/videos/flutter.mp4",
  situp: "/videos/situp.mp4",
  birddog: "/videos/birddog.mp4",
  twist: "/videos/russiantwist.mp4",
  russiantwist: "/videos/russiantwist.mp4",
  sidep: "/videos/sidep.mp4",
  glutebridge: "/videos/glutebridge.mp4",
  donkey: "/videos/donkey.mp4",
  hydrant: "/videos/hydrant.mp4",
  clamshell: "/videos/clamshell.mp4",
  curtsy: "/videos/curtsy.mp4",
  frogpump: "/videos/frogpump.mp4",
  bulg: "/videos/bulg.mp4",
  squat: "/videos/squat.mp4",
  calf: "/videos/calf.mp4",
  chestprayer: "/videos/chestprayer.mp4",
  inclinepush: "/videos/inclinepush.mp4",
  pushup: "/videos/pushup.mp4",
  kneepush: "/videos/kneepush.mp4",
  tricepdip: "/videos/tricepdip.mp4",
  shouldertap: "/videos/shouldertap.mp4",
  pikepush: "/videos/pikepush.mp4",
  doorwayrow: "/videos/doorwayrow.mp4",
  mountainclimber: "/videos/pushup.mp4",
  flye: "/videos/flye.mp4",
  cobra: "/videos/cobra.mp4",
  plank: "/videos/plank.mp4",
  wallslide: "/videos/wallslide.mp4",
  superman: "/videos/superman.mp4",
  downdog: "/videos/dog.mp4",
  dog: "/videos/dog.mp4",
  default: "/videos/pushup.mp4"
};

const HER_IMAGES = {
  vacuum: "/reference/vacuum.jpg",
  deadbug: "/reference/deadbug.jpg",
  hipdip: "/reference/hipdip.jpg",
  flutter: "/reference/flutter.jpg",
  situp: "/reference/situp.jpg",
  birddog: "/reference/birddog.jpg",
  russiantwist: "/reference/russiantwist.jpg",
  plank: "/reference/plank.jpg",
  sidep: "/reference/sidep.jpg",
  glutebridge: "/reference/glutebridge.jpg",
  donkey: "/reference/donkey.jpg",
  hydrant: "/reference/hydrant.jpg",
  clamshell: "/reference/clamshell.jpg",
  curtsy: "/reference/curtsy.jpg",
  frogpump: "/reference/frogpump.jpg",
  bulg: "/reference/bulg.jpg",
  squat: "/reference/squat.jpg",
  calf: "/reference/calf.jpg",
  chestprayer: "/reference/chestprayer.jpg",
  inclinepush: "/reference/pushup.jpg",
  pushup: "/reference/pushup.jpg",
  kneepush: "/reference/pushup.jpg",
  tricepdip: "/reference/tricepdip.jpg",
  shouldertap: "/reference/shouldertap.jpg",
  pikepush: "/reference/pikepush.jpg",
  doorwayrow: "/reference/tricepdip.jpg",
  mountainclimber: "/reference/pushup.jpg",
  flye: "/reference/chestprayer.jpg",
  cobra: "/reference/cobra.jpg",
  wallslide: "/reference/cobra.jpg",
  superman: "/reference/cobra.jpg",
  dog: "/reference/cobra.jpg",
  default: "/reference/pushup.jpg"
};

export default function ExerciseVideoPlayer({ exerciseId, exerciseName, category }) {
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showPhoto, setShowPhoto] = useState(false);
  const videoRef = useRef(null);

  const videoSrc = HER_VIDEOS[exerciseId] || HER_VIDEOS.default;
  const imageSrc = HER_IMAGES[exerciseId] || HER_IMAGES.default;

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
      {showPhoto ? (
        <div style={{ position: "relative", width: "100%", height: "260px" }}>
          <img
            src={imageSrc}
            alt={exerciseName || "Biomechanical Reference"}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block"
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "10px",
              left: "10px",
              background: "rgba(13, 15, 18, 0.85)",
              backdropFilter: "blur(6px)",
              padding: "4px 10px",
              borderRadius: "8px",
              fontSize: "11px",
              color: "var(--acc)",
              fontWeight: "800"
            }}
          >
            📸 8K BIOMECHANICS REFERENCE
          </div>
        </div>
      ) : (
        <video
          ref={videoRef}
          src={videoSrc}
          poster={imageSrc}
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
      )}

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
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <button
            onClick={togglePlay}
            style={{
              background: "none",
              border: "none",
              color: "#fff",
              fontSize: "13px",
              cursor: "pointer",
              fontWeight: "700"
            }}
          >
            {isPlaying ? "⏸ Pause" : "▶ Play"}
          </button>

          <button
            onClick={() => setShowPhoto(!showPhoto)}
            style={{
              background: showPhoto ? "var(--acc)" : "rgba(255,255,255,0.1)",
              color: showPhoto ? "#0d0f12" : "#fff",
              border: "none",
              borderRadius: "6px",
              padding: "3px 8px",
              fontSize: "11px",
              fontWeight: "800",
              cursor: "pointer"
            }}
          >
            {showPhoto ? "🎬 Video Loop" : "📷 Photo"}
          </button>
        </div>

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
          {playbackRate}x {playbackRate === 0.5 ? "Slow" : ""}
        </button>
      </div>
    </div>
  );
}
