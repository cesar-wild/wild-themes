# Wild Themes — Development Workflow

This document describes how Wild Agents engineers develop, test, and ship Paperclip themes to staging.

---

## Overview

Paperclip themes are CSS files that override the platform's OKLCH design token variables. They are delivered as Paperclip plugins via the plugin SDK. The dev Paperclip instance at `http://5.223.73.101:8081` is our target deployment environment.

> **Warning:** Never deploy themes or plugins to the orchestration instance at `http://5.223.73.101:8080`. That instance runs company operations and is not expendable. All testing targets dev (`:8081`) only. Deploying to orchestration requires explicit board approval.

---

## Prerequisites

| Tool        | Version   | Notes                                      |
| ----------- | --------- | ------------------------------------------ |
| Node.js     | 18+       | Required for plugin SDK                    |
| npm / pnpm  | latest    | Package management                         |
| gh CLI      | latest    | Authenticated as `cesar-wild`              |
| git         | latest    | Branch workflow enforced via PR            |

---

## Theme Structure

Each theme lives in `themes/<theme-name>/`:

```
themes/my-theme/
├── theme.json      # Manifest: id, name, description, version, author
├── index.css       # OKLCH token overrides (the actual theme)
└── preview.png     # Optional screenshot for the theme gallery
```

### theme.json schema

```json
{
  "id": "my-theme",
  "name": "My Theme",
  "description": "A brief description of the theme's aesthetic.",
  "version": "1.0.0",
  "author": "Wild Agents",
  "tags": ["dark", "minimal"]
}
```

### index.css — OKLCH token overrides

Paperclip exposes design tokens as CSS custom properties. Themes override these in a `:root` block. Example:

```css
/*
 * my-theme — Wild Agents
 * Override Paperclip OKLCH design tokens.
 */

:root {
  /* Brand / accent color */
  --color-accent-l: 0.6;
  --color-accent-c: 0.2;
  --color-accent-h: 270;

  /* Surface colors */
  --color-surface-l: 0.12;
  --color-surface-c: 0.01;
  --color-surface-h: 240;

  /* Text colors */
  --color-text-primary-l: 0.95;
  --color-text-primary-c: 0.01;
  --color-text-primary-h: 240;

  /* Border */
  --color-border-l: 0.25;
  --color-border-c: 0.02;
  --color-border-h: 240;
}
```

> **Token reference:** Check the existing proof-of-concept themes on dev (`http://5.223.73.101:8081`) for the full list of available tokens.

---

## Development Workflow

### 1. Branch from main

```bash
git checkout main
git pull origin main
git checkout -b theme/<your-theme-name>
```

### 2. Create or edit your theme

```bash
mkdir -p themes/<your-theme-name>
# Create theme.json and index.css
```

### 3. Validate locally

```bash
bash scripts/validate.sh themes/<your-theme-name>
```

This checks:
- `theme.json` is valid and has required fields
- `index.css` parses without errors
- No disallowed properties (e.g., `!important` on system tokens)

### 4. Deploy to staging

```bash
bash scripts/deploy.sh themes/<your-theme-name>
```

This uploads the theme to the Paperclip staging API. You can preview it immediately at `http://5.223.73.101:8081`.

### 5. Open a Pull Request

```bash
git add themes/<your-theme-name>
git commit -m "feat(theme): add <your-theme-name>

Co-Authored-By: Paperclip <noreply@paperclip.ing>"
git push origin theme/<your-theme-name>
gh pr create --title "feat(theme): <your-theme-name>" --body "Preview: [staging link]"
```

**Branch protection rules on `main`:**
- At least 1 review required before merge
- No direct pushes to `main`
- Status checks must pass (validate script)

### 6. After merge

The CI/CD pipeline (or a manual deploy trigger) re-deploys to staging. Confirm the theme appears on the staging instance.

---

## Deploying Existing Themes

To redeploy any theme already in the repo:

```bash
bash scripts/deploy.sh themes/<theme-name>
```

---

## Staging Reference

- **Dev URL:** `http://5.223.73.101:8081`
- **Orchestration URL:** `http://5.223.73.101:8080` — **DO NOT deploy themes here**
- **Existing POC themes:** Browse the theme gallery on staging for the 6 proof-of-concept themes. These serve as visual and token references.

---

## Conventions

- **Theme IDs** must be lowercase, hyphen-separated (e.g., `wolf-dark`, `pack-light`).
- **Versions** follow semver (`1.0.0`).
- **Commit messages** follow [Conventional Commits](https://www.conventionalcommits.org/): `feat(theme):`, `fix(theme):`, `docs:`, etc.
- All commits must include `Co-Authored-By: Paperclip <noreply@paperclip.ing>`.
- PRs require at least 1 review from a pack member before merging to `main`.

---

**Wild Agents. Forged to ship. Built to last.**
