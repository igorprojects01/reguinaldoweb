---
name: security-review
description: >-
  Expert security audit guidelines, vulnerability assessment patterns, and secure coding standards (OWASP Top 10, CWE).
  Use whenever auditing source code for security vulnerabilities, preventing XSS/CSRF/Injection, securing data storage, or implementing authentication and authorization controls.
---

# Web Application Security Review & Secure Coding Guide

Practical, engineering-focused guide for identifying vulnerabilities and enforcing defense-in-depth security standards across frontend and backend codebases.

---

## 1. Input Sanitization & XSS Prevention (Cross-Site Scripting)

- **Context-Aware HTML Escaping:** Never inject unescaped user inputs directly into `innerHTML`, `document.write`, or template strings:
  ```javascript
  function escapeHTML(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
  ```
- **Safe DOM APIs:** Prefer `textContent`, `setAttribute`, and `createElement` over string concatenation with `innerHTML`.
- **Content Security Policy (CSP):** Configure strong HTTP headers or meta tags:
  ```html
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' https://cdn.jsdelivr.net https://unpkg.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com;" />
  ```

---

## 2. Injection Defense (SQL, NoSQL, OS Command)

- **Parameterized Queries:** Always use parameterized inputs or prepared statements; never concatenate user input into query strings:
  ```javascript
  // SAFE: Parameterized
  const [rows] = await db.execute(
    'SELECT * FROM emprestimos WHERE aluno_id = ? AND status = ?',
    [alunoId, status]
  );
  ```
- **Input Validation & Whitelisting:** Validate input types, ranges, and formats (e.g. using regex, Zod, or integer parsing) before passing values to internal operations.

---

## 3. Client-Side Data Security (`localStorage` & Cookies)

- **Sensitive Data Rules:** Never store raw passwords, API secret keys, personal identification records (CPF/SSN), or sensitive tokens in `localStorage` (which is vulnerable to XSS).
- **Secure Cookie Flags:** For session identifiers and authentication tokens, always enforce:
  - `HttpOnly`: Prevents client-side scripts from reading the cookie.
  - `Secure`: Ensures cookies are only transmitted over HTTPS.
  - `SameSite=Strict` or `SameSite=Lax`: Mitigates CSRF attacks.

---

## 4. Access Control & Authorization (IDOR Prevention)

- **Server-Side Enforcement:** Never rely solely on frontend hiding/disabling of buttons for permission control.
- **Object-Level Authorization (IDOR):** Verify that the currently authenticated user owns or has explicit permission to view/modify the requested record ID before performing operations.

---

## 5. Security Headers Baseline

Ensure the server returns modern HTTP security response headers:
- `Strict-Transport-Security: max-age=31536000; includeSubDomains` (HSTS)
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY` or `SAMEORIGIN` (Clickjacking defense)
- `Referrer-Policy: strict-origin-when-cross-origin`
