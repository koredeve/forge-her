// src/lib/chimes.js
// Modern studio audio synthesis using Web Audio API (crisp, elegant, zero robotic voice)

function getAudioContext() {
  if (typeof window === "undefined") return null;
  window.__FORGE_AC = window.__FORGE_AC || new (window.AudioContext || window.webkitAudioContext)();
  if (window.__FORGE_AC.state === "suspended") {
    window.__FORGE_AC.resume().catch(() => {});
  }
  return window.__FORGE_AC;
}

// Resonant crystal bell at work / exercise start (528Hz Solfeggio frequency + 1056Hz harmonic)
export function playHarmonicChime(enabled = true) {
  if (!enabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    [528, 1056].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now);
      const vol = i === 0 ? 0.22 : 0.08;
      gain.gain.setValueAtTime(vol, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 1.2);
    });
  } catch (_) {}
}

// Gentle double-bell at midpoint (660Hz -> 880Hz)
export function playHalfwayChime(enabled = true) {
  if (!enabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    [0, 0.16].forEach((delay, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(i === 0 ? 660 : 880, now + delay);
      gain.gain.setValueAtTime(0.18, now + delay);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + delay + 0.6);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + delay);
      osc.stop(now + delay + 0.6);
    });
  } catch (_) {}
}

// Calming descending tone for rest phase (440Hz -> 330Hz)
export function playRestChime(enabled = true) {
  if (!enabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(330, now + 0.4);
    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.9);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.9);
  } catch (_) {}
}

// Ascending C-Major victory chime on session conquered (C5, E5, G5, C6)
export function playVictoryChime(enabled = true) {
  if (!enabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, idx) => {
      const start = now + idx * 0.15;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, start);
      gain.gain.setValueAtTime(0.2, start);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 1.4);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(start);
      osc.stop(start + 1.4);
    });
  } catch (_) {}
}

// Crisp woodblock/sine tick at 3-2-1
export function playTickCountdown(isFinal = false, enabled = true) {
  if (!enabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(isFinal ? 1320 : 880, now);
    gain.gain.setValueAtTime(isFinal ? 0.25 : 0.14, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + (isFinal ? 0.35 : 0.14));
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + (isFinal ? 0.35 : 0.14));
  } catch (_) {}
}
