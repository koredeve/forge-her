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
    // Guard against touch event bleed-through from opening card
    if (Date.now() - openTimeRef.current < 300) return;
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="ov show" onClick={handleBackdropClick}>
      <div className="sheet">
        <button className="xbtn" onClick={onClose}>✕</button>

        <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "4px" }}>
          <span className="pill">
            <span className="d" style={{ background: CATS[workout.cat]?.c }}></span>
            {CATS[workout.cat]?.n}
          </span>
          <span className={`pill lv${workout.lv}`}>{"●".repeat(workout.lv)} L{workout.lv}</span>
          {!user && workout.id === "w1" && (
            <span className="pill sm" style={{ borderColor: "var(--ok)", color: "var(--ok)" }}>
              🎁 Free Sample
            </span>
          )}
          {!user && workout.id !== "w1" && (
            <span className="pill sm" style={{ borderColor: "var(--acc)", color: "var(--acc)" }}>
              🔒 Sign In Required
            </span>
          )}
        </div>

        <h3 style={{ fontSize: "24px" }}>{workout.n}</h3>
        <p className="mut sm" style={{ margin: "4px 0 16px" }}>
          {workout.tag} · ~{workout.mins} min duration
        </p>

        <ul className="rl">
          {workout.ex.map((e, i) => {
            const exObj = EXDB.find((item) => item.id === e.x) || { n: e.x };
            return (
              <li key={i}>
                <b>{exObj.n}</b>
                <span className="mut sm">
                  {e.s} sets × {e.sec != null ? `${e.sec}s` : `${e.r} reps`} · {e.rest}s rest
                </span>
              </li>
            );
          })}
        </ul>

        <div style={{ marginTop: "20px", display: "flex", gap: "10px", justifyContent: "flex-end" }}>
          <button className="btn gh" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn"
            onClick={handleStart}
            style={{
              background: (!user && workout.id !== "w1") ? "linear-gradient(135deg, #252b34 0%, #161a20 100%)" : "linear-gradient(135deg, #ff70a6, #ff3d68)",
              color: (!user && workout.id !== "w1") ? "var(--acc)" : "#000",
              border: (!user && workout.id !== "w1") ? "1px solid var(--acc)" : "none",
              fontWeight: "900"
            }}
          >
            {(!user && workout.id !== "w1") ? "🔒 Sign In to Start" : "▶ START GUIDED SESSION"}
          </button>
        </div>
      </div>
    </div>
  );
}
