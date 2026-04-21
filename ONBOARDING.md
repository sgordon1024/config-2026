# Config 2026 — Your Designer Page

Welcome! You have a personal page on our Config 2026 site. This guide walks you through making it yours — from just swapping out text, all the way to full creative control over layout, fonts, and imagery.

**Your file lives at:** `designers/[your-name].tsx`  
**Your photo lives at:** `public/designers/[your-name].jpg` (or `.png`)

---

## Before you start

You'll need to run the project locally to preview your changes before publishing.

**One-time setup:**
```bash
git clone https://github.com/sgordon1024/config-2026.git
cd config-2026
npm install
npm run dev
```

Then open **http://localhost:3000/designers/[your-name]** in your browser.

Any time you save a file, the browser updates instantly — no refresh needed.

---

## Level 1 — Just update the words

Open your `designers/[your-name].tsx` file. At the very top you'll see three constants. These are the only things you *need* to change:

```tsx
const HERO_QUOTE = "Write your big takeaway or theme here."

const LEARNINGS = [
  {
    title: "Learning one",
    body: "Describe what you learned, saw, or felt here.",
  },
  // add or remove items freely
]

const CLOSING = "One final thought to leave the reader with."
```

Edit those, save, and you're done. Ship it.

---

## Level 2 — Colors and fonts

### Change background color

Find the `<main>` tag near the bottom of your file. Change the `background` style:

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

1. Go to [fonts.google.com](https://fonts.google.com), find a font you like, and note its name (e.g. `"Space Grotesk"`)

2. At the top of your file, add this import:

```tsx
import { Space_Grotesk } from "next/font/google"

const font = Space_Grotesk({ subsets: ["latin"], weight: ["400", "700"] })
```

3. Apply it to your `<main>` tag:

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

### Swap your profile photo

Drop a new file into `public/designers/` with the exact same filename as your current one. The site will use it automatically — no code change needed.

Best results: square crop, high contrast, at least 800×800px.

### Add a full-bleed background image

Put your image in `public/designers/` (e.g. `public/designers/my-background.jpg`) then in your `<section>`:

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
    {/* your content */}
  </div>
</section>
```

> **Note:** On the live site, always prefix image paths with `/config-2026/` (e.g. `/config-2026/designers/my-image.jpg`). Locally, use just `/designers/my-image.jpg`.

### Reference your profile photo anywhere

Your photo path is available via the `designer` prop:

```tsx
<img
  src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${designer.photo}`}
  alt={designer.name}
  className="w-32 h-32 rounded-full object-cover"
/>
```

---

## Level 4 — Full creative control

Your file is a React component — you have complete control. Here are some ideas:

### Change the layout entirely

Delete everything inside `<main>` and start fresh. The only requirement is that you keep the back link so visitors can return home:

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

## Publishing your changes

Once you're happy with your page:

```bash
git add .
git commit -m "Update my designer page"
git push
```

GitHub Actions will rebuild and deploy automatically. Your live page updates in about 60 seconds.

---

## Quick reference

| What | Where |
|------|-------|
| Your page file | `designers/[your-name].tsx` |
| Your photo | `public/designers/[your-name].jpg` |
| Shared data (name, role) | `designers/registry.ts` |
| Template to copy from | `designers/_template.tsx` |
| Live site | https://sgordon1024.github.io/config-2026/ |
| Your page | https://sgordon1024.github.io/config-2026/designers/[your-name] |

## Need help?

Ping Steve — or if you get stuck on something specific, drop the error message in Slack and we'll sort it out.
