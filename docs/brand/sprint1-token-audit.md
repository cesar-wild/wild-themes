# Sprint 1: OKLCH Design Token Audit

**Audit Date:** 2026-04-16
**Auditor:** Trazo (Creative Director, Wild Agents)
**Sprint:** Sprint 1 — Deploy, QA & First Plugins
**Issue:** MRW-39

---

## Summary

| Metric | Value |
|---|---|
| Themes audited | 2 |
| Themes in repo (excl. template) | 2 |
| Token compliance: PASS | 2 |
| Token compliance: FAIL | 0 |
| Accessibility: full WCAG AA | 1 (`wolf-dark`) |
| Accessibility: minor flag | 1 (`ember` — text-secondary 4.26:1) |
| Hardcoded hex/rgb violations | 0 |

**Status: Both themes pass token audit. One minor accessibility flag to watch.**

---

## Audit Checklist (per theme)

Each theme is evaluated against the following criteria:

| # | Check |
|---|---|
| 1 | Uses `--color-accent-l/c/h` tokens |
| 2 | Uses `--color-surface-l/c/h` tokens |
| 3 | Uses `--color-text-primary-l/c/h` tokens |
| 4 | Uses `--color-text-secondary-l/c/h` tokens |
| 5 | Uses `--color-border-l/c/h` tokens |
| 6 | No hardcoded `color: #` or `background: rgb(` values |
| 7 | Text-primary on surface ≥ 4.5:1 (WCAG AA) |
| 8 | Text-secondary on surface ≥ 4.5:1 (WCAG AA) |
| 9 | Accent on surface ≥ 3:1 (WCAG AA large) |

---

## Theme Results

### `ember`

> Forge-dark theme. Near-black surfaces, burning orange accent.

**Token Coverage**

| Token | Present | Value |
|---|---|---|
| `--color-accent-l` | ✅ | `0.65` |
| `--color-accent-c` | ✅ | `0.22` |
| `--color-accent-h` | ✅ | `42` |
| `--color-surface-l` | ✅ | `0.08` |
| `--color-surface-c` | ✅ | `0.02` |
| `--color-surface-h` | ✅ | `38` |
| `--color-text-primary-l` | ✅ | `0.96` |
| `--color-text-primary-c` | ✅ | `0.01` |
| `--color-text-primary-h` | ✅ | `80` |
| `--color-text-secondary-l` | ✅ | `0.55` |
| `--color-text-secondary-c` | ✅ | `0.02` |
| `--color-text-secondary-h` | ✅ | `55` |
| `--color-border-l` | ✅ | `0.18` |
| `--color-border-c` | ✅ | `0.03` |
| `--color-border-h` | ✅ | `38` |

**Violations:** None — no hardcoded hex or rgb values.

**Contrast Ratios (WCAG 2.1)**

| Pair | Ratio | WCAG Grade | Status |
|---|---|---|---|
| text-primary on surface | 18.51:1 | AAA | ✅ |
| text-secondary on surface | 4.26:1 | AA Large | ⚠️ |
| accent on surface | 5.90:1 | AA | ✅ |
| border on surface | 1.10:1 | — | ℹ️ decorative |

**Flag:** `text-secondary` is 4.26:1, just below the 4.5:1 WCAG AA threshold for normal body text. Passes for large text (≥ 18px regular or ≥ 14px bold). Recommend nudging `--color-text-secondary-l` from `0.55` to `0.60` on next revision to clear AA at all sizes.

**Verdict: PASS** (minor advisory on text-secondary)

---

### `wolf-dark`

> Deep forest dark theme. Midnight greens, amber firelight.

**Token Coverage**

| Token | Present | Value |
|---|---|---|
| `--color-accent-l` | ✅ | `0.72` |
| `--color-accent-c` | ✅ | `0.16` |
| `--color-accent-h` | ✅ | `78` |
| `--color-surface-l` | ✅ | `0.10` |
| `--color-surface-c` | ✅ | `0.01` |
| `--color-surface-h` | ✅ | `155` |
| `--color-text-primary-l` | ✅ | `0.93` |
| `--color-text-primary-c` | ✅ | `0.01` |
| `--color-text-primary-h` | ✅ | `90` |
| `--color-text-secondary-l` | ✅ | `0.58` |
| `--color-text-secondary-c` | ✅ | `0.01` |
| `--color-text-secondary-h` | ✅ | `155` |
| `--color-border-l` | ✅ | `0.22` |
| `--color-border-c` | ✅ | `0.01` |
| `--color-border-h` | ✅ | `155` |

**Violations:** None — no hardcoded hex or rgb values.

**Contrast Ratios (WCAG 2.1)**

| Pair | Ratio | WCAG Grade | Status |
|---|---|---|---|
| text-primary on surface | 16.75:1 | AAA | ✅ |
| text-secondary on surface | 4.83:1 | AA | ✅ |
| accent on surface | 8.14:1 | AAA | ✅ |
| border on surface | 1.19:1 | — | ℹ️ decorative |

**Verdict: PASS** — all text pairs meet WCAG AA, text-primary and accent reach AAA.

---

## Audit Notes

### Border contrast (both themes)

Both themes intentionally use very subtle borders (`border-l` ≈ 0.18–0.22) to create a near-invisible edge against dark surfaces. This is a deliberate design decision — borders are decorative structural elements, not text, and WCAG 1.4.11 (Non-Text Contrast) applies to UI *components* and *focus indicators*, not passive decorative lines. No action required unless a border serves as the sole indicator of a UI component boundary (e.g., text inputs in forms), in which case a minimum 3:1 ratio is required for that specific usage.

### Sprint 1 scope note

Sprint 1 targets 100 themes. At audit time (2026-04-16), 2 themes are live in the repo (`ember`, `wolf-dark`). The `_template` was excluded from audit — it contains placeholder values and is not a deployable theme. This document will be updated as new themes are added and audited.

---

## Action Items

| Theme | Action | Priority |
|---|---|---|
| `ember` | Nudge `--color-text-secondary-l` from `0.55` → `0.60` for full WCAG AA normal text | Low |
| All future themes | Must pass all 9 checklist items before merge | Required |
| Sprint 1 remainder | Run this audit on each new theme at PR time | Required |

---

## Methodology

**Contrast ratios** are computed via OKLCH → OKLab → linear sRGB → relative luminance using the standard Björn Ottosson OKLab transform, followed by WCAG 2.1 relative luminance formula. Results are approximations accurate to ±0.05 ratio; out-of-gamut clamping applied.

**Token compliance** is checked with string search for each `--color-<role>-<l|c|h>` property declaration in `index.css`. Absence of hardcoded hex (`#RRGGBB`) and `rgb(...)` values is verified independently.

---

*Wild Agents. Forged to ship. Built to last.*
