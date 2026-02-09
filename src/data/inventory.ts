/**
 * Inventory Manifest — Trading Terminal Data Layer
 *
 * Physical-to-digital lot mapping system.
 * Each lot has: region, process, altitude, moisture, density, SCA score, tasting notes.
 * Thumbnail crops reference a master source image split into grid positions.
 */

// ---------------------------------------------------------------------------
// Lot Inventory (Bloomberg Terminal × Coffee Origin)
// ---------------------------------------------------------------------------

export interface InventoryLot {
  region: string;
  name: string;
  process: string;
  altitude: string;
  moisture: string;
  density: string;
  notes: string[];
  score: number;
}

export const INVENTORY: InventoryLot[] = [
  {
    region: "ACEH",
    name: "Gayo Highlands SHG",
    process: "Semi-Washed",
    altitude: "1,500+ masl",
    moisture: "10.8 – 11.2%",
    density: "0.72 g/mL",
    notes: ["Specialty Grade", "Complex", "Wine-Like", "Bright", "Spicy"],
    score: 87.5,
  },
  {
    region: "EAST JAVA (IJEN)",
    name: "Java Estate Reserve",
    process: "Washed",
    altitude: "1,100 – 1,300 masl",
    moisture: "10.8 – 11.2%",
    density: "0.72 g/mL",
    notes: ["Classic", "Balanced", "Heritage", "Mild Acidity", "Nutty"],
    score: 83.5,
  },
  {
    region: "BALI (KINTAMANI)",
    name: "Bali Blue Moon",
    process: "Washed",
    altitude: "1,300 – 1,500 masl",
    moisture: "10.8 – 11.2%",
    density: "0.72 g/mL",
    notes: ["Smooth", "Sweet", "Clean Finish", "Caramel", "Citrus"],
    score: 86.0,
  },
  {
    region: "FLORES (NGADA)",
    name: "Flores Bajawa",
    process: "Fully Washed",
    altitude: "1,200 – 1,600 masl",
    moisture: "10.8 – 11.2%",
    density: "0.72 g/mL",
    notes: ["Unique", "Fruit-Forward", "Medium Body", "Floral", "Woody"],
    score: 85.5,
  },
  {
    region: "NORTH SUMATRA",
    name: "Mandheling Gold",
    process: "Wet Hulled",
    altitude: "1,200 – 1,400 masl",
    moisture: "10.8 – 11.2%",
    density: "0.72 g/mL",
    notes: ["Full-Bodied", "Earthy", "Low-Acid", "Chocolate", "Herbal"],
    score: 84.5,
  },
  {
    region: "SULAWESI",
    name: "Toraja Sapan",
    process: "Wet Hulled",
    altitude: "1,400 – 1,900 masl",
    moisture: "10.8 – 11.2%",
    density: "0.72 g/mL",
    notes: ["Rare", "Rich", "Full-Bodied", "Dark Chocolate", "Spicy"],
    score: 88.0,
  },
];

// ---------------------------------------------------------------------------
// Thumbnail Crop Map — Logical grid positions from master source image
// ---------------------------------------------------------------------------

export interface CropThumbnail {
  /** Normalized label (corrected from raw handwritten labels) */
  label: string;
  /** Region of origin */
  region: string;
  /** Processing method */
  process: string;
  /** CSS background-position for cropping from master image */
  position: string;
  /** Purpose tag for asset management */
  purpose: "inventory" | "packaging" | "deck" | "web";
  /** Raw label as extracted from physical sample (before normalization) */
  rawLabel: string;
}

export const CROP_THUMBNAILS: CropThumbnail[] = [
  {
    label: "Temanggung – Anaerobic Natural",
    region: "Temanggung, Central Java",
    process: "Anaerobic natural",
    position: "0% 0%",
    purpose: "inventory",
    rawLabel: "Temanggury Anaerobik Natural",
  },
  {
    label: "Excelsa – Banyuwangi",
    region: "Banyuwangi, East Java",
    process: "Natural",
    position: "25% 0%",
    purpose: "inventory",
    rawLabel: "Excelsa Lak coffee Banyuwangi",
  },
  {
    label: "Bajawa Flores – Classic Washed",
    region: "Flores, Nusa Tenggara",
    process: "Washed",
    position: "50% 0%",
    purpose: "inventory",
    rawLabel: "Bajona Floor Classic Washed",
  },
  {
    label: "Wine Arabica",
    region: "East Java",
    process: "Wine process",
    position: "75% 0%",
    purpose: "inventory",
    rawLabel: "WINE ARABICA",
  },
  {
    label: "Lactic Coffee – Banyuwangi",
    region: "Banyuwangi, East Java",
    process: "Lactic fermentation",
    position: "0% 50%",
    purpose: "inventory",
    rawLabel: "Lactic Coffee Banyuwangi",
  },
  {
    label: "Peaberry – Banyuwangi",
    region: "Banyuwangi, East Java",
    process: "Peaberry selection",
    position: "25% 50%",
    purpose: "inventory",
    rawLabel: "Peabery Banyuwang",
  },
  {
    label: "Gayo Arch – Wet Hulled",
    region: "Gayo, Aceh",
    process: "Wet hulled (giling basah)",
    position: "50% 50%",
    purpose: "inventory",
    rawLabel: "Gayo Arch Wet huled",
  },
  {
    label: "Temanggung – Hermetic Sealed Natural",
    region: "Temanggung, Central Java",
    process: "Hermetically sealed natural",
    position: "75% 50%",
    purpose: "inventory",
    rawLabel: "Temanggung Hermetic Coated Natural",
  },
  {
    label: "Argopuro – Hermetic Sealed Natural",
    region: "Argopuro, East Java",
    process: "Hermetically sealed natural",
    position: "12.5% 100%",
    purpose: "inventory",
    rawLabel: "Argopuro Hermetre Sealed natural",
  },
  {
    label: "Temanggung – Classic Washed",
    region: "Temanggung, Central Java",
    process: "Washed",
    position: "37.5% 100%",
    purpose: "inventory",
    rawLabel: "Temanggun Classic Nucl",
  },
  {
    label: "Mt. Ijen Pink – Natural Process",
    region: "Ijen, East Java",
    process: "Pink process (natural)",
    position: "62.5% 100%",
    purpose: "inventory",
    rawLabel: "Mt. en Pink proces Nahinal",
  },
];

/**
 * Normalization table — maps raw handwritten labels to corrected forms.
 * Used by the extraction prompt to validate OCR/manual corrections.
 */
export const LABEL_NORMALIZATIONS: Record<string, string> = {
  "Temanggury": "Temanggung",
  "Temanggun": "Temanggung",
  "Anaerobik": "Anaerobic",
  "Lak": "Lactic",
  "Peabery": "Peaberry",
  "Banyuwang": "Banyuwangi",
  "Hermetre Sealed": "Hermetically Sealed",
  "Hermetic Coated": "Hermetically Sealed",
  "Wet huled": "Wet Hulled",
  "Mt. en Pink": "Mt. Ijen Pink",
  "proces Nahinal": "Natural Process",
  "Bajona Floor": "Bajawa Flores",
  "Classic Nucl": "Classic Washed",
};
