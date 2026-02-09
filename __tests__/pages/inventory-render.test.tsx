/**
 * Inventory Manifest UI Rendering Tests
 *
 * Validates the Bloomberg Terminal × Coffee Origin interface renders
 * correctly with all lot data, 8 origin icons, and thumbnail grid.
 */

import { render, screen } from "@testing-library/react";
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

describe("InventoryManifest Component", () => {
  it("should render without errors", () => {
    const { container } = render(<InventoryManifest />);
    expect(container.firstChild).toBeTruthy();
  });

  it("should display INVENTORY MANIFEST header", () => {
    render(<InventoryManifest />);
    expect(screen.getByText("INVENTORY MANIFEST")).toBeTruthy();
  });

  it("should display LIVE DATA badge", () => {
    render(<InventoryManifest />);
    expect(screen.getByText("LIVE DATA")).toBeTruthy();
  });

  it("should display total lots count", () => {
    render(<InventoryManifest />);
    expect(
      screen.getByText(`${INVENTORY.length} Verified`)
    ).toBeTruthy();
  });

  it("should display Dr. Fika as Lead QA", () => {
    render(<InventoryManifest />);
    expect(screen.getByText("Dr. Fika Safitri")).toBeTruthy();
  });

  it("should render all inventory lot names", () => {
    render(<InventoryManifest />);
    INVENTORY.forEach((lot) => {
      expect(screen.getByText(lot.name)).toBeTruthy();
    });
  });

  it("should render all inventory lot SCA scores", () => {
    render(<InventoryManifest />);
    INVENTORY.forEach((lot) => {
      expect(screen.getByText(String(lot.score))).toBeTruthy();
    });
  });

  it("should render all 8 origin profile names", () => {
    render(<InventoryManifest />);
    ORIGINS.forEach((origin) => {
      expect(screen.getByText(origin.name)).toBeTruthy();
    });
  });

  it("should render 8 flavor icon labels", () => {
    render(<InventoryManifest />);
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
    const { container } = render(<InventoryManifest />);
    const svgs = container.querySelectorAll("svg");
    expect(svgs.length).toBe(8);
  });

  it("should render all thumbnail crop labels", () => {
    render(<InventoryManifest />);
    CROP_THUMBNAILS.forEach((thumb) => {
      expect(screen.getByText(thumb.label)).toBeTruthy();
    });
  });

  it("should display section headers", () => {
    const { container } = render(<InventoryManifest />);
    const text = container.textContent || "";
    expect(text).toContain("FLAVOR ARCHITECTURE");
    expect(text).toContain("PROTECTED RESERVE ORIGINS");
    expect(text).toContain("PHYSICAL SAMPLE MAPPING");
  });
});
