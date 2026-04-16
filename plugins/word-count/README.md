# @wild-agents/plugin-word-count

Live word and character count displayed in the Paperclip sidebar.

## What it does

Adds a **Word Count** panel to the sidebar showing:

- Word count
- Character count (with spaces)
- Character count (without spaces)

## Installation

```bash
npx paperclipai plugin install --local --api-base <url> --api-key <key> /path/to/plugins/word-count
```

## Development

```bash
npm install
npm run build
```

## Config options

None — the plugin is zero-configuration.

## OKLCH tokens

All colors reference Paperclip design tokens. No hardcoded values.

| Token role | CSS variable |
|---|---|
| Panel text | `--color-text-primary-{l,c,h}` |
| Secondary text | `--color-text-secondary-{l,c,h}` |
| Count values | `--color-accent-{l,c,h}` |
