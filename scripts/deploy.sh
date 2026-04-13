#!/usr/bin/env bash
# deploy.sh — Deploy a Wild Agents theme to the dev Paperclip instance (:8081)
# Usage: bash scripts/deploy.sh themes/<theme-name>
# Env vars: PAPERCLIP_DEV_URL (default: http://5.223.73.101:8081), PAPERCLIP_DEV_API_KEY

set -euo pipefail

THEME_DIR="${1:-}"
DEV_URL="${PAPERCLIP_DEV_URL:-http://5.223.73.101:8081}"
API_KEY="${PAPERCLIP_DEV_API_KEY:-}"

if [ -z "$THEME_DIR" ]; then
  echo "Usage: $0 themes/<theme-name>"
  exit 1
fi

if [ ! -d "$THEME_DIR" ]; then
  echo "Error: directory '$THEME_DIR' not found"
  exit 1
fi

if [ -z "$API_KEY" ]; then
  echo "Error: PAPERCLIP_DEV_API_KEY is not set."
  echo "Set it to a board-level API key for the dev instance at $DEV_URL"
  exit 1
fi

# Run validation first
bash "$(dirname "$0")/validate.sh" "$THEME_DIR"

THEME_DIR_ABS="$(cd "$THEME_DIR" && pwd)"

echo "Deploying theme '$(basename "$THEME_DIR_ABS")' to $DEV_URL ..."

npx paperclipai plugin install \
  --local \
  --api-base "$DEV_URL" \
  --api-key "$API_KEY" \
  "$THEME_DIR_ABS"

echo "Deploy complete. Preview: $DEV_URL"
