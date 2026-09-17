---
name: typescript-pro
description: >-
  Expert-level TypeScript architectural patterns, type-safety standards, and advanced typing techniques.
  Use whenever writing or refactoring TypeScript code, designing strict type systems, creating generic abstractions, or typing data layers and APIs.
---

# TypeScript Pro & Type-Safety Architecture Guide

Comprehensive reference for designing robust, fully type-safe applications and enterprise architectures with modern TypeScript.

---

## 1. Strict Configuration & Baseline

Always configure projects with strict compiler options in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "exactOptionalPropertyTypes": true,
    "skipLibCheck": true,
    "isolatedModules": true
  }
}
```

---

## 2. Advanced Type Patterns

### Discriminated Unions (Tagged Unions)
Prefer discriminated unions over optional fields for mutually exclusive states:

```typescript
type AsyncState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error };
```

### The `satisfies` Operator
Use `satisfies` to validate that an expression matches a type without widening its inferred specific literal type:

```typescript
type RouteConfig = Record<string, { path: string; role?: 'admin' | 'user' }>;

const routes = {
  home: { path: '/' },
  dashboard: { path: '/admin', role: 'admin' },
} satisfies RouteConfig;

// routes.dashboard.role is strictly 'admin', not undefined or string
```

### Type Predicates (Custom Type Guards)
```typescript
function isDefined<T>(val: T | null | undefined): val is T {
  return val !== null && val !== undefined;
}

const activeItems = list.filter(isDefined); // Type is T[]
```

---

## 3. Generics & Utility Types

- **Constraints with `extends`:**
  ```typescript
  function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
  }
  ```
- **Conditional & Template Literal Types:**
  ```typescript
  type EventName = `on${Capitalize<string>}`;
  type Nullable<T> = T | null;
  type DeepReadonly<T> = {
    readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
  };
  ```

---

## 4. Robust Error Handling (`Result<T, E>`)

Prefer explicit Result types over untyped throwing for predictable domain errors:

```typescript
type Result<T, E = Error> =
  | { ok: true; value: T }
  | { ok: false; error: E };

function parseId(raw: string): Result<number, 'invalid_format'> {
  const num = Number(raw);
  return Number.isNaN(num)
    ? { ok: false, error: 'invalid_format' }
    : { ok: true, value: num };
}
```

---

## 5. Vanilla JS / JSDoc Type Checking

When working in plain JavaScript projects without a build step, use TypeScript checking via JSDoc comments:

```javascript
// @ts-check

/**
 * @typedef {Object} Emprestimo
 * @property {string} id
 * @property {string} aluno_id
 * @property {string} livro_id
 * @property {string} data_emprestimo
 * @property {string} data_devolucao_prevista
 * @property {string|null} data_devolucao_real
 */

/**
 * @param {Emprestimo} emp
 * @returns {'ativo'|'atrasado'|'proximo_vencimento'|'devolvido'}
 */
function computeStatus(emp) {
  // TypeScript checks types at edit time
}
```
