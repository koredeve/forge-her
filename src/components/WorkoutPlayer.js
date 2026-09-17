"use client";
import React, { useState, useEffect, useRef } from "react";
import { useFitness } from "@/context/FitnessContext";
import { EXDB } from "@/data/db";
import { haptics } from "@/lib/haptics";
import FlexCardModal from "@/components/FlexCardModal";

const EXERCISE_MEDIA = {
  vacuum: { img: "/reference/vacuum.jpg", video: "/videos/vacuum.mp4" },
  deadbug: { img: "/reference/deadbug.jpg", video: "/videos/deadbug.mp4" },
  hipdip: { img: "/reference/hipdip.jpg", video: "/videos/hipdip.mp4" },
  flutter: { img: "/reference/flutter.jpg", video: "/videos/flutter.mp4" },
  situp: { img: "/reference/situp.jpg", video: "/videos/situp.mp4" },
  birddog: { img: "/reference/birddog.jpg", video: "/videos/birddog.mp4" },
  russiantwist: { img: "/reference/russiantwist.jpg", video: "/videos/russiantwist.mp4" },
  plank: { img: "/reference/plank.jpg", video: "/videos/plank.mp4" },
  sidep: { img: "/reference/sidep.jpg", video: "/videos/sidep.mp4" },
  glutebridge: { img: "/reference/glutebridge.jpg", video: "/videos/glutebridge.mp4" },
  donkey: { img: "/reference/donkey.jpg", video: "/videos/donkey.mp4" },
  hydrant: { img: "/reference/hydrant.jpg", video: "/videos/hydrant.mp4" },
  clamshell: { img: "/reference/clamshell.jpg", video: "/videos/clamshell.mp4" },
  curtsy: { img: "/reference/curtsy.jpg", video: "/videos/curtsy.mp4" },
  frogpump: { img: "/reference/frogpump.jpg", video: "/videos/frogpump.mp4" },
  bulg: { img: "/reference/bulg.jpg", video: "/videos/bulg.mp4" },
  squat: { img: "/reference/squat.jpg", video: "/videos/squat.mp4" },
  calf: { img: "/reference/calf.jpg", video: "/videos/calf.mp4" },
  chestprayer: { img: "/reference/chestprayer.jpg", video: "/videos/chestprayer.mp4" },
  inclinepush: { img: "/reference/pushup.jpg", video: "/videos/inclinepush.mp4" },
  pushup: { img: "/reference/pushup.jpg", video: "/videos/pushup.mp4" },
  kneepush: { img: "/reference/pushup.jpg", video: "/videos/kneepush.mp4" },
  tricepdip: { img: "/reference/tricepdip.jpg", video: "/videos/tricepdip.mp4" },
  shouldertap: { img: "/reference/shouldertap.jpg", video: "/videos/shouldertap.mp4" },
  pikepush: { img: "/reference/pikepush.jpg", video: "/videos/pikepush.mp4" },
  doorwayrow: { img: "/reference/standing_hero.jpg", video: "/videos/doorwayrow.mp4" },
  mountainclimber: { img: "/reference/pushup.jpg", video: "/videos/pushup.mp4" },
  flye: { img: "/reference/chestprayer.jpg", video: "/videos/flye.mp4" },
  cobra: { img: "/reference/cobra.jpg", video: "/videos/cobra.mp4" },
  wallslide: { img: "/reference/standing_hero.jpg", video: "/videos/wallslide.mp4" },
  superman: { img: "/reference/cobra.jpg", video: "/videos/superman.mp4" },
  dog: { img: "/reference/cobra.jpg", video: "/videos/dog.mp4" },
  default: { img: "/reference/pushup.jpg", video: "/videos/pushup.mp4" }
};

export default function WorkoutPlayer() {
  const { activeSession, setActiveSession, playBeep, addLog, getStreak, getSkillsPct } = useFitness();

  const [stepIdx, setStepIdx] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [isDone, setIsDone] = useState(false);
  const [showFlexCard, setShowFlexCard] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());
  const [videoSlowMo, setVideoSlowMo] = useState(false);
  const [showQuitConfirm, setShowQuitConfirm] = useState(false);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [earnedXp, setEarnedXp] = useState(0);

  const videoRef = useRef(null);

  // Flatten workout routine into playable steps
  const steps = React.useMemo(() => {
    if (!activeSession || !activeSession.ex) return [];
    const flat = [];
    activeSession.ex.forEach((item) => {
      const sets = item.s || 3;
      for (let s = 1; s <= sets; s++) {
        flat.push({
          type: "prep",
          x: item.x,
          setNum: s,
          totalSets: sets,
          duration: 5,
          label: "Get Ready"
        });
        flat.push({
          type: "work",
          x: item.x,
          setNum: s,
          totalSets: sets,
          reps: item.r,
          sec: item.sec,
          duration: item.sec ? Number(item.sec) : 35,
          label: item.sec ? `${item.sec}s Hold` : `${item.r} Reps`
        });
        if (s < sets || activeSession.ex.indexOf(item) < activeSession.ex.length - 1) {
          flat.push({
            type: "rest",
            x: item.x,
            setNum: s,
            totalSets: sets,
            duration: item.rest || 30,
            label: "Rest & Recover"
          });
        }
      }
    });
    return flat;
  }, [activeSession]);

  useEffect(() => {
    if (activeSession) {
      setStepIdx(0);
      setIsDone(false);
      setIsRunning(true);
      setStartTime(Date.now());
      setEarnedXp(0);
      if (steps.length > 0) {
        setTimer(steps[0].duration);
      }
    }
  }, [activeSession, steps]);

  const currentStep = steps[stepIdx];
  const nextStep = steps[stepIdx + 1];
  const currentEx = EXDB.find((e) => e.id === currentStep?.x) || { n: currentStep?.x || "Exercise", ms: "", cu: [] };
  const media = EXERCISE_MEDIA[currentStep?.x] || EXERCISE_MEDIA.default;

  // Video playback speed
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = videoSlowMo ? 0.5 : 1.0;
    }
  }, [videoSlowMo, stepIdx]);

  // Interval timer tick
  useEffect(() => {
    if (!activeSession || isDone || !isRunning || !currentStep) return;

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          handleStepComplete();
          return 0;
        }

        // 3-2-1 Audio & Haptic Cues
        if (prev <= 4 && prev > 1) {
          playBeep(880, 0.15);
          haptics.countdown();
        } else if (prev === 1) {
          playBeep(1320, 0.4);
          haptics.medium();
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [activeSession, isDone, isRunning, stepIdx, currentStep]);

  const handleStepComplete = () => {
    if (currentStep?.type === "work") {
      setEarnedXp((prev) => prev + 15);
    }

    if (stepIdx < steps.length - 1) {
      const nextIdx = stepIdx + 1;
      setStepIdx(nextIdx);
      setTimer(steps[nextIdx].duration);
      haptics.medium();
    } else {
      finishWorkout();
    }
  };

  const finishWorkout = () => {
    setIsDone(true);
    setIsRunning(false);
    haptics.success();
    playBeep(1320, 0.5);

    const elapsedMins = Math.max(1, Math.round((Date.now() - startTime) / 60000));
    addLog({
      n: activeSession.n,
      cat: activeSession.cat,
      min: elapsedMins,
      xp: earnedXp + 50
    });
  };

  if (!activeSession) return null;

  if (isDone) {
    return (
      <div className="ov show" style={{ zIndex: 1100 }}>
        <div className="sheet" style={{ maxWidth: "460px", textAlign: "center", padding: "32px 24px" }}>
          <div style={{ fontSize: "56px", marginBottom: "12px" }}>🎉</div>
          <span className="cali-acc" style={{ fontSize: "11px", letterSpacing: "0.2em" }}>SESSION CONQUERED</span>
          <h2 style={{ fontSize: "26px", margin: "6px 0 12px", fontWeight: "900" }}>{activeSession.n}</h2>
          <p className="mut sm" style={{ marginBottom: "22px" }}>
            Incredible effort! Your session stats and streak have been synced to the cloud.
          </p>

          <div className="grid g3" style={{ marginBottom: "24px" }}>
            <div className="card" style={{ padding: "14px" }}>
              <span className="mut sm" style={{ fontSize: "11px" }}>TIME</span>
              <b style={{ display: "block", fontSize: "18px", color: "var(--acc)", marginTop: "4px" }}>
                {Math.max(1, Math.round((Date.now() - startTime) / 60000))}m
              </b>
            </div>
            <div className="card" style={{ padding: "14px" }}>
              <span className="mut sm" style={{ fontSize: "11px" }}>ENERGY</span>
              <b style={{ display: "block", fontSize: "18px", color: "var(--ok)", marginTop: "4px" }}>
                +{earnedXp + 50} XP
              </b>
            </div>
            <div className="card" style={{ padding: "14px" }}>
              <span className="mut sm" style={{ fontSize: "11px" }}>STREAK</span>
              <b style={{ display: "block", fontSize: "18px", color: "var(--warn)", marginTop: "4px" }}>
                {getStreak ? getStreak() : 1} 🔥
              </b>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <button
              className="btn"
              style={{ width: "100%", justifyContent: "center", background: "linear-gradient(135deg, #ff70a6 0%, #ff85a1 100%)", color: "#000", fontWeight: "900", padding: "12px" }}
              onClick={() => setShowFlexCard(true)}
            >
              📸 Share Flex Card (Story / WhatsApp)
            </button>
            <button
              className="btn gh"
              style={{ width: "100%", justifyContent: "center" }}
              onClick={() => setActiveSession(null)}
            >
              Back to Dashboard
            </button>
          </div>

          <FlexCardModal
            isOpen={showFlexCard}
            onClose={() => setShowFlexCard(false)}
            data={{
              title: activeSession.n,
              streak: getStreak ? getStreak() : 1,
              mins: Math.max(1, Math.round((Date.now() - startTime) / 60000)),
              xp: earnedXp + 50,
              masteryPct: getSkillsPct ? getSkillsPct() : 30
            }}
          />
        </div>
      </div>
    );
  }

  const isWork = currentStep?.type === "work";
  const isPrep = currentStep?.type === "prep";
  const isRest = currentStep?.type === "rest";

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: "#090b0e",
        display: "flex",
        flexDirection: "column",
        overflowY: "auto"
      }}
    >
      {/* Top Header Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "14px 20px",
          background: "rgba(13, 15, 18, 0.94)",
          borderBottom: "1px solid var(--ln)",
          backdropFilter: "blur(10px)"
        }}
      >
        <div>
          <span className="cali-acc" style={{ fontSize: "10px", letterSpacing: "0.18em" }}>
            FORGE HER · GUIDED RUNNER
          </span>
          <b style={{ display: "block", fontSize: "16px" }}>{activeSession.n}</b>
        </div>
        <button
          className="xbtn"
          onClick={() => setShowQuitConfirm(true)}
          style={{ fontSize: "16px" }}
        >
          ✕
        </button>
      </div>

      {/* Main Player Display */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          maxWidth: "680px",
          width: "100%",
          margin: "0 auto",
          padding: "16px"
        }}
      >
        {/* Video / Visual Demonstration Frame */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "320px",
            borderRadius: "18px",
            overflow: "hidden",
            background: "#000",
            border: "1px solid var(--ln)",
            marginBottom: "16px"
          }}
        >
          <video
            ref={videoRef}
            src={media.video}
            poster={media.img}
            autoPlay
            loop
            muted
            playsInline
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />

          {/* Phase Badge */}
          <div style={{ position: "absolute", top: "12px", left: "12px", right: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span
              style={{
                background: isWork ? "var(--acc)" : isRest ? "var(--ok)" : "var(--warn)",
                color: "#000",
                padding: "4px 12px",
                borderRadius: "99px",
                fontSize: "11px",
                fontWeight: "900",
                letterSpacing: "0.06em"
              }}
            >
              {isPrep ? "🟡 GET READY" : isWork ? "🌸 SCULPT & PERFORM" : "🟢 REST & RECOVER"}
            </span>

            <div style={{ display: "flex", gap: "6px" }}>
              <button
                onClick={() => setShowPhotoModal(true)}
                className="btn sm gh"
                style={{ fontSize: "10px", padding: "3px 8px", background: "rgba(0,0,0,0.6)" }}
              >
                📷 Form Photo
              </button>
              <button
                onClick={() => setVideoSlowMo(!videoSlowMo)}
                className="btn sm gh"
                style={{ fontSize: "10px", padding: "3px 8px", background: "rgba(0,0,0,0.6)" }}
              >
                {videoSlowMo ? "⚡ 1.0x" : "🐢 0.5x"}
              </button>
            </div>
          </div>
        </div>

        {/* Static Reference Photo Modal */}
        {showPhotoModal && (
          <div className="ov show" onClick={() => setShowPhotoModal(false)} style={{ zIndex: 1300 }}>
            <div className="sheet" style={{ maxWidth: "560px", background: "#0d0f12", border: "1.5px solid var(--acc)", borderRadius: "18px", padding: "18px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                <div>
                  <span className="cali-acc" style={{ fontSize: "10px" }}>BIOMECHANICAL REFERENCE</span>
                  <h4 style={{ margin: "2px 0 0", fontSize: "17px" }}>{currentEx.n}</h4>
                </div>
                <button className="xbtn" onClick={() => setShowPhotoModal(false)}>✕</button>
              </div>
              <img
                src={media.img}
                alt={currentEx.n}
                style={{ width: "100%", height: "280px", objectFit: "cover", borderRadius: "12px", border: "1px solid var(--ln)", display: "block" }}
              />
              <p className="mut sm" style={{ marginTop: "10px", fontSize: "12px" }}>
                🎯 <b>Target:</b> {currentEx.ms || "Optimal execution posture"}
              </p>
            </div>
          </div>
        )}

        {/* Current Movement Header & Info */}
        <div
          style={{
            background: "rgba(20, 24, 30, 0.8)",
            border: "1px solid var(--ln)",
            borderRadius: "16px",
            padding: "16px 20px",
            marginBottom: "16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <div>
            <span className="mut sm" style={{ fontSize: "11px" }}>
              SET {currentStep?.setNum} OF {currentStep?.totalSets}
            </span>
            <h3 style={{ fontSize: "20px", margin: "2px 0 4px", fontWeight: "900" }}>{currentEx.n}</h3>
            <span className="mut sm" style={{ fontSize: "12px" }}>{currentEx.ms}</span>
          </div>

          <div style={{ textAlign: "right" }}>
            <b style={{ fontSize: "28px", color: isWork ? "var(--acc)" : "var(--ok)", fontFamily: "Archivo" }}>
              {timer}s
            </b>
            <span className="mut sm" style={{ display: "block", fontSize: "11px" }}>
              {currentStep?.label}
            </span>
          </div>
        </div>

        {/* Biomechanical Cues */}
        {currentEx.cu && currentEx.cu.length > 0 && (
          <div
            style={{
              background: "rgba(255, 112, 166, 0.05)",
              border: "1px solid rgba(255, 112, 166, 0.2)",
              borderRadius: "14px",
              padding: "12px 16px",
              marginBottom: "16px"
            }}
          >
            <b style={{ color: "var(--acc)", fontSize: "12px", display: "block", marginBottom: "6px" }}>
              💡 COACH FORM CUES:
            </b>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "4px", fontSize: "12px", color: "var(--tx)" }}>
              {currentEx.cu.map((c, idx) => (
                <li key={idx} style={{ display: "flex", gap: "6px" }}>
                  <span style={{ color: "var(--acc)" }}>✓</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Controls Bar */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr 1fr", gap: "10px", marginTop: "auto" }}>
          <button
            className="btn gh"
            onClick={() => {
              if (stepIdx > 0) {
                const prevIdx = stepIdx - 1;
                setStepIdx(prevIdx);
                setTimer(steps[prevIdx].duration);
                haptics.light();
              }
            }}
            disabled={stepIdx === 0}
            style={{ justifyContent: "center" }}
          >
            ⏮ Prev
          </button>

          <button
            className="btn"
            style={{ justifyContent: "center", background: isRunning ? "var(--p2)" : "linear-gradient(135deg, #ff70a6 0%, #ff85a1 100%)", color: isRunning ? "var(--tx)" : "#000", fontWeight: "900", border: isRunning ? "1px solid var(--ln)" : "none" }}
            onClick={() => {
              setIsRunning(!isRunning);
              haptics.light();
            }}
          >
            {isRunning ? "⏸ Pause" : "▶ Resume"}
          </button>

          <button
            className="btn gh"
            onClick={handleStepComplete}
            style={{ justifyContent: "center", borderColor: "var(--acc)", color: "var(--acc)" }}
          >
            Skip ⏭
          </button>
        </div>
      </div>

      {/* Quit Confirm Modal */}
      {showQuitConfirm && (
        <div className="ov show" style={{ zIndex: 1200 }} onClick={() => setShowQuitConfirm(false)}>
          <div className="sheet" style={{ maxWidth: "380px", textAlign: "center" }}>
            <h3 style={{ fontSize: "20px" }}>Quit Training Session?</h3>
            <p className="mut sm" style={{ margin: "8px 0 20px" }}>
              Are you sure you want to end this session early? Unfinished sets will not be logged.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              <button className="btn gh" onClick={() => setShowQuitConfirm(false)}>
                Stay & Sculpt
              </button>
              <button
                className="btn"
                style={{ background: "#ff4d4d" }}
                onClick={() => {
                  setShowQuitConfirm(false);
                  setActiveSession(null);
                }}
              >
                Quit Session
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
