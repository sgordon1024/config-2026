import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import StylePanelWrapper from "@/components/StylePanelWrapper"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  display: "swap",
})

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
        <StylePanelWrapper />
      </body>
    </html>
  )
}
