#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")" && pwd)"
APP_DIR="$ROOT/marathoncheats.cc2-main"

build_deps_installed() {
  [[ -f "$APP_DIR/node_modules/astro/package.json" \
    && -f "$APP_DIR/node_modules/sharp/package.json" \
    && -f "$APP_DIR/node_modules/wrangler/package.json" ]]
}

if build_deps_installed; then
  exit 0
fi

echo "Installing marathoncheats.cc2-main dependencies..."
if [[ -f "$APP_DIR/package-lock.json" ]]; then
  if ! npm ci --prefix "$APP_DIR" --include=dev; then
    echo "npm ci failed for app; falling back to npm install..." >&2
    npm install --prefix "$APP_DIR" --include=dev --no-fund --no-audit
  fi
else
  npm install --prefix "$APP_DIR" --include=dev --no-fund --no-audit
fi

if ! build_deps_installed; then
  echo "App build dependencies are still missing after install." >&2
  exit 1
fi
