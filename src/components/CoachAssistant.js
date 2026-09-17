"use client";
import React, { useState, useRef, useEffect } from "react";
import { useFitness } from "@/context/FitnessContext";
import { useAuth } from "@/context/AuthContext";
import { EXDB, SKILLS, PROGRAMS, WORKOUTS } from "@/data/db";
import { haptics } from "@/lib/haptics";

// Specialized Feminine Biomechanics & Aesthetics Knowledge Base
const HER_KNOWLEDGE = {
  waist: `⏳ **How to Cinch the Waistline (The TVA Internal Corset):**
• **The Mistake:** Standard heavy weighted side-bends or hundreds of crunches can actually *hypertrophy* the external obliques and push the abdominal wall forward, widening your waist!
• **The Secret:** The **Transverse Abdominis (TVA)** is your deep internal muscular belt. When tightened, it draws the organs inward and reduces waist circumference by 1 to 2.5 inches.
• **The Morning Vacuum Protocol:**
  1. Do it first thing upon waking on an empty stomach.
  2. Exhale ALL air until your lungs are completely empty.
  3. Pull your navel back toward your spine and up under the ribcage.
  4. Hold for 15–30 seconds while taking tiny sips of air. Repeat for 3–4 rounds.
• **Pair with:** Dead Bugs and Plank Hip Dips to sculpt defined, flat side lines without bulking.`,

  booty: `🍑 **Hourglass Gluteus Medius & Maximus Activation:**
• **Upper Shelf & Side Hips (Glute Medius):** Fire Hydrants, Clamshells, and Curtsy Lunges create the coveted hourglass curvature from the waist down to the hips.
• **Maximum Projection (Glute Maximus):** Glute Bridges, Single-Leg Thrusts, and Bulgarian Glute Squats.
• **Mind-Muscle Connection Cue:**
  1. In the Glute Bridge, drive 100% through your heels, not your toes.
  2. At the top of every rep, do NOT arch your lower back. Tuck your pelvis (posterior pelvic tilt) and squeeze your glutes for a hard 2-second hold.
  3. Flare your knees outward ~30° against resistance to immediately recruit the side glutes.`,

  posture: `🦢 **Anti-Hunch Posture & Collarbone Alignment:**
• **The "Desk Worker" Syndrome:** Forward head posture and rounded shoulders compress your ribcage, reduce lung capacity, and make your bustline droop while pushing your stomach forward.
• **Spine Realignment Drills:**
  1. **Prone Cobra:** Lying face-down, externally rotate your arms so thumbs point directly at the ceiling. Squeeze lower shoulder blades down and back. Hold 30s.
  2. **Scapular Wall Slides:** Keep elbows, wrists, and lower back touching the wall. Slide upward without arching your spine.
• **Result:** Elongated neck, prominent sculpted collarbones, and an instant 1–2 inch taller, poised presence.`,

  bust: `✨ **Natural Bustline Lift & Décolletage Toning:**
• **The Biomechanics:** While breast tissue itself is glandular and adipose, the underlying **pectoralis major & minor** act as the biological foundation shelf.
• **Targeting the Upper Chest Shelf:**
  1. **Incline Push-Ups & Knee Push-Ups:** Target the clavicular head (upper chest), pulling the tissue upward and firming the décolletage.
  2. **Floor Squeeze Flyes & Isometric Prayer Presses:** Continuous inner-chest tension tightens the center cleavage line without needing heavy dumbbells.
• **Bonus:** Enhanced upper thoracic posture naturally pushes the chest proud and lifted.`,

  pooch: `🛡️ **Fixing Lower Belly Pooch (Anterior Pelvic Tilt & Deep Core):**
• **Why Skinny Girls Still Get a Pooch:** Often it is NOT body fat! It is **Anterior Pelvic Tilt (APT)**—weak glutes and tight hip flexors dump the pelvis forward, spilling abdominal organs outward.
• **The 3-Step Fix:**
  1. **Strengthen Glutes:** Fix pelvis angle with strict Glute Bridges.
  2. **Dead Bug Anti-Extension:** Lie down, glue lower back to the floor so zero gap exists, and alternate limb extensions without arching.
  3. **Release Tight Psoas:** Daily low-lunge hip flexor stretches to allow the pelvis to return to neutral.`,

  cycle: `🌸 **Cycle-Synced Training & Hormonal Fueling:**
• **Follicular Phase (Days 1–14):** Estrogen rises. Energy, insulin sensitivity, and strength peak! Perfect window to push hard on HIIT, Glute Ladders, and metabolic sessions.
• **Luteal Phase (Days 15–28):** Progesterone rises. Resting metabolic rate increases by 100–200 kcal, but joint laxity and core temperature increase. Focus on TVA vacuums, posture flows, lower-impact sculpts, and complex carbohydrates with magnesium to beat cravings.
• **Hydration & Bloat Flush:** Drink 2.5L water with electrolytes. Potassium-rich foods (coconut water, spinach, bananas) rapidly flush luteal water retention.`
};

export default function CoachAssistant() {
  const { user } = useFitness();
  const { isPro } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "coach",
      text: "Hello goddess! ✨ I'm **Coach HER**, your personal feminine biomechanics & aesthetics guide. Whether you want to cinch your waist, lift your glutes, firm your bustline, or align your posture, ask me anything!"
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const quickPrompts = [
    { label: "⏳ Cinch Waistline", query: "How to cinch waistline with stomach vacuum?" },
    { label: "🍑 Hourglass Glutes", query: "Best exercises for side hips and glute lift?" },
    { label: "🦢 Anti-Hunch Posture", query: "Fix forward shoulders and posture" },
    { label: "✨ Décolletage Lift", query: "How to firm and lift bustline?" },
    { label: "🛡️ Lower Belly Pooch", query: "Fix lower belly pooch and pelvic tilt" },
    { label: "🌸 Cycle Fueling", query: "How to cycle sync my workouts and nutrition?" }
  ];

  const handleSend = (textToSend) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    haptics.light();
    setMessages((prev) => [...prev, { role: "user", text: query }]);
    if (!textToSend) setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const q = query.toLowerCase();
      let reply = "";

      if (q.includes("waist") || q.includes("tummy") || q.includes("vacuum") || q.includes("stomach") || q.includes("corset")) {
        reply = HER_KNOWLEDGE.waist;
      } else if (q.includes("glute") || q.includes("booty") || q.includes("hip") || q.includes("ass") || q.includes("hourglass")) {
        reply = HER_KNOWLEDGE.booty;
      } else if (q.includes("posture") || q.includes("hunch") || q.includes("back") || q.includes("spine") || q.includes("neck")) {
        reply = HER_KNOWLEDGE.posture;
      } else if (q.includes("bust") || q.includes("breast") || q.includes("chest") || q.includes("firm")) {
        reply = HER_KNOWLEDGE.bust;
      } else if (q.includes("pooch") || q.includes("lower belly") || q.includes("tilt") || q.includes("dead bug")) {
        reply = HER_KNOWLEDGE.pooch;
      } else if (q.includes("cycle") || q.includes("period") || q.includes("hormone") || q.includes("fuel") || q.includes("food") || q.includes("protein")) {
        reply = HER_KNOWLEDGE.cycle;
      } else if (q.includes("routine") || q.includes("program") || q.includes("plan")) {
        reply = `🗓️ **Recommended FORGE HER Programs:**
• **Snatched & Sculpted 30:** 4-week deep core & glute foundation. Perfect for beginners to tone and cinch.
• **Hourglass Booty & Posture:** 6-week progressive volume focused on glute medius and thoracic spine alignment.
• **Total Body Goddess Recomp:** 6-week full silhouette overhaul combining waist cinching, upper bustline tone, and metabolic burn.
✨ Check out the **Programs** tab to begin your journey!`;
      } else {
        reply = `✨ **Coach HER Advice:**
Every feminine transformation is built on **TVA engagement (internal corset)**, **targeted glute activation (hip shelf)**, and **thoracic spine alignment (poise)**.
Try asking me about:
• "How to do stomach vacuums for a smaller waist"
• "Gluteus medius exercises for hourglass curves"
• "Lifting the bustline naturally"
• "Cycle-synced nutrition for fat loss"`;
      }

      setMessages((prev) => [...prev, { role: "coach", text: reply }]);
      setIsTyping(false);
      haptics.success();
    }, 600);
  };

  return (
    <>
      {/* Floating Coach Launcher Bubble */}
      <button
        onClick={() => {
          haptics.light();
          setIsOpen(!isOpen);
        }}
        aria-label="Open Coach HER"
        style={{
          position: "fixed",
          bottom: "76px",
          right: "18px",
          zIndex: 998,
          background: "linear-gradient(135deg, #ff70a6 0%, #ff85a1 100%)",
          color: "#0d0f12",
          border: "2px solid #ffd166",
          borderRadius: "999px",
          padding: "10px 16px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          fontWeight: "800",
          fontSize: "13.5px",
          boxShadow: "0 8px 24px rgba(255, 112, 166, 0.4)",
          cursor: "pointer"
        }}
      >
        <span style={{ fontSize: "18px" }}>✨</span>
        <span>Coach HER</span>
      </button>

      {/* Slide-Up Chat Drawer Modal */}
      {isOpen && (
        <div
          className="ov show"
          style={{ zIndex: 1200 }}
          onClick={() => setIsOpen(false)}
        >
          <div
            className="sheet"
            style={{
              maxWidth: "480px",
              height: "82vh",
              display: "flex",
              flexDirection: "column",
              background: "linear-gradient(180deg, #181119 0%, #0d0f12 100%)",
              border: "1.5px solid rgba(255, 112, 166, 0.4)",
              borderRadius: "20px 20px 0 0",
              boxShadow: "0 -8px 40px rgba(255, 112, 166, 0.2)",
              padding: "16px 18px",
              overflow: "hidden"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                paddingBottom: "12px"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #ff70a6 0%, #ffd166 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "20px"
                  }}
                >
                  🌸
                </div>
                <div>
                  <b style={{ fontSize: "16px", color: "#fff", display: "block" }}>
                    Coach HER <span style={{ fontSize: "11px", color: "var(--acc)" }}>AI BIOMECHANICS</span>
                  </b>
                  <span style={{ fontSize: "11px", color: "var(--mut)" }}>
                    Feminine Aesthetics & Biomechanics
                  </span>
                </div>
              </div>
              <button
                className="xbtn"
                onClick={() => setIsOpen(false)}
                style={{ fontSize: "20px" }}
              >
                ✕
              </button>
            </div>

            {/* Quick Prompt Chips */}
            <div
              style={{
                display: "flex",
                gap: "8px",
                overflowX: "auto",
                padding: "12px 0 8px",
                scrollbarWidth: "none"
              }}
            >
              {quickPrompts.map((p, i) => (
                <button
                  key={i}
                  className="pill"
                  style={{
                    whiteSpace: "nowrap",
                    cursor: "pointer",
                    background: "rgba(255, 112, 166, 0.08)",
                    borderColor: "rgba(255, 112, 166, 0.3)",
                    color: "var(--tx)",
                    fontSize: "11.5px",
                    padding: "5px 10px"
                  }}
                  onClick={() => handleSend(p.query)}
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* Chat Messages */}
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "8px 0",
                display: "flex",
                flexDirection: "column",
                gap: "12px"
              }}
            >
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  style={{
                    alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                    maxWidth: "88%",
                    background:
                      m.role === "user"
                        ? "linear-gradient(135deg, #ff70a6 0%, #ff85a1 100%)"
                        : "rgba(255, 255, 255, 0.04)",
                    color: m.role === "user" ? "#0d0f12" : "#f1f1f1",
                    border:
                      m.role === "user"
                        ? "none"
                        : "1px solid rgba(255, 112, 166, 0.2)",
                    borderRadius:
                      m.role === "user"
                        ? "16px 16px 2px 16px"
                        : "16px 16px 16px 2px",
                    padding: "12px 14px",
                    fontSize: "13.5px",
                    lineHeight: "1.5",
                    fontWeight: m.role === "user" ? "700" : "normal",
                    whiteSpace: "pre-wrap"
                  }}
                >
                  {m.text}
                </div>
              ))}

              {isTyping && (
                <div
                  style={{
                    alignSelf: "flex-start",
                    background: "rgba(255, 255, 255, 0.04)",
                    border: "1px solid rgba(255, 112, 166, 0.2)",
                    borderRadius: "16px 16px 16px 2px",
                    padding: "10px 14px",
                    fontSize: "12px",
                    color: "var(--mut)"
                  }}
                >
                  Coach HER is typing... ✨
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Message Input Box */}
            <div
              style={{
                display: "flex",
                gap: "8px",
                borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                paddingTop: "10px"
              }}
            >
              <input
                type="text"
                placeholder="Ask about waist, glutes, posture..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                style={{
                  flex: 1,
                  background: "rgba(0, 0, 0, 0.3)",
                  border: "1px solid var(--ln)",
                  borderRadius: "12px",
                  padding: "10px 14px",
                  color: "#fff",
                  fontSize: "13.5px",
                  outline: "none"
                }}
              />
              <button
                className="btn"
                onClick={() => handleSend()}
                style={{
                  padding: "10px 16px",
                  background: "linear-gradient(135deg, #ff70a6 0%, #ff85a1 100%)",
                  color: "#0d0f12",
                  fontWeight: "800",
                  borderRadius: "12px"
                }}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
