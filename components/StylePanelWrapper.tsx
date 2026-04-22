"use client"

import dynamic from "next/dynamic"

const StylePanel = dynamic(() => import("./StylePanel"), { ssr: false })

export default function StylePanelWrapper() {
  return <StylePanel />
}
