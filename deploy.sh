#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT"

if [[ ! -x "$ROOT/node_modules/.bin/wrangler" ]]; then
  echo "wrangler not found; installing production dependencies..."
  npm ci --omit=dev
fi

exec npm exec -- wrangler "$@"
