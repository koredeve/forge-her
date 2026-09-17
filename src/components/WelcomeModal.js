"use client";
import React, { useState } from "react";
import ForgeHerLogo from "./ForgeHerLogo";
import { useAuth } from "@/context/AuthContext";
import { haptics } from "@/lib/haptics";

export default function WelcomeModal({ isOpen, onClose, onStartWorkout }) {
  const { user, isPro, trialClaimed, claimFreeTrial, openAuthModal } = useAuth();
  const [activeTab, setActiveTab] = useState("pillars"); // "pillars" | "protocol" | "cycle"
  const [claiming, setClaiming] = useState(false);

  if (!isOpen) return null;

  const handleClaim = async () => {
    haptics.success();
    if (!user) {
      onClose();
      openAuthModal("Create a free account to activate your 7-day Goddess pass!", "signup");
      return;
    }
    setClaiming(true);
    try {
      await claimFreeTrial();
      onClose();
    } catch (e) {
      alert(e.message || "Failed to activate trial");
    } finally {
      setClaiming(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1100,
        background: "rgba(5, 7, 10, 0.85)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        overflowY: "auto",
        animation: "fadeIn 0.2s ease-out"
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "540px",
          background: "linear-gradient(180deg, #18141d 0%, #0d0f12 100%)",
          border: "1.5px solid rgba(255, 112, 166, 0.4)",
          borderRadius: "24px",
          boxShadow: "0 24px 60px rgba(0, 0, 0, 0.8), 0 0 32px rgba(255, 112, 166, 0.15)",
          padding: "24px",
          position: "relative",
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          gap: "16px"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header with Close Button */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <ForgeHerLogo size="default" />
            <div style={{ color: "var(--acc)", fontSize: "12px", fontWeight: "700", marginTop: "6px", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              ✨ The Feminine Calisthenics Blueprint
            </div>
          </div>
          <button
            onClick={() => {
              haptics.light();
              onClose();
            }}
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: "rgba(255, 255, 255, 0.08)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "16px",
              cursor: "pointer",
              transition: "0.15s"
            }}
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Navigation Tabs */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "6px",
            background: "rgba(255, 255, 255, 0.04)",
            padding: "4px",
            borderRadius: "14px",
            border: "1px solid var(--ln)"
          }}
        >
          <button
            onClick={() => {
              haptics.light();
              setActiveTab("pillars");
            }}
            style={{
              padding: "8px 4px",
              borderRadius: "10px",
              fontSize: "12px",
              fontWeight: activeTab === "pillars" ? "800" : "600",
              color: activeTab === "pillars" ? "#0d0f12" : "var(--mut)",
              background: activeTab === "pillars" ? "linear-gradient(135deg, #ff70a6 0%, #ff85a1 100%)" : "transparent",
              transition: "0.15s"
            }}
          >
            🌸 3 Pillars
          </button>
          <button
            onClick={() => {
              haptics.light();
              setActiveTab("protocol");
            }}
            style={{
              padding: "8px 4px",
              borderRadius: "10px",
              fontSize: "12px",
              fontWeight: activeTab === "protocol" ? "800" : "600",
              color: activeTab === "protocol" ? "#0d0f12" : "var(--mut)",
              background: activeTab === "protocol" ? "linear-gradient(135deg, #ff70a6 0%, #ff85a1 100%)" : "transparent",
              transition: "0.15s"
            }}
          >
            ⏳ TVA Vacuum
          </button>
          <button
            onClick={() => {
              haptics.light();
              setActiveTab("cycle");
            }}
            style={{
              padding: "8px 4px",
              borderRadius: "10px",
              fontSize: "12px",
              fontWeight: activeTab === "cycle" ? "800" : "600",
              color: activeTab === "cycle" ? "#0d0f12" : "var(--mut)",
              background: activeTab === "cycle" ? "linear-gradient(135deg, #ff70a6 0%, #ff85a1 100%)" : "transparent",
              transition: "0.15s"
            }}
          >
            🥗 Cycle Sync
          </button>
        </div>

        {/* Scrollable Tab Body */}
        <div style={{ overflowY: "auto", paddingRight: "4px", flex: 1 }}>
          {activeTab === "pillars" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div
                style={{
                  background: "rgba(255, 112, 166, 0.08)",
                  border: "1px solid rgba(255, 112, 166, 0.25)",
                  borderRadius: "16px",
                  padding: "14px"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                  <span style={{ fontSize: "22px" }}>⏳</span>
                  <b style={{ color: "#fff", fontSize: "14px" }}>1. The Internal Corset (TVA Vacuums)</b>
                </div>
                <p style={{ color: "var(--tx-dim)", fontSize: "12.5px", lineHeight: "1.5" }}>
                  We train the <b>Transverse Abdominis</b> deep abdominal belt. Unlike heavy crunches that bulk the waist outward, vacuums draw the visceral wall inward, permanently reducing waist circumference by 1 to 2 inches.
                </p>
              </div>

              <div
                style={{
                  background: "rgba(255, 112, 166, 0.08)",
                  border: "1px solid rgba(255, 112, 166, 0.25)",
                  borderRadius: "16px",
                  padding: "14px"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                  <span style={{ fontSize: "22px" }}>🍑</span>
                  <b style={{ color: "#fff", fontSize: "14px" }}>2. Hourglass Gluteus Medius Activation</b>
                </div>
                <p style={{ color: "var(--tx-dim)", fontSize: "12.5px", lineHeight: "1.5" }}>
                  Targeted side-hip projection and glute shelf lift. Deliberately zero quad-dominant heavy barbell loading, preventing bulky thighs while creating a seamless hourglass silhouette.
                </p>
              </div>

              <div
                style={{
                  background: "rgba(255, 112, 166, 0.08)",
                  border: "1px solid rgba(255, 112, 166, 0.25)",
                  borderRadius: "16px",
                  padding: "14px"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                  <span style={{ fontSize: "22px" }}>🦢</span>
                  <b style={{ color: "#fff", fontSize: "14px" }}>3. Poised Posture & Décolletage Lift</b>
                </div>
                <p style={{ color: "var(--tx-dim)", fontSize: "12.5px", lineHeight: "1.5" }}>
                  Thoracic spine realignment with Prone Cobras and Wall Slides. Reverses desk slouch, elongates the neck, opens prominent collarbones, and naturally lifts the bustline foundation.
                </p>
              </div>
            </div>
          )}

          {activeTab === "protocol" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div
                style={{
                  background: "rgba(255, 255, 255, 0.04)",
                  border: "1px solid var(--ln)",
                  borderRadius: "16px",
                  padding: "14px"
                }}
              >
                <b style={{ color: "var(--acc)", fontSize: "13.5px", display: "block", marginBottom: "8px" }}>
                  🌅 Daily Morning Stomach Vacuum Protocol
                </b>
                <ol style={{ paddingLeft: "18px", color: "var(--tx)", fontSize: "12.5px", lineHeight: "1.6" }}>
                  <li><b>First Thing Waking:</b> Perform upon getting out of bed while your stomach is completely empty.</li>
                  <li><b>Total Exhale:</b> Blow out 100% of air from your lungs until empty.</li>
                  <li><b>The Vacuum Draw:</b> Pull your belly button back into your spine and up underneath your ribcage.</li>
                  <li><b>Hold 20 Seconds:</b> Take tiny shallow sips of air while maintaining the deep core lock. Repeat for 3 rounds.</li>
                </ol>
              </div>
              <div style={{ background: "rgba(62, 213, 152, 0.08)", border: "1px solid rgba(62, 213, 152, 0.3)", borderRadius: "14px", padding: "12px" }}>
                <span style={{ color: "var(--ok)", fontSize: "12px", fontWeight: "700" }}>
                  ⚡ Visible Results: Noticeable waist flattening and anti-bloat tightening within 14 consecutive days.
                </span>
              </div>
            </div>
          )}

          {activeTab === "cycle" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div
                style={{
                  background: "rgba(255, 255, 255, 0.04)",
                  border: "1px solid var(--ln)",
                  borderRadius: "16px",
                  padding: "14px"
                }}
              >
                <b style={{ color: "#FF85A1", fontSize: "13.5px", display: "block", marginBottom: "6px" }}>
                  🌸 Follicular & Ovulatory Phase (Days 1–14)
                </b>
                <p style={{ color: "var(--tx-dim)", fontSize: "12px", lineHeight: "1.5" }}>
                  Estrogen peaks. High energy, superior insulin sensitivity, and peak strength. Perfect phase to push the Snatched Corset Core and Glute Ladder progressions.
                </p>
              </div>

              <div
                style={{
                  background: "rgba(255, 255, 255, 0.04)",
                  border: "1px solid var(--ln)",
                  borderRadius: "16px",
                  padding: "14px"
                }}
              >
                <b style={{ color: "#FFD166", fontSize: "13.5px", display: "block", marginBottom: "6px" }}>
                  🌙 Luteal Phase (Days 15–28)
                </b>
                <p style={{ color: "var(--tx-dim)", fontSize: "12px", lineHeight: "1.5" }}>
                  Progesterone rises. Resting metabolic rate increases by ~150 kcal. Focus on low-impact posture flows, magnesium-rich fuel, and potassium hydration to flush water retention.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Actions */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", paddingTop: "4px" }}>
          {!isPro && !trialClaimed ? (
            <button
              className="btn"
              onClick={handleClaim}
              disabled={claiming}
              style={{
                width: "100%",
                justifyContent: "center",
                background: "linear-gradient(135deg, #ff70a6 0%, #ff85a1 100%)",
                color: "#0d0f12",
                fontWeight: "900",
                fontSize: "14px",
                padding: "12px",
                boxShadow: "0 6px 20px rgba(255, 112, 166, 0.35)",
                borderRadius: "14px"
              }}
            >
              {claiming ? "Activating..." : "⚡ Activate 7-Day Goddess Free Pass →"}
            </button>
          ) : (
            <button
              className="btn"
              onClick={() => {
                onClose();
                if (onStartWorkout) onStartWorkout();
              }}
              style={{
                width: "100%",
                justifyContent: "center",
                background: "linear-gradient(135deg, #ff70a6 0%, #ff85a1 100%)",
                color: "#0d0f12",
                fontWeight: "900",
                fontSize: "14px",
                padding: "12px",
                borderRadius: "14px"
              }}
            >
              ▶ Start Guided Workout
            </button>
          )}

          <button
            className="btn gh"
            onClick={onClose}
            style={{ width: "100%", justifyContent: "center", fontSize: "12.5px", color: "var(--mut)", border: "none" }}
          >
            Explore Platform First
          </button>
        </div>
      </div>
    </div>
  );
}
