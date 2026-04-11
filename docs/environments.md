# Wild Agents — Environment Guide

## Overview

Wild Agents runs two Paperclip instances on server `5.223.73.101`. They are **separate environments** with distinct purposes. Never mix them up.

| Environment     | Port | Container Name          | Purpose                    |
| --------------- | ---- | ----------------------- | -------------------------- |
| Orchestration   | 8080 | paperclip-orchestration | Company operations         |
| Dev             | 8081 | paperclip-dev           | Theme/plugin testing       |

---

## Orchestration (:8080)

- **URL:** `http://5.223.73.101:8080`
- **Container:** `paperclip-orchestration`
- **This is where Wild Agents agents live and work.**
- All agent heartbeats, task management, and company operations run here.
- **NEVER** install experimental themes or plugins on this instance.
- If it breaks, the whole company goes dark. Protect it.

## Dev (:8081)

- **URL:** `http://5.223.73.101:8081`
- **Container:** `paperclip-dev`
- **This is the testing ground.**
- All theme and plugin builds are deployed here first.
- QA (Vigia) reviews work here before anything is considered ready.
- This instance is **expendable**. If it breaks, rebuild from the same image.
- Image: `paperclipai/paperclip:lab`

---

## Docker Compose

File on host: `/opt/paperclip/docker-compose.yml`

```yaml
services:
  paperclip-orchestration:
    image: paperclipai/paperclip:lab
    container_name: paperclip-orchestration
    restart: unless-stopped
    ports:
      - "8080:3000"
    # ... volumes, env vars

  paperclip-dev:
    image: paperclipai/paperclip:lab
    container_name: paperclip-dev
    restart: unless-stopped
    ports:
      - "8081:3000"
    # ... volumes, env vars
```

> To apply changes: `ssh root@5.223.73.101` → `cd /opt/paperclip && docker compose up -d`

---

## Development Rules (Non-Negotiable)

1. **Code lives in GitHub** (`cesar-wild/wild-themes`).
2. **Build** in your agent workspace or locally.
3. **Deploy to dev (:8081)** for testing — use `bash scripts/deploy.sh themes/<name>`.
4. **QA reviews on dev** — Vigia signs off before anything is merged.
5. **Only after QA approval** is a theme considered ready for release.
6. **Never deploy to orchestration (:8080).** Not ever. Not for "just a quick test."

---

## gh CLI Authentication

The `gh` CLI is authenticated as `cesar-wild` on the orchestration container.

For the dev container (:8081), run:
```bash
docker exec -it paperclip-dev gh auth login
```
Or via SSH on the host: authenticate inside the container for repo access.

---

## Rebuilding Dev

If the dev instance breaks:
```bash
ssh root@5.223.73.101
cd /opt/paperclip
docker compose stop paperclip-dev
docker compose rm -f paperclip-dev
docker compose pull paperclip-dev
docker compose up -d paperclip-dev
```

Then re-bootstrap via the Paperclip onboarding flow at `http://5.223.73.101:8081`.
