#!/usr/bin/env bash
set -euo pipefail

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

if [[ "${SITES_ENV_READY:-}" != "1" ]]; then
  exec bash "${script_dir}/sites-env.sh" -- bash "$0" "$@"
fi

command -v timeout >/dev/null || {
  echo "build-verified.sh requires GNU timeout." >&2
  exit 69
}

next_bin="${SITES_PROJECT_ROOT}/node_modules/.bin/next"
if [[ ! -x "${next_bin}" ]]; then
  echo "Next.js is unavailable. Install dependencies before building." >&2
  exit 69
fi

echo "Running bounded Next.js build for EdgeOne OpenNext..."
timeout \
  --signal=TERM \
  --kill-after="${SITES_BUILD_KILL_AFTER:-10s}" \
  "${SITES_BUILD_TIMEOUT:-5m}" \
  "${next_bin}" build

test -f "${SITES_PROJECT_ROOT}/.next/required-server-files.json" || {
  echo "Next.js build completed without .next/required-server-files.json." >&2
  exit 66
}

echo "Next.js build completed; handing .next output to EdgeOne OpenNext."
