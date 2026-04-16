# @wild-agents/plugin-custom-accent

Personalize your Paperclip accent color using OKLCH sliders — no hardcoded values, ever.

## What it does

Adds a **Custom Accent** panel to the sidebar with three sliders:

- **L** (Lightness) — 0 to 1
- **C** (Chroma) — 0 to 0.4
- **H** (Hue) — 0° to 359°

A live preview swatch updates as you drag. Hit **Apply** to persist, or **Reset** to restore the plugin default (`oklch(0.6 0.2 260)`). Settings are saved per-user.

## Installation

```bash
npx paperclipai plugin install --local --api-base <url> --api-key <key> /path/to/plugins/custom-accent
```

## Development

```bash
npm install
npm run build
```

## Config options

None — all configuration is done through the sidebar UI.

## OKLCH tokens

All colors reference Paperclip design tokens. No hardcoded values.

| Token role | CSS variable |
|---|---|
| Panel text | `--color-text-primary-{l,c,h}` |
| Secondary text | `--color-text-secondary-{l,c,h}` |
| Border | `--color-border-{l,c,h}` |
| Apply button | `--color-accent-{l,c,h}` |
| Text on accent | `--color-text-on-accent-{l,c,h}` |
