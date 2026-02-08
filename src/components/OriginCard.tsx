import { type OriginProfile, PALETTE } from "@/data/content";

interface OriginCardProps {
  origin: OriginProfile;
}

export default function OriginCard({ origin }: OriginCardProps) {
  return (
    <div
      className="p-6 rounded-sm border"
      style={{
        borderColor: PALETTE.gold,
        backgroundColor: `${PALETTE.cloth}ee`,
      }}
    >
      <h3
        className="text-lg font-serif mb-1"
        style={{ color: PALETTE.cream }}
      >
        {origin.name}
      </h3>
      <p
        className="text-xs tracking-[0.2em] uppercase mb-3"
        style={{ color: PALETTE.gold }}
      >
        {origin.region} &middot; {origin.process}
      </p>
      <div className="flex flex-wrap gap-2">
        {origin.notes.map((note) => (
          <span
            key={note}
            className="text-xs px-2 py-1 rounded-full"
            style={{
              backgroundColor: `${PALETTE.gold}22`,
              color: PALETTE.gold,
              border: `1px solid ${PALETTE.gold}44`,
            }}
          >
            {note}
          </span>
        ))}
      </div>
    </div>
  );
}
