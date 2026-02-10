/**
 * Five Front-Page Concept Systems
 *
 * Each follows the cognitive hierarchy:
 *   Layer 1: One-liner hook (emotional authority)
 *   Layer 2: Three-line explanation (strategic clarity)
 *   Layer 3: Visual logic trigger (design direction)
 *
 * Format: 5.25 × 7.25" with bleed (5 × 7" trim)
 */

export interface FrontPageConcept {
  id: string;
  frame: string;
  description: string;
  subtitle: string;
  hook: string;
  body: [string, string, string];
  closer: string;
  founder: string;
  visualLogic: string;
}

export const FRONT_PAGE_CONCEPTS: FrontPageConcept[] = [
  {
    id: "trust-architecture",
    frame: "The Trust Architecture Frame",
    description: "Most Strategic",
    subtitle: "The Private Reserve of Indonesian Coffee",
    hook: "The real problem isn't coffee. It's trust at scale across borders.",
    body: [
      "Indonesia can grow extraordinary coffee.",
      "But it cannot reliably translate that value to the U.S. market.",
      "So instead of forcing Indonesia to change, I changed the structure around it.",
    ],
    closer: "Permanent presence. Family integration. Scientific control.",
    founder: "Chris Parker — Founder, Java Bridge Coffee",
    visualLogic:
      "Split page — Indonesia farm / U.S. roaster. Bridge graphic connecting them. Founder portrait at center intersection.",
  },
  {
    id: "sovereign-access",
    frame: "The Sovereign Access Frame",
    description: "Most Powerful",
    subtitle: "The Private Reserve of Indonesian Coffee",
    hook: "For decades, Indonesia's most protected coffee reserves were inaccessible.",
    body: [
      "Not to buyers. Not to brokers. Not to exporters.",
      "Until me — Chris Parker.",
      "I didn't visit Indonesia. I embedded inside it.",
    ],
    closer:
      "Marriage. Residency. Family. Permanent trust replaced transactional trade. This isn't sourcing. This is sovereign access.",
    founder: "Chris Parker — Founder, Java Bridge Coffee",
    visualLogic:
      "Vault door opening → East Java landscape → founder silhouette.",
  },
  {
    id: "structural-rebuild",
    frame: "The Structural Rebuild Frame",
    description: "Most Investor-Ready",
    subtitle: "The Infrastructure Behind Indonesian Coffee",
    hook: "Indonesia never lacked quality. It lacked infrastructure for trust.",
    body: [
      "From fly-in buyers → to permanent presence.",
      "From contracts → to family.",
      "From commodity trade → to sovereign supply.",
    ],
    closer: "We didn't change Indonesia. We changed the structure around it.",
    founder: "Chris Parker — Founder",
    visualLogic:
      "Broken chain → rebuilt bridge → flowing trade map.",
  },
  {
    id: "embedded-founder",
    frame: "The Embedded Founder Frame",
    description: "Most Emotional",
    subtitle: "Where Coffee Becomes Family",
    hook: "Most importers visit Indonesia for a week. I married into it.",
    body: [
      "What they rent, I live inside.",
      "Permanent presence. Family trust. Scientific control.",
      "This is how rare origin reaches America.",
    ],
    closer: "— Chris Parker",
    founder: "Chris Parker — Founder, Java Bridge Coffee",
    visualLogic:
      "Wedding photo → farm entrance → export container → roaster.",
  },
  {
    id: "power-statement",
    frame: "The Power Statement Frame",
    description: "Most Minimal / Luxury",
    subtitle: "",
    hook: "We don't source coffee. We control origin.",
    body: [
      "Indonesia can grow extraordinary quality.",
      "But only permanent trust unlocks it.",
      "So I embedded inside the system — and rebuilt it from the inside out.",
    ],
    closer: "",
    founder: "Chris Parker — Founder, Java Bridge Coffee",
    visualLogic:
      "Single coffee plant → anatomical cross-section → gold botanical overlay.",
  },
];

/**
 * Master Logic Chain (for messaging coherence validation)
 *
 * PROBLEM   → The real problem isn't coffee. It's trust at scale across borders.
 * CAUSE     → Indonesia can produce extraordinary quality, but it cannot reliably translate that value to Western markets.
 * FAILURE   → Fly-in buyers create transactional relationships. Access is rented, not owned.
 * INFLECTION→ Chris Parker didn't source Indonesia. He embedded inside it.
 * SHIFT     → Marriage → Residency → Family → Permanent presence → Scientific systems.
 * RESULT    → Indonesia's private coffee reserves become sovereign assets, not commodities.
 */
export const LOGIC_CHAIN = {
  problem:
    "The real problem isn't coffee. It's trust at scale across borders.",
  cause:
    "Indonesia can produce extraordinary quality, but it cannot reliably translate that value to Western markets.",
  failure:
    "Fly-in buyers create transactional relationships. Access is rented, not owned. Quality becomes inconsistent. Trust collapses.",
  inflection:
    "Chris Parker didn't source Indonesia. He embedded inside it.",
  shift:
    "Marriage → Residency → Family → Permanent presence → Scientific systems.",
  result:
    "Indonesia's private coffee reserves become sovereign assets, not commodities.",
} as const;

/**
 * Causality Chain (explicit, for investor psychology)
 *
 * Marriage → Embedded residency → Family integration →
 * Permanent trust → Structural access → Sovereign supply
 */
export const CAUSALITY_CHAIN = [
  "Marriage",
  "Embedded residency",
  "Family integration",
  "Permanent trust",
  "Structural access",
  "Sovereign supply",
] as const;

/**
 * Gap Analysis Framework
 * Each gap maps to a Java Bridge solution
 */
export interface GapSolution {
  gap: string;
  category: string;
  problem: string;
  solution: string;
}

export const GAP_ANALYSIS: GapSolution[] = [
  {
    gap: "structural-translation",
    category: "Structural Translation to Western Markets",
    problem:
      "Indonesia's coffee has historically lacked the infrastructure to meet Western specialty standards.",
    solution:
      "Java Bridge built a sovereign supply chain: permanent on-ground presence, scientific quality control, exclusive access to private reserves.",
  },
  {
    gap: "private-reserves",
    category: "Access to Private Reserves",
    problem:
      "Indonesia's most strategic coffee reserves were previously inaccessible to Western buyers.",
    solution:
      "Embedded presence in East Java and family ties to multi-generational farms unlock private reserves competitors cannot obtain.",
  },
  {
    gap: "quality-control",
    category: "Quality Control",
    problem:
      "Traditional regions like Sumatra have 18% average defect rates and inconsistent quality.",
    solution:
      "PhD-level scientific protocols reduce defect rates to 2% and optimize yields by 22% through genetic selection.",
  },
  {
    gap: "logistics-compliance",
    category: "Logistics & Regulatory Compliance",
    problem:
      "Importers face challenges with export documentation, customs clearance, and USDA/FDA compliance.",
    solution:
      "Permanent presence in Indonesia + Dr. Fika's agricultural biology credentials ensure seamless logistics and regulatory compliance.",
  },
  {
    gap: "cultural-barriers",
    category: "Cultural & Language Barriers",
    problem:
      "Western buyers struggle to navigate cultural and linguistic complexities of sourcing from Indonesia.",
    solution:
      "Chris Parker's bilingual skills and marriage into Indonesian farming family provide unique advantage as cultural liaison.",
  },
  {
    gap: "market-awareness",
    category: "Market Awareness",
    problem:
      "U.S. specialty importers are often unaware of Indonesian coffee's unique flavor profiles and margins.",
    solution:
      "Curated sample flights ($75–$150) let importers taste before committing, credited toward first contracted order.",
  },
  {
    gap: "perception",
    category: "Perception of Indonesian Coffee",
    problem:
      "Indonesian coffee is perceived as commodity rather than premium product.",
    solution:
      "Java Bridge repositions Indonesian coffee as a sovereign asset, emphasizing exclusivity, scientific quality, and unique flavor profiles.",
  },
];
