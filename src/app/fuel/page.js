"use client";
import React, { useState } from "react";
import AuthGate from "@/components/AuthGate";
import { useAuth } from "@/context/AuthContext";

export default function Fuel() {
  const { user, openAuthModal } = useAuth();
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
                onClick={() => {
                  if (!user) {
                    openAuthModal("Sign in or create a free account to unlock Luteal Phase hormone diet protocols!");
                    return;
                  }
                  setActivePhase("luteal");
                }}
              >
                🌕 Luteal Phase (Days 15–28) {!user && "🔒"}
              </button>
            </div>
          </div>

          {activePhase === "follicular" ? (
            <div className="g2">
              <div style={{ background: "rgba(255,255,255,0.03)", padding: "14px", borderRadius: "12px", border: "1px solid var(--ln)" }}>
                <b style={{ color: "var(--acc)", fontSize: "15px" }}>⚡ High Energy & Strength Window</b>
                <p className="mut sm" style={{ marginTop: "6px", fontSize: "12.5px", lineHeight: "1.4" }}>
                  Estrogen rises, boosting insulin sensitivity and neuromuscular recovery. Perfect time to hit higher rep targets and progressive push-up overload.
                </p>
              </div>
              <div style={{ background: "rgba(255,255,255,0.03)", padding: "14px", borderRadius: "12px", border: "1px solid var(--ln)" }}>
                <b style={{ color: "var(--ok)", fontSize: "15px" }}>🥗 Complex Carbs & Lean Amino Acids</b>
                <p className="mut sm" style={{ marginTop: "6px", fontSize: "12.5px", lineHeight: "1.4" }}>
                  Prioritize oats, quinoa, berries, salmon, and egg whites. Glycogen storage capacity is highest during this 14-day window.
                </p>
              </div>
            </div>
          ) : (
            <div className="g2">
              <div style={{ background: "rgba(255,255,255,0.03)", padding: "14px", borderRadius: "12px", border: "1px solid var(--ln)" }}>
                <b style={{ color: "var(--warn)", fontSize: "15px" }}>🔥 Higher Metabolic Rate & Recovery</b>
                <p className="mut sm" style={{ marginTop: "6px", fontSize: "12.5px", lineHeight: "1.4" }}>
                  Progesterone peaks, increasing basal metabolic rate by 100–250 kcal/day. Focus on mind-muscle control, lower reps, and deeper isometric holds.
                </p>
              </div>
              <div style={{ background: "rgba(255,255,255,0.03)", padding: "14px", borderRadius: "12px", border: "1px solid var(--ln)" }}>
                <b style={{ color: "var(--acc-warm)", fontSize: "15px" }}>🥑 Healthy Fats & Magnesium Rich</b>
                <p className="mut sm" style={{ marginTop: "6px", fontSize: "12.5px", lineHeight: "1.4" }}>
                  Avocado, pumpkin seeds, dark leafy greens, and dark chocolate to combat progesterone cravings and stabilize blood sugar.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Macro & Hydration Recomp Calculator */}
        <div
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid var(--ln)",
            borderRadius: "18px",
            padding: "20px",
            marginBottom: "28px"
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px", marginBottom: "16px" }}>
            <div>
              <span className="cali-acc" style={{ color: "var(--acc)" }}>TARGET FORMULAS</span>
              <h3 style={{ fontSize: "19px", margin: "2px 0 0", fontWeight: "900" }}>Daily Fuel & Hydration Formula</h3>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span className="mut sm">Your Weight:</span>
              <input
                type="number"
                min="40"
                max="140"
                value={weightKg}
                onChange={(e) => setWeightKg(Number(e.target.value) || 60)}
                style={{
                  width: "64px",
                  background: "rgba(0,0,0,0.5)",
                  border: "1px solid var(--ln)",
                  borderRadius: "8px",
                  padding: "6px 8px",
                  color: "#fff",
                  fontSize: "14px",
                  fontWeight: "bold",
                  textAlign: "center"
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

        <div style={{ position: "relative", marginBottom: "32px" }}>
          {!user && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(13, 15, 18, 0.85)",
                backdropFilter: "blur(6px)",
                borderRadius: "16px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 10,
                padding: "24px",
                textAlign: "center"
              }}
            >
              <span style={{ fontSize: "36px", marginBottom: "8px" }}>🔒</span>
              <h3 style={{ fontSize: "18px", margin: "0 0 6px" }}>Anti-Bloat Protocol Locked</h3>
              <p className="mut sm" style={{ maxWidth: "360px", marginBottom: "16px", fontSize: "13px" }}>
                Create a free account to unlock daily anti-bloat routines and morning vacuum guidelines.
              </p>
              <button
                className="btn"
                style={{ background: "linear-gradient(135deg, #ff70a6, #ff3d68)", color: "#000", fontWeight: "900", padding: "10px 22px" }}
                onClick={() => openAuthModal("Sign in or register to unlock the full Anti-Bloat Protocol.")}
              >
                🔐 Sign In / Free Account →
              </button>
            </div>
          )}

          <div className="grid g3">
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
      </div>
    </AuthGate>
  );
}
