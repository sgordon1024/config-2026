"use client"

import Link from "next/link"
import type { Designer } from "./registry"

const HERO_QUOTE = "Motion is meaning. Every transition is a sentence."

const LEARNINGS = [
  {
    title: "Prototyping is thinking",
    body: "Half the Config talks I attended weren't about the final product — they were about what people discovered while prototyping. The prototype is the argument.",
  },
  {
    title: "AI tools are collaboration, not replacement",
    body: "The designers using AI best were using it to move faster through the boring parts and slower through the interesting ones.",
  },
  {
    title: "Community is the product",
    body: "Config isn't really about the tool announcements. It's about finding out that the problem you thought was yours alone is everyone's.",
  },
]

const CLOSING = "Same tool, different worlds."

export default function JordanPage({ designer }: { designer: Designer }) {
  return (
    <main
      className="min-h-screen text-white"
      style={{
        fontFamily: "var(--font-inter)",
        background: "linear-gradient(135deg, #0c4a6e 0%, #000 60%)",
      }}
    >
      <Link
        href="/"
        className="fixed top-6 left-6 text-sm text-white/40 hover:text-white transition-colors z-50"
      >
        ← Config 2026
      </Link>

      <section className="min-h-screen flex flex-col items-start justify-end px-12 pb-20 max-w-5xl mx-auto">
        <p className="text-sm uppercase tracking-widest text-cyan-400/70 mb-3">{designer.role}</p>
        <h1
          className="font-black uppercase leading-none text-white mb-8"
          style={{ fontSize: "clamp(60px, 14vw, 180px)" }}
        >
          {designer.name}
        </h1>
        <p className="text-xl md:text-2xl text-white/50 italic max-w-xl">{HERO_QUOTE}</p>
      </section>

      <section className="max-w-4xl mx-auto px-12 py-24 grid md:grid-cols-3 gap-12">
        {LEARNINGS.map((item, i) => (
          <article key={i}>
            <span className="text-4xl font-black text-cyan-400/20 block mb-4">0{i + 1}</span>
            <h2 className="text-xl font-bold mb-3">{item.title}</h2>
            <p className="text-base text-white/50 leading-relaxed">{item.body}</p>
          </article>
        ))}
      </section>

      <section className="px-12 py-20 max-w-4xl mx-auto">
        <p className="text-4xl font-black text-white/20">{CLOSING}</p>
      </section>
    </main>
  )
}
