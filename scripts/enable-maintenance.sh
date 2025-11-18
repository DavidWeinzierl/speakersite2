#!/usr/bin/env bash
# Enable maintenance mode for the Node server
set -euo pipefail
APP_NAME="speakersite2"

echo "[maintenance] Activating maintenance mode..."
# Update (or append) MAINTENANCE_MODE in .env if present
if [ -f .env ]; then
  if grep -q '^MAINTENANCE_MODE=' .env; then
    # macOS BSD sed requires backup suffix; create temp then move
    sed -i.bak 's/^MAINTENANCE_MODE=.*/MAINTENANCE_MODE=true/' .env && rm .env.bak
  else
    echo 'MAINTENANCE_MODE=true' >> .env
  fi
fi

# Restart via PM2 if available, passing updated env
if command -v pm2 >/dev/null 2>&1; then
  MAINTENANCE_MODE=true pm2 restart "$APP_NAME" --update-env || MAINTENANCE_MODE=true pm2 start ecosystem.config.js --update-env
  echo "[maintenance] PM2 app restarted with MAINTENANCE_MODE=true"
else
  echo "[maintenance] PM2 not found. Start manually with: MAINTENANCE_MODE=true node server/index.js"
fi

echo "[maintenance] ON"
