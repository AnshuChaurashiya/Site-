# ODE — Typography & Color Specification Guide

This document archives the design specifications, typography structures, and color tokens that define the premium visual brand identity of **ODE (To Honour You)**.

---

## 1. Typography Core

ODE utilizes a dynamic pairing of **exactly two fonts**, balancing antique editorial luxury with clean, modern precision.

### Display Serif: Cormorant Garamond
* **Tailwind Class:** `font-serif`
* **Source:** Google Fonts
* **Import Weights:** `300`, `400`, `500`, `600` (Normal and Italic)
* **Vibe:** Traditional, editorial, and Italian deluxe.
* **Primary Usage:** Brand markings, section heading titles, quote segments, and italic philosophy paragraphs.

### Body/Interface Sans-Serif: Plus Jakarta Sans
* **Tailwind Class:** `font-sans`
* **Source:** Google Fonts
* **Import Weights:** `200`, `300`, `400`, `500`, `600`
* **Vibe:** Minimalist, geometric, clean-cut, and highly readable.
* **Primary Usage:** Button labels, interactive navigation headers, status labels, metadata badges, and default paragraph structures.

---

## 2. Color Board Tokens

The custom color theme uses bespoke Tailwind variables configured within `@theme` inside your CSS file.

### 🌿 Sage Green Palette
Designed to represent quiet gardens, botanical stillness, and deep pine forests.
* `bg-sage-50` / `#f7f9f6` — Light ambient tinted highlights
* `bg-sage-100` / `#f1f4f0`
* `bg-sage-200` / `#e0e7df`
* `bg-sage-300` / `#c6d3c4`
* `bg-sage-400` / `#9cb19a`
* `bg-sage-500` / `#7b947a` — Botanical medium accent
* `bg-sage-600` / `#5f785e`
* `bg-sage-700` / `#4a5e49`
* `text-sage-800` / `#2c382b` — Default highly visible body text color
* `bg-sage-900` / `#20271f`
* `bg-sage-950` / `#121711` — Deep velvet shadows

### ⚜️ Burnished Gold Palette
Designed to mimic hand-pressed gold leaf, metallic compacts, and polished brass badges.
* `bg-gold-50` / `#faf7f2`
* `bg-gold-100` / `#f1e9da` — Soft pearl gold backing
* `bg-gold-200` / `#e5d7bd` — Light silk gold sheen
* `bg-gold-300` / `#d4bd94`
* `bg-gold-400` / `#bda169`
* `text-gold-500` / `#a7874f` — Signature brand gold
* `bg-gold-600` / `#8c6e3d` — Hover state gold
* `bg-gold-700` / `#715530`
* `bg-gold-800` / `#584126`
* `bg-gold-900` / `#3f2e1c` — Rich burnished bronze

### 📜 Warm Linen Cream Palette
The primary canvas. It replaces stark, harsh white with soft, warm handmade paper textures.
* `bg-cream-50` / `#fdfdfb` — Pure ivory highlights
* `bg-cream-100` / `#faf8f5` — Default full page backdrop
* `bg-cream-200` / `#f3eee7` — Card backgrounds and button fills
* `bg-cream-300` / `#e8ded1` — Textured lines and borders
* `bg-cream-400` / `#d8c9b5`
* `bg-cream-500` / `#beab92` — Antique card borders

---

## 3. Best Practices & Design Principles
1. **Combine High-Tracking Sans with Serif Display:** For metadata headings, use uppercase, wide letter spacing, and sans-serif (e.g. `tracking-[0.25em] font-sans font-semibold text-xs text-gold-600`). Pair it with a classic display serif title (e.g., `font-serif tracking-normal text-3xl`).
2. **Never Use True Black (#000):** Use `text-sage-950` or `text-sage-800` to keep readability feeling elegant, editorial, and eye-friendly.
3. **Never Use Neon Colors:** Standard generic blue or violet gradients degrade the handmade aesthetic of ODE. Stick strictly to Sage, Cream, Gold, and clean white backings.
