"use client";
import React from "react";
import { CATS, EXDB } from "@/data/db";
import { useFitness } from "@/context/FitnessContext";
import { useAuth } from "@/context/AuthContext";

export default function WorkoutModal({ workout, onClose }) {
  const { startWorkout } = useFitness();
  const { user, openAuthModal } = useAuth();
  const openTimeRef = React.useRef(0);

  React.useEffect(() => {
    if (workout) {
      openTimeRef.current = Date.now();
    }
  }, [workout?.id]);

  if (!workout) return null;

  const handleStart = () => {
    if (!user && workout.id !== "w1") {
      openAuthModal(`Sign in or create a free account to unlock ${workout.n} and start your guided session!`);
      return;
    }
    startWorkout(workout.id);
    onClose();
  };

  const handleBackdropClick = (e) => {
    if (Date.now() - openTimeRef.current < 300) return;
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="ov show" onClick={handleBackdropClick}>
      <div
        className="sheet"
        style={{
          background: "linear-gradient(180deg, #181119 0%, #0d0f12 100%)",
          border: "1.5px solid rgba(255, 112, 166, 0.4)",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.85), 0 0 30px rgba(255, 112, 166, 0.15)"
        }}
      >
        {/* Header: Tags & Close Button cleanly decoupled */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "10px", marginBottom: "8px" }}>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", alignItems: "center", flex: 1, minWidth: 0 }}>
            <span className="pill sm">
              <span className="d" style={{ background: CATS[workout.cat]?.c }}></span>
              {CATS[workout.cat]?.n}
            </span>
            <span className={`pill sm lv${workout.lv}`}>{"●".repeat(workout.lv)} L{workout.lv}</span>
            {!user && workout.id === "w1" && (
              <span className="pill sm" style={{ borderColor: "var(--ok)", color: "var(--ok)", whiteSpace: "nowrap" }}>
                🎁 Free Sample
              </span>
            )}
            {!user && workout.id !== "w1" && (
              <span className="pill sm" style={{ borderColor: "var(--acc)", color: "var(--acc)", whiteSpace: "nowrap" }}>
                🔒 Sign In Required
              </span>
            )}
          </div>
          <button className="xbtn" onClick={onClose} aria-label="Close modal">
            ✕
          </button>
        </div>

        <h3 style={{ fontSize: "22px", fontWeight: "900", margin: "6px 0 2px", color: "#fff", wordBreak: "break-word" }}>
          {workout.n}
        </h3>
        <p className="mut sm" style={{ margin: "2px 0 14px", color: "var(--tx-dim)", fontSize: "12.5px" }}>
          {workout.tag} · ~{workout.mins} min duration
        </p>

        <ul className="rl" style={{ margin: "10px 0" }}>
          {workout.ex.map((e, i) => {
            const exObj = EXDB.find((item) => item.id === e.x) || { n: e.x };
            return (
              <li
                key={i}
                style={{
                  padding: "9px 0",
                  borderBottom: "1px dashed var(--ln)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "10px",
                  flexWrap: "wrap"
                }}
              >
                <b style={{ fontSize: "13px", color: "#fff", wordBreak: "break-word", flex: "1 1 auto", minWidth: "120px" }}>
                  {exObj.n}
                </b>
                <span className="mut sm" style={{ fontSize: "12px", flexShrink: 0 }}>
                  {e.s} sets × {e.sec != null ? `${e.sec}s` : `${e.r} reps`} · {e.rest}s rest
                </span>
              </li>
            );
          })}
        </ul>

        {/* Action Buttons */}
        <div style={{ marginTop: "20px", display: "flex", gap: "10px", justifyContent: "flex-end", flexWrap: "wrap" }}>
          <button
            className="btn gh"
            style={{ flex: "1 1 80px", justifyContent: "center", padding: "11px 16px", borderRadius: "12px" }}
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="btn"
            onClick={handleStart}
            style={{
              flex: "2 1 180px",
              justifyContent: "center",
              padding: "11px 18px",
              background: (!user && workout.id !== "w1") ? "linear-gradient(135deg, #252b34 0%, #161a20 100%)" : "linear-gradient(135deg, #ff70a6, #ff3d68)",
              color: (!user && workout.id !== "w1") ? "var(--acc)" : "#0d0f12",
              border: (!user && workout.id !== "w1") ? "1px solid var(--acc)" : "none",
              fontWeight: "900",
              fontSize: "13.5px",
              borderRadius: "12px",
              boxShadow: "0 4px 16px rgba(255, 112, 166, 0.35)"
            }}
          >
            {(!user && workout.id !== "w1") ? "🔒 Sign In to Start" : "▶ START GUIDED SESSION"}
          </button>
        </div>
      </div>
    </div>
  );
}
