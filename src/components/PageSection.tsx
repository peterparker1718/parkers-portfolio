import { type PageContent, PALETTE } from "@/data/content";

interface PageSectionProps {
  page: PageContent;
}

export default function PageSection({ page }: PageSectionProps) {
  const isCloth = page.background === "cloth";
  const bgColor = isCloth ? PALETTE.cloth : PALETTE.kraft;
  const textColor = isCloth ? PALETTE.cream : PALETTE.espresso;
  const accentColor = isCloth ? PALETTE.gold : PALETTE.cloth;

  return (
    <section
      id={page.id}
      className="min-h-screen flex items-center justify-center py-20 px-6"
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      <div className="max-w-2xl w-full space-y-8">
        {/* Layer 1: Title + Hook (one-liner) */}
        <div className="space-y-4">
          <h2
            className="text-sm tracking-[0.3em] uppercase font-light"
            style={{ color: accentColor }}
          >
            {page.title}
          </h2>
          <p className="text-2xl md:text-3xl font-serif leading-tight">
            {page.hook}
          </p>
        </div>

        {/* Batik diamond border */}
        <div
          className="flex items-center gap-2 opacity-40"
          style={{ color: accentColor }}
        >
          <span>&#9670;</span>
          <div className="flex-1 h-px" style={{ backgroundColor: accentColor }} />
          <span>&#9670;</span>
          <div className="flex-1 h-px" style={{ backgroundColor: accentColor }} />
          <span>&#9670;</span>
        </div>

        {/* Layer 2: Body (three-liner) */}
        <div className="space-y-3">
          {page.body.map((line, i) => (
            <p key={i} className="text-base md:text-lg font-light leading-relaxed">
              {line}
            </p>
          ))}
        </div>

        {/* Layer 3: Proof / Visual */}
        {page.proof && (
          <div className="space-y-2 pt-4">
            {page.proof.map((item, i) => (
              <p
                key={i}
                className="text-sm tracking-wide"
                style={{ color: accentColor }}
              >
                {item}
              </p>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
