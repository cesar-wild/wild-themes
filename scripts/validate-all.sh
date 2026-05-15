#!/usr/bin/env bash
# validate-all.sh — Validate all Wild Agents themes
# Usage: bash scripts/validate-all.sh

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
THEMES_DIR="$(cd "$SCRIPT_DIR/../themes" && pwd)"

PASS=0
FAIL=0
ERRORS=()

for theme_dir in "$THEMES_DIR"/*/; do
  name="$(basename "$theme_dir")"
  [ "$name" = "_template" ] && continue

  if bash "$SCRIPT_DIR/validate.sh" "$theme_dir" > /dev/null 2>&1; then
    PASS=$((PASS + 1))
  else
    FAIL=$((FAIL + 1))
    ERRORS+=("$name")
    # Show the actual error
    bash "$SCRIPT_DIR/validate.sh" "$theme_dir" 2>&1 | tail -3 | sed "s/^/  $name: /"
  fi
done

TOTAL=$((PASS + FAIL))
echo "Validated $TOTAL themes: $PASS passed, $FAIL failed"

if [ "${#ERRORS[@]}" -gt 0 ]; then
  echo "Failed themes: ${ERRORS[*]}"
  exit 1
fi
