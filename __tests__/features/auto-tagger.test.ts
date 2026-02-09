import {
  generateTags,
  processAssetBatch,
  detectMisspellings,
} from "@/lib/auto-tagger";
import type { IngestedAsset } from "@/components/DropZoneIngest";

function makeAsset(name: string, type: string = "image/jpeg"): IngestedAsset {
  return {
    id: "test-id",
    file: new File([""], name, { type }),
    type: type.startsWith("image/") ? "image" : type === "application/pdf" ? "pdf" : "audio",
    purpose: "inventory",
    normalizedName: name,
    tags: [],
    status: "queued",
  };
}

describe("generateTags", () => {
  it("should always include file type tag", () => {
    const asset = makeAsset("test.jpg");
    const result = generateTags(asset);
    expect(result.tags).toContain("type:image");
  });

  it("should detect region from filename", () => {
    const asset = makeAsset("temanggung_anaerobic_sample.jpg");
    const result = generateTags(asset);
    expect(result.tags).toContain("region:temanggung");
  });

  it("should detect process from filename", () => {
    const asset = makeAsset("gayo_wet_hulled_lot.jpg");
    const result = generateTags(asset);
    expect(result.tags).toContain("process:wet hulled");
  });

  it("should detect multiple regions", () => {
    const asset = makeAsset("bali_kintamani_flores_comparison.jpg");
    const result = generateTags(asset);
    expect(result.tags).toContain("region:bali");
    expect(result.tags).toContain("region:kintamani");
    expect(result.tags).toContain("region:flores");
  });

  it("should detect asset category from keywords", () => {
    const asset = makeAsset("farm_harvest_east_java.jpg");
    const result = generateTags(asset);
    expect(result.tags).toContain("category:farm");
  });

  it("should detect portrait category", () => {
    const asset = makeAsset("chris_fika_portrait.jpg");
    const result = generateTags(asset);
    expect(result.tags).toContain("category:portrait");
  });

  it("should include purpose tag", () => {
    const asset = makeAsset("test.jpg");
    const result = generateTags(asset);
    expect(result.tags).toContain("purpose:inventory");
  });

  it("should have higher confidence with more keyword matches", () => {
    const genericAsset = makeAsset("photo_001.jpg");
    const specificAsset = makeAsset("temanggung_anaerobic_natural_farm.jpg");
    const genericResult = generateTags(genericAsset);
    const specificResult = generateTags(specificAsset);
    expect(specificResult.confidence).toBeGreaterThan(genericResult.confidence);
  });

  it("should deduplicate tags", () => {
    const asset = makeAsset("bali_bali_sample.jpg");
    const result = generateTags(asset);
    const baliTags = result.tags.filter((t) => t === "region:bali");
    expect(baliTags.length).toBe(1);
  });

  it("should classify as heuristic stage", () => {
    const asset = makeAsset("test.jpg");
    const result = generateTags(asset);
    expect(result.stage).toBe("heuristic");
  });
});

describe("processAssetBatch", () => {
  it("should process multiple assets", () => {
    const assets = [
      makeAsset("temanggung_sample.jpg"),
      makeAsset("flores_farm.jpg"),
      makeAsset("generic_photo.jpg"),
    ];
    const results = processAssetBatch(assets);
    expect(results.length).toBe(3);
  });

  it("should tag high-confidence assets as 'tagged'", () => {
    const assets = [makeAsset("temanggung_anaerobic_natural_farm.jpg")];
    const results = processAssetBatch(assets);
    expect(results[0].status).toBe("tagged");
  });

  it("should keep low-confidence assets as 'queued'", () => {
    const assets = [makeAsset("photo_001.jpg")];
    const results = processAssetBatch(assets);
    expect(results[0].status).toBe("queued");
  });

  it("should preserve original asset fields", () => {
    const assets = [makeAsset("test.jpg")];
    const results = processAssetBatch(assets);
    expect(results[0].id).toBe("test-id");
    expect(results[0].normalizedName).toBe("test.jpg");
  });
});

describe("detectMisspellings", () => {
  it("should detect Temanggury misspelling", () => {
    const results = detectMisspellings("Temanggury_sample.jpg");
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].raw).toBe("Temanggury");
    expect(results[0].corrected).toBe("Temanggung");
  });

  it("should detect multiple misspellings", () => {
    const results = detectMisspellings("Temanggury_Anaerobik_Hermetre Sealed.jpg");
    expect(results.length).toBe(3);
  });

  it("should return empty for correct names", () => {
    const results = detectMisspellings("Temanggung_Anaerobic_Natural.jpg");
    expect(results.length).toBe(0);
  });
});
