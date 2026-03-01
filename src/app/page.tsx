import CoverPage from "@/components/CoverPage";
import PageSection from "@/components/PageSection";
import { PAGES, TAGLINES, PALETTE } from "@/data/content";

export default function Home() {
  return (
    <main>
      {PAGES.map((page) => {
        // Cover page gets the full visual treatment
        if (page.id === "cover") {
          return <CoverPage key={page.id} />;
        }

        // Closing page gets taglines
        if (page.id === "closing") {
          return (
            <section
              key={page.id}
              id={page.id}
              className="min-h-screen flex items-center justify-center py-20 px-6"
              style={{ backgroundColor: PALETTE.kraft, color: PALETTE.espresso }}
            >
              <div className="max-w-2xl w-full space-y-8">
                <div className="space-y-4">
                  <h2
                    className="text-sm tracking-[0.3em] uppercase font-light"
                    style={{ color: PALETTE.cloth }}
                  >
                    {page.title}
                  </h2>
                  <p className="text-2xl md:text-3xl font-serif leading-tight">
                    {page.hook}
                  </p>
                </div>
                <div className="space-y-3">
                  {page.body.map((line, i) => (
                    <p key={i} className="text-base font-light leading-relaxed">
                      {line}
                    </p>
                  ))}
                </div>
                <div className="space-y-4 pt-6">
                  {TAGLINES.map((tagline, i) => (
                    <p key={i} className="text-lg font-serif italic" style={{ color: PALETTE.cloth }}>
                      {tagline}
                    </p>
                  ))}
                </div>
              </div>
            </section>
          );
        }

        return <PageSection key={page.id} page={page} />;
      })}
    </main>
  );
}
