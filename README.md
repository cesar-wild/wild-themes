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

## Project Structure

```
wild-themes/
├── themes/                  # Individual theme packages
│   ├── _template/           # Starter template — copy to create a new theme
│   ├── wolf-dark/           # Deep forest dark theme, amber accent
│   └── ember/               # Forge-dark theme, burning orange accent
├── plugins/                 # Paperclip plugins (future)
├── scripts/
│   ├── deploy.sh            # Deploy a theme to staging
│   └── validate.sh          # Validate theme manifest + CSS
├── docs/
│   ├── brand/               # Wild Agents brand artifacts
│   │   ├── BRAND.md
│   │   └── SIGNATURE.md
│   ├── marketing/           # Marketing copy and campaign docs
│   ├── strategy/            # Strategic planning docs
│   └── technical/           # Engineering and workflow docs
│       └── dev-workflow.md
├── .gitignore
└── README.md
```

---

## Quickstart

### Prerequisites

- Node.js 18+
- `gh` CLI authenticated as `cesar-wild`
- Access to staging Paperclip: `http://5.223.73.101:8080`

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

This uploads the theme to the Paperclip staging instance at `http://5.223.73.101:8080` via the plugin API.

---

## Contributing

1. Create a feature branch from `main`: `git checkout -b theme/<name>`
2. Develop and validate your theme locally.
3. Open a Pull Request — at least one pack member review is required before merge.
4. Direct pushes to `main` are disabled.

See [docs/technical/dev-workflow.md](docs/technical/dev-workflow.md) for the full workflow.

---

**Wild Agents. Forged to ship. Built to last.**
