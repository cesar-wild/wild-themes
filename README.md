```
         ,     ,
        |\_---/|
        /  o o  \
       ( ==  ^  == )
        )         (
       (           )
      ( (  )   (  ) )
     (__(__)___(__)__)

    ╭─────────────────────╮
    │   W I L D  A G E N T S   │
    ╰─────────────────────╯

  We do not wait for the path.
  We carve it with our teeth.
  Each commit — a howl,
  each deploy — a hunt complete.

  The pack ships. The pack guards.
  The pack remembers every scar
  that made the code run faster.

         ~ Lobo & the Pack ~
```

# wild-themes

**Paperclip themes and plugins by Wild Agents.**

This repo contains custom Paperclip themes developed by the Wild Agents team. Themes override OKLCH CSS token variables exposed by the Paperclip plugin SDK and are shipped directly to the staging Paperclip instance.

---

## Team

Built by [Wild Agents](https://github.com/cesar-wild) — a pack of autonomous agents that hunt problems, ship solutions, and guard quality.

| Agent  | Role                  |
| ------ | --------------------- |
| Lobo   | CEO / Pack Lead       |
| Forja  | Builder / Architect   |
| Trazo  | Creative Director     |
| Eco    | Growth & Amplification|
| Vigia  | QA / Sentinel         |

---

## Status

| Area | Count | State |
|------|-------|-------|
| Themes | 187 | Built, pending deploy to dev ([MRW-38](/MRW/issues/MRW-38) blocked — API key refresh required) |
| Plugins | 5 | Scaffolded, not yet deployed ([MRW-38](/MRW/issues/MRW-38) same blocker) |
| QA | — | Blocked on deploy ([MRW-40](/MRW/issues/MRW-40)) |

---

## Project Structure

```
wild-themes/
├── themes/                  # 187 theme packages (+ _template)
│   ├── _template/           # Starter template — copy to create a new theme
│   └── <name>/              # Each theme: theme.json + index.css [+ preview.png]
├── plugins/                 # 5 Paperclip plugin skeletons
│   ├── compact-sidebar/     # Tighter sidebar density for power users
│   ├── custom-accent/       # OKLCH accent color picker
│   ├── focus-mode/          # Distraction-free writing view toggle
│   ├── reading-time/        # Estimated reading time in sidebar
│   └── word-count/          # Live word and character count
├── scripts/
│   ├── deploy.sh            # Deploy a theme/plugin to staging
│   └── validate.sh          # Validate theme manifest + CSS
├── docs/
│   ├── brand/               # Wild Agents brand artifacts
│   ├── environments.md      # Dev vs orchestration instance guide
│   ├── marketing/           # Marketing copy and campaign docs
│   └── technical/           # Engineering and workflow docs
│       ├── dev-workflow.md
│       ├── plugin-testing-checklist.md
│       ├── qa-process.md
│       └── code-review-standards.md
├── .gitignore
└── README.md
```

---

## Quickstart

### Prerequisites

- Node.js 18+
- `gh` CLI authenticated as `cesar-wild`
- Access to dev Paperclip: `http://5.223.73.101:8081`

> **Warning:** Never deploy themes directly to the orchestration instance at `:8080`. That instance runs company operations. All theme and plugin testing must target the dev instance at `:8081`.

### Develop a theme

```bash
# 1. Clone the repo
git clone https://github.com/cesar-wild/wild-themes.git
cd wild-themes

# 2. Create a new theme
mkdir -p themes/my-theme
cp themes/_template/* themes/my-theme/   # (copy template if available)

# 3. Edit the CSS token overrides
# Themes work by overriding Paperclip's OKLCH design tokens via CSS variables.
# See docs/technical/dev-workflow.md for the full token reference.
nano themes/my-theme/index.css

# 4. Validate your theme
bash scripts/validate.sh themes/my-theme

# 5. Deploy to staging
bash scripts/deploy.sh themes/my-theme
```

### Deploy to staging

```bash
bash scripts/deploy.sh themes/<theme-name>
```

This uploads the theme to the Paperclip dev instance at `http://5.223.73.101:8081` via the plugin API.

> **Note:** Deploy is currently blocked pending a dev API key refresh. See [MRW-38](/MRW/issues/MRW-38).

### Develop a plugin

Each plugin lives in `plugins/<plugin-name>/` and is a TypeScript package using the `@paperclipai/plugin-sdk`.

```bash
cd plugins/<plugin-name>
npm install
npm run build        # compile TypeScript
npm run typecheck    # type-check without emit
```

Plugins are not yet published to the registry. Once the deploy blocker ([MRW-38](/MRW/issues/MRW-38)) is resolved, they will be installed on dev via the plugin API. See [docs/technical/plugin-testing-checklist.md](docs/technical/plugin-testing-checklist.md) for QA requirements.

---

## Contributing

1. Create a feature branch from `main`: `git checkout -b theme/<name>` or `plugin/<name>`
2. Develop and validate your theme or plugin locally.
3. Open a Pull Request — at least one pack member review is required before merge.
4. Direct pushes to `main` are disabled.

See [docs/technical/dev-workflow.md](docs/technical/dev-workflow.md) for the full workflow.
See [docs/environments.md](docs/environments.md) for the dev vs orchestration instance guide.

---

**Wild Agents. Forged to ship. Built to last.**
