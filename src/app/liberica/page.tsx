import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Java Volcanic Liberica — Coffee's Best-Kept Secret | Java Bridge Coffee",
  description:
    "100% Coffea Liberica from East Java. A rare, low-altitude species with massive sweetness and exotic notes of jackfruit and woodsmoke.",
};

const CLOTH = "#342C22";
const KRAFT = "#d4896b";
const GOLD = "#c9a84c";
const CREAM = "#f5f5dc";
const ESPRESSO = "#4a3528";
const TERRACOTTA = "#c97d5d";

export default function LibericaPage() {
  return (
    <main style={{ fontFamily: "'Source Sans 3', 'Calibri', sans-serif" }}>

      {/* ============================================================ */}
      {/* HERO — Full viewport, dark cloth                             */}
      {/* ============================================================ */}
      <section
        className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden"
        style={{ backgroundColor: CLOTH, color: CREAM }}
      >
        {/* Background volcanic smoke texture */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `radial-gradient(ellipse at 50% 80%, ${GOLD} 0%, transparent 60%)`,
        }} />

        {/* Species label */}
        <p
          className="relative z-10 text-[10px] tracking-[0.6em] uppercase mb-6"
          style={{ color: GOLD }}
        >
          Coffea Liberica &middot; East Java &middot; Volcanic Origin
        </p>

        {/* Main headline */}
        <h1
          className="relative z-10 text-[2.2rem] md:text-[3.2rem] leading-[1.08] max-w-[700px] mb-8"
          style={{ fontFamily: "'Playfair Display', 'Georgia', serif", fontWeight: 700 }}
        >
          Java Volcanic Liberica
        </h1>

        {/* Ornamental divider */}
        <div className="relative z-10 flex items-center gap-3 mb-8 w-full max-w-[400px]">
          <div className="flex-1 h-px" style={{ backgroundColor: GOLD, opacity: 0.4 }} />
          <svg width="16" height="16" viewBox="0 0 16 16">
            <rect x="8" y="0" width="11.3" height="11.3" transform="rotate(45 8 8)" fill="none" stroke={GOLD} strokeWidth="1" opacity="0.7" />
          </svg>
          <div className="flex-1 h-px" style={{ backgroundColor: GOLD, opacity: 0.4 }} />
        </div>

        {/* Subtitle */}
        <p
          className="relative z-10 text-[1.1rem] md:text-[1.35rem] max-w-[560px] leading-relaxed font-light mb-10"
          style={{ fontFamily: "'Playfair Display', 'Georgia', serif", fontStyle: "italic", color: CREAM, opacity: 0.85 }}
        >
          Coffee&rsquo;s Best-Kept Secret Comes to America
        </p>

        {/* Three stat pills */}
        <div className="relative z-10 flex flex-wrap items-center justify-center gap-6 mb-12">
          {[
            { num: "~500", label: "Bags Worldwide" },
            { num: "3rd", label: "Distinct Species" },
            { num: "<1,000", label: "Feet Elevation" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-[1.8rem] md:text-[2.2rem] leading-none mb-1" style={{
                fontFamily: "'Playfair Display', 'Georgia', serif",
                fontWeight: 700,
                color: GOLD,
              }}>{stat.num}</p>
              <p className="text-[9px] tracking-[0.3em] uppercase" style={{ color: TERRACOTTA }}>{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Intro paragraph */}
        <p className="relative z-10 text-base md:text-lg max-w-[580px] leading-relaxed font-light opacity-80 mb-4">
          A rare Liberica expression from volcanic East Java, grown below 1,000 feet &mdash;
          virtually unknown in U.S. specialty coffee. Not Arabica. Not Robusta. A distinct species
          with an exceptional flavor profile that defies modern coffee conventions.
        </p>
        <p className="relative z-10 text-sm max-w-[500px] leading-relaxed font-light opacity-60">
          This limited allotment (~500 bags worldwide) comes directly from our sustainable
          Indonesian partners to your cup. One species, one origin, one chance.
        </p>

        {/* Volcanic mountain SVG at bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 800 140" className="w-full" preserveAspectRatio="xMidYMax meet">
            <g fill="none" stroke={GOLD} strokeWidth="1" strokeLinejoin="round" opacity="0.25">
              <path d="M0,140 L80,125 L150,110 L200,105 L250,98 L290,102 L330,92 L360,85 L380,78 L395,72 L400,70 L405,72 L420,78 L440,85 L470,92 L510,102 L550,98 L600,105 L650,110 L720,125 L800,140" />
              <path d="M0,140 L100,132 L200,125 L300,118 L350,115 L375,112 L390,110 L400,109 L410,110 L425,112 L450,115 L500,118 L600,125 L700,132 L800,140" />
              <path d="M398,70 L396,62 L399,55 L395,48" strokeWidth="0.6" opacity="0.5" />
              <path d="M403,70 L405,63 L402,56 L406,50" strokeWidth="0.6" opacity="0.5" />
            </g>
          </svg>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 1 — The "Anti-Specialty" — Kraft background          */}
      {/* ============================================================ */}
      <section className="py-20 px-6" style={{ backgroundColor: KRAFT, color: ESPRESSO }}>
        <div className="max-w-2xl mx-auto">
          {/* Section label */}
          <p className="text-[10px] tracking-[0.4em] uppercase mb-4" style={{ color: CLOTH, opacity: 0.6 }}>
            01 &mdash; Geographic Defiance
          </p>

          <h2 className="text-[1.6rem] md:text-[2rem] leading-tight mb-6" style={{
            fontFamily: "'Playfair Display', 'Georgia', serif", fontWeight: 700, color: CLOTH,
          }}>
            The &ldquo;Anti-Specialty&rdquo; That Thrives<br />Below 1,000 Feet
          </h2>

          {/* Divider */}
          <div className="flex items-center gap-2 mb-8 opacity-40" style={{ color: CLOTH }}>
            <span>&#9670;</span>
            <div className="flex-1 h-px" style={{ backgroundColor: CLOTH }} />
            <span>&#9670;</span>
          </div>

          <div className="space-y-5 text-[1.05rem] leading-relaxed font-light">
            <p>
              In the specialty world, we are conditioned to believe that higher altitude equals higher quality.
              This coffee breaks that rule entirely.
            </p>
            <p>
              While Arabica struggles and demands high elevations to escape pests and heat, this Liberica
              thrives in the hot, humid tropical valleys of East Java, growing happily below 1,000 feet.
              It doesn&rsquo;t just survive &mdash; it <em>flourishes</em> in marginal lands where other
              specialty coffee cannot grow.
            </p>
            <p>
              A story of geographical defiance and ancestral stewardship. Javanese farming families have
              cultivated this species for generations, utilizing shade trees, organic amendments, and the
              mineral-rich volcanic soils near Mt. Bromo. Their ecological wisdom creates a premium product
              in terrain where conventional specialty said it shouldn&rsquo;t exist.
            </p>
            <p>
              Liberica&rsquo;s natural disease resistance and climate resilience make it the future of
              low-altitude specialty coffee &mdash; shade-grown, sustainable, and thriving where Arabica
              cannot survive.
            </p>
          </div>

          {/* Altitude comparison strip */}
          <div className="mt-10 flex gap-0 rounded overflow-hidden" style={{ border: `1px solid ${CLOTH}30` }}>
            <div className="flex-1 py-5 px-4 text-center" style={{ backgroundColor: `${CLOTH}15` }}>
              <p className="text-[1.8rem] leading-none mb-1" style={{
                fontFamily: "'Playfair Display', 'Georgia', serif", fontWeight: 700, color: CLOTH,
              }}>1,100+</p>
              <p className="text-[9px] tracking-[0.2em] uppercase" style={{ color: CLOTH, opacity: 0.6 }}>Feet &mdash; Arabica Needs</p>
            </div>
            <div className="w-px" style={{ backgroundColor: `${CLOTH}20` }} />
            <div className="flex-1 py-5 px-4 text-center" style={{ backgroundColor: `${CLOTH}15` }}>
              <p className="text-[1.8rem] leading-none mb-1" style={{
                fontFamily: "'Playfair Display', 'Georgia', serif", fontWeight: 700, color: CLOTH,
              }}>&lt;1,000</p>
              <p className="text-[9px] tracking-[0.2em] uppercase" style={{ color: CLOTH, opacity: 0.6 }}>Feet &mdash; Liberica Thrives</p>
            </div>
            <div className="w-px" style={{ backgroundColor: `${CLOTH}20` }} />
            <div className="flex-1 py-5 px-4 text-center" style={{ backgroundColor: `${CLOTH}15` }}>
              <p className="text-[1.8rem] leading-none mb-1" style={{
                fontFamily: "'Playfair Display', 'Georgia', serif", fontWeight: 700, color: CLOTH,
              }}>60ft</p>
              <p className="text-[9px] tracking-[0.2em] uppercase" style={{ color: CLOTH, opacity: 0.6 }}>Tree Height</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 2 — A Distinct Species — Dark cloth                  */}
      {/* ============================================================ */}
      <section className="py-20 px-6" style={{ backgroundColor: CLOTH, color: CREAM }}>
        <div className="max-w-2xl mx-auto">
          <p className="text-[10px] tracking-[0.4em] uppercase mb-4" style={{ color: GOLD, opacity: 0.6 }}>
            02 &mdash; Genetic Identity
          </p>

          <h2 className="text-[1.6rem] md:text-[2rem] leading-tight mb-6" style={{
            fontFamily: "'Playfair Display', 'Georgia', serif", fontWeight: 700,
          }}>
            Not a Blend, Not a Varietal.<br />
            <span style={{ color: GOLD }}>A Distinct Species.</span>
          </h2>

          <div className="flex items-center gap-2 mb-8 opacity-30" style={{ color: GOLD }}>
            <span>&#9670;</span>
            <div className="flex-1 h-px" style={{ backgroundColor: GOLD }} />
            <span>&#9670;</span>
          </div>

          <div className="space-y-5 text-[1.05rem] leading-relaxed font-light opacity-90">
            <p>
              This is not a marketing gimmick or a hybrid. This is <strong style={{ color: GOLD, fontWeight: 600 }}>Coffea liberica</strong>,
              a distinct species &mdash; one of the four globally recognized coffee species alongside
              Arabica, Robusta, and Excelsa. Its genetics are public-domain, its heritage centuries deep.
            </p>
            <p>
              To look at it is to know it is different. The trees grow to a towering 60 feet. The beans themselves are
              massive, asymmetrical &ldquo;monster beans&rdquo; with a distinctive physical hook. The volcanic
              Java terroir &mdash; mineral-rich soils near Mt. Bromo &mdash; imparts unique sweet and complex notes
              impossible to replicate elsewhere.
            </p>
            <p>
              Historically, these giant beans were nearly impossible to process correctly due to their tough, thick pulp.
              But now, through meticulous modern processing by our partners at Indonesia Specialty Coffee (ISC),
              this one-of-a-kind Liberica has been transformed into a Crown Jewel.
            </p>
          </div>

          {/* Species comparison cards */}
          <div className="mt-10 grid grid-cols-3 gap-[2px]">
            {[
              { species: "Arabica", share: "~60%", trait: "Altitude-dependent, delicate, complex acidity" },
              { species: "Robusta", share: "~38%", trait: "Hardy, bitter, high caffeine, low complexity" },
              { species: "Liberica", share: "~1%", trait: "Massive beans, low altitude, extreme sweetness" },
            ].map((s, i) => (
              <div key={s.species} className="py-5 px-4 text-center" style={{
                backgroundColor: i === 2 ? `${GOLD}20` : `${ESPRESSO}90`,
                border: i === 2 ? `1px solid ${GOLD}50` : "none",
              }}>
                <p className="text-[1.4rem] leading-none mb-2" style={{
                  fontFamily: "'Playfair Display', 'Georgia', serif",
                  fontWeight: 700,
                  color: i === 2 ? GOLD : CREAM,
                }}>{s.species}</p>
                <p className="text-[1.6rem] leading-none mb-2" style={{
                  fontFamily: "'Roboto Mono', monospace",
                  color: i === 2 ? GOLD : TERRACOTTA,
                }}>{s.share}</p>
                <p className="text-[10px] leading-snug font-light" style={{ color: CREAM, opacity: 0.7 }}>{s.trait}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 3 — Flavor Profile — Kraft                           */}
      {/* ============================================================ */}
      <section className="py-20 px-6" style={{ backgroundColor: KRAFT, color: ESPRESSO }}>
        <div className="max-w-2xl mx-auto">
          <p className="text-[10px] tracking-[0.4em] uppercase mb-4" style={{ color: CLOTH, opacity: 0.6 }}>
            03 &mdash; The Cup
          </p>

          <h2 className="text-[1.6rem] md:text-[2rem] leading-tight mb-2" style={{
            fontFamily: "'Playfair Display', 'Georgia', serif", fontWeight: 700, color: CLOTH,
          }}>
            Sweetness Without Sugar.
          </h2>

          <p className="text-[1.05rem] font-light mb-8" style={{ color: ESPRESSO, opacity: 0.7 }}>
            If you blind-tasted this, you might not guess it was coffee.
          </p>

          <div className="flex items-center gap-2 mb-8 opacity-40" style={{ color: CLOTH }}>
            <span>&#9670;</span>
            <div className="flex-1 h-px" style={{ backgroundColor: CLOTH }} />
            <span>&#9670;</span>
          </div>

          <div className="space-y-5 text-[1.05rem] leading-relaxed font-light mb-12">
            <p>
              Because Liberica beans are so large, they retain more cherry sugars during maturation.
              The result is a naturally tea-like and intensely sweet cup, possessing a heavy body with
              almost zero perceived acidity.
            </p>
            <p className="italic" style={{ fontFamily: "'Playfair Display', 'Georgia', serif", color: CLOTH }}>
              Perhaps most surprising for a coffee with this much body: it contains lower caffeine than Arabica.
            </p>
          </div>

          {/* Tasting notes visual — three cards */}
          <div className="grid grid-cols-3 gap-4 mb-10">
            <div className="text-center py-6 px-3 rounded" style={{ backgroundColor: `${CLOTH}10`, border: `1px solid ${CLOTH}20` }}>
              <p className="text-[2rem] mb-2">&#127821;</p>
              <p className="text-[11px] tracking-[0.2em] uppercase font-semibold mb-1" style={{ color: CLOTH }}>The Exotic</p>
              <p className="text-[13px] font-light leading-snug">
                Ripe Jackfruit<br />Grilled Pineapple
              </p>
            </div>
            <div className="text-center py-6 px-3 rounded" style={{ backgroundColor: `${CLOTH}10`, border: `1px solid ${CLOTH}20` }}>
              <p className="text-[2rem] mb-2">&#127794;</p>
              <p className="text-[11px] tracking-[0.2em] uppercase font-semibold mb-1" style={{ color: CLOTH }}>The Complex</p>
              <p className="text-[13px] font-light leading-snug">
                Smoky, Woody<br />Islay Scotch &middot; Mesquite
              </p>
            </div>
            <div className="text-center py-6 px-3 rounded" style={{ backgroundColor: `${CLOTH}10`, border: `1px solid ${CLOTH}20` }}>
              <p className="text-[2rem] mb-2">&#127804;</p>
              <p className="text-[11px] tracking-[0.2em] uppercase font-semibold mb-1" style={{ color: CLOTH }}>The Finish</p>
              <p className="text-[13px] font-light leading-snug">
                Deep Floral<br />Lingering Syrupy Sweet
              </p>
            </div>
          </div>

          {/* Cup profile bars */}
          <div className="space-y-3">
            {[
              { label: "Body", pct: 95 },
              { label: "Sweetness", pct: 92 },
              { label: "Acidity", pct: 12 },
              { label: "Caffeine", pct: 28 },
            ].map((bar) => (
              <div key={bar.label} className="flex items-center gap-3">
                <p className="text-[10px] tracking-[0.15em] uppercase w-20 text-right" style={{ color: CLOTH, opacity: 0.7 }}>
                  {bar.label}
                </p>
                <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ backgroundColor: `${CLOTH}15` }}>
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${bar.pct}%`, backgroundColor: bar.pct > 50 ? CLOTH : TERRACOTTA }}
                  />
                </div>
                <p className="text-[10px] w-8" style={{ fontFamily: "'Roboto Mono', monospace", color: CLOTH, opacity: 0.5 }}>
                  {bar.pct}%
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 4 — Rarity — Dark cloth                              */}
      {/* ============================================================ */}
      <section className="py-20 px-6" style={{ backgroundColor: CLOTH, color: CREAM }}>
        <div className="max-w-2xl mx-auto">
          <p className="text-[10px] tracking-[0.4em] uppercase mb-4" style={{ color: GOLD, opacity: 0.6 }}>
            04 &mdash; Scarcity
          </p>

          <h2 className="text-[1.6rem] md:text-[2rem] leading-tight mb-6" style={{
            fontFamily: "'Playfair Display', 'Georgia', serif", fontWeight: 700,
          }}>
            Vanishingly Rare.<br />
            <span style={{ color: GOLD }}>1% of Global Supply.</span>
          </h2>

          <div className="flex items-center gap-2 mb-8 opacity-30" style={{ color: GOLD }}>
            <span>&#9670;</span>
            <div className="flex-1 h-px" style={{ backgroundColor: GOLD }} />
            <span>&#9670;</span>
          </div>

          <div className="space-y-5 text-[1.05rem] leading-relaxed font-light opacity-90">
            <p>
              You cannot find this at a big-box store. You rarely find it at third-wave roasters.
              Liberica represents roughly 1&ndash;2% of total global coffee production. Almost all of it is
              consumed domestically in Southeast Asia.
            </p>
            <p>
              To secure a traceable, high-quality, sustainable micro-lot from volcanic East Java for
              the U.S. market is an agricultural feat. This allotment &mdash; approximately 500 bags
              worldwide &mdash; comes from a single Indonesian region, processed by partners
              with 12+ years of specialty export experience.
            </p>
            <p style={{ fontFamily: "'Playfair Display', 'Georgia', serif", fontStyle: "italic", color: GOLD }}>
              A true &ldquo;unicorn&rdquo; coffee for those seeking the absolute cutting edge of terroir and genetics.
              Deep floral and exotic fruit tones, smoky-sweet body, pineapple and jackfruit notes &mdash;
              all verified, all defensible, all yours.
            </p>
          </div>

          {/* Rarity visual — concentric circles */}
          <div className="mt-12 flex items-center justify-center">
            <div className="relative w-[280px] h-[280px]">
              {/* Arabica ring */}
              <div className="absolute inset-0 rounded-full border flex items-center justify-center" style={{ borderColor: `${CREAM}20` }}>
                <p className="absolute top-3 text-[9px] tracking-[0.2em] uppercase" style={{ color: CREAM, opacity: 0.4 }}>Arabica ~60%</p>
              </div>
              {/* Robusta ring */}
              <div className="absolute inset-[40px] rounded-full border flex items-center justify-center" style={{ borderColor: `${CREAM}25` }}>
                <p className="absolute top-2 text-[9px] tracking-[0.2em] uppercase" style={{ color: CREAM, opacity: 0.4 }}>Robusta ~38%</p>
              </div>
              {/* Liberica core */}
              <div className="absolute inset-[90px] rounded-full flex items-center justify-center" style={{
                backgroundColor: `${GOLD}20`, border: `2px solid ${GOLD}`,
              }}>
                <div className="text-center">
                  <p className="text-[1.8rem] leading-none" style={{
                    fontFamily: "'Playfair Display', 'Georgia', serif", fontWeight: 700, color: GOLD,
                  }}>1%</p>
                  <p className="text-[8px] tracking-[0.2em] uppercase mt-1" style={{ color: GOLD }}>Liberica</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 5 — Marketing Position — Kraft                       */}
      {/* ============================================================ */}
      <section className="py-20 px-6" style={{ backgroundColor: KRAFT, color: ESPRESSO }}>
        <div className="max-w-2xl mx-auto">
          <p className="text-[10px] tracking-[0.4em] uppercase mb-4" style={{ color: CLOTH, opacity: 0.6 }}>
            05 &mdash; How to Position It
          </p>

          <h2 className="text-[1.6rem] md:text-[2rem] leading-tight mb-6" style={{
            fontFamily: "'Playfair Display', 'Georgia', serif", fontWeight: 700, color: CLOTH,
          }}>
            The Marketing Pitch
          </h2>

          <div className="flex items-center gap-2 mb-8 opacity-40" style={{ color: CLOTH }}>
            <span>&#9670;</span>
            <div className="flex-1 h-px" style={{ backgroundColor: CLOTH }} />
            <span>&#9670;</span>
          </div>

          {/* The One-Liner */}
          <div className="mb-10 py-6 px-6 rounded" style={{ backgroundColor: `${CLOTH}10`, border: `1px solid ${CLOTH}20` }}>
            <p className="text-[9px] tracking-[0.3em] uppercase mb-3" style={{ color: CLOTH, opacity: 0.5 }}>The One-Liner</p>
            <p className="text-[1.1rem] leading-relaxed italic" style={{
              fontFamily: "'Playfair Display', 'Georgia', serif", color: CLOTH,
            }}>
              &ldquo;A rare Liberica expression grown in volcanic East Java below 1,000 feet &mdash;
              almost absent from U.S. specialty markets. ~500 bags exist worldwide. Deep floral tones,
              smoky-sweet body, and exotic jackfruit notes from a distinct species that defies every
              rule of altitude-driven quality.&rdquo;
            </p>
          </div>

          {/* Four selling pillars */}
          <div className="grid grid-cols-2 gap-4">
            {[
              {
                num: "01",
                title: "Unprecedented Rarity",
                body: "Less than 2% of the world's coffee is Liberica. Almost none reaches the US.",
              },
              {
                num: "02",
                title: "The Third Species",
                body: "It's not Arabica, it's not Robusta. It's an entirely different genetic experience.",
              },
              {
                num: "03",
                title: "The Flavor Shock",
                body: "Low acid, heavy body, natural sweetness, and wild notes of jackfruit and pineapple.",
              },
              {
                num: "04",
                title: "Climate Resilience",
                body: "Thrives on marginal volcanic soils below 1,000 ft, resisting the diseases that threaten Arabica.",
              },
            ].map((pillar) => (
              <div key={pillar.num} className="py-5 px-5 rounded" style={{ backgroundColor: `${CLOTH}08`, border: `1px solid ${CLOTH}15` }}>
                <p className="text-[9px] tracking-[0.3em] uppercase mb-2" style={{
                  fontFamily: "'Roboto Mono', monospace", color: TERRACOTTA,
                }}>{pillar.num}</p>
                <p className="text-[0.95rem] font-semibold mb-2" style={{ color: CLOTH }}>{pillar.title}</p>
                <p className="text-[0.85rem] font-light leading-relaxed">{pillar.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 6 — Tech Specs — Dark cloth                          */}
      {/* ============================================================ */}
      <section className="py-20 px-6" style={{ backgroundColor: CLOTH, color: CREAM }}>
        <div className="max-w-2xl mx-auto">
          <p className="text-[10px] tracking-[0.4em] uppercase mb-4" style={{ color: GOLD, opacity: 0.6 }}>
            06 &mdash; Specifications
          </p>

          <h2 className="text-[1.6rem] md:text-[2rem] leading-tight mb-6" style={{
            fontFamily: "'Playfair Display', 'Georgia', serif", fontWeight: 700,
          }}>
            Just the Facts.
          </h2>

          <div className="flex items-center gap-2 mb-10 opacity-30" style={{ color: GOLD }}>
            <span>&#9670;</span>
            <div className="flex-1 h-px" style={{ backgroundColor: GOLD }} />
            <span>&#9670;</span>
          </div>

          {/* Spec table */}
          <div className="space-y-0" style={{ border: `1px solid ${GOLD}30`, borderRadius: 4 }}>
            {[
              { label: "Species", value: "100% Coffea liberica — distinct species (not a blend or varietal)" },
              { label: "Origin", value: "East Java, Indonesia — volcanic range, near Mt. Bromo" },
              { label: "Elevation", value: "Below 1,000 ft (low-altitude resilience)" },
              { label: "Allotment", value: "~500 bags worldwide — single-region micro-lot" },
              { label: "Exporter", value: "Indonesia Specialty Coffee (ISC) — 12+ years experience" },
              { label: "Cultivation", value: "Shade-grown, organic amendments, ancestral stewardship" },
              { label: "Traits", value: "Large asymmetrical beans, \"hook\" shape, low caffeine" },
              { label: "Flavor", value: "Deep floral, jackfruit/pineapple, smoky-sweet body, low acidity" },
              { label: "IP Status", value: "Public-domain species — no variety patents on Indonesian Liberica" },
            ].map((row, i) => (
              <div
                key={row.label}
                className="flex items-start gap-4 px-5 py-4"
                style={{
                  borderBottom: i < 8 ? `1px solid ${GOLD}15` : "none",
                  backgroundColor: i % 2 === 0 ? "transparent" : `${ESPRESSO}40`,
                }}
              >
                <p className="text-[10px] tracking-[0.2em] uppercase w-28 shrink-0 pt-0.5" style={{
                  fontFamily: "'Roboto Mono', monospace", color: GOLD, opacity: 0.8,
                }}>{row.label}</p>
                <p className="text-[0.95rem] font-light leading-snug">{row.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* FOOTER — CTA + Contact                                       */}
      {/* ============================================================ */}
      <section className="py-16 px-6 text-center" style={{ backgroundColor: KRAFT, color: CLOTH }}>
        <div className="max-w-xl mx-auto">
          <p className="text-[10px] tracking-[0.5em] uppercase mb-6" style={{ color: TERRACOTTA }}>
            Java Bridge Coffee
          </p>
          <p className="text-[1.4rem] md:text-[1.8rem] leading-tight mb-4" style={{
            fontFamily: "'Playfair Display', 'Georgia', serif", fontWeight: 700,
          }}>
            ~500 Bags Worldwide. This Is Your Allocation Window.
          </p>
          <p className="text-base font-light mb-8 opacity-80">
            One species, one origin, one micro-lot. A rare Liberica expression from volcanic East Java
            with deep floral tones, smoky-sweet body, and exotic fruit notes &mdash; verified, traceable,
            and almost entirely absent from U.S. specialty markets. Contact us to secure your position.
          </p>

          <div className="flex items-center gap-2 mb-6 max-w-[300px] mx-auto opacity-40" style={{ color: CLOTH }}>
            <span>&#9670;</span>
            <div className="flex-1 h-px" style={{ backgroundColor: CLOTH }} />
            <span>&#9670;</span>
          </div>

          <p className="text-sm font-light">
            Chris Parker &nbsp;|&nbsp; Dr. Fika Ayu Safitri
          </p>
          <p className="text-sm mt-1" style={{ fontFamily: "'Roboto Mono', monospace", color: TERRACOTTA }}>
            christopher@parkersportfolio.info
          </p>
          <p className="text-xs mt-3 italic opacity-60">
            East Java to New York. No Middlemen.
          </p>
        </div>
      </section>

    </main>
  );
}
