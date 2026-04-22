"use client"

const ITEMS = [
  "Config 2026",
  "San Francisco",
  "June 23–25",
  "Moscone Center",
  "Designer Takeaways",
  "Figma's Annual Conference",
]

export default function Ticker() {
  const repeated = [...ITEMS, ...ITEMS, ...ITEMS]

  return (
    <div
      className="w-full overflow-hidden border-b"
      style={{
        height: 40,
        backgroundColor: "var(--sp-bg)",
        borderColor: "rgba(255,255,255,var(--sp-border-opacity))",
      }}
    >
      <div
        className="flex items-center gap-0 whitespace-nowrap ticker-track"
        style={{ willChange: "transform" }}
      >
        {repeated.map((item, i) => (
          <span key={i} className="flex items-center gap-0">
            <span
              className="text-xs uppercase px-5 py-0 leading-10"
              style={{ letterSpacing: "0.18em", color: "rgba(255,255,255,0.5)" }}
            >
              {item}
            </span>
            <span style={{ color: "var(--sp-accent)", fontSize: "0.65rem" }}>✦</span>
          </span>
        ))}
      </div>
      <style>{`
        @keyframes ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }
        .ticker-track {
          animation: ticker calc(28s / max(var(--sp-animation-speed), 0.1)) linear infinite;
        }
      `}</style>
    </div>
  )
}
