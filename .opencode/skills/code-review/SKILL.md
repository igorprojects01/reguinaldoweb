---
name: code-review
description: >-
  Comprehensive guidelines, checklists, and evaluation criteria for performing thorough code reviews.
  Use whenever reviewing pull requests, inspecting code quality, auditing refactors, or evaluating correctness, performance, and maintainability.
---

# Code Review & Quality Assurance Guide

Systematic methodology for conducting rigorous, actionable, and empathetic code reviews across software projects.

---

## 1. Core Review Dimensions & Checklist

Every code change must be evaluated across five fundamental pillars:

### A. Correctness & Logic
- [ ] Does the code satisfy the acceptance criteria and stated requirements?
- [ ] Are edge cases handled (empty arrays, `null`/`undefined`, zero values, leap years, timezone discrepancies)?
- [ ] Are there potential off-by-one errors or unintended type coercions (e.g. `==` vs `===`)?
- [ ] Are state transitions atomic and deterministic?

### B. Architecture & Maintainability
- [ ] Does the change adhere to existing codebase architectural patterns and naming conventions?
- [ ] Is the single responsibility principle respected (functions/modules do one cohesive thing)?
- [ ] Is there unnecessary duplication or overly complex abstractions (over-engineering)?
- [ ] Are public APIs, helper functions, and complex algorithms clearly documented?

### C. Performance & Resource Efficiency
- [ ] Are time and space complexities appropriate (avoid $O(N^2)$ loops inside render paths or frequent events)?
- [ ] Are event listeners, timers, intervals, and observers cleaned up to prevent memory leaks?
- [ ] In frontend code: are DOM thrashing, forced synchronous layouts, and unnecessary reflows avoided?

### D. Error Handling & Observability
- [ ] Are failure paths gracefully handled without crashing the application?
- [ ] Are error messages descriptive, actionable, and secure (no raw stack traces exposed to end-users)?
- [ ] Are fallbacks / empty states presented when operations yield no data?

### E. Security & Data Integrity
- [ ] Is user input sanitized against XSS, SQL injection, and path traversal?
- [ ] Are sensitive tokens, credentials, or keys absent from version control?
- [ ] Are existing data structures and backward compatibility preserved?

---

## 2. Structured Feedback Classification

Categorize review comments using standardized severity labels:

- **🚨 [CRITICAL / BLOCKER]:** Functional bugs, security vulnerabilities, or breaking regressions. Must be resolved before merge.
- **⚠️ [IMPORTANT]:** Architectural issues, notable performance bottlenecks, or missing critical edge-case handling. Strongly recommended to fix.
- **💡 [SUGGESTION]:** Non-blocking improvements, minor style polish, or alternative idiom suggestions.
- **👏 [PRAISE]:** Positive reinforcement for elegant solutions, clean patterns, or thorough test coverage.

---

## 3. Actionable Feedback Format

Always provide constructive context and code examples when requesting changes:

```markdown
### ⚠️ [IMPORTANT]: Potential Memory Leak in Sub-tab Chart Cleanup

**Context:** When toggling rapidly between tabs, previously initialized Chart.js instances are not destroyed, leading to canvas context retention.

**Suggested Fix:**
```javascript
// Before
self._subTab = btn.dataset.tab;

// After
self._destroyCharts();
self._subTab = btn.dataset.tab;
```
```
