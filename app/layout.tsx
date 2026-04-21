import type { Metadata } from "next"
import { Inter } from "next/font/google"
import dynamic from "next/dynamic"
import "./globals.css"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  display: "swap",
})

const StylePanel = dynamic(() => import("@/components/StylePanel"), { ssr: false })

export const metadata: Metadata = {
  title: "Config 2026 — Designer Takeaways",
  description: "Personal learnings from Figma's Config 2026 conference.",
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body
        className="min-h-full text-white"
        style={{ fontFamily: "var(--font-inter), sans-serif" }}
      >
        {children}
        <StylePanel />
      </body>
    </html>
  )
}
