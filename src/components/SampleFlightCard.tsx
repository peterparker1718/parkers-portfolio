import { type SampleFlight, PALETTE } from "@/data/content";

interface SampleFlightCardProps {
  flight: SampleFlight;
}

export default function SampleFlightCard({ flight }: SampleFlightCardProps) {
  return (
    <div
      className="p-5 rounded-sm border text-center"
      style={{
        borderColor: PALETTE.gold,
        backgroundColor: `${PALETTE.cloth}ee`,
      }}
    >
      <p
        className="text-xs tracking-[0.2em] uppercase mb-2"
        style={{ color: PALETTE.gold }}
      >
        {flight.name}
      </p>
      <p
        className="text-3xl font-serif mb-2"
        style={{ color: PALETTE.cream }}
      >
        ${flight.price}
      </p>
      <p className="text-sm" style={{ color: PALETTE.cream }}>
        {flight.includes}
      </p>
      <p
        className="text-xs mt-3 italic"
        style={{ color: `${PALETTE.gold}99` }}
      >
        100% credited toward first order
      </p>
    </div>
  );
}
