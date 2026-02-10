/**
 * Brand Voice Calibration Tests
 *
 * Validates the brand voice ruleset itself and ensures
 * the print spec, rhythm classifier, and grammar rules
 * are internally consistent.
 */

import {
  classifyRhythm,
  analyzeHook,
  BRAND_GRAMMAR,
  PRINT_SPEC,
} from "@/data/brand-voice";

describe("Rhythm Classifier", () => {
  it("should classify single-period as declarative-power", () => {
    expect(classifyRhythm("The era of the fly-in buyer is closing.")).toBe(
      "declarative-power"
    );
  });

  it("should classify zero-period as declarative-power", () => {
    expect(classifyRhythm("A unique system no broker can duplicate")).toBe(
      "declarative-power"
    );
  });

  it("should classify two-period as binary-impact", () => {
    expect(classifyRhythm("Two Javas. One Bridge.")).toBe("binary-impact");
  });

  it("should classify three-period as triadic-authority", () => {
    expect(
      classifyRhythm("Direct Trade. PhD Science. Sovereign Access.")
    ).toBe("triadic-authority");
  });
});

describe("Hook Analyzer", () => {
  it("should produce correct word count", () => {
    const analysis = analyzeHook("Two Javas. One Bridge.", "cover");
    expect(analysis.wordCount).toBe(4);
    expect(analysis.periodCount).toBe(2);
    expect(analysis.charCount).toBe(22);
    expect(analysis.rhythm).toBe("binary-impact");
    expect(analysis.pageId).toBe("cover");
  });
});

describe("Brand Grammar Rules", () => {
  it("should define jargon terms", () => {
    expect(BRAND_GRAMMAR.jargonTerms.length).toBeGreaterThan(5);
  });

  it("should define buyer-facing pages", () => {
    expect(BRAND_GRAMMAR.buyerFacingPages.length).toBeGreaterThan(3);
  });

  it("should define power words", () => {
    expect(BRAND_GRAMMAR.powerWords.length).toBeGreaterThan(3);
  });

  it("should define scarcity signals", () => {
    expect(BRAND_GRAMMAR.scarcitySignals.length).toBeGreaterThan(3);
  });

  it("should define authority signals", () => {
    expect(BRAND_GRAMMAR.authoritySignals.length).toBeGreaterThan(3);
  });

  it("should define narrative flow pairs", () => {
    expect(BRAND_GRAMMAR.narrativeFlowPairs.length).toBeGreaterThan(3);
  });

  it("narrative flow pairs should have problem and solution", () => {
    BRAND_GRAMMAR.narrativeFlowPairs.forEach((pair) => {
      expect(pair.problem.length).toBeGreaterThan(0);
      expect(pair.solution.length).toBeGreaterThan(0);
    });
  });
});

describe("Print Spec", () => {
  it("should have correct trim dimensions", () => {
    expect(PRINT_SPEC.trimWidth).toBe(5.0);
    expect(PRINT_SPEC.trimHeight).toBe(7.0);
  });

  it("should have correct bleed dimensions", () => {
    expect(PRINT_SPEC.bleedWidth).toBe(5.25);
    expect(PRINT_SPEC.bleedHeight).toBe(7.25);
  });

  it("bleed should be 0.125 inches on each side", () => {
    expect(PRINT_SPEC.bleed).toBe(0.125);
    expect(PRINT_SPEC.bleedWidth).toBe(PRINT_SPEC.trimWidth + 2 * PRINT_SPEC.bleed);
    expect(PRINT_SPEC.bleedHeight).toBe(PRINT_SPEC.trimHeight + 2 * PRINT_SPEC.bleed);
  });

  it("should specify 300 DPI resolution", () => {
    expect(PRINT_SPEC.resolution).toBe(300);
  });

  it("should specify CMYK color mode", () => {
    expect(PRINT_SPEC.colorMode).toBe("CMYK");
  });

  it("should specify saddle-stitch binding", () => {
    expect(PRINT_SPEC.binding).toBe("saddle-stitch");
  });
});
