"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, useDragControls, AnimatePresence } from "framer-motion"

export type StyleSettings = {
  bg: string
  surface: string
  accent: string
  textOpacity: number
  fontSize: number
  contentWidth: number
  sectionSpacing: number
  borderOpacity: number
  grain: boolean
  animationSpeed: number
}

export const STYLE_DEFAULTS: StyleSettings = {
  bg: "#000000",
  surface: "#0a0a0a",
  accent: "#C9A96E",
  textOpacity: 1,
  fontSize: 16,
  contentWidth: 768,
  sectionSpacing: 128,
  borderOpacity: 0.07,
  grain: false,
  animationSpeed: 1,
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

export default function StylePanel() {
  const [open, setOpen] = useState(false)
  const [settings, setSettings] = useState<StyleSettings>(STYLE_DEFAULTS)
  const panelRef = useRef<HTMLDivElement>(null)
  const dragControls = useDragControls()
  const clicksRef = useRef(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  // Triple-click to toggle
  useEffect(() => {
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
  }, [])

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("sp-settings")
      if (saved) setSettings(JSON.parse(saved))
    } catch {}
  }, [])

  // Apply CSS variables whenever settings change
  useEffect(() => {
    const r = document.documentElement
    r.style.setProperty("--sp-bg", settings.bg)
    r.style.setProperty("--sp-surface", settings.surface)
    r.style.setProperty("--sp-accent", settings.accent)
    r.style.setProperty("--sp-text-opacity", String(settings.textOpacity))
    r.style.setProperty("--sp-font-size", `${settings.fontSize}px`)
    r.style.setProperty("--sp-content-width", `${settings.contentWidth}px`)
    r.style.setProperty("--sp-section-spacing", `${settings.sectionSpacing}px`)
    r.style.setProperty("--sp-border-opacity", String(settings.borderOpacity))
    r.style.setProperty("--sp-animation-speed", String(settings.animationSpeed))

    // Apply background to body directly so it works on all pages
    document.body.style.backgroundColor = settings.bg

    try { localStorage.setItem("sp-settings", JSON.stringify(settings)) } catch {}
  }, [settings])

  const update = useCallback(<K extends keyof StyleSettings>(key: K, value: StyleSettings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }, [])

  const reset = useCallback(() => {
    setSettings(STYLE_DEFAULTS)
    try { localStorage.removeItem("sp-settings") } catch {}
  }, [])

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
            width: 268,
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
          {/* Drag handle header */}
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
                {[1,2,3].map(i => (
                  <div key={i} style={{ width: 5, height: 5, borderRadius: "50%", background: "rgba(255,255,255,0.2)" }} />
                ))}
              </div>
              <span style={{ color: "rgba(255,255,255,0.4)", letterSpacing: "0.12em", textTransform: "uppercase", fontSize: 10 }}>
                Style Panel
              </span>
            </div>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <button
                onClick={reset}
                style={{ color: "rgba(255,255,255,0.3)", background: "none", border: "none", cursor: "pointer", fontSize: 10, letterSpacing: "0.08em", padding: 0 }}
              >
                RESET
              </button>
              <button
                onClick={() => setOpen(false)}
                style={{ color: "rgba(255,255,255,0.3)", background: "none", border: "none", cursor: "pointer", fontSize: 18, lineHeight: 1, padding: 0 }}
              >
                ×
              </button>
            </div>
          </div>

          {/* Scrollable controls */}
          <div style={{ padding: "12px 14px", display: "flex", flexDirection: "column", gap: 18, maxHeight: "75vh", overflowY: "auto" }}>

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
                    <button
                      key={color}
                      title={label}
                      onClick={() => update("accent", color)}
                      style={{
                        width: 18, height: 18, borderRadius: "50%", background: color, padding: 0, cursor: "pointer",
                        border: settings.accent === color ? "2px solid white" : "2px solid transparent",
                        outline: "none", flexShrink: 0,
                      }}
                    />
                  ))}
                  <input type="color" value={settings.accent} onChange={e => update("accent", e.target.value)} style={{ ...colorInput, width: 18, height: 18 }} title="Custom" />
                </div>
              </div>
            </PanelSection>

            <PanelSection label="Typography">
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

            <PanelSection label="Details">
              <PanelRow label={`Borders ${Math.round(settings.borderOpacity * 100)}%`}>
                <input type="range" min={0} max={0.4} step={0.01} value={settings.borderOpacity} onChange={e => update("borderOpacity", Number(e.target.value))} style={rangeInput(settings.accent)} />
              </PanelRow>
              <PanelRow label={`Animation ${settings.animationSpeed}x`}>
                <input type="range" min={0} max={3} step={0.1} value={settings.animationSpeed} onChange={e => update("animationSpeed", Number(e.target.value))} style={rangeInput(settings.accent)} />
              </PanelRow>
              <PanelRow label="Grain overlay">
                <input type="checkbox" checked={settings.grain} onChange={e => update("grain", e.target.checked)} style={{ accentColor: settings.accent, cursor: "pointer" }} />
              </PanelRow>
            </PanelSection>

            <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 10, color: "rgba(255,255,255,0.18)", lineHeight: 1.7, fontSize: 10 }}>
              Triple-click anywhere to toggle.<br />
              Changes apply live across all pages.
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
