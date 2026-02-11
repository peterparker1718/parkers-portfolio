/**
 * Content Integrity Tests
 *
 * Validates the structural integrity of all content data:
 * - Every page has required fields
 * - Origins have valid tasting notes
 * - Sample flights have valid pricing
 * - No duplicate IDs
 */

import {
  BRAND,
  PAGES,
  ORIGINS,
  SAMPLE_FLIGHTS,
  TAGLINES,
  PALETTE,
  type PageContent,
} from "@/data/content";

describe("Brand Constants", () => {
  it("should have all required brand fields", () => {
    expect(BRAND.name).toBe("Java Bridge Coffee");
    expect(BRAND.founder).toBe("Chris Parker");
    expect(BRAND.cofounder).toBe("Dr. Fika Ayu Safitri");
    expect(BRAND.location).toContain("East Java");
    expect(BRAND.contact.email).toBeTruthy();
    expect(BRAND.contact.website).toBeTruthy();
  });

  it("should have all palette colors defined", () => {
    expect(PALETTE.cloth).toMatch(/^#[0-9a-fA-F]{6}$/);
    expect(PALETTE.kraft).toMatch(/^#[0-9a-fA-F]{6}$/);
    expect(PALETTE.gold).toMatch(/^#[0-9a-fA-F]{6}$/);
    expect(PALETTE.cream).toMatch(/^#[0-9a-fA-F]{6}$/);
    expect(PALETTE.espresso).toMatch(/^#[0-9a-fA-F]{6}$/);
    expect(PALETTE.terracotta).toMatch(/^#[0-9a-fA-F]{6}$/);
  });
});

describe("Page Content Integrity", () => {
  it("should have at least 10 pages", () => {
    expect(PAGES.length).toBeGreaterThanOrEqual(10);
  });

  it("should have no duplicate page IDs", () => {
    const ids = PAGES.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it.each(PAGES.map((p) => [p.id, p] as [string, PageContent]))(
    "page '%s' should have non-empty title, hook, and body",
    (_id, page) => {
      expect(page.title.trim().length).toBeGreaterThan(0);
      expect(page.hook.trim().length).toBeGreaterThan(0);
      expect(page.body.length).toBeGreaterThanOrEqual(2);
      page.body.forEach((line) => {
        expect(line.trim().length).toBeGreaterThan(0);
      });
    }
  );

  it.each(PAGES.map((p) => [p.id, p] as [string, PageContent]))(
    "page '%s' should have valid background type",
    (_id, page) => {
      expect(["cloth", "kraft"]).toContain(page.background);
    }
  );

  it("should start with cover page", () => {
    expect(PAGES[0].id).toBe("cover");
  });

  it("should end with back cover page", () => {
    expect(PAGES[PAGES.length - 1].id).toBe("back");
  });

  it("should include all required sections", () => {
    const ids = PAGES.map((p) => p.id);
    const required = [
      "cover",
      "bridge",
      "story-meeting",
      "story-commitment",
      "story-union",
      "vault",
      "advantage",
      "origins",
      "revenue",
      "decision",
      "back",
    ];
    required.forEach((section) => {
      expect(ids).toContain(section);
    });
  });
});

describe("Origin Profiles", () => {
  it("should have exactly 8 origin profiles", () => {
    expect(ORIGINS.length).toBe(8);
  });

  it.each(ORIGINS.map((o) => [o.name, o]))(
    "origin '%s' should have region, process, and at least 2 tasting notes",
    (_name, origin) => {
      expect(origin.region.trim().length).toBeGreaterThan(0);
      expect(origin.process.trim().length).toBeGreaterThan(0);
      expect(origin.notes.length).toBeGreaterThanOrEqual(2);
    }
  );

  it("should cover key Indonesian regions", () => {
    const regions = ORIGINS.map((o) => o.region.toLowerCase());
    expect(regions.some((r) => r.includes("java"))).toBe(true);
    expect(regions.some((r) => r.includes("bali"))).toBe(true);
    expect(regions.some((r) => r.includes("flores"))).toBe(true);
    expect(regions.some((r) => r.includes("aceh") || r.includes("gayo"))).toBe(true);
  });

  it("should include diverse processing methods", () => {
    const processes = ORIGINS.map((o) => o.process.toLowerCase());
    expect(processes.some((p) => p.includes("natural"))).toBe(true);
    expect(processes.some((p) => p.includes("washed"))).toBe(true);
    expect(processes.some((p) => p.includes("wet hulled"))).toBe(true);
  });
});

describe("Sample Flights", () => {
  it("should have exactly 3 flight tiers", () => {
    expect(SAMPLE_FLIGHTS.length).toBe(3);
  });

  it("should be ordered by ascending price", () => {
    for (let i = 1; i < SAMPLE_FLIGHTS.length; i++) {
      expect(SAMPLE_FLIGHTS[i].price).toBeGreaterThan(
        SAMPLE_FLIGHTS[i - 1].price
      );
    }
  });

  it("should be ordered by ascending origin count", () => {
    for (let i = 1; i < SAMPLE_FLIGHTS.length; i++) {
      expect(SAMPLE_FLIGHTS[i].origins).toBeGreaterThanOrEqual(
        SAMPLE_FLIGHTS[i - 1].origins
      );
    }
  });

  it.each(SAMPLE_FLIGHTS.map((f) => [f.name, f]))(
    "flight '%s' should have positive price and origin count",
    (_name, flight) => {
      expect(flight.price).toBeGreaterThan(0);
      expect(flight.origins).toBeGreaterThan(0);
      expect(flight.includes.trim().length).toBeGreaterThan(0);
    }
  );
});

describe("Taglines", () => {
  it("should have at least 4 taglines", () => {
    expect(TAGLINES.length).toBeGreaterThanOrEqual(4);
  });

  it("should all be non-empty strings", () => {
    TAGLINES.forEach((tagline) => {
      expect(tagline.trim().length).toBeGreaterThan(0);
    });
  });

  it("should each be concise (under 50 characters)", () => {
    TAGLINES.forEach((tagline) => {
      expect(tagline.length).toBeLessThanOrEqual(50);
    });
  });
});
