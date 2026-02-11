/**
 * Narrative Flow / No-Contradictions Tests
 *
 * Validates that the booklet narrative always moves
 * from problem → solution, never the reverse.
 *
 * The problem page establishes the broken supply chain.
 * The MY STORY pages establish trust and family.
 * The vault page establishes exclusive access as the solution.
 */

import { PAGES } from "@/data/content";
import { BRAND_GRAMMAR } from "@/data/brand-voice";

const { narrativeFlowPairs } = BRAND_GRAMMAR;

describe("Narrative Flow — Problem → Solution Direction", () => {
  const pageOrder = PAGES.map((p) => p.id);

  it.each(
    narrativeFlowPairs.map((pair) => [pair.problem, pair.solution, pair])
  )(
    "problem word '%s' should appear before solution word '%s' in page order",
    (problemWord, solutionWord) => {
      let firstProblemIndex = -1;
      let firstSolutionIndex = -1;

      PAGES.forEach((page, idx) => {
        const text = [page.hook, ...page.body, ...(page.proof || [])].join(" ").toLowerCase();
        if (text.includes(problemWord) && firstProblemIndex === -1) {
          firstProblemIndex = idx;
        }
        if (text.includes(solutionWord) && firstSolutionIndex === -1) {
          firstSolutionIndex = idx;
        }
      });

      if (firstProblemIndex !== -1 && firstSolutionIndex !== -1) {
        expect(firstProblemIndex).toBeLessThanOrEqual(firstSolutionIndex);
      }
    }
  );
});

describe("Narrative Flow — Problem Page vs. Vault Page", () => {
  const problem = PAGES.find((p) => p.id === "problem")!;
  const vault = PAGES.find((p) => p.id === "vault")!;
  const problemIdx = PAGES.findIndex((p) => p.id === "problem");
  const vaultIdx = PAGES.findIndex((p) => p.id === "vault");

  it("problem page should come before vault page", () => {
    expect(problemIdx).toBeLessThan(vaultIdx);
  });

  it("problem page should frame the broken supply chain", () => {
    const text = [problem.hook, ...problem.body].join(" ").toLowerCase();
    expect(text.includes("broken") || text.includes("exposed") || text.includes("intermediaries")).toBe(true);
  });

  it("vault page should frame the exclusivity solution", () => {
    const text = [vault.hook, ...vault.body].join(" ").toLowerCase();
    expect(
      text.includes("competitor") ||
      text.includes("private") ||
      text.includes("reserve") ||
      text.includes("never")
    ).toBe(true);
  });
});

describe("Narrative Flow — Bridge → MY STORY → Vault sequence", () => {
  const bridgeIdx = PAGES.findIndex((p) => p.id === "bridge");
  const storyCommitmentIdx = PAGES.findIndex((p) => p.id === "story-commitment");
  const storyUnionIdx = PAGES.findIndex((p) => p.id === "story-union");

  it("bridge (platform) should come before story-commitment (inflection)", () => {
    expect(bridgeIdx).toBeLessThan(storyCommitmentIdx);
  });

  it("story-commitment (inflection) should come before story-union (method)", () => {
    expect(storyCommitmentIdx).toBeLessThan(storyUnionIdx);
  });
});

describe("Narrative Flow — Closing page is penultimate", () => {
  it("closing should be the second-to-last page (before back cover)", () => {
    const closingIdx = PAGES.findIndex((p) => p.id === "closing");
    expect(closingIdx).toBe(PAGES.length - 2);
  });
});
