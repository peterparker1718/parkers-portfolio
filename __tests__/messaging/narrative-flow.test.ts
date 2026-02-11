/**
 * Narrative Flow / No-Contradictions Tests
 *
 * Validates that the booklet narrative always moves
 * from problem → solution, never the reverse.
 *
 * The MY STORY pages establish trust and family as the foundation.
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

describe("Narrative Flow — MY STORY Pages vs. Vault Page", () => {
  const storyMeeting = PAGES.find((p) => p.id === "story-meeting")!;
  const vault = PAGES.find((p) => p.id === "vault")!;
  const storyMeetingIdx = PAGES.findIndex((p) => p.id === "story-meeting");
  const vaultIdx = PAGES.findIndex((p) => p.id === "vault");

  it("story-meeting page should come before vault page", () => {
    expect(storyMeetingIdx).toBeLessThan(vaultIdx);
  });

  it("story-meeting page should establish the trust/opportunity theme", () => {
    const text = [storyMeeting.hook, ...storyMeeting.body].join(" ").toLowerCase();
    expect(text.includes("trust") || text.includes("opportunity") || text.includes("connection")).toBe(true);
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

describe("Narrative Flow — Bridge → MY STORY → Vault sequence", () => {
  const bridgeIdx = PAGES.findIndex((p) => p.id === "bridge");
  const storyCommitmentIdx = PAGES.findIndex((p) => p.id === "story-commitment");
  const storyUnionIdx = PAGES.findIndex((p) => p.id === "story-union");

  it("bridge (problem) should come before story-commitment (inflection)", () => {
    expect(bridgeIdx).toBeLessThan(storyCommitmentIdx);
  });

  it("story-commitment (inflection) should come before story-union (method)", () => {
    expect(storyCommitmentIdx).toBeLessThan(storyUnionIdx);
  });
});

describe("Narrative Flow — Decision page is penultimate", () => {
  it("decision should be the second-to-last page (before back cover)", () => {
    const decisionIdx = PAGES.findIndex((p) => p.id === "decision");
    expect(decisionIdx).toBe(PAGES.length - 2);
  });
});
