"use client";
import React from "react";
import { useAuth } from "@/context/AuthContext";

export default function AuthGate({ title, subtitle, icon = "🌸", children }) {
  const { user, loading, openAuthModal } = useAuth();
  const [guestPreview, setGuestPreview] = React.useState(false);

  if (loading && !user && !guestPreview) {
    return (
      <div style={{ textAlign: "center", padding: "80px 20px" }}>
        <div className="clk" style={{ fontSize: "32px" }}>⏳</div>
        <p className="mut sm" style={{ marginTop: "10px" }}>Loading FORGE HER...</p>
      </div>
    );
  }

  if (!user && !guestPreview) {
    return (
      <div className="vw active" style={{ maxWidth: "600px", margin: "40px auto", textAlign: "center" }}>
        <div
          className="card"
          style={{
            padding: "40px 28px",
            background: "linear-gradient(180deg, #171c23 0%, #0e1115 100%)",
            border: "2px solid var(--acc)",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.7)",
            borderRadius: "24px"
          }}
        >
          <div style={{ fontSize: "52px", marginBottom: "12px" }}>{icon}</div>

          <span className="cali-acc" style={{ fontSize: "12px", letterSpacing: "0.2em", color: "var(--acc)" }}>
            FEMININE CALISTHENICS & SCULPT
          </span>

          <h2 style={{ fontSize: "28px", margin: "10px 0 8px", textTransform: "uppercase" }}>
            {title || "Unlock Full Training"}
          </h2>

          <p className="sub" style={{ margin: "0 auto 24px", maxWidth: "460px", fontSize: "14.5px" }}>
            {subtitle || "Create a free account or continue in Guest Preview to access video guides, sculpt ladders, cycle fuel, and workouts."}
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "340px", margin: "0 auto" }}>
            <button
              className="btn"
              style={{ justifyContent: "center", padding: "14px", fontSize: "15px", boxShadow: "0 6px 24px rgba(255, 112, 166, 0.35)", background: "linear-gradient(135deg, #ff70a6, #ff3d68)" }}
              onClick={() => openAuthModal(`Sign in or create a free account to access ${title || "FORGE HER"}.`)}
            >
              🔐 Sign In / Free Account →
            </button>
            <button
              className="btn bgh"
              style={{ justifyContent: "center", padding: "12px", fontSize: "14px", border: "1px solid var(--ln)", color: "var(--mut)" }}
              onClick={() => setGuestPreview(true)}
            >
              👀 Continue as Guest Preview
            </button>
          </div>

          <div style={{ marginTop: "24px", paddingTop: "20px", borderTop: "1px dashed var(--ln)", display: "flex", justifyContent: "space-around", color: "var(--mut)", fontSize: "12px" }}>
            <span>✔ Free Forever Tier</span>
            <span>✔ Zero Credit Card</span>
            <span>✔ Cloud Sync</span>
          </div>
        </div>
      </div>
    );
  }

  return children;
}
