/**
 * Brand Voice Calibration Rules
 *
 * Governs the linguistic architecture of all Java Bridge messaging.
 * These rules are testable and enforceable across all content layers.
 */

// ---------------------------------------------------------------------------
// Period Rhythm Types
// ---------------------------------------------------------------------------

export type RhythmType =
  | "declarative-power"   // 1 period: "The era of the fly-in buyer is closing."
  | "binary-impact"       // 2 periods: "Two Javas. One Bridge."
  | "triadic-authority";  // 3 periods: "Direct Trade. PhD Science. Sovereign Access."

export function classifyRhythm(hook: string): RhythmType {
  const periods = (hook.match(/[.!?]/g) || []).length;
  if (periods <= 1) return "declarative-power";
  if (periods === 2) return "binary-impact";
  return "triadic-authority";
}

// ---------------------------------------------------------------------------
// Brand Grammar Rules
// ---------------------------------------------------------------------------

export const BRAND_GRAMMAR = {
  /** Max periods per hook (tagline-style triadic is the ceiling) */
  maxPeriodsPerHook: 3,

  /** Max words per hook — enforce "one emotional strike" */
  maxWordsPerHook: 15,

  /** Max characters per hook — must fit one or two lines */
  maxCharsPerHook: 100,

  /** Max body lines per page */
  maxBodyLines: 3,
  minBodyLines: 2,

  /** Jargon terms that must NOT appear on buyer-facing pages */
  jargonTerms: [
    "FOB",
    "SKU",
    "250 kg",
    "minimum order",
    "MOQ",
    "container load",
    "FCL",
    "LCL",
    "incoterms",
    "bill of lading",
    "CIF",
    "EXW",
  ],

  /** Buyer-facing page IDs where jargon must not leak */
  buyerFacingPages: [
    "cover",
    "bridge",
    "shift",
    "founders",
    "vault",
    "decision",
    "back",
  ],

  /** Power words — should not appear in hooks more than this many times total */
  powerWordMaxHookOccurrences: 3,
  powerWords: [
    "sovereign",
    "control",
    "origin",
    "vault",
    "infrastructure",
    "institutional",
    "permanent",
    "embedded",
  ],

  /** Narrative must always flow problem → solution, never reverse */
  narrativeFlowPairs: [
    { problem: "rented", solution: "permanent" },
    { problem: "transactional", solution: "sovereign" },
    { problem: "fly-in", solution: "embedded" },
    { problem: "commodity", solution: "asset" },
    { problem: "inconsistent", solution: "consistency" },
  ] as const,

  /** Scarcity encoding — these words signal exclusivity */
  scarcitySignals: [
    "private",
    "protected",
    "inaccessible",
    "reserve",
    "vault",
    "allocation",
    "exclusive",
  ],

  /** Authority signaling — these words establish credibility */
  authoritySignals: [
    "PhD",
    "scientific",
    "genetic",
    "SCA",
    "institutional",
    "sovereign",
    "infrastructure",
  ],
} as const;

// ---------------------------------------------------------------------------
// Hook Extraction — Period Density Analysis
// ---------------------------------------------------------------------------

export interface HookAnalysis {
  hook: string;
  pageId: string;
  periodCount: number;
  wordCount: number;
  charCount: number;
  rhythm: RhythmType;
}

export function analyzeHook(hook: string, pageId: string): HookAnalysis {
  return {
    hook,
    pageId,
    periodCount: (hook.match(/[.!?]/g) || []).length,
    wordCount: hook.split(/\s+/).length,
    charCount: hook.length,
    rhythm: classifyRhythm(hook),
  };
}

// ---------------------------------------------------------------------------
// Print Spec Compliance
// ---------------------------------------------------------------------------

export const PRINT_SPEC = {
  trimWidth: 5.0,
  trimHeight: 7.0,
  bleedWidth: 5.25,
  bleedHeight: 7.25,
  bleed: 0.125,
  resolution: 300,
  colorMode: "CMYK",
  paper: "Mohawk Superfine Eggshell 300gsm",
  binding: "saddle-stitch",
  finish: "matte",
} as const;
