import PageSection from "@/components/PageSection";
import OriginCard from "@/components/OriginCard";
import SampleFlightCard from "@/components/SampleFlightCard";
import { PAGES, ORIGINS, SAMPLE_FLIGHTS, TAGLINES, PALETTE } from "@/data/content";

export default function Home() {
  return (
    <main>
      {PAGES.map((page) => {
        // Origins page gets origin cards
        if (page.id === "origins") {
          return (
            <section
              key={page.id}
              id={page.id}
              className="min-h-screen py-20 px-6"
              style={{ backgroundColor: PALETTE.kraft, color: PALETTE.espresso }}
            >
              <div className="max-w-3xl mx-auto space-y-8">
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
                <div className="grid gap-4 md:grid-cols-2">
                  {ORIGINS.map((origin) => (
                    <OriginCard key={origin.name} origin={origin} />
                  ))}
                </div>
              </div>
            </section>
          );
        }

        // Revenue page gets sample flight cards
        if (page.id === "revenue") {
          return (
            <section
              key={page.id}
              id={page.id}
              className="min-h-screen py-20 px-6"
              style={{ backgroundColor: PALETTE.cloth, color: PALETTE.cream }}
            >
              <div className="max-w-3xl mx-auto space-y-8">
                <div className="space-y-4">
                  <h2
                    className="text-sm tracking-[0.3em] uppercase font-light"
                    style={{ color: PALETTE.gold }}
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
                <div>
                  <p
                    className="text-xs tracking-[0.2em] uppercase mb-4"
                    style={{ color: PALETTE.gold }}
                  >
                    Sample &amp; Discovery Program
                  </p>
                  <div className="grid gap-4 md:grid-cols-3">
                    {SAMPLE_FLIGHTS.map((flight) => (
                      <SampleFlightCard key={flight.name} flight={flight} />
                    ))}
                  </div>
                </div>
                {page.proof && (
                  <div className="space-y-2 pt-4">
                    {page.proof.map((item, i) => (
                      <p key={i} className="text-sm tracking-wide" style={{ color: PALETTE.gold }}>
                        {item}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </section>
          );
        }

        // Decision page gets taglines
        if (page.id === "decision") {
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
