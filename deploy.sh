#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT"

REQUIRED_NODE_MAJOR=22

ensure_node_version() {
  local current_major
  current_major="$(node -p "Number(process.versions.node.split('.')[0])")"
  if [[ "$current_major" -ge "$REQUIRED_NODE_MAJOR" ]]; then
    return 0
  fi

  local target="${NODE_VERSION:-}"
  if [[ -z "$target" && -f "$ROOT/.nvmrc" ]]; then
    target="$(tr -d '[:space:]' < "$ROOT/.nvmrc")"
  fi
  if [[ -z "$target" && -f "$ROOT/.node-version" ]]; then
    target="$(tr -d '[:space:]' < "$ROOT/.node-version")"
  fi
  target="${target:-22}"

  export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
  if [[ -s "$NVM_DIR/nvm.sh" ]]; then
    # shellcheck source=/dev/null
    . "$NVM_DIR/nvm.sh"
    echo "Wrangler requires Node.js >=${REQUIRED_NODE_MAJOR}; switching to Node ${target} via nvm..."
    nvm install "$target" --no-progress >/dev/null
    nvm use "$target"
    return 0
  fi

  echo "Wrangler requires Node.js >=${REQUIRED_NODE_MAJOR}, but the build is using $(node -v)." >&2
  echo "Set NODE_VERSION=22 in Cloudflare Workers Builds (Settings > Build > Variables)." >&2
  exit 1
}

if [[ ! -x "$ROOT/node_modules/.bin/wrangler" ]]; then
  echo "wrangler not found; installing production dependencies..."
  npm ci --omit=dev
fi

ensure_node_version
exec npm exec -- wrangler "$@"
