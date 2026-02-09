/**
 * Brand Asset Kit Integrity Tests
 *
 * Validates the full brand asset kit:
 * - 10 messaging variants with required fields
 * - Key phrases library completeness
 * - Differentiator matrix accuracy
 * - Asset folder structure
 * - Brand pillar coverage
 */

import {
  BRAND_PALETTE,
  TYPOGRAPHY,
  DIFFERENTIATORS,
  MESSAGING_VARIANTS,
  KEY_PHRASES,
  BRAND_PILLARS,
  ASSET_FOLDERS,
} from "@/data/brand-asset-kit";

describe("Brand Palette", () => {
  it("should have primary, secondary, and utility palettes", () => {
    expect(Object.keys(BRAND_PALETTE.primary).length).toBe(3);
    expect(Object.keys(BRAND_PALETTE.secondary).length).toBe(3);
    expect(Object.keys(BRAND_PALETTE.utility).length).toBe(3);
  });

  it("all colors should be valid hex codes", () => {
    const allColors = [
      ...Object.values(BRAND_PALETTE.primary),
      ...Object.values(BRAND_PALETTE.secondary),
      ...Object.values(BRAND_PALETTE.utility),
    ];
    allColors.forEach((color) => {
      expect(color).toMatch(/^#[0-9A-Fa-f]{6}$/);
    });
  });
});

describe("Typography System", () => {
  it("should define 5 typography roles", () => {
    expect(Object.keys(TYPOGRAPHY).length).toBe(5);
  });

  it("each role should have family, weight, and use case", () => {
    Object.values(TYPOGRAPHY).forEach((role) => {
      expect(role.family.length).toBeGreaterThan(0);
      expect(role.weight.length).toBeGreaterThan(0);
      expect(role.use.length).toBeGreaterThan(0);
    });
  });
});

describe("Differentiator Matrix", () => {
  it("should have exactly 6 differentiators", () => {
    expect(DIFFERENTIATORS.length).toBe(6);
  });

  it("every differentiator should show Java Bridge advantage", () => {
    DIFFERENTIATORS.forEach((d) => {
      expect(d.category.length).toBeGreaterThan(0);
      expect(d.traditional.length).toBeGreaterThan(0);
      expect(d.javaBridge.length).toBeGreaterThan(0);
    });
  });

  it("should include defect rate comparison", () => {
    const defect = DIFFERENTIATORS.find((d) => d.category === "Defect Rate");
    expect(defect).toBeDefined();
    expect(defect!.traditional).toContain("18%");
    expect(defect!.javaBridge).toContain("2%");
  });

  it("should include margin model comparison", () => {
    const margin = DIFFERENTIATORS.find((d) => d.category === "Margin Model");
    expect(margin).toBeDefined();
    expect(margin!.javaBridge).toContain("$3.80");
  });
});

describe("10 Messaging Variants", () => {
  it("should have exactly 10 variants", () => {
    expect(MESSAGING_VARIANTS.length).toBe(10);
  });

  it("should have sequential IDs from 1-10", () => {
    MESSAGING_VARIANTS.forEach((v, i) => {
      expect(v.id).toBe(i + 1);
    });
  });

  it.each(MESSAGING_VARIANTS.map((v) => [v.name, v]))(
    "variant '%s' should have tagline, pull quote, visual direction, and key points",
    (_name, variant) => {
      expect(variant.tagline.length).toBeGreaterThan(10);
      expect(variant.pullQuote.length).toBeGreaterThan(5);
      expect(variant.visualDirection.length).toBeGreaterThan(20);
      expect(variant.keyPoints.length).toBeGreaterThanOrEqual(2);
    }
  );

  it("should include the Connector Advantage variant (variant 10)", () => {
    const connector = MESSAGING_VARIANTS.find((v) => v.name === "Connector Advantage");
    expect(connector).toBeDefined();
    expect(connector!.pullQuote).toContain("married into it");
  });

  it("should include the Science Meets Soul variant", () => {
    const science = MESSAGING_VARIANTS.find((v) => v.name === "Science Meets Soul");
    expect(science).toBeDefined();
    expect(science!.keyPoints.some((p) => p.includes("22%"))).toBe(true);
  });
});

describe("Key Phrases Library", () => {
  it("should have all 10 key phrases", () => {
    expect(Object.keys(KEY_PHRASES).length).toBe(10);
  });

  it("hero tagline should reference America and Indonesia", () => {
    expect(KEY_PHRASES.heroTagline.toLowerCase()).toContain("america");
    expect(KEY_PHRASES.heroTagline.toLowerCase()).toContain("indonesia");
  });

  it("mission quote should reference bridge", () => {
    expect(KEY_PHRASES.missionQuote.toLowerCase()).toContain("bridge");
  });

  it("credibility phrase should reference marriage", () => {
    expect(KEY_PHRASES.credibility.toLowerCase()).toContain("married");
  });

  it("tasting phrase should list specific flavor notes", () => {
    expect(KEY_PHRASES.tasting).toContain("Pineapple");
    expect(KEY_PHRASES.tasting).toContain("Pear");
    expect(KEY_PHRASES.tasting).toContain("Stevia");
  });
});

describe("Brand Pillars", () => {
  it("should have exactly 4 pillars", () => {
    expect(BRAND_PILLARS.length).toBe(4);
  });

  it("should cover Science, Access, Exclusivity, Resilience", () => {
    const names = BRAND_PILLARS.map((p) => p.name);
    expect(names).toContain("Science");
    expect(names).toContain("Access");
    expect(names).toContain("Exclusivity");
    expect(names).toContain("Resilience");
  });
});

describe("Asset Folder Structure", () => {
  it("should have exactly 11 folder definitions", () => {
    expect(ASSET_FOLDERS.length).toBe(11);
  });

  it("should start with 00_MASTER_BRAND_KIT", () => {
    expect(ASSET_FOLDERS[0].folder).toBe("00_MASTER_BRAND_KIT");
  });

  it("should end with _ARCHIVE", () => {
    expect(ASSET_FOLDERS[ASSET_FOLDERS.length - 1].folder).toBe("_ARCHIVE");
  });

  it("every folder should have contents and naming convention", () => {
    ASSET_FOLDERS.forEach((f) => {
      expect(f.contents.length).toBeGreaterThan(0);
      expect(f.naming.length).toBeGreaterThan(0);
    });
  });
});
