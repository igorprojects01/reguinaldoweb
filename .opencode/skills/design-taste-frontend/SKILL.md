---
name: design-taste-frontend
description: >-
  Advanced design taste, aesthetic refinement, and UI craftsmanship guidelines.
  Use whenever polishing user interfaces, refining typography, crafting harmonious color palettes,
  designing micro-interactions, or creating distinctive, high-end web experiences.
---

# Frontend Design Taste & Aesthetic Craftsmanship

Guidelines for transforming functional UIs into aesthetically distinguished, memorable, and polished digital experiences.

---

## 1. The Core Philosophy of "Taste"

Great design is not about adding ornamentation; it is about **clarity, intentionality, and restraint**.

1. **Hierarchy is King:** A user should immediately understand where to look first, second, and third. If everything is bold or colorful, nothing is.
2. **Subtlety Over Loudness:** Replace heavy solid borders with soft 1px tinted borders. Replace dark harsh drop shadows with layered, diffused ambient shadows.
3. **Harmonious Rhythm:** Respect consistent vertical rhythm and scale. Never pick arbitrary pixel values for padding or margins.

---

## 2. Color Mastery & Palette Refinement

- **Dominant 60-30-10 Rule:**
  - 60% Canvas/Neutral background (e.g. warm off-whites, slate tints).
  - 30% Structural elements, text, and surfaces.
  - 10% Vibrant accent / interactive highlights.
- **Tonal Contrast:** Never use pure `#000000` text on pure `#FFFFFF`. Use deep tinted slate/navy (`#1A202C`, `#0F172A`) for softness and legibility.
- **Semantic Color Tokens:** Tint alert/success backgrounds with 5-10% opacity of the main color rather than using loud full-bleed badges.

---

## 3. Typography Craftsmanship

- **Display & Body Pairing:** Combine an expressive serif or geometric headline with a clean, high-x-height sans-serif body.
- **Optical Balance:**
  - Headings: Tighten line height (`1.1` to `1.25`) and reduce letter-spacing (`-0.015em` to `-0.025em`) as font size grows.
  - Small Text / Labels: Increase letter-spacing (`+0.04em` to `+0.08em`) and use uppercase or medium weights (`500`-`600`) for legibility.
  - Numbers & Data: Use tabular figures (`font-variant-numeric: tabular-nums`) in tables and KPI stats to prevent layout shifts and maintain alignment.

---

## 4. Surfaces, Depth & Elevation

- **Layered Diffused Shadows:**
  ```css
  /* Subtle ambient elevation */
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04), 0 4px 12px rgba(0, 0, 0, 0.03);
  
  /* Interactive hover lift */
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.06), 0 10px 24px -3px rgba(0, 0, 0, 0.08);
  ```
- **Delicate Card Borders:**
  ```css
  border: 1px solid rgba(15, 23, 42, 0.08);
  ```
- **Gradients with Intent:** Use soft, directional linear gradients (angle between 135° and 160°) with subtle color shifts (e.g. 5% value change) to add dimension to hero banners or cards.

---

## 5. Micro-interactions & Motion

- **Physics-Inspired Timing:**
  - Fast feedback (button hover, toggles): `120ms` to `180ms` with `ease-out`.
  - Layout transitions (modals, dropdowns): `200ms` to `280ms` with `cubic-bezier(0.16, 1, 0.3, 1)`.
- **Delightful Hover States:** Combine a subtle `transform: translateY(-2px)` with shadow elevation and border brightening.
- **Focus Rings:** Always provide high-contrast, accessible `:focus-visible` rings with an offset (`outline: 2px solid var(--accent); outline-offset: 2px`).
