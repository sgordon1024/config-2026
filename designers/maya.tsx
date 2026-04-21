"use client"

import Image from "next/image"
import Link from "next/link"
import type { Designer } from "./registry"

const HERO_QUOTE = "Config reminded me that the best systems leave room for the unexpected."

const LEARNINGS = [
  {
    title: "Design systems aren't finish lines",
    body: "The most talked-about systems at Config were alive — constantly iterated on, not handed off and forgotten.",
  },
  {
    title: "Variables changed everything",
    body: "Seeing how teams use Figma Variables in production made me rethink how I document tokens. It's not about the token name, it's about the intent.",
  },
  {
    title: "The best talks were personal",
    body: "Every session that stayed with me had a moment of vulnerability in it. Speaking from experience beats speaking from expertise.",
  },
]

const CLOSING = "I came for the craft talks. I left thinking about courage."

export default function MayaPage({ designer }: { designer: Designer }) {
  return (
    <main className="min-h-screen bg-black text-white" style={{ fontFamily: "var(--font-inter)" }}>
      <Link
        href="/"
        className="fixed top-6 left-6 text-sm text-white/40 hover:text-white transition-colors z-50"
      >
        ← Config 2026
      </Link>

      <section className="relative min-h-screen flex flex-col items-center justify-center px-8 text-center">
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse at center, #3b0764 0%, #000 70%)" }}
        />
        <div className="relative z-10 max-w-2xl">
          <p className="text-sm uppercase tracking-widest text-purple-400/70 mb-4">{designer.role}</p>
          <h1 className="text-6xl md:text-8xl font-black leading-none mb-8">{designer.name}</h1>
          <p className="text-xl md:text-2xl text-white/60 italic leading-relaxed">{HERO_QUOTE}</p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-8 py-24 space-y-20">
        {LEARNINGS.map((item, i) => (
          <article key={i} className="border-t border-white/10 pt-10">
            <span className="text-xs uppercase tracking-widest text-purple-400/50 mb-2 block">0{i + 1}</span>
            <h2 className="text-3xl font-bold mb-4">{item.title}</h2>
            <p className="text-lg text-white/60 leading-relaxed">{item.body}</p>
          </article>
        ))}
      </section>

      <section className="border-t border-white/10 px-8 py-24 text-center">
        <p className="text-2xl max-w-xl mx-auto text-white/50 italic">{CLOSING}</p>
      </section>
    </main>
  )
}
