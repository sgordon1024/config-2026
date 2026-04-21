"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Playfair_Display, DM_Sans } from "next/font/google"
import type { Designer } from "./registry"

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? ""

const serif = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
})
const sans = DM_Sans({ subsets: ["latin"], weight: ["300", "400", "500"] })

const HERO_QUOTE = "Config reminded me that the best systems leave room for the unexpected."

const LEARNINGS = [
  {
    title: "Design systems aren't finish lines",
    body: "The most talked-about systems at Config were alive. Constantly iterated on, never handed off and forgotten.",
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

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: "easeOut" } },
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
              style={{ filter: "grayscale(1) contrast(1.05) brightness(0.85)" }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0.93) 75%, #000 100%)",
              }}
            />
          </div>
        ) : (
          <div
            className="absolute inset-0"
            style={{ background: "radial-gradient(ellipse at 60% 40%, #1a0533 0%, #000 65%)" }}
          />
        )}

        <div className="relative z-10 px-8 md:px-20 pb-24 max-w-5xl">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-xs uppercase tracking-[0.3em] mb-5 font-medium"
            style={{ color: "#C9A96E" }}
          >
            {designer.role}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.45, ease: "easeOut" }}
            className="font-black leading-none mb-10"
            style={{
              fontFamily: serif.style.fontFamily,
              fontSize: "clamp(56px, 10vw, 130px)",
              letterSpacing: "-0.025em",
            }}
          >
            {designer.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.65, ease: "easeOut" }}
            className="max-w-xl text-xl md:text-2xl leading-relaxed"
            style={{
              fontFamily: serif.style.fontFamily,
              fontStyle: "italic",
              color: "rgba(255,255,255,0.65)",
            }}
          >
            &ldquo;{HERO_QUOTE}&rdquo;
          </motion.p>
        </div>
      </section>

      {/* Learnings */}
      <section className="px-8 md:px-20 py-32">
        <div className="max-w-3xl space-y-24">
          {LEARNINGS.map((item, i) => (
            <motion.article
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={fadeUp}
              className="grid gap-6 md:gap-16"
              style={{ gridTemplateColumns: "56px 1fr" }}
            >
              <span
                className="text-xs uppercase tracking-widest mt-1 font-medium"
                style={{ color: "#C9A96E" }}
              >
                0{i + 1}
              </span>
              <div>
                <h2
                  className="font-bold mb-5 leading-snug"
                  style={{
                    fontFamily: serif.style.fontFamily,
                    fontSize: "clamp(24px, 3vw, 38px)",
                  }}
                >
                  {item.title}
                </h2>
                <p
                  className="text-lg leading-relaxed font-light"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                >
                  {item.body}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Closing */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={fadeUp}
        className="px-8 md:px-20 py-32"
        style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
      >
        <p
          className="font-bold leading-tight"
          style={{
            fontFamily: serif.style.fontFamily,
            fontStyle: "italic",
            fontSize: "clamp(28px, 4vw, 52px)",
            color: "rgba(255,255,255,0.5)",
            maxWidth: "680px",
          }}
        >
          &ldquo;{CLOSING}&rdquo;
        </p>
      </motion.section>
    </main>
  )
}
