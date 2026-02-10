/**
 * Java Bridge Coffee — Brand Asset Kit v1.0
 *
 * Visual Identity + Messaging Library + Asset Organization
 * Born in America. Sourcing Indonesia's Hidden Treasures.
 *
 * Version 1.0 | February 2026
 */

// ---------------------------------------------------------------------------
// Extended Color Palette (Brand Asset Kit — Full Palette)
// ---------------------------------------------------------------------------

export const BRAND_PALETTE = {
  primary: {
    espresso: "#2C1810",
    volcanicRed: "#B85042",
    indonesianGold: "#C5963A",
  },
  secondary: {
    forestSage: "#4A6741",
    warmCream: "#F5F0E8",
    sandyNeutral: "#E7E0D1",
  },
  utility: {
    charcoalText: "#1E1E1E",
    midGray: "#999999",
    pureWhite: "#FFFFFF",
  },
} as const;

// ---------------------------------------------------------------------------
// Typography System
// ---------------------------------------------------------------------------

export const TYPOGRAPHY = {
  display: { family: "Georgia, Playfair Display", weight: "Bold", use: "Headlines, hero text, packaging titles" },
  subheading: { family: "Georgia", weight: "Bold", use: "Section headers, taglines, pull quotes" },
  body: { family: "Calibri, Source Sans Pro", weight: "Regular", use: "Descriptions, emails, documents" },
  data: { family: "Calibri, Roboto Mono", weight: "Regular", use: "Stats, tasting notes, lot codes" },
  accent: { family: "Georgia", weight: "Italic", use: "Quotes, brand voice moments" },
} as const;

// ---------------------------------------------------------------------------
// Differentiator Matrix
// ---------------------------------------------------------------------------

export interface Differentiator {
  category: string;
  traditional: string;
  javaBridge: string;
}

export const DIFFERENTIATORS: Differentiator[] = [
  { category: "Presence", traditional: "Week-long visits", javaBridge: "Permanent (spousal visa)" },
  { category: "Science", traditional: "Cupping-based", javaBridge: "PhD genetic + soil analysis" },
  { category: "Defect Rate", traditional: "18% (Sumatra avg)", javaBridge: "2% (East Java)" },
  { category: "Margin Model", traditional: "$0.85 traditional", javaBridge: "$3.80 direct CP model" },
  { category: "Supply Chain", traditional: "6–8 middlemen", javaBridge: "Farm → Roaster" },
  { category: "Exclusivity", traditional: "Commodity lots", javaBridge: "Never-exported micro-lots" },
];

// ---------------------------------------------------------------------------
// 10 Messaging Variants
// ---------------------------------------------------------------------------

export interface MessagingVariant {
  id: number;
  name: string;
  tagline: string;
  pullQuote: string;
  visualDirection: string;
  keyPoints: string[];
}

export const MESSAGING_VARIANTS: MessagingVariant[] = [
  {
    id: 1,
    name: "Java Island Heritage",
    tagline: "The island that gave coffee its name is about to reclaim it.",
    pullQuote: "The 1700s dynasty is back.",
    visualDirection: "Historical coffee plantation imagery from 1696 Dutch colonial era, split with modern hybrid cherry close-up.",
    keyPoints: [
      "Indonesia produced 12.5M bags at its golden age peak",
      "The Dutch built an empire on Java's volcanic soil",
      "Hybrid cherry: disease-resistant like Robusta with Arabica complexity",
    ],
  },
  {
    id: 2,
    name: "Dual Meaning Power",
    tagline: "Java: the language that runs the world. And the island that fuels it.",
    pullQuote: "Two Javas. One bridge.",
    visualDirection: "Split screen: Java code on laptop (left) next to Java island coffee farm at sunrise (right).",
    keyPoints: [
      "Cultural overlap between tech world and coffee origin",
      "Target: tech industry corporate gifting + specialty roaster crossover",
    ],
  },
  {
    id: 3,
    name: "First Mover Advantage",
    tagline: "You'd be one of maybe three people in America to taste this year.",
    pullQuote: "No one else in the world currently has this.",
    visualDirection: "Single golden coffee cherry on marble pedestal, dramatically lit. Scarcity-driven luxury aesthetic.",
    keyPoints: [
      "Sub-ton annual harvest",
      "Never-exported lots",
      "Tasting notes: pineapple, pear, stevia",
      "QR code links to full lot traceability and genetic audit",
    ],
  },
  {
    id: 4,
    name: "Science Meets Soul",
    tagline: "PhD-validated. Family-harvested. Roaster-ready.",
    pullQuote: "We don't guess at quality. We prove it.",
    visualDirection: "Dr. Fika in lab analyzing cherry samples. Through lab window, a farmer works terraced fields.",
    keyPoints: [
      "+22% yield optimization through genetic selection",
      "-40% input costs via bio-slurry protocols",
      "2% defect rate vs. Sumatra's 18% average",
    ],
  },
  {
    id: 5,
    name: "Geography as Destiny",
    tagline: "Same country. Different story.",
    pullQuote: "You've been to Bali. You've been to Sumatra. But you haven't been to Dampit.",
    visualDirection: "Topographic relief map: East Java volcanic elevation vs. Sumatra flood-plain vulnerability.",
    keyPoints: [
      "East Java sits in a different geological zone",
      "Volcanic soil, stable infrastructure",
      "Protected from cyclone paths that devastated Sumatra",
    ],
  },
  {
    id: 6,
    name: "Timing Is Everything",
    tagline: "Sumatra is disrupted. East Java is ready. The window is now.",
    pullQuote: "The market doesn't wait. Neither should you.",
    visualDirection: "Hourglass with golden coffee cherries. Top half: storm clouds. Bottom half: clear skies, pristine farm rows.",
    keyPoints: [
      "Cyclone Senyar: 700+ deaths, roads/bridges destroyed",
      "Sumatra arabica supply down, prices up 15–20%",
      "East Java infrastructure remained untouched",
    ],
  },
  {
    id: 7,
    name: "The Java Promise",
    tagline: "I'm not asking you to believe me. I'm asking you to try the coffee.",
    pullQuote: "If it's not worth your time, I'll shake your hand and walk out.",
    visualDirection: "Handshake over cupping table. Through window, volcanic mountains of East Java in golden light.",
    keyPoints: [
      "Radically simple pitch: taste the coffee",
      "Exclusive access to lots not on anyone else's menu",
      "Traceability, scientific validation, direct relationship",
    ],
  },
  {
    id: 8,
    name: "Market Arbitrage",
    tagline: "Indonesia exports at $2.6K. Switzerland re-exports at $31.2K. We eliminate the 12x markup.",
    pullQuote: "We aren't just shipping beans; we are building a bridge over the inefficiencies of the past 100 years.",
    visualDirection: "Financial visualization: stock chart comparing Brazil commodity pricing against Indonesia quality-to-price ratio.",
    keyPoints: [
      "GL-Index: USA most profitable specialty market (2.57 vs EU 1.12)",
      "Indonesian export: $2.6K vs Swiss re-export: $31.2K",
      "4.5x margin improvement for roasters sourcing direct",
    ],
  },
  {
    id: 9,
    name: "Story Sells Coffee",
    tagline: "Every bag has a chapter. Every cup has a character.",
    pullQuote: "I came into this world by accident. But here I am. And I have access to coffee that's never hit the export market.",
    visualDirection: "Open storybook with pages coming alive: watercolor farm-to-cup journey. Wes Anderson meets National Geographic.",
    keyPoints: [
      "Chris married into Indonesian coffee family",
      "Bahasa fluency, permanent visa, 30-year family network",
      "Narrative is the product's most powerful differentiator",
    ],
  },
  {
    id: 10,
    name: "Connector Advantage",
    tagline: "An American who married into an Indonesian coffee family. That's not a sales line. That's just the truth.",
    pullQuote: "Most importers visit Indonesia for a week. I married into it.",
    visualDirection: "Chris and Dr. Fika at Dampit farm entrance. Morning light. Farm stretches behind them.",
    keyPoints: [
      "Chris: enterprise sales, Salesforce/MuleSoft, AI/automation",
      "Dr. Fika: PhD Agricultural Biology, molecular immunology, SCAI member",
      "Only American-Indonesian team with market access + scientific credibility",
    ],
  },
];

// ---------------------------------------------------------------------------
// Key Phrases Library (tested verbal assets)
// ---------------------------------------------------------------------------

export const KEY_PHRASES = {
  heroTagline: "Born in America. Sourcing Indonesia's hidden treasures.",
  missionQuote: "We aren't just shipping beans; we are building a bridge over the inefficiencies of the past 100 years.",
  exclusivity: "No one else in the world currently has this.",
  theAsk: "I'm not asking you to believe me. I'm asking you to try the coffee.",
  credibility: "Most importers visit Indonesia for a week. I married into it.",
  scienceProof: "18% defect rate (Sumatra) vs. 2% (East Java). That's not marketing. That's science.",
  originInvitation: "You've been to Bali. You've been to Sumatra. But you haven't been to Dampit.",
  gracefulExit: "If it's not worth your time, I'll shake your hand and walk out.",
  heritage: "The 1700s dynasty is back.",
  tasting: "Pineapple. Pear. Stevia. Light body. Excellent acidity. Clean finish.",
} as const;

// ---------------------------------------------------------------------------
// Brand Pillars
// ---------------------------------------------------------------------------

export const BRAND_PILLARS = [
  {
    name: "Science",
    detail: "Dr. Safitri's PhD research: +22% yield optimization, -40% input costs via bio-slurry, 2% defect rate",
  },
  {
    name: "Access",
    detail: "Permanent on-ground presence, 30-year family network, spousal visa, Bahasa fluency",
  },
  {
    name: "Exclusivity",
    detail: "Micro-lots never exported, sub-ton annual harvest, pineapple-pear-stevia tasting profile",
  },
  {
    name: "Resilience",
    detail: "East Java geography immune to Sumatra's cyclone disruptions, stable infrastructure",
  },
] as const;

// ---------------------------------------------------------------------------
// Asset Organization Blueprint
// ---------------------------------------------------------------------------

export const ASSET_FOLDERS = [
  { folder: "00_MASTER_BRAND_KIT", contents: "Brand kit document, logo files, color codes, font files", naming: "JBC_BrandKit_v{version}_{date}" },
  { folder: "01_LOGOS", contents: "All logo variations: full, simplified, mono, reversed, wordmark", naming: "JBC_Logo_{Variant}_{Color}_{Size}" },
  { folder: "02_PHOTOGRAPHY", contents: "Farm, product, science, portrait, supply chain categories", naming: "JBC_Photo_{Category}_{Subject}_{Date}" },
  { folder: "03_TEMPLATES", contents: "Canva templates: social, pitch deck, sell sheet, email header", naming: "JBC_Template_{Type}_{Platform}" },
  { folder: "04_PRESENTATIONS", contents: "Pitch decks, bracket tournaments, investor materials", naming: "JBC_Deck_{Audience}_{Date}" },
  { folder: "05_DOCUMENTS", contents: "Brochures, one-pagers, sell sheets, whitepapers", naming: "JBC_Doc_{Type}_{Audience}_{Date}" },
  { folder: "06_SOCIAL_CONTENT", contents: "Platform-ready exports from Canva, sized by platform", naming: "JBC_Social_{Platform}_{Variant}_{Date}" },
  { folder: "07_PACKAGING", contents: "Bag mockups, label designs, QR code assets", naming: "JBC_Pkg_{Product}_{Version}" },
  { folder: "08_DATA_VISUALS", contents: "Charts, infographics, bracket visuals, supply chain maps", naming: "JBC_Data_{Subject}_{Format}" },
  { folder: "09_VIDEO", contents: "Reels, pitch videos, farm footage, processing documentation", naming: "JBC_Video_{Type}_{Duration}_{Date}" },
  { folder: "_ARCHIVE", contents: "Previous versions, deprecated assets, dated backups", naming: "YYYY-MM_{original}" },
] as const;
