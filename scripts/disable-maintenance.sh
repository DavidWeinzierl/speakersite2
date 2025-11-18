#!/usr/bin/env bash
# Disable maintenance mode for the Node server
set -euo pipefail
APP_NAME="speakersite2"

echo "[maintenance] Deactivating maintenance mode..."
if [ -f .env ]; then
  if grep -q '^MAINTENANCE_MODE=' .env; then
    sed -i.bak 's/^MAINTENANCE_MODE=.*/MAINTENANCE_MODE=false/' .env && rm .env.bak
  else
    echo 'MAINTENANCE_MODE=false' >> .env
  fi
fi

if command -v pm2 >/dev/null 2>&1; then
  MAINTENANCE_MODE=false pm2 restart "$APP_NAME" --update-env || MAINTENANCE_MODE=false pm2 start ecosystem.config.js --update-env
  echo "[maintenance] PM2 app restarted with MAINTENANCE_MODE=false"
else
  echo "[maintenance] PM2 not found. Start manually with: MAINTENANCE_MODE=false node server/index.js"
fi

echo "[maintenance] OFF"
