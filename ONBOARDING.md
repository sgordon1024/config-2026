# Config 2026 — Designer Guide

Each designer has a personal page on the Config 2026 site. This guide walks through how to make it your own — from just swapping out text, all the way to full creative control over layout, fonts, and imagery.

**Page file:** `designers/[name].tsx`  
**Photo file:** `public/designers/[name].jpg` (or `.png`)

---

## Before you start

The project needs to run locally to preview changes before publishing.

**One-time setup:**
```bash
git clone https://github.com/sgordon1024/config-2026.git
cd config-2026
npm install
npm run dev
```

Then open **http://localhost:3000/designers/[name]** in a browser.

Any time a file is saved, the browser updates instantly — no refresh needed.

---

## Level 1 — Just update the words

Open `designers/[name].tsx`. At the very top there are three constants. These are the only things that *need* to change:

```tsx
const HERO_QUOTE = "Write a big takeaway or theme here."

const LEARNINGS = [
  {
    title: "Learning one",
    body: "Describe what you learned, saw, or felt here.",
  },
  // add or remove items freely
]

const CLOSING = "One final thought to leave the reader with."
```

Edit those, save, and ship it.

---

## Level 2 — Colors and fonts

### Change background color

Find the `<main>` tag near the bottom of the file. Change the `background` style:

```tsx
// Solid color
<main style={{ background: "#1a1a2e" }}>

// Gradient
<main style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>

// Radial gradient
<main style={{ background: "radial-gradient(ellipse at top, #0d324d, #000)" }}>
```

Need color inspiration? Try [coolors.co](https://coolors.co) or [uicolors.app](https://uicolors.app).

### Change the font

1. Go to [fonts.google.com](https://fonts.google.com), find a font, and note its name (e.g. `"Space Grotesk"`)

2. At the top of the file, add this import:

```tsx
import { Space_Grotesk } from "next/font/google"

const font = Space_Grotesk({ subsets: ["latin"], weight: ["400", "700"] })
```

3. Apply it to the `<main>` tag:

```tsx
<main className={font.className} style={{ ... }}>
```

Some good pairings to try:
| Vibe | Font |
|------|------|
| Editorial | `Playfair_Display` |
| Technical | `Space_Mono` |
| Friendly | `DM_Sans` |
| Bold/graphic | `Bebas_Neue` |
| Swiss | `Space_Grotesk` |

> **Tip:** Google Fonts names use underscores in code but display with spaces — `Space_Grotesk` = "Space Grotesk".

---

## Level 3 — Imagery

### Swap the profile photo

Drop a new file into `public/designers/` with the exact same filename as the current one. The site will use it automatically — no code change needed.

Best results: square crop, high contrast, at least 800×800px.

### Add a full-bleed background image

Put an image in `public/designers/` (e.g. `public/designers/my-background.jpg`) then in the `<section>`:

```tsx
<section
  className="relative min-h-screen flex flex-col items-center justify-center"
  style={{
    backgroundImage: "url('/config-2026/designers/my-background.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
  {/* dark overlay so text stays readable */}
  <div className="absolute inset-0 bg-black/50" />
  <div className="relative z-10 ...">
    {/* content */}
  </div>
</section>
```

> **Note:** On the live site, always prefix image paths with `/config-2026/` (e.g. `/config-2026/designers/my-image.jpg`). Locally, use just `/designers/my-image.jpg`.

### Reference the profile photo anywhere

The photo path is available via the `designer` prop:

```tsx
<img
  src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${designer.photo}`}
  alt={designer.name}
  className="w-32 h-32 rounded-full object-cover"
/>
```

---

## Level 4 — Full creative control

Each page file is a React component — there's complete control over the layout. Some ideas:

### Change the layout entirely

Delete everything inside `<main>` and start fresh. The only requirement is keeping the back link so visitors can return home:

```tsx
<Link href="/" className="fixed top-6 left-6 text-sm text-white/40 hover:text-white z-50">
  ← Config 2026
</Link>
```

### Add a video background

```tsx
<video
  className="absolute inset-0 w-full h-full object-cover opacity-30"
  autoPlay muted loop playsInline
>
  <source src="/config-2026/designers/my-video.mp4" type="video/mp4" />
</video>
```

### Style things with Tailwind

Every class from [tailwindcss.com/docs](https://tailwindcss.com/docs) works. Some useful ones:

```
text-6xl          → huge text
font-black        → heaviest weight
tracking-tighter  → tight letter spacing
uppercase         → ALL CAPS
italic            → italics
opacity-50        → 50% transparent
rotate-3          → slight tilt
mix-blend-overlay → overlay blend mode
```

### Add a scroll animation

Wrap any element in a Framer Motion component (already installed):

```tsx
import { motion } from "framer-motion"

<motion.h1
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  {designer.name}
</motion.h1>
```

---

## Publishing changes

Once the page looks good:

```bash
git add .
git commit -m "Update designer page"
git push
```

GitHub Actions will rebuild and deploy automatically. The live page updates in about 60 seconds.

---

## Quick reference

| What | Where |
|------|-------|
| Page file | `designers/[name].tsx` |
| Photo | `public/designers/[name].jpg` |
| Shared data (name, role) | `designers/registry.ts` |
| Template to copy from | `designers/_template.tsx` |
| Live site | https://sgordon1024.github.io/config-2026/ |
| Page URL | https://sgordon1024.github.io/config-2026/designers/[name] |

## Need help?

Ping Steve — or drop the error message in Slack and we'll sort it out.
