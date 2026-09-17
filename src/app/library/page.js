"use client";
import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { EXDB, CATS } from "@/data/db";
import ExerciseModal from "@/components/ExerciseModal";
import AuthGate from "@/components/AuthGate";
import { useAuth } from "@/context/AuthContext";

function LibraryContent() {
  const { user, openAuthModal } = useAuth();
  const searchParams = useSearchParams();
  const initialCat = searchParams.get("cat") || "all";

  const [selectedCat, setSelectedCat] = useState(initialCat);
  const [query, setQuery] = useState("");
  const [selectedEx, setSelectedEx] = useState(null);

  const filtered = EXDB.filter((e) => {
    const mCat = selectedCat === "all" || e.cat === selectedCat;
    const mQ =
      !query ||
      e.n.toLowerCase().includes(query.toLowerCase()) ||
      (e.ms && e.ms.toLowerCase().includes(query.toLowerCase())) ||
      (e.d && e.d.toLowerCase().includes(query.toLowerCase()));
    return mCat && mQ;
  });

  return (
    <div className="vw active" id="v-library">
      <span className="cali-acc" style={{ color: "var(--acc)" }}>FEMININE EXERCISE CATALOG</span>
      <h1 className="pg" style={{ margin: "4px 0" }}>
        Movement <em>Library</em>
      </h1>
      <p className="sub" style={{ maxWidth: "600px", color: "var(--tx-dim)", marginBottom: "20px" }}>
        25 targeted feminine exercises for a flat tummy, hourglass hips/glutes, bustline firmness, and upright posture. Click any exercise for 60FPS video breakdowns, form cues, and regressions.
      </p>

      <div className="filters" style={{ marginBottom: "24px", display: "flex", flexWrap: "wrap", gap: "8px" }}>
        <button
          className={`fbtn ${selectedCat === "all" ? "on" : ""}`}
          style={{
            borderColor: selectedCat === "all" ? "var(--acc)" : "var(--ln)",
            background: selectedCat === "all" ? "rgba(255, 112, 166, 0.15)" : "transparent",
            color: selectedCat === "all" ? "var(--acc)" : "var(--tx)"
          }}
          onClick={() => setSelectedCat("all")}
        >
          All Sculpt Movements ({EXDB.length})
        </button>
        {Object.entries(CATS).map(([k, v]) => (
          <button
            key={k}
            className={`fbtn ${selectedCat === k ? "on" : ""}`}
            style={{
              borderColor: selectedCat === k ? v.c : "var(--ln)",
              background: selectedCat === k ? `${v.c}22` : "transparent",
              color: selectedCat === k ? v.c : "var(--tx)"
            }}
            onClick={() => setSelectedCat(k)}
          >
            {v.n}
          </button>
        ))}
        <input
          id="q"
          placeholder="Search waist, glutes, posture, bust..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            background: "rgba(0, 0, 0, 0.4)",
            border: "1px solid var(--ln)",
            borderRadius: "10px",
            padding: "8px 14px",
            color: "#fff",
            fontSize: "13px",
            minWidth: "220px"
          }}
        />
      </div>

      {!user && (
        <div
          style={{
            background: "rgba(255, 112, 166, 0.08)",
            border: "1px dashed rgba(255, 112, 166, 0.35)",
            borderRadius: "12px",
            padding: "10px 16px",
            marginBottom: "16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "8px"
          }}
        >
          <span style={{ fontSize: "12.5px", color: "var(--tx)" }}>
            🌸 <b>Sample Teaser:</b> First 3 movements unlocked. Sign in to analyze all 31 video breakdowns.
          </span>
          <button
            className="btn gh sm"
            style={{ fontSize: "11px", padding: "4px 10px", borderColor: "var(--acc)", color: "var(--acc)" }}
            onClick={() => openAuthModal("Sign in or register to unlock all 31 HD video movement breakdowns.")}
          >
            Unlock All 31 →
          </button>
        </div>
      )}

      <div className="grid g3">
        {filtered.map((e, idx) => {
          const isLocked = !user && idx >= 3;
          return (
            <div
              key={e.id}
              className="card cl"
              style={{
                borderColor: isLocked ? "rgba(255, 255, 255, 0.08)" : "rgba(255, 112, 166, 0.25)",
                cursor: "pointer",
                padding: "16px",
                background: isLocked ? "rgba(16, 18, 22, 0.6)" : "var(--p)",
                opacity: isLocked ? 0.75 : 1.0,
                position: "relative"
              }}
              onClick={() => {
                if (isLocked) {
                  openAuthModal(`Sign in or create a free account to unlock HD video breakdown for ${e.n}.`);
                  return;
                }
                setSelectedEx(e);
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span className="pill sm" style={{ borderColor: CATS[e.cat]?.c, color: CATS[e.cat]?.c }}>
                  <span className="d" style={{ background: CATS[e.cat]?.c }}></span>
                  {CATS[e.cat]?.n}
                </span>
                {isLocked ? (
                  <span className="pill sm" style={{ borderColor: "rgba(255, 112, 166, 0.5)", color: "var(--acc)" }}>
                    🔒 Locked
                  </span>
                ) : (
                  <span className={`pill lv${e.lv}`}>{"●".repeat(e.lv)} L{e.lv}</span>
                )}
              </div>
              <b style={{ display: "block", fontSize: "16.5px", margin: "10px 0 4px" }}>
                {e.n}
              </b>
              <div className="mut sm" style={{ fontSize: "12px", color: "var(--acc-warm)" }}>
                🎯 {e.ms}
              </div>
              <p className="mut sm" style={{ fontSize: "12px", margin: "6px 0 12px", lineHeight: "1.4" }}>
                {e.d}
              </p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span className="mut sm" style={{ fontSize: "11px" }}>{e.cu?.length || 0} form cues</span>
                <button
                  className="btn gh sm"
                  style={{
                    fontSize: "11.5px",
                    padding: "4px 10px",
                    borderColor: isLocked ? "rgba(255, 255, 255, 0.15)" : "rgba(255, 112, 166, 0.3)",
                    color: isLocked ? "var(--tx-dim)" : "var(--acc)"
                  }}
                >
                  {isLocked ? "🔒 Unlock" : "Analyze 🎬"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <ExerciseModal
        exercise={selectedEx}
        onClose={() => setSelectedEx(null)}
        onSelectExercise={(ex) => setSelectedEx(ex)}
      />
    </div>
  );
}

export default function Library() {
  return (
    <AuthGate
      title="Feminine Exercise Library"
      subtitle="Sign in to browse all 25 exercise video breakdowns, target joint cues, and slow-motion video analysis."
      icon="🌸"
    >
      <Suspense fallback={<div className="mut sm" style={{ padding: "40px", textAlign: "center" }}>Loading exercise library...</div>}>
        <LibraryContent />
      </Suspense>
    </AuthGate>
  );
}
