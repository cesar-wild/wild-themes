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

# Check required OKLCH token groups
CSS_FILE="$THEME_DIR/index.css"
REQUIRED_TOKEN_GROUPS=(
  "--color-accent-"
  "--color-surface-"
  "--color-text-primary-"
  "--color-text-secondary-"
  "--color-border-"
)
TOKEN_ERRORS=0
for token in "${REQUIRED_TOKEN_GROUPS[@]}"; do
  if ! grep -qF -- "$token" "$CSS_FILE"; then
    echo "Error: index.css missing required token group '$token'"
    TOKEN_ERRORS=$((TOKEN_ERRORS + 1))
  fi
done
if [ "$TOKEN_ERRORS" -gt 0 ]; then
  exit 1
fi
echo "index.css:  OKLCH token groups OK"

# Warn on hardcoded hex or rgb colors (should use OKLCH tokens instead)
if grep -Eq '(#[0-9a-fA-F]{3,8}|rgb\(|rgba\()' "$CSS_FILE"; then
  echo "Warning: index.css contains hardcoded hex/rgb colors — use OKLCH tokens instead:"
  grep -En '(#[0-9a-fA-F]{3,8}|rgb\(|rgba\()' "$CSS_FILE" | sed 's/^/  /'
fi

echo "Validation passed."
