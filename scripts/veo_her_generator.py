#!/usr/bin/env python3
"""
FORGE HER - Google DeepMind Veo Video Generator Pipeline
Generates cinematic, photorealistic 60fps exercise demonstration videos using Google Veo (veo-2.0-generate-001)
specifically tailored for female athletic biomechanics, aesthetic dark studio lighting, rose gold activewear,
and strict form execution.
"""

import os
import sys
import time
import argparse

# Engineered Veo prompts for feminine calisthenics & aesthetic biomechanics
HER_VEO_PROMPTS = {
    # 1. Snatched Waist & TVA Core
    "vacuum": (
        "Cinematic photorealistic 4K 60fps slow-motion video of an athletic female fitness athlete in a modern dark studio gym "
        "wearing rose-gold and charcoal activewear. Standing upright with hands on hips, performing a strict stomach vacuum "
        "(transverse abdominis draw-in). Torso exhales fully, abdominal wall and navel suck deeply inward and upward under the ribcage, "
        "revealing an ultra-cinched snatched waistline. Controlled diaphragmatic sips of air, maintaining deep isometric corset tension. "
        "Subtle neon pink ambient rim lighting, 8k resolution, crisp anatomical focus."
    ),
    "deadbug": (
        "Cinematic 4K slow-motion training video of an athletic woman performing a strict dead bug anti-extension exercise on a matte black mat. "
        "Lower back completely flush against the floor with zero anterior pelvic tilt. Smooth, alternating extension of opposite arm and opposite leg "
        "hovering inches above the floor, with deep core contraction and controlled exhale. Moody aesthetic studio lighting."
    ),
    "hipdip": (
        "Cinematic slow-motion 4K demonstration of a female athlete performing plank hip dips on a training mat. "
        "Starting in a rigid forearm plank with posterior pelvic tilt, slowly rotating hips side-to-side to tap the floor with precision, "
        "engaging obliques to cinch the waistline without sagging the lumbar spine. High contrast fitness cinematography."
    ),
    "flutter": (
        "Cinematic slow-motion 4K side-angle video of an athletic woman holding a hollow body position on a mat, executing low-amplitude flutter kicks. "
        "Shoulder blades lifted off mat, lower back flat, toes pointed, legs alternating rapid controlled vertical flutters. Golden rose backlight."
    ),

    # 2. Hourglass Glutes & Hips
    "glutebridge": (
        "Cinematic slow-motion 4K fitness video of an athletic woman performing a single-leg elevated glute bridge on a matte floor. "
        "Driving through the heel, hips extend upward into full lockout forming an unbroken diagonal from knee to shoulder, "
        "holding peak 2-second gluteus maximus contraction with level hips. Rose-gold aesthetic gym lighting, 60fps smooth loop."
    ),
    "donkey": (
        "Cinematic 4K slow-motion video of an athletic woman in charcoal activewear performing quadruped donkey kicks on a mat. "
        "Neutral spine, 90-degree knee bend, driving the sole of the foot toward the ceiling with targeted upper glute squeeze, zero lower back arch. "
        "Crisp aesthetic studio lighting."
    ),
    "hydrant": (
        "Cinematic slow-motion side-profile video of an athletic woman performing quadruped fire hydrants. "
        "Torso held rigid and stable, lifting knee laterally to 45 degrees to sculpt the gluteus medius and side hips. "
        "Smooth controlled descent, 60fps sports cinematography."
    ),
    "clamshell": (
        "Cinematic slow-motion 4K video of an athletic woman performing side-lying resistance band clamshells on a mat. "
        "Hips stacked vertically, feet glued together, opening knees against resistance band tension to target outer hips. Modern minimalist gym setting."
    ),
    "curtsy": (
        "Cinematic 4K slow-motion video of a female athlete performing curtsy lunges. "
        "Stepping back diagonally behind the front leg with upright posture, sinking into 90-degree depth to sculpt the outer glutes and thigh contour, "
        "driving through the front heel to stand. Warm ambient lighting."
    ),
    "bulg": (
        "Cinematic 4K slow-motion demonstration of a female athlete executing a glute-biased Bulgarian split squat. "
        "Rear foot elevated on a bench, slight forward torso hip hinge, front knee tracking over toes, sinking to deep 90-degree parallel and driving back up. "
        "Aesthetic dark studio, high muscle definition."
    ),

    # 3. Upper Body & Push-Ups
    "pushup": (
        "Cinematic slow-motion 4K training video of an athletic female calisthenics athlete performing a strict floor push-up. "
        "Hands just outside shoulder width, elbows tracking back at a disciplined 45-degree angle, body held rigid like a plank from heels to crown. "
        "Chest grazes the floor with scapular retraction, then explosively pushes back up to full lockout with scapular protraction. "
        "Moody studio rim lighting with subtle rose gold glow."
    ),
    "kneepush": (
        "Cinematic 4K slow-motion video of a female athlete performing strict knee push-ups on a padded mat. "
        "Straight line from knees through hips to head, elbows tucked at 45 degrees, full chest depth to floor and smooth controlled push-up to lockout."
    ),
    "tricepdip": (
        "Cinematic slow-motion 4K demonstration of an athletic woman performing bench tricep dips. "
        "Hands gripping edge of a bench, legs extended forward, back skimming close to the bench, lowering until elbows hit 90 degrees, "
        "then pressing through palms to full triceps lockout to firm and sculpt the back of the arms. Dark studio lighting."
    ),
    "shouldertap": (
        "Cinematic 4K slow-motion video of a female athlete in a high plank performing anti-rotation shoulder taps. "
        "Feet slightly wide, pelvis locked completely level with zero hip swaying, slowly tapping opposite shoulder with control."
    ),
    "pikepush": (
        "Cinematic 4K slow-motion video of a female athlete performing pike push-ups on a rubber gym floor. "
        "Hips driven high in an inverted V shape, crown of the head descending forward between hands, pressing back through shoulders and upper chest."
    ),
    "doorwayrow": (
        "Cinematic slow-motion video of an athletic woman performing incline bodyweight towel / doorframe rows. "
        "Leaning back at a 45-degree angle with heels planted, pulling chest smoothly to hands with powerful lat and rhomboid retraction to straighten posture."
    ),

    # 4. Bustline Lift & Posture
    "chestprayer": (
        "Cinematic close-up 4K slow motion video of an athletic female performing an isometric prayer press for pectoral bustline firming. "
        "Hands pressed firmly palm-to-palm at chest level with forearms parallel to floor, squeezing chest muscles intensely with controlled breathing. "
        "Studio portrait rim lighting."
    ),
    "cobra": (
        "Cinematic slow-motion 4K video of a female athlete performing a prone cobra anti-hunch posture extension on a mat. "
        "Lying face down, lifting chest and shoulders off mat, rotating thumbs outward toward ceiling, retracting shoulder blades to open chest and align spine."
    ),
    "superman": (
        "Cinematic slow motion 4K video of a female athlete performing a prone superman hold on a training mat. "
        "Simultaneously lifting arms, chest, and thighs off the mat, engaging the entire posterior kinetic chain (glutes, erectors, traps) in an arch. "
        "Aesthetic moody lighting."
    )
}

def generate_with_veo(exercise_id, prompt, output_path):
    api_key = os.environ.get("GEMINI_API_KEY") or os.environ.get("GOOGLE_API_KEY")
    if not api_key:
        print(f"[-] GEMINI_API_KEY / GOOGLE_API_KEY not found in environment.")
        print(f"[*] To generate using Google Veo, export your API key:")
        print(f"    export GEMINI_API_KEY='your-google-api-key'")
        print(f"    python3 scripts/veo_her_generator.py --exercise {exercise_id}")
        return False

    try:
        from google import genai
        from google.genai import types
        
        print(f"[+] Initializing Google GenAI client for Veo (veo-2.0-generate-001)...")
        client = genai.Client(api_key=api_key)
        
        print(f"[+] Dispatching Veo video generation for '{exercise_id}'...")
        print(f"    Prompt: {prompt[:90]}...")
        
        operation = client.models.generate_videos(
            model="veo-2.0-generate-001",
            prompt=prompt,
            config=types.GenerateVideosConfig(
                aspect_ratio="16:9",
                person_generation="allow_adult",
                number_of_videos=1,
                duration_seconds=5
            )
        )
        
        print("[+] Veo task submitted. Polling for completion (typically takes 30-90 seconds)...")
        while not operation.done:
            time.sleep(10)
            operation = client.operations.get(operation)
            print("    Still processing video...")

        generated_video = operation.response.generated_videos[0]
        client.files.download(file=generated_video.video, path=output_path)
        print(f"[✔] Successfully downloaded Veo video to: {output_path}")
        return True

    except ImportError:
        print("[-] 'google-genai' package not installed.")
        print("    Run: pip install google-genai")
        return False
    except Exception as e:
        print(f"[-] Veo Generation error: {e}")
        return False

def main():
    parser = argparse.ArgumentParser(description="FORGE HER Veo Video Generator")
    parser.add_argument("--exercise", type=str, help="Specific exercise ID (e.g. vacuum, glutebridge, pushup, tricepdip, cobra)")
    parser.add_argument("--all", action="store_true", help="Generate all exercises")
    parser.add_argument("--list", action="store_true", help="List all available exercise prompts")
    args = parser.parse_args()

    if args.list:
        print("\nAvailable FORGE HER Video Generation Targets:")
        for k, v in HER_VEO_PROMPTS.items():
            print(f" - {k.ljust(15)} : {v[:70]}...")
        return

    out_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "../public/videos"))
    os.makedirs(out_dir, exist_ok=True)

    if args.exercise:
        if args.exercise not in HER_VEO_PROMPTS:
            print(f"Unknown exercise: {args.exercise}. Available: {list(HER_VEO_PROMPTS.keys())}")
            sys.exit(1)
        targets = [args.exercise]
    elif args.all:
        targets = list(HER_VEO_PROMPTS.keys())
    else:
        print("Specify --exercise <name> or --all or --list. Examples:")
        print("  python3 scripts/veo_her_generator.py --exercise vacuum")
        print("  python3 scripts/veo_her_generator.py --exercise pushup")
        print("  python3 scripts/veo_her_generator.py --list")
        return

    for ex in targets:
        prompt = HER_VEO_PROMPTS[ex]
        out_file = os.path.join(out_dir, f"{ex}.mp4")
        print(f"\n--- Processing: {ex} ---")
        generate_with_veo(ex, prompt, out_file)

if __name__ == "__main__":
    main()
