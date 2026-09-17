---
name: react-modernization
description: >-
  Comprehensive guide and architectural patterns for modernizing React codebases,
  migrating legacy architectures to modern React (18/19), Next.js, Vite, and implementing progressive component upgrades.
  Use whenever migrating from class components, upgrading state management, adopting server components, or porting Vanilla JS apps to modern React.
---

# React Modernization & Architecture Guide

Practical roadmap and patterns for upgrading legacy web applications to modern, high-performance React architectures.

---

## 1. Modern React Baseline (React 18 & 19)

- **Functional Components & Hooks:** Completely phase out legacy lifecycle methods (`componentDidMount`, `UNSAFE_componentWillReceiveProps`) in favor of idiomatic hooks (`useEffect`, `useMemo`, `useCallback`, `useId`).
- **Concurrent Features:**
  - `useTransition`: Mark non-urgent UI state updates as interruptible transitions to keep input responsive.
  - `useDeferredValue`: Defer rendering of heavy search/filter views while typing.
  - `Suspense`: Coordinated fallback states for asynchronous data and code-split chunks.

---

## 2. Progressive Migration Strategies (Strangler Fig Pattern)

When migrating from Vanilla JS, MPA, or legacy SPAs:

1. **Phase 1 (Islands Architecture):** Mount individual React roots (`createRoot`) inside specific container divs on existing HTML pages without rewriting the whole router:
   ```javascript
   import { createRoot } from 'react-dom/client';
   import { RelatoriosDashboard } from './components/RelatoriosDashboard';

   const el = document.getElementById('react-report-container');
   if (el) {
     const root = createRoot(el);
     root.render(<RelatoriosDashboard />);
   }
   ```
2. **Phase 2 (Shared Data Layer):** Bridge global state (e.g. `window.DB` or custom events) with React custom hooks (`useSyncExternalStore`):
   ```typescript
   export function useBibliotecaState() {
     return useSyncExternalStore(
       (callback) => window.DB.subscribe?.(callback) || (() => {}),
       () => window.DB._raw
     );
   }
   ```
3. **Phase 3 (Full SPA / SSR):** Consolidate routing under a modern framework (Vite SPA with React Router or Next.js App Router).

---

## 3. State Management Modernization

- **Server Cache vs. Client UI State:** Separate asynchronous server state from local UI state.
  - **Server/Data State:** Use **TanStack Query (React Query)** or SWR for caching, deduping, pagination, and invalidation.
  - **Client Global State:** Use lightweight, boilerplate-free stores like **Zustand** instead of heavy legacy Redux setups:
    ```typescript
    import { create } from 'zustand';

    interface AppStore {
      selectedPeriod: { ano: number; mes: number };
      setPeriod: (ano: number, mes: number) => void;
    }

    export const useAppStore = create<AppStore>((set) => ({
      selectedPeriod: { ano: 2026, mes: 8 },
      setPeriod: (ano, mes) => set({ selectedPeriod: { ano, mes } }),
    }));
    ```

---

## 4. Performance & Component Optimization

- **Fine-Grained Re-rendering:** Move state down to the leaf components that actually need it.
- **Code Splitting & Lazy Loading:**
  ```tsx
  import { lazy, Suspense } from 'react';
  const HeavyChart = lazy(() => import('./HeavyChart'));

  export function ChartSection() {
    return (
      <Suspense fallback={<div className="chart-skeleton" />}>
        <HeavyChart />
      </Suspense>
    );
  }
  ```
- **Virtualization for Long Lists:** Use `@tanstack/react-virtual` for rendering thousands of table rows or items smoothly without DOM bloat.
