"use client";
import React, { useState } from "react";
import { PROGRAMS, WORKOUTS, CATS } from "@/data/db";
import { useFitness } from "@/context/FitnessContext";
import { useAuth } from "@/context/AuthContext";
import WorkoutModal from "@/components/WorkoutModal";
import CustomRoutineBuilderModal from "@/components/CustomRoutineBuilderModal";
import AuthGate from "@/components/AuthGate";

const FREE_PROGRAMS = ["p1"];

export default function Programs() {
  const { startWorkout, customRoutines = [], deleteCustomRoutine } = useFitness();
  const { user, isPro, openProModal, openAuthModal } = useAuth();
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [builderOpen, setBuilderOpen] = useState(false);
  const [editingRoutine, setEditingRoutine] = useState(null);

  const handleProgramAction = (pId, pName, wId) => {
    if (!user) {
      openAuthModal(`Sign in or create a free account to follow the ${pName} program!`);
      return;
    }
    const isLocked = !isPro && !FREE_PROGRAMS.includes(pId);
    if (isLocked) {
      openProModal(pName);
      return;
    }
    const w = WORKOUTS.find((item) => item.id === wId);
    setSelectedWorkout(w);
  };

  const handleDirectStart = (pId, pName, wId) => {
    if (!user) {
      openAuthModal(`Sign in or create a free account to launch sessions from ${pName}!`);
      return;
    }
    const isLocked = !isPro && !FREE_PROGRAMS.includes(pId);
    if (isLocked) {
      openProModal(pName);
      return;
    }
    startWorkout(wId);
  };

  return (
    <AuthGate
      title="Feminine Programs & Routines"
      subtitle="Sign in to follow multi-week sculpting roadmaps, build custom routines, and track your daily sessions."
      icon="🌸"
    >
      <div className="vw active" id="v-programs">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "10px", marginBottom: "18px" }}>
          <div>
            <span className="cali-acc" style={{ color: "var(--acc)" }}>STRUCTURED PERIODIZATION</span>
            <h1 className="pg" style={{ margin: "4px 0" }}>
              Sculpt <em>Programs</em>
            </h1>
            <p className="sub" style={{ maxWidth: "600px", color: "var(--tx-dim)" }}>
              Multi-week progressive training roadmaps designed to cinch your waistline, build an hourglass glute shelf, and elongate your posture.
            </p>
          </div>

          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <button
              className="btn gh"
              style={{
                borderColor: "rgba(255, 112, 166, 0.4)",
                color: "var(--acc)",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "10px 16px",
                fontSize: "13px"
              }}
              onClick={() => {
                setEditingRoutine(null);
                setBuilderOpen(true);
              }}
            >
              <span>🛠️</span>
              <span>+ Build Custom Routine</span>
            </button>

            {!isPro && (
              <button
                className="btn"
                style={{
                  background: "linear-gradient(135deg, #ff70a6 0%, #ff85a1 100%)",
                  boxShadow: "0 6px 20px rgba(255, 112, 166, 0.35)",
                  padding: "10px 18px",
                  fontSize: "13px",
                  color: "#0d0f12",
                  fontWeight: "800"
                }}
                onClick={() => openProModal("All Sculpt Programs")}
              >
                🌸 Unlock All Programs with PRO
              </button>
            )}
          </div>
        </div>

        {/* Programs Grid */}
        <div className="grid g2" style={{ marginBottom: "36px" }}>
          {PROGRAMS.map((p) => {
            const isLocked = !isPro && !FREE_PROGRAMS.includes(p.id);

            return (
              <div key={p.id} className="card" style={{ padding: 0, overflow: "hidden", border: "1.5px solid rgba(255, 112, 166, 0.3)" }}>
                {/* Program Header Banner */}
                <div style={{ position: "relative", height: "150px", width: "100%", overflow: "hidden", background: "linear-gradient(135deg, #24141f 0%, #0d0f12 100%)" }}>
                  <img
                    src="/banners/hero.jpg"
                    alt={p.n}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      opacity: isLocked ? 0.2 : 0.35,
                      filter: "contrast(115%) hue-rotate(310deg)"
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(180deg, rgba(18, 14, 18, 0.2) 0%, rgba(18, 14, 18, 0.95) 100%)",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                      padding: "16px"
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "6px" }}>
                      <div>
                        <span className="pill" style={{ borderColor: CATS[p.cat]?.c, color: CATS[p.cat]?.c, fontSize: "10px" }}>
                          {CATS[p.cat]?.n}
                        </span>
                        <b style={{ display: "block", fontSize: "19px", marginTop: "4px", color: "#fff" }}>
                          {p.n} {isLocked && <span style={{ fontSize: "12px", color: "var(--acc)" }}>🔒 (PRO)</span>}
                        </b>
                      </div>
                      <span className={`pill lv${p.lv}`}>{"●".repeat(p.lv)} L{p.lv}</span>
                    </div>
                  </div>
                </div>

                {/* Program Schedule & Days */}
                <div style={{ padding: "18px" }}>
                  <p className="mut sm" style={{ color: "var(--tx-dim)", fontSize: "12.5px" }}>
                    {p.focus} · <b>{p.wks}</b>
                  </p>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
                      gap: "8px",
                      marginTop: "14px"
                    }}
                  >
                    {p.days.map(([d, wId], idx) => {
                      const w = WORKOUTS.find((item) => item.id === wId);
                      return wId === "rest" ? (
                        <div key={idx} className="card" style={{ padding: "10px", borderStyle: "dashed", background: "rgba(255,255,255,0.02)" }}>
                          <b className="sm" style={{ color: "var(--mut)" }}>{d}</b>
                          <div className="mut sm" style={{ fontSize: "11px" }}>Rest & Recover 🌸</div>
                        </div>
                      ) : (
                        <div
                          key={idx}
                          className="card cl"
                          style={{ padding: "10px", borderColor: "rgba(255, 112, 166, 0.25)", cursor: "pointer" }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleProgramAction(p.id, p.n, wId);
                          }}
                        >
                          <b className="sm" style={{ color: "var(--acc)" }}>{d}</b>
                          <div className="sm" style={{ fontWeight: "600", fontSize: "11.5px", marginTop: "2px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                            {w?.n}
                          </div>
                          <button
                            className="btn sm"
                            style={{
                              marginTop: "8px",
                              width: "100%",
                              justifyContent: "center",
                              padding: "5px",
                              fontSize: "11px",
                              background: isLocked ? "rgba(255,255,255,0.06)" : "linear-gradient(135deg, #ff70a6 0%, #ff85a1 100%)",
                              color: isLocked ? "var(--mut)" : "#0d0f12",
                              fontWeight: "800"
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDirectStart(p.id, p.n, wId);
                            }}
                          >
                            {isLocked ? "🔒 Unlock" : "Start →"}
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  <p className="mut sm" style={{ marginTop: "14px", fontSize: "12px", color: "var(--acc-warm)" }}>
                    💡 {p.tip}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom Goddess Routines */}
        <div style={{ marginTop: "30px", marginBottom: "36px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px", marginBottom: "16px" }}>
            <div>
              <span className="cali-acc" style={{ color: "var(--acc)" }}>BESPOKE SPLITS</span>
              <h2 style={{ fontSize: "20px", margin: 0, fontWeight: "900" }}>Custom Goddess Routines</h2>
              <span className="mut sm">Personalized routines configured by you · Run with 60FPS video & haptics</span>
            </div>
            <button
              className="btn sm"
              style={{ background: "linear-gradient(135deg, #ff70a6 0%, #ff85a1 100%)", color: "#0d0f12", fontWeight: "900", fontSize: "12.5px" }}
              onClick={() => {
                setEditingRoutine(null);
                setBuilderOpen(true);
              }}
            >
              + Create Routine
            </button>
          </div>

          {customRoutines.length === 0 ? (
            <div
              className="card"
              style={{
                textAlign: "center",
                padding: "36px 20px",
                border: "2px dashed rgba(255, 112, 166, 0.3)",
                background: "rgba(255, 255, 255, 0.02)",
                borderRadius: "16px"
              }}
            >
              <div style={{ fontSize: "38px", marginBottom: "10px" }}>🌸</div>
              <h3 style={{ fontSize: "18px", margin: "0 0 6px" }}>Build Your Signature Routine</h3>
              <p className="mut sm" style={{ maxWidth: "440px", margin: "0 auto 18px", fontSize: "13px" }}>
                Combine any of the 25 exercises in the FORGE HER catalog (TVA vacuums, glute bridges, fire hydrants, posture cobras), dial in your reps or seconds, and launch in the real-time guided player.
              </p>
              <button
                className="btn sm"
                style={{ background: "linear-gradient(135deg, #ff70a6 0%, #ff85a1 100%)", color: "#0d0f12", fontWeight: "900" }}
                onClick={() => {
                  setEditingRoutine(null);
                  setBuilderOpen(true);
                }}
              >
                + Launch Routine Builder
              </button>
            </div>
          ) : (
            <div className="grid g3">
              {customRoutines.map((cr) => (
                <div key={cr.id} className="card cl" style={{ padding: "16px", borderColor: "rgba(255, 112, 166, 0.3)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span className="pill sm" style={{ borderColor: "var(--acc)", color: "var(--acc)" }}>
                      CUSTOM ROUTINE
                    </span>
                    <span className="mut sm">~{cr.mins || 20} min</span>
                  </div>
                  <b style={{ display: "block", fontSize: "17px", margin: "8px 0 4px" }}>{cr.n}</b>
                  <span className="mut sm">{cr.ex?.length || 0} exercises</span>
                  <div style={{ display: "flex", gap: "8px", marginTop: "14px" }}>
                    <button
                      className="btn sm"
                      style={{ flex: 1, justifyContent: "center", background: "linear-gradient(135deg, #ff70a6 0%, #ff85a1 100%)", color: "#0d0f12", fontWeight: "800" }}
                      onClick={() => startWorkout(cr.id)}
                    >
                      Start →
                    </button>
                    <button
                      className="btn gh sm"
                      onClick={() => {
                        setEditingRoutine(cr);
                        setBuilderOpen(true);
                      }}
                    >
                      ✏️
                    </button>
                    <button
                      className="btn gh sm"
                      style={{ color: "#ff8f8f" }}
                      onClick={() => deleteCustomRoutine(cr.id)}
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* All Guided Workouts Catalog */}
        <div style={{ marginBottom: "20px" }}>
          <div className="sh" style={{ marginBottom: "14px" }}>
            <span className="cali-acc" style={{ color: "var(--acc)" }}>STANDALONE SESSIONS</span>
            <h2 style={{ fontSize: "20px", fontWeight: "900", margin: "2px 0 0" }}>All Guided Workouts</h2>
          </div>

          <div className="grid g3">
            {WORKOUTS.map((w) => (
              <div
                key={w.id}
                className="card cl"
                style={{ borderColor: "rgba(255, 112, 166, 0.25)", cursor: "pointer", padding: "16px" }}
                onClick={() => setSelectedWorkout(w)}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span className="pill sm" style={{ borderColor: CATS[w.cat]?.c, color: CATS[w.cat]?.c }}>
                    {CATS[w.cat]?.n}
                  </span>
                  <span className="mut sm">⏱️ {w.mins} mins</span>
                </div>
                <b style={{ display: "block", fontSize: "16.5px", margin: "8px 0 4px" }}>{w.n}</b>
                <p className="mut sm" style={{ fontSize: "12px", lineHeight: "1.4", margin: "0 0 12px" }}>{w.tag}</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span className={`pill lv${w.lv}`}>{"●".repeat(w.lv)} L{w.lv}</span>
                  <button
                    className="btn sm"
                    style={{ background: "linear-gradient(135deg, #ff70a6 0%, #ff85a1 100%)", color: "#0d0f12", fontWeight: "800" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      startWorkout(w.id);
                    }}
                  >
                    Start →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modals */}
        <WorkoutModal
          workout={selectedWorkout}
          onClose={() => setSelectedWorkout(null)}
        />
        <CustomRoutineBuilderModal
          isOpen={builderOpen}
          onClose={() => setBuilderOpen(false)}
          routineToEdit={editingRoutine}
        />
      </div>
    </AuthGate>
  );
}
