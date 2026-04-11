#!/usr/bin/env bash
# deploy.sh — Deploy a Wild Agents theme to the staging Paperclip instance
# Usage: bash scripts/deploy.sh themes/<theme-name>

set -euo pipefail

THEME_DIR="${1:-}"
STAGING_URL="${PAPERCLIP_STAGING_URL:-http://5.223.73.101:8080}"
API_KEY="${PAPERCLIP_STAGING_API_KEY:-}"

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

echo "Deploying theme '$THEME_ID' to $STAGING_URL ..."

# Package the theme as a tarball
TMPDIR=$(mktemp -d)
TARBALL="$TMPDIR/$THEME_ID.tar.gz"
tar -czf "$TARBALL" -C "$(dirname "$THEME_DIR")" "$(basename "$THEME_DIR")"

AUTH_HEADER=""
if [ -n "$API_KEY" ]; then
  AUTH_HEADER="-H 'Authorization: Bearer $API_KEY'"
fi

# Upload to staging plugin API
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" \
  -X POST "$STAGING_URL/api/plugins/upload" \
  -F "file=@$TARBALL" \
  -F "id=$THEME_ID" \
  ${API_KEY:+-H "Authorization: Bearer $API_KEY"})

rm -rf "$TMPDIR"

if [ "$HTTP_STATUS" -ge 200 ] && [ "$HTTP_STATUS" -lt 300 ]; then
  echo "Deploy successful (HTTP $HTTP_STATUS)."
  echo "Preview: $STAGING_URL"
else
  echo "Deploy failed with HTTP status $HTTP_STATUS."
  echo "Check that PAPERCLIP_STAGING_API_KEY is set and the staging instance is reachable."
  exit 1
fi
