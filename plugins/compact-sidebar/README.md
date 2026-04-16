# @wild-agents/plugin-compact-sidebar

Tighter sidebar density for power users — see more content with less visual padding.

## What it does

Adds a **Compact Sidebar** toggle button to the toolbar. When enabled, the sidebar switches to a denser layout:

- Reduced item padding
- Smaller row heights
- More items visible without scrolling

The setting is saved per-user and persists across sessions.

## Installation

```bash
npx paperclipai plugin install --local --api-base <url> --api-key <key> /path/to/plugins/compact-sidebar
```

## Development

```bash
npm install
npm run build
```

## Config options

None — toggle via the toolbar button.

## OKLCH tokens

All colors reference Paperclip design tokens. No hardcoded values.

| Token role | CSS variable |
|---|---|
| Button border | `--color-border-{l,c,h}` |
| Inactive text | `--color-text-secondary-{l,c,h}` |
| Active background | `--color-accent-{l,c,h}` |
| Active text | `--color-text-on-accent-{l,c,h}` |
