/**
 * Cognitive Load Tests
 *
 * Validates that hooks follow the "one emotional strike" principle:
 * - Under 15 words per hook
 * - Under 100 characters per hook
 * - Period rhythm is classified and bounded
 *
 * Also validates body lines don't exceed readable length.
 */

import { PAGES } from "@/data/content";
import { BRAND_GRAMMAR, analyzeHook, type HookAnalysis } from "@/data/brand-voice";

const { maxWordsPerHook, maxCharsPerHook, maxPeriodsPerHook } = BRAND_GRAMMAR;

describe("Cognitive Load — Hook Word Count", () => {
  const analyses: HookAnalysis[] = PAGES.map((p) => analyzeHook(p.hook, p.id));

  it.each(analyses.map((a) => [a.pageId, a]))(
    "page '%s' hook should have at most %i words",
    (_id, analysis) => {
      expect(analysis.wordCount).toBeLessThanOrEqual(maxWordsPerHook);
    }
  );

  it.each(analyses.map((a) => [a.pageId, a]))(
    "page '%s' hook should have at most %i characters",
    (_id, analysis) => {
      expect(analysis.charCount).toBeLessThanOrEqual(maxCharsPerHook);
    }
  );

  it.each(analyses.map((a) => [a.pageId, a]))(
    "page '%s' hook should have at most %i periods",
    (_id, analysis) => {
      expect(analysis.periodCount).toBeLessThanOrEqual(maxPeriodsPerHook);
    }
  );
});

describe("Cognitive Load — Hook Rhythm Distribution", () => {
  const analyses = PAGES.map((p) => analyzeHook(p.hook, p.id));

  it("should have at least one declarative-power hook", () => {
    expect(analyses.some((a) => a.rhythm === "declarative-power")).toBe(true);
  });

  it("should have at least one binary-impact hook", () => {
    expect(analyses.some((a) => a.rhythm === "binary-impact")).toBe(true);
  });

  it("should not have more than 2 triadic-authority hooks", () => {
    const triadics = analyses.filter((a) => a.rhythm === "triadic-authority");
    expect(triadics.length).toBeLessThanOrEqual(2);
  });

  it("binary-impact hooks should not exceed 60% of all hooks", () => {
    const binaryCount = analyses.filter((a) => a.rhythm === "binary-impact").length;
    expect(binaryCount / analyses.length).toBeLessThanOrEqual(0.6);
  });
});

describe("Cognitive Load — Body Line Length", () => {
  it("no body line should exceed 120 characters", () => {
    PAGES.forEach((page) => {
      page.body.forEach((line, i) => {
        if (line.length > 120) {
          fail(
            `Page "${page.id}" body line ${i} is ${line.length} chars: "${line.slice(0, 50)}..."`
          );
        }
      });
    });
  });

  it("no body line should exceed 25 words", () => {
    PAGES.forEach((page) => {
      page.body.forEach((line, i) => {
        const wordCount = line.split(/\s+/).length;
        if (wordCount > 25) {
          fail(
            `Page "${page.id}" body line ${i} has ${wordCount} words`
          );
        }
      });
    });
  });
});
