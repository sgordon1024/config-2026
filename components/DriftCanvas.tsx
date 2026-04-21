"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import FlipCard from "./FlipCard"
import type { Designer } from "@/designers/registry"

const CARD_W = 220
const CARD_H = 300

interface Vec2 { x: number; y: number }

// Spread cards evenly and give each a unique angle so they diverge immediately
function initialConditions(index: number, count: number, w: number, h: number) {
  const cols = Math.max(2, Math.ceil(Math.sqrt(count)))
  const rows = Math.ceil(count / cols)
  const cellW = w / cols
  const cellH = h / rows
  const col = index % cols
  const row = Math.floor(index / cols)

  const x = Math.max(0, Math.min(col * cellW + cellW * 0.15, w - CARD_W))
  const y = Math.max(0, Math.min(row * cellH + cellH * 0.15, h - CARD_H))

  // Vary speed (45–75 px/s) and angle per card so they all head different directions
  const speed = 45 + (index * 23) % 30
  const angle = (Math.PI * 2 * index) / count + Math.PI / 5
  return {
    pos: { x, y } as Vec2,
    vel: { x: Math.cos(angle) * speed, y: Math.sin(angle) * speed } as Vec2,
  }
}

interface BounceCardProps {
  designer: Designer
  tileIndex: number
  initialPos: Vec2
  initialVel: Vec2
  containerW: number
  containerH: number
}

function BounceCard({ designer, tileIndex, initialPos, initialVel, containerW, containerH }: BounceCardProps) {
  const isHovered = useRef(false)
  const pos = useRef<Vec2>({ ...initialPos })
  const vel = useRef<Vec2>({ ...initialVel })
  const cw = useRef(containerW)
  const ch = useRef(containerH)
  const lastTime = useRef<number | null>(null)
  const frameId = useRef<number>(0)
  const [displayPos, setDisplayPos] = useState<Vec2>(initialPos)

  // Keep container dims fresh without resetting animation
  useEffect(() => { cw.current = containerW }, [containerW])
  useEffect(() => { ch.current = containerH }, [containerH])

  useEffect(() => {
    function tick(now: number) {
      if (isHovered.current) {
        lastTime.current = null
        frameId.current = requestAnimationFrame(tick)
        return
      }

      if (lastTime.current !== null) {
        const dt = Math.min((now - lastTime.current) / 1000, 0.05)
        let { x, y } = pos.current
        let { x: vx, y: vy } = vel.current
        const w = cw.current
        const h = ch.current

        x += vx * dt
        y += vy * dt

        // Bounce off all four walls
        if (x <= 0)          { x = 0;          vx =  Math.abs(vx) }
        if (x + CARD_W >= w) { x = w - CARD_W; vx = -Math.abs(vx) }
        if (y <= 0)          { y = 0;           vy =  Math.abs(vy) }
        if (y + CARD_H >= h) { y = h - CARD_H;  vy = -Math.abs(vy) }

        pos.current = { x, y }
        vel.current = { x: vx, y: vy }
        setDisplayPos({ x, y })
      }

      lastTime.current = now
      frameId.current = requestAnimationFrame(tick)
    }

    frameId.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameId.current)
  }, []) // intentionally runs once — uses refs for all mutable state

  return (
    <motion.div
      className="absolute"
      style={{ left: displayPos.x, top: displayPos.y, width: CARD_W, height: CARD_H }}
      onHoverStart={() => { isHovered.current = true }}
      onHoverEnd={() => { isHovered.current = false; lastTime.current = null }}
    >
      <FlipCard designer={designer} tileIndex={tileIndex} />
    </motion.div>
  )
}

interface DriftCanvasProps {
  designers: Designer[]
}

export default function DriftCanvas({ designers }: DriftCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [dims, setDims] = useState({ w: 0, h: 0 })

  useEffect(() => {
    const update = () => {
      if (containerRef.current) {
        setDims({ w: containerRef.current.offsetWidth, h: containerRef.current.offsetHeight })
      }
    }
    update()
    const ro = new ResizeObserver(update)
    if (containerRef.current) ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [])

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden">
      {dims.w > 0 && designers.map((designer, i) => {
        const { pos, vel } = initialConditions(i, designers.length, dims.w, dims.h)
        return (
          <BounceCard
            key={designer.slug}
            designer={designer}
            tileIndex={i}
            initialPos={pos}
            initialVel={vel}
            containerW={dims.w}
            containerH={dims.h}
          />
        )
      })}
    </div>
  )
}
