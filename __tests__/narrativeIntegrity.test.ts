/**
 * Narrative Integrity Test — Master Booklet Validation
 *
 * Single-file comprehensive test that validates the entire
 * Java Bridge Coffee booklet narrative as a unified system.
 *
 * Covers:
 * 1. Front cover textual extraction & hook layout
 * 2. Page 2 (Bridge/Thesis) messaging coherence
 * 3. Period density analysis across all hooks
 * 4. Cognitive hierarchy: 1-liner → 3-liner → visual
 * 5. Narrative arc: PROBLEM → CAUSE → FAILURE → INFLECTION → SHIFT → RESULT
 * 6. Brand voice calibration compliance
 * 7. Revenue model internal consistency
 * 8. Origin profile completeness
 * 9. Cross-content consistency (no contradictions)
 */

import { BRAND, PAGES, ORIGINS, SAMPLE_FLIGHTS, TAGLINES, PALETTE } from "@/data/content";
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

  it("cover hook should be the brand's primary tagline", () => {
    expect(cover.hook).toBe("Two Javas. One Bridge.");
  });

  it("cover body should contain brand tagline and family statement", () => {
    expect(cover.body).toContain("We Are The Source & The Distribution.");
    expect(cover.body).toContain(
      "We don't contract the farm. We are the family."
    );
  });

  it("cover should use dark cloth background", () => {
    expect(cover.background).toBe("cloth");
  });

  it("cover hook period density should be binary-impact (2 periods)", () => {
    const analysis = analyzeHook(cover.hook, cover.id);
    expect(analysis.periodCount).toBe(2);
    expect(analysis.rhythm).toBe("binary-impact");
  });

  it("cover hook should be under 15 words", () => {
    const analysis = analyzeHook(cover.hook, cover.id);
    expect(analysis.wordCount).toBeLessThanOrEqual(15);
  });
});

// =========================================================================
// 2. PAGE 2 (THE BRIDGE) — Thesis Statement Coherence
// =========================================================================

describe("Page 2 (The Bridge) — Thesis Statement", () => {
  const bridge = PAGES.find((p) => p.id === "bridge")!;

  it("bridge should be the second page", () => {
    expect(PAGES[1].id).toBe("bridge");
  });

  it("bridge hook should state the core problem", () => {
    expect(bridge.hook).toBe(
      "The real problem isn't coffee. It's trust at scale across borders."
    );
  });

  it("bridge body should follow the 3-line explanation pattern", () => {
    expect(bridge.body.length).toBe(3);
  });

  it("bridge body line 1 should acknowledge Indonesia's quality", () => {
    expect(bridge.body[0].toLowerCase()).toContain("extraordinary");
  });

  it("bridge body line 2 should identify the translation gap", () => {
    expect(bridge.body[1].toLowerCase()).toContain("translate");
  });

  it("bridge body line 3 should state the structural solution", () => {
    expect(bridge.body[2].toLowerCase()).toContain("structure");
  });

  it("bridge should use kraft background (alternating from cover)", () => {
    expect(bridge.background).toBe("kraft");
  });

  it("bridge proof layer should establish the three-pillar system", () => {
    expect(bridge.proof).toBeDefined();
    expect(bridge.proof!.length).toBe(3);
    expect(bridge.proof!.some((p) => p.includes("SCA"))).toBe(true);
    expect(bridge.proof!.some((p) => p.includes("Science"))).toBe(true);
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
    const coverAnalysis = analyses.find((a) => a.pageId === "cover")!;
    expect(coverAnalysis.rhythm).toBe("binary-impact");

    const shiftAnalysis = analyses.find((a) => a.pageId === "shift")!;
    expect(shiftAnalysis.rhythm).toBe("declarative-power");

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
    const strategicIds = ["bridge", "shift", "founders", "science", "vault", "advantage", "revenue", "decision"];
    strategicIds.forEach((id) => {
      const page = PAGES.find((p) => p.id === id)!;
      expect(page.proof).toBeDefined();
      expect(page.proof!.length).toBeGreaterThan(0);
    });
  });
});

// =========================================================================
// 5. NARRATIVE ARC — PROBLEM → CAUSE → FAILURE → INFLECTION → SHIFT → RESULT
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

  it("bridge page should align with PROBLEM stage", () => {
    expect(LOGIC_CHAIN.problem.toLowerCase()).toContain("trust");
    const bridge = PAGES.find((p) => p.id === "bridge")!;
    expect(bridge.hook.toLowerCase()).toContain("trust");
  });

  it("shift page should align with FAILURE stage", () => {
    expect(LOGIC_CHAIN.failure.toLowerCase()).toContain("rented");
    const shift = PAGES.find((p) => p.id === "shift")!;
    const text = [...shift.body].join(" ").toLowerCase();
    expect(text).toContain("rented");
  });

  it("founders page should align with INFLECTION stage", () => {
    expect(LOGIC_CHAIN.inflection).toContain("Chris Parker");
    const founders = PAGES.find((p) => p.id === "founders")!;
    const text = [...founders.body].join(" ");
    expect(text).toContain("Chris Parker");
  });

  it("vault page should align with RESULT stage", () => {
    expect(LOGIC_CHAIN.result.toLowerCase()).toContain("sovereign");
    const vault = PAGES.find((p) => p.id === "vault")!;
    const text = [vault.hook, ...vault.body].join(" ").toLowerCase();
    expect(text.includes("control") || text.includes("reserves")).toBe(true);
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

  it("scarcity signals exist in vault and origins pages", () => {
    const vault = PAGES.find((p) => p.id === "vault")!;
    const origins = PAGES.find((p) => p.id === "origins")!;
    const vaultText = [vault.hook, ...vault.body].join(" ").toLowerCase();
    const originsText = [origins.hook, ...origins.body].join(" ").toLowerCase();
    const combined = vaultText + " " + originsText;

    const hasScarcity = BRAND_GRAMMAR.scarcitySignals.some((signal) =>
      combined.includes(signal)
    );
    expect(hasScarcity).toBe(true);
  });

  it("authority signals exist in science and advantage pages", () => {
    const science = PAGES.find((p) => p.id === "science")!;
    const advantage = PAGES.find((p) => p.id === "advantage")!;
    const combined = [
      ...science.body,
      ...(science.proof || []),
      ...advantage.body,
      ...(advantage.proof || []),
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
// 7. REVENUE MODEL — Internal Consistency
// =========================================================================

describe("Revenue Model Integrity", () => {
  const revenue = PAGES.find((p) => p.id === "revenue")!;
  const revenueText = [...revenue.body, ...(revenue.proof || [])].join(" ");

  it("should reference sourcing fee range (8-12%)", () => {
    expect(revenueText).toContain("8");
    expect(revenueText).toContain("12");
  });

  it("should reference sample program with credit", () => {
    expect(revenueText.toLowerCase()).toContain("credit");
  });

  it("should show margin advantage", () => {
    expect(revenueText).toContain("$3.80");
    expect(revenueText).toContain("$1.20");
  });

  it("sample flights should be sorted by ascending price", () => {
    for (let i = 1; i < SAMPLE_FLIGHTS.length; i++) {
      expect(SAMPLE_FLIGHTS[i].price).toBeGreaterThan(SAMPLE_FLIGHTS[i - 1].price);
    }
  });

  it("sovereign flight should cover all 8 origins", () => {
    const sovereign = SAMPLE_FLIGHTS.find((f) => f.name === "Sovereign Flight")!;
    expect(sovereign.origins).toBe(ORIGINS.length);
  });
});

// =========================================================================
// 8. ORIGIN PROFILES — Completeness
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
// 9. CROSS-CONTENT CONSISTENCY — No Contradictions
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
});
