#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT"

WRANGLER="$ROOT/node_modules/.bin/wrangler"

if [[ ! -x "$WRANGLER" ]]; then
  echo "wrangler not found; installing production dependencies..."
  npm ci --omit=dev
fi

exec "$WRANGLER" "$@"
