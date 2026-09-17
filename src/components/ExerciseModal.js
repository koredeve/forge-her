"use client";
import React, { useState } from "react";
import { CATS, EXDB } from "@/data/db";
import ExerciseVideoPlayer from "./ExerciseVideoPlayer";

export default function ExerciseModal({ exercise, onClose, onSelectExercise }) {
  if (!exercise) return null;

  const regObj = EXDB.find((e) => e.n.toLowerCase() === exercise.reg?.toLowerCase());
  const progObj = EXDB.find((e) => e.n.toLowerCase() === exercise.prog?.toLowerCase());

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="ov show" onClick={handleBackdropClick} style={{ zIndex: 1250 }}>
      <div
        className="sheet"
        style={{
          maxWidth: "640px",
          background: "linear-gradient(180deg, #181119 0%, #0d0f12 100%)",
          border: "1.5px solid rgba(255, 112, 166, 0.4)",
          borderRadius: "20px"
        }}
      >
        <button className="xbtn" onClick={onClose} style={{ fontSize: "20px" }}>✕</button>

        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
          <span className="pill" style={{ borderColor: CATS[exercise.cat]?.c, color: CATS[exercise.cat]?.c }}>
            <span className="d" style={{ background: CATS[exercise.cat]?.c }}></span>
            {CATS[exercise.cat]?.n}
          </span>
          <span className={`pill lv${exercise.lv}`}>{"●".repeat(exercise.lv)} L{exercise.lv}</span>
          <span className="pill">🧰 {exercise.eq}</span>
        </div>

        <h3 style={{ marginTop: "12px", fontSize: "22px", fontWeight: "900", color: "#fff" }}>
          {exercise.n}
        </h3>
        <div className="mut sm" style={{ marginBottom: "10px", color: "var(--acc)" }}>
          🎯 Targets: {exercise.ms}
        </div>
        <p style={{ fontSize: "13.5px", lineHeight: "1.45", color: "var(--tx-dim)" }}>
          {exercise.d}
        </p>

        {/* Video Player */}
        <ExerciseVideoPlayer
          exerciseId={exercise.id}
          exerciseName={exercise.n}
          category={exercise.cat}
        />

        {/* Execution Cues */}
        <div className="sect" style={{ margin: "16px 0 6px" }}>
          <b style={{ fontSize: "13px", color: "var(--ok)" }}>✔ Form Execution Cues</b>
        </div>
        <ul className="rl" style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          {exercise.cu?.map((c, i) => (
            <li key={i} className="blk" style={{ fontSize: "13px" }}>✔ {c}</li>
          ))}
        </ul>

        {/* Mistakes */}
        <div className="sect" style={{ margin: "14px 0 6px" }}>
          <b style={{ fontSize: "13px", color: "#ff8f8f" }}>✖ Mistakes to Avoid</b>
        </div>
        <ul className="rl" style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          {exercise.bd?.map((c, i) => (
            <li key={i} className="blk" style={{ fontSize: "13px" }}>
              <span style={{ color: "#ff8f8f" }}>✖</span> {c}
            </li>
          ))}
        </ul>

        {/* Progression / Regression */}
        <div className="sect" style={{ margin: "14px 0 6px" }}>
          <b style={{ fontSize: "13px", color: "var(--acc)" }}>🪜 Progression Roadmap</b>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginTop: "6px" }}>
          <div style={{ background: "rgba(255,255,255,0.03)", padding: "10px 12px", borderRadius: "10px", border: "1px solid var(--ln)" }}>
            <span style={{ fontSize: "10px", color: "var(--mut)", display: "block" }}>REGRESSION (EASIER)</span>
            <span
              style={{
                fontSize: "12.5px",
                cursor: regObj ? "pointer" : "default",
                color: regObj ? "var(--acc)" : "var(--tx)",
                fontWeight: "700"
              }}
              onClick={() => regObj && onSelectExercise && onSelectExercise(regObj)}
            >
              {exercise.reg} {regObj ? "→" : ""}
            </span>
          </div>

          <div style={{ background: "rgba(255,255,255,0.03)", padding: "10px 12px", borderRadius: "10px", border: "1px solid var(--ln)" }}>
            <span style={{ fontSize: "10px", color: "var(--mut)", display: "block" }}>PROGRESSION (HARDER)</span>
            <span
              style={{
                fontSize: "12.5px",
                cursor: progObj ? "pointer" : "default",
                color: progObj ? "var(--acc)" : "var(--tx)",
                fontWeight: "700"
              }}
              onClick={() => progObj && onSelectExercise && onSelectExercise(progObj)}
            >
              {exercise.prog} {progObj ? "→" : ""}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
