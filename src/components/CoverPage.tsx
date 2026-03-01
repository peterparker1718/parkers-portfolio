import { PALETTE } from "@/data/content";

/**
 * CoverPage — First page of the booklet.
 *
 * Design: Dark cloth background, centered headline,
 * three-photo ornamental gold frame, volcanic mountain
 * line illustration at the bottom.
 */
export default function CoverPage() {
  return (
    <section
      id="cover"
      className="relative min-h-screen flex flex-col items-center justify-between overflow-hidden"
      style={{ backgroundColor: PALETTE.cloth, color: PALETTE.cream }}
    >
      {/* ---- TOP: Headline ---- */}
      <div className="flex-1 flex flex-col items-center justify-center pt-16 pb-4 px-6 text-center">
        <h1
          className="text-[2rem] md:text-[2.6rem] leading-[1.15] tracking-tight max-w-[520px]"
          style={{
            fontFamily: "'Playfair Display', 'Georgia', serif",
            fontWeight: 700,
            color: PALETTE.cream,
          }}
        >
          Most Buyers Visit Indonesia.
          <br />
          I Married Into It.
        </h1>
      </div>

      {/* ---- MIDDLE: Ornamental Photo Frame ---- */}
      <div className="w-full flex flex-col items-center px-6">
        {/* Top ornament line */}
        <div className="flex items-center w-full max-w-[640px] mb-3">
          <div
            className="flex-1 h-px"
            style={{ backgroundColor: PALETTE.gold, opacity: 0.5 }}
          />
          <svg width="14" height="14" viewBox="0 0 14 14" className="mx-2">
            <rect
              x="7" y="0" width="9.9" height="9.9"
              transform="rotate(45 7 7)"
              fill="none" stroke={PALETTE.gold} strokeWidth="1"
            />
          </svg>
          <div
            className="flex-1 h-px"
            style={{ backgroundColor: PALETTE.gold, opacity: 0.5 }}
          />
          <svg width="14" height="14" viewBox="0 0 14 14" className="mx-2">
            <rect
              x="7" y="0" width="9.9" height="9.9"
              transform="rotate(45 7 7)"
              fill="none" stroke={PALETTE.gold} strokeWidth="1"
            />
          </svg>
          <div
            className="flex-1 h-px"
            style={{ backgroundColor: PALETTE.gold, opacity: 0.5 }}
          />
        </div>

        {/* Photo strip: 3 frames with gold ornamental borders */}
        <div className="flex items-stretch gap-0 w-full max-w-[640px]">
          {/* Left frame */}
          <div className="flex-1 relative">
            <div
              className="border p-[3px] m-[2px]"
              style={{ borderColor: `${PALETTE.gold}80` }}
            >
              <div
                className="border p-1"
                style={{ borderColor: `${PALETTE.gold}40` }}
              >
                <div
                  className="aspect-[4/3] flex items-center justify-center"
                  style={{
                    backgroundColor: `${PALETTE.espresso}cc`,
                    border: `1px solid ${PALETTE.gold}30`,
                  }}
                >
                  <div className="text-center px-2">
                    <p
                      className="text-[9px] tracking-[0.25em] uppercase mb-1"
                      style={{ color: PALETTE.gold, opacity: 0.7 }}
                    >
                      Photo 01
                    </p>
                    <p
                      className="text-[11px] italic"
                      style={{
                        fontFamily: "'Playfair Display', 'Georgia', serif",
                        color: PALETTE.cream,
                        opacity: 0.5,
                      }}
                    >
                      The Ceremony
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Center diamond separator */}
          <div className="flex flex-col items-center justify-center px-1">
            <div
              className="w-px flex-1"
              style={{ backgroundColor: PALETTE.gold, opacity: 0.3 }}
            />
            <svg width="12" height="12" viewBox="0 0 12 12" className="my-1">
              <rect
                x="6" y="0" width="8.49" height="8.49"
                transform="rotate(45 6 6)"
                fill={PALETTE.gold} fillOpacity="0.5"
              />
            </svg>
            <div
              className="w-px flex-1"
              style={{ backgroundColor: PALETTE.gold, opacity: 0.3 }}
            />
          </div>

          {/* Center frame */}
          <div className="flex-1 relative">
            <div
              className="border p-[3px] m-[2px]"
              style={{ borderColor: `${PALETTE.gold}80` }}
            >
              <div
                className="border p-1"
                style={{ borderColor: `${PALETTE.gold}40` }}
              >
                <div
                  className="aspect-[4/3] flex items-center justify-center"
                  style={{
                    backgroundColor: `${PALETTE.espresso}cc`,
                    border: `1px solid ${PALETTE.gold}30`,
                  }}
                >
                  <div className="text-center px-2">
                    <p
                      className="text-[9px] tracking-[0.25em] uppercase mb-1"
                      style={{ color: PALETTE.gold, opacity: 0.7 }}
                    >
                      Photo 02
                    </p>
                    <p
                      className="text-[11px] italic"
                      style={{
                        fontFamily: "'Playfair Display', 'Georgia', serif",
                        color: PALETTE.cream,
                        opacity: 0.5,
                      }}
                    >
                      The Partnership
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right diamond separator */}
          <div className="flex flex-col items-center justify-center px-1">
            <div
              className="w-px flex-1"
              style={{ backgroundColor: PALETTE.gold, opacity: 0.3 }}
            />
            <svg width="12" height="12" viewBox="0 0 12 12" className="my-1">
              <rect
                x="6" y="0" width="8.49" height="8.49"
                transform="rotate(45 6 6)"
                fill={PALETTE.gold} fillOpacity="0.5"
              />
            </svg>
            <div
              className="w-px flex-1"
              style={{ backgroundColor: PALETTE.gold, opacity: 0.3 }}
            />
          </div>

          {/* Right frame */}
          <div className="flex-1 relative">
            <div
              className="border p-[3px] m-[2px]"
              style={{ borderColor: `${PALETTE.gold}80` }}
            >
              <div
                className="border p-1"
                style={{ borderColor: `${PALETTE.gold}40` }}
              >
                <div
                  className="aspect-[4/3] flex items-center justify-center"
                  style={{
                    backgroundColor: `${PALETTE.espresso}cc`,
                    border: `1px solid ${PALETTE.gold}30`,
                  }}
                >
                  <div className="text-center px-2">
                    <p
                      className="text-[9px] tracking-[0.25em] uppercase mb-1"
                      style={{ color: PALETTE.gold, opacity: 0.7 }}
                    >
                      Photo 03
                    </p>
                    <p
                      className="text-[11px] italic"
                      style={{
                        fontFamily: "'Playfair Display', 'Georgia', serif",
                        color: PALETTE.cream,
                        opacity: 0.5,
                      }}
                    >
                      The Origin
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom ornament line */}
        <div className="flex items-center w-full max-w-[640px] mt-3">
          <div
            className="flex-1 h-px"
            style={{ backgroundColor: PALETTE.gold, opacity: 0.5 }}
          />
          <svg width="14" height="14" viewBox="0 0 14 14" className="mx-2">
            <rect
              x="7" y="0" width="9.9" height="9.9"
              transform="rotate(45 7 7)"
              fill="none" stroke={PALETTE.gold} strokeWidth="1"
            />
          </svg>
          <div
            className="flex-1 h-px"
            style={{ backgroundColor: PALETTE.gold, opacity: 0.5 }}
          />
          <svg width="14" height="14" viewBox="0 0 14 14" className="mx-2">
            <rect
              x="7" y="0" width="9.9" height="9.9"
              transform="rotate(45 7 7)"
              fill="none" stroke={PALETTE.gold} strokeWidth="1"
            />
          </svg>
          <div
            className="flex-1 h-px"
            style={{ backgroundColor: PALETTE.gold, opacity: 0.5 }}
          />
        </div>
      </div>

      {/* ---- BOTTOM: Volcanic Mountain Illustration ---- */}
      <div className="w-full mt-auto pt-8">
        <svg
          viewBox="0 0 800 220"
          className="w-full"
          preserveAspectRatio="xMidYMax meet"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Volcano range — gold line art */}
          <g fill="none" stroke={PALETTE.gold} strokeWidth="1.2" strokeLinejoin="round" opacity="0.55">
            {/* Far background ridge */}
            <path d="M0,210 L50,195 L100,180 L140,170 L170,175 L200,160 L230,155 L260,165 L290,150 L310,155 L340,140 L360,145 L380,130 L400,120 L420,130 L440,145 L460,140 L480,155 L510,150 L540,165 L570,155 L600,160 L630,175 L660,170 L690,180 L720,185 L750,195 L800,210" />

            {/* Mid ridge with crater detail */}
            <path d="M0,220 L80,205 L130,190 L165,185 L190,178 L210,183 L230,172 L250,168 L270,175 L295,162 L310,168 L330,155 L345,148 L355,142 L362,135 L370,128 L378,122 L385,118 L390,116 L395,115 L400,114 L405,115 L410,116 L415,118 L422,122 L430,128 L438,135 L445,142 L455,148 L470,155 L490,168 L505,162 L530,175 L550,168 L570,172 L590,183 L610,178 L635,185 L670,190 L720,205 L800,220" />

            {/* Crater smoke wisps */}
            <path d="M395,114 L393,105 L396,95 L392,87 L398,80" strokeWidth="0.8" opacity="0.4" />
            <path d="M405,114 L407,106 L403,97 L408,90 L404,82" strokeWidth="0.8" opacity="0.4" />

            {/* Left foreground volcano (Semeru-style) */}
            <path d="M0,220 L60,210 L100,198 L130,205 L160,195 L175,188 L185,180 L192,172 L197,166 L200,163 L203,166 L208,172 L215,180 L225,188 L240,195 L270,205 L310,210" />

            {/* Right foreground hill */}
            <path d="M500,210 L540,198 L570,190 L590,185 L610,188 L635,195 L660,200 L700,208 L740,212 L800,220" />

            {/* Treeline texture — foreground */}
            <g strokeWidth="0.6" opacity="0.3">
              <path d="M0,218 C20,215 40,216 60,214 C80,212 100,215 120,213 C140,211 160,214 180,212 C200,215 220,213 240,215 C260,213 280,215 300,214 C320,212 340,215 360,213" />
              <path d="M440,213 C460,215 480,212 500,214 C520,215 540,213 560,215 C580,213 600,215 620,214 C640,212 660,215 680,213 C700,215 720,214 740,216 C760,215 780,217 800,218" />
            </g>

            {/* Foreground terrain fill lines */}
            <g strokeWidth="0.4" opacity="0.2">
              <path d="M0,220 L800,220" />
              <path d="M0,217 C100,215 200,216 300,214 C400,213 500,214 600,216 C700,215 750,217 800,218" />
            </g>
          </g>

          {/* Gold glow effect at crater */}
          <circle cx="400" cy="114" r="6" fill={PALETTE.gold} fillOpacity="0.08" />
          <circle cx="400" cy="114" r="14" fill={PALETTE.gold} fillOpacity="0.04" />
        </svg>
      </div>
    </section>
  );
}
