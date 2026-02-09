/**
 * Keyword Density Validation
 *
 * Ensures no single power word dominates the hook layer,
 * preventing reader fatigue across the booklet.
 *
 * Rule: No power word should appear in more than 3 hooks total.
 */

import { PAGES } from "@/data/content";
import { BRAND_GRAMMAR } from "@/data/brand-voice";

const { powerWords, powerWordMaxHookOccurrences } = BRAND_GRAMMAR;

describe("Keyword Density — Hook Layer", () => {
  const allHooks = PAGES.map((p) => p.hook.toLowerCase());

  it.each(powerWords.map((w) => [w]))(
    "power word '%s' should appear in at most %i hooks",
    (word) => {
      const count = allHooks.filter((hook) => hook.includes(word)).length;
      expect(count).toBeLessThanOrEqual(powerWordMaxHookOccurrences);
    }
  );

  it("should not have any single word appearing in more than half of all hooks", () => {
    const halfPages = Math.ceil(PAGES.length / 2);
    const wordCounts: Record<string, number> = {};

    allHooks.forEach((hook) => {
      const words = hook
        .replace(/[.!?,;:'"—–-]/g, "")
        .split(/\s+/)
        .filter((w) => w.length > 3); // skip small words
      const uniqueWords = new Set(words);
      uniqueWords.forEach((word) => {
        wordCounts[word] = (wordCounts[word] || 0) + 1;
      });
    });

    Object.entries(wordCounts).forEach(([word, count]) => {
      if (count > halfPages) {
        fail(
          `Word "${word}" appears in ${count}/${PAGES.length} hooks (max ${halfPages})`
        );
      }
    });
  });
});

describe("Keyword Density — Body Layer", () => {
  it("word 'sovereign' should not appear in more than 4 page bodies", () => {
    const count = PAGES.filter((p) =>
      p.body.join(" ").toLowerCase().includes("sovereign")
    ).length;
    expect(count).toBeLessThanOrEqual(4);
  });

  it("word 'control' should not appear in more than 4 page bodies", () => {
    const count = PAGES.filter((p) =>
      p.body.join(" ").toLowerCase().includes("control")
    ).length;
    expect(count).toBeLessThanOrEqual(4);
  });
});
