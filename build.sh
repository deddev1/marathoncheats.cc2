#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT"

# If Cloudflare skipped install, or root deps are missing, install wrangler-only root deps.
if [[ ! -x "$ROOT/node_modules/.bin/wrangler" && ! -d "$ROOT/node_modules/wrangler" ]]; then
  echo "Installing root dependencies..."
  if [[ -f "$ROOT/package-lock.json" ]]; then
    npm ci --no-fund --no-audit || npm install --no-fund --no-audit
  else
    npm install --no-fund --no-audit
  fi
fi

bash "$ROOT/install-app.sh"

cd "$ROOT/marathoncheats.cc2-main"
npm run build
