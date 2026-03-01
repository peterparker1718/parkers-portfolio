/**
 * Java Bridge Coffee — Master Content Architecture
 *
 * Every page follows the cognitive hierarchy:
 *   Layer 1: One-liner hook (emotional authority)
 *   Layer 2: Three-line explanation (strategic clarity)
 *   Layer 3: Visual / structural proof
 *
 * Format: 5.25 × 7.25" with bleed (5 × 7" trim)
 * Aesthetic: Hoffmann++ — dark cloth + kraft paper alternating
 * Typography: Lora Bold (headlines), Crimson Pro (body), Instrument Sans (labels)
 * Palette: dark cloth #342C22, kraft #d4896b, gold #c9a84c, cream #f5f5dc
 */

// ---------------------------------------------------------------------------
// Brand Constants
// ---------------------------------------------------------------------------

export const BRAND = {
  name: "Java Bridge Coffee",
  tagline: "We Are The Source & The Distribution.",
  founder: "Chris Parker",
  cofounder: "Dr. Fika Ayu Safitri",
  location: "Dampit, East Java, Indonesia",
  contact: {
    email: "christopher@parkersportfolio.info",
    website: "javabridgecoffee.com",
  },
} as const;

export const PALETTE = {
  cloth: "#342C22",
  kraft: "#d4896b",
  gold: "#c9a84c",
  cream: "#f5f5dc",
  espresso: "#4a3528",
  terracotta: "#c97d5d",
} as const;

// ---------------------------------------------------------------------------
// Page Content — Each page has hook / body / proof layers
// ---------------------------------------------------------------------------

export interface PageContent {
  id: string;
  title: string;
  hook: string;
  body: string[];
  proof?: string[];
  background: "cloth" | "kraft";
}

export const PAGES: PageContent[] = [
  // PAGE 1 — COVER
  {
    id: "cover",
    title: "JAVA BRIDGE COFFEE",
    hook: "Most Buyers Visit Indonesia. I Married Into It.",
    body: [
      "The first institutional-grade Indonesian specialty coffee infrastructure platform.",
      "We don't contract the farm. We are the family.",
    ],
    background: "cloth",
  },

  // PAGE 2 — THE PROBLEM
  {
    id: "problem",
    title: "THE PROBLEM",
    hook: "The supply chain isn't just broken. It's structurally exposed.",
    body: [
      "Most importers source Indonesian coffee through six to eight intermediaries.",
      "Each one adds cost, introduces defects, and erases traceability.",
      "Then Cyclone Senyar hit Sumatra — and every rented relationship was exposed.",
    ],
    proof: [
      "Sumatra: 18% defect rate — 6–8 middlemen — $0.85 margin — Cyclone-exposed",
      "East Java: 2% defect rate — 0 middlemen — $3.80 margin — Protected",
    ],
    background: "kraft",
  },

  // PAGE 3 — THE BRIDGE
  {
    id: "bridge",
    title: "THE BRIDGE",
    hook: "We built the bridge that turns origin into permanent infrastructure.",
    body: [
      "Java Bridge is a sourcing infrastructure platform — the first of its kind in Indonesian specialty coffee.",
      "East Java holds unmatched genetic, geographic, and terroir advantages.",
      "We unlocked them scientifically and structurally.",
    ],
    proof: [
      "The Roots — Permanent residence, spousal visa, Bahasa fluency, 30-year family network",
      "The Science — PhD genetic selection: +22% yield, -40% input cost, 2% defect rate",
      "The Market — Enterprise sales, AI-augmented supply chain, institutional execution",
    ],
    background: "cloth",
  },

  // PAGE 4 — MY STORY: THE MEETING
  {
    id: "story-meeting",
    title: "MY STORY",
    hook: "I didn't enter the Indonesian coffee market. I married into it.",
    body: [
      "I was born in New Jersey — raised to believe opportunity follows effort.",
      "Indonesia taught me something different: opportunity follows trust.",
      "That wasn't a sourcing decision. It was a life decision that solved what most buyers spend years chasing.",
    ],
    proof: [
      "New Jersey → Indonesia → East Java",
      "Introduction → Connection → Family",
    ],
    background: "kraft",
  },

  // PAGE 5 — MY STORY: THE COMMITMENT
  {
    id: "story-commitment",
    title: "MY STORY",
    hook: "I did not arrive as a buyer. I arrived as family.",
    body: [
      "I learned the language. I stayed. I earned trust.",
      "Marriage created residency. Residency created trust. Trust created access.",
      "Most people visit origin. We live there. You can negotiate price — but you can't replicate being family.",
    ],
    proof: [
      "Bilingual fluency → Permanent residency → Family integration",
      "Earned trust → Structural access → Sovereign supply",
    ],
    background: "cloth",
  },

  // PAGE 6 — MY STORY: THE UNION
  {
    id: "story-union",
    title: "MY STORY",
    hook: "Two worlds. One bridge. Built by marriage and science.",
    body: [
      "Dr. Fika Ayu Safitri — PhD agricultural biologist, SCA certified, from Lumajang near Bromo.",
      "She understands soil systems, fermentation science, and sensory calibration at a technical level.",
      "I handle structure, logistics, and relationships. Together we operate across fifty single-origin lots.",
    ],
    proof: [
      "Genetic audits → Farm-level verification → Environmental control",
      "American market intelligence + Indonesian agricultural science",
    ],
    background: "kraft",
  },

  // PAGE 7 — THE VAULT
  {
    id: "vault",
    title: "THE VAULT",
    hook: "Coffee that doesn't exist for your competitors.",
    body: [
      "East Java's private family reserves have never touched the export market.",
      "Hybrid varieties combining disease resistance with cup complexity, grown on volcanic soil.",
      "You are not buying off a spot list — you are acquiring inventory your competitors cannot access.",
    ],
    proof: [
      "Pineapple — Pear — Stevia — Light body — Excellent acidity — Clean finish",
      "QR-linked lot traceability and genetic audit with every bag",
    ],
    background: "cloth",
  },

  // PAGE 8 — THE OFFER
  {
    id: "offer",
    title: "THE OFFER",
    hook: "This is not a catalog. This is a private allocation.",
    body: [
      "Taste the coffee — we ship a complimentary sample of our East Java reserve lot.",
      "Reserve your allocation — sub-ton annual harvest, first committed partners get priority.",
      "Build your story — full traceability, genetic profile, and provenance with every bag.",
    ],
    proof: [
      "Direct pricing: no broker margin, no auction volatility",
      "Every bag ships with farm GPS, processing method, and Dr. Safitri's quality certification",
    ],
    background: "kraft",
  },

  // PAGE 9 — FOR JAMIE
  {
    id: "jamie",
    title: "FOR JAMIE",
    hook: "You don't buy commodity. You acquire position.",
    body: [
      "This coffee has never appeared on an export manifest — there is no competing offer.",
      "Sumatra's disruption isn't temporary — infrastructure rebuilds take years.",
      "First movers write the story. Late arrivals compete on price.",
    ],
    proof: [
      "Identity — You acquire position, not product",
      "Exclusivity — No competing access exists",
      "Timing — The window is open now, and it's closing",
    ],
    background: "cloth",
  },

  // PAGE 10 — THE CLOSING
  {
    id: "closing",
    title: "THE CLOSING",
    hook: "The era of the fly-in buyer is closing.",
    body: [
      "The future belongs to those with roots in the ground.",
      "Climate disruption accelerates — partners who lock in now get priority allocation.",
      "Partner with Java Bridge to secure your position in the next great origin shift.",
    ],
    proof: [
      "Control Origin. Command the Market.",
      "Own the Source. Own the Advantage.",
    ],
    background: "kraft",
  },

  // PAGE 11 — BACK COVER
  {
    id: "back",
    title: "JAVA BRIDGE COFFEE",
    hook: "Direct Trade. PhD Science. Sovereign Access.",
    body: [
      "Chris Parker | Dr. Fika Ayu Safitri",
      "christopher@parkersportfolio.info",
      "East Java to New York. No Middlemen.",
    ],
    background: "cloth",
  },
];

// ---------------------------------------------------------------------------
// Origin Profiles — Flavor architecture for each reserve
// ---------------------------------------------------------------------------

export interface OriginProfile {
  name: string;
  region: string;
  process: string;
  notes: string[];
}

export const ORIGINS: OriginProfile[] = [
  {
    name: "Temanggung Hermetic Sealed Natural",
    region: "Temanggung, Central Java",
    process: "Hermetically sealed natural",
    notes: ["Fruity", "Raisin", "Granola"],
  },
  {
    name: "Temanggung Anaerobic Natural",
    region: "Temanggung, Central Java",
    process: "Anaerobic natural",
    notes: ["Berries", "Grape", "Tropical Fruit"],
  },
  {
    name: "Temanggung Washed",
    region: "Temanggung, Central Java",
    process: "Washed",
    notes: ["Fruity", "Palm Sugar"],
  },
  {
    name: "Argopuro Natural",
    region: "Argopuro, East Java",
    process: "Natural",
    notes: ["Floral", "Grape", "Tropical Fruit", "Candy"],
  },
  {
    name: "Flores Bajawa Washed",
    region: "Flores, Nusa Tenggara",
    process: "Washed",
    notes: ["Nutty", "Chocolate", "Floral"],
  },
  {
    name: "Bali Kintamani Natural",
    region: "Kintamani, Bali",
    process: "Natural",
    notes: ["Floral", "Citrus", "Chocolate"],
  },
  {
    name: "Gayo Wet Hulled",
    region: "Gayo, Aceh",
    process: "Wet hulled",
    notes: ["Apple", "Pear", "Brown Sugar"],
  },
  {
    name: "Ijen Pink Process",
    region: "Ijen, East Java",
    process: "Pink process",
    notes: ["Apricot", "Honey", "Berries", "Floral", "Tropical Fruit"],
  },
];

// ---------------------------------------------------------------------------
// Sample Flight Tiers
// ---------------------------------------------------------------------------

export interface SampleFlight {
  name: string;
  price: number;
  origins: number;
  includes: string;
}

export const SAMPLE_FLIGHTS: SampleFlight[] = [
  {
    name: "Discovery Flight",
    price: 75,
    origins: 3,
    includes: "3 curated origins",
  },
  {
    name: "Reserve Flight",
    price: 120,
    origins: 5,
    includes: "5 origins including rare lots",
  },
  {
    name: "Sovereign Flight",
    price: 150,
    origins: 8,
    includes: "All 8 origins + PhD tasting report",
  },
];

// ---------------------------------------------------------------------------
// Strategic Taglines
// ---------------------------------------------------------------------------

export const TAGLINES = [
  "Control Origin. Command the Market.",
  "Own the Source. Own the Advantage.",
  "From Commodity to Sovereign Asset.",
  "Access Becomes Power.",
] as const;

// ---------------------------------------------------------------------------
// Flash Card Deck — Quick-Reference Persuasion Cards
// ---------------------------------------------------------------------------

export interface FlashCard {
  id: string;
  title: string;
  theme: string;
  front: string;
  back: string;
}

export const FLASH_CARDS: FlashCard[] = [
  {
    id: "family",
    title: "THE FAMILY CARD",
    theme: "Identity & Trust",
    front: "We don't contract the farm. We are the family.",
    back: "Permanent spousal visa. Bahasa fluency. 30-year farmer network. Dr. Fika Ayu Safitri, PhD Agricultural Biology.",
  },
  {
    id: "science",
    title: "THE SCIENCE CARD",
    theme: "Proof & Credibility",
    front: "18% defect rate (Sumatra) vs. 2% (East Java).",
    back: "+22% yield via genetic selection. -40% input cost via bio-slurry. Peer-reviewable. Not marketing claims — science.",
  },
  {
    id: "exclusivity",
    title: "THE EXCLUSIVITY CARD",
    theme: "Scarcity & FOMO",
    front: "No one else in the world currently has this.",
    back: "Sub-ton annual harvest. Never exported. Pineapple, pear, stevia. You'd be one of maybe three people in America to taste it this year.",
  },
  {
    id: "resilience",
    title: "THE RESILIENCE CARD",
    theme: "Risk & Timing",
    front: "Sumatra is disrupted. East Java is ready.",
    back: "Cyclone Senyar: 700+ deaths, roads destroyed, prices +15–20%. East Java: untouched. Different geology, different risk.",
  },
  {
    id: "margin",
    title: "THE MARGIN CARD",
    theme: "Money & Value",
    front: "$0.85 → $3.80. That's 4.5x.",
    back: "Traditional margin vs. Java Bridge direct CP model. Indonesia exports at $2.6K; Switzerland re-sells at $31.2K. We eliminate the 12x middleman markup.",
  },
  {
    id: "geography",
    title: "THE GEOGRAPHY CARD",
    theme: "Origin & Terroir",
    front: "You've been to Bali. You've been to Sumatra. But you haven't been to Dampit.",
    back: "Volcanic soil. Protected mountain geography immune to Sumatra's cyclone paths. Different geology = different cup = different business.",
  },
  {
    id: "heritage",
    title: "THE HERITAGE CARD",
    theme: "Legacy & Prestige",
    front: "The island that gave coffee its name is about to reclaim it.",
    back: "Indonesia peaked at 12.5M bags. Java: the word itself means coffee. The 1700s dynasty is back — this time with science, not colonialism.",
  },
  {
    id: "platform",
    title: "THE PLATFORM CARD",
    theme: "Infrastructure & Scale",
    front: "We Are The Source & The Distribution.",
    back: "First institutional-grade Indonesian specialty coffee infrastructure platform. Embedded presence + PhD science + Western market intelligence.",
  },
  {
    id: "trust",
    title: "THE TRUST CARD",
    theme: "Low-Pressure Close",
    front: "Taste the coffee. That's it.",
    back: "If it's not worth your time, no hard feelings. But if it is — you get exclusive access to lots that don't exist on anyone else's menu.",
  },
  {
    id: "future",
    title: "THE FUTURE CARD",
    theme: "Vision & Urgency",
    front: "The era of the fly-in buyer is closing.",
    back: "The future belongs to those with roots in the ground. Climate disruption accelerates. Partners who lock in now get priority allocation.",
  },
];

// ---------------------------------------------------------------------------
// Messaging Coherence Rules (for test validation)
// ---------------------------------------------------------------------------

export const MESSAGING_RULES = {
  /** Every page must have a non-empty hook */
  everyPageHasHook: true,
  /** Every page must have 2-3 body lines */
  bodyLineRange: [2, 3] as const,
  /** Pages alternate between cloth and kraft backgrounds */
  alternatingBackgrounds: true,
  /** Brand name must appear on cover and back */
  brandOnCoverAndBack: true,
  /** Founder name must appear on founders page and back */
  founderOnFoundersAndBack: true,
  /** All origins must have at least 2 tasting notes */
  minTastingNotes: 2,
  /** All sample flights must credit toward first order */
  flightsCredit: true,
  /** Revenue page must show margin advantage over brokers */
  marginAdvantage: true,
} as const;
