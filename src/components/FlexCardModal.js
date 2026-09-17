"use client";
import React, { useRef, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useFitness } from "@/context/FitnessContext";
import { haptics } from "@/lib/haptics";

export default function FlexCardModal({ isOpen, onClose, data }) {
  const { user } = useAuth();
  const { showToast } = useFitness();
  const canvasRef = useRef(null);
  const [isGenerating, setIsGenerating] = useState(false);

  if (!isOpen) return null;

  const athleteName = data?.athleteName || user?.displayName || user?.email?.split("@")[0] || "FORGE Athlete";
  const title = data?.title || "Training Session";
  const streak = data?.streak || 1;
  const mins = data?.mins || 30;
  const xp = data?.xp || 75;
  const masteryPct = data?.masteryPct || 25;
  const dateStr = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  // Generate high-resolution 1080x1920 Instagram Story canvas
  const drawCanvas = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 1080;
    canvas.height = 1920;
    const ctx = canvas.getContext("2d");

    // Background gradient
    const bgGrad = ctx.createLinearGradient(0, 0, 1080, 1920);
    bgGrad.addColorStop(0, "#14181f");
    bgGrad.addColorStop(0.5, "#0b0d10");
    bgGrad.addColorStop(1, "#050608");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1080, 1920);

    // Subtle background mesh glow
    const radialGrad = ctx.createRadialGradient(540, 600, 50, 540, 600, 600);
    radialGrad.addColorStop(0, "rgba(255, 112, 166, 0.25)");
    radialGrad.addColorStop(1, "rgba(255, 112, 166, 0)");
    ctx.fillStyle = radialGrad;
    ctx.fillRect(0, 0, 1080, 1920);

    // Frame Border
    ctx.strokeStyle = "rgba(255, 112, 166, 0.45)";
    ctx.lineWidth = 6;
    ctx.strokeRect(60, 60, 960, 1800);

    // Brand Header
    ctx.font = "900 72px Archivo, sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.fillText("FORGE HER", 120, 180);

    ctx.fillStyle = "#ff70a6";
    ctx.fillText(".", 520, 180);

    ctx.font = "700 24px Inter, sans-serif";
    ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
    ctx.fillText("SNATCHED WAIST · HOURGLASS GLUTES · POSTURE & TONE", 120, 230);

    // Date
    ctx.font = "600 26px Inter, sans-serif";
    ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
    ctx.textAlign = "right";
    ctx.fillText(dateStr, 960, 180);
    ctx.textAlign = "left";

    // Divider
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(120, 270);
    ctx.lineTo(960, 270);
    ctx.stroke();

    // Trophy Icon
    ctx.font = "140px sans-serif";
    ctx.fillText("🏆", 120, 470);

    // Badge
    ctx.fillStyle = "rgba(255, 112, 166, 0.2)";
    ctx.fillRect(120, 520, 420, 60);
    ctx.strokeStyle = "#ff70a6";
    ctx.lineWidth = 3;
    ctx.strokeRect(120, 520, 420, 60);

    ctx.font = "800 24px Inter, sans-serif";
    ctx.fillStyle = "#ff85a1";
    ctx.fillText("SESSION SCULPTED 🌸", 145, 560);

    // Title
    ctx.font = "900 64px Archivo, sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(title, 120, 680);

    // Athlete Card
    ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
    ctx.fillRect(120, 740, 840, 110);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
    ctx.strokeRect(120, 740, 840, 110);

    ctx.font = "700 36px Inter, sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.fillText("✨ " + athleteName, 150, 810);

    // 4 Stats Grid
    const statBoxes = [
      { icon: "🔥", label: "DAILY STREAK", val: streak + " Days", col: "#ff70a6" },
      { icon: "⏱️", label: "TIME TRAINED", val: mins + " Mins", col: "#ff85a1" },
      { icon: "⭐", label: "XP EARNED", val: "+" + xp + " XP", col: "#ffd166" },
      { icon: "🌸", label: "MASTERY", val: masteryPct + "%", col: "#3ed598" }
    ];

    statBoxes.forEach((st, idx) => {
      const bx = 120 + (idx % 2) * 440;
      const by = 900 + Math.floor(idx / 2) * 260;

      ctx.fillStyle = "rgba(18, 22, 27, 0.85)";
      ctx.fillRect(bx, by, 400, 220);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
      ctx.lineWidth = 2;
      ctx.strokeRect(bx, by, 400, 220);

      ctx.font = "40px sans-serif";
      ctx.fillText(st.icon, bx + 30, by + 70);

      ctx.font = "700 22px Inter, sans-serif";
      ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
      ctx.fillText(st.label, bx + 30, by + 120);

      ctx.font = "900 48px Archivo, sans-serif";
      ctx.fillStyle = st.col;
      ctx.fillText(st.val, bx + 30, by + 180);
    });

    // Motivational Quote Footer
    ctx.fillStyle = "rgba(255, 112, 166, 0.08)";
    ctx.fillRect(120, 1480, 840, 180);
    ctx.strokeStyle = "rgba(255, 112, 166, 0.35)";
    ctx.strokeRect(120, 1480, 840, 180);

    ctx.font = "italic 700 30px Inter, sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(`"Strength, Grace & Silhouette.`, 160, 1550);
    ctx.fillText(`Sculpted from within."`, 160, 1600);

    // URL Watermark
    ctx.font = "700 28px Inter, sans-serif";
    ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
    ctx.textAlign = "center";
    ctx.fillText("forgeher.vercel.app", 540, 1780);

    return canvas;
  };

  // 1-Tap Download Image
  const handleDownload = () => {
    haptics.light();
    setIsGenerating(true);
    try {
      const canvas = drawCanvas();
      const link = document.createElement("a");
      link.download = `FORGE_HER_${title.replace(/[^a-zA-Z0-9]/g, "_")}_${Date.now()}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      showToast("Goddess Flex card downloaded! 📸");
      haptics.success();
    } catch (e) {
      console.error(e);
      showToast("Failed to generate image.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Native Mobile Web Share
  const handleShare = async () => {
    haptics.light();
    setIsGenerating(true);
    try {
      const canvas = drawCanvas();
      canvas.toBlob(async (blob) => {
        if (!blob) {
          showToast("Share failed.");
          setIsGenerating(false);
          return;
        }

        const file = new File([blob], "FORGE_HER_Achievement.png", { type: "image/png" });

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: `FORGE HER · ${title}`,
            text: `Sculpted ${title} on FORGE HER! Streak: ${streak} days 🌸 Mastery: ${masteryPct}%`
          });
          haptics.success();
        } else if (navigator.share) {
          await navigator.share({
            title: `FORGE HER · ${title}`,
            text: `Sculpted ${title} on FORGE HER! Streak: ${streak} days 🌸 Mastery: ${masteryPct}%\nJoin at https://forgeher.vercel.app`,
            url: "https://forgeher.vercel.app"
          });
          haptics.success();
        } else {
          // Fallback to clipboard copy
          await navigator.clipboard.writeText(`🌸 Sculpted ${title} on FORGE HER! Streak: ${streak} days 🔥 Check it out: https://forgeher.vercel.app`);
          showToast("Achievement link copied to clipboard! 📋");
          haptics.success();
        }
        setIsGenerating(false);
      });
    } catch (e) {
      console.error(e);
      setIsGenerating(false);
    }
  };

  return (
    <div className="ov show" style={{ zIndex: 1300 }} onClick={onClose}>
      <div 
        className="sheet" 
        style={{ 
          maxWidth: "420px", 
          padding: "20px", 
          textAlign: "center",
          background: "linear-gradient(180deg, #181119 0%, #0d0f12 100%)",
          border: "1px solid rgba(255, 112, 166, 0.4)",
          boxShadow: "0 0 40px rgba(255, 112, 166, 0.25)"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
          <b style={{ fontSize: "16px", color: "var(--acc)", textTransform: "uppercase", letterSpacing: "1px" }}>
            🌸 Goddess Flex Card
          </b>
          <button className="xbtn" onClick={onClose} style={{ fontSize: "20px" }}>✕</button>
        </div>

        {/* Visual Story Preview Card */}
        <div
          style={{
            background: "linear-gradient(135deg, #1f141d 0%, #0d0f12 100%)",
            border: "2px solid rgba(255, 112, 166, 0.4)",
            borderRadius: "16px",
            padding: "20px",
            textAlign: "left",
            boxShadow: "0 8px 30px rgba(0,0,0,0.6)",
            marginBottom: "18px"
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "22px", fontWeight: "900", color: "#fff", fontFamily: "Archivo" }}>
              FORGE HER<span style={{ color: "var(--acc)" }}>.</span>
            </span>
            <span style={{ fontSize: "11px", color: "var(--mut)" }}>{dateStr}</span>
          </div>

          <div style={{ margin: "16px 0 10px" }}>
            <div style={{ fontSize: "36px" }}>🏆</div>
            <span className="pill sm" style={{ borderColor: "var(--acc)", color: "var(--acc)", fontSize: "10px", margin: "6px 0" }}>
              SESSION SCULPTED
            </span>
            <h2 style={{ fontSize: "22px", color: "#fff", margin: "6px 0 2px" }}>{title}</h2>
            <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)" }}>✨ {athleteName}</span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginTop: "14px" }}>
            <div style={{ background: "rgba(255,255,255,0.03)", padding: "8px 10px", borderRadius: "8px", border: "1px solid var(--ln)" }}>
              <span style={{ fontSize: "10px", color: "var(--mut)", display: "block" }}>🔥 STREAK</span>
              <b style={{ fontSize: "15px", color: "var(--acc)" }}>{streak} Days</b>
            </div>
            <div style={{ background: "rgba(255,255,255,0.03)", padding: "8px 10px", borderRadius: "8px", border: "1px solid var(--ln)" }}>
              <span style={{ fontSize: "10px", color: "var(--mut)", display: "block" }}>⏱️ MAT TIME</span>
              <b style={{ fontSize: "15px", color: "#ff85a1" }}>{mins} Mins</b>
            </div>
            <div style={{ background: "rgba(255,255,255,0.03)", padding: "8px 10px", borderRadius: "8px", border: "1px solid var(--ln)" }}>
              <span style={{ fontSize: "10px", color: "var(--mut)", display: "block" }}>⭐ XP EARNED</span>
              <b style={{ fontSize: "15px", color: "#ffd166" }}>+{xp} XP</b>
            </div>
            <div style={{ background: "rgba(255,255,255,0.03)", padding: "8px 10px", borderRadius: "8px", border: "1px solid var(--ln)" }}>
              <span style={{ fontSize: "10px", color: "var(--mut)", display: "block" }}>🌸 MASTERY</span>
              <b style={{ fontSize: "15px", color: "var(--ok)" }}>{masteryPct}%</b>
            </div>
          </div>

          <div style={{ marginTop: "14px", borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "8px", textAlign: "center" }}>
            <span style={{ fontSize: "10.5px", color: "var(--mut)" }}>
              forgeher.vercel.app · Snatched Waist & Glute Sculpt
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <button
            className="btn"
            style={{
              width: "100%",
              justifyContent: "center",
              padding: "12px",
              background: "linear-gradient(135deg, #ff70a6 0%, #ff85a1 100%)",
              fontSize: "14px",
              fontWeight: "800",
              color: "#0d0f12"
            }}
            onClick={handleShare}
            disabled={isGenerating}
          >
            {isGenerating ? "Preparing Share..." : "📲 Share to Instagram / TikTok / WhatsApp"}
          </button>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            <button
              className="btn gh"
              style={{ fontSize: "12px", padding: "10px", justifyContent: "center" }}
              onClick={handleDownload}
              disabled={isGenerating}
            >
              📥 Download PNG
            </button>
            <button
              className="btn gh"
              style={{ fontSize: "12px", padding: "10px", justifyContent: "center" }}
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
