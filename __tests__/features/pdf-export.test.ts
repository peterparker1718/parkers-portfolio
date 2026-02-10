import {
  generateBookletPdf,
  getBookletPageCount,
  getPrintMetadata,
} from "@/lib/pdf-export";
import { INVENTORY } from "@/data/inventory";
import { ORIGINS, SAMPLE_FLIGHTS, BRAND, PALETTE } from "@/data/content";
import { PRINT_SPEC } from "@/data/brand-voice";

describe("PDF Booklet Generation", () => {
  const pages = generateBookletPdf();

  it("should generate at least 6 pages", () => {
    expect(pages.length).toBeGreaterThanOrEqual(6);
  });

  it("should start with a cover page", () => {
    expect(pages[0].id).toBe("cover");
  });

  it("should end with a back cover page", () => {
    expect(pages[pages.length - 1].id).toBe("back");
  });

  it("cover should use cloth background", () => {
    expect(pages[0].background).toBe(PALETTE.cloth);
  });

  it("back cover should use cloth background", () => {
    expect(pages[pages.length - 1].background).toBe(PALETTE.cloth);
  });

  it("cover should contain brand name", () => {
    const coverElements = pages[0].elements;
    const headings = coverElements.filter((e) => e.type === "heading");
    const hasJavaBridge = headings.some(
      (h) => h.type === "heading" && h.text.includes("JAVA BRIDGE")
    );
    expect(hasJavaBridge).toBe(true);
  });

  it("should have a lot summary page", () => {
    const lotPage = pages.find((p) => p.id === "lots");
    expect(lotPage).toBeDefined();
    const lotRows = lotPage!.elements.filter((e) => e.type === "lot-row");
    expect(lotRows.length).toBe(INVENTORY.length);
  });

  it("should have origin pages covering all 8 origins", () => {
    const originPages = pages.filter((p) => p.id.startsWith("origins-"));
    const totalOriginCards = originPages.flatMap((p) =>
      p.elements.filter((e) => e.type === "origin-card")
    );
    expect(totalOriginCards.length).toBe(ORIGINS.length);
  });

  it("should have a sample flights page", () => {
    const flightsPage = pages.find((p) => p.id === "flights");
    expect(flightsPage).toBeDefined();
    const flightCards = flightsPage!.elements.filter(
      (e) => e.type === "flight-card"
    );
    expect(flightCards.length).toBe(SAMPLE_FLIGHTS.length);
  });

  it("back cover should contain founder name", () => {
    const backElements = pages[pages.length - 1].elements;
    const textElements = backElements.filter((e) => e.type === "text");
    const hasFounder = textElements.some(
      (t) => t.type === "text" && t.text.includes(BRAND.founder)
    );
    expect(hasFounder).toBe(true);
  });

  it("back cover should contain contact info", () => {
    const backElements = pages[pages.length - 1].elements;
    const textElements = backElements.filter((e) => e.type === "text");
    const hasEmail = textElements.some(
      (t) => t.type === "text" && t.text.includes(BRAND.contact.email)
    );
    expect(hasEmail).toBe(true);
  });

  it("every page should have a background color", () => {
    pages.forEach((page) => {
      expect(page.background).toMatch(/^#[0-9a-fA-F]{6}$/);
    });
  });

  it("every page should have at least one element", () => {
    pages.forEach((page) => {
      expect(page.elements.length).toBeGreaterThan(0);
    });
  });
});

describe("getBookletPageCount", () => {
  it("should return consistent count", () => {
    const count = getBookletPageCount();
    const pages = generateBookletPdf();
    expect(count).toBe(pages.length);
  });

  it("should be at least 6", () => {
    expect(getBookletPageCount()).toBeGreaterThanOrEqual(6);
  });
});

describe("getPrintMetadata", () => {
  const meta = getPrintMetadata();

  it("should include print spec dimensions", () => {
    expect(meta.trimWidth).toBe(PRINT_SPEC.trimWidth);
    expect(meta.trimHeight).toBe(PRINT_SPEC.trimHeight);
    expect(meta.bleedWidth).toBe(PRINT_SPEC.bleedWidth);
    expect(meta.bleedHeight).toBe(PRINT_SPEC.bleedHeight);
  });

  it("should include 300 DPI resolution", () => {
    expect(meta.resolution).toBe(300);
  });

  it("should include CMYK color mode", () => {
    expect(meta.colorMode).toBe("CMYK");
  });

  it("should include content counts", () => {
    expect(meta.lotCount).toBe(INVENTORY.length);
    expect(meta.originCount).toBe(ORIGINS.length);
    expect(meta.flightCount).toBe(SAMPLE_FLIGHTS.length);
    expect(meta.pageCount).toBe(getBookletPageCount());
  });
});
