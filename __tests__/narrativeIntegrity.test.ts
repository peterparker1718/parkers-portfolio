/**
 * Narrative Integrity Test — Master Booklet Validation
 *
 * Single-file comprehensive test that validates the entire
 * Java Bridge Coffee booklet narrative as a unified system.
 *
 * Covers:
 * 1. Front cover textual extraction & hook layout
 * 2. Problem page messaging coherence
 * 3. Period density analysis across all hooks
 * 4. Cognitive hierarchy: 1-liner → 3-liner → visual
 * 5. Narrative arc alignment with logic chain
 * 6. Brand voice calibration compliance
 * 7. Origin profile completeness
 * 8. Cross-content consistency (no contradictions)
 */

import { BRAND, PAGES, ORIGINS, SAMPLE_FLIGHTS, TAGLINES, PALETTE, FLASH_CARDS } from "@/data/content";
import {
  FRONT_PAGE_CONCEPTS,
  LOGIC_CHAIN,
  CAUSALITY_CHAIN,
  GAP_ANALYSIS,
} from "@/data/front-page-concepts";
import { INVENTORY, CROP_THUMBNAILS, LABEL_NORMALIZATIONS } from "@/data/inventory";
import {
  classifyRhythm,
  analyzeHook,
  BRAND_GRAMMAR,
  PRINT_SPEC,
  type HookAnalysis,
} from "@/data/brand-voice";

// =========================================================================
// 1. FRONT COVER — Textual Extraction & Hook Layout
// =========================================================================

describe("Front Cover (Page 1) — Textual Layout", () => {
  const cover = PAGES.find((p) => p.id === "cover")!;

  it("cover should exist as the first page", () => {
    expect(PAGES[0].id).toBe("cover");
  });

  it("cover title should be 'JAVA BRIDGE COFFEE'", () => {
    expect(cover.title).toBe("JAVA BRIDGE COFFEE");
  });

  it("cover hook should be the brand tagline", () => {
    expect(cover.hook).toContain("Source");
    expect(cover.hook).toContain("Distribution");
  });

  it("cover body should contain family statement", () => {
    expect(cover.body.some((line) => line.includes("family"))).toBe(true);
  });

  it("cover should use dark cloth background", () => {
    expect(cover.background).toBe("cloth");
  });

  it("cover hook should be under 15 words", () => {
    const analysis = analyzeHook(cover.hook, cover.id);
    expect(analysis.wordCount).toBeLessThanOrEqual(15);
  });
});

// =========================================================================
// 2. PROBLEM PAGE — Supply Chain Crisis
// =========================================================================

describe("Problem Page (Page 2) — Supply Chain Crisis", () => {
  const problem = PAGES.find((p) => p.id === "problem")!;

  it("problem should be the second page", () => {
    expect(PAGES[1].id).toBe("problem");
  });

  it("problem hook should identify structural exposure", () => {
    expect(problem.hook.toLowerCase()).toContain("broken");
  });

  it("problem body should follow the 3-line explanation pattern", () => {
    expect(problem.body.length).toBe(3);
  });

  it("problem body should mention intermediaries", () => {
    const text = problem.body.join(" ").toLowerCase();
    expect(text.includes("intermediaries") || text.includes("middlemen")).toBe(true);
  });

  it("problem should use kraft background (alternating from cover)", () => {
    expect(problem.background).toBe("kraft");
  });

  it("problem proof layer should compare Sumatra vs East Java", () => {
    expect(problem.proof).toBeDefined();
    expect(problem.proof!.length).toBe(2);
    const proofText = problem.proof!.join(" ").toLowerCase();
    expect(proofText).toContain("sumatra");
    expect(proofText).toContain("east java");
  });
});

// =========================================================================
// 3. PERIOD DENSITY — All Hooks Analysis
// =========================================================================

describe("Period Density Analysis — All Hooks", () => {
  const analyses: HookAnalysis[] = PAGES.map((p) => analyzeHook(p.hook, p.id));

  it("should produce an analysis for every page", () => {
    expect(analyses.length).toBe(PAGES.length);
  });

  it("no hook should exceed 3 periods", () => {
    analyses.forEach((a) => {
      expect(a.periodCount).toBeLessThanOrEqual(3);
    });
  });

  it("should have rhythm variety (not all the same type)", () => {
    const rhythms = new Set(analyses.map((a) => a.rhythm));
    expect(rhythms.size).toBeGreaterThanOrEqual(2);
  });

  it("should have correct rhythm classification for known hooks", () => {
    const storyMeetingAnalysis = analyses.find((a) => a.pageId === "story-meeting")!;
    expect(storyMeetingAnalysis.rhythm).toBe("binary-impact");

    const backAnalysis = analyses.find((a) => a.pageId === "back")!;
    expect(backAnalysis.rhythm).toBe("triadic-authority");
  });
});

// =========================================================================
// 4. COGNITIVE HIERARCHY — 1-liner → 3-liner → visual
// =========================================================================

describe("Cognitive Hierarchy — Full Booklet", () => {
  it("every page has a non-empty hook (Layer 1)", () => {
    PAGES.forEach((p) => {
      expect(p.hook.trim().length).toBeGreaterThan(0);
    });
  });

  it("every page has 2-3 body lines (Layer 2)", () => {
    PAGES.forEach((p) => {
      expect(p.body.length).toBeGreaterThanOrEqual(2);
      expect(p.body.length).toBeLessThanOrEqual(3);
    });
  });

  it("strategic pages have proof layer (Layer 3)", () => {
    const strategicIds = ["problem", "bridge", "story-meeting", "story-commitment", "story-union", "vault", "offer", "jamie", "closing"];
    strategicIds.forEach((id) => {
      const page = PAGES.find((p) => p.id === id)!;
      expect(page.proof).toBeDefined();
      expect(page.proof!.length).toBeGreaterThan(0);
    });
  });
});

// =========================================================================
// 5. NARRATIVE ARC — Alignment with Logic Chain
// =========================================================================

describe("Narrative Arc — Logic Chain Alignment", () => {
  it("logic chain should have all 6 stages", () => {
    expect(Object.keys(LOGIC_CHAIN)).toEqual([
      "problem",
      "cause",
      "failure",
      "inflection",
      "shift",
      "result",
    ]);
  });

  it("problem page should align with structural exposure theme", () => {
    const problem = PAGES.find((p) => p.id === "problem")!;
    const text = [problem.hook, ...problem.body].join(" ").toLowerCase();
    expect(text.includes("broken") || text.includes("exposed")).toBe(true);
  });

  it("story-meeting page should establish trust theme", () => {
    const storyMeeting = PAGES.find((p) => p.id === "story-meeting")!;
    const text = [...storyMeeting.body].join(" ").toLowerCase();
    expect(text.includes("trust") || text.includes("opportunity") || text.includes("connection")).toBe(true);
  });

  it("story-commitment page should establish embedded presence (INFLECTION)", () => {
    expect(LOGIC_CHAIN.inflection).toContain("Chris Parker");
    const storyCommitment = PAGES.find((p) => p.id === "story-commitment")!;
    const text = [...storyCommitment.body].join(" ").toLowerCase();
    expect(text.includes("family") || text.includes("trust") || text.includes("embedded")).toBe(true);
  });

  it("vault page should align with exclusivity", () => {
    const vault = PAGES.find((p) => p.id === "vault")!;
    const text = [vault.hook, ...vault.body].join(" ").toLowerCase();
    expect(text.includes("competitor") || text.includes("private") || text.includes("never")).toBe(true);
  });

  it("causality chain should flow Marriage → ... → Sovereign supply", () => {
    expect(CAUSALITY_CHAIN[0]).toBe("Marriage");
    expect(CAUSALITY_CHAIN[CAUSALITY_CHAIN.length - 1]).toBe("Sovereign supply");
    expect(CAUSALITY_CHAIN.length).toBe(6);
  });
});

// =========================================================================
// 6. BRAND VOICE — Jargon, Keywords, Scarcity, Authority
// =========================================================================

describe("Brand Voice Compliance", () => {
  const buyerPages = PAGES.filter((p) =>
    BRAND_GRAMMAR.buyerFacingPages.includes(p.id)
  );

  it("no jargon on buyer-facing pages", () => {
    buyerPages.forEach((page) => {
      const text = [page.title, page.hook, ...page.body, ...(page.proof || [])]
        .join(" ")
        .toUpperCase();
      BRAND_GRAMMAR.jargonTerms.forEach((term) => {
        expect(text).not.toContain(term.toUpperCase());
      });
    });
  });

  it("no power word appears in more than 3 hooks", () => {
    const hooks = PAGES.map((p) => p.hook.toLowerCase());
    BRAND_GRAMMAR.powerWords.forEach((word) => {
      const count = hooks.filter((h) => h.includes(word)).length;
      expect(count).toBeLessThanOrEqual(BRAND_GRAMMAR.powerWordMaxHookOccurrences);
    });
  });

  it("scarcity signals exist in vault page", () => {
    const vault = PAGES.find((p) => p.id === "vault")!;
    const vaultText = [vault.hook, ...vault.body, ...(vault.proof || [])].join(" ").toLowerCase();

    const hasScarcity = BRAND_GRAMMAR.scarcitySignals.some((signal) =>
      vaultText.includes(signal)
    );
    expect(hasScarcity).toBe(true);
  });

  it("authority signals exist in story-union and bridge pages", () => {
    const storyUnion = PAGES.find((p) => p.id === "story-union")!;
    const bridge = PAGES.find((p) => p.id === "bridge")!;
    const combined = [
      ...storyUnion.body,
      ...(storyUnion.proof || []),
      ...bridge.body,
      ...(bridge.proof || []),
    ]
      .join(" ")
      .toLowerCase();

    const hasAuthority = BRAND_GRAMMAR.authoritySignals.some((signal) =>
      combined.toLowerCase().includes(signal.toLowerCase())
    );
    expect(hasAuthority).toBe(true);
  });
});

// =========================================================================
// 7. ORIGIN PROFILES — Completeness
// =========================================================================

describe("Origin Profile Completeness", () => {
  it("should have exactly 8 origins", () => {
    expect(ORIGINS.length).toBe(8);
  });

  it("every origin should have at least 2 tasting notes", () => {
    ORIGINS.forEach((o) => {
      expect(o.notes.length).toBeGreaterThanOrEqual(2);
    });
  });

  it("should cover Java, Bali, Flores, Aceh regions", () => {
    const regions = ORIGINS.map((o) => o.region.toLowerCase()).join(" ");
    expect(regions).toContain("java");
    expect(regions).toContain("bali");
    expect(regions).toContain("flores");
    expect(regions).toContain("aceh");
  });

  it("should include diverse processing methods", () => {
    const processes = ORIGINS.map((o) => o.process.toLowerCase());
    expect(processes.some((p) => p.includes("natural"))).toBe(true);
    expect(processes.some((p) => p.includes("washed"))).toBe(true);
    expect(processes.some((p) => p.includes("wet hulled"))).toBe(true);
  });
});

// =========================================================================
// 8. CROSS-CONTENT CONSISTENCY — No Contradictions
// =========================================================================

describe("Cross-Content Consistency", () => {
  it("background alternation should hold across all pages", () => {
    for (let i = 1; i < PAGES.length; i++) {
      expect(PAGES[i].background).not.toBe(PAGES[i - 1].background);
    }
  });

  it("all 5 front page concepts should reference Chris Parker", () => {
    expect(FRONT_PAGE_CONCEPTS.length).toBe(5);
    FRONT_PAGE_CONCEPTS.forEach((c) => {
      expect(c.founder.toLowerCase()).toContain("chris parker");
    });
  });

  it("gap analysis should have a solution for every gap", () => {
    GAP_ANALYSIS.forEach((g) => {
      expect(g.solution.trim().length).toBeGreaterThan(0);
    });
  });

  it("inventory lots should all have SCA scores above 80", () => {
    INVENTORY.forEach((lot) => {
      expect(lot.score).toBeGreaterThanOrEqual(80);
    });
  });

  it("crop thumbnails should all have normalized labels (no raw misspellings)", () => {
    CROP_THUMBNAILS.forEach((t) => {
      expect(t.label).not.toMatch(/Temanggury/);
      expect(t.label).not.toMatch(/Peabery/);
      expect(t.label).not.toMatch(/Hermetre/);
    });
  });

  it("print spec bleed math should be correct", () => {
    expect(PRINT_SPEC.bleedWidth).toBe(PRINT_SPEC.trimWidth + 2 * PRINT_SPEC.bleed);
    expect(PRINT_SPEC.bleedHeight).toBe(PRINT_SPEC.trimHeight + 2 * PRINT_SPEC.bleed);
  });

  it("taglines should not duplicate any page hook", () => {
    const hooks = PAGES.map((p) => p.hook);
    TAGLINES.forEach((tagline) => {
      expect(hooks).not.toContain(tagline);
    });
  });

  it("flash cards should have exactly 10 cards", () => {
    expect(FLASH_CARDS.length).toBe(10);
  });

  it("flash cards should have no duplicate IDs", () => {
    const ids = FLASH_CARDS.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
