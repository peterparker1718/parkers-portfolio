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
