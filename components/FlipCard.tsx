"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import type { Designer } from "@/designers/registry"

// 11 unique tiles — one per designer slot, in order of registry
const TILES: { bg: string; shape: ShapeId; dark: boolean }[] = [
  { bg: "#FF5A1F", shape: "dots",        dark: false }, // Agatha     — orange, dot grid
  { bg: "#FFE600", shape: "rects",       dark: false }, // Courtney   — yellow, tumbling rects
  { bg: "#00CC52", shape: "blob",        dark: false }, // Greg       — kelly green, cloud blob
  { bg: "#4DB6F5", shape: "asterisk",    dark: false }, // Jiayu      — sky blue, asterisk
  { bg: "#7B4FFF", shape: "waves",       dark: true  }, // Kevin      — purple, wave bands
  { bg: "#FF3B3B", shape: "offcircle",   dark: false }, // Luiza      — red, off-edge circle
  { bg: "#00D4AA", shape: "diamonds",    dark: false }, // Margaret   — teal, diamond scatter
  { bg: "#C6FF40", shape: "arcs",        dark: false }, // Nicole     — lime, concentric arcs
  { bg: "#F2B8C6", shape: "triangles",   dark: false }, // Quan       — pink, triangle cluster
  { bg: "#FF8CB4", shape: "stripes",     dark: false }, // Ryan       — hot pink, diagonal stripes
  { bg: "#B8E4FF", shape: "petals",      dark: false }, // Steve      — ice blue, petal burst
]

type ShapeId =
  | "dots" | "rects" | "blob" | "asterisk" | "waves"
  | "offcircle" | "diamonds" | "arcs" | "triangles" | "stripes" | "petals"

interface FlipCardProps {
  designer: Designer
  tileIndex?: number
}

export default function FlipCard({ designer, tileIndex = 0 }: FlipCardProps) {
  const router = useRouter()
  const tile = TILES[Math.min(tileIndex, TILES.length - 1)]

  return (
    <>
      <style>{`
        .flip-card:hover .flip-inner { transform: rotateY(180deg); }
      `}</style>
      <div
        className="flip-card relative cursor-pointer select-none"
        style={{ width: 220, height: 300, perspective: 1200 }}
        onClick={() => router.push(`/designers/${designer.slug}`)}
      >
        <div
          className="flip-inner relative w-full h-full"
          style={{
            transformStyle: "preserve-3d",
            transition: "transform 0.65s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          {/* Front */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ backfaceVisibility: "hidden", backgroundColor: tile.bg }}
          >
            <TileShape shape={tile.shape} dark={tile.dark} />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <p
                className="font-black uppercase leading-none tracking-tighter"
                style={{ fontSize: 30, color: tile.dark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.55)" }}
              >
                CONFIG
              </p>
              <p
                className="text-xs uppercase tracking-widest mt-0.5"
                style={{ color: tile.dark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)" }}
              >
                2026
              </p>
            </div>
          </div>

          {/* Back — B&W grain photo */}
          <div
            className="absolute inset-0 flex flex-col justify-end overflow-hidden"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              filter: "grayscale(1) contrast(1.15)",
            }}
          >
            {designer.photo
              ? <Image src={designer.photo} alt={designer.name} fill sizes="220px" className="object-cover" />
              : <div className="absolute inset-0 bg-zinc-700" />
            }
            {/* grain */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.12'/%3E%3C/svg%3E")`,
                backgroundSize: "150px 150px",
                mixBlendMode: "overlay",
              }}
            />
            <div
              className="relative z-10 w-full p-4 pt-10"
              style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)" }}
            >
              <p className="text-white font-black text-lg uppercase leading-tight tracking-tight">
                {designer.name}
              </p>
              {designer.role && (
                <p className="text-white/50 text-xs mt-0.5 uppercase tracking-widest">{designer.role}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function TileShape({ shape, dark }: { shape: ShapeId; dark: boolean }) {
  const s = dark ? "rgba(255,255,255,0.22)" : "rgba(0,0,0,0.16)"
  const s2 = dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.09)"

  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg viewBox="0 0 220 300" className="absolute inset-0 w-full h-full" fill="none">

        {shape === "dots" && <>
          {Array.from({ length: 80 }).map((_, i) => {
            const x = Math.round(((i % 10) * 22 + 5 + Math.sin(i * 1.7) * 4) * 10) / 10
            const y = Math.round((Math.floor(i / 10) * 30 + 10 + Math.cos(i * 1.3) * 5) * 10) / 10
            const r = Math.round((3.5 + Math.sin(i * 0.9) * 2) * 10) / 10
            return <circle key={i} cx={x} cy={y} r={r} fill={s} />
          })}
        </>}

        {shape === "rects" && <>
          <rect x="25"  y="30"  width="90" height="90" fill={s}  transform="rotate(-10 70 75)" />
          <rect x="80"  y="95"  width="85" height="85" fill={s}  transform="rotate(8 122 137)" />
          <rect x="40"  y="175" width="78" height="78" fill={s}  transform="rotate(-14 79 214)" />
          <rect x="130" y="195" width="55" height="55" fill={s2} transform="rotate(20 157 222)" />
        </>}

        {shape === "blob" && <>
          <ellipse cx="110" cy="145" rx="75" ry="82" fill={s} />
          <ellipse cx="145" cy="112" rx="52" ry="46" fill={s} />
          <ellipse cx="75"  cy="168" rx="44" ry="50" fill={s} />
          <circle  cx="55"  cy="115" r="32"           fill={s} />
          <circle  cx="158" cy="178" r="30"           fill={s} />
          <circle  cx="130" cy="212" r="20"           fill={s2} />
        </>}

        {shape === "asterisk" && <>
          <g transform="translate(110,148)">
            {[0, 40, 80, 120, 160].map(a => (
              <rect key={a} x="-12" y="-72" width="24" height="144" rx="12" fill={s} transform={`rotate(${a})`} />
            ))}
          </g>
          <circle cx="110" cy="148" r="16" fill={s} />
        </>}

        {shape === "waves" && <>
          <path d="M0 60 Q55 38 110 60 Q165 82 220 60 L220 90 Q165 112 110 90 Q55 68 0 90 Z"   fill={s} />
          <path d="M0 130 Q55 108 110 130 Q165 152 220 130 L220 160 Q165 182 110 160 Q55 138 0 160 Z" fill={s} />
          <path d="M0 200 Q55 178 110 200 Q165 222 220 200 L220 230 Q165 252 110 230 Q55 208 0 230 Z" fill={s} />
          <path d="M0 270 Q55 248 110 270 Q165 292 220 270 L220 300 L0 300 Z"                   fill={s2} />
        </>}

        {shape === "offcircle" && <>
          <circle cx="180" cy="75"  r="120" fill={s} />
          <circle cx="28"  cy="245" r="42"  fill={s} />
          <circle cx="75"  cy="275" r="18"  fill={s2} />
          <circle cx="15"  cy="185" r="14"  fill={s2} />
        </>}

        {shape === "diamonds" && <>
          <rect x="60"  y="25"  width="70" height="70" fill={s}  transform="rotate(45 95 60)" />
          <rect x="120" y="115" width="58" height="58" fill={s}  transform="rotate(45 149 144)" />
          <rect x="18"  y="140" width="52" height="52" fill={s}  transform="rotate(45 44 166)" />
          <rect x="130" y="220" width="62" height="62" fill={s2} transform="rotate(45 161 251)" />
          <rect x="20"  y="230" width="36" height="36" fill={s2} transform="rotate(45 38 248)" />
        </>}

        {shape === "arcs" && <>
          <path d="M220 300 A200 200 0 0 0 20  100"  stroke={s}  strokeWidth="32" fill="none" strokeLinecap="round" />
          <path d="M220 300 A140 140 0 0 0 80  160"  stroke={s}  strokeWidth="32" fill="none" strokeLinecap="round" />
          <path d="M220 300 A80  80  0 0 0 140 220"  stroke={s}  strokeWidth="32" fill="none" strokeLinecap="round" />
          <path d="M220 300 A35  35  0 0 0 185 265"  stroke={s2} strokeWidth="24" fill="none" strokeLinecap="round" />
        </>}

        {shape === "triangles" && <>
          <polygon points="110,18 170,118 50,118"   fill={s} />
          <polygon points="32,145 92,245 -28,245"   fill={s} />
          <polygon points="168,158 228,258 108,258" fill={s} />
          <polygon points="145,55  180,118 110,118" fill={s2} />
        </>}

        {shape === "stripes" && <>
          {[-40, 20, 80, 140, 200, 260].map((x, i) => (
            <rect key={i} x={x} y="-40" width="38" height="400" fill={i % 2 === 0 ? s : s2} transform={`rotate(-38 ${x + 19} 180)`} />
          ))}
        </>}

        {shape === "petals" && <>
          {[0, 60, 120, 180, 240, 300].map(a => (
            <ellipse
              key={a}
              cx="110" cy="150"
              rx="20" ry="68"
              fill={s}
              transform={`rotate(${a} 110 150)`}
            />
          ))}
          <circle cx="110" cy="150" r="22" fill={s} />
        </>}

      </svg>
    </div>
  )
}
