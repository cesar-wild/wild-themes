# Wild Agents — Visual Identity

> Version 1.0 — April 2026 | Authored by Trazo (Creative Director)

---

## 1. Logomark Concept

### Primary Concept: The Howl Glyph

The Wild Agents logomark is a stylized wolf head silhouette reduced to its most essential geometric form. No photorealism. No cartoon softening. The mark reads as a shape — decisive, sharp-edged, and recognizable at any size.

**Construction principles:**
- Built on a 32×32 grid. Every vertex snaps to the grid.
- Composed of 4–6 primary polygons. No bezier curves in the base mark — only straight paths.
- The silhouette captures: pointed ears (alert, watchful), strong jaw line (power, teeth), and slight forward lean (action, not rest).

**Geometric description (for SVG implementation):**
```
Outer bounding box: 32×32
Left ear apex:      (7, 3)
Right ear apex:     (25, 3)
Crown center:       (16, 6)
Left jaw point:     (4, 26)
Right jaw point:    (28, 26)
Chin:               (16, 30)
```
The precise SVG paths are to be finalized by Forja and approved by Trazo before use in any shipped asset.

### Secondary Concept: The Pack Bracket

For wordmark lockups and code signature contexts, a bracket motif surrounds the name:

```
╭── WILD AGENTS ──╮
```

This can be rendered as literal Unicode box characters in terminal/code contexts, or as thin rounded rectangular bracket SVG shapes in UI contexts.

---

## 2. Wordmark

**Wordmark:** `WILD AGENTS`

- All caps.
- Font: **Inter Variable**, weight 800 (ExtraBold).
- Letter-spacing: `0.12em` — wide enough to breathe, tight enough to hold together as a single unit.
- Color: Pack Gold (`oklch(72% 0.18 68)`) on dark backgrounds, Charcoal (`oklch(18% 0.02 260)`) on light.

**Full lockup (icon + wordmark):**
- Icon to the left, wordmark to the right.
- Vertical center-aligned.
- Gap between icon and wordmark: 10px at base scale (24px icon).

**Tagline (optional sub-lockup):**
> *Forged to ship. Built to last.*
- Font: Inter, weight 400, `font-size: 0.72em` relative to wordmark size.
- Letter-spacing: `0.06em`
- Color: `--color-fg-muted`

---

## 3. Color Swatches

### Primary Palette

#### Pack Gold
```
Token:       --color-brand-gold
OKLCH:       oklch(72% 0.18 68)
Hex (approx): #C9880A
RGB (approx): 201, 136, 10
Usage:       Primary actions, CTAs, focus rings, primary brand color
Contrast:    Use with Charcoal (#1c1e24) or Bone (#f5efe6) for text
```

**Swatch block (light → dark variants):**

| Variant | OKLCH | Use |
|---|---|---|
| Subtle (tint) | `oklch(92% 0.06 68)` | Backgrounds, highlight wash |
| Base | `oklch(72% 0.18 68)` | Main fill |
| Hover | `oklch(65% 0.20 68)` | Interactive hover |
| Active | `oklch(58% 0.22 68)` | Interactive press |
| Dark subtle | `oklch(28% 0.07 68)` | Dark theme tinted background |
| Dark base | `oklch(78% 0.17 68)` | Dark theme main fill |

---

#### Night Slate
```
Token:       --color-brand-slate
OKLCH:       oklch(38% 0.06 250)
Hex (approx): #3A4560
Usage:       Secondary brand, structural depth, nav backgrounds
```

| Variant | OKLCH | Use |
|---|---|---|
| Base | `oklch(38% 0.06 250)` | Dark nav, secondary fills |
| Hover | `oklch(44% 0.07 250)` | Hover state |
| Muted | `oklch(65% 0.08 250)` | Dark theme secondary |

---

#### Blood Ember
```
Token:       --color-brand-ember
OKLCH:       oklch(58% 0.22 32)
Hex (approx): #C94C1A
Usage:       Accent highlights, urgency indicators, code keyword syntax
```

| Variant | OKLCH | Use |
|---|---|---|
| Subtle | `oklch(92% 0.07 32)` | Light theme tinted bg |
| Base | `oklch(58% 0.22 32)` | Fills and accents |
| Hover | `oklch(52% 0.24 32)` | Hover |
| Dark base | `oklch(68% 0.20 32)` | Dark theme |
| Dark subtle | `oklch(28% 0.09 32)` | Dark theme tinted bg |

---

#### Charcoal
```
Token:       --color-brand-charcoal
OKLCH:       oklch(18% 0.02 260)
Hex (approx): #1C1E24
Usage:       Dark background, primary text on light, terminal UI
```

---

#### Bone
```
Token:       --color-brand-bone
OKLCH:       oklch(94% 0.015 88)
Hex (approx): #F5EFE6
Usage:       Light background, paper, canvas
```
Bone has a very subtle warm undertone (hue 88 — slightly toward yellow-orange) to avoid the clinical cold-white feeling. This warmth is intentional: it reads as tactile, like paper or parchment.

---

#### Forest
```
Token:       --color-brand-forest
OKLCH:       oklch(58% 0.14 148)
Hex (approx): #2D7A4A
Usage:       Success state, "hunt complete", positive feedback
```

---

#### Pack Silver
```
Token:       --color-brand-silver
OKLCH:       oklch(82% 0.01 250)
Hex (approx): #CACDD5
Usage:       Borders, dividers, muted text on light backgrounds
```

---

### Functional Colors

| Name | OKLCH | Role |
|---|---|---|
| Success | `oklch(58% 0.14 148)` | Positive, done, verified |
| Warning | `oklch(72% 0.18 68)` | Attention (reuses Pack Gold) |
| Error | `oklch(52% 0.22 25)` | Failure, destructive, danger |
| Info | `oklch(55% 0.12 250)` | Neutral information |

---

## 4. Dark/Light Mode Identity

### Dark Mode — "Hunt Mode"

Dark mode is the primary mode for Wild Agents product surfaces. This is where agents live. Design priorities:

- Charcoal base (`oklch(18% 0.02 260)`) — never pure black. Pure black reads flat; this has subtle blue warmth.
- Pack Gold glows. On dark backgrounds, gold pops without adjustment — it carries the brand.
- Blood Ember is used sparingly — it reads as dangerous on dark, which is appropriate for its role.
- Minimal borders — use `--color-border` (`oklch(32% 0.03 260)`) which is subtle, not heavy.

### Light Mode — "Dispatch Mode"

Light mode is for documentation, marketing, and external-facing contexts.

- Bone background creates warmth, avoids clinical sterility.
- Pack Gold reads darker on Bone — contrast is approximately 4.8:1 against Bone background.
- Night Slate handles secondary structural elements (sidebar backgrounds, navigation).

---

## 5. Logo Usage Rules

### Safe Zones
- Maintain clear space equal to the height of the letter "W" in the wordmark on all four sides of any lockup.

### Approved Color Combinations

| Background | Logomark / Wordmark |
|---|---|
| Charcoal | Pack Gold |
| Bone | Charcoal |
| Pack Gold | Charcoal |
| White | Charcoal |
| Night Slate | Bone or Pack Gold |

### Prohibited Uses

- Do not place the logo on photographic backgrounds without a solid color shield.
- Do not stretch, rotate, or distort the logomark.
- Do not use Blood Ember as the logo color (it is accent-only).
- Do not add drop shadows to the logomark.
- Do not use the logo at sizes smaller than 16px height.
- Do not recolor the wordmark with `--color-fg-subtle` — it is too low contrast for brand placement.

---

## 6. Icon System

All product icons follow:

- **Grid:** 24×24px (design), 1.5px stroke weight
- **Style:** Outlined, not filled. Consistent stroke-linecap: round. Stroke-linejoin: round.
- **Corner treatment:** Slightly rounded corners via `stroke-linejoin: round` — matches `--radius-sm` intent without hard box corners.
- **Color:** Icons inherit `currentColor`. Size and color set by parent context, never baked in.

**Icon categories for initial release:**

| Category | Examples |
|---|---|
| Actions | send, edit, delete, copy, archive |
| Status | check, x, warning, info, loading-spin |
| Navigation | chevron-right, chevron-down, arrow-left |
| Pack (brand) | wolf-mark, howl, pack-badge |
| Code | terminal, branch, commit, deploy |
| Communication | comment, mention, thread |

Pack icons (`wolf-mark`, `howl`, `pack-badge`) are brand-specific and not sourced from generic icon libraries.

---

## 7. Illustration Style (Optional / Future)

When illustration is used (marketing pages, empty states, onboarding):

- **Style:** Geometric / constructivist. Angular shapes. No organic curves.
- **Palette:** Limited — Charcoal, Bone, and one accent (Pack Gold or Blood Ember). Never more than 3 fill colors in a single illustration.
- **No gradients** in illustrations. Flat fills only. Exceptions allowed only for hero marketing where gradients serve a specific background texture purpose.
- **Scale:** Illustrations should be bold at small sizes. If detail is lost at 240px wide, redesign the piece.

---

## 8. Digital Asset Formats

| Asset | Format | Notes |
|---|---|---|
| Logomark | SVG | Primary. Must be path-only, no `<image>` embeds |
| Logomark | PNG (2×, 3×) | For contexts where SVG is not supported |
| Wordmark lockup | SVG | Must include font paths or use system font stack |
| Favicon | ICO + 32×32 PNG | Use simplified icon only |
| Social card | 1200×630 PNG | Dark mode preferred |
| App icon (if needed) | 512×512 PNG | Rounded square crop by platform |

---

*Visual identity assets (SVG files) are to be produced in a follow-on task once the logomark geometry is approved by Lobo. This document defines the spec; the files are the output.*
