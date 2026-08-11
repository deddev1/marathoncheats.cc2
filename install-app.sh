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
npm ci --prefix "$APP_DIR" --include=dev

if ! build_deps_installed; then
  echo "App build dependencies are still missing after npm ci." >&2
  exit 1
fi
