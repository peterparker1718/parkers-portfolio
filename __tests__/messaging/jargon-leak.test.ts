/**
 * No Jargon Leak Test
 *
 * Validates that buyer-facing pages do NOT contain
 * internal/operational terms like "FOB", "SKU", "MOQ".
 *
 * Jamie sees the story pages; operational details stay contained.
 */

import { PAGES } from "@/data/content";
import { BRAND_GRAMMAR } from "@/data/brand-voice";

const { jargonTerms, buyerFacingPages } = BRAND_GRAMMAR;

describe("No Jargon Leak — Buyer-Facing Pages", () => {
  const buyerPages = PAGES.filter((p) => buyerFacingPages.includes(p.id));

  it("should have buyer-facing pages defined", () => {
    expect(buyerPages.length).toBeGreaterThanOrEqual(5);
  });

  it.each(buyerPages.map((p) => [p.id, p]))(
    "page '%s' should contain zero jargon terms",
    (_id, page) => {
      const allText = [
        page.title,
        page.hook,
        ...page.body,
        ...(page.proof || []),
      ]
        .join(" ")
        .toUpperCase();

      jargonTerms.forEach((term) => {
        expect(allText).not.toContain(term.toUpperCase());
      });
    }
  );

  it("offer page is allowed to contain allocation terms", () => {
    const offer = PAGES.find((p) => p.id === "offer")!;
    expect(offer).toBeDefined();
    const text = [...offer.body, ...(offer.proof || [])].join(" ").toLowerCase();
    expect(text.includes("allocation") || text.includes("sample") || text.includes("pricing")).toBe(true);
  });

  it("bridge page is allowed to contain technical terms", () => {
    const bridge = PAGES.find((p) => p.id === "bridge")!;
    expect(bridge).toBeDefined();
    const text = [...bridge.body, ...(bridge.proof || [])].join(" ").toLowerCase();
    expect(
      text.includes("genetic") ||
      text.includes("terroir") ||
      text.includes("infrastructure") ||
      text.includes("science")
    ).toBe(true);
  });
});
