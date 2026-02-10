/**
 * PDF Booklet Export from Inventory Grid
 *
 * Generates a print-ready PDF structure from the inventory data.
 * Uses the PRINT_SPEC from brand-voice.ts for exact dimensions.
 *
 * This module produces a structured PDF document definition
 * that can be rendered by a PDF library (jsPDF, pdfmake, or weasyprint).
 *
 * Architecture:
 *   Page 1: Cover — JAVA BRIDGE COFFEE / INVENTORY MANIFEST
 *   Page 2: Lot Summary Table — All lots with SCA scores
 *   Page 3-4: Origin Profiles — 4 origins per page with tasting notes
 *   Page 5: Sample Flights — 3 tiers with pricing
 *   Page 6: Back Cover — Contact + brand seal
 */

import { BRAND, PAGES, ORIGINS, SAMPLE_FLIGHTS, PALETTE } from "@/data/content";
import { INVENTORY, type InventoryLot } from "@/data/inventory";
import { PRINT_SPEC } from "@/data/brand-voice";

// ---------------------------------------------------------------------------
// PDF Document Structure
// ---------------------------------------------------------------------------

export interface PdfPage {
  id: string;
  title: string;
  background: string;
  textColor: string;
  elements: PdfElement[];
}

export type PdfElement =
  | { type: "heading"; text: string; size: "xl" | "lg" | "md" | "sm" | "xs" }
  | { type: "text"; text: string; style: "normal" | "italic" | "bold" | "mono" }
  | { type: "spacer"; height: number }
  | { type: "divider"; color: string }
  | { type: "lot-row"; lot: InventoryLot }
  | { type: "origin-card"; origin: typeof ORIGINS[number] }
  | { type: "flight-card"; flight: typeof SAMPLE_FLIGHTS[number] }
  | { type: "tag-list"; tags: string[]; color: string };

// ---------------------------------------------------------------------------
// PDF Generation
// ---------------------------------------------------------------------------

export function generateBookletPdf(): PdfPage[] {
  const pages: PdfPage[] = [];

  // PAGE 1 — Cover
  pages.push({
    id: "cover",
    title: "Cover",
    background: PALETTE.cloth,
    textColor: PALETTE.cream,
    elements: [
      { type: "spacer", height: 80 },
      { type: "heading", text: "JAVA BRIDGE COFFEE", size: "xl" },
      { type: "spacer", height: 20 },
      { type: "heading", text: "INVENTORY MANIFEST", size: "lg" },
      { type: "spacer", height: 10 },
      { type: "divider", color: PALETTE.gold },
      { type: "spacer", height: 10 },
      { type: "text", text: `${INVENTORY.length} Verified Lots`, style: "mono" },
      { type: "text", text: `Average SCA Score: ${(INVENTORY.reduce((s, l) => s + l.score, 0) / INVENTORY.length).toFixed(1)}`, style: "mono" },
      { type: "text", text: "Lead QA: Dr. Fika Ayu Safitri", style: "italic" },
      { type: "spacer", height: 40 },
      { type: "text", text: "Sovereign Origin Intelligence", style: "italic" },
    ],
  });

  // PAGE 2 — Lot Summary Table
  pages.push({
    id: "lots",
    title: "Lot Summary",
    background: PALETTE.kraft,
    textColor: PALETTE.espresso,
    elements: [
      { type: "heading", text: "LOT INVENTORY", size: "lg" },
      { type: "spacer", height: 10 },
      { type: "divider", color: PALETTE.cloth },
      { type: "spacer", height: 10 },
      ...INVENTORY.map((lot): PdfElement => ({
        type: "lot-row",
        lot,
      })),
    ],
  });

  // PAGES 3-4 — Origin Profiles (4 per page)
  const originChunks = chunk(ORIGINS, 4);
  originChunks.forEach((origins, i) => {
    pages.push({
      id: `origins-${i + 1}`,
      title: `Origins ${i * 4 + 1}-${i * 4 + origins.length}`,
      background: i % 2 === 0 ? PALETTE.cloth : PALETTE.kraft,
      textColor: i % 2 === 0 ? PALETTE.cream : PALETTE.espresso,
      elements: [
        { type: "heading", text: "PROTECTED RESERVE ORIGINS", size: "lg" },
        { type: "spacer", height: 10 },
        { type: "divider", color: PALETTE.gold },
        { type: "spacer", height: 10 },
        ...origins.map((origin): PdfElement => ({
          type: "origin-card",
          origin,
        })),
      ],
    });
  });

  // PAGE 5 — Sample Flights
  pages.push({
    id: "flights",
    title: "Sample Program",
    background: PALETTE.kraft,
    textColor: PALETTE.espresso,
    elements: [
      { type: "heading", text: "SAMPLE & DISCOVERY PROGRAM", size: "lg" },
      { type: "spacer", height: 10 },
      { type: "text", text: "100% credited toward first contracted lot.", style: "italic" },
      { type: "spacer", height: 10 },
      { type: "divider", color: PALETTE.gold },
      { type: "spacer", height: 10 },
      ...SAMPLE_FLIGHTS.map((flight): PdfElement => ({
        type: "flight-card",
        flight,
      })),
    ],
  });

  // PAGE 6 — Back Cover
  pages.push({
    id: "back",
    title: "Back Cover",
    background: PALETTE.cloth,
    textColor: PALETTE.cream,
    elements: [
      { type: "spacer", height: 60 },
      { type: "heading", text: "JAVA BRIDGE COFFEE", size: "xl" },
      { type: "spacer", height: 20 },
      { type: "text", text: "Direct Trade. PhD Science. Sovereign Access.", style: "italic" },
      { type: "spacer", height: 30 },
      { type: "divider", color: PALETTE.gold },
      { type: "spacer", height: 20 },
      { type: "text", text: `${BRAND.founder} — Founder`, style: "bold" },
      { type: "text", text: BRAND.contact.email, style: "mono" },
      { type: "text", text: BRAND.contact.website, style: "mono" },
      { type: "spacer", height: 30 },
      { type: "text", text: `Trim: ${PRINT_SPEC.trimWidth}" × ${PRINT_SPEC.trimHeight}" | ${PRINT_SPEC.resolution} DPI | ${PRINT_SPEC.colorMode}`, style: "mono" },
    ],
  });

  return pages;
}

/**
 * Returns the total page count for the generated booklet.
 */
export function getBookletPageCount(): number {
  return generateBookletPdf().length;
}

/**
 * Returns the print specification metadata.
 */
export function getPrintMetadata() {
  return {
    ...PRINT_SPEC,
    pageCount: getBookletPageCount(),
    lotCount: INVENTORY.length,
    originCount: ORIGINS.length,
    flightCount: SAMPLE_FLIGHTS.length,
  };
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function chunk<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}
