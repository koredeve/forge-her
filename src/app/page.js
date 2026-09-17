"use client";
import React, { useState } from "react";
import Link from "next/link";
import { CATS, WORKOUTS, SKILLS } from "@/data/db";
import { useFitness } from "@/context/FitnessContext";
import { useAuth } from "@/context/AuthContext";
import WorkoutModal from "@/components/WorkoutModal";

const FAQS = [
  {
    q: "Will bodyweight training make my waist or thighs bulky?",
    a: "No! FORGE HER is deliberately programmed to avoid heavy weighted side-bends and quad-dominant bulky movements. We prioritize Transverse Abdominis (TVA) draw-ins (which pull the waistline inward), glute medius activation (hourglass hip curvature), and anti-hunch posture."
  },
  {
    q: "How does the Stomach Vacuum (TVA) actually flatten the tummy?",
    a: "Standard sit-ups only train the superficial 6-pack (rectus abdominis). If trained with poor breathing, intra-abdominal pressure pushes the lower belly outward. The Transverse Abdominis acts as your body's natural internal corset. Vacuum contractions tighten this muscle wall, permanently flattening the lower stomach and trimming waist inches."
  },
  {
    q: "Can posture exercises naturally lift the bustline?",
    a: "Yes. Forward-rounded shoulders shorten the chest and make the bustline droop. By strengthening the lower trapezius, rhomboids, and upper clavicular chest fibers (incline push-ups & prone cobras), your thoracic spine straightens, naturally elevating the décolletage."
  },
  {
    q: "What is the 7-Day Goddess Pass?",
    a: "Every new athlete receives full instant access to all 4 Sculpt Ladders, guided routine players with 0.5x slow-mo video analysis, multi-week programs, and cycle-synced nutrition for 7 full days with zero credit card required."
  },
  {
    q: "Do I need any equipment or a gym membership?",
    a: "Zero equipment is needed! All movements are 100% floor, mat, and bodyweight-based. You can do every single workout in your living room or bedroom in 15 to 30 minutes."
  }
];

const WORKOUT_PICTURES = {
  w1: "/reference/vacuum.jpg",
  w2: "/reference/glutebridge.jpg",
  w3: "/reference/cobra.jpg",
  w4: "/reference/chestprayer.jpg",
  w5: "/reference/donkey.jpg",
  w6: "/banners/hero.jpg",
  w7: "/reference/pushup.jpg",
  w8: "/reference/tricepdip.jpg"
};

export default function Home() {
  const { logs, getStreak, getSkillsPct } = useFitness();
  const { user, isPro, trialClaimed, claimFreeTrial, openAuthModal } = useAuth();
  const [previewWorkout, setPreviewWorkout] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);
  const [isClaimingTrial, setIsClaimingTrial] = useState(false);

  const streak = user ? getStreak() : 0;
  const mastery = user ? getSkillsPct() : 0;
  const total = user ? logs.length : 0;
  const wk = user ? logs.filter((s) => Date.now() - new Date(s.d).getTime() < 7 * 864e5).length : 0;

  const dateStr = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    month: "short",
    day: "numeric"
  });

  const ignitionWorkout = WORKOUTS.find((w) => w.id === "w1") || WORKOUTS[0];

  const handleStartWorkout = () => {
    if (!user) {
      openAuthModal("Create a free account or sign in to start guided workouts and track your streaks!");
      return;
    }
    setPreviewWorkout(ignitionWorkout);
  };

  const handleClaimTrial = async () => {
    if (!user) {
      openAuthModal("Create your free account to claim your 7-day Goddess trial pass!", "signup");
      return;
    }
    setIsClaimingTrial(true);
    try {
      await claimFreeTrial();
    } catch (e) {
      alert(e.message || "Failed to activate pass");
    } finally {
      setIsClaimingTrial(false);
    }
  };

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <div className="vw active" id="v-home">
      {/* Luxury Feminine Hero Banner */}
      <div
        style={{
          position: "relative",
          borderRadius: "24px",
          overflow: "hidden",
          border: "1.5px solid rgba(255, 112, 166, 0.35)",
          marginBottom: "24px",
          background: "linear-gradient(135deg, #1f141d 0%, #0d0f12 100%)"
        }}
      >
        <img
          src="/banners/hero.jpg"
          alt="FORGE HER Athlete"
          style={{
            width: "100%",
            height: "380px",
            objectFit: "cover",
            opacity: 0.35,
            filter: "contrast(115%) brightness(90%) hue-rotate(310deg)",
            display: "block"
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
            padding: "24px 28px"
          }}
        >
          <div className="kick" style={{ alignSelf: "flex-start", marginBottom: "8px", color: "var(--acc)" }}>
            🌸 TODAY · {dateStr} {user ? `· ✨ ${user.displayName || user.email.split("@")[0]}` : "· ⚡ PREVIEW MODE"}
          </div>

          <h1 className="pg" style={{ margin: "4px 0" }}>
            Sculpt your<br />
            <em>silhouette.</em>
          </h1>
          <p className="sub" style={{ margin: "6px 0 16px", maxWidth: "620px", color: "var(--tx-dim)" }}>
            Feminine calisthenics & biomechanics: strict floor push-up mastery, cinched waistline with deep TVA vacuums, hourglass glute curves, and poised posture.
          </p>

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <button
              className="btn"
              onClick={handleStartWorkout}
              style={{
                background: "linear-gradient(135deg, #ff70a6 0%, #ff85a1 100%)",
                color: "#0d0f12",
                fontWeight: "800"
              }}
            >
              ▶ {user ? "Start: Snatched Corset Core" : "Sign In to Begin Sculpting"}
            </button>
            <Link href="/sculpt" className="btn gh" style={{ borderColor: "rgba(255, 112, 166, 0.4)" }}>
              🌸 Explore 5 Sculpt Ladders
            </Link>
          </div>
        </div>
      </div>

      {/* 7-Day Free Trial Banner */}
      {!isPro && !trialClaimed && (
        <div
          style={{
            background: "linear-gradient(135deg, rgba(255, 112, 166, 0.16) 0%, rgba(26, 17, 24, 0.95) 100%)",
            border: "1.5px solid var(--acc)",
            borderRadius: "16px",
            padding: "16px 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
            marginBottom: "22px",
            boxShadow: "0 8px 24px rgba(255, 112, 166, 0.15)"
          }}
        >
          <div>
            <b style={{ color: "var(--acc)", fontSize: "14.5px", display: "flex", alignItems: "center", gap: "6px" }}>
              <span>🌸</span> 7-Day Goddess Free Pass Available
            </b>
            <span className="mut sm" style={{ display: "block", fontSize: "12.5px", marginTop: "3px" }}>
              Full instant access to all 4 Sculpt Ladders, slow-mo video biomechanics, and multi-week programs. 0 credit card needed.
            </span>
          </div>
          <button
            className="btn sm"
            style={{
              background: "linear-gradient(135deg, #ff70a6 0%, #ff85a1 100%)",
              color: "#0d0f12",
              fontWeight: "900",
              padding: "10px 18px"
            }}
            disabled={isClaimingTrial}
            onClick={handleClaimTrial}
          >
            {isClaimingTrial ? "Activating..." : "⚡ Activate 7-Day Free Pass →"}
          </button>
        </div>
      )}

      {/* User Status Bar */}
      {user && (
        <div
          style={{
            background: "rgba(255, 112, 166, 0.08)",
            border: "1px solid rgba(255, 112, 166, 0.3)",
            borderRadius: "14px",
            padding: "12px 18px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "10px",
            marginBottom: "20px"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "20px" }}>✨</span>
            <div>
              <b style={{ color: "var(--acc)", fontSize: "14px" }}>
                Welcome back, {user.displayName || user.email?.split("@")[0]}!
              </b>
              <span className="mut sm" style={{ display: "block", fontSize: "12px" }}>
                Cloud synced · {isPro ? "🌸 Goddess PRO Active" : "🌱 Free Athlete"}
              </span>
            </div>
          </div>
          <span
            className="pill"
            style={{
              borderColor: "rgba(255, 112, 166, 0.4)",
              color: "var(--acc)",
              fontSize: "11px"
            }}
          >
            🔥 {streak} Day Streak
          </span>
        </div>
      )}

      {/* Quick Stat Counter Cards */}
      <div className="g4" style={{ marginBottom: "26px" }}>
        <div className="stat">
          <div className="v" style={{ color: "var(--acc)" }}>{streak}</div>
          <div className="l">🔥 Daily Streak</div>
        </div>
        <div className="stat">
          <div className="v" style={{ color: "var(--acc-warm)" }}>{mastery}%</div>
          <div className="l">🌸 Sculpt Mastery</div>
        </div>
        <div className="stat">
          <div className="v" style={{ color: "var(--acc-gold)" }}>{total}</div>
          <div className="l">🧘 Sessions Logged</div>
        </div>
        <div className="stat">
          <div className="v" style={{ color: "var(--ok)" }}>{wk}</div>
          <div className="l">⚡ This Week</div>
        </div>
      </div>

      {/* Signature Workouts Section */}
      <div className="sh" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
        <div>
          <span className="cali-acc">SIGNATURE ROUTINES</span>
          <h2 style={{ fontSize: "20px", fontWeight: "900", margin: "2px 0 0" }}>Guided Mat Workouts</h2>
        </div>
        <Link href="/programs" className="sm" style={{ color: "var(--acc)", fontWeight: "700" }}>
          All Programs →
        </Link>
      </div>

      <div className="g3" style={{ marginBottom: "32px" }}>
        {WORKOUTS.map((w) => (
          <div
            key={w.id}
            className="card"
            style={{
              cursor: "pointer",
              padding: "0",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              border: "1px solid var(--ln)",
              background: "var(--p)",
              overflow: "hidden",
              borderRadius: "18px",
              transition: "transform 0.15s ease, border-color 0.15s ease"
            }}
            onClick={() => setPreviewWorkout(w)}
          >
            {/* Visual Picture Reference Header */}
            <div style={{ position: "relative", width: "100%", height: "145px", overflow: "hidden", background: "#111" }}>
              <img
                src={WORKOUT_PICTURES[w.id] || "/banners/hero.jpg"}
                alt={w.n}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block"
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(13,15,18,0.85) 100%)"
                }}
              />
              <div style={{ position: "absolute", top: "10px", left: "10px", right: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span
                  className="pill sm"
                  style={{
                    background: "rgba(13, 15, 18, 0.85)",
                    backdropFilter: "blur(6px)",
                    borderColor: CATS[w.cat]?.c || "var(--acc)",
                    color: CATS[w.cat]?.c || "var(--acc)",
                    fontSize: "10px",
                    padding: "3px 8px"
                  }}
                >
                  {CATS[w.cat]?.n || w.cat}
                </span>
                <span
                  className="pill sm"
                  style={{
                    background: "rgba(13, 15, 18, 0.85)",
                    backdropFilter: "blur(6px)",
                    color: "#fff",
                    fontSize: "10.5px",
                    padding: "3px 8px"
                  }}
                >
                  ⏱️ {w.mins} mins
                </span>
              </div>
            </div>

            <div style={{ padding: "14px 16px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <h3 style={{ fontSize: "16px", fontWeight: "800", margin: "0 0 4px" }}>{w.n}</h3>
                <p className="mut sm" style={{ fontSize: "12px", lineHeight: "1.4", margin: 0 }}>{w.tag}</p>
              </div>

              <div style={{ marginTop: "14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span className="mut sm" style={{ fontSize: "11px" }}>{w.ex.length} exercises</span>
                <button
                  className="btn sm"
                  style={{
                    padding: "6px 14px",
                    fontSize: "12px",
                    background: "rgba(255, 112, 166, 0.15)",
                    color: "var(--acc)",
                    border: "1px solid var(--acc)"
                  }}
                >
                  Preview ▶
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* The 5 Signature Sculpt Ladders */}
      <div className="sh" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
        <div>
          <span className="cali-acc">PROGRESSIVE MASTERY</span>
          <h2 style={{ fontSize: "20px", fontWeight: "900", margin: "2px 0 0" }}>The 5 Master Sculpt Ladders</h2>
        </div>
        <Link href="/sculpt" className="sm" style={{ color: "var(--acc)", fontWeight: "700" }}>
          Full Ladders →
        </Link>
      </div>

      <div className="g2" style={{ marginBottom: "36px" }}>
        {SKILLS.map((sk) => (
          <Link
            key={sk.id}
            href={`/sculpt#${sk.id}`}
            className="card"
            style={{
              padding: "16px",
              display: "flex",
              alignItems: "center",
              gap: "14px",
              textDecoration: "none",
              color: "inherit",
              border: "1px solid var(--ln)",
              background: "var(--p)"
            }}
          >
            <div
              style={{
                fontSize: "28px",
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                background: "rgba(255, 112, 166, 0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0
              }}
            >
              {sk.icon}
            </div>
            <div style={{ flex: 1 }}>
              <b style={{ fontSize: "15px", color: "#fff", display: "block" }}>{sk.n}</b>
              <span className="mut sm" style={{ fontSize: "11.5px" }}>
                6 Progressive Milestones · {sk.lv[0][0]}
              </span>
            </div>
            <span style={{ color: "var(--acc)", fontSize: "18px" }}>→</span>
          </Link>
        ))}
      </div>

      {/* Biomechanics Masterclass: Why FORGE HER works */}
      <div
        style={{
          background: "linear-gradient(135deg, #1a141b 0%, #0d0f12 100%)",
          border: "1.5px solid rgba(255, 112, 166, 0.3)",
          borderRadius: "20px",
          padding: "24px",
          marginBottom: "36px"
        }}
      >
        <span className="cali-acc" style={{ color: "var(--acc)" }}>SCIENCE & BIOMECHANICS</span>
        <h2 style={{ fontSize: "22px", fontWeight: "900", margin: "4px 0 12px" }}>
          How FORGE HER Sculpts Without Bulk
        </h2>

        <div className="g3" style={{ marginTop: "16px" }}>
          <div style={{ background: "rgba(255, 255, 255, 0.03)", padding: "16px", borderRadius: "14px", border: "1px solid var(--ln)" }}>
            <div style={{ fontSize: "28px", marginBottom: "8px" }}>⏳</div>
            <b style={{ fontSize: "15px", color: "#fff", display: "block", marginBottom: "4px" }}>
              The TVA Internal Corset
            </b>
            <p className="mut sm" style={{ fontSize: "12px", lineHeight: "1.45" }}>
              Crunches build outward pushing pressure. Transverse Abdominis (TVA) draw-ins tighten your natural deep abdominal belt, flattening the lower stomach and pulling in the waist.
            </p>
          </div>

          <div style={{ background: "rgba(255, 255, 255, 0.03)", padding: "16px", borderRadius: "14px", border: "1px solid var(--ln)" }}>
            <div style={{ fontSize: "28px", marginBottom: "8px" }}>🍑</div>
            <b style={{ fontSize: "15px", color: "#fff", display: "block", marginBottom: "4px" }}>
              Glute Medius Dip-Filling
            </b>
            <p className="mut sm" style={{ fontSize: "12px", lineHeight: "1.45" }}>
              Heavy squats often build the quads. Our targeted fire hydrants, clamshells, and frog pumps isolate the upper glute shelf for an elevated hourglass curve.
            </p>
          </div>

          <div style={{ background: "rgba(255, 255, 255, 0.03)", padding: "16px", borderRadius: "14px", border: "1px solid var(--ln)" }}>
            <div style={{ fontSize: "28px", marginBottom: "8px" }}>🦢</div>
            <b style={{ fontSize: "15px", color: "#fff", display: "block", marginBottom: "4px" }}>
              Anti-Hunch Posture & Lift
            </b>
            <p className="mut sm" style={{ fontSize: "12px", lineHeight: "1.45" }}>
              Retracting the scapulae and activating the upper clavicular chest pulls forward shoulders back, naturally lifting the bustline and elongating the neck.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Accordion */}
      <div style={{ marginBottom: "40px" }}>
        <div className="sh">
          <span className="cali-acc">QUESTIONS & ANSWERS</span>
          <h2 style={{ fontSize: "20px", fontWeight: "900", margin: "2px 0 16px" }}>Frequently Asked Questions</h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {FAQS.map((f, i) => (
            <div
              key={i}
              className="card"
              style={{
                cursor: "pointer",
                padding: "16px 20px",
                border: "1px solid var(--ln)",
                background: "var(--p)"
              }}
              onClick={() => toggleFaq(i)}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <b style={{ fontSize: "14.5px", color: "#fff" }}>{f.q}</b>
                <span style={{ color: "var(--acc)", fontSize: "18px" }}>{openFaq === i ? "−" : "+"}</span>
              </div>
              {openFaq === i && (
                <p className="mut sm" style={{ marginTop: "10px", fontSize: "13px", lineHeight: "1.5", color: "var(--tx-dim)" }}>
                  {f.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Workout Preview Modal */}
      {previewWorkout && (
        <WorkoutModal
          workout={previewWorkout}
          onClose={() => setPreviewWorkout(null)}
        />
      )}
    </div>
  );
}
