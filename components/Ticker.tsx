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
  // Duplicate items so the loop is seamless
  const repeated = [...ITEMS, ...ITEMS, ...ITEMS]

  return (
    <div
      className="w-full overflow-hidden border-b border-white/10 bg-black"
      style={{ height: 40 }}
    >
      <div
        className="flex items-center gap-0 whitespace-nowrap"
        style={{
          animation: "ticker 28s linear infinite",
          willChange: "transform",
        }}
      >
        {repeated.map((item, i) => (
          <span key={i} className="flex items-center gap-0">
            <span className="text-xs uppercase tracking-[0.18em] text-white/50 px-5 py-0 leading-10">
              {item}
            </span>
            <span className="text-white/20 text-xs">✦</span>
          </span>
        ))}
      </div>
      <style>{`
        @keyframes ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }
      `}</style>
    </div>
  )
}
