# Wild Agents — Design System

> Version 1.0 — April 2026 | Authored by Trazo (Creative Director)
>
> For color tokens and typography tokens, see [brand-guidelines.md](./brand-guidelines.md).
> This document covers the component pattern layer: tokens → components → composition rules.

---

## 1. Design Token Architecture

Tokens follow a three-tier model: **primitive → semantic → component**.

```
primitive tokens  →  semantic tokens  →  component tokens
(raw values)         (role-based)         (scoped to component)

oklch(72% 0.18 68)  →  --color-primary  →  --btn-bg-primary
```

**Rules:**
- Components consume semantic tokens, never primitive OKLCH values directly.
- Semantic tokens are set per-theme (`:root` for light, `[data-theme="dark"]` for dark).
- Component tokens are optional overrides scoped to their component namespace.
- Never hard-code hex or rgb in component CSS. Always use a token.

---

## 2. CSS Custom Property Naming Convention

```
--{namespace}-{property}-{variant}-{state}
```

| Segment | Purpose | Examples |
|---|---|---|
| namespace | token tier or component | `color`, `font`, `space`, `btn`, `badge`, `input` |
| property | what is being set | `bg`, `fg`, `border`, `radius`, `size`, `shadow` |
| variant | semantic role or scale step | `primary`, `secondary`, `error`, `sm`, `lg` |
| state | interactive state (optional) | `hover`, `active`, `focus`, `disabled` |

**Examples:**
```css
--color-bg-base             /* semantic: base background */
--color-primary-hover       /* semantic: primary brand, hover state */
--btn-bg-primary            /* component: button primary background */
--btn-bg-primary-hover      /* component: button primary background, hover */
--input-border-focus        /* component: input border on focus */
--badge-fg-error            /* component: error badge foreground */
```

**Casing:** always `kebab-case`. No camelCase, no underscores.

---

## 3. Component Patterns

### 3.1 Button

Buttons are the primary action surface. Three variants: `primary`, `secondary`, `ghost`.

#### Token Definitions

```css
/* --- Button Base --- */
.btn {
  --btn-font-size:        var(--font-size-sm);
  --btn-font-weight:      600;
  --btn-letter-spacing:   var(--letter-spacing-wide);
  --btn-line-height:      1;
  --btn-radius:           var(--radius-md);
  --btn-transition:       var(--duration-fast) var(--ease-out);

  /* size: md (default) */
  --btn-padding-y:        var(--space-2);   /*  8px */
  --btn-padding-x:        var(--space-4);   /* 16px */
  --btn-height:           2.25rem;          /* 36px */

  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--btn-padding-y) var(--btn-padding-x);
  height: var(--btn-height);
  font-size: var(--btn-font-size);
  font-weight: var(--btn-font-weight);
  letter-spacing: var(--btn-letter-spacing);
  line-height: var(--btn-line-height);
  border-radius: var(--btn-radius);
  border: 1.5px solid transparent;
  cursor: pointer;
  text-transform: uppercase;
  transition:
    background-color var(--btn-transition),
    border-color var(--btn-transition),
    color var(--btn-transition),
    box-shadow var(--btn-transition);
}

.btn:focus-visible {
  outline: none;
  box-shadow: var(--shadow-focus);
}

.btn:disabled,
.btn[aria-disabled="true"] {
  opacity: 0.45;
  cursor: not-allowed;
  pointer-events: none;
}

/* --- Primary --- */
.btn-primary {
  --btn-bg:               var(--color-primary);
  --btn-bg-hover:         var(--color-primary-hover);
  --btn-bg-active:        var(--color-primary-active);
  --btn-fg:               var(--color-fg-inverse);
  --btn-border:           transparent;

  background-color: var(--btn-bg);
  color: var(--btn-fg);
  border-color: var(--btn-border);
}
.btn-primary:hover  { background-color: var(--btn-bg-hover); }
.btn-primary:active { background-color: var(--btn-bg-active); }

/* --- Secondary --- */
.btn-secondary {
  --btn-bg:               transparent;
  --btn-bg-hover:         var(--color-primary-subtle);
  --btn-fg:               var(--color-primary);
  --btn-border:           var(--color-primary);

  background-color: var(--btn-bg);
  color: var(--btn-fg);
  border-color: var(--btn-border);
}
.btn-secondary:hover { background-color: var(--btn-bg-hover); }

/* --- Ghost --- */
.btn-ghost {
  --btn-bg:               transparent;
  --btn-bg-hover:         var(--color-bg-elevated);
  --btn-fg:               var(--color-fg-muted);
  --btn-border:           transparent;

  background-color: var(--btn-bg);
  color: var(--btn-fg);
}
.btn-ghost:hover { background-color: var(--btn-bg-hover); color: var(--color-fg-base); }

/* --- Destructive --- */
.btn-destructive {
  --btn-bg:               var(--color-error);
  --btn-bg-hover:         oklch(from var(--color-error) calc(l - 0.05) c h);
  --btn-fg:               var(--color-fg-inverse);

  background-color: var(--btn-bg);
  color: var(--btn-fg);
}

/* --- Sizes --- */
.btn-sm {
  --btn-font-size:  var(--font-size-xs);
  --btn-padding-y:  var(--space-1);
  --btn-padding-x:  var(--space-3);
  --btn-height:     1.75rem;
}

.btn-lg {
  --btn-font-size:  var(--font-size-base);
  --btn-padding-y:  var(--space-3);
  --btn-padding-x:  var(--space-6);
  --btn-height:     2.75rem;
}

/* --- Icon-only --- */
.btn-icon {
  --btn-padding-x: var(--btn-padding-y);
  width: var(--btn-height);
  justify-content: center;
}
```

#### States Summary

| State | Visual Change |
|---|---|
| Default | Brand color fill |
| Hover | Darker fill (`-hover` token) |
| Active | Darkest fill (`-active` token) |
| Focus-visible | Pack Gold glow ring (3px, 40% opacity) |
| Disabled | 45% opacity, no pointer events |
| Loading | Icon replaced with spinner, pointer-events none |

---

### 3.2 Badge / Label

Small inline status indicators. Not interactive.

```css
.badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  padding: 0.1em var(--space-2);
  font-size: var(--font-size-xs);
  font-weight: 600;
  letter-spacing: var(--letter-spacing-wide);
  text-transform: uppercase;
  border-radius: var(--radius-sm);
  line-height: 1.4;
}

.badge-success  { background: var(--color-success-subtle);  color: var(--color-success); }
.badge-error    { background: var(--color-error-subtle);    color: var(--color-error); }
.badge-warning  { background: var(--color-warning-subtle);  color: var(--color-warning); }
.badge-info     { background: var(--color-info-subtle);     color: var(--color-info); }
.badge-neutral  { background: var(--color-bg-sunken);       color: var(--color-fg-muted); }
.badge-primary  { background: var(--color-primary-subtle);  color: var(--color-primary-active); }
```

---

### 3.3 Input / Textarea

```css
.input {
  --input-bg:              var(--color-bg-elevated);
  --input-bg-focus:        var(--color-bg-elevated);
  --input-fg:              var(--color-fg-base);
  --input-placeholder-fg:  var(--color-fg-subtle);
  --input-border:          var(--color-border);
  --input-border-hover:    var(--color-border-strong);
  --input-border-focus:    var(--color-border-focus);
  --input-border-error:    var(--color-error);
  --input-radius:          var(--radius-md);
  --input-height:          2.25rem;
  --input-padding-x:       var(--space-3);
  --input-font-size:       var(--font-size-base);

  display: block;
  width: 100%;
  height: var(--input-height);
  padding: 0 var(--input-padding-x);
  background-color: var(--input-bg);
  color: var(--input-fg);
  border: 1.5px solid var(--input-border);
  border-radius: var(--input-radius);
  font-size: var(--input-font-size);
  font-family: inherit;
  transition: border-color var(--duration-fast) var(--ease-out),
              box-shadow var(--duration-fast) var(--ease-out);
}

.input::placeholder { color: var(--input-placeholder-fg); }
.input:hover  { border-color: var(--input-border-hover); }
.input:focus  {
  outline: none;
  border-color: var(--input-border-focus);
  box-shadow: var(--shadow-focus);
}
.input[aria-invalid="true"] { border-color: var(--input-border-error); }
.input:disabled { opacity: 0.45; cursor: not-allowed; }

textarea.input {
  height: auto;
  padding: var(--space-2) var(--input-padding-x);
  resize: vertical;
  min-height: 5rem;
}
```

---

### 3.4 Card

Content container. Two elevations: `card-base` (flush, bordered) and `card-elevated` (shadow).

```css
.card {
  --card-bg:          var(--color-bg-elevated);
  --card-border:      var(--color-border);
  --card-radius:      var(--radius-lg);
  --card-padding:     var(--space-6);
  --card-shadow:      none;

  background-color: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: var(--card-radius);
  padding: var(--card-padding);
  box-shadow: var(--card-shadow);
}

.card-elevated {
  --card-border:  transparent;
  --card-shadow:  var(--shadow-md);
}

.card-interactive {
  cursor: pointer;
  transition: box-shadow var(--duration-fast) var(--ease-out),
              transform var(--duration-fast) var(--ease-out);
}
.card-interactive:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-1px);
}
.card-interactive:active {
  transform: translateY(0);
  box-shadow: var(--shadow-sm);
}
```

---

### 3.5 Code Block

Pack is code-first. Code blocks are first-class UI, not afterthoughts.

```css
.code-block {
  --code-bg:        var(--color-bg-sunken);
  --code-fg:        var(--color-fg-base);
  --code-border:    var(--color-border);
  --code-font:      'JetBrains Mono', 'Fira Code', monospace;
  --code-font-size: var(--font-size-sm);

  background-color: var(--code-bg);
  color: var(--code-fg);
  border: 1px solid var(--code-border);
  border-radius: var(--radius-md);
  padding: var(--space-4) var(--space-5);
  font-family: var(--code-font);
  font-size: var(--code-font-size);
  line-height: 1.6;
  overflow-x: auto;
  tab-size: 2;
}

/* Inline code */
code:not(.code-block code) {
  background-color: var(--color-bg-sunken);
  color: var(--color-accent);
  font-family: var(--code-font);
  font-size: 0.875em;
  padding: 0.1em 0.35em;
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-border);
}
```

#### Syntax Highlight Token Roles (for integrators)

```css
[data-theme] {
  --syntax-comment:    var(--color-fg-subtle);
  --syntax-keyword:    var(--color-accent);          /* Blood Ember */
  --syntax-string:     var(--color-success);
  --syntax-number:     oklch(68% 0.15 280);          /* Muted purple */
  --syntax-function:   var(--color-primary);         /* Pack Gold */
  --syntax-type:       oklch(60% 0.12 200);          /* Teal */
  --syntax-operator:   var(--color-fg-muted);
  --syntax-punctuation:var(--color-fg-muted);
}
```

---

### 3.6 Notification / Toast

```css
.toast {
  --toast-bg:       var(--color-bg-elevated);
  --toast-border:   var(--color-border);
  --toast-radius:   var(--radius-lg);
  --toast-shadow:   var(--shadow-xl);

  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  padding: var(--space-4) var(--space-5);
  background-color: var(--toast-bg);
  border: 1px solid var(--toast-border);
  border-radius: var(--toast-radius);
  box-shadow: var(--toast-shadow);
  min-width: 280px;
  max-width: 420px;
}

/* Left accent stripe */
.toast::before {
  content: '';
  display: block;
  width: 3px;
  border-radius: 2px;
  align-self: stretch;
  flex-shrink: 0;
}

.toast-success::before { background: var(--color-success); }
.toast-error::before   { background: var(--color-error); }
.toast-warning::before { background: var(--color-warning); }
.toast-info::before    { background: var(--color-info); }
```

---

## 4. Layout Tokens

```css
:root {
  /* Container widths */
  --container-sm:    640px;
  --container-md:    768px;
  --container-lg:    1024px;
  --container-xl:    1280px;
  --container-2xl:   1536px;

  /* Z-index scale */
  --z-base:      0;
  --z-raised:    10;
  --z-dropdown:  100;
  --z-sticky:    200;
  --z-overlay:   300;
  --z-modal:     400;
  --z-toast:     500;
  --z-tooltip:   600;
}
```

---

## 5. Paperclip Theme Variable Mapping

When building Paperclip themes, these CSS variables map to the plugin SDK's theming surface. The SDK consumes `--pp-*` prefixed tokens. Override them in your theme file:

```css
/* Example: wild-pack-dark theme override */
:root {
  /* Map brand tokens to Paperclip SDK tokens */
  --pp-color-bg-primary:       var(--color-bg-base);
  --pp-color-bg-secondary:     var(--color-bg-elevated);
  --pp-color-bg-tertiary:      var(--color-bg-sunken);

  --pp-color-text-primary:     var(--color-fg-base);
  --pp-color-text-secondary:   var(--color-fg-muted);
  --pp-color-text-placeholder: var(--color-fg-subtle);

  --pp-color-accent:           var(--color-primary);
  --pp-color-accent-hover:     var(--color-primary-hover);

  --pp-color-success:          var(--color-success);
  --pp-color-warning:          var(--color-warning);
  --pp-color-error:            var(--color-error);

  --pp-color-border:           var(--color-border);
  --pp-color-border-strong:    var(--color-border-strong);
  --pp-color-focus-ring:       var(--color-border-focus);

  --pp-font-sans:              'Inter Variable', 'Inter', system-ui, sans-serif;
  --pp-font-mono:              'JetBrains Mono', 'Fira Code', monospace;

  --pp-radius-sm:              var(--radius-sm);
  --pp-radius-md:              var(--radius-md);
  --pp-radius-lg:              var(--radius-lg);

  --pp-shadow-sm:              var(--shadow-sm);
  --pp-shadow-md:              var(--shadow-md);
  --pp-shadow-lg:              var(--shadow-lg);
}
```

> **Note for Forja:** The `--pp-*` prefix convention should be confirmed against the current SDK version. This mapping is based on the expected surface from the plugin SDK alpha. Adjust key names if the SDK uses a different prefix or flat structure.

---

## 6. Component Checklist (Design → Implementation)

Before marking any component implementation as done, Trazo + Forja verify:

- [ ] All colors use semantic tokens (no raw OKLCH or hex)
- [ ] Light and dark theme both render correctly
- [ ] Focus visible state has a visible ring (Pack Gold glow)
- [ ] Disabled state uses 45% opacity + `cursor: not-allowed`
- [ ] Contrast ratio ≥ 4.5:1 for normal text, ≥ 3:1 for large text (WCAG AA)
- [ ] `prefers-reduced-motion` respected — no forced animation
- [ ] Transitions use `transform`/`opacity` only (not layout properties)
- [ ] Component uses `--component-*` scoped tokens for internal values
- [ ] Responsive behavior documented or not applicable

---

## 7. Theme File Structure

Each Paperclip theme package should follow this structure:

```
themes/
  wild-pack-dark/
    index.css          ← Entry: imports tokens, then component overrides
    tokens.css         ← All CSS custom properties (semantic layer)
    components.css     ← Component-scoped overrides
    README.md          ← Theme name, preview, token list
  wild-pack-light/
    ...
```

The `index.css` must apply tokens on `:root` and component classes, not on arbitrary selectors, so the theme composes cleanly with Paperclip's plugin runtime.

---

*Reference: [brand-guidelines.md](./brand-guidelines.md) for the full color and typography token definitions.*
