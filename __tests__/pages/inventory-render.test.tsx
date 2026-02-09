/**
 * Inventory Manifest UI Rendering Tests
 *
 * Validates the Bloomberg Terminal x Coffee Origin interface renders
 * correctly with all lot data, 8 origin icons, and thumbnail grid.
 */

import { render, screen, act } from "@testing-library/react";
import InventoryManifest from "@/components/InventoryManifest";
import { INVENTORY, CROP_THUMBNAILS } from "@/data/inventory";
import { ORIGINS } from "@/data/content";

// Mock framer-motion to avoid animation issues in tests
jest.mock("framer-motion", () => ({
  motion: {
    div: ({
      children,
      ...props
    }: React.PropsWithChildren<Record<string, unknown>>) => (
      <div {...filterMotionProps(props)}>{children}</div>
    ),
  },
}));

function filterMotionProps(props: Record<string, unknown>) {
  const filtered: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(props)) {
    if (
      !["initial", "animate", "transition", "whileHover", "whileTap"].includes(
        key
      )
    ) {
      filtered[key] = value;
    }
  }
  return filtered;
}

// Use fake timers to advance past skeleton loading
beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

function renderAndLoad() {
  const result = render(<InventoryManifest />);
  // Advance past the 1200ms skeleton loading timer
  act(() => {
    jest.advanceTimersByTime(1500);
  });
  return result;
}

describe("InventoryManifest — Skeleton Phase", () => {
  it("should show skeleton initially before loading completes", () => {
    const { queryByTestId } = render(<InventoryManifest />);
    expect(queryByTestId("inventory-skeleton")).toBeTruthy();
  });

  it("should hide skeleton after loading", () => {
    const { queryByTestId } = render(<InventoryManifest />);
    act(() => {
      jest.advanceTimersByTime(1500);
    });
    expect(queryByTestId("inventory-skeleton")).toBeNull();
  });
});

describe("InventoryManifest — Loaded State", () => {
  it("should render without errors", () => {
    const { container } = renderAndLoad();
    expect(container.firstChild).toBeTruthy();
  });

  it("should display INVENTORY MANIFEST header", () => {
    renderAndLoad();
    expect(screen.getByText("INVENTORY MANIFEST")).toBeTruthy();
  });

  it("should display LIVE DATA badge", () => {
    renderAndLoad();
    expect(screen.getByText("LIVE DATA")).toBeTruthy();
  });

  it("should display total lots count", () => {
    renderAndLoad();
    expect(
      screen.getByText(`${INVENTORY.length} Verified`)
    ).toBeTruthy();
  });

  it("should display Dr. Fika as Lead QA", () => {
    renderAndLoad();
    expect(screen.getByText("Dr. Fika Safitri")).toBeTruthy();
  });

  it("should render all inventory lot names", () => {
    renderAndLoad();
    INVENTORY.forEach((lot) => {
      expect(screen.getByText(lot.name)).toBeTruthy();
    });
  });

  it("should render all inventory lot SCA scores", () => {
    renderAndLoad();
    INVENTORY.forEach((lot) => {
      expect(screen.getByText(String(lot.score))).toBeTruthy();
    });
  });

  it("should render all 8 origin profile names", () => {
    renderAndLoad();
    ORIGINS.forEach((origin) => {
      expect(screen.getByText(origin.name)).toBeTruthy();
    });
  });

  it("should render 8 flavor icon labels", () => {
    renderAndLoad();
    const flavorLabels = [
      "Fruity",
      "Floral",
      "Chocolate",
      "Nutty",
      "Citrus",
      "Honey",
      "Earthy",
      "Spicy",
    ];
    flavorLabels.forEach((label) => {
      expect(screen.getAllByText(label).length).toBeGreaterThanOrEqual(1);
    });
  });

  it("should render 8 SVG icons", () => {
    const { container } = renderAndLoad();
    const svgs = container.querySelectorAll("svg");
    expect(svgs.length).toBe(8);
  });

  it("should render all thumbnail crop labels", () => {
    renderAndLoad();
    CROP_THUMBNAILS.forEach((thumb) => {
      expect(screen.getByText(thumb.label)).toBeTruthy();
    });
  });

  it("should display section headers", () => {
    const { container } = renderAndLoad();
    const text = container.textContent || "";
    expect(text).toContain("FLAVOR ARCHITECTURE");
    expect(text).toContain("PROTECTED RESERVE ORIGINS");
    expect(text).toContain("PHYSICAL SAMPLE MAPPING");
  });

  it("should show PDF export button", () => {
    const { getByTestId } = renderAndLoad();
    expect(getByTestId("export-pdf-btn")).toBeTruthy();
  });

  it("should show drag-drop zone", () => {
    const { getByTestId } = renderAndLoad();
    expect(getByTestId("drop-zone")).toBeTruthy();
  });

  it("should show asset ingestion section header", () => {
    const { container } = renderAndLoad();
    expect(container.textContent).toContain("ASSET INGESTION");
  });
});
