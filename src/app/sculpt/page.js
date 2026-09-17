"use client";
import React, { useState } from "react";
import { SKILLS, WORKOUTS, EXDB } from "@/data/db";
import { useFitness } from "@/context/FitnessContext";
import { useAuth } from "@/context/AuthContext";
import WorkoutModal from "@/components/WorkoutModal";
import ExerciseModal from "@/components/ExerciseModal";
import AuthGate from "@/components/AuthGate";
import { haptics } from "@/lib/haptics";

const FREE_SKILLS = ["pushup", "vacuum", "glutebridge"];

export default function Sculpt() {
  const { skills, toggleSkill, getSkillsPct, startWorkout } = useFitness();
  const { user, isPro, openProModal, openAuthModal } = useAuth();

  const [openSkills, setOpenSkills] = useState({
    pushup: true,
    vacuum: true,
    glutebridge: true
  });
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [selectedEx, setSelectedEx] = useState(null);

  const toggleOpen = (id) => {
    setOpenSkills((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const masteryPct = getSkillsPct();

  const openFormPreview = (levelTitle, skillId) => {
    const match =
      EXDB.find(
        (e) =>
          e.id === skillId ||
          levelTitle.toLowerCase().includes(e.n.toLowerCase()) ||
          e.n.toLowerCase().includes(levelTitle.split("·")[0].trim().toLowerCase())
      ) || EXDB[0];
    setSelectedEx(match);
  };

  const handleLevelClick = (skillId, levelIdx, skillName) => {
    if (!user) {
      if (levelIdx > 0 || skillId !== "pushup") {
        haptics.countdown();
        openAuthModal(`Sign in or create a free account to track your levels and progress on ${skillName}!`);
        return;
      }
    }
    const isLevelLocked = !isPro && (!FREE_SKILLS.includes(skillId) || levelIdx >= 2);
    if (isLevelLocked) {
      haptics.countdown();
      openProModal(`${skillName} (Level ${levelIdx + 1})`);
      return;
    }
    haptics.medium();
    toggleSkill(skillId, levelIdx);
  };

  return (
    <AuthGate
      title="Feminine Sculpt Ladders"
      subtitle="Sign in to track your progression levels, master strict push-ups & TVA vacuums, and shape your silhouette."
      icon="🌸"
    >
      <div className="vw active" id="v-sculpt">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "10px", marginBottom: "16px" }}>
          <div>
            <span className="cali-acc" style={{ color: "var(--acc)" }}>PROGRESSIVE BODYWEIGHT MASTERY</span>
            <h1 className="pg" style={{ margin: "4px 0" }}>
              Sculpt <em>Ladders</em>
            </h1>
            <p className="sub" style={{ maxWidth: "600px", color: "var(--tx-dim)" }}>
              The 5 signature pillars of feminine calisthenics: strict floor push-ups, cinched corset core, high glute shelf, side hip curves, and elongated anti-hunch posture.
            </p>
          </div>

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
              onClick={() => openProModal("All 5 Sculpt Ladders")}
            >
              🌸 Unlock All Ladders with PRO
            </button>
          )}
        </div>

        {/* Overall Mastery Pill */}
        <div className="stats" style={{ marginBottom: "24px" }}>
          <div className="stat" style={{ background: "var(--p)", border: "1px solid var(--ln)", borderRadius: "14px", padding: "16px 20px" }}>
            <b style={{ fontSize: "28px", color: "var(--acc)", display: "block" }}>{masteryPct}%</b>
            <span style={{ fontSize: "12px", color: "var(--mut)" }}>Overall Feminine Mastery</span>
          </div>
        </div>

        {/* 4 Skill Ladders Accordion */}
        <div className="grid g2" id="skGrid" style={{ marginBottom: "36px" }}>
          {SKILLS.map((s) => {
            const userLevels = skills[s.id] || [];
            const doneCount = s.lv.filter((_, i) => userLevels[i]).length;
            const pct = Math.round((doneCount / s.lv.length) * 100);
            const isOpen = !!openSkills[s.id];
            const isSkillLocked = !isPro && !FREE_SKILLS.includes(s.id);

            return (
              <div
                key={s.id}
                className={`card skill ${isOpen ? "open" : ""}`}
                id={`sk-${s.id}`}
                style={{
                  borderColor: isSkillLocked ? "var(--ln)" : "rgba(255, 112, 166, 0.3)",
                  background: isSkillLocked ? "rgba(18, 14, 18, 0.6)" : "var(--p)",
                  padding: "18px",
                  borderRadius: "16px"
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    cursor: "pointer",
                    gap: "12px"
                  }}
                  onClick={() => toggleOpen(s.id)}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div
                      style={{
                        fontSize: "26px",
                        width: "44px",
                        height: "44px",
                        borderRadius: "10px",
                        background: "rgba(255, 112, 166, 0.12)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0
                      }}
                    >
                      {s.icon}
                    </div>
                    <div>
                      <h4 style={{ margin: 0, fontSize: "16px", display: "flex", alignItems: "center", gap: "6px" }}>
                        <span>{s.n}</span>
                        {isSkillLocked && (
                          <span className="pill" style={{ borderColor: "var(--acc)", color: "var(--acc)", padding: "2px 6px", fontSize: "9px" }}>
                            🔒 PRO
                          </span>
                        )}
                      </h4>
                      <span className="mut sm" style={{ fontSize: "12px" }}>
                        {doneCount} of {s.lv.length} levels unlocked
                      </span>
                    </div>
                  </div>
                  <span className="pct" style={{ fontSize: "18px", fontWeight: "900", color: "var(--acc)" }}>
                    {pct}%
                  </span>
                </div>

                <div className="pb" style={{ marginTop: "12px", height: "6px", background: "rgba(255,255,255,0.06)", borderRadius: "99px", overflow: "hidden" }}>
                  <i style={{ width: `${pct}%`, height: "100%", background: "linear-gradient(90deg, #ff70a6, #ff85a1)", display: "block" }}></i>
                </div>

                <div className="lvls" style={{ display: isOpen ? "block" : "none", marginTop: "16px" }}>
                  {s.lv.map((l, i) => {
                    const isProLocked = !isPro && (!FREE_SKILLS.includes(s.id) || i >= 2);
                    const isMastered = i < doneCount;
                    const isCurrentTarget = i === doneCount && !isProLocked;
                    const isFutureLocked = i > doneCount && !isProLocked;

                    return (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "10px 12px",
                          margin: "6px 0",
                          borderRadius: "10px",
                          border: isCurrentTarget
                            ? "1px solid rgba(255, 112, 166, 0.5)"
                            : "1px dashed var(--ln)",
                          background: isCurrentTarget
                            ? "rgba(255, 112, 166, 0.08)"
                            : isMastered
                            ? "rgba(62, 213, 152, 0.04)"
                            : "transparent",
                          opacity: isProLocked || isFutureLocked ? 0.65 : 1,
                          transition: "all 0.2s ease"
                        }}
                      >
                        <label
                          style={{ display: "flex", gap: "10px", alignItems: "center", cursor: "pointer", flex: 1 }}
                          onClick={(e) => {
                            e.preventDefault();
                            handleLevelClick(s.id, i, s.n);
                          }}
                        >
                          {isProLocked ? (
                            <span style={{ fontSize: "14px", color: "var(--acc)" }}>🔒</span>
                          ) : (
                            <input
                              type="checkbox"
                              checked={isMastered}
                              onChange={() => {}}
                              style={{
                                accentColor: "var(--acc)",
                                width: "17px",
                                height: "17px",
                                cursor: "pointer"
                              }}
                            />
                          )}
                          <div>
                            <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
                              <b style={{ color: isMastered ? "var(--ok)" : isCurrentTarget ? "var(--acc)" : "var(--tx)", fontSize: "13.5px" }}>
                                Lv{i + 1} · {l[0]}
                              </b>
                              {isProLocked && (
                                <span className="pill" style={{ borderColor: "var(--acc)", color: "var(--acc)", fontSize: "9px", padding: "1px 5px" }}>
                                  🌸 PRO
                                </span>
                              )}
                              {isMastered && (
                                <span className="pill" style={{ borderColor: "var(--ok)", color: "var(--ok)", fontSize: "9px", padding: "1px 5px" }}>
                                  ✓ Mastered
                                </span>
                              )}
                              {isCurrentTarget && (
                                <span className="pill" style={{ borderColor: "var(--acc)", color: "var(--acc)", fontSize: "9px", padding: "1px 5px" }}>
                                  🎯 Current Target
                                </span>
                              )}
                              {isFutureLocked && (
                                <span style={{ fontSize: "10px", color: "var(--mut)" }}>
                                  (Requires Lv{i})
                                </span>
                              )}
                            </div>
                            <span className="crit" style={{ display: "block", fontSize: "12px", marginTop: "2px", color: "var(--mut)" }}>
                              {l[1]}
                            </span>
                          </div>
                        </label>

                        <button
                          className="btn gh sm"
                          style={{ padding: "4px 8px", fontSize: "11px", whiteSpace: "nowrap", marginLeft: "8px" }}
                          onClick={(e) => {
                            e.stopPropagation();
                            openFormPreview(l[0], s.id);
                          }}
                        >
                          Guide 🎬
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Guided Routines Bar */}
        <div className="sect" style={{ marginBottom: "14px" }}>
          <h2>Associated Sculpt Routines</h2>
          <span className="mut">Click to preview or launch</span>
        </div>

        <div className="grid g3">
          {WORKOUTS.slice(0, 3).map((w) => (
            <div
              key={w.id}
              className="card cl"
              style={{ borderColor: "rgba(255, 112, 166, 0.3)", cursor: "pointer", padding: "16px" }}
              onClick={() => setSelectedWorkout(w)}
            >
              <div className="cali-acc" style={{ color: "var(--acc)" }}>🌸 GUIDED SCULPT</div>
              <b style={{ display: "block", fontSize: "17px", marginTop: "6px" }}>{w.n}</b>
              <div className="mut sm" style={{ margin: "4px 0 12px" }}>
                {w.tag} · ~{w.mins} min
              </div>
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

        {/* Modals */}
        <WorkoutModal
          workout={selectedWorkout}
          onClose={() => setSelectedWorkout(null)}
        />
        <ExerciseModal
          exercise={selectedEx}
          onClose={() => setSelectedEx(null)}
          onSelectExercise={(ex) => setSelectedEx(ex)}
        />
      </div>
    </AuthGate>
  );
}
