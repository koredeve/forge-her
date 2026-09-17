"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useFitness } from "@/context/FitnessContext";
import { SKILLS, TESTS, CATS } from "@/data/db";
import AuthGate from "@/components/AuthGate";
import FlexCardModal from "@/components/FlexCardModal";
import Link from "next/link";

export default function ProfilePage() {
  const {
    user,
    logout,
    isPro,
    isAdmin,
    proPassInfo,
    openProModal,
    grantProPass,
    revokeProPass,
    fetchProPasses
  } = useAuth();

  const { logs, prs, skills, getStreak, getSkillsPct, showToast } = useFitness();

  const [showFlexCard, setShowFlexCard] = useState(false);

  // Admin Access Pass Form State
  const [grantEmail, setGrantEmail] = useState("");
  const [grantDuration, setGrantDuration] = useState("1week");
  const [grantNote, setGrantNote] = useState("");
  const [isGranting, setIsGranting] = useState(false);

  // Admin Pass List State
  const [passes, setPasses] = useState([]);
  const [loadingPasses, setLoadingPasses] = useState(false);

  // Load passes if admin
  const loadPasses = async () => {
    if (!isAdmin) return;
    setLoadingPasses(true);
    try {
      const list = await fetchProPasses();
      setPasses(list);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingPasses(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      loadPasses();
    }
  }, [isAdmin]);

  const handleGrant = async (e) => {
    e.preventDefault();
    if (!grantEmail.trim()) {
      showToast("Please enter a valid email address.");
      return;
    }
    setIsGranting(true);
    try {
      await grantProPass(grantEmail, grantDuration, grantNote);
      showToast(`PRO pass granted to ${grantEmail}! ⚡`);
      setGrantEmail("");
      setGrantNote("");
      await loadPasses();
    } catch (err) {
      showToast(err.message || "Failed to grant pass");
    } finally {
      setIsGranting(false);
    }
  };

  const handleRevoke = async (passId, email) => {
    if (!confirm(`Revoke PRO access for ${email}?`)) return;
    try {
      await revokeProPass(passId);
      showToast(`Access revoked for ${email}`);
      await loadPasses();
    } catch (err) {
      showToast("Failed to revoke pass");
    }
  };

  // Metrics
  const streak = getStreak();
  const masteryPct = getSkillsPct();
  const totalMins = logs.reduce((acc, s) => acc + (s.min || 0), 0);
  const hoursTrained = Math.floor(totalMins / 60);
  const minsRemaining = totalMins % 60;

  // Milestone counters
  let totalLevels = 0;
  let conqueredCount = 0;
  SKILLS.forEach((s) => {
    totalLevels += s.lv.length;
    (skills[s.id] || []).forEach((v) => {
      if (v) conqueredCount++;
    });
  });

  const displayName = user?.displayName || user?.email?.split("@")[0] || "Goddess";
  const userInitial = displayName.charAt(0).toUpperCase();
  const memberSince = user?.metadata?.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString("en-US", { month: "short", year: "numeric" })
    : "Recently";

  return (
    <AuthGate
      title="Goddess Profile"
      subtitle="Sign in to view your sculpt progress, track unlocked ladders, and manage your account."
      icon="🌸"
    >
      <div className="vw active" id="v-profile">
        {/* Profile Card */}
        <div
          className="card"
          style={{
            marginBottom: "24px",
            background: "linear-gradient(135deg, rgba(255, 112, 166, 0.12) 0%, rgba(18, 14, 18, 0.85) 100%)",
            border: "1.5px solid rgba(255, 112, 166, 0.35)",
            position: "relative",
            overflow: "hidden",
            padding: "22px"
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={displayName}
                  style={{ width: "72px", height: "72px", borderRadius: "50%", border: "2px solid var(--acc)", objectFit: "cover" }}
                />
              ) : (
                <div
                  style={{
                    width: "72px",
                    height: "72px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #ff70a6 0%, #ffd166 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "28px",
                    fontWeight: "900",
                    color: "#0d0f12",
                    boxShadow: "0 0 24px rgba(255, 112, 166, 0.35)"
                  }}
                >
                  {userInitial}
                </div>
              )}

              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                  <h1 style={{ fontSize: "24px", margin: 0, fontWeight: "900", color: "#fff" }}>{displayName}</h1>
                  {isAdmin ? (
                    <span className="pill" style={{ borderColor: "#ffd166", color: "#ffd166", fontSize: "11px", fontWeight: "bold" }}>
                      👑 CREATOR / ADMIN
                    </span>
                  ) : proPassInfo?.valid ? (
                    <span className="pill" style={{ borderColor: "var(--acc)", color: "var(--acc)", fontSize: "11px", fontWeight: "bold" }}>
                      🌸 GODDESS PASS ({proPassInfo.durationLabel})
                    </span>
                  ) : isPro ? (
                    <span className="pill" style={{ borderColor: "var(--acc)", color: "var(--acc)", fontSize: "11px", fontWeight: "bold" }}>
                      👑 GODDESS PRO
                    </span>
                  ) : (
                    <span className="pill" style={{ borderColor: "var(--ln)", color: "var(--mut)", fontSize: "11px" }}>
                      FREE ATHLETE
                    </span>
                  )}
                </div>

                <p className="mut sm" style={{ margin: "4px 0 0", fontSize: "13px" }}>
                  {user?.email} · Member since {memberSince}
                </p>

                {proPassInfo?.valid && !proPassInfo.permanent && proPassInfo.expiresAt && (
                  <p style={{ margin: "4px 0 0", fontSize: "12px", color: "var(--acc)" }}>
                    ✓ Goddess access active until {new Date(proPassInfo.expiresAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>

            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <button
                className="btn gh sm"
                style={{ fontSize: "12px", border: "1px solid var(--acc)", color: "var(--acc)", display: "flex", alignItems: "center", gap: "6px" }}
                onClick={() => setShowFlexCard(true)}
              >
                📸 <span>Share Flex Card</span>
              </button>
              {!isPro && !isAdmin && (
                <button
                  className="btn sm"
                  style={{ background: "linear-gradient(135deg, #ff70a6 0%, #ff85a1 100%)", color: "#0d0f12", fontWeight: "800", fontSize: "12px" }}
                  onClick={() => openProModal("All Sculpt Mastery Ladders")}
                >
                  🌸 Upgrade to PRO
                </button>
              )}
              <button
                className="btn gh sm"
                style={{ fontSize: "12px" }}
                onClick={() => logout()}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Stats Dashboard */}
        <div className="sect" style={{ marginBottom: "14px" }}>
          <h2>Sculpt Process & Biomechanics</h2>
          <span className="mut">Real-time progress synced to cloud</span>
        </div>

        <div className="grid g4" style={{ marginBottom: "24px" }}>
          <div className="card" style={{ textAlign: "center", padding: "18px", border: "1px solid var(--ln)" }}>
            <div style={{ fontSize: "28px", marginBottom: "4px" }}>🔥</div>
            <b style={{ fontSize: "24px", color: "var(--acc)", display: "block" }}>{streak}</b>
            <span className="mut sm" style={{ fontSize: "12px" }}>Daily Streak</span>
          </div>

          <div className="card" style={{ textAlign: "center", padding: "18px", border: "1px solid var(--ln)" }}>
            <div style={{ fontSize: "28px", marginBottom: "4px" }}>🧘</div>
            <b style={{ fontSize: "24px", color: "var(--tx)", display: "block" }}>{logs.length}</b>
            <span className="mut sm" style={{ fontSize: "12px" }}>Sessions Completed</span>
          </div>

          <div className="card" style={{ textAlign: "center", padding: "18px", border: "1px solid var(--ln)" }}>
            <div style={{ fontSize: "28px", marginBottom: "4px" }}>⏱️</div>
            <b style={{ fontSize: "24px", color: "var(--acc-warm)", display: "block" }}>
              {hoursTrained > 0 ? `${hoursTrained}h ${minsRemaining}m` : `${minsRemaining}m`}
            </b>
            <span className="mut sm" style={{ fontSize: "12px" }}>Total Mat Time</span>
          </div>

          <div className="card" style={{ textAlign: "center", padding: "18px", border: "1px solid var(--ln)" }}>
            <div style={{ fontSize: "28px", marginBottom: "4px" }}>🌸</div>
            <b style={{ fontSize: "24px", color: "var(--ok)", display: "block" }}>{masteryPct}%</b>
            <span className="mut sm" style={{ fontSize: "12px" }}>Sculpt Mastery</span>
          </div>
        </div>

        {/* Milestones & PRs */}
        <div className="grid g2" style={{ marginBottom: "28px" }}>
          <div className="card" style={{ padding: "18px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <h3 style={{ margin: 0, fontSize: "16px" }}>🌸 Sculpt Milestones</h3>
              <Link href="/sculpt" style={{ color: "var(--acc)", fontSize: "12px", textDecoration: "none", fontWeight: "bold" }}>
                View Ladders →
              </Link>
            </div>
            <p className="mut sm" style={{ fontSize: "13px", marginBottom: "14px" }}>
              Progressive mastery ladder. You have conquered <b>{conqueredCount}</b> of <b>{totalLevels}</b> feminine standards.
            </p>
            <div className="pb" style={{ height: "8px", background: "rgba(255,255,255,0.06)", borderRadius: "99px", overflow: "hidden" }}>
              <i style={{ width: `${masteryPct}%`, height: "100%", background: "linear-gradient(90deg, #ff70a6, #ff85a1)", display: "block" }}></i>
            </div>
            <div style={{ marginTop: "16px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
              {SKILLS.map((s) => {
                const uL = skills[s.id] || [];
                const dC = uL.filter(Boolean).length;
                return (
                  <div key={s.id} style={{ background: "rgba(255,255,255,0.03)", padding: "8px 10px", borderRadius: "8px", border: "1px solid var(--ln)" }}>
                    <span style={{ fontSize: "12px", display: "flex", alignItems: "center", gap: "4px" }}>
                      {s.icon} <b>{s.n.split("to")[0].split("&")[0].trim()}</b>
                    </span>
                    <span className="mut sm" style={{ fontSize: "11px" }}>Lv{dC} of {s.lv.length} unlocked</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="card" style={{ padding: "18px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <h3 style={{ margin: 0, fontSize: "16px" }}>🏆 Personal Records</h3>
              <span className="mut sm" style={{ fontSize: "12px" }}>Form Max Tests</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              {TESTS.map((t) => {
                const history = prs[t.id] || [];
                const best = history.length ? Math.max(...history.map((h) => h.v)) : null;
                return (
                  <div key={t.id} style={{ padding: "10px", background: "rgba(255,255,255,0.03)", borderRadius: "10px", border: "1px solid var(--ln)" }}>
                    <span className="mut sm" style={{ fontSize: "11px", display: "block" }}>{t.n}</span>
                    <b style={{ fontSize: "18px", color: best ? "var(--acc)" : "var(--mut)" }}>
                      {best ? `${best} ${t.u}` : "No record"}
                    </b>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Creator / Admin Pass Manager */}
        {isAdmin && (
          <div
            className="card"
            style={{
              marginBottom: "28px",
              border: "1.5px solid rgba(255, 209, 102, 0.4)",
              background: "linear-gradient(135deg, rgba(255, 209, 102, 0.05) 0%, rgba(18, 14, 18, 0.9) 100%)",
              padding: "20px"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px", marginBottom: "12px" }}>
              <div>
                <h3 style={{ margin: 0, fontSize: "18px", display: "flex", alignItems: "center", gap: "8px", color: "#ffd166" }}>
                  👑 Creator Access Pass Manager
                </h3>
                <p className="mut sm" style={{ margin: "4px 0 0", fontSize: "13px" }}>
                  Grant limited or permanent PRO access to friends, clients, or beta testers by email.
                </p>
              </div>
              <button
                className="btn gh sm"
                onClick={loadPasses}
                disabled={loadingPasses}
                style={{ fontSize: "11px", padding: "4px 10px" }}
              >
                {loadingPasses ? "Refreshing..." : "↻ Refresh Passes"}
              </button>
            </div>

            <form onSubmit={handleGrant} style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1.5fr auto", gap: "10px", alignItems: "flex-end" }}>
              <div>
                <label style={{ fontSize: "11.5px", color: "var(--mut)", display: "block", marginBottom: "4px" }}>
                  Recipient Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="goddess@example.com"
                  value={grantEmail}
                  onChange={(e) => setGrantEmail(e.target.value)}
                  style={{ width: "100%", padding: "8px 12px", background: "rgba(0,0,0,0.4)", border: "1px solid var(--ln)", borderRadius: "8px", color: "#fff", fontSize: "13px" }}
                />
              </div>

              <div>
                <label style={{ fontSize: "11.5px", color: "var(--mut)", display: "block", marginBottom: "4px" }}>
                  Duration
                </label>
                <select
                  value={grantDuration}
                  onChange={(e) => setGrantDuration(e.target.value)}
                  style={{ width: "100%", padding: "8px 12px", background: "#11151a", border: "1px solid var(--ln)", borderRadius: "8px", color: "#fff", fontSize: "13px" }}
                >
                  <option value="1week">1 Week (Beta Trial)</option>
                  <option value="1month">1 Month</option>
                  <option value="3months">3 Months</option>
                  <option value="1year">1 Year</option>
                  <option value="permanent">Permanent VIP</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: "11.5px", color: "var(--mut)", display: "block", marginBottom: "4px" }}>
                  Note / Tag
                </label>
                <input
                  type="text"
                  placeholder="VIP member, client..."
                  value={grantNote}
                  onChange={(e) => setGrantNote(e.target.value)}
                  style={{ width: "100%", padding: "8px 12px", background: "rgba(0,0,0,0.4)", border: "1px solid var(--ln)", borderRadius: "8px", color: "#fff", fontSize: "13px" }}
                />
              </div>

              <button
                type="submit"
                className="btn sm"
                disabled={isGranting}
                style={{ background: "linear-gradient(135deg, #ffd166 0%, #ff85a1 100%)", color: "#0d0f12", fontWeight: "900", height: "36px" }}
              >
                {isGranting ? "Granting..." : "⚡ Issue Pass"}
              </button>
            </form>
          </div>
        )}

        {/* 9:16 Flex Story Card Modal */}
        <FlexCardModal
          isOpen={showFlexCard}
          onClose={() => setShowFlexCard(false)}
          data={{
            athleteName: displayName,
            title: "Feminine Silhouette Master",
            streak: streak,
            mins: totalMins,
            xp: Math.round(conqueredCount * 50),
            masteryPct: masteryPct
          }}
        />
      </div>
    </AuthGate>
  );
}
