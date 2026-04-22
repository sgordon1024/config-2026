"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { usePathname } from "next/navigation"
import { motion, useDragControls, AnimatePresence } from "framer-motion"

export type StyleSettings = {
  bg: string
  surface: string
  accent: string
  textOpacity: number
  fontSize: number
  font: string
  contentWidth: number
  sectionSpacing: number
  borderOpacity: number
  borderWidth: number
  grain: boolean
}

export const STYLE_DEFAULTS: StyleSettings = {
  bg: "#000000",
  surface: "#0a0a0a",
  accent: "#C9A96E",
  textOpacity: 1,
  fontSize: 16,
  font: "Inter",
  contentWidth: 768,
  sectionSpacing: 128,
  borderOpacity: 0.07,
  borderWidth: 1,
  grain: false,
}

const ACCENT_PRESETS = [
  { color: "#C9A96E", label: "Gold" },
  { color: "#FF5A1F", label: "Orange" },
  { color: "#FFE600", label: "Yellow" },
  { color: "#00CC52", label: "Green" },
  { color: "#4DB6F5", label: "Blue" },
  { color: "#7B4FFF", label: "Purple" },
  { color: "#FF3B3B", label: "Red" },
  { color: "#FF8CB4", label: "Pink" },
  { color: "#C6FF40", label: "Lime" },
  { color: "#A78BFA", label: "Lavender" },
]

const FONT_OPTIONS = [
  "Inter",
  "DM Sans",
  "Plus Jakarta Sans",
  "Work Sans",
  "Outfit",
  "Raleway",
  "Nunito",
  "Josefin Sans",
  "Syne",
  "Space Grotesk",
  "Montserrat",
  "Oswald",
  "Bebas Neue",
  "Space Mono",
  "Playfair Display",
  "Lora",
  "Merriweather",
  "Crimson Pro",
  "Cormorant Garamond",
  "Libre Baskerville",
]

export default function StylePanel() {
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  const [open, setOpen] = useState(false)
  const [settings, setSettings] = useState<StyleSettings>(STYLE_DEFAULTS)
  const panelRef = useRef<HTMLDivElement>(null)
  const dragControls = useDragControls()
  const clicksRef = useRef(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  // Triple-click to toggle — disabled on homepage
  useEffect(() => {
    if (isHomePage) return
    const handleClick = (e: MouseEvent) => {
      if (panelRef.current?.contains(e.target as Node)) return
      clicksRef.current++
      clearTimeout(timerRef.current)
      if (clicksRef.current >= 3) {
        setOpen(prev => !prev)
        clicksRef.current = 0
      } else {
        timerRef.current = setTimeout(() => { clicksRef.current = 0 }, 400)
      }
    }
    document.addEventListener("click", handleClick)
    return () => document.removeEventListener("click", handleClick)
  }, [isHomePage])

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("sp-settings")
      if (saved) setSettings(JSON.parse(saved))
    } catch {}
  }, [])

  // Load Google Font dynamically when font changes
  useEffect(() => {
    if (isHomePage || settings.font === "Inter") return
    const fontName = settings.font.replace(/ /g, "+")
    const linkId = "sp-gfont"
    let link = document.getElementById(linkId) as HTMLLinkElement | null
    if (!link) {
      link = document.createElement("link")
      link.id = linkId
      link.rel = "stylesheet"
      document.head.appendChild(link)
    }
    link.href = `https://fonts.googleapis.com/css2?family=${fontName}:ital,wght@0,300;0,400;0,700;0,900;1,400;1,700&display=swap`
  }, [settings.font, isHomePage])

  // Apply CSS variables on designer pages; reset them on homepage
  useEffect(() => {
    const r = document.documentElement
    if (isHomePage) {
      r.style.removeProperty("--sp-bg")
      r.style.removeProperty("--sp-surface")
      r.style.removeProperty("--sp-accent")
      r.style.removeProperty("--sp-text-opacity")
      r.style.removeProperty("--sp-font-size")
      r.style.removeProperty("--sp-font-family")
      r.style.removeProperty("--sp-content-width")
      r.style.removeProperty("--sp-section-spacing")
      r.style.removeProperty("--sp-border-opacity")
      r.style.removeProperty("--sp-border-width")
      r.style.removeProperty("--sp-grain-opacity")
      document.body.style.removeProperty("background-color")
      return
    }

    r.style.setProperty("--sp-bg", settings.bg)
    r.style.setProperty("--sp-surface", settings.surface)
    r.style.setProperty("--sp-accent", settings.accent)
    r.style.setProperty("--sp-text-opacity", String(settings.textOpacity))
    r.style.setProperty("--sp-font-size", `${settings.fontSize}px`)
    r.style.setProperty("--sp-font-family", `'${settings.font}', sans-serif`)
    r.style.setProperty("--sp-content-width", `${settings.contentWidth}px`)
    r.style.setProperty("--sp-section-spacing", `${settings.sectionSpacing}px`)
    r.style.setProperty("--sp-border-opacity", String(settings.borderOpacity))
    r.style.setProperty("--sp-border-width", `${settings.borderWidth}px`)
    r.style.setProperty("--sp-grain-opacity", settings.grain ? "1" : "0")
    document.body.style.backgroundColor = settings.bg

    try { localStorage.setItem("sp-settings", JSON.stringify(settings)) } catch {}
  }, [settings, isHomePage])

  const update = useCallback(<K extends keyof StyleSettings>(key: K, value: StyleSettings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }, [])

  const reset = useCallback(() => {
    setSettings(STYLE_DEFAULTS)
    try { localStorage.removeItem("sp-settings") } catch {}
  }, [])

  if (isHomePage) return null

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={panelRef}
          drag
          dragControls={dragControls}
          dragListener={false}
          dragMomentum={false}
          dragElastic={0}
          initial={{ opacity: 0, y: -8, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.97 }}
          transition={{ duration: 0.15 }}
          style={{
            position: "fixed",
            top: 72,
            right: 20,
            width: 280,
            zIndex: 9999,
            background: "#111111",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 10,
            boxShadow: "0 24px 64px rgba(0,0,0,0.8)",
            fontFamily: "monospace",
            fontSize: 11,
            color: "white",
            userSelect: "none",
          }}
        >
          {/* Drag handle */}
          <div
            onPointerDown={e => dragControls.start(e)}
            style={{
              padding: "10px 14px",
              borderBottom: "1px solid rgba(255,255,255,0.07)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "grab",
              background: "#0d0d0d",
              borderRadius: "10px 10px 0 0",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ display: "flex", gap: 3 }}>
                {[1,2,3].map(i => <div key={i} style={{ width: 5, height: 5, borderRadius: "50%", background: "rgba(255,255,255,0.2)" }} />)}
              </div>
              <span style={{ color: "rgba(255,255,255,0.4)", letterSpacing: "0.12em", textTransform: "uppercase", fontSize: 10 }}>Style Panel</span>
            </div>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <button onClick={reset} style={{ color: "rgba(255,255,255,0.3)", background: "none", border: "none", cursor: "pointer", fontSize: 10, letterSpacing: "0.08em", padding: 0 }}>RESET</button>
              <button onClick={() => setOpen(false)} style={{ color: "rgba(255,255,255,0.3)", background: "none", border: "none", cursor: "pointer", fontSize: 18, lineHeight: 1, padding: 0 }}>×</button>
            </div>
          </div>

          {/* Controls */}
          <div style={{ padding: "12px 14px", display: "flex", flexDirection: "column", gap: 18, maxHeight: "80vh", overflowY: "auto" }}>

            <PanelSection label="Colors">
              <PanelRow label="Background">
                <input type="color" value={settings.bg} onChange={e => update("bg", e.target.value)} style={colorInput} />
                <input type="color" value={settings.surface} onChange={e => update("surface", e.target.value)} style={colorInput} title="Surface" />
                <Mono>{settings.bg}</Mono>
              </PanelRow>
              <div>
                <Dim>Accent</Dim>
                <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginTop: 6 }}>
                  {ACCENT_PRESETS.map(({ color, label }) => (
                    <button key={color} title={label} onClick={() => update("accent", color)} style={{ width: 18, height: 18, borderRadius: "50%", background: color, padding: 0, cursor: "pointer", border: settings.accent === color ? "2px solid white" : "2px solid transparent", outline: "none", flexShrink: 0 }} />
                  ))}
                  <input type="color" value={settings.accent} onChange={e => update("accent", e.target.value)} style={{ ...colorInput, width: 18, height: 18 }} title="Custom" />
                </div>
              </div>
            </PanelSection>

            <PanelSection label="Typography">
              <div>
                <Dim>Typeface</Dim>
                <select
                  value={settings.font}
                  onChange={e => update("font", e.target.value)}
                  style={{ display: "block", width: "100%", marginTop: 6, background: "#1e1e1e", color: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 4, padding: "5px 8px", fontSize: 11, fontFamily: "monospace", cursor: "pointer", outline: "none" }}
                >
                  {FONT_OPTIONS.map(f => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>
              <PanelRow label={`Size ${settings.fontSize}px`}>
                <input type="range" min={12} max={22} step={1} value={settings.fontSize} onChange={e => update("fontSize", Number(e.target.value))} style={rangeInput(settings.accent)} />
              </PanelRow>
              <PanelRow label={`Brightness ${Math.round(settings.textOpacity * 100)}%`}>
                <input type="range" min={0.4} max={1} step={0.01} value={settings.textOpacity} onChange={e => update("textOpacity", Number(e.target.value))} style={rangeInput(settings.accent)} />
              </PanelRow>
            </PanelSection>

            <PanelSection label="Layout">
              <PanelRow label={`Width ${settings.contentWidth}px`}>
                <input type="range" min={480} max={1200} step={8} value={settings.contentWidth} onChange={e => update("contentWidth", Number(e.target.value))} style={rangeInput(settings.accent)} />
              </PanelRow>
              <PanelRow label={`Spacing ${settings.sectionSpacing}px`}>
                <input type="range" min={24} max={256} step={8} value={settings.sectionSpacing} onChange={e => update("sectionSpacing", Number(e.target.value))} style={rangeInput(settings.accent)} />
              </PanelRow>
            </PanelSection>

            <PanelSection label="Borders">
              <PanelRow label={`Opacity ${Math.round(settings.borderOpacity * 100)}%`}>
                <input type="range" min={0} max={0.4} step={0.01} value={settings.borderOpacity} onChange={e => update("borderOpacity", Number(e.target.value))} style={rangeInput(settings.accent)} />
              </PanelRow>
              <PanelRow label={`Thickness ${settings.borderWidth}px`}>
                <input type="range" min={0.5} max={4} step={0.5} value={settings.borderWidth} onChange={e => update("borderWidth", Number(e.target.value))} style={rangeInput(settings.accent)} />
              </PanelRow>
            </PanelSection>

            <PanelSection label="Texture">
              <PanelRow label="Film grain">
                <input type="checkbox" checked={settings.grain} onChange={e => update("grain", e.target.checked)} style={{ accentColor: settings.accent, cursor: "pointer", width: 14, height: 14 }} />
                <Dim style={{ fontSize: 10 }}>noise overlay</Dim>
              </PanelRow>
            </PanelSection>

            <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 10, color: "rgba(255,255,255,0.18)", lineHeight: 1.7, fontSize: 10 }}>
              Triple-click anywhere to toggle.<br />
              Changes apply live. Saved across sessions.
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function PanelSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div style={{ color: "rgba(255,255,255,0.22)", textTransform: "uppercase", letterSpacing: "0.14em", fontSize: 10, marginBottom: 10 }}>{label}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>{children}</div>
    </div>
  )
}

function PanelRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <Dim style={{ minWidth: 90, flexShrink: 0 }}>{label}</Dim>
      <div style={{ display: "flex", alignItems: "center", gap: 6, flex: 1 }}>{children}</div>
    </div>
  )
}

function Dim({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 10, ...style }}>{children}</span>
}

function Mono({ children }: { children: React.ReactNode }) {
  return <span style={{ color: "rgba(255,255,255,0.25)", fontSize: 10 }}>{children}</span>
}

const colorInput: React.CSSProperties = {
  width: 22, height: 22, borderRadius: 4, border: "1px solid rgba(255,255,255,0.12)",
  background: "none", cursor: "pointer", padding: 0, flexShrink: 0,
}

const rangeInput = (accent: string): React.CSSProperties => ({
  flex: 1, accentColor: accent, cursor: "pointer",
})
