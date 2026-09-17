"use client";
import React, { useState } from "react";
import AuthGate from "@/components/AuthGate";

export default function Fuel() {
  const [weightKg, setWeightKg] = useState(60);
  const [activePhase, setActivePhase] = useState("follicular"); // "follicular" | "luteal"

  const proteinMin = Math.round(weightKg * 1.6);
  const proteinMax = Math.round(weightKg * 2.0);
  const waterLiters = (weightKg * 0.038).toFixed(1);
  const recompCals = Math.round(weightKg * 30);

  return (
    <AuthGate
      title="Feminine Fuel & Cycle Syncing"
      subtitle="Sign in to access cycle-synced nutrition, anti-bloat protocols, and personalized protein formulas."
      icon="🥗"
    >
      <div className="vw active" id="v-fuel">
        {/* Banner */}
        <div
          style={{
            position: "relative",
            borderRadius: "20px",
            overflow: "hidden",
            border: "1.5px solid rgba(255, 112, 166, 0.35)",
            marginBottom: "24px",
            height: "220px",
            background: "linear-gradient(135deg, #1f141d 0%, #0d0f12 100%)"
          }}
        >
          <img
            src="/banners/fuel.jpg"
            alt="Feminine Nutrition"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.45,
              filter: "contrast(115%) hue-rotate(315deg)"
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(180deg, rgba(13, 15, 18, 0.2) 0%, rgba(13, 15, 18, 0.95) 100%)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              padding: "20px 24px"
            }}
          >
            <span
              className="pill"
              style={{
                alignSelf: "flex-start",
                marginBottom: "6px",
                borderColor: "var(--acc)",
                color: "var(--acc)"
              }}
            >
              🌸 FEMININE FUEL & CYCLE SYNCING
            </span>
            <h1 className="pg" style={{ margin: 0, fontSize: "28px" }}>
              Fuel for <em>Silhouette & Tone</em>
            </h1>
          </div>
        </div>

        <p className="sub" style={{ maxWidth: "620px", color: "var(--tx-dim)", marginBottom: "26px" }}>
          Nourish your hormone cycle, banish lower belly water retention, and supply clean amino acids to sculpt lean muscle tone without bulking.
        </p>

        {/* Cycle-Synced Nutrition Interactive Switcher */}
        <div
          style={{
            background: "linear-gradient(135deg, #181119 0%, #0d0f12 100%)",
            border: "1.5px solid rgba(255, 112, 166, 0.3)",
            borderRadius: "18px",
            padding: "20px",
            marginBottom: "28px"
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px", marginBottom: "16px" }}>
            <div>
              <span className="cali-acc" style={{ color: "var(--acc)" }}>HORMONAL HARMONY</span>
              <h3 style={{ fontSize: "19px", margin: "2px 0 0", fontWeight: "900" }}>Cycle-Synced Training & Nutrition</h3>
            </div>

            <div style={{ display: "flex", gap: "6px", background: "rgba(255,255,255,0.04)", padding: "4px", borderRadius: "10px" }}>
              <button
                style={{
                  padding: "6px 14px",
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "12px",
                  fontWeight: "700",
                  background: activePhase === "follicular" ? "linear-gradient(135deg, #ff70a6, #ff85a1)" : "transparent",
                  color: activePhase === "follicular" ? "#0d0f12" : "var(--mut)"
                }}
                onClick={() => setActivePhase("follicular")}
              >
                🌱 Follicular Phase (Days 1–14)
              </button>
              <button
                style={{
                  padding: "6px 14px",
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "12px",
                  fontWeight: "700",
                  background: activePhase === "luteal" ? "linear-gradient(135deg, #ffd166, #ff85a1)" : "transparent",
                  color: activePhase === "luteal" ? "#0d0f12" : "var(--mut)"
                }}
                onClick={() => setActivePhase("luteal")}
              >
                🌕 Luteal Phase (Days 15–28)
              </button>
            </div>
          </div>

          {activePhase === "follicular" ? (
            <div className="g2">
              <div style={{ background: "rgba(255,255,255,0.03)", padding: "14px", borderRadius: "12px", border: "1px solid var(--ln)" }}>
                <b style={{ color: "var(--acc)", fontSize: "15px" }}>⚡ High Energy & Strength Window</b>
                <p className="mut sm" style={{ marginTop: "6px", fontSize: "12.5px", lineHeight: "1.4" }}>
                  Estrogen is on the rise. Insulin sensitivity is highest, making carbohydrates easily stored as muscle glycogen. Push progressive overload on Glute Bridges, Bulgarian Squats, and HIIT.
                </p>
              </div>
              <div style={{ background: "rgba(255,255,255,0.03)", padding: "14px", borderRadius: "12px", border: "1px solid var(--ln)" }}>
                <b style={{ color: "var(--ok)", fontSize: "15px" }}>🥗 Optimal Plate</b>
                <p className="mut sm" style={{ marginTop: "6px", fontSize: "12.5px", lineHeight: "1.4" }}>
                  Lean proteins (salmon, chicken breast, tofu), complex carbohydrates (sweet potatoes, quinoa, berries), and sprouted greens to assist liver estrogen clearance.
                </p>
              </div>
            </div>
          ) : (
            <div className="g2">
              <div style={{ background: "rgba(255,255,255,0.03)", padding: "14px", borderRadius: "12px", border: "1px solid var(--ln)" }}>
                <b style={{ color: "var(--acc-gold)", fontSize: "15px" }}>🧘 Metabolic Shift & Fluid Flush</b>
                <p className="mut sm" style={{ marginTop: "6px", fontSize: "12.5px", lineHeight: "1.4" }}>
                  Progesterone rises; core temperature increases and metabolic rate ticks up by 100–200 kcal. Shift toward steady-state sculpt flows, deep TVA vacuums, and posture realignments.
                </p>
              </div>
              <div style={{ background: "rgba(255,255,255,0.03)", padding: "14px", borderRadius: "12px", border: "1px solid var(--ln)" }}>
                <b style={{ color: "#3ed598", fontSize: "15px" }}>🥑 Anti-Bloat & Magnesium Fuel</b>
                <p className="mut sm" style={{ marginTop: "6px", fontSize: "12.5px", lineHeight: "1.4" }}>
                  Load up on potassium (avocado, coconut water, bananas) to dump sodium-induced water weight. Add dark chocolate (85%) and pumpkin seeds for magnesium to prevent cravings.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Personalized Toning Calculator */}
        <div
          style={{
            background: "var(--p)",
            border: "1px solid var(--ln)",
            borderRadius: "18px",
            padding: "20px",
            marginBottom: "28px"
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px", marginBottom: "14px" }}>
            <div>
              <span className="cali-acc" style={{ color: "var(--acc)" }}>PERSONALIZED FORMULA</span>
              <h3 style={{ fontSize: "18px", margin: "2px 0 0", fontWeight: "900" }}>Goddess Macro Calculator</h3>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "13px", color: "var(--tx)" }}>Your Weight:</span>
              <input
                type="number"
                value={weightKg}
                onChange={(e) => setWeightKg(Math.max(35, parseInt(e.target.value, 10) || 50))}
                style={{
                  width: "70px",
                  padding: "6px 10px",
                  background: "rgba(0,0,0,0.4)",
                  border: "1px solid var(--ln)",
                  borderRadius: "8px",
                  color: "#fff",
                  fontSize: "14px",
                  fontWeight: "700"
                }}
              />
              <span style={{ fontSize: "13px", color: "var(--mut)" }}>kg</span>
            </div>
          </div>

          <div className="g3">
            <div className="stat" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--ln)", borderRadius: "12px" }}>
              <div className="v" style={{ color: "var(--acc)" }}>{proteinMin}–{proteinMax}g</div>
              <div className="l">🥩 Daily Lean Protein</div>
            </div>
            <div className="stat" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--ln)", borderRadius: "12px" }}>
              <div className="v" style={{ color: "#3ed598" }}>{waterLiters} L</div>
              <div className="l">💧 Anti-Bloat Hydration</div>
            </div>
            <div className="stat" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--ln)", borderRadius: "12px" }}>
              <div className="v" style={{ color: "var(--acc-gold)" }}>~{recompCals} kcal</div>
              <div className="l">⚖️ Body Recomp Target</div>
            </div>
          </div>
        </div>

        {/* Anti-Bloat Flat Tummy Protocol */}
        <div className="sect" style={{ marginBottom: "14px" }}>
          <h2>The Anti-Bloat Flat Tummy Protocol</h2>
          <span className="mut">How to keep the waist cinched all day</span>
        </div>

        <div className="grid g3" style={{ marginBottom: "32px" }}>
          <div className="card" style={{ padding: "16px" }}>
            <div style={{ fontSize: "28px", marginBottom: "6px" }}>☕</div>
            <b style={{ fontSize: "15px", color: "#fff", display: "block", marginBottom: "4px" }}>
              Fasted Morning Vacuum
            </b>
            <p className="mut sm" style={{ fontSize: "12px", lineHeight: "1.4" }}>
              Practice your 3 rounds of stomach vacuums before consuming food or coffee. An empty digestive tract allows deepest TVA retraction.
            </p>
          </div>

          <div className="card" style={{ padding: "16px" }}>
            <div style={{ fontSize: "28px", marginBottom: "6px" }}>🥒</div>
            <b style={{ fontSize: "15px", color: "#fff", display: "block", marginBottom: "4px" }}>
              Potassium-Sodium Balance
            </b>
            <p className="mut sm" style={{ fontSize: "12px", lineHeight: "1.4" }}>
              High sodium without potassium pulls fluid under the subcutaneous skin layer. A cup of cucumber water or coconut water immediately restores cellular balance.
            </p>
          </div>

          <div className="card" style={{ padding: "16px" }}>
            <div style={{ fontSize: "28px", marginBottom: "6px" }}>🚫</div>
            <b style={{ fontSize: "15px", color: "#fff", display: "block", marginBottom: "4px" }}>
              Zero Carbonation Rule
            </b>
            <p className="mut sm" style={{ fontSize: "12px", lineHeight: "1.4" }}>
              Sparkling water and soda trap gas bubbles against the stomach lining, creating immediate visual distension. Stick to still water with lemon or mint.
            </p>
          </div>
        </div>
      </div>
    </AuthGate>
  );
}
