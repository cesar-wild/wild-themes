#!/usr/bin/env bash
# deploy.sh — Deploy a Wild Agents theme to the dev Paperclip instance (:8081)
# Usage: bash scripts/deploy.sh themes/<theme-name>
#
# Environment:
#   PAPERCLIP_DEV_URL      — dev instance URL (default: http://5.223.73.101:8081)
#   PAPERCLIP_DEV_API_KEY  — API key for the dev instance
#
# IMPORTANT: This deploys to DEV (:8081) only. Never deploy experimental
# themes to the orchestration instance (:8080).

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

# Run validation first
bash "$(dirname "$0")/validate.sh" "$THEME_DIR"

THEME_ID=$(python3 -c "import json; print(json.load(open('$THEME_DIR/theme.json'))['id'])")

echo "Deploying theme '$THEME_ID' to dev instance ($DEV_URL) ..."

# Package the theme as a tarball
TMPDIR=$(mktemp -d)
TARBALL="$TMPDIR/$THEME_ID.tar.gz"
tar -czf "$TARBALL" -C "$(dirname "$THEME_DIR")" "$(basename "$THEME_DIR")"

# Upload to dev plugin API
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" \
  -X POST "$DEV_URL/api/plugins/upload" \
  -F "file=@$TARBALL" \
  -F "id=$THEME_ID" \
  ${API_KEY:+-H "Authorization: Bearer $API_KEY"})

rm -rf "$TMPDIR"

if [ "$HTTP_STATUS" -ge 200 ] && [ "$HTTP_STATUS" -lt 300 ]; then
  echo "Deploy successful (HTTP $HTTP_STATUS)."
  echo "Preview: $DEV_URL"
else
  echo "Deploy failed with HTTP status $HTTP_STATUS."
  echo "Check that PAPERCLIP_DEV_API_KEY is set and the dev instance is reachable at $DEV_URL."
  exit 1
fi
