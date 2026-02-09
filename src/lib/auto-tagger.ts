/**
 * AI Auto-Tagging Pipeline
 *
 * Processes ingested assets through a multi-stage classification pipeline:
 *
 * Stage 1: File type classification (image/pdf/audio)
 * Stage 2: Content analysis via filename + metadata heuristics
 * Stage 3: Tag generation based on Java Bridge domain vocabulary
 * Stage 4: Confidence scoring
 *
 * This runs client-side with heuristic rules. A future version
 * can delegate to an API endpoint for vision/audio model inference.
 */

import type { IngestedAsset } from "@/components/DropZoneIngest";
import { ORIGINS } from "@/data/content";
import { LABEL_NORMALIZATIONS } from "@/data/inventory";

// ---------------------------------------------------------------------------
// Domain vocabulary for tag matching
// ---------------------------------------------------------------------------

const REGION_KEYWORDS = [
  "temanggung",
  "argopuro",
  "flores",
  "bajawa",
  "bali",
  "kintamani",
  "gayo",
  "ijen",
  "dampit",
  "banyuwangi",
  "aceh",
  "sulawesi",
  "toraja",
  "sumatra",
  "mandheling",
];

const PROCESS_KEYWORDS = [
  "washed",
  "natural",
  "anaerobic",
  "hermetic",
  "wet hulled",
  "giling basah",
  "honey",
  "pink",
  "lactic",
  "wine",
  "peaberry",
  "excelsa",
];

const ASSET_CATEGORY_KEYWORDS: Record<string, string[]> = {
  farm: ["farm", "field", "harvest", "cherry", "tree", "plantation", "terraced"],
  portrait: ["portrait", "founder", "chris", "fika", "team", "couple"],
  product: ["bag", "sample", "bean", "roast", "package", "label"],
  science: ["lab", "analysis", "genetic", "soil", "phd", "research"],
  landscape: ["volcano", "mountain", "landscape", "ijen", "elevation"],
  document: ["passport", "booklet", "deck", "pitch", "certificate"],
};

const TASTING_NOTE_KEYWORDS = ORIGINS.flatMap((o) =>
  o.notes.map((n) => n.toLowerCase())
);

// ---------------------------------------------------------------------------
// Tag generation
// ---------------------------------------------------------------------------

export interface TagResult {
  tags: string[];
  confidence: number;
  stage: "heuristic" | "ai-pending";
}

/**
 * Generates tags for an ingested asset based on filename heuristics.
 * Returns tags with a confidence score (0-1).
 */
export function generateTags(asset: IngestedAsset): TagResult {
  const name = asset.normalizedName.toLowerCase();
  const tags: string[] = [];
  let matchCount = 0;

  // Stage 1: File type tag
  tags.push(`type:${asset.type}`);

  // Stage 2: Region detection
  for (const region of REGION_KEYWORDS) {
    if (name.includes(region)) {
      tags.push(`region:${region}`);
      matchCount++;
    }
  }

  // Stage 3: Process detection (normalize underscores to spaces for matching)
  const nameSpaced = name.replace(/_/g, " ");
  for (const process of PROCESS_KEYWORDS) {
    if (nameSpaced.includes(process)) {
      tags.push(`process:${process}`);
      matchCount++;
    }
  }

  // Stage 4: Asset category detection
  for (const [category, keywords] of Object.entries(ASSET_CATEGORY_KEYWORDS)) {
    if (keywords.some((kw) => name.includes(kw))) {
      tags.push(`category:${category}`);
      matchCount++;
    }
  }

  // Stage 5: Tasting note detection (from filename — rare but possible)
  for (const note of TASTING_NOTE_KEYWORDS) {
    if (name.includes(note)) {
      tags.push(`note:${note}`);
      matchCount++;
    }
  }

  // Stage 6: Purpose confirmation
  tags.push(`purpose:${asset.purpose}`);

  // Confidence: based on how many domain keywords matched
  const confidence = Math.min(1, matchCount / 3);

  return {
    tags: [...new Set(tags)], // deduplicate
    confidence,
    stage: "heuristic",
  };
}

/**
 * Processes a batch of assets through the tagging pipeline.
 * Returns updated assets with tags and status.
 */
export function processAssetBatch(
  assets: IngestedAsset[]
): IngestedAsset[] {
  return assets.map((asset) => {
    const result = generateTags(asset);
    return {
      ...asset,
      tags: result.tags,
      status: result.confidence > 0.3 ? "tagged" : "queued",
    };
  });
}

/**
 * Checks if a filename contains any misspellings from the normalization table.
 */
export function detectMisspellings(
  filename: string
): { raw: string; corrected: string }[] {
  const found: { raw: string; corrected: string }[] = [];
  for (const [raw, corrected] of Object.entries(LABEL_NORMALIZATIONS)) {
    if (filename.includes(raw) && !filename.includes(corrected)) {
      found.push({ raw, corrected });
    }
  }
  return found;
}
