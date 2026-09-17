// src/lib/coachVoice.js

export function speakCoach(text, enabled = true) {
  if (!enabled) return;
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

  try {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.85; // Soft, measured cadence (gentle and unhurried)
    utterance.pitch = 1.05; // Calm, warm tone
    utterance.volume = 0.95;

    const voices = window.speechSynthesis.getVoices();
    // Prefer calm, clear female or natural English voices
    const preferredVoice = voices.find(
      (v) =>
        v.lang &&
        v.lang.startsWith("en") &&
        (v.name.includes("Samantha") ||
          v.name.includes("Karen") ||
          v.name.includes("Victoria") ||
          v.name.includes("Moira") ||
          v.name.includes("Google US English") ||
          v.name.includes("Natural") ||
          v.name.includes("Zira"))
    ) || voices.find((v) => v.lang && v.lang.startsWith("en"));

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    window.speechSynthesis.speak(utterance);
  } catch (err) {
    console.error("Coach voice error:", err);
  }
}

export function stopCoach() {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    try {
      window.speechSynthesis.cancel();
    } catch (_) {}
  }
}
