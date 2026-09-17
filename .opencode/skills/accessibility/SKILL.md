---
name: accessibility
description: >-
  Expert guidelines and technical standards for web accessibility (A11y) and WCAG 2.1/2.2 compliance (Levels A & AA).
  Use whenever implementing or auditing semantic HTML, ARIA attributes, keyboard navigation, focus management, color contrast, and screen reader support.
---

# Web Accessibility (A11y) & WCAG Guidelines

Practical technical guide for building fully accessible, inclusive web interfaces compliant with WCAG 2.1/2.2 AA standards.

---

## 1. Semantic HTML & Landmarks

Always prefer native HTML elements over custom ARIA widgets. Native elements include built-in keyboard behavior, focus states, and screen reader announcements.

- **Landmarks:** Structure pages with `<header>`, `<nav>`, `<main>`, `<aside>`, and `<footer>`.
- **Buttons vs. Links:**
  - Use `<button>` for actions that alter state, open modals, or trigger scripts on the same page.
  - Use `<a href="...">` for navigating to a new URL, page, or internal anchor.
- **Headings Structure:** Maintain a strict logical hierarchy (`<h1>` → `<h2>` → `<h3>`). Never skip levels for styling purposes (use CSS classes to control visual size).

---

## 2. Keyboard Navigation & Focus Management

Every interactive element must be operable via keyboard alone (`Tab`, `Shift+Tab`, `Enter`, `Space`, `Escape`, `Arrow keys`).

- **Visible Focus Indicators:** Never remove focus outlines without providing an accessible alternative.
  ```css
  :focus-visible {
    outline: 2px solid var(--color-primary, #0052CC);
    outline-offset: 2px;
  }
  ```
- **Modal Dialogs (Focus Trapping & Escape):**
  1. When a modal opens, move focus to the dialog container or first interactive element.
  2. Trap `Tab` and `Shift+Tab` inside the active modal overlay.
  3. Close on `Escape` key press and return focus to the triggering element.
- **Tab Order:** Follow natural reading order in the DOM. Avoid `tabindex > 0`. Use `tabindex="0"` to make custom elements focusable and `tabindex="-1"` for programmatically focused elements.

---

## 3. ARIA Rules & State Management

**First Rule of ARIA:** Do not use ARIA when native HTML can achieve the same result.

- **Dynamic States:**
  - Dropdowns & Collapsibles: `aria-expanded="true|false"`, `aria-controls="menuId"`
  - Modals & Dialogs: `role="dialog"`, `aria-modal="true"`, `aria-labelledby="titleId"`
  - Selected Tabs: `role="tab"`, `aria-selected="true|false"`
  - Visual Icons (Decorative): `aria-hidden="true"`
- **Live Regions (`aria-live`):**
  - Use for toasts, notifications, and dynamic search counters:
    ```html
    <div id="toastContainer" aria-live="polite" aria-atomic="true"></div>
    ```

---

## 4. Color Contrast & Visual Accessibility

- **Contrast Ratios (WCAG AA):**
  - Normal Text (< 18pt or < 14pt bold): Minimum **4.5:1** contrast against its background.
  - Large Text (≥ 18pt or ≥ 14pt bold): Minimum **3.0:1** contrast.
  - UI Components & Icons: Minimum **3.0:1** contrast for interactive borders, icons, and focus rings.
- **Never Rely Solely on Color:** Always pair color with text, icons, or badges to convey status (e.g. overdue loan card must have text label + badge, not just red border).

---

## 5. Forms & Inputs

- **Explicit Labels:** Pair every input with a `<label for="inputId">` or `aria-label`/`aria-labelledby`.
- **Help Text & Errors:** Connect helper descriptions and error messages with `aria-describedby="helpId errorId"`.
- **Validation State:** Apply `aria-invalid="true"` when an input fails validation.
- **Touch Targets:** Minimum interactive target area of **44×44 CSS pixels** on touch-enabled devices.
