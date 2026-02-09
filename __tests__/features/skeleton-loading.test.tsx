import { render } from "@testing-library/react";
import InventorySkeleton from "@/components/InventorySkeleton";

describe("InventorySkeleton", () => {
  it("should render the skeleton container", () => {
    const { getByTestId } = render(<InventorySkeleton />);
    expect(getByTestId("inventory-skeleton")).toBeTruthy();
  });

  it("should have animate-pulse class for shimmer effect", () => {
    const { container } = render(<InventorySkeleton />);
    const pulsing = container.querySelector(".animate-pulse");
    expect(pulsing).toBeTruthy();
  });

  it("should render 6 lot skeleton rows", () => {
    const { container } = render(<InventorySkeleton />);
    const lotSkeletons = container.querySelectorAll(
      ".rounded-2xl.border-zinc-800"
    );
    // 6 lot rows + footer = more than 6
    expect(lotSkeletons.length).toBeGreaterThanOrEqual(6);
  });

  it("should render 8 flavor icon placeholders", () => {
    const { container } = render(<InventorySkeleton />);
    const iconPlaceholders = container.querySelectorAll(".rounded-full.bg-zinc-800");
    // 8 icon circles + some note pills
    expect(iconPlaceholders.length).toBeGreaterThanOrEqual(8);
  });

  it("should use black background matching manifest", () => {
    const { getByTestId } = render(<InventorySkeleton />);
    const skeleton = getByTestId("inventory-skeleton");
    expect(skeleton.className).toContain("bg-black");
  });
});
