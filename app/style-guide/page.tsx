"use client"

import Link from "next/link"
import { Playfair_Display, DM_Sans, Space_Mono, Bebas_Neue } from "next/font/google"

const serif = Playfair_Display({ subsets: ["latin"], weight: ["400", "700", "900"], style: ["normal", "italic"] })
const sans = DM_Sans({ subsets: ["latin"], weight: ["300", "400", "500", "700"] })
const mono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"] })
const display = Bebas_Neue({ subsets: ["latin"], weight: ["400"] })

// All values reference CSS variables set by StylePanel
const v = {
  accent: "var(--sp-accent)",
  surface: "var(--sp-surface)",
  border: "rgba(255,255,255,var(--sp-border-opacity))",
  muted: "rgba(255,255,255,0.35)",
  dim: "rgba(255,255,255,0.18)",
  contentWidth: "var(--sp-content-width)",
  spacing: "var(--sp-section-spacing)",
}

export default function StyleGuidePage() {
  return (
    <main style={{ minHeight: "100vh", fontSize: "var(--sp-font-size)" }}>
      <Link
        href="/"
        style={{ position: "fixed", top: 24, left: 24, fontSize: 11, color: v.muted, textDecoration: "none", letterSpacing: "0.15em", textTransform: "uppercase", zIndex: 50, fontFamily: mono.style.fontFamily }}
      >
        Config 2026
      </Link>

      <Link
        href={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/style-guide`}
        style={{ position: "fixed", top: 24, left: "50%", transform: "translateX(-50%)", fontSize: 10, color: v.dim, textDecoration: "none", letterSpacing: "0.2em", textTransform: "uppercase", zIndex: 50, fontFamily: mono.style.fontFamily }}
      >
        Style Guide
      </Link>

      {/* Header */}
      <section style={{ padding: `calc(var(--sp-section-spacing) * 1.2) 48px calc(var(--sp-section-spacing) * 0.75)`, borderBottom: `1px solid ${v.border}` }}>
        <div style={{ maxWidth: v.contentWidth, margin: "0 auto" }}>
          <p style={{ fontFamily: mono.style.fontFamily, fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: v.accent, marginBottom: 20 }}>
            Config 2026 / Style Guide
          </p>
          <h1
            style={{
              fontFamily: display.style.fontFamily,
              fontSize: "clamp(64px, 10vw, 140px)",
              lineHeight: 0.9,
              letterSpacing: "0.02em",
              color: "white",
              marginBottom: 32,
            }}
          >
            Design<br />Tokens
          </h1>
          <p style={{ fontFamily: sans.style.fontFamily, fontWeight: 300, fontSize: "1.1em", color: v.muted, maxWidth: 520, lineHeight: 1.7 }}>
            A living reference for the visual language of this site. Triple-click anywhere to open the style panel and change things live.
          </p>
        </div>
      </section>

      {/* Colors */}
      <Section label="01 / Colors">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 12 }}>
          {[
            { label: "Background", value: "var(--sp-bg)", swatch: "var(--sp-bg)", border: true },
            { label: "Surface", value: "var(--sp-surface)", swatch: "var(--sp-surface)", border: true },
            { label: "Accent", value: "var(--sp-accent)", swatch: "var(--sp-accent)", border: false },
            { label: "White", value: "#ffffff", swatch: "#ffffff", border: false },
            { label: "White 50%", value: "rgba(255,255,255,0.5)", swatch: "rgba(255,255,255,0.5)", border: false },
            { label: "White 20%", value: "rgba(255,255,255,0.2)", swatch: "rgba(255,255,255,0.2)", border: false },
            { label: "White 10%", value: "rgba(255,255,255,0.1)", swatch: "rgba(255,255,255,0.1)", border: false },
            { label: "Border", value: "var(--sp-border-opacity)", swatch: v.border, border: true },
          ].map(({ label, value, swatch, border }) => (
            <div key={label}>
              <div style={{
                height: 80, background: swatch, borderRadius: 6, marginBottom: 8,
                border: border ? "1px solid rgba(255,255,255,0.15)" : "none",
              }} />
              <p style={{ fontFamily: mono.style.fontFamily, fontSize: 10, color: v.muted, marginBottom: 2 }}>{label}</p>
              <p style={{ fontFamily: mono.style.fontFamily, fontSize: 9, color: v.dim }}>{value}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 32 }}>
          <p style={{ fontFamily: mono.style.fontFamily, fontSize: 10, color: v.dim, marginBottom: 12, letterSpacing: "0.1em", textTransform: "uppercase" }}>Card palette</p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {["#FF5A1F","#FFE600","#00CC52","#4DB6F5","#7B4FFF","#FF3B3B","#00D4AA","#C6FF40","#F2B8C6","#FF8CB4","#B8E4FF","#A78BFA"].map(c => (
              <div key={c} title={c} style={{ width: 40, height: 40, borderRadius: 6, background: c, flexShrink: 0 }} />
            ))}
          </div>
        </div>
      </Section>

      {/* Typography */}
      <Section label="02 / Typography">
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>

          <TypeRow label="Display / Bebas Neue" sub="Hero wordmarks, oversize headings">
            <p style={{ fontFamily: display.style.fontFamily, fontSize: "clamp(48px, 8vw, 100px)", lineHeight: 0.9, color: "white", letterSpacing: "0.02em" }}>
              Config 2026
            </p>
          </TypeRow>

          <TypeRow label="Serif / Playfair Display" sub="Section headings, pull quotes, editorial moments">
            <p style={{ fontFamily: serif.style.fontFamily, fontWeight: 900, fontSize: "2.5em", lineHeight: 1.1, color: "white" }}>The best systems leave room</p>
            <p style={{ fontFamily: serif.style.fontFamily, fontWeight: 400, fontStyle: "italic", fontSize: "1.5em", color: "rgba(255,255,255,0.6)", marginTop: 8 }}>&ldquo;for the unexpected.&rdquo;</p>
          </TypeRow>

          <TypeRow label="Sans / DM Sans" sub="Body copy, UI labels, navigation">
            <p style={{ fontFamily: sans.style.fontFamily, fontWeight: 700, fontSize: "1.1em", color: "white", marginBottom: 6 }}>Bold: Used for emphasis and subheadings</p>
            <p style={{ fontFamily: sans.style.fontFamily, fontWeight: 400, fontSize: "1em", color: "rgba(255,255,255,0.7)", marginBottom: 6, lineHeight: 1.7 }}>Regular: Primary body copy. Comfortable reading size with generous line height for long-form content and learnings.</p>
            <p style={{ fontFamily: sans.style.fontFamily, fontWeight: 300, fontSize: "0.95em", color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>Light: Secondary body copy and supporting text. Use for anything that should recede.</p>
          </TypeRow>

          <TypeRow label="Mono / Space Mono" sub="Labels, tags, metadata, counters">
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { text: "VARIABLES & TOKENS", size: "0.7em", color: v.accent },
                { text: "01 / 05", size: "0.7em", color: v.muted },
                { text: "Tokens Are Dead, Long Live Tokens / Karim Halabi, Figma", size: "0.65em", color: v.dim },
                { text: "PRODUCT DESIGNER / CONFIG 2026", size: "0.65em", color: v.muted },
              ].map(({ text, size, color }) => (
                <p key={text} style={{ fontFamily: mono.style.fontFamily, fontSize: size, letterSpacing: "0.12em", textTransform: "uppercase", color }}>{text}</p>
              ))}
            </div>
          </TypeRow>

          <TypeRow label="Type scale" sub="em-based, inherits from --sp-font-size">
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { scale: "4xl", size: "2.25em", text: "Section headline" },
                { scale: "3xl", size: "1.875em", text: "Subsection headline" },
                { scale: "2xl", size: "1.5em", text: "Large body / lead" },
                { scale: "xl", size: "1.25em", text: "Emphasized body" },
                { scale: "base", size: "1em", text: "Body copy" },
                { scale: "sm", size: "0.875em", text: "Secondary / caption" },
                { scale: "xs", size: "0.75em", text: "Labels and metadata" },
              ].map(({ scale, size, text }) => (
                <div key={scale} style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
                  <span style={{ fontFamily: mono.style.fontFamily, fontSize: 9, color: v.dim, minWidth: 36 }}>{scale}</span>
                  <p style={{ fontSize: size, color: "white", lineHeight: 1.2 }}>{text}</p>
                  <span style={{ fontFamily: mono.style.fontFamily, fontSize: 9, color: v.dim }}>{size}</span>
                </div>
              ))}
            </div>
          </TypeRow>
        </div>
      </Section>

      {/* Spacing */}
      <Section label="03 / Spacing">
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 192].map(n => (
            <div key={n} style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <span style={{ fontFamily: mono.style.fontFamily, fontSize: 9, color: v.dim, minWidth: 30, textAlign: "right" }}>{n}</span>
              <div style={{ height: 12, width: n, background: v.accent, borderRadius: 2, flexShrink: 0 }} />
              <span style={{ fontFamily: mono.style.fontFamily, fontSize: 9, color: v.dim }}>{n}px</span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 40, padding: "var(--sp-section-spacing) 0", borderTop: `1px solid ${v.border}`, borderBottom: `1px solid ${v.border}` }}>
          <p style={{ fontFamily: mono.style.fontFamily, fontSize: 10, color: v.dim, textAlign: "center" }}>
            Section spacing: <span style={{ color: v.accent }}>var(--sp-section-spacing)</span> = {" "}
            <span style={{ color: v.muted }}>adjust with panel</span>
          </p>
        </div>
      </Section>

      {/* Components */}
      <Section label="04 / Components">

        <ComponentRow label="Tags">
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {["Variables & Tokens", "Systems Thinking", "AI + Design", "Craft & Courage", "Team & Process"].map(tag => (
              <span
                key={tag}
                style={{
                  fontFamily: mono.style.fontFamily,
                  fontSize: "0.65em",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: v.accent,
                  border: `1px solid rgba(201,169,110,var(--sp-border-opacity, 0.3))`,
                  padding: "4px 8px",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </ComponentRow>

        <ComponentRow label="Counters">
          <div style={{ display: "flex", gap: 24 }}>
            {[1,2,3,4,5].map(n => (
              <div key={n} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontFamily: mono.style.fontFamily, fontSize: "0.7em", color: v.accent }}>0{n}</span>
                <span style={{ fontFamily: mono.style.fontFamily, fontSize: "0.65em", color: v.dim }}>/ 05</span>
              </div>
            ))}
          </div>
        </ComponentRow>

        <ComponentRow label="Dividers">
          <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%" }}>
            <div style={{ height: 1, background: v.border }} />
            <div style={{ height: 1, background: "rgba(255,255,255,0.15)" }} />
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ flex: 1, height: 1, background: v.border }} />
              <span style={{ fontFamily: mono.style.fontFamily, fontSize: 9, color: v.dim, letterSpacing: "0.1em" }}>SECTION</span>
              <div style={{ flex: 1, height: 1, background: v.border }} />
            </div>
          </div>
        </ComponentRow>

        <ComponentRow label="Back link">
          <Link
            href="/"
            style={{ fontFamily: mono.style.fontFamily, fontSize: "0.7em", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", textDecoration: "none" }}
          >
            Config 2026
          </Link>
        </ComponentRow>

        <ComponentRow label="Article card">
          <div style={{ maxWidth: 480, border: `1px solid ${v.border}`, padding: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <span style={{ fontFamily: mono.style.fontFamily, fontSize: "0.65em", letterSpacing: "0.1em", textTransform: "uppercase", color: v.accent, border: `1px solid rgba(201,169,110,0.3)`, padding: "3px 7px" }}>
                Variables & Tokens
              </span>
              <span style={{ fontFamily: mono.style.fontFamily, fontSize: "0.65em", color: v.dim }}>01 / 05</span>
            </div>
            <p style={{ fontFamily: mono.style.fontFamily, fontSize: "0.65em", color: v.dim, letterSpacing: "0.05em", marginBottom: 16 }}>
              Tokens Are Dead, Long Live Tokens / Karim Halabi, Figma
            </p>
            <h3 style={{ fontFamily: serif.style.fontFamily, fontSize: "1.5em", fontWeight: 700, lineHeight: 1.2, marginBottom: 12 }}>
              It was never about the name
            </h3>
            <p style={{ fontFamily: sans.style.fontFamily, fontWeight: 300, fontSize: "0.95em", lineHeight: 1.7, color: "rgba(255,255,255,0.5)" }}>
              The token doesn&rsquo;t describe the color. It describes the decision.
            </p>
          </div>
        </ComponentRow>

        <ComponentRow label="Pull quote">
          <div style={{ padding: "48px 0", textAlign: "center", background: "radial-gradient(ellipse at center, #0f0520 0%, transparent 70%)", width: "100%" }}>
            <p style={{ fontFamily: serif.style.fontFamily, fontStyle: "italic", fontWeight: 900, fontSize: "clamp(20px, 3vw, 36px)", color: "rgba(255,255,255,0.9)", letterSpacing: "-0.02em" }}>
              &ldquo;The model doesn&rsquo;t know what matters.&rdquo;
            </p>
            <p style={{ fontFamily: mono.style.fontFamily, fontSize: "0.65em", color: v.accent, marginTop: 16, letterSpacing: "0.15em", textTransform: "uppercase" }}>
              Day 2 Keynote
            </p>
          </div>
        </ComponentRow>

      </Section>

      {/* Motion */}
      <Section label="05 / Motion">
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <p style={{ fontFamily: sans.style.fontFamily, fontWeight: 300, color: v.muted, lineHeight: 1.7, fontSize: "0.95em" }}>
            All animations scale with <span style={{ fontFamily: mono.style.fontFamily, color: v.accent }}>--sp-animation-speed</span>. Set to 0 to disable. Adjust in the style panel.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
            {[
              { label: "Fade up", desc: "Learnings, sections on scroll" },
              { label: "Hero fade", desc: "Name and quote on load" },
              { label: "Panel slide", desc: "Style panel open/close" },
            ].map(({ label, desc }) => (
              <div key={label} style={{ padding: 16, border: `1px solid ${v.border}` }}>
                <p style={{ fontFamily: mono.style.fontFamily, fontSize: "0.65em", color: v.accent, marginBottom: 8, letterSpacing: "0.1em", textTransform: "uppercase" }}>{label}</p>
                <p style={{ fontFamily: sans.style.fontFamily, fontWeight: 300, fontSize: "0.8em", color: v.muted }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Footer */}
      <section style={{ padding: "64px 48px", borderTop: `1px solid ${v.border}`, textAlign: "center" }}>
        <p style={{ fontFamily: mono.style.fontFamily, fontSize: 10, color: v.dim, letterSpacing: "0.1em" }}>
          Triple-click anywhere to open the style panel
        </p>
      </section>
    </main>
  )
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section style={{ padding: `var(--sp-section-spacing) 48px`, borderBottom: `1px solid rgba(255,255,255,var(--sp-border-opacity))` }}>
      <div style={{ maxWidth: "var(--sp-content-width)", margin: "0 auto" }}>
        <p style={{
          fontFamily: Space_Mono({ subsets: ["latin"], weight: ["400"] }).style.fontFamily,
          fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase",
          color: "rgba(255,255,255,0.25)", marginBottom: 40,
        }}>
          {label}
        </p>
        {children}
      </div>
    </section>
  )
}

function TypeRow({ label, sub, children }: { label: string; sub: string; children: React.ReactNode }) {
  return (
    <div style={{ paddingTop: 24, borderTop: `1px solid rgba(255,255,255,0.05)` }}>
      <div style={{ marginBottom: 20 }}>
        <p style={{ fontFamily: Space_Mono({ subsets: ["latin"], weight: ["400"] }).style.fontFamily, fontSize: 10, color: "rgba(255,255,255,0.45)", marginBottom: 4, letterSpacing: "0.08em" }}>{label}</p>
        <p style={{ fontFamily: Space_Mono({ subsets: ["latin"], weight: ["400"] }).style.fontFamily, fontSize: 9, color: "rgba(255,255,255,0.2)", letterSpacing: "0.06em" }}>{sub}</p>
      </div>
      {children}
    </div>
  )
}

function ComponentRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ paddingTop: 24, borderTop: `1px solid rgba(255,255,255,0.05)`, display: "flex", flexDirection: "column", gap: 16 }}>
      <p style={{ fontFamily: Space_Mono({ subsets: ["latin"], weight: ["400"] }).style.fontFamily, fontSize: 10, color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em" }}>{label}</p>
      {children}
    </div>
  )
}
