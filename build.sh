#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/marathoncheats.cc2-main"
npm ci
npm run build:site
