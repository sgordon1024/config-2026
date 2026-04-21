"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Playfair_Display, DM_Sans, Space_Mono } from "next/font/google"
import type { Designer } from "./registry"

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? ""

const serif = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
})
const sans = DM_Sans({ subsets: ["latin"], weight: ["300", "400", "500"] })
const mono = Space_Mono({ subsets: ["latin"], weight: ["400"] })

const HERO_QUOTE = "Config reminded me that the best systems leave room for the unexpected."

const LEARNINGS = [
  {
    tag: "Variables & Tokens",
    talk: "\"Tokens Are Dead, Long Live Tokens\" — Karim Halabi, Figma",
    title: "It was never about the name",
    body: "Karim spent 40 minutes destroying every token naming convention I've ever used and replacing them with something better: intention. The token doesn't describe the color. It describes the decision. I've already rewritten half our system.",
  },
  {
    tag: "Systems Thinking",
    talk: "\"When Your System Becomes a Cage\" — Jina Anne",
    title: "A system that can't say no is just a rulebook",
    body: "Jina's talk hit like a gut punch. She made the case that the most successful systems she's seen all have an explicit escape hatch — a way for designers to break the rules and document why. We've never built that in. We're building it now.",
  },
  {
    tag: "AI + Design",
    talk: "\"Designing With, Not For\" — Keynote, Day 2",
    title: "The model doesn't know what matters",
    body: "The keynote on AI in design kept circling back to one idea: AI is very good at knowing what's possible and very bad at knowing what's important. That gap is where designers live. I wrote \"designers decide what matters\" on my hand and didn't wash it off all day.",
  },
  {
    tag: "Craft & Courage",
    talk: "\"On Finishing Things\" — Frank Chimero",
    title: "The best talks were personal",
    body: "Frank talked for 30 minutes about a project he never shipped. No product lesson, no framework, no takeaway — just a story about making something and letting it go. It got a standing ovation. Every session that stayed with me had a moment of vulnerability in it.",
  },
  {
    tag: "Team & Process",
    talk: "\"The Handoff Is a Lie\" — Panel, Main Stage",
    title: "Design systems aren't finish lines",
    body: "Four design system leads. One recurring theme: the systems that thrive are the ones where the people who built them never stopped tending to them. Not because the work was unfinished — because the product never stopped changing.",
  },
]

const CLOSING = "I came for the craft talks. I left thinking about courage."

const PULL_QUOTE = "The model doesn't know what matters. That gap is where designers live."

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
}

export default function MayaPage({ designer }: { designer: Designer }) {
  return (
    <main className="min-h-screen bg-black text-white" style={{ fontFamily: sans.style.fontFamily }}>
      <Link
        href="/"
        className="fixed top-6 left-6 text-xs uppercase tracking-[0.2em] text-white/30 hover:text-white/60 transition-colors z-50"
      >
        Config 2026
      </Link>

      {/* Hero */}
      <section className="relative min-h-screen flex flex-col justify-end overflow-hidden">
        {designer.photo ? (
          <div className="absolute inset-0">
            <img
              src={`${BASE}${designer.photo}`}
              alt={designer.name}
              className="w-full h-full object-cover object-top"
              style={{ filter: "grayscale(1) contrast(1.1) brightness(0.85)" }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.88) 70%, #000 100%)",
              }}
            />
          </div>
        ) : (
          <div
            className="absolute inset-0"
            style={{ background: "radial-gradient(ellipse at 60% 30%, #1a0533 0%, #000 65%)" }}
          />
        )}

        <div className="relative z-10 px-8 md:px-20 pb-24 max-w-5xl">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-xs uppercase tracking-[0.3em] mb-5 font-medium"
            style={{ color: "#C9A96E", fontFamily: mono.style.fontFamily }}
          >
            {designer.role} / Config 2026
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="font-black leading-none mb-10"
            style={{
              fontFamily: serif.style.fontFamily,
              fontSize: "clamp(72px, 13vw, 160px)",
              letterSpacing: "-0.03em",
            }}
          >
            {designer.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6 }}
            className="max-w-lg text-xl md:text-2xl leading-relaxed"
            style={{
              fontFamily: serif.style.fontFamily,
              fontStyle: "italic",
              color: "rgba(255,255,255,0.6)",
            }}
          >
            &ldquo;{HERO_QUOTE}&rdquo;
          </motion.p>
        </div>
      </section>

      {/* Intro strip */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        transition={{ duration: 0.6 }}
        className="px-8 md:px-20 py-16 border-t border-b"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <p
          className="text-sm uppercase tracking-[0.2em] max-w-3xl leading-loose"
          style={{ color: "rgba(255,255,255,0.3)", fontFamily: mono.style.fontFamily }}
        >
          Five days. Forty-something talks. A few that changed things.
          Below are the ones I&rsquo;m still thinking about.
        </p>
      </motion.div>

      {/* Learnings */}
      <section className="py-8">
        {LEARNINGS.map((item, i) => (
          <motion.article
            key={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={fadeUp}
            transition={{ duration: 0.7 }}
            className="px-8 md:px-20 py-16 border-b"
            style={{ borderColor: "rgba(255,255,255,0.06)" }}
          >
            <div className="max-w-3xl" style={{ marginLeft: "auto", marginRight: "auto" }}>
              <div className="flex items-center gap-4 mb-4">
                <span
                  className="text-xs uppercase tracking-widest font-medium px-2 py-1"
                  style={{
                    color: "#C9A96E",
                    border: "1px solid rgba(201,169,110,0.3)",
                    fontFamily: mono.style.fontFamily,
                  }}
                >
                  {item.tag}
                </span>
                <span
                  className="text-xs"
                  style={{ color: "rgba(255,255,255,0.2)", fontFamily: mono.style.fontFamily }}
                >
                  0{i + 1} / 0{LEARNINGS.length}
                </span>
              </div>

              <p
                className="text-xs mb-6 leading-relaxed"
                style={{
                  color: "rgba(255,255,255,0.25)",
                  fontFamily: mono.style.fontFamily,
                  letterSpacing: "0.05em",
                }}
              >
                {item.talk}
              </p>

              <h2
                className="font-bold mb-5 leading-tight"
                style={{
                  fontFamily: serif.style.fontFamily,
                  fontSize: "clamp(26px, 3.5vw, 44px)",
                }}
              >
                {item.title}
              </h2>

              <p
                className="text-lg leading-relaxed"
                style={{ color: "rgba(255,255,255,0.5)", fontFamily: sans.style.fontFamily, fontWeight: 300 }}
              >
                {item.body}
              </p>
            </div>
          </motion.article>
        ))}
      </section>

      {/* Pull quote */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={fadeUp}
        transition={{ duration: 0.8 }}
        className="px-8 md:px-20 py-32 text-center"
        style={{ background: "radial-gradient(ellipse at center, #0f0520 0%, #000 70%)" }}
      >
        <p
          className="mx-auto font-black leading-none"
          style={{
            fontFamily: serif.style.fontFamily,
            fontStyle: "italic",
            fontSize: "clamp(32px, 5.5vw, 72px)",
            color: "rgba(255,255,255,0.9)",
            maxWidth: "900px",
            letterSpacing: "-0.02em",
          }}
        >
          &ldquo;{PULL_QUOTE}&rdquo;
        </p>
        <p
          className="mt-8 text-xs uppercase tracking-widest"
          style={{ color: "#C9A96E", fontFamily: mono.style.fontFamily }}
        >
          Day 2 Keynote
        </p>
      </motion.section>

      {/* Photo interlude (if photo exists) */}
      {designer.photo && (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.8 }}
          className="px-8 md:px-20 py-16"
        >
          <div className="max-w-sm mx-auto">
            <img
              src={`${BASE}${designer.photo}`}
              alt={designer.name}
              className="w-full"
              style={{
                filter: "grayscale(1) contrast(1.15)",
                aspectRatio: "3/4",
                objectFit: "cover",
                objectPosition: "top",
              }}
            />
            <p
              className="mt-4 text-xs text-center uppercase tracking-widest"
              style={{ color: "rgba(255,255,255,0.2)", fontFamily: mono.style.fontFamily }}
            >
              San Francisco, May 2026
            </p>
          </div>
        </motion.div>
      )}

      {/* Closing */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={fadeUp}
        transition={{ duration: 0.8 }}
        className="px-8 md:px-20 py-32"
        style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
      >
        <p
          className="font-bold leading-tight"
          style={{
            fontFamily: serif.style.fontFamily,
            fontStyle: "italic",
            fontSize: "clamp(32px, 5vw, 64px)",
            color: "rgba(255,255,255,0.45)",
            maxWidth: "700px",
            letterSpacing: "-0.02em",
          }}
        >
          &ldquo;{CLOSING}&rdquo;
        </p>

        <div
          className="mt-12 pt-12 flex items-center gap-6"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div>
            <p
              className="font-black text-lg"
              style={{ fontFamily: serif.style.fontFamily }}
            >
              {designer.name}
            </p>
            <p
              className="text-xs uppercase tracking-widest mt-1"
              style={{ color: "rgba(255,255,255,0.3)", fontFamily: mono.style.fontFamily }}
            >
              {designer.role}
            </p>
          </div>
        </div>
      </motion.section>
    </main>
  )
}
