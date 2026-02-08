/**
 * Messaging Coherence Tests
 *
 * Validates that the Java Bridge Coffee narrative follows
 * the strategic copy architecture rules:
 *
 * 1. Every page: 1-liner hook → 3-liner body → visual proof
 * 2. Alternating cloth/kraft backgrounds
 * 3. Brand name consistency
 * 4. Founder appears where required
 * 5. Logic chain flows correctly
 * 6. No messaging contradictions
 * 7. Revenue model coherence
 */

import { BRAND, PAGES, ORIGINS, SAMPLE_FLIGHTS, TAGLINES } from "@/data/content";
import {
  FRONT_PAGE_CONCEPTS,
  LOGIC_CHAIN,
  CAUSALITY_CHAIN,
  GAP_ANALYSIS,
} from "@/data/front-page-concepts";

describe("Page Hierarchy: 1-liner → 3-liner → visual", () => {
  it("every page hook should be concise (max 3 short phrases)", () => {
    PAGES.forEach((page) => {
      // Hook should be a short phrase or a few short phrases (tagline-style)
      const sentenceEnds = page.hook.match(/[.!?]/g) || [];
      expect(sentenceEnds.length).toBeLessThanOrEqual(3);
      // Should fit on one or two lines (under 100 characters)
      expect(page.hook.length).toBeLessThanOrEqual(100);
    });
  });

  it("every page body should have 2-3 lines", () => {
    PAGES.forEach((page) => {
      expect(page.body.length).toBeGreaterThanOrEqual(2);
      expect(page.body.length).toBeLessThanOrEqual(3);
    });
  });

  it("proof/visual layer should exist on strategic pages", () => {
    const pagesNeedingProof = ["bridge", "shift", "founders", "science", "vault", "advantage", "revenue", "decision"];
    pagesNeedingProof.forEach((id) => {
      const page = PAGES.find((p) => p.id === id);
      expect(page).toBeDefined();
      expect(page!.proof).toBeDefined();
      expect(page!.proof!.length).toBeGreaterThan(0);
    });
  });
});

describe("Background Alternation", () => {
  it("should alternate between cloth and kraft backgrounds", () => {
    for (let i = 1; i < PAGES.length; i++) {
      expect(PAGES[i].background).not.toBe(PAGES[i - 1].background);
    }
  });

  it("cover should use cloth background", () => {
    expect(PAGES[0].background).toBe("cloth");
  });

  it("back cover should use cloth background", () => {
    expect(PAGES[PAGES.length - 1].background).toBe("cloth");
  });
});

describe("Brand Name Consistency", () => {
  it("brand name should appear on cover", () => {
    const cover = PAGES.find((p) => p.id === "cover")!;
    expect(cover.title).toContain("JAVA BRIDGE");
  });

  it("brand name should appear on back cover", () => {
    const back = PAGES.find((p) => p.id === "back")!;
    expect(back.title).toContain("JAVA BRIDGE");
  });

  it("founder name should appear on founders page", () => {
    const founders = PAGES.find((p) => p.id === "founders")!;
    const allText = [founders.hook, ...founders.body, ...(founders.proof || [])].join(" ");
    expect(allText).toContain("Chris Parker");
  });

  it("cofounder name should appear on founders page", () => {
    const founders = PAGES.find((p) => p.id === "founders")!;
    const allText = [founders.hook, ...founders.body, ...(founders.proof || [])].join(" ");
    expect(allText.toLowerCase()).toContain("fika");
  });

  it("founder name should appear on back cover", () => {
    const back = PAGES.find((p) => p.id === "back")!;
    const allText = [back.hook, ...back.body].join(" ");
    expect(allText).toContain("Chris Parker");
  });
});

describe("Narrative Logic Chain", () => {
  it("bridge page should address the trust problem", () => {
    const bridge = PAGES.find((p) => p.id === "bridge")!;
    const text = [bridge.hook, ...bridge.body].join(" ").toLowerCase();
    expect(text).toContain("trust");
  });

  it("shift page should address transactional vs. sovereign model", () => {
    const shift = PAGES.find((p) => p.id === "shift")!;
    const text = [shift.hook, ...shift.body].join(" ").toLowerCase();
    expect(
      text.includes("transactional") ||
      text.includes("rented") ||
      text.includes("fly-in") ||
      text.includes("sovereign")
    ).toBe(true);
  });

  it("founders page should establish embedded presence", () => {
    const founders = PAGES.find((p) => p.id === "founders")!;
    const text = [founders.hook, ...founders.body].join(" ").toLowerCase();
    expect(
      text.includes("married") ||
      text.includes("embedded") ||
      text.includes("family")
    ).toBe(true);
  });

  it("science page should establish scientific credibility", () => {
    const science = PAGES.find((p) => p.id === "science")!;
    const text = [science.hook, ...science.body, ...(science.proof || [])].join(" ").toLowerCase();
    expect(
      text.includes("phd") ||
      text.includes("genetic") ||
      text.includes("scientific") ||
      text.includes("defect")
    ).toBe(true);
  });

  it("vault page should establish origin control", () => {
    const vault = PAGES.find((p) => p.id === "vault")!;
    const text = [vault.hook, ...vault.body].join(" ").toLowerCase();
    expect(
      text.includes("control") ||
      text.includes("origin") ||
      text.includes("vault") ||
      text.includes("reserves")
    ).toBe(true);
  });

  it("decision page should create urgency", () => {
    const decision = PAGES.find((p) => p.id === "decision")!;
    const text = [decision.hook, ...decision.body].join(" ").toLowerCase();
    expect(
      text.includes("competitor") ||
      text.includes("partner") ||
      text.includes("leverage") ||
      text.includes("power")
    ).toBe(true);
  });
});

describe("Revenue Model Coherence", () => {
  it("revenue page should mention sourcing fee percentage", () => {
    const revenue = PAGES.find((p) => p.id === "revenue")!;
    const text = [...revenue.body, ...(revenue.proof || [])].join(" ");
    expect(text).toContain("8");
    expect(text).toContain("12");
  });

  it("revenue page should show margin advantage over brokers", () => {
    const revenue = PAGES.find((p) => p.id === "revenue")!;
    const text = [...revenue.body, ...(revenue.proof || [])].join(" ");
    expect(
      text.includes("broker") ||
      text.includes("$3.80") ||
      text.includes("$1.20") ||
      text.includes("$2,600")
    ).toBe(true);
  });

  it("sample flights should be referenced in revenue model", () => {
    const revenue = PAGES.find((p) => p.id === "revenue")!;
    const text = [...revenue.body].join(" ").toLowerCase();
    expect(text.includes("sample") || text.includes("flight") || text.includes("$75") || text.includes("$150")).toBe(true);
  });

  it("sample flights should all credit toward first order", () => {
    // This is a business rule: every sample flight credits toward first order
    // Validated by the presence of credit language in the content
    const revenue = PAGES.find((p) => p.id === "revenue")!;
    const text = [...revenue.body].join(" ").toLowerCase();
    expect(text.includes("credit")).toBe(true);
  });
});

describe("Front Page Concepts", () => {
  it("should have exactly 5 front page concepts", () => {
    expect(FRONT_PAGE_CONCEPTS.length).toBe(5);
  });

  it("should have no duplicate concept IDs", () => {
    const ids = FRONT_PAGE_CONCEPTS.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it.each(FRONT_PAGE_CONCEPTS.map((c) => [c.frame, c]))(
    "concept '%s' should follow 1-liner → 3-liner hierarchy",
    (_frame, concept) => {
      // Hook is 1 line
      expect(concept.hook.trim().length).toBeGreaterThan(0);
      // Body is exactly 3 lines
      expect(concept.body.length).toBe(3);
      concept.body.forEach((line) => {
        expect(line.trim().length).toBeGreaterThan(0);
      });
    }
  );

  it.each(FRONT_PAGE_CONCEPTS.map((c) => [c.frame, c]))(
    "concept '%s' should reference the founder",
    (_frame, concept) => {
      expect(concept.founder.toLowerCase()).toContain("chris parker");
    }
  );

  it.each(FRONT_PAGE_CONCEPTS.map((c) => [c.frame, c]))(
    "concept '%s' should have visual logic direction",
    (_frame, concept) => {
      expect(concept.visualLogic.trim().length).toBeGreaterThan(10);
    }
  );
});

describe("Logic Chain Completeness", () => {
  it("should have all 6 chain stages", () => {
    expect(LOGIC_CHAIN.problem).toBeTruthy();
    expect(LOGIC_CHAIN.cause).toBeTruthy();
    expect(LOGIC_CHAIN.failure).toBeTruthy();
    expect(LOGIC_CHAIN.inflection).toBeTruthy();
    expect(LOGIC_CHAIN.shift).toBeTruthy();
    expect(LOGIC_CHAIN.result).toBeTruthy();
  });

  it("problem stage should reference trust", () => {
    expect(LOGIC_CHAIN.problem.toLowerCase()).toContain("trust");
  });

  it("inflection should reference Chris Parker", () => {
    expect(LOGIC_CHAIN.inflection).toContain("Chris Parker");
  });

  it("result should reference sovereign", () => {
    expect(LOGIC_CHAIN.result.toLowerCase()).toContain("sovereign");
  });
});

describe("Causality Chain", () => {
  it("should have exactly 6 steps", () => {
    expect(CAUSALITY_CHAIN.length).toBe(6);
  });

  it("should start with Marriage and end with Sovereign supply", () => {
    expect(CAUSALITY_CHAIN[0]).toBe("Marriage");
    expect(CAUSALITY_CHAIN[CAUSALITY_CHAIN.length - 1]).toBe("Sovereign supply");
  });
});

describe("Gap Analysis", () => {
  it("should have at least 5 gap-solution pairs", () => {
    expect(GAP_ANALYSIS.length).toBeGreaterThanOrEqual(5);
  });

  it("every gap should have problem and solution", () => {
    GAP_ANALYSIS.forEach((gap) => {
      expect(gap.problem.trim().length).toBeGreaterThan(0);
      expect(gap.solution.trim().length).toBeGreaterThan(0);
    });
  });

  it("should cover quality control gap", () => {
    const qc = GAP_ANALYSIS.find((g) => g.gap === "quality-control");
    expect(qc).toBeDefined();
    expect(qc!.solution.toLowerCase()).toContain("2%");
  });

  it("should cover access to private reserves gap", () => {
    const access = GAP_ANALYSIS.find((g) => g.gap === "private-reserves");
    expect(access).toBeDefined();
  });
});

describe("Cross-Content Consistency", () => {
  it("number of origins referenced should match origin profiles count", () => {
    expect(ORIGINS.length).toBe(8);
    // Sovereign flight should cover all 8
    const sovereign = SAMPLE_FLIGHTS.find((f) => f.name === "Sovereign Flight");
    expect(sovereign).toBeDefined();
    expect(sovereign!.origins).toBe(8);
  });

  it("taglines should not duplicate page hooks", () => {
    const hooks = PAGES.map((p) => p.hook);
    TAGLINES.forEach((tagline) => {
      expect(hooks).not.toContain(tagline);
    });
  });

  it("all front page concepts should use 'Java Bridge' in frame or content", () => {
    FRONT_PAGE_CONCEPTS.forEach((concept) => {
      const allText = [
        concept.hook,
        ...concept.body,
        concept.closer,
        concept.founder,
      ].join(" ");
      expect(
        allText.toLowerCase().includes("java bridge") ||
        allText.toLowerCase().includes("chris parker")
      ).toBe(true);
    });
  });
});
