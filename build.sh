#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")" && pwd)"
bash "$ROOT/install-app.sh"

cd "$ROOT/marathoncheats.cc2-main"
npm run build:site
