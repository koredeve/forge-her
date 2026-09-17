"use client";
import React, { useState, useEffect, useRef } from "react";
import { useFitness } from "@/context/FitnessContext";
import { haptics } from "@/lib/haptics";
import AuthGate from "@/components/AuthGate";

export default function Timer() {
  const { playBeep } = useFitness();

  const [workSec, setWorkSec] = useState(25);
  const [restSec, setRestSec] = useState(15);
  const [rounds, setRounds] = useState(6);

  const [curPhase, setCurPhase] = useState("IDLE"); // IDLE, WORK, REST, DONE
  const [curRound, setCurRound] = useState(1);
  const [timeLeft, setTimeLeft] = useState(25);
  const [totalElapsed, setTotalElapsed] = useState(0);

  const intervalRef = useRef(null);

  const totalDuration = rounds * (workSec + restSec);
  const strokeDashoffset = 628 * (1 - timeLeft / (curPhase === "WORK" ? workSec : restSec || 1));

  const startTimer = () => {
    haptics.medium();
    setCurPhase("WORK");
    setCurRound(1);
    setTimeLeft(workSec);
    setTotalElapsed(0);
    playBeep(880, 0.2);
  };

  const stopTimer = () => {
    setCurPhase("IDLE");
    clearInterval(intervalRef.current);
  };

  const applyPreset = (w, r, rnd) => {
    stopTimer();
    setWorkSec(w);
    setRestSec(r);
    setRounds(rnd);
    setTimeLeft(w);
  };

  useEffect(() => {
    if (curPhase === "WORK" || curPhase === "REST") {
      intervalRef.current = setInterval(() => {
        setTotalElapsed((prev) => prev + 1);
        setTimeLeft((prev) => {
          if (prev <= 4 && prev > 1) {
            playBeep(660, 0.08);
            haptics.countdown();
          }
          if (prev <= 1) {
            if (curPhase === "WORK") {
              if (curRound >= rounds) {
                setCurPhase("DONE");
                haptics.success();
                playBeep(1200, 0.4);
                clearInterval(intervalRef.current);
                return 0;
              } else {
                setCurPhase("REST");
                haptics.light();
                playBeep(440, 0.25);
                return restSec;
              }
            } else {
              setCurRound((r) => r + 1);
              setCurPhase("WORK");
              haptics.medium();
              playBeep(880, 0.25);
              return workSec;
            }
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [curPhase, curRound, rounds, workSec, restSec]);

  return (
    <AuthGate
      title="Sculpt Interval Timer"
      subtitle="Sign in to use customizable Tabata, TVA vacuum intervals, and audio cadences."
      icon="⏱️"
    >
      <div className="vw active" id="v-timer">
        <span className="cali-acc" style={{ color: "var(--acc)" }}>PRECISION CADENCE</span>
        <h1 className="pg" style={{ margin: "4px 0" }}>
          Sculpt <em>Timer</em>
        </h1>
        <p className="sub" style={{ maxWidth: "600px", color: "var(--tx-dim)", marginBottom: "22px" }}>
          TVA vacuums, glute burn intervals, and metabolic sculpt circuits with acoustic tone beeps and phone haptics.
        </p>

        <div className="tgrid">
          {/* Controls column */}
          <div className="card" style={{ border: "1.5px solid rgba(255, 112, 166, 0.3)" }}>
            <h3 style={{ fontSize: "18px", marginBottom: "14px", color: "#fff" }}>Cadence Settings</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div className="tf">
                Work (seconds)
                <input
                  type="number"
                  value={workSec}
                  onChange={(e) => setWorkSec(Math.max(5, parseInt(e.target.value, 10) || 5))}
                  disabled={curPhase !== "IDLE"}
                />
              </div>
              <div className="tf">
                Rest (seconds)
                <input
                  type="number"
                  value={restSec}
                  onChange={(e) => setRestSec(Math.max(0, parseInt(e.target.value, 10) || 0))}
                  disabled={curPhase !== "IDLE"}
                />
              </div>
              <div className="tf">
                Total Rounds
                <input
                  type="number"
                  value={rounds}
                  onChange={(e) => setRounds(Math.max(1, parseInt(e.target.value, 10) || 1))}
                  disabled={curPhase !== "IDLE"}
                />
              </div>
            </div>

            <div style={{ marginTop: "18px", display: "flex", gap: "8px" }}>
              {curPhase === "IDLE" || curPhase === "DONE" ? (
                <button
                  className="btn"
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    background: "linear-gradient(135deg, #ff70a6 0%, #ff85a1 100%)",
                    color: "#0d0f12",
                    fontWeight: "800"
                  }}
                  onClick={startTimer}
                >
                  ▶ Start Timer
                </button>
              ) : (
                <button
                  className="btn gh"
                  style={{ flex: 1, justifyContent: "center" }}
                  onClick={stopTimer}
                >
                  ⏹ Reset
                </button>
              )}
            </div>

            <div style={{ marginTop: "20px" }}>
              <span className="mut sm">Aesthetic Presets:</span>
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginTop: "8px" }}>
                <button className="pill" onClick={() => applyPreset(20, 15, 4)}>
                  ⏳ TVA Vacuum 20s/15s ×4
                </button>
                <button className="pill" onClick={() => applyPreset(45, 15, 6)}>
                  🍑 Glute Burn 45s/15s ×6
                </button>
                <button className="pill" onClick={() => applyPreset(20, 10, 8)}>
                  🔥 Tabata Sculpt 20s/10s ×8
                </button>
                <button className="pill" onClick={() => applyPreset(40, 20, 8)}>
                  ✨ Lean Tone 40s/20s ×8
                </button>
              </div>
            </div>
          </div>

          {/* Clock circle column */}
          <div
            className="card"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "320px",
              border: "1.5px solid rgba(255, 112, 166, 0.3)",
              background: "linear-gradient(180deg, #181119 0%, #0d0f12 100%)"
            }}
          >
            <div className="ring">
              <svg width="240" height="240" viewBox="0 0 240 240">
                <circle cx="120" cy="120" r="100" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="12" fill="none" />
                <circle
                  cx="120"
                  cy="120"
                  r="100"
                  stroke={curPhase === "REST" ? "#3ed598" : "var(--acc)"}
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray="628"
                  strokeDashoffset={isNaN(strokeDashoffset) ? 0 : strokeDashoffset}
                  strokeLinecap="round"
                  style={{ transition: "stroke-dashoffset 0.25s linear" }}
                />
              </svg>

              <div className="cin">
                <span
                  className="ph"
                  style={{
                    fontSize: "13px",
                    fontWeight: "800",
                    color: curPhase === "REST" ? "#3ed598" : "var(--acc)",
                    textTransform: "uppercase"
                  }}
                >
                  {curPhase === "IDLE" ? "READY 🌸" : curPhase}
                </span>
                <b style={{ fontSize: "52px", color: "#fff" }}>{curPhase === "IDLE" ? workSec : timeLeft}</b>
                <span className="mut sm" style={{ fontSize: "12px" }}>
                  {curPhase === "IDLE" ? "Tap Start" : `Round ${curRound} / ${rounds}`}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthGate>
  );
}
