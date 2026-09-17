import React from "react";

/**
 * Luxury Vector Brand Logo for FORGE HER
 * Features an interlocking goddess silhouette + kinetic lotus flame emblem
 * with rose-gold & radiant blush gradients.
 */
export default function ForgeHerLogo({ size = "default", showText = true, className = "" }) {
  const isCompact = size === "small";
  const iconSize = isCompact ? 28 : 34;

  return (
    <div
      className={`forge-her-logo ${className}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: isCompact ? "8px" : "10px",
        textDecoration: "none",
        userSelect: "none"
      }}
    >
      {/* Precision Vector Emblem: Goddess Silhouette & Kinetic Lotus Flame */}
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0, filter: "drop-shadow(0 2px 8px rgba(255, 112, 166, 0.45))" }}
      >
        <defs>
          <linearGradient id="herPinkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF85A1" />
            <stop offset="50%" stopColor="#FF70A6" />
            <stop offset="100%" stopColor="#F43F5E" />
          </linearGradient>
          <linearGradient id="herGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFE494" />
            <stop offset="100%" stopColor="#FFB703" />
          </linearGradient>
          <radialGradient id="herGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FF70A6" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#FF70A6" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient Glow */}
        <circle cx="24" cy="24" r="22" fill="url(#herGlow)" />

        {/* Geometric Outer Lotus Crest / Hourglass Wings */}
        <path
          d="M24 5C26 12 37 14 37 25C37 32 30.5 39 24 43C17.5 39 11 32 11 25C11 14 22 12 24 5Z"
          fill="rgba(255, 112, 166, 0.12)"
          stroke="url(#herPinkGrad)"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Central Poised Silhouette / Kinetic Flame */}
        <path
          d="M24 10C25.5 15 31 18 31 26C31 30.5 28 34 24 36C20 34 17 30.5 17 26C17 18 22.5 15 24 10Z"
          fill="url(#herPinkGrad)"
        />

        {/* Core Radiance Spark / Diamond Waist Axis */}
        <path
          d="M24 21L26.5 25L24 29L21.5 25L24 21Z"
          fill="url(#herGoldGrad)"
        />

        {/* Goddess Crown Spark */}
        <circle cx="24" cy="11.5" r="1.5" fill="#FFE494" />
      </svg>

      {/* Brand Typography */}
      {showText && (
        <span
          style={{
            fontFamily: "Archivo, Inter, sans-serif",
            fontWeight: "900",
            fontSize: isCompact ? "18px" : "21px",
            letterSpacing: "-0.03em",
            lineHeight: 1,
            display: "inline-flex",
            alignItems: "baseline",
            gap: "3px",
            color: "#FFFFFF"
          }}
        >
          <span>FORGE</span>
          <span
            style={{
              background: "linear-gradient(135deg, #FF85A1 0%, #FF70A6 50%, #FFD166 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: "900",
              letterSpacing: "-0.01em"
            }}
          >
            HER
          </span>
          <span style={{ color: "#FF70A6", fontSize: isCompact ? "16px" : "19px" }}>.</span>
        </span>
      )}
    </div>
  );
}
