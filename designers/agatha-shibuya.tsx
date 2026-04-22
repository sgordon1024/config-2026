"use client"

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? ""

/**
 * DESIGNER PAGE TEMPLATE
 *
 * Copy this file, rename it to your-name.tsx, and make it your own.
 * You have full control — swap colors, fonts, layout, add images, whatever.
 * The `designer` prop gives you your name, photo path, and role automatically.
 */


import Link from "next/link"
import type { Designer } from "./registry"

// ─── Your content ────────────────────────────────────────────────────────────

const HERO_QUOTE = "Write your big takeaway or theme here."

const LEARNINGS: { title: string; body: string }[] = [
  {
    title: "Learning one",
    body: "Describe what you learned, saw, or felt here.",
  },
  {
    title: "Learning two",
    body: "Keep it personal — this is your voice.",
  },
  {
    title: "Learning three",
    body: "Add as many or as few as you like.",
  },
]

const CLOSING = "One final thought to leave the reader with."

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TemplatePage({ designer }: { designer: Designer }) {
  return (
    <main className="min-h-screen text-white font-sans" style={{ backgroundColor: "var(--sp-bg)" }}>
      {/* Back link */}
      <Link
        href="/"
        className="fixed top-6 left-6 text-sm text-white/40 hover:text-white transition-colors z-50"
      >
        ← Config 2026
      </Link>

      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-8 text-center">
        {designer.photo && (
          <img src={`${BASE}${designer.photo}`} alt={designer.name} className="absolute inset-0 w-full h-full object-cover opacity-20" />
        )}
        <div className="relative z-10 max-w-2xl">
          <p className="text-sm uppercase tracking-widest text-white/50 mb-4">
            {designer.role ?? "Designer"}
          </p>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-8">
            {designer.name}
          </h1>
          <p className="text-xl md:text-2xl text-white/70 italic">{HERO_QUOTE}</p>
        </div>
      </section>

      {/* Learnings */}
      <section className="max-w-3xl mx-auto px-8 py-24 space-y-20">
        {LEARNINGS.map((item, i) => (
          <article key={i}>
            <span className="text-xs uppercase tracking-widest text-white/30 mb-2 block">
              0{i + 1}
            </span>
            <h2 className="text-3xl font-bold mb-4">{item.title}</h2>
            <p className="text-lg text-white/70 leading-relaxed">{item.body}</p>
          </article>
        ))}
      </section>

      {/* Closing */}
      <section className="border-t border-white/10 px-8 py-24 text-center">
        <p className="text-2xl max-w-xl mx-auto text-white/60 italic">{CLOSING}</p>
      </section>
    </main>
  )
}
