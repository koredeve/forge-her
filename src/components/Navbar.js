"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import ForgeHerLogo from "./ForgeHerLogo";
import { haptics } from "@/lib/haptics";

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout, isPro, trialClaimed, openAuthModal, openProModal } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const mainLinks = [
    { href: "/", label: "Home", icon: "🏠", desc: "Today's Sculpt & Streaks" },
    { href: "/sculpt", label: "Sculpt", icon: "🌸", desc: "5 Level Progression Ladders" },
    { href: "/programs", label: "Programs", icon: "📋", desc: "Multi-Week Roadmaps" },
    { href: "/library", label: "Library", icon: "📚", desc: "31 Movement Biomechanics" },
    { href: "/timer", label: "Timer", icon: "⏱", desc: "Interval & Rest Chimes" },
    { href: "/fuel", label: "Fuel", icon: "🥗", desc: "Cycle-Synced Nutrition" },
    { href: "/profile", label: "Profile", icon: "👤", desc: "Stats & Pro Pass" }
  ];

  const bottomTabs = [
    { href: "/", label: "Home", icon: "🏠" },
    { href: "/sculpt", label: "Sculpt", icon: "🌸" },
    { href: "/programs", label: "Programs", icon: "📋" },
    { href: "/fuel", label: "Fuel", icon: "🥗" },
    { href: "/profile", label: "Profile", icon: "👤" }
  ];

  const toggleMenu = () => {
    haptics.light();
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top Header */}
      <header>
        <div className="nav">
          <Link href="/" className="logo-link" onClick={closeMenu} aria-label="FORGE HER Home">
            <ForgeHerLogo size="default" />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="desktop-links">
            {mainLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`navbtn ${pathname === l.href ? "on" : ""}`}
                onClick={() => haptics.light()}
              >
                <span>{l.icon}</span> <span>{l.label}</span>
              </Link>
            ))}
          </div>

          {/* Right Action Area */}
          <div style={{ marginLeft: "auto", display: "flex", gap: "10px", alignItems: "center" }}>
            {!isPro ? (
              <button
                className="btn sm pro-badge-btn"
                style={{
                  background: "linear-gradient(135deg, #ff70a6 0%, #ff85a1 100%)",
                  boxShadow: "0 4px 14px rgba(255, 112, 166, 0.35)",
                  fontSize: "12px",
                  padding: "6px 14px",
                  fontWeight: "900",
                  whiteSpace: "nowrap",
                  color: "#0d0f12",
                  borderRadius: "999px"
                }}
                onClick={() => {
                  haptics.light();
                  openProModal("All Sculpt & Snatched Roadmaps");
                }}
              >
                {!trialClaimed ? "⚡ 7-Day Trial" : "👑 Get PRO"}
              </button>
            ) : (
              <span
                className="pill sm"
                style={{
                  borderColor: "var(--acc)",
                  color: "var(--acc)",
                  fontSize: "11px",
                  fontWeight: "bold",
                  background: "rgba(255, 112, 166, 0.1)"
                }}
              >
                👑 PRO ATHLETE
              </span>
            )}

            {/* Desktop User Status */}
            <div className="desktop-user">
              {user ? (
                <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                  <Link
                    href="/profile"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      textDecoration: "none",
                      background: pathname === "/profile" ? "rgba(255, 112, 166, 0.15)" : "rgba(255, 255, 255, 0.05)",
                      border: pathname === "/profile" ? "1px solid var(--acc)" : "1px solid var(--ln)",
                      padding: "5px 12px",
                      borderRadius: "99px",
                      transition: "all 0.2s"
                    }}
                    title="View Profile & Stats"
                  >
                    <span style={{ fontSize: "12px" }}>👤</span>
                    <span style={{ maxWidth: "90px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontSize: "12px", color: "var(--tx)", fontWeight: "600" }}>
                      {user.displayName?.split(" ")[0] || user.email?.split("@")[0]}
                    </span>
                  </Link>
                  <button
                    className="btn gh sm"
                    style={{ padding: "5px 10px", fontSize: "11.5px" }}
                    onClick={() => logout()}
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  className="btn gh sm"
                  style={{ fontSize: "12.5px" }}
                  onClick={() => openAuthModal("Sign in or register for your 7-day free PRO pass!")}
                >
                  Sign In
                </button>
              )}
            </div>

            {/* Mobile Menu Hamburger Toggle */}
            <button
              className="mobile-burger-btn"
              onClick={toggleMenu}
              aria-label="Toggle mobile menu"
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "10px",
                background: mobileMenuOpen ? "rgba(255, 112, 166, 0.2)" : "rgba(255, 255, 255, 0.05)",
                border: "1px solid " + (mobileMenuOpen ? "var(--acc)" : "var(--ln)"),
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: mobileMenuOpen ? "var(--acc)" : "var(--tx)",
                cursor: "pointer"
              }}
            >
              {mobileMenuOpen ? (
                <span style={{ fontSize: "18px", fontWeight: "900" }}>✕</span>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Luxury Full-Height Slide-Over Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer-backdrop" onClick={closeMenu}>
          <div className="mobile-drawer" onClick={(e) => e.stopPropagation()}>
            {/* Drawer Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "14px", borderBottom: "1px solid rgba(255, 112, 166, 0.2)" }}>
              <ForgeHerLogo size="small" />
              <button
                onClick={closeMenu}
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  background: "rgba(255, 255, 255, 0.08)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "14px",
                  cursor: "pointer"
                }}
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>

            {/* Athlete Profile / Quick Auth Card */}
            {user ? (
              <div
                style={{
                  background: "rgba(255, 112, 166, 0.08)",
                  border: "1px solid rgba(255, 112, 166, 0.25)",
                  borderRadius: "16px",
                  padding: "14px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #ff70a6 0%, #ff85a1 100%)",
                      color: "#0d0f12",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "900",
                      fontSize: "15px"
                    }}
                  >
                    {user.displayName ? user.displayName.charAt(0).toUpperCase() : "G"}
                  </div>
                  <div style={{ overflow: "hidden" }}>
                    <b style={{ color: "#fff", fontSize: "13.5px", display: "block", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
                      {user.displayName || "Goddess Athlete"}
                    </b>
                    <span style={{ color: "var(--mut)", fontSize: "11px", display: "block", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
                      {user.email}
                    </span>
                  </div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "4px" }}>
                  <span className="pill sm" style={{ borderColor: isPro ? "var(--acc)" : "var(--ln)", color: isPro ? "var(--acc)" : "var(--mut)", fontSize: "10px" }}>
                    {isPro ? "🌸 Goddess PRO Active" : "🌱 Free Athlete"}
                  </span>
                  <button
                    className="btn gh sm"
                    style={{ fontSize: "11px", padding: "4px 8px" }}
                    onClick={() => {
                      logout();
                      closeMenu();
                    }}
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <div
                style={{
                  background: "linear-gradient(135deg, rgba(255, 112, 166, 0.15) 0%, rgba(26, 17, 24, 0.9) 100%)",
                  border: "1.5px solid var(--acc)",
                  borderRadius: "16px",
                  padding: "16px",
                  textAlign: "center"
                }}
              >
                <b style={{ color: "var(--acc)", fontSize: "14px", display: "block", marginBottom: "4px" }}>
                  🌸 7-Day Goddess Free Pass
                </b>
                <p style={{ color: "var(--tx-dim)", fontSize: "11.5px", lineHeight: "1.4", margin: "0 0 12px" }}>
                  Unlock all 4 Sculpt Ladders and cycle-synced nutrition. Zero credit card needed.
                </p>
                <button
                  className="btn"
                  style={{
                    width: "100%",
                    justifyContent: "center",
                    background: "linear-gradient(135deg, #ff70a6 0%, #ff85a1 100%)",
                    color: "#0d0f12",
                    fontWeight: "900",
                    fontSize: "13px",
                    padding: "10px"
                  }}
                  onClick={() => {
                    closeMenu();
                    openAuthModal("Sign in to save your streaks & claim your 7-day trial.");
                  }}
                >
                  ⚡ Start 7-Day Free Trial
                </button>
              </div>
            )}

            {/* Navigation Links */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginTop: "4px" }}>
              {mainLinks.map((l) => {
                const isActive = pathname === l.href;
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    className={`drawer-link ${isActive ? "on" : ""}`}
                    onClick={() => {
                      haptics.light();
                      closeMenu();
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "12px 14px",
                      borderRadius: "14px",
                      background: isActive ? "rgba(255, 112, 166, 0.12)" : "rgba(255, 255, 255, 0.03)",
                      border: "1px solid " + (isActive ? "rgba(255, 112, 166, 0.35)" : "transparent"),
                      textDecoration: "none",
                      color: isActive ? "#fff" : "var(--tx)",
                      transition: "0.15s"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <span style={{ fontSize: "18px" }}>{l.icon}</span>
                      <div>
                        <b style={{ fontSize: "13.5px", display: "block" }}>{l.label}</b>
                        <span style={{ fontSize: "10.5px", color: "var(--mut)", display: "block" }}>{l.desc}</span>
                      </div>
                    </div>
                    {isActive && <span style={{ color: "var(--acc)", fontSize: "14px" }}>●</span>}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* App-Style Bottom Fixed Nav Bar for Mobile Screens */}
      <nav className="mobile-bottom-bar" aria-label="Mobile Navigation">
        {bottomTabs.map((t) => {
          const isActive = pathname === t.href;
          return (
            <Link
              key={t.href}
              href={t.href}
              className={`bottom-tab ${isActive ? "active" : ""}`}
              onClick={() => haptics.light()}
            >
              <span className="tab-icon">{t.icon}</span>
              <span className="tab-label">{t.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
