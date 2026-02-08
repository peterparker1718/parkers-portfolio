/**
 * Page Rendering Tests
 *
 * Validates that all pages render without errors and
 * display the correct content.
 */

import { render, screen } from "@testing-library/react";
import PageSection from "@/components/PageSection";
import OriginCard from "@/components/OriginCard";
import SampleFlightCard from "@/components/SampleFlightCard";
import { PAGES, ORIGINS, SAMPLE_FLIGHTS, PALETTE } from "@/data/content";

describe("PageSection Component", () => {
  it.each(PAGES.map((p) => [p.id, p]))(
    "should render page '%s' without errors",
    (_id, page) => {
      const { container } = render(<PageSection page={page} />);
      expect(container.querySelector("section")).toBeTruthy();
    }
  );

  it("should display page title", () => {
    const testPage = PAGES[0];
    render(<PageSection page={testPage} />);
    expect(screen.getByText(testPage.title)).toBeTruthy();
  });

  it("should display page hook", () => {
    const testPage = PAGES[0];
    render(<PageSection page={testPage} />);
    expect(screen.getByText(testPage.hook)).toBeTruthy();
  });

  it("should display all body lines", () => {
    const testPage = PAGES[0];
    render(<PageSection page={testPage} />);
    testPage.body.forEach((line) => {
      expect(screen.getByText(line)).toBeTruthy();
    });
  });

  it("should apply cloth background for cloth pages", () => {
    const clothPage = PAGES.find((p) => p.background === "cloth")!;
    const { container } = render(<PageSection page={clothPage} />);
    const section = container.querySelector("section");
    expect(section?.style.backgroundColor).toBe(
      hexToRgb(PALETTE.cloth)
    );
  });

  it("should apply kraft background for kraft pages", () => {
    const kraftPage = PAGES.find((p) => p.background === "kraft")!;
    const { container } = render(<PageSection page={kraftPage} />);
    const section = container.querySelector("section");
    expect(section?.style.backgroundColor).toBe(
      hexToRgb(PALETTE.kraft)
    );
  });

  it("should render proof items when present", () => {
    const pageWithProof = PAGES.find((p) => p.proof && p.proof.length > 0)!;
    render(<PageSection page={pageWithProof} />);
    pageWithProof.proof!.forEach((item) => {
      expect(screen.getByText(item)).toBeTruthy();
    });
  });

  it("should include batik diamond border", () => {
    const { container } = render(<PageSection page={PAGES[0]} />);
    // Diamond character
    const diamonds = container.querySelectorAll("span");
    const hasDiamond = Array.from(diamonds).some(
      (el) => el.textContent === "\u25C6"
    );
    expect(hasDiamond).toBe(true);
  });
});

describe("OriginCard Component", () => {
  it.each(ORIGINS.map((o) => [o.name, o]))(
    "should render origin '%s' without errors",
    (_name, origin) => {
      const { container } = render(<OriginCard origin={origin} />);
      expect(container.firstChild).toBeTruthy();
    }
  );

  it("should display origin name", () => {
    render(<OriginCard origin={ORIGINS[0]} />);
    expect(screen.getByText(ORIGINS[0].name)).toBeTruthy();
  });

  it("should display all tasting notes", () => {
    render(<OriginCard origin={ORIGINS[0]} />);
    ORIGINS[0].notes.forEach((note) => {
      expect(screen.getByText(note)).toBeTruthy();
    });
  });

  it("should display region and process", () => {
    const { container } = render(<OriginCard origin={ORIGINS[0]} />);
    const text = container.textContent || "";
    expect(text).toContain(ORIGINS[0].region);
    expect(text).toContain(ORIGINS[0].process);
  });
});

describe("SampleFlightCard Component", () => {
  it.each(SAMPLE_FLIGHTS.map((f) => [f.name, f]))(
    "should render flight '%s' without errors",
    (_name, flight) => {
      const { container } = render(<SampleFlightCard flight={flight} />);
      expect(container.firstChild).toBeTruthy();
    }
  );

  it("should display flight name", () => {
    render(<SampleFlightCard flight={SAMPLE_FLIGHTS[0]} />);
    expect(screen.getByText(SAMPLE_FLIGHTS[0].name)).toBeTruthy();
  });

  it("should display price", () => {
    render(<SampleFlightCard flight={SAMPLE_FLIGHTS[0]} />);
    expect(
      screen.getByText(`$${SAMPLE_FLIGHTS[0].price}`)
    ).toBeTruthy();
  });

  it("should display credit notice", () => {
    render(<SampleFlightCard flight={SAMPLE_FLIGHTS[0]} />);
    expect(
      screen.getByText("100% credited toward first order")
    ).toBeTruthy();
  });
});

// Helper to convert hex to RGB string (browser style)
function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgb(${r}, ${g}, ${b})`;
}
