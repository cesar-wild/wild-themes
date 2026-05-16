#!/usr/bin/env bash
# deploy-all.sh — Batch deploy all Wild Agents themes to the dev Paperclip instance (:8081)
#
# Usage:
#   PAPERCLIP_DEV_API_KEY=<key> bash scripts/deploy-all.sh
#
# Env vars:
#   PAPERCLIP_DEV_URL    (default: http://5.223.73.101:8081)
#   PAPERCLIP_DEV_API_KEY (required)
#   DEPLOY_MODE          "github" (default) | "local" | "npm"
#                        github: install from GitHub Release tarballs (no npm creds needed — RECOMMENDED)
#                        local: install from this filesystem (blocked by filesystem isolation in agent containers)
#                        npm: install from npm registry (requires packages published as @wild-agents/theme-*)
#   GITHUB_RELEASE_BASE  tarball base URL (default: GitHub v1.0.0 release)
#
# Deploy modes:
#   github — downloads tarballs from https://github.com/cesar-wild/wild-themes/releases/download/v1.0.0/
#            No npm credentials needed. Public URLs. RECOMMENDED.
#   local  — uses paperclipai plugin install --local (blocked by filesystem isolation in agent containers)
#   npm    — uses paperclipai plugin install @wild-agents/theme-<name> (requires npm publish first)

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
THEMES_DIR="$REPO_DIR/themes"

DEV_URL="${PAPERCLIP_DEV_URL:-http://5.223.73.101:8081}"
API_KEY="${PAPERCLIP_DEV_API_KEY:-}"
DEPLOY_MODE="${DEPLOY_MODE:-github}"
GITHUB_RELEASE_BASE="${GITHUB_RELEASE_BASE:-https://github.com/cesar-wild/wild-themes/releases/download/v1.0.0}"

PCLI="$(npx --no-install paperclipai 2>/dev/null || npx paperclipai)"

if [ -z "$API_KEY" ]; then
  echo "Error: PAPERCLIP_DEV_API_KEY is not set."
  echo "Set it to a board-level API key for the dev instance at $DEV_URL"
  exit 1
fi

# Gather themes
THEMES=()
while IFS= read -r -d '' d; do
  name="$(basename "$d")"
  [ "$name" = "_template" ] && continue
  THEMES+=("$name")
done < <(find "$THEMES_DIR" -mindepth 1 -maxdepth 1 -type d -print0 | sort -z)

TOTAL="${#THEMES[@]}"
echo "=== Wild Agents Batch Deploy ==="
echo "Mode:   $DEPLOY_MODE"
echo "Target: $DEV_URL"
echo "Themes: $TOTAL"
echo "================================"

PASS=0
FAIL=0
ERRORS=()

for theme in "${THEMES[@]}"; do
  THEME_DIR="$THEMES_DIR/$theme"

  echo -n "[$((PASS + FAIL + 1))/$TOTAL] $theme ... "

  # Validate first
  if ! bash "$SCRIPT_DIR/validate.sh" "$THEME_DIR" > /dev/null 2>&1; then
    echo "SKIP (validation failed)"
    FAIL=$((FAIL + 1))
    ERRORS+=("$theme: validation failed")
    continue
  fi

  if [ "$DEPLOY_MODE" = "github" ]; then
    TARBALL_URL="${GITHUB_RELEASE_BASE}/wild-agents-theme-${theme}-1.0.0.tgz"
    if $PCLI plugin install \
        --api-base "$DEV_URL" \
        --api-key "$API_KEY" \
        "$TARBALL_URL" > /dev/null 2>&1; then
      echo "OK (github)"
      PASS=$((PASS + 1))
    else
      echo "FAIL"
      FAIL=$((FAIL + 1))
      ERRORS+=("$theme: github tarball install failed")
    fi
  elif [ "$DEPLOY_MODE" = "npm" ]; then
    PACKAGE="@wild-agents/theme-$theme"
    if $PCLI plugin install \
        --api-base "$DEV_URL" \
        --api-key "$API_KEY" \
        "$PACKAGE" > /dev/null 2>&1; then
      echo "OK (npm)"
      PASS=$((PASS + 1))
    else
      echo "FAIL"
      FAIL=$((FAIL + 1))
      ERRORS+=("$theme: npm install failed")
    fi
  else
    THEME_DIR_ABS="$(cd "$THEME_DIR" && pwd)"
    if $PCLI plugin install \
        --local \
        --api-base "$DEV_URL" \
        --api-key "$API_KEY" \
        "$THEME_DIR_ABS" > /dev/null 2>&1; then
      echo "OK (local)"
      PASS=$((PASS + 1))
    else
      echo "FAIL"
      FAIL=$((FAIL + 1))
      ERRORS+=("$theme: local install failed")
    fi
  fi
done

echo ""
echo "=== Results ==="
echo "Passed: $PASS / $TOTAL"
echo "Failed: $FAIL / $TOTAL"

if [ "${#ERRORS[@]}" -gt 0 ]; then
  echo ""
  echo "Failures:"
  for e in "${ERRORS[@]}"; do
    echo "  - $e"
  done
  exit 1
fi

echo ""
echo "All $PASS themes deployed. Preview: $DEV_URL"
