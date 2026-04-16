# @wild-agents/plugin-focus-mode

Toggle a distraction-free writing view in Paperclip.

## What it does

Adds a **Focus** toggle button to the global toolbar. When active, it signals
focus mode — the host can use this state to hide sidebars and toolbar chrome,
giving you a clean writing environment.

State is persisted per instance so focus mode survives page reloads.

## Installation

```bash
npx paperclipai plugin install --local --api-base <url> --api-key <key> /path/to/plugins/focus-mode
```

## Development

```bash
npm install
npm run build
```

## Config options

None — toggle via the toolbar button.

## OKLCH tokens

| State | Token |
|---|---|
| Active accent | `--color-accent-{l,c,h}` |
| Border | `--color-border-{l,c,h}` |
| Muted text | `--color-text-secondary-{l,c,h}` |
