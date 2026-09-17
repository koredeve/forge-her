"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout, isPro, trialClaimed, openAuthModal, openProModal } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const mainLinks = [
    { href: "/", label: "Home", icon: "🏠" },
    { href: "/sculpt", label: "Sculpt", icon: "🌸" },
    { href: "/programs", label: "Programs", icon: "📋" },
    { href: "/library", label: "Library", icon: "📚" },
    { href: "/timer", label: "Timer", icon: "⏱" },
    { href: "/fuel", label: "Fuel", icon: "🥗" },
    { href: "/profile", label: "Profile", icon: "👤" }
  ];

  const bottomTabs = [
    { href: "/", label: "Home", icon: "🏠" },
    { href: "/sculpt", label: "Sculpt", icon: "🌸" },
    { href: "/programs", label: "Programs", icon: "📋" },
    { href: "/fuel", label: "Fuel", icon: "🥗" },
    { href: "/profile", label: "Profile", icon: "👤" }
  ];

  return (
    <>
      {/* Top Header */}
      <header>
        <div className="nav">
          <Link href="/" className="logo" onClick={() => setMobileMenuOpen(false)}>
            FORGE <span style={{ color: "var(--acc)", fontWeight: "900" }}>HER<i>.</i></span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="desktop-links">
            {mainLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`navbtn ${pathname === l.href ? "on" : ""}`}
              >
                {l.icon} {l.label}
              </Link>
            ))}
          </div>

          {/* Right Action Area */}
          <div style={{ marginLeft: "auto", display: "flex", gap: "8px", alignItems: "center" }}>
            {!isPro ? (
              <button
                className="btn sm"
                style={{
                  background: "linear-gradient(135deg, #ff70a6 0%, #ff85a1 100%)",
                  boxShadow: "0 4px 14px rgba(255, 112, 166, 0.35)",
                  fontSize: "12px",
                  padding: "6px 14px",
                  fontWeight: "900",
                  whiteSpace: "nowrap",
                  color: "#000"
                }}
                onClick={() => openProModal("All Sculpt & Snatched Roadmaps")}
              >
                {!trialClaimed ? "⚡ 7-Day Trial" : "👑 Get PRO"}
              </button>
            ) : (
              <span
                className="pill"
                style={{ borderColor: "var(--acc)", color: "var(--acc)", fontSize: "11px", fontWeight: "bold" }}
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
                      padding: "4px 10px",
                      borderRadius: "8px",
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
                    style={{ padding: "4px 8px", fontSize: "11px" }}
                    onClick={() => logout()}
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  className="btn gh sm"
                  style={{ fontSize: "12px" }}
                  onClick={() => openAuthModal("Sign in or register for your 7-day free PRO pass!")}
                >
                  Sign In
                </button>
              )}
            </div>

            {/* Mobile Menu Hamburger Toggle */}
            <button
              className="btn gh sm mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              style={{ padding: "6px 8px" }}
            >
              {mobileMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Drawer */}
        {mobileMenuOpen && (
          <div
            className="mobile-drawer"
            style={{
              background: "rgba(13, 15, 18, 0.98)",
              borderBottom: "1px solid var(--ln)",
              padding: "16px 20px",
              display: "flex",
              flexDirection: "column",
              gap: "10px"
            }}
          >
            {user ? (
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px", paddingBottom: "8px", borderBottom: "1px solid var(--ln)" }}>
                <span className="mut sm">Signed in as <b>{user.email}</b></span>
                <button className="btn gh sm" onClick={() => { logout(); setMobileMenuOpen(false); }}>
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                className="btn"
                style={{ width: "100%", justifyContent: "center", background: "linear-gradient(135deg, #ff70a6 0%, #ff85a1 100%)", color: "#000", fontWeight: "900", marginBottom: "8px" }}
                onClick={() => { openAuthModal("Sign in to save your streaks & claim your 7-day trial."); setMobileMenuOpen(false); }}
              >
                ⚡ Start 7-Day Free Trial
              </button>
            )}

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
              {mainLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`navbtn ${pathname === l.href ? "on" : ""}`}
                  style={{ justifyContent: "flex-start", padding: "10px 14px" }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {l.icon} {l.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Mobile Bottom Fixed Nav Bar */}
      <nav className="mobile-bar">
        {bottomTabs.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className={`mbtn ${pathname === t.href ? "on" : ""}`}
          >
            <span style={{ fontSize: "17px" }}>{t.icon}</span>
            <span>{t.label}</span>
          </Link>
        ))}
      </nav>
    </>
  );
}
