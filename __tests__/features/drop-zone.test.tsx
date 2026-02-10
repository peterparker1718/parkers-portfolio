import { render, fireEvent } from "@testing-library/react";
import DropZoneIngest, {
  classifyFileType,
  assignPurpose,
  normalizeName,
} from "@/components/DropZoneIngest";

describe("DropZoneIngest — Helpers", () => {
  describe("classifyFileType", () => {
    it("should classify PNG as image", () => {
      const file = new File([""], "test.png", { type: "image/png" });
      expect(classifyFileType(file)).toBe("image");
    });

    it("should classify JPG as image", () => {
      const file = new File([""], "test.jpg", { type: "image/jpeg" });
      expect(classifyFileType(file)).toBe("image");
    });

    it("should classify WebP as image", () => {
      const file = new File([""], "test.webp", { type: "image/webp" });
      expect(classifyFileType(file)).toBe("image");
    });

    it("should classify PDF as pdf", () => {
      const file = new File([""], "test.pdf", { type: "application/pdf" });
      expect(classifyFileType(file)).toBe("pdf");
    });

    it("should classify M4A as audio", () => {
      const file = new File([""], "test.m4a", { type: "audio/mp4" });
      expect(classifyFileType(file)).toBe("audio");
    });

    it("should classify unknown types", () => {
      const file = new File([""], "test.xyz", { type: "application/octet-stream" });
      expect(classifyFileType(file)).toBe("unknown");
    });
  });

  describe("assignPurpose", () => {
    it("should assign inventory purpose for IMG_ files", () => {
      const file = new File([""], "IMG_2913.jpg", { type: "image/jpeg" });
      expect(assignPurpose(file)).toBe("inventory");
    });

    it("should assign packaging purpose for package files", () => {
      const file = new File([""], "package-label-v2.png", { type: "image/png" });
      expect(assignPurpose(file)).toBe("packaging");
    });

    it("should assign deck purpose for pitch files", () => {
      const file = new File([""], "pitch-deck-jamie.pdf", { type: "application/pdf" });
      expect(assignPurpose(file)).toBe("deck");
    });

    it("should default to web purpose", () => {
      const file = new File([""], "hero-banner.png", { type: "image/png" });
      expect(assignPurpose(file)).toBe("web");
    });
  });

  describe("normalizeName", () => {
    it("should correct Temanggury to Temanggung", () => {
      expect(normalizeName("Temanggury-sample.jpg")).toContain("Temanggung");
    });

    it("should correct Peabery to Peaberry", () => {
      expect(normalizeName("Peabery_lot.jpg")).toContain("Peaberry");
    });

    it("should correct multiple misspellings in one name", () => {
      const result = normalizeName("Temanggury_Anaerobik_sample.jpg");
      expect(result).toContain("Temanggung");
      expect(result).toContain("Anaerobic");
    });

    it("should leave correct names unchanged", () => {
      expect(normalizeName("Temanggung_sample.jpg")).toBe("Temanggung_sample.jpg");
    });
  });
});

describe("DropZoneIngest — Component", () => {
  it("should render the drop zone", () => {
    const { getByTestId } = render(<DropZoneIngest />);
    expect(getByTestId("drop-zone")).toBeTruthy();
  });

  it("should render the drop target", () => {
    const { getByTestId } = render(<DropZoneIngest />);
    expect(getByTestId("drop-target")).toBeTruthy();
  });

  it("should show drag instruction text", () => {
    const { container } = render(<DropZoneIngest />);
    expect(container.textContent).toContain("Drag & drop assets here");
  });

  it("should show accepted file types", () => {
    const { container } = render(<DropZoneIngest />);
    expect(container.textContent).toContain("PNG");
    expect(container.textContent).toContain("PDF");
    expect(container.textContent).toContain("MP3");
  });

  it("should have a hidden file input", () => {
    const { getByTestId } = render(<DropZoneIngest />);
    const input = getByTestId("file-input") as HTMLInputElement;
    expect(input.type).toBe("file");
    expect(input.multiple).toBe(true);
  });

  it("should highlight on drag over", () => {
    const { getByTestId } = render(<DropZoneIngest />);
    const target = getByTestId("drop-target");
    fireEvent.dragOver(target, { dataTransfer: { files: [] } });
    expect(target.className).toContain("border-green-500");
  });

  it("should remove highlight on drag leave", () => {
    const { getByTestId } = render(<DropZoneIngest />);
    const target = getByTestId("drop-target");
    fireEvent.dragOver(target, { dataTransfer: { files: [] } });
    fireEvent.dragLeave(target, { dataTransfer: { files: [] } });
    expect(target.className).toContain("border-zinc-700");
  });

  it("should not show asset list when empty", () => {
    const { queryByTestId } = render(<DropZoneIngest />);
    expect(queryByTestId("asset-list")).toBeNull();
  });
});
