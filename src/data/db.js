export const CATS = {
  tummy: { n: 'Snatched Waist & Core', c: '#ff70a6' },
  booty: { n: 'Hourglass Glutes & Hips', c: '#ff85a1' },
  posture: { n: 'Posture & Back Align', c: '#ffd166' },
  bust: { n: 'Bustline Lift & Upper', c: '#f39c12' },
  mobility: { n: 'Mobility & Pelvic Flow', c: '#3ed598' },
  hiit: { n: 'Metabolic Fat Burn', c: '#ff3d68' }
};

export const EXDB = [
  // --- 1. Snatched Waist & Flat Tummy ---
  {
    id: 'vacuum',
    n: 'Stomach Vacuum (TVA Draw-In)',
    cat: 'tummy',
    lv: 1,
    ms: 'Transverse Abdominis (Internal Corset)',
    eq: 'None',
    d: 'The #1 waist-slimming exercise. Pulls the entire abdominal wall inward toward the spine, tightening your natural internal corset.',
    cu: [
      'Exhale all air out of your lungs completely',
      'Suck your belly button in and up under your ribcage',
      'Hold the vacuum while taking shallow, controlled sips of air'
    ],
    bd: ['Inhaling deep into the belly', 'Arching lower back'],
    reg: 'Supine Vacuum (Lying on back)',
    prog: 'Standing / Quadruped Vacuum'
  },
  {
    id: 'deadbug',
    n: 'Dead Bug Anti-Extension',
    cat: 'tummy',
    lv: 1,
    ms: 'Deep Core · Pelvic Floor',
    eq: 'None',
    d: 'Prevents lower belly pooch by locking the ribcage down and firing deep stabilizers without stressing the neck or spine.',
    cu: [
      'Glue your lower back into the mat with zero arch',
      'Extend opposite arm and leg slowly',
      'Exhale as limbs extend; inhale as they return'
    ],
    bd: ['Lower back lifting off floor', 'Rushing reps with momentum'],
    reg: 'Bent-Knee Tap',
    prog: 'Straight-Leg Dead Bug with Hold'
  },
  {
    id: 'hipdip',
    n: 'Plank Hip Dips',
    cat: 'tummy',
    lv: 2,
    ms: 'Obliques · Transverse Abdominis',
    eq: 'None',
    d: 'Rotational oblique toning that cinches the waistline from the sides without adding bulky muscle mass.',
    cu: [
      'Start in a solid forearm plank',
      'Rotate hips slowly to tap floor on one side',
      'Contract obliques to pull hips back over center before switching'
    ],
    bd: ['Dropping hips into lumbar sag', 'Moving too fast'],
    reg: 'Knee Plank Hip Swivels',
    prog: 'Plank Hip Dips with 2s Pause'
  },
  {
    id: 'flutter',
    n: 'Hollow Flutter Kicks',
    cat: 'tummy',
    lv: 2,
    ms: 'Lower Abs · Hip Flexors',
    eq: 'None',
    d: 'Firms and flattens the lower abdomen through continuous anti-extension tension.',
    cu: [
      'Press lower back into mat, lift shoulders slightly',
      'Keep legs straight, point toes',
      'Flutter in small, rapid 6-inch scissor kicks'
    ],
    bd: ['Hands under hips causing arch', 'Bending knees'],
    reg: 'High Flutter Kicks (Legs at 45°)',
    prog: 'Low-Hover Hollow Flutters (6 inches off floor)'
  },
  {
    id: 'situp',
    n: 'Butterfly Sit-Up',
    cat: 'tummy',
    lv: 1,
    ms: 'Rectus Abdominis · Full Core',
    eq: 'None',
    d: 'Soles of feet together removes hip flexor dominance, focusing 100% of the flexion on the abdominal wall.',
    cu: [
      'Soles touching in butterfly position, knees open wide',
      'Touch floor behind head, curl spine vertebra by vertebra',
      'Touch your toes at the top with a complete exhale'
    ],
    bd: ['Yanking neck with hands', 'Bouncing off the floor'],
    reg: 'Butterfly Crunch',
    prog: 'Weighted Butterfly Sit-Up'
  },
  {
    id: 'birddog',
    n: 'Bird-Dog Core Stabilizer',
    cat: 'tummy',
    lv: 1,
    ms: 'Deep Core · Glute Medius · Spinal Erectors',
    eq: 'None',
    d: 'Balances cross-body neuromuscular control, tightening the lower abdomen and aligning pelvic tilt.',
    cu: [
      'Hands under shoulders, knees under hips',
      'Reach opposite arm forward and leg straight back',
      'Squeeze glute at top and hold for 2 seconds with a flat back'
    ],
    bd: ['Twisting hips open to the side', 'Arching lower back'],
    reg: 'Single-Limb Extension',
    prog: 'Bird-Dog with Elbow-to-Knee Crunch'
  },
  {
    id: 'russiantwist',
    n: 'Russian Twist (Controlled Tempo)',
    cat: 'tummy',
    lv: 2,
    ms: 'Obliques · Deep Rotators',
    eq: 'None',
    d: 'Sculpts the lateral abdomen and waist curves with isometric balance.',
    cu: [
      'Sit tall with chest proud, lean back 45 degrees',
      'Rotate shoulders fully from side to side',
      'Follow your hands with your eyes to ensure full torso rotation'
    ],
    bd: ['Moving only arms without torso turn', 'Slouching spine'],
    reg: 'Feet-on-Floor Russian Twist',
    prog: 'Feet-Elevated Russian Twist with 1s Pause'
  },
  {
    id: 'plank',
    n: 'Forearm Hollow Plank',
    cat: 'tummy',
    lv: 1,
    ms: 'Full Core · Transverse Abdominis',
    eq: 'None',
    d: 'The foundational brace. Squeeze glutes and abs simultaneously to draw the lower belly flat.',
    cu: [
      'Elbows directly under shoulders',
      'Tuck pelvis into posterior pelvic tilt (no lower back dip)',
      'Squeeze thighs and glutes hard'
    ],
    bd: ['Sagging hips', 'Piking hips in the air'],
    reg: 'Knee Plank',
    prog: 'Long-Lever Forearm Plank'
  },
  {
    id: 'sidep',
    n: 'Side Plank Waist Taper',
    cat: 'tummy',
    lv: 1,
    ms: 'Obliques · Quadratus Lumborum',
    eq: 'None',
    d: 'Anti-lateral flexion hold that creates a firm, resilient side waistline.',
    cu: [
      'Elbow directly under shoulder, body straight as a board',
      'Push bottom hip up toward ceiling',
      'Stack feet or stagger for balance'
    ],
    bd: ['Bottom hip dropping toward floor', 'Torso rotating forward'],
    reg: 'Knee Side Plank',
    prog: 'Side Plank with Hip Pulses'
  },

  // --- 2. Hourglass Glutes & Hips ---
  {
    id: 'glutebridge',
    n: 'Glute Bridge & Single-Leg Thrust',
    cat: 'booty',
    lv: 1,
    ms: 'Gluteus Maximus · Pelvic Stability',
    eq: 'None',
    d: 'The gold standard for isolated glute development. Eliminates quad dominance and lifts the lower glute crease.',
    cu: [
      'Feet flat shoulder-width, drive through your heels',
      'Squeeze glutes at the top until hips form straight line with knees',
      'Pause for 2 full seconds at peak contraction'
    ],
    bd: ['Hyper-extending lower back', 'Pushing through toes'],
    reg: 'Standard Two-Leg Bridge',
    prog: 'Single-Leg Glute Bridge'
  },
  {
    id: 'donkey',
    n: 'Donkey Kick (Glute Kickback)',
    cat: 'booty',
    lv: 1,
    ms: 'Upper Gluteus Maximus',
    eq: 'None',
    d: 'Isolates the upper fibers of the glute for vertical shape, fullness, and projection.',
    cu: [
      'Start on hands and knees, keep core braced',
      'Kick heel toward ceiling with knee bent at 90 degrees',
      'Squeeze glute at top without arching lower back'
    ],
    bd: ['Swinging leg with momentum', 'Tilting pelvis open'],
    reg: 'Straight-Leg Kickback',
    prog: 'Donkey Kick with 3 Pulses at Top'
  },
  {
    id: 'hydrant',
    n: 'Fire Hydrant (Side Hip Lift)',
    cat: 'booty',
    lv: 1,
    ms: 'Gluteus Medius & Minimus (Side Glute Shelf)',
    eq: 'None',
    d: 'Direct hip abduction targeting the gluteus medius for side hip curve and filling out hip dips.',
    cu: [
      'Maintain stable quadruped position with zero weight shift',
      'Lift knee out to the side like a dog at a hydrant',
      'Pause 1 second at top of range of motion'
    ],
    bd: ['Leaning whole body to opposite side', 'Flaring ribs'],
    reg: 'Small Range Hydrant Lift',
    prog: 'Fire Hydrant + Kickback Combo'
  },
  {
    id: 'clamshell',
    n: 'Side-Lying Clamshell',
    cat: 'booty',
    lv: 1,
    ms: 'Gluteus Medius · Hip Rotators',
    eq: 'None',
    d: 'Strengthens external rotators and shapes the side hip shelf without stressing knees.',
    cu: [
      'Lie on side, knees bent 90°, heels glued together',
      'Open top knee toward ceiling while keeping heels touching',
      'Keep pelvis tilted slightly forward to avoid rolling back'
    ],
    bd: ['Rolling hip backwards', 'Lifting feet off floor'],
    reg: 'Standard Clamshell',
    prog: 'Elevated-Feet Clamshell Pulse'
  },
  {
    id: 'curtsy',
    n: 'Curtsy Lunge (Outer Hip Sculpt)',
    cat: 'booty',
    lv: 2,
    ms: 'Gluteus Medius · Quads · Outer Hip',
    eq: 'None',
    d: 'Cross-behind angle creates a deep stretch on the outer glute, sculpting the hourglass silhouette.',
    cu: [
      'Step one foot diagonally back behind opposite leg',
      'Lower hips until front thigh is parallel to floor',
      'Push through front heel to return to standing'
    ],
    bd: ['Front knee collapsing inward', 'Twisting torso'],
    reg: 'Reverse Lunge',
    prog: 'Curtsy Lunge with 2s Pause'
  },
  {
    id: 'frogpump',
    n: 'Frog Pump Glute Burnout',
    cat: 'booty',
    lv: 1,
    ms: 'Gluteus Maximus · Abductors',
    eq: 'None',
    d: 'Soles pressed together forces external hip rotation, guaranteeing pure glute burn with zero hamstring takeover.',
    cu: [
      'Lie on back, soles of feet together, knees dropped open wide',
      'Bridge hips toward ceiling by driving outside of feet down',
      'Squeeze glutes at peak for a 1-second contraction'
    ],
    bd: ['Lifting head off mat', 'Short half reps'],
    reg: 'Wide Glute Bridge',
    prog: 'Frog Pump with 3s Isometric Squeeze'
  },
  {
    id: 'bulg',
    n: 'Glute-Biased Bulgarian Split Squat',
    cat: 'booty',
    lv: 2,
    ms: 'Glutes · Quads · Hamstrings',
    eq: 'Bench / Couch',
    d: 'Rear-foot elevated single-leg squat. A slight forward torso lean shifts 80% of the load directly into the glute.',
    cu: [
      'Lean torso 20° forward over front thigh to bias glutes',
      'Lower until back knee almost grazes the floor',
      'Drive through front heel to return to top'
    ],
    bd: ['Upright torso shifting load to quads', 'Front heel lifting'],
    reg: 'Standard Split Squat (Both feet on floor)',
    prog: 'Slow-Tempo Glute Bulgarian (3s descent)'
  },
  {
    id: 'squat',
    n: 'Sumo Pulse Squat',
    cat: 'booty',
    lv: 1,
    ms: 'Glutes · Inner Thighs (Adductors)',
    eq: 'None',
    d: 'Wide-stance squat with bottom pulses. Targets inner thighs and glutes for firm lower-body toning.',
    cu: [
      'Stance 1.5x shoulder width, toes flared 45° out',
      'Sit deep between hips, keeping knees tracking over toes',
      'Pulse 2 inches up and down at the bottom before standing'
    ],
    bd: ['Knees caving inward', 'Rounding upper back'],
    reg: 'Bodyweight Squat',
    prog: 'Sumo Squat with 3 Bottom Pulses'
  },
  {
    id: 'calf',
    n: 'Calf & Ankle Toning Rise',
    cat: 'booty',
    lv: 1,
    ms: 'Calves · Ankle Line',
    eq: 'None',
    d: 'Elevates ankle definition and tones the lower leg line for posture and walking grace.',
    cu: [
      'Stand tall, feet hip-width',
      'Rise onto the balls of your feet with high ankle extension',
      'Pause 1 second at top, lower with 2-second control'
    ],
    bd: ['Bouncing rapidly', 'Rolling onto outer edges of feet'],
    reg: 'Two-Leg Wall Assisted Calf Rise',
    prog: 'Single-Leg Calf Rise'
  },

  // --- 3. Bustline Lift & Upper Toning ---
  {
    id: 'chestprayer',
    n: 'Isometric Prayer Press (Bustline Lift)',
    cat: 'bust',
    lv: 1,
    ms: 'Pectoralis Major · Décolletage Shelf',
    eq: 'None',
    d: 'Tones and firms the upper pectoral muscle base beneath breast tissue to create natural lift and support.',
    cu: [
      'Press palms firmly together in front of sternum, elbows flared wide',
      'Push hands together as hard as possible for 10–15 seconds',
      'Feel the deep contraction across your upper chest and collarbone'
    ],
    bd: ['Dropping elbows', 'Shrugging shoulders into ears'],
    reg: 'Light Palm Press',
    prog: 'Prayer Press Pulse with Slow Arm Raise'
  },
  {
    id: 'inclinepush',
    n: 'Incline Bench / Wall Push-Up',
    cat: 'bust',
    lv: 1,
    ms: 'Upper Chest · Triceps · Core',
    eq: 'Bench / Sturdy Table / Wall',
    d: 'Accessible pressing angle that targets the clavicular upper chest, firming the chest without wrist strain.',
    cu: [
      'Hands placed slightly wider than shoulder width on incline surface',
      'Keep body rigid in an unbroken plank line',
      'Lower chest to edge with elbows at 45°, push up to lockout'
    ],
    bd: ['Sagging lower back', 'Flaring elbows 90 degrees'],
    reg: 'Wall Push-Up',
    prog: 'Standard Floor Push-Up'
  },
  {
    id: 'flye',
    n: 'Floor Slider Chest Flye',
    cat: 'bust',
    lv: 2,
    ms: 'Pectoralis Major · Sternum Line',
    eq: 'Towel / Socks on smooth floor',
    d: 'Deep eccentric chest stretch and contraction that tones the inner chest and cleavage line.',
    cu: [
      'Kneeling position on mat with hands on towels or sliders',
      'Slide hands out wide as chest lowers toward floor',
      'Squeeze chest muscles hard to slide hands back together'
    ],
    bd: ['Collapsing to floor', 'Bending elbows excessively'],
    reg: 'Single-Arm Slider Flye',
    prog: 'Full Range Slider Flye'
  },

  // --- 4. Posture Perfection & Back Straightening ---
  {
    id: 'cobra',
    n: 'Prone Cobra (Anti-Hunch Posture)',
    cat: 'posture',
    lv: 1,
    ms: 'Rhomboids · Lower Traps · Erector Spinae',
    eq: 'None',
    d: 'Directly reverses desk hunch, forward head posture, and rounded shoulders by firing the mid-back stabilizers.',
    cu: [
      'Lie facedown on mat, arms along your sides',
      'Rotate thumbs toward ceiling, lift chest and shoulders off floor',
      'Squeeze shoulder blades together and tuck chin gently'
    ],
    bd: ['Craning neck backward', 'Holding breath'],
    reg: 'Chest Lift Only',
    prog: 'Prone Cobra 30s Hold with Squeeze'
  },
  {
    id: 'wallslide',
    n: 'Scapular Wall Slide',
    cat: 'posture',
    lv: 1,
    ms: 'Serratus Anterior · Thoracic Spine · Traps',
    eq: 'Wall',
    d: 'Restores thoracic spine extension and shoulder mobility, creating an upright, poised, and elegant stance.',
    cu: [
      'Stand with back, head, and glutes against a flat wall',
      'Place arms in "W" shape against wall',
      'Slide arms slowly up into "Y" position without lower back arching'
    ],
    bd: ['Elbows peeling off wall', 'Lower back pulling away from wall'],
    reg: 'Seated Wall Slide',
    prog: 'Wall Slide with 3s Overhead Lock'
  },
  {
    id: 'superman',
    n: 'Superman Posterior Hold',
    cat: 'posture',
    lv: 2,
    ms: 'Full Posterior Chain · Glutes · Upper Back',
    eq: 'None',
    d: 'Tones the entire posterior chain from shoulders down to calves, reinforcing upright spinal alignment.',
    cu: [
      'Lie facedown, arms extended overhead',
      'Simultaneously lift arms, chest, and thighs off the floor',
      'Hold the arched extension smoothly while breathing calmly'
    ],
    bd: ['Jerking up with momentum', 'Bending knees'],
    reg: 'Alternating Superman (Opposite arm/leg)',
    prog: 'Superman Hold with 5s Squeeze'
  },
  {
    id: 'dog',
    n: 'Down-Dog to Cobra Flow',
    cat: 'mobility',
    lv: 1,
    ms: 'Spine · Hamstrings · Shoulders · Hip Flexors',
    eq: 'None',
    d: 'Elongates the spine, opens tight hips, and decompresses the lower back for graceful movement.',
    cu: [
      'Push hips high in Downward Dog, press heels toward floor',
      'Glide chest forward between hands into Upward Dog / Cobra',
      'Open collarbones and roll shoulders away from ears'
    ],
    bd: ['Crunching into lower back in Cobra', 'Shrugging shoulders'],
    reg: 'Gentle Baby Cobra',
    prog: 'Continuous Slow Flow with 3s Pause'
  }
];

export const WORKOUTS = [
  {
    id: 'w1',
    n: 'Corset Core & Flat Stomach',
    cat: 'tummy',
    lv: 1,
    mins: 18,
    tag: 'Deep Core · TVA · Waist Cinch',
    ex: [
      { x: 'vacuum', s: 4, sec: 20, rest: 30 },
      { x: 'deadbug', s: 3, r: '12 / side', rest: 45 },
      { x: 'situp', s: 3, r: '12', rest: 45 },
      { x: 'hipdip', s: 3, r: '10 / side', rest: 45 },
      { x: 'flutter', s: 3, sec: 30, rest: 30 }
    ]
  },
  {
    id: 'w2',
    n: 'Hourglass Glute & Hip Sculpt',
    cat: 'booty',
    lv: 2,
    mins: 22,
    tag: 'Glute Shelf · Side Hips · Lift',
    ex: [
      { x: 'glutebridge', s: 4, r: '15', rest: 45 },
      { x: 'hydrant', s: 3, r: '15 / side', rest: 40 },
      { x: 'donkey', s: 3, r: '15 / side', rest: 40 },
      { x: 'curtsy', s: 3, r: '10 / side', rest: 60 },
      { x: 'frogpump', s: 3, r: '25', rest: 30 }
    ]
  },
  {
    id: 'w3',
    n: 'Posture Perfection & Anti-Hunch',
    cat: 'posture',
    lv: 1,
    mins: 15,
    tag: 'Spine Alignment · Open Chest',
    ex: [
      { x: 'wallslide', s: 3, r: '10', rest: 30 },
      { x: 'cobra', s: 4, sec: 25, rest: 30 },
      { x: 'birddog', s: 3, r: '8 / side', rest: 40 },
      { x: 'superman', s: 3, sec: 20, rest: 30 },
      { x: 'dog', s: 2, sec: 45, rest: 20 }
    ]
  },
  {
    id: 'w4',
    n: 'Décolletage & Bustline Lift',
    cat: 'bust',
    lv: 2,
    mins: 16,
    tag: 'Upper Pectorals · Firming',
    ex: [
      { x: 'chestprayer', s: 4, sec: 15, rest: 30 },
      { x: 'inclinepush', s: 3, r: '10', rest: 60 },
      { x: 'flye', s: 3, r: '8', rest: 60 },
      { x: 'wallslide', s: 3, r: '10', rest: 30 }
    ]
  },
  {
    id: 'w5',
    n: 'The 30-Min Ultimate Silhouette',
    cat: 'booty',
    lv: 3,
    mins: 30,
    tag: 'Full Feminine Recomp · Glutes & Waist',
    ex: [
      { x: 'vacuum', s: 3, sec: 25, rest: 30 },
      { x: 'bulg', s: 3, r: '10 / side', rest: 60 },
      { x: 'hipdip', s: 3, r: '12 / side', rest: 45 },
      { x: 'hydrant', s: 3, r: '15 / side', rest: 40 },
      { x: 'cobra', s: 3, sec: 30, rest: 30 },
      { x: 'frogpump', s: 3, r: '30', rest: 30 }
    ]
  },
  {
    id: 'w6',
    n: 'Lean Metabolic Tone',
    cat: 'hiit',
    lv: 2,
    mins: 15,
    tag: 'Fat Burn · Lean Toning · Zero Bulk',
    ex: [
      { x: 'squat', s: 3, r: '20', rest: 30 },
      { x: 'flutter', s: 3, sec: 30, rest: 30 },
      { x: 'curtsy', s: 3, r: '10 / side', rest: 45 },
      { x: 'calf', s: 3, r: '20', rest: 30 }
    ]
  }
];

export const PROGRAMS = [
  {
    id: 'p1',
    n: 'Snatched & Sculpted 30',
    cat: 'tummy',
    lv: 1,
    wks: '4 weeks',
    focus: 'Cinch the waistline with TVA vacuums while building clean glute shape and upright posture.',
    days: [
      ['Mon', 'w1'],
      ['Tue', 'w2'],
      ['Wed', 'rest'],
      ['Thu', 'w3'],
      ['Fri', 'w1'],
      ['Sat', 'w2'],
      ['Sun', 'rest']
    ],
    tip: 'Practice your stomach vacuum first thing in the morning on an empty stomach for maximum TVA engagement!'
  },
  {
    id: 'p2',
    n: 'Hourglass Booty & Posture',
    cat: 'booty',
    lv: 2,
    wks: '6 weeks',
    focus: 'Targeted gluteus medius & maximus volume paired with spine alignment for an hourglass silhouette.',
    days: [
      ['Mon', 'w2'],
      ['Tue', 'w3'],
      ['Wed', 'w1'],
      ['Thu', 'rest'],
      ['Fri', 'w2'],
      ['Sat', 'w4'],
      ['Sun', 'rest']
    ],
    tip: 'On every glute bridge rep, pause at the top for 2 full seconds and consciously squeeze your glutes.'
  },
  {
    id: 'p3',
    n: 'Total Body Goddess Recomp',
    cat: 'bust',
    lv: 2,
    wks: '6 weeks',
    focus: 'Complete body balance: snatched waist, lifted bustline, defined glutes, and slender toned posture.',
    days: [
      ['Mon', 'w5'],
      ['Tue', 'w3'],
      ['Wed', 'w6'],
      ['Thu', 'rest'],
      ['Fri', 'w5'],
      ['Sat', 'w4'],
      ['Sun', 'rest']
    ],
    tip: 'Consistency beats intensity. 20 focused minutes 4 times a week delivers permanent body recomposition.'
  }
];

export const SKILLS = [
  {
    id: 'vacuum',
    icon: '⏳',
    n: 'Stomach Vacuum & Corset Waist',
    lv: [
      ['Supine Vacuum · 15s', 'Lying on your back, exhale and draw navel to spine'],
      ['Supine Vacuum · 30s', 'Sustained deep transverse abdominis contraction'],
      ['Quadruped Vacuum · 20s', 'On hands and knees, fighting gravity upward'],
      ['Seated Vacuum · 25s', 'Upright posture in a chair, ribcage locked'],
      ['Standing Vacuum · 30s', 'Full standing hollow draw-in'],
      ['Standing Vacuum · 45s', 'Master-level internal corset control']
    ]
  },
  {
    id: 'glutebridge',
    icon: '🍑',
    n: 'Glute Bridge to Single-Leg Thrust',
    lv: [
      ['Glute Bridge · 2×15', 'Full heel drive, 1s top squeeze'],
      ['Glute Bridge Hold · 45s', 'Isometric gluteus maximus lock'],
      ['Frog Pumps · 3×20', 'Soles together, high-frequency contraction'],
      ['Assisted Single-Leg Bridge · 3×8', 'One leg raised, light toe assist'],
      ['Strict Single-Leg Bridge · 3×10', 'Zero hip tilting, pure glute drive'],
      ['Single-Leg Thrust · 3×15 / side', 'Full range of motion and 2s peak pause']
    ]
  },
  {
    id: 'hydrant',
    icon: '🌸',
    n: 'Fire Hydrant to Side Hip Sculpt',
    lv: [
      ['Fire Hydrant · 3×12 / side', 'Stable hips, knee lifts to 45°'],
      ['Fire Hydrant with 1s Pause · 3×15', 'Controlled isometric glute medius squeeze'],
      ['Clamshell Pulses · 3×20 / side', 'Continuous outer hip burn'],
      ['Hydrant + Kickback Combo · 3×10', 'Side lift directly into straight-leg kick'],
      ['Curtsy Lunge · 3×12 / side', 'Deep outer hip stretch and power return'],
      ['Standing Hip Abduction Pulses · 3×25', 'Maximal side glute shelf tone']
    ]
  },
  {
    id: 'posture',
    icon: '🦢',
    n: 'Anti-Hunch Posture & Spine Alignment',
    lv: [
      ['Prone Cobra · 20s Hold', 'Thumbs to ceiling, chest lifted'],
      ['Scapular Wall Slides · 3×10', 'Arms flush against wall without lumbar arch'],
      ['Bird-Dog · 3×10 / side', '2s hold at full extension'],
      ['Superman Hold · 30s', 'Arch and hold with calm breathing'],
      ['Prone Cobra · 45s Hold', 'Lower traps and rhomboids fully active'],
      ['Perfect Poise & Wall Lock · 60s', 'Flawless thoracic spine posture']
    ]
  }
];

export const TESTS = [
  { id: 'vacuum', n: 'Max Stomach Vacuum', u: 'sec' },
  { id: 'glute', n: 'Max Single-Leg Glute Bridge', u: 'reps' },
  { id: 'plank', n: 'Max Forearm Plank', u: 'sec' },
  { id: 'hipdip', n: 'Max Plank Hip Dips', u: 'reps' }
];

export const W = (id) => WORKOUTS.find((w) => w.id === id);
export const EX = (id) => EXDB.find((e) => e.id === id);
