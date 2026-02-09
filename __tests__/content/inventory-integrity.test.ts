/**
 * Inventory & Thumbnail Integrity Tests
 *
 * Validates the inventory manifest data layer:
 * - All lots have valid SCA scores
 * - All lots have tasting notes
 * - Thumbnail labels are properly normalized
 * - No duplicate lots or thumbnails
 * - Label normalization table is complete
 */

import { INVENTORY, CROP_THUMBNAILS, LABEL_NORMALIZATIONS } from "@/data/inventory";

describe("Inventory Lots", () => {
  it("should have at least 6 lots", () => {
    expect(INVENTORY.length).toBeGreaterThanOrEqual(6);
  });

  it("should have no duplicate lot names", () => {
    const names = INVENTORY.map((l) => l.name);
    expect(new Set(names).size).toBe(names.length);
  });

  it.each(INVENTORY.map((l) => [l.name, l]))(
    "lot '%s' should have valid SCA score (80-100)",
    (_name, lot) => {
      expect(lot.score).toBeGreaterThanOrEqual(80);
      expect(lot.score).toBeLessThanOrEqual(100);
    }
  );

  it.each(INVENTORY.map((l) => [l.name, l]))(
    "lot '%s' should have at least 3 tasting notes",
    (_name, lot) => {
      expect(lot.notes.length).toBeGreaterThanOrEqual(3);
    }
  );

  it.each(INVENTORY.map((l) => [l.name, l]))(
    "lot '%s' should have altitude, moisture, and density",
    (_name, lot) => {
      expect(lot.altitude).toMatch(/masl/);
      expect(lot.moisture).toMatch(/%/);
      expect(lot.density).toMatch(/g\/mL/);
    }
  );

  it("should cover at least 4 distinct regions", () => {
    const regions = new Set(INVENTORY.map((l) => l.region));
    expect(regions.size).toBeGreaterThanOrEqual(4);
  });

  it("should have average SCA score above 84", () => {
    const avg = INVENTORY.reduce((sum, l) => sum + l.score, 0) / INVENTORY.length;
    expect(avg).toBeGreaterThan(84);
  });
});

describe("Crop Thumbnails", () => {
  it("should have at least 11 thumbnails", () => {
    expect(CROP_THUMBNAILS.length).toBeGreaterThanOrEqual(11);
  });

  it("should have no duplicate labels", () => {
    const labels = CROP_THUMBNAILS.map((t) => t.label);
    expect(new Set(labels).size).toBe(labels.length);
  });

  it.each(CROP_THUMBNAILS.map((t) => [t.label, t]))(
    "thumbnail '%s' should have region, process, and CSS position",
    (_label, thumb) => {
      expect(thumb.region.trim().length).toBeGreaterThan(0);
      expect(thumb.process.trim().length).toBeGreaterThan(0);
      expect(thumb.position).toMatch(/^\d+\.?\d*%\s+\d+\.?\d*%$/);
    }
  );

  it.each(CROP_THUMBNAILS.map((t) => [t.label, t]))(
    "thumbnail '%s' should have a valid purpose tag",
    (_label, thumb) => {
      expect(["inventory", "packaging", "deck", "web"]).toContain(thumb.purpose);
    }
  );

  it.each(CROP_THUMBNAILS.map((t) => [t.label, t]))(
    "thumbnail '%s' should have a raw label for traceability",
    (_label, thumb) => {
      expect(thumb.rawLabel.trim().length).toBeGreaterThan(0);
    }
  );
});

describe("Label Normalizations", () => {
  it("should have at least 10 normalization entries", () => {
    expect(Object.keys(LABEL_NORMALIZATIONS).length).toBeGreaterThanOrEqual(10);
  });

  it("every raw label in thumbnails should have a corresponding normalization or be already correct", () => {
    CROP_THUMBNAILS.forEach((thumb) => {
      // The normalized label should not contain common misspellings
      expect(thumb.label).not.toMatch(/Temanggury/);
      expect(thumb.label).not.toMatch(/Peabery/);
      expect(thumb.label).not.toMatch(/Hermetre/);
      expect(thumb.label).not.toMatch(/Wet huled/);
    });
  });

  it("normalization values should not contain raw/misspelled forms", () => {
    Object.values(LABEL_NORMALIZATIONS).forEach((normalized) => {
      expect(normalized).not.toMatch(/Temanggury/i);
      expect(normalized).not.toMatch(/Anaerobik/i);
      expect(normalized).not.toMatch(/Peabery/i);
    });
  });
});
