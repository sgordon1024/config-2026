import DriftCanvas from "@/components/DriftCanvas"
import Ticker from "@/components/Ticker"
import { designers } from "@/designers/registry"
import Image from "next/image"

// Config 2026 green glyph strip from their CDN
const GLYPH_STRIP_URL =
  "https://cdn.sanity.io/images/zzn8a256/config2026-staging/95c35f33d659a6c92323a4d1209f137b950fa1ee-3840x900.png?w=3840&q=75&fit=clip&auto=format"

export default function Home() {
  return (
    <main className="flex flex-col w-screen h-screen overflow-hidden" style={{ backgroundColor: "var(--sp-bg)" }}>
      {/* Ticker — top */}
      <Ticker />

      {/* Main canvas — fills remaining height */}
      <div className="relative flex-1 flex items-center justify-center overflow-hidden">
        {/* CONFIG wordmark — ghost background */}
        <h1
          className="absolute select-none pointer-events-none font-black uppercase leading-none tracking-tighter z-0"
          style={{
            fontSize: "clamp(72px, 20vw, 280px)",
            color: "rgba(255,255,255,0.03)",
            letterSpacing: "-0.04em",
          }}
          aria-label="Config 2026"
        >
          CONFIG
        </h1>

        {/* Drifting cards */}
        <div className="absolute inset-0 z-10">
          <DriftCanvas designers={designers} />
        </div>

        {/* Empty state */}
        {designers.length === 0 && (
          <p className="relative z-20 text-white/20 text-xs tracking-[0.3em] uppercase">
            Designers coming soon
          </p>
        )}
      </div>

      {/* Config green glyph strip — bottom decoration */}
      <div className="relative w-full overflow-hidden shrink-0" style={{ height: 72 }}>
        <Image
          src={GLYPH_STRIP_URL}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
          unoptimized
          loading="eager"
        />
      </div>
    </main>
  )
}
