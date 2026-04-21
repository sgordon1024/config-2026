# Config 2026: Technical Reference

For designers who want to edit code directly, or who want to understand what Claude Code is doing under the hood.

---

## Project structure

```
designers/
  [name].tsx          ← your page file
  registry.ts         ← shared data (name, role, photo path)
  _template.tsx       ← starting point to copy from
public/
  designers/
    [name].jpg/.png   ← your photo
```

---

## Updating content

At the top of every designer file there are three constants. These are the only things that need to change for a basic update:

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

---

## Colors

Find the `<main>` tag and change the `background` style:

```tsx
// Solid color
<main style={{ background: "#1a1a2e" }}>

// Gradient
<main style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>

// Radial gradient
<main style={{ background: "radial-gradient(ellipse at top, #0d324d, #000)" }}>
```

Color tools: [coolors.co](https://coolors.co) · [uicolors.app](https://uicolors.app)

---

## Fonts

1. Find a font at [fonts.google.com](https://fonts.google.com) and note its name

2. Add the import at the top of the file:

```tsx
import { Space_Grotesk } from "next/font/google"

const font = Space_Grotesk({ subsets: ["latin"], weight: ["400", "700"] })
```

3. Apply it to the `<main>` tag:

```tsx
<main className={font.className} style={{ ... }}>
```

| Vibe | Font |
|------|------|
| Editorial | `Playfair_Display` |
| Technical | `Space_Mono` |
| Friendly | `DM_Sans` |
| Bold/graphic | `Bebas_Neue` |
| Swiss | `Space_Grotesk` |

> Google Fonts names use underscores in code but spaces in the UI. `Space_Grotesk` = "Space Grotesk".

---

## Images

### Swap the profile photo

Drop a new file into `public/designers/` with the exact same filename. No code change needed. Best results: square crop, high contrast, at least 800×800px.

### Full-bleed background image

Put an image in `public/designers/` then reference it in a `<section>`:

```tsx
<section
  style={{
    backgroundImage: "url('/config-2026/designers/my-background.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
  <div className="absolute inset-0 bg-black/50" />  {/* overlay for readability */}
  <div className="relative z-10">
    {/* content */}
  </div>
</section>
```

> **Image paths:** On the live site, prefix with `/config-2026/` (e.g. `/config-2026/designers/my-image.jpg`). Locally, use `/designers/my-image.jpg`.

### Reference the profile photo in code

```tsx
<img
  src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${designer.photo}`}
  alt={designer.name}
  className="w-32 h-32 rounded-full object-cover"
/>
```

---

## Layout

Each page file is a React component. The layout is fully replaceable. The only required element is the back link:

```tsx
<Link href="/" className="fixed top-6 left-6 text-sm text-white/40 hover:text-white z-50">
  ← Config 2026
</Link>
```

Delete everything else inside `<main>` and rebuild from scratch if needed.

---

## Tailwind classes

Every class from [tailwindcss.com/docs](https://tailwindcss.com/docs) is available. Useful ones:

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

---

## Animations

Framer Motion is already installed. Wrap any element:

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

### Video background

```tsx
<video
  className="absolute inset-0 w-full h-full object-cover opacity-30"
  autoPlay muted loop playsInline
>
  <source src="/config-2026/designers/my-video.mp4" type="video/mp4" />
</video>
```

---

## Publishing

```bash
git add .
git commit -m "Update my page"
git push
```

GitHub Actions rebuilds and deploys automatically. Live in ~60 seconds.

---

## Quick reference

| What | Where |
|------|-------|
| Page file | `designers/[name].tsx` |
| Photo | `public/designers/[name].jpg` |
| Shared data (name, role) | `designers/registry.ts` |
| Template | `designers/_template.tsx` |
| Live site | https://sgordon1024.github.io/config-2026/ |
| Page URL | https://sgordon1024.github.io/config-2026/designers/[name] |
