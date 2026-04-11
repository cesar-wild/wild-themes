#!/usr/bin/env bash
# validate.sh — Validate a Wild Agents theme before deploy
# Usage: bash scripts/validate.sh themes/<theme-name>

set -euo pipefail

THEME_DIR="${1:-}"

if [ -z "$THEME_DIR" ]; then
  echo "Usage: $0 themes/<theme-name>"
  exit 1
fi

if [ ! -d "$THEME_DIR" ]; then
  echo "Error: directory '$THEME_DIR' not found"
  exit 1
fi

echo "Validating theme: $THEME_DIR"

# Check required files
for f in theme.json index.css; do
  if [ ! -f "$THEME_DIR/$f" ]; then
    echo "Error: missing required file '$THEME_DIR/$f'"
    exit 1
  fi
done

# Validate theme.json has required fields
REQUIRED_FIELDS=(id name description version author)
for field in "${REQUIRED_FIELDS[@]}"; do
  if ! python3 -c "import json,sys; d=json.load(open('$THEME_DIR/theme.json')); assert '$field' in d, '$field missing'" 2>/dev/null; then
    echo "Error: theme.json missing required field '$field'"
    exit 1
  fi
done

echo "theme.json: OK"
echo "index.css:  found"
echo "Validation passed."
