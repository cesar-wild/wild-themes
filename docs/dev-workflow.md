# Wild Themes — Development Workflow

This document describes how Wild Agents engineers develop, test, and ship Paperclip themes and plugins.

---

## Environment Layout

| Environment     | URL                           | Purpose                                              |
| --------------- | ----------------------------- | ---------------------------------------------------- |
| **Orchestration** | `http://5.223.73.101:8080` | Where Wild Agents lives and works. **NEVER** deploy experimental themes/plugins here. |
| **Dev**         | `http://5.223.73.101:8081`   | Testing ground for themes and plugins. Expendable — rebuild if it breaks. |

> **Rule:** All theme and plugin testing happens on **dev (:8081)**. The orchestration instance (:8080) is off-limits for experiments.

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

```
code (local/workspace) → validate → deploy to dev (:8081) → QA review → merge to main
```

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

### 4. Deploy to dev

```bash
bash scripts/deploy.sh themes/<your-theme-name>
```

This uploads the theme to the **dev instance** at `:8081`. You can preview it immediately at `http://5.223.73.101:8081`.

Set env vars before deploying:
```bash
export PAPERCLIP_DEV_URL=http://5.223.73.101:8081
export PAPERCLIP_DEV_API_KEY=<your-dev-api-key>
```

### 5. QA review on dev

Tag Vigia to review the theme on `http://5.223.73.101:8081`. QA approval is required before the PR can merge.

### 6. Open a Pull Request

```bash
git add themes/<your-theme-name>
git commit -m "feat(theme): add <your-theme-name>

Co-Authored-By: Paperclip <noreply@paperclip.ing>"
git push origin theme/<your-theme-name>
gh pr create --title "feat(theme): <your-theme-name>" --body "Preview: http://5.223.73.101:8081"
```

**Branch protection rules on `main`:**
- At least 1 review required before merge
- No direct pushes to `main`
- Status checks must pass (validate script)

### 7. After merge

Redeploy to dev to confirm the merged version is clean. Orchestration (:8080) is **not** a deployment target.

---

## Deploying Existing Themes

To redeploy any theme already in the repo:

```bash
bash scripts/deploy.sh themes/<theme-name>
```

---

## Environment Reference

| Property         | Orchestration (:8080)              | Dev (:8081)                        |
| ---------------- | ---------------------------------- | ---------------------------------- |
| Purpose          | Company operations                 | Theme/plugin testing               |
| Deploy themes?   | **NO — never**                    | Yes                                |
| Deploy plugins?  | **NO — never**                    | Yes                                |
| Expendable?      | No — protect at all costs          | Yes — rebuild if broken            |
| Env var          | —                                  | `PAPERCLIP_DEV_URL`                |
| API key var      | —                                  | `PAPERCLIP_DEV_API_KEY`            |

---

## Conventions

- **Theme IDs** must be lowercase, hyphen-separated (e.g., `wolf-dark`, `pack-light`).
- **Versions** follow semver (`1.0.0`).
- **Commit messages** follow [Conventional Commits](https://www.conventionalcommits.org/): `feat(theme):`, `fix(theme):`, `docs:`, etc.
- All commits must include `Co-Authored-By: Paperclip <noreply@paperclip.ing>`.
- PRs require at least 1 review from a pack member before merging to `main`.

---

**Wild Agents. Forged to ship. Built to last.**
