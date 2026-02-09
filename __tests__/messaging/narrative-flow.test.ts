/**
 * Narrative Flow / No-Contradictions Tests
 *
 * Validates that the booklet narrative always moves
 * from problem → solution, never the reverse.
 *
 * The shift page establishes "rented access" as the problem.
 * The vault page establishes "permanent access" as the solution.
 * These must never appear in contradiction.
 */

import { PAGES } from "@/data/content";
import { BRAND_GRAMMAR } from "@/data/brand-voice";

const { narrativeFlowPairs } = BRAND_GRAMMAR;

describe("Narrative Flow — Problem → Solution Direction", () => {
  // Pages are ordered by their position in the booklet
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

      // If both words exist, problem should appear before or at the same page as solution
      if (firstProblemIndex !== -1 && firstSolutionIndex !== -1) {
        expect(firstProblemIndex).toBeLessThanOrEqual(firstSolutionIndex);
      }
    }
  );
});

describe("Narrative Flow — Shift Page vs. Vault Page", () => {
  const shift = PAGES.find((p) => p.id === "shift")!;
  const vault = PAGES.find((p) => p.id === "vault")!;
  const shiftIdx = PAGES.findIndex((p) => p.id === "shift");
  const vaultIdx = PAGES.findIndex((p) => p.id === "vault");

  it("shift page should come before vault page", () => {
    expect(shiftIdx).toBeLessThan(vaultIdx);
  });

  it("shift page should frame the problem (rented/transactional)", () => {
    const text = [shift.hook, ...shift.body].join(" ").toLowerCase();
    expect(text.includes("rented") || text.includes("transactional")).toBe(true);
  });

  it("vault page should frame the solution (control/permanent)", () => {
    const text = [vault.hook, ...vault.body].join(" ").toLowerCase();
    expect(
      text.includes("control") ||
      text.includes("reserves") ||
      text.includes("acquiring")
    ).toBe(true);
  });
});

describe("Narrative Flow — Bridge → Founders → Science sequence", () => {
  const bridgeIdx = PAGES.findIndex((p) => p.id === "bridge");
  const foundersIdx = PAGES.findIndex((p) => p.id === "founders");
  const scienceIdx = PAGES.findIndex((p) => p.id === "science");

  it("bridge (problem) should come before founders (inflection)", () => {
    expect(bridgeIdx).toBeLessThan(foundersIdx);
  });

  it("founders (inflection) should come before science (method)", () => {
    expect(foundersIdx).toBeLessThan(scienceIdx);
  });
});

describe("Narrative Flow — Decision page is penultimate", () => {
  it("decision should be the second-to-last page (before back cover)", () => {
    const decisionIdx = PAGES.findIndex((p) => p.id === "decision");
    expect(decisionIdx).toBe(PAGES.length - 2);
  });
});
