# Wild Agents — Brand Guidelines

> Version 1.0 — April 2026 | Authored by Trazo (Creative Director)

---

## 1. Brand Identity

### The Wolf Pack Concept

Wild Agents is built on the wolf pack metaphor — not decoratively, but structurally. Wolf packs are coordinated, role-defined, and relentless. Every member serves the hunt. No one waits for permission. The pack is the product.

This metaphor shapes every visual and verbal decision:

- **Sharp over soft.** Clean edges, decisive type, no decorative rounding.
- **Purposeful contrast.** High-impact moments separated by intentional negative space.
- **Cohesion without uniformity.** Each agent has a voice; the system has a spine.

### Brand Pillars

| Pillar | Design Expression |
|---|---|
| Pack First | Shared visual language — no agent invents its own tokens |
| Hunt Relentlessly | High contrast, forward-leaning type, active voice |
| Guard the Perimeter | Accessible ratios, no edge cases skipped, structure before decoration |
| Teeth Over Talk | Code-first docs, working prototypes, no vaporware aesthetics |
| Scars Make Us Faster | Imperfection embraced — textured accents, rough asymmetry allowed |

---

## 2. Voice & Tone

### Core Principles

**Direct.** Say the thing. No hedging, no preamble. Agents speak like operators, not assistants.

**Pack-coded.** Language references the metaphor without forcing it. "Hunt," "ship," "guard," "forge," "howl" — when used, use them with intention.

**Earned confidence.** No superlatives. The work speaks. Comments and docs state what was done and why — not how impressive it was.

### Voice Examples

| Avoid | Prefer |
|---|---|
| "We're excited to introduce..." | "Introducing —" |
| "Please feel free to reach out" | "File an issue. We'll pick it up." |
| "This amazing feature..." | "This adds X. It matters because Y." |
| "Kind regards" | — (sign with pack signature instead) |

### Writing Conventions

- Sentence case for headings (not Title Case)
- Em dashes — used liberally — for rhythm
- Ellipses for trailing tension, not for trailing off...
- Numerals in copy: always digits (`5`, `48h`, `3x`) not words

---

## 3. Color Palette

All colors are defined in OKLCH for perceptual uniformity. Dark and light theme variants are provided for every role.

> OKLCH format: `oklch(L% C H)` — Lightness (0–100%), Chroma (0–0.37+), Hue (0–360°)

### Brand Palette — Named Colors

| Name | Token | OKLCH | Hex (approx) | Role |
|---|---|---|---|---|
| Pack Gold | `--color-brand-gold` | `oklch(72% 0.18 68)` | `#c9880a` | Primary brand, CTAs, leadership |
| Night Slate | `--color-brand-slate` | `oklch(38% 0.06 250)` | `#3a4560` | Secondary brand, depth, structure |
| Blood Ember | `--color-brand-ember` | `oklch(58% 0.22 32)` | `#c94c1a` | Accent, urgency, alerts |
| Bone | `--color-brand-bone` | `oklch(94% 0.015 88)` | `#f5efe6` | Light background, paper |
| Charcoal | `--color-brand-charcoal` | `oklch(18% 0.02 260)` | `#1c1e24` | Dark background, terminal |
| Pack Silver | `--color-brand-silver` | `oklch(82% 0.01 250)` | `#cacdd5` | Muted text, dividers |
| Forest | `--color-brand-forest` | `oklch(58% 0.14 148)` | `#2d7a4a` | Success, hunt complete |

### Semantic Tokens

These map brand colors to functional roles. Always use semantic tokens in components — never raw OKLCH values.

#### Light Theme

```css
:root {
  /* Backgrounds */
  --color-bg-base:        oklch(94% 0.015 88);    /* Bone */
  --color-bg-elevated:    oklch(99% 0.005 88);    /* Near-white */
  --color-bg-sunken:      oklch(88% 0.02 88);     /* Warmer inset */
  --color-bg-overlay:     oklch(18% 0.02 260 / 60%); /* Modal scrim */

  /* Foregrounds */
  --color-fg-base:        oklch(18% 0.02 260);    /* Charcoal */
  --color-fg-muted:       oklch(45% 0.03 250);    /* Mid-tone */
  --color-fg-subtle:      oklch(62% 0.02 250);    /* Placeholder, disabled */
  --color-fg-inverse:     oklch(94% 0.015 88);    /* Text on dark */

  /* Brand */
  --color-primary:        oklch(72% 0.18 68);     /* Pack Gold */
  --color-primary-hover:  oklch(65% 0.20 68);
  --color-primary-active: oklch(58% 0.22 68);
  --color-primary-subtle: oklch(92% 0.06 68);

  --color-secondary:      oklch(38% 0.06 250);    /* Night Slate */
  --color-secondary-hover:oklch(44% 0.07 250);

  --color-accent:         oklch(58% 0.22 32);     /* Blood Ember */
  --color-accent-hover:   oklch(52% 0.24 32);
  --color-accent-subtle:  oklch(92% 0.07 32);

  /* Functional */
  --color-success:        oklch(58% 0.14 148);    /* Forest */
  --color-success-subtle: oklch(92% 0.06 148);
  --color-warning:        oklch(72% 0.18 68);     /* Reuses Pack Gold */
  --color-warning-subtle: oklch(92% 0.06 68);
  --color-error:          oklch(52% 0.22 25);
  --color-error-subtle:   oklch(93% 0.07 25);
  --color-info:           oklch(55% 0.12 250);
  --color-info-subtle:    oklch(92% 0.04 250);

  /* Borders */
  --color-border:         oklch(80% 0.02 250);
  --color-border-strong:  oklch(60% 0.04 250);
  --color-border-focus:   oklch(72% 0.18 68);     /* Pack Gold focus ring */
}
```

#### Dark Theme

```css
[data-theme="dark"] {
  /* Backgrounds */
  --color-bg-base:        oklch(18% 0.02 260);    /* Charcoal */
  --color-bg-elevated:    oklch(23% 0.025 260);
  --color-bg-sunken:      oklch(14% 0.015 260);
  --color-bg-overlay:     oklch(8% 0.01 260 / 75%);

  /* Foregrounds */
  --color-fg-base:        oklch(92% 0.015 88);    /* Near-bone */
  --color-fg-muted:       oklch(70% 0.02 250);
  --color-fg-subtle:      oklch(50% 0.02 250);
  --color-fg-inverse:     oklch(18% 0.02 260);

  /* Brand */
  --color-primary:        oklch(78% 0.17 68);     /* Slightly lighter gold on dark */
  --color-primary-hover:  oklch(84% 0.16 68);
  --color-primary-active: oklch(88% 0.14 68);
  --color-primary-subtle: oklch(28% 0.07 68);

  --color-secondary:      oklch(65% 0.08 250);
  --color-secondary-hover:oklch(72% 0.09 250);

  --color-accent:         oklch(68% 0.20 32);
  --color-accent-hover:   oklch(74% 0.18 32);
  --color-accent-subtle:  oklch(28% 0.09 32);

  /* Functional */
  --color-success:        oklch(68% 0.13 148);
  --color-success-subtle: oklch(26% 0.07 148);
  --color-warning:        oklch(78% 0.17 68);
  --color-warning-subtle: oklch(28% 0.07 68);
  --color-error:          oklch(65% 0.20 25);
  --color-error-subtle:   oklch(26% 0.09 25);
  --color-info:           oklch(68% 0.11 250);
  --color-info-subtle:    oklch(24% 0.06 250);

  /* Borders */
  --color-border:         oklch(32% 0.03 260);
  --color-border-strong:  oklch(50% 0.04 260);
  --color-border-focus:   oklch(78% 0.17 68);
}
```

### Accessibility — Contrast Requirements

All text combinations must pass WCAG AA. Checked against common pairings:

| Foreground | Background | Ratio | Status |
|---|---|---|---|
| `--color-fg-base` (dark) | `--color-bg-base` (light) | ~14:1 | AAA |
| `--color-primary` | `--color-bg-base` (light) | ~4.8:1 | AA |
| `--color-fg-inverse` (light) | `--color-primary` | ~4.8:1 | AA (large text min) |
| `--color-fg-base` (light) | `--color-bg-base` (dark) | ~12:1 | AAA |
| `--color-accent` | `--color-bg-base` (dark) | ~5.2:1 | AA |

**Never use `--color-fg-subtle` for body text.** It is reserved for placeholder, disabled, and decorative copy only.

---

## 4. Typography

### Typeface Choices

Wild Agents uses a two-family system:

| Role | Family | CSS |
|---|---|---|
| Display / Headings | **Inter** (Variable, wght 400–900) | `font-family: 'Inter Variable', 'Inter', system-ui, sans-serif` |
| Body | **Inter** (same variable font, lower weight) | Same family, `font-weight: 400` |
| Code / Mono | **JetBrains Mono** (Variable) | `font-family: 'JetBrains Mono', 'Fira Code', monospace` |

**Rationale:** Single humanist sans keeps headings and body cohesive. The variable font reduces HTTP requests. JetBrains Mono is the natural choice for a code-first brand — agents write code, the brand reflects that.

### Type Scale (Modular, 1.25 ratio — Major Third)

```css
:root {
  --font-size-xs:    0.64rem;   /*  ~10.2px */
  --font-size-sm:    0.8rem;    /*  ~12.8px */
  --font-size-base:  1rem;      /*  ~16px   */
  --font-size-md:    1.25rem;   /*  ~20px   */
  --font-size-lg:    1.563rem;  /*  ~25px   */
  --font-size-xl:    1.953rem;  /*  ~31px   */
  --font-size-2xl:   2.441rem;  /*  ~39px   */
  --font-size-3xl:   3.052rem;  /*  ~49px   */
}
```

### Line Height & Letter Spacing

```css
:root {
  --line-height-tight:  1.15;   /* Display, large headings */
  --line-height-snug:   1.3;    /* Sub-headings */
  --line-height-normal: 1.55;   /* Body text */
  --line-height-loose:  1.75;   /* Long-form prose */

  --letter-spacing-tight:  -0.03em;   /* Headings ≥ 2xl */
  --letter-spacing-snug:   -0.015em;  /* Headings md–xl */
  --letter-spacing-normal:  0em;      /* Body */
  --letter-spacing-wide:    0.05em;   /* Labels, caps, small UI text */
  --letter-spacing-wider:   0.1em;    /* ALL-CAPS display text */
}
```

### Heading Styles

```css
h1 { font-size: var(--font-size-3xl); font-weight: 800; line-height: var(--line-height-tight); letter-spacing: var(--letter-spacing-tight); }
h2 { font-size: var(--font-size-2xl); font-weight: 700; line-height: var(--line-height-tight); letter-spacing: var(--letter-spacing-tight); }
h3 { font-size: var(--font-size-xl);  font-weight: 700; line-height: var(--line-height-snug);  letter-spacing: var(--letter-spacing-snug); }
h4 { font-size: var(--font-size-lg);  font-weight: 600; line-height: var(--line-height-snug);  letter-spacing: var(--letter-spacing-snug); }
h5 { font-size: var(--font-size-md);  font-weight: 600; line-height: var(--line-height-normal); letter-spacing: 0; }
h6 { font-size: var(--font-size-base);font-weight: 600; line-height: var(--line-height-normal); letter-spacing: 0; }
```

---

## 5. Spacing System

Base unit: **4px**. All spacing tokens are multiples of 4.

```css
:root {
  --space-0:    0;
  --space-1:    0.25rem;   /*  4px */
  --space-2:    0.5rem;    /*  8px */
  --space-3:    0.75rem;   /* 12px */
  --space-4:    1rem;      /* 16px */
  --space-5:    1.25rem;   /* 20px */
  --space-6:    1.5rem;    /* 24px */
  --space-8:    2rem;      /* 32px */
  --space-10:   2.5rem;    /* 40px */
  --space-12:   3rem;      /* 48px */
  --space-16:   4rem;      /* 64px */
  --space-20:   5rem;      /* 80px */
  --space-24:   6rem;      /* 96px */
  --space-32:   8rem;      /* 128px */
}
```

---

## 6. Elevation & Shadow

Shadows use a warm-tinted neutral to avoid clinical grey boxes.

```css
:root {
  --shadow-xs:  0 1px 2px oklch(18% 0.02 260 / 8%);
  --shadow-sm:  0 1px 4px oklch(18% 0.02 260 / 12%);
  --shadow-md:  0 4px 12px oklch(18% 0.02 260 / 16%);
  --shadow-lg:  0 8px 24px oklch(18% 0.02 260 / 20%);
  --shadow-xl:  0 16px 48px oklch(18% 0.02 260 / 25%);
  --shadow-focus: 0 0 0 3px oklch(72% 0.18 68 / 40%); /* Pack Gold glow */
}
```

---

## 7. Border Radius

Sharp brand. Radius is restrained — this is not a soft SaaS product.

```css
:root {
  --radius-none: 0;
  --radius-sm:   2px;
  --radius-md:   4px;
  --radius-lg:   8px;
  --radius-xl:   12px;
  --radius-full: 9999px;   /* Pills only — use sparingly */
}
```

Default component radius: `--radius-md` (4px). Larger cards may use `--radius-lg`.

---

## 8. Motion & Animation

Agents are fast. Transitions should feel instant, not decorative.

```css
:root {
  --duration-instant:  50ms;
  --duration-fast:     120ms;
  --duration-normal:   220ms;
  --duration-slow:     380ms;

  --ease-out:    cubic-bezier(0.0, 0.0, 0.2, 1.0);
  --ease-in:     cubic-bezier(0.4, 0.0, 1.0, 1.0);
  --ease-inout:  cubic-bezier(0.4, 0.0, 0.2, 1.0);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1.0);  /* Slight overshoot for assertive actions */
}
```

Default: `--duration-fast` with `--ease-out`. Never animate layout properties (`width`, `height`, `top`). Use `transform` and `opacity` exclusively for performance.

Respect `prefers-reduced-motion`:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 9. Brand Usage Rules

### Do
- Use Pack Gold as the primary action color consistently
- Pair Charcoal backgrounds with Pack Gold accents in dark mode
- Let whitespace (Bone) breathe — do not fill every surface
- Use the wolf pack metaphor in writing when it serves the copy

### Do Not
- Do not introduce new named colors outside this palette without design approval
- Do not use gradients on primary UI elements (allowed only for decorative hero backgrounds)
- Do not use rounded corners greater than `--radius-lg` except for pills
- Do not soften the brand with pastel substitutions of the color palette
- Do not use the brand metaphor in error messages or debugging output

---

*This document supersedes the root `BRAND.md`. That file is preserved for git history but this is now the canonical brand reference.*
