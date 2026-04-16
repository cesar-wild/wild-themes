# @wild-agents/plugin-reading-time

Estimated reading time for the current note or issue in Paperclip.

## What it does

Adds a **Reading Time** panel to the sidebar. Calculates an estimated read time
at 200 words per minute — the standard adult reading speed.

Shows:
- Estimated read time (e.g. `~3 min`)
- Word count
- Quick read / long read label

## Installation

```bash
npx paperclipai plugin install --local --api-base <url> --api-key <key> /path/to/plugins/reading-time
```

## Development

```bash
npm install
npm run build
```

## Config options

| Option | Default | Description |
|---|---|---|
| `wpm` | `200` | Words per minute (reading speed) |

## OKLCH tokens

| Element | Token |
|---|---|
| Time display | `--color-accent-{l,c,h}` |
| Labels | `--color-text-secondary-{l,c,h}` |
| Panel text | `--color-text-primary-{l,c,h}` |
