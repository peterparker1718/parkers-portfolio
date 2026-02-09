/**
 * No Jargon Leak Test
 *
 * Validates that buyer-facing pages (cover, bridge, decision, etc.)
 * do NOT contain internal/operational terms like "FOB", "SKU", "MOQ"
 * that belong only on the revenue page.
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

  it("revenue page is allowed to contain operational terms", () => {
    const revenue = PAGES.find((p) => p.id === "revenue")!;
    expect(revenue).toBeDefined();
    const text = [...revenue.body, ...(revenue.proof || [])].join(" ");
    // Revenue page should contain at least some financial specifics
    expect(text).toContain("$");
  });

  it("origins page is allowed to contain technical terms", () => {
    const origins = PAGES.find((p) => p.id === "origins")!;
    expect(origins).toBeDefined();
    // Origins can mention processing methods, altitude, etc.
    const text = [...origins.body].join(" ").toLowerCase();
    expect(
      text.includes("genetic") ||
      text.includes("terroir") ||
      text.includes("processing") ||
      text.includes("brew")
    ).toBe(true);
  });
});
