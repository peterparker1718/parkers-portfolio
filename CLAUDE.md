# CLAUDE.md — Java Bridge Coffee Portfolio

## Project Overview

A Next.js marketing site and print-ready booklet system for **Java Bridge Coffee**, a direct-trade Indonesian specialty coffee company. The site doubles as an inventory management platform with a Bloomberg Terminal-style UI.

**Founder:** Chris Parker | **Co-founder:** Dr. Fika Ayu Safitri (PhD Agricultural Biology)
**Location:** Dampit, East Java, Indonesia

## Tech Stack

- **Framework:** Next.js 16.1.6 (App Router)
- **UI:** React 19.2.3, TypeScript 5 (strict mode)
- **Styling:** Tailwind CSS 4 + PostCSS
- **Animation:** Framer Motion 12.33.0
- **Testing:** Jest 30.2.0 + Testing Library (jsdom)
- **Lint:** ESLint 9 (flat config, Next.js core web vitals + TypeScript)

## Commands

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run lint         # ESLint
npm test             # Run all tests (17 test files)
npm run test:watch   # Watch mode
npm run test:coverage # Coverage report (v8 provider)
```

## Directory Structure

```
src/
  app/
    page.tsx              # Homepage — 11-page multi-section narrative booklet
    inventory/page.tsx    # Bloomberg Terminal-style inventory manifest
    layout.tsx            # Root layout with metadata
    globals.css           # Tailwind + root CSS variables
  components/
    PageSection.tsx       # Generic page section renderer
    OriginCard.tsx        # Coffee origin profile card
    SampleFlightCard.tsx  # Sample tier pricing card
    InventoryManifest.tsx # Terminal-style lot grid
    InventorySkeleton.tsx # Loading skeleton for inventory
    DropZoneIngest.tsx    # Drag-and-drop asset ingestion
    ProgressiveImage.tsx  # Progressive image loading
  data/
    content.ts            # PAGES, ORIGINS, SAMPLE_FLIGHTS, PALETTE, BRAND constants
    inventory.ts          # INVENTORY lots, CROP_THUMBNAILS, LABEL_NORMALIZATIONS
    brand-voice.ts        # Brand grammar rules, hook analysis, PRINT_SPEC
    brand-asset-kit.ts    # Extended palette, typography, messaging variants, differentiators
    front-page-concepts.ts # 5 front-page concept systems, LOGIC_CHAIN, GAP_ANALYSIS
  lib/
    auto-tagger.ts        # AI asset tagging pipeline (heuristic, region/process/category detection)
    pdf-export.ts         # PDF booklet generation (cover, lots, origins, flights, back)
__tests__/
  content/                # Data integrity tests (content, inventory, brand voice, asset kit)
  features/               # Feature tests (PDF export, auto-tagger)
  messaging/              # Brand voice validation (cognitive load, jargon leak, keyword density, narrative flow)
  narrativeIntegrity.test.ts
```

## Path Alias

`@/*` maps to `./src/*` — use `@/data/content`, `@/components/PageSection`, etc.

## Architecture Principles

### Content is Data-Driven

All page content lives in `src/data/content.ts` as typed constants (`PAGES`, `ORIGINS`, `SAMPLE_FLIGHTS`). The homepage renders by mapping over `PAGES`. Never hardcode content in components.

### Three-Layer Cognitive Hierarchy

Every page follows:
1. **Hook** — one-liner emotional authority (max 15 words, 100 chars)
2. **Body** — 2-3 lines of strategic clarity
3. **Proof** — optional visual/structural evidence

### Brand Voice Rules (Enforced by Tests)

- **Hook rhythm:** declarative-power (1 period), binary-impact (2 periods), triadic-authority (3 periods)
- **Max per hook:** 3 periods, 15 words, 100 characters
- **Body lines:** exactly 2-3 per page
- **Jargon banned on buyer-facing pages:** FOB, SKU, MOQ, FCL, LCL, incoterms, CIF, EXW, etc.
- **Narrative flow:** always problem → solution (rented→permanent, transactional→sovereign, fly-in→embedded, commodity→asset)
- **Power words capped at 3 total hook occurrences:** sovereign, control, origin, vault, infrastructure, institutional, permanent, embedded

### Color Palette (PALETTE constant)

| Name       | Hex       | Use                    |
|------------|-----------|------------------------|
| cloth      | `#342C22` | Dark backgrounds       |
| kraft      | `#d4896b` | Warm alternate backgrounds |
| gold       | `#c9a84c` | Accents, labels        |
| cream      | `#f5f5dc` | Light text on dark     |
| espresso   | `#4a3528` | Text on kraft          |
| terracotta | `#c97d5d` | Secondary accent       |

Pages alternate between `cloth` and `kraft` backgrounds.

### Print Spec

- **Trim:** 5 x 7 inches | **Bleed:** 5.25 x 7.25 inches (0.125" bleed)
- **Resolution:** 300 DPI | **Color:** CMYK
- **Paper:** Mohawk Superfine Eggshell 300gsm
- **Binding:** Saddle-stitch | **Finish:** Matte

### Typography

- **Headlines:** Georgia / Playfair Display (Bold)
- **Body:** Calibri / Source Sans Pro (Regular)
- **Data/Labels:** Calibri / Roboto Mono (Regular)
- **Accents:** Georgia (Italic)

## Testing Conventions

Tests live in `__tests__/` organized by concern:
- `content/` — validate data integrity (all pages have hooks, body line counts, origin notes, scores)
- `messaging/` — brand voice enforcement (jargon leaks, cognitive load, keyword density, narrative flow)
- `features/` — functional tests (PDF export structure, auto-tagger pipeline)

Run `npm test` before committing. All 17 test files must pass.

## Key Data Contracts

### PageContent (content.ts)
```typescript
{ id: string; title: string; hook: string; body: string[]; proof?: string[]; background: "cloth" | "kraft" }
```

### InventoryLot (inventory.ts)
```typescript
{ region: string; name: string; process: string; altitude: string; moisture: string; density: string; notes: string[]; score: number }
```

### CropThumbnail (inventory.ts)
```typescript
{ label: string; region: string; process: string; position: string; purpose: "inventory" | "packaging" | "deck" | "web"; rawLabel: string }
```

## Workflow Notes

- The homepage is a single-page scroll through all 11 `PAGES` entries
- Special rendering for `origins` (origin cards), `revenue` (flight cards), and `decision` (taglines) pages
- The inventory page at `/inventory` renders the Bloomberg Terminal-style grid
- Asset ingestion via `DropZoneIngest` → `auto-tagger.ts` pipeline classifies files by region, process, category
- `LABEL_NORMALIZATIONS` maps raw handwritten Indonesian labels to corrected English forms
- PDF export generates a structured booklet definition (not actual PDF rendering — needs jsPDF/pdfmake integration)

---

## Writing Style Guide: Jamie (Royal New York) Communication Protocol

### Core Positioning

When writing for Jamie, embody a PhD-level specialty coffee intelligence analyst who translates complex origin dynamics into actionable business intelligence. Tone: authoritative yet accessible, data-anchored, tied to Jamie's strategic decision-making framework.

### Audience Profile

- **Authority Level:** Final decision-maker (President/CEO Purchasing & Sales, Royal New York)
- **Experience:** 12+ years specialty coffee imports
- **Risk Tolerance:** Low — demands proven repeatability before innovation
- **Decision Drivers:** Data, stability, differentiation, time efficiency
- **Geographic Expertise:** Central/South America, East Africa (traditional); Indonesia (strategic expansion)
- **Volume Scale:** FCL container loads

### Mandatory Writing Principles

#### 1. Lead with Strategic Context, Not Features

- Wrong: "We offer high-quality Indonesian coffee with unique processing methods."
- Right: "Indonesia's 7% annual growth in specialty coffee represents a structural de-risking opportunity against Brazil's endemic tariff volatility — the exact supply chain hedge Royal New York needs for long-term cost predictability."

#### 2. Anchor Every Claim to Jamie's Pain Points

Every paragraph must connect to one of Jamie's four core challenges:

| Pain Point | Writing Trigger Phrases |
|---|---|
| Market Volatility | "dependable cost basis," "hedge against price spikes," "tariff-insulated supply" |
| Supply Chain Risk | "climate-resistant origin," "geographic diversification," "secondary supply pillar" |
| Compliance & Time | "pre-shipment verification," "USDA-ready," "lab bottleneck elimination," "moisture/aflatoxin guaranteed" |
| Differentiation | "exclusive microlots," "never-hit-open-market," "proprietary access," "award-winning profiles" |

#### 3. Use Evidence Hierarchy

Structure arguments in this order:
1. **Market Reality** (macro trend Jamie can't ignore)
2. **Jamie's Specific Pain Point** (how it affects RNY operations)
3. **Bridge Solution** (why your team uniquely solves it)
4. **Proof Mechanism** (data, credentials, or structural advantage)

#### 4. Avoid Commodity Language

| Replace This | With This |
|---|---|
| "We source coffee" | "We provide structural supply chain access" |
| "High quality" | "Scientifically verified, compliance-ready" |
| "Unique flavors" | "Exclusive flavor profiles with proven roaster demand" |
| "Good relationships" | "Operational integration via spousal visa and family farm lockdown" |

### Language Precision

**Approved terminology:**
- "Strategic de-risking maneuver" (not "diversification")
- "Scientifically verified compliance" (not "quality assurance")
- "Exclusive microlot allocation" (not "special coffees")
- "Embedded origin infrastructure" (not "good connections")
- "Familiar flavor DNA, pushed forward" (not "innovative profiles")

**Forbidden phrases:**
- "Trust us" — use data/credentials instead
- "Passionate about coffee" — use operational capabilities
- "Farm-to-cup" — too generic; specify mechanism
- "Sustainable practices" — use scientific verification language

**Number usage — always include quantifiable proof:**
- Indonesia's 7% annual specialty growth
- 12x markup differential (Switzerland re-export model)
- 760,963 tons/year production (4th globally)
- GL-Index 1.45-2.57 for USA market profitability

### Tone Calibration

- **Authoritative but not academic:** PhD-level reasoning, avoid jargon Jamie must decode
- **Consultative, not salesy:** Position as strategic advisor, not vendor
- **Outcome-focused:** Every paragraph ends with "what this means for RNY"

**Sentence structure:**
- Lead sentences: Strategic thesis (12-15 words)
- Supporting sentences: Evidence + mechanism (15-20 words)
- Conclusion sentences: Commercial implication (10-12 words)

### Quality Control Checklist (Jamie-Facing Content)

- [ ] Explicitly names one of Jamie's four pain points
- [ ] Explains why Java Bridge uniquely solves it (not just that you do)
- [ ] Includes quantifiable proof (credential, data, or mechanism)
- [ ] Avoids commodity language ("quality," "passionate," "relationships")
- [ ] Ends with a clear commercial implication or next step
- [ ] Tone is consultative (strategic advisor) not transactional (vendor)

### Jamie's Pain Points vs. The Bridge Solution (ICIE Trio)

| Jamie's Pain Point | The Bridge Solution | Strategic Value to RNY |
|---|---|---|
| **Market Volatility & Cost Unpredictability** | Strategic de-risking: Indonesia as stable, high-capacity alternative to tariff-strained Brazil | Dependable cost basis and long-term supply stability, protecting RNY from price spikes |
| **Compliance Delays & QC Time** | Scientific Certainty (Fika): Pre-shipment moisture/aflatoxin testing, PhD soil analysis | Converts regulatory risk into guaranteed compliance, eliminates NYC lab bottlenecks |
| **Lack of Differentiation & Exclusivity** | Total Lockdown Access (Chris & Tyko): Spousal visa + local ties secure exclusive micro-lots never on open market | Unique award-winning profiles for RNY's premium segment, competitive advantage over standard traders |
| **Flavor Profile Risk** | Familiar Flavor DNA, Pushed Forward: Profiles (Honey East Java, Anaerobic Bali) build on Jamie's Blue Moon preference | Innovate portfolio with tropical complexity without re-educating existing U.S. roaster base |

### Structural Templates

**Template A: Pain Point → Solution Bridge**
```
[Pain Point Headline]
Jamie's Challenge: [Specific operational friction]
Market Driver: [Why this is worsening]
Bridge Solution: [How your team structurally solves it]
Proof: [Credential, data point, or mechanism]
```

**Template B: Differentiation Narrative**
```
[Competitive Context]
What Standard Sourcing Delivers: [Commodity approach]
What Royal New York Needs: [Jamie's unmet requirement]
What Java Bridge Provides: [Unique structural advantage]
```

### Content-Specific Applications

**Pitch Decks:** Market reality → Why standard sourcing fails → Bridge solution → Proof mechanisms → Specific next step (never "Let us know")

**Email Subject Lines:** Always lead with strategic context
- Right: "Indonesia's 7% Growth + RNY's Tariff Hedge Strategy"
- Wrong: "New Coffee Samples Available"

**Sample Presentations:** Lead with strategic fit, not cupping scores. Format: "Familiar anchor (Blue Moon) + Innovation vector (Honey process) = Menu gap solution"

---

## Indonesia & Java: The Perfect Moment (Market Intelligence)

Indonesia — and East Java specifically — sits at a structural inflection point that makes it the most strategically valuable coffee origin for U.S. specialty importers. Here's why, backed by data:

### 1. Brazil's Supply Crisis Creates a Structural Vacuum

Brazil produces ~40% of the world's coffee, but is in sustained crisis:

- **Drought devastation:** Minas Gerais received as little as 1% of normal rainfall in critical weeks (Oct 2025). Arabica production fell 6.4% to 40.9M bags for 2025/26.
- **Record prices:** Arabica futures hit historic high of $4.41/lb (Feb 2025), then $4.38/lb (Oct 2025). Exchange-monitored Arabica stocks fell to 1.75-year low of 398,645 bags.
- **Tariff shock:** U.S. imposed 50% tariff on Brazilian coffee (Jul 2025), reducing U.S. imports from Brazil by 46% in August alone. Small/mid-sized roasters report collapsing margins.
- **Fifth consecutive deficit year:** Volcafe projects a global Arabica deficit of 8.5M bags for 2025/26.
- **La Nina probability at 71%** for late 2025, threatening the 2026/27 crop as well.

*Sources: USDA FAS Coffee Annual, Daily Coffee News, Perfect Daily Grind, Inc.*

### 2. Cyclone Senyar Decimated Sumatra (Nov 2025)

Indonesia's traditional specialty origin — Sumatra — was devastated:

- **Cyclone Senyar** (Nov 25, 2025): The second documented tropical cyclone to form in the Strait of Malacca. Dropped ~400mm (16 inches) of rain across Sumatra.
- **1,501 deaths** across Indonesia, Thailand, and Malaysia. **3.3 million people affected**, 1.1 million displaced.
- **Gayo Highlands completely cut off** — road access severed to one of Indonesia's most important Arabica regions.
- **US$19.8 billion in total damages.** 170,050 houses damaged.
- Infrastructure destruction (roads buried under 3-meter floods) severely disrupted coffee transport and supply chains.

*Sources: NASA Earth Observatory, Mongabay, Daily Coffee News, Wikipedia*

### 3. East Java Was Untouched

While Sumatra was devastated, East Java's coffee infrastructure remained fully intact:

- **Geographic protection:** East Java sits in a different geological zone, shielded from Sumatra's cyclone path.
- **Stable infrastructure:** Roads, processing facilities, and export logistics fully operational.
- **No production disruption:** The 2025/26 harvest proceeded on schedule.

### 4. Indonesia Is Hitting Record Production

Despite Sumatra's losses, Indonesia overall is surging:

- **2025/26 production forecast:** 11.3M bags (60kg), up 5% year-over-year — a record.
- **Exports forecast:** 7.8M bags, up from 6.1M (April-August 2025 shipments already 83% above prior year).
- **4th largest producer globally**, contributing 5% of world coffee supply.
- **Domestic consumption:** 4.81M bags (world's 5th largest consumer), growing ~5%/year — Asia's fastest-rising market.

*Sources: USDA FAS, World Coffee Research, Statista*

### 5. East Java's Volcanic Terroir Is Unmatched

The Ijen Plateau and surrounding East Java highlands provide structural advantages no other origin can replicate:

- **Volcanic soil:** Rich in potassium, phosphorus, and magnesium. Porous basaltic structure provides ideal drainage. Centuries of eruptions create nutrient density that enhances flavor complexity.
- **Altitude:** 1,100-1,800 masl. Cooler temperatures slow cherry maturation, allowing sugars and organic acids to concentrate — producing cleaner, more complex cups.
- **Day/night temperature swings** promote aromatic compound production. Signature profile: soft citrus brightness, light florals, sweet herbal layers, tea-like body.
- **Defect rate:** 2% (East Java) vs. 18% (Sumatra average) — thanks to PhD-level genetic selection and processing protocols.
- **Heritage varieties:** Typica and Bourbon, especially suited to East Java's volcanic soil. 54 Geographical Indications across Indonesia.

*Sources: FNB Coffee, XLIII Coffee, Specialty Coffee Indonesia*

### 6. The Market Timing Is Perfect

- **Brazil in crisis** → U.S. roasters desperately need alternative supply
- **Sumatra devastated** → Indonesia's traditional specialty origin is offline
- **East Java untouched** → The only stable, high-quality Indonesian origin with intact infrastructure
- **Indonesia at record production** → Supply is available and growing
- **Rupiah depreciated 3%** → Indonesian coffee is more price-competitive for U.S. buyers
- **U.S. specialty market GL-Index: 2.57** → Most profitable specialty market globally
- **Indonesia's 7% CAGR** in specialty coffee → Structural growth, not a cycle
- **12x markup differential** → Switzerland re-exports Indonesian coffee at $31.2K vs Indonesia's $2.6K export price

### 7. Why Standard Sourcing Cannot Compete

A standard sourcing model (volume aggregators like INDOKOM or in-house senior traders) cannot solve the structural issues:

- **Quality:** Open-market lots carry Sumatra's 18% average defect rate
- **Compliance:** Fragmented smallholder ecosystem lacks standardized pre-export QC
- **Exclusivity:** Open-market means competitors have identical inventory
- **Access:** Fly-in buyers rent relationships; Java Bridge owns them through marriage, residency, and family integration

The Bridge's structural advantage: **spousal visa + PhD agricultural science + 30-year family network = the only U.S.-Indonesian team with permanent embedded access to East Java's protected reserves.**
