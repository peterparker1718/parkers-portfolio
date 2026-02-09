import { render, fireEvent } from "@testing-library/react";
import ProgressiveImage from "@/components/ProgressiveImage";

describe("ProgressiveImage", () => {
  it("should render the container", () => {
    const { getByTestId } = render(
      <ProgressiveImage src="/test.jpg" alt="test" />
    );
    expect(getByTestId("progressive-image")).toBeTruthy();
  });

  it("should show placeholder initially", () => {
    const { getByTestId } = render(
      <ProgressiveImage src="/test.jpg" alt="test" />
    );
    const placeholder = getByTestId("image-placeholder");
    expect(placeholder.className).toContain("opacity-100");
  });

  it("should render an img element with lazy loading", () => {
    const { getByTestId } = render(
      <ProgressiveImage src="/test.jpg" alt="test" />
    );
    const img = getByTestId("image-full") as HTMLImageElement;
    expect(img.getAttribute("loading")).toBe("lazy");
    expect(img.getAttribute("decoding")).toBe("async");
  });

  it("should set correct src and alt", () => {
    const { getByTestId } = render(
      <ProgressiveImage src="/my-coffee.jpg" alt="Coffee beans" />
    );
    const img = getByTestId("image-full") as HTMLImageElement;
    expect(img.src).toContain("/my-coffee.jpg");
    expect(img.alt).toBe("Coffee beans");
  });

  it("should transition to loaded state on image load", () => {
    const { getByTestId } = render(
      <ProgressiveImage src="/test.jpg" alt="test" />
    );
    const img = getByTestId("image-full");
    fireEvent.load(img);
    const placeholder = getByTestId("image-placeholder");
    expect(placeholder.className).toContain("opacity-0");
    expect(img.className).toContain("opacity-100");
  });

  it("should show error state on image error", () => {
    const { getByTestId } = render(
      <ProgressiveImage src="/broken.jpg" alt="broken" />
    );
    const img = getByTestId("image-full");
    fireEvent.error(img);
    expect(getByTestId("image-error")).toBeTruthy();
  });

  it("should apply custom className", () => {
    const { getByTestId } = render(
      <ProgressiveImage src="/test.jpg" alt="test" className="w-64 h-64" />
    );
    expect(getByTestId("progressive-image").className).toContain("w-64");
  });
});
