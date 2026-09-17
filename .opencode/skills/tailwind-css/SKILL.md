---
name: tailwind-css
description: >-
  Expert guidelines, utility-first patterns, and best practices for styling interfaces
  using Tailwind CSS. Use whenever configuring Tailwind, writing utility classes,
  designing responsive layouts, creating custom themes, or integrating with web frameworks.
---

# Tailwind CSS Skill & Best Practices Guide

Comprehensive guide for writing clean, scalable, and maintainable styles with Tailwind CSS.

---

## 1. Core Principles & Philosophy

- **Utility-First:** Build complex custom designs directly in your markup without writing arbitrary custom CSS rules.
- **Consistent Design Tokens:** Use Tailwind's predefined spacing scale (`p-4`, `m-6`), typography sizes (`text-sm`, `text-xl`), and color palettes to maintain visual harmony.
- **Avoid Arbitrary Values:** Prefer theme values over arbitrary classes (e.g. use `p-6` instead of `p-[23px]` unless strictly required by a pixel-perfect specification).

---

## 2. Layout & Responsive Design Patterns

- **Mobile-First Breakpoints:** Always write base styles for mobile screens first, then layer breakpoint prefixes:
  - `sm:` (640px)
  - `md:` (768px)
  - `lg:` (1024px)
  - `xl:` (1280px)
  - `2xl:` (1536px)

### Common Layout Recipes

```html
<!-- Responsive Flex Navigation -->
<nav class="flex flex-col md:flex-row items-center justify-between gap-4 p-4 md:p-6 bg-white border-b border-slate-200">
  ...
</nav>

<!-- Responsive Multi-Column Grid -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
  ...
</div>

<!-- Centered Card Surface -->
<div class="bg-white rounded-xl border border-slate-200 shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
  ...
</div>
```

---

## 3. Interactive States & Micro-interactions

- **States:** Use state modifiers consistently:
  - `hover:bg-slate-50`
  - `active:scale-[0.98]`
  - `focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none`
  - `disabled:opacity-50 disabled:cursor-not-allowed`
- **Transitions:** Combine state changes with `transition-all duration-150 ease-in-out` for smooth user feedback.

---

## 4. Class Ordering & Readability

Follow the standard Tailwind CSS class order convention:
1. **Layout & Display:** `flex`, `grid`, `block`, `hidden`, `relative`, `absolute`
2. **Box Model & Sizing:** `w-full`, `max-w-md`, `h-10`, `p-4`, `m-2`
3. **Typography:** `font-sans`, `text-lg`, `font-semibold`, `text-slate-900`, `leading-tight`
4. **Visuals & Surfaces:** `bg-white`, `border`, `border-slate-200`, `rounded-lg`, `shadow-sm`
5. **Interactive & Transitions:** `hover:bg-slate-100`, `transition-colors`, `duration-150`

---

## 5. Integration Notes

- If integrating via CDN: `<script src="https://cdn.tailwindcss.com"></script>`
- When working within projects containing a custom Vanilla CSS design system, respect and harmonize existing CSS variables and class conventions.
