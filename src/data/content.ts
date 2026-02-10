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
    email: "chris@javabridgecoffee.com",
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
    hook: "Two Javas. One Bridge.",
    body: [
      "We Are The Source & The Distribution.",
      "We don't contract the farm. We are the family.",
    ],
    background: "cloth",
  },

  // PAGE 2 — THE BRIDGE (Mission)
  {
    id: "bridge",
    title: "THE BRIDGE",
    hook: "The real problem isn't coffee. It's trust at scale across borders.",
    body: [
      "Indonesia can produce extraordinary quality.",
      "But it cannot reliably translate that value to the U.S. market.",
      "So instead of forcing Indonesia to change, we changed the structure around it.",
    ],
    proof: [
      "SCA Protocol — The Standard",
      "Agricultural Science — The Method",
      "Mind / Body / Spirit — The Community Health",
    ],
    background: "kraft",
  },

  // PAGE 3 — THE SHIFT
  {
    id: "shift",
    title: "THE SHIFT",
    hook: "The era of the fly-in buyer is closing.",
    body: [
      "For decades, buyers flew in, shook hands, signed contracts, and left.",
      "That access was rented — not owned.",
      "Java Bridge replaces transactional trade with sovereign infrastructure.",
    ],
    proof: [
      "Fly-in buyers → transactional trade → rented access",
      "Embedded family → scientific infrastructure → sovereign supply",
    ],
    background: "cloth",
  },

  // PAGE 4 — THE FOUNDERS
  {
    id: "founders",
    title: "THE FOUNDERS",
    hook: "Most buyers visit Indonesia. I married into it.",
    body: [
      "Chris Parker — U.S. coffee entrepreneur, bilingual liaison, permanent Indonesian resident.",
      "Dr. Fika Ayu Safitri — PhD Agricultural Biology, multi-generational farming family, Dampit, East Java.",
      "Together: the industry's only U.S.–Indonesian executive union.",
    ],
    proof: [
      "Marriage → Embedded residency → Family integration",
      "Permanent trust → Structural access → Sovereign supply",
    ],
    background: "kraft",
  },

  // PAGE 5 — THE SCIENCE
  {
    id: "science",
    title: "THE METHOD",
    hook: "A unique system no broker can duplicate.",
    body: [
      "PhD-level genetic verification reduces defect rates from 18% (Sumatra average) to 2%.",
      "Processing optimization increases yield by 22% through scientific selection.",
      "Every lot is embedded, scientifically optimized, structurally defended, and competitively insulated.",
    ],
    proof: [
      "Defect rate: 2% (vs. 18% industry)",
      "Yield improvement: +22%",
      "Genetic verification per lot",
    ],
    background: "cloth",
  },

  // PAGE 6 — THE VAULT (Supply Positioning)
  {
    id: "vault",
    title: "THE VAULT",
    hook: "We don't source coffee. We control origin.",
    body: [
      "Until now, Indonesia's most strategic coffee reserves were inaccessible.",
      "Java Bridge opens the vault to private Indonesian reserves.",
      "You are not buying off a spot list. You are acquiring inventory that does not exist for your competitors.",
    ],
    proof: [
      "Embedded",
      "Scientifically optimized",
      "Structurally defended",
      "Competitively insulated",
    ],
    background: "kraft",
  },

  // PAGE 7 — THE ADVANTAGE
  {
    id: "advantage",
    title: "THE ADVANTAGE",
    hook: "East Java holds unmatched genetic, geographic, and terroir advantages.",
    body: [
      "Embedded presence in origin.",
      "PhD agricultural science on every lot.",
      "Western market intelligence driving positioning.",
    ],
    proof: [
      "Regulatory Compliance — FIKA's credentials + USDA/FDA certification",
      "Logistics & Shipping — On-ground presence, spousal visa, long-term access",
      "Quality Control — Tyko's network + FIKA's scientific rigor",
      "Cultural Bridge — Bilingual liaison, married to local national",
      "Exclusivity — Family-owned farms, private lots never hitting open market",
    ],
    background: "cloth",
  },

  // PAGE 8 — ORIGIN PROFILES
  {
    id: "origins",
    title: "THE ORIGINS",
    hook: "Eight protected reserves. Zero public availability.",
    body: [
      "Each origin is selected for genetic distinction, terroir signature, and processing innovation.",
      "Tasting notes are calibrated for manual brew profiles.",
      "Roasting to espresso profile may shift the expected flavor architecture.",
    ],
    background: "kraft",
  },

  // PAGE 9 — REVENUE ENGINE
  {
    id: "revenue",
    title: "THE PARTNERSHIP MODEL",
    hook: "Your economics. Clean, fair, inevitable.",
    body: [
      "Direct Import Sourcing Fee: 8–12% FOB value (vs. 15–25% traditional brokers).",
      "Sample & Discovery Program: $75–$150 flights, 100% credited toward first order.",
      "Origin Consulting: $500 genetic verification, $1,200+ processing optimization.",
    ],
    proof: [
      "Traditional broker margin: $1.20/kg",
      "Java Bridge margin: $3.80/kg",
      "Partner savings: $2,600+ per container",
    ],
    background: "cloth",
  },

  // PAGE 10 — THE DECISION
  {
    id: "decision",
    title: "THE DECISION",
    hook: "If you partner with Java Bridge, you own stability, access, and leverage.",
    body: [
      "If you don't, your competitors will.",
      "This is the world's first institutional-grade Indonesian specialty coffee infrastructure platform.",
      "Access becomes power.",
    ],
    proof: [
      "Control Origin. Command the Market.",
      "Own the Source. Own the Advantage.",
      "From Commodity to Sovereign Asset.",
    ],
    background: "kraft",
  },

  // PAGE 11 — BACK COVER
  {
    id: "back",
    title: "JAVA BRIDGE COFFEE",
    hook: "Direct Trade. PhD Science. Sovereign Access.",
    body: [
      "Chris Parker — Founder",
      "chris@javabridgecoffee.com",
      "javabridgecoffee.com",
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
