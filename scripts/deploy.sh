#!/usr/bin/env bash
set -euo pipefail

# One-click remote deploy for speakersite2
# - Installs Node (NVM) on the remote if missing
# - Installs dependencies, builds frontend
# - Starts (or restarts) app with PM2 (local npx pm2)
# - Adds crontab @reboot entry for pm2 resurrect (idempotent)
#
# You can override these via env vars before running `npm run deploy:remote`.
SSH_KEY=${SSH_KEY:-"/Users/david/VS/GitHubProjects/speakersite2/.github/deploy_key_rsa"}
REMOTE_USER=${REMOTE_USER:-"ftp6887902"}
REMOTE_HOST=${REMOTE_HOST:-"www93.world4you.com"}
REMOTE_PORT=${REMOTE_PORT:-"22"}
REMOTE_PATH=${REMOTE_PATH:-"/home/.sites/872/site6887902/speakersite2"}
APP_NAME=${APP_NAME:-"speakersite2"}

# Upload local .env if remote doesn't have one (optional but handy)
UPLOAD_ENV=${UPLOAD_ENV:-"auto"}  # auto|never|always

# Internal helper to run a command on remote
run_remote() {
  ssh -i "$SSH_KEY" -p "$REMOTE_PORT" -o StrictHostKeyChecking=accept-new \
    "$REMOTE_USER@$REMOTE_HOST" "$@"
}

# Ensure remote path exists
run_remote "bash -lc 'test -d \"$REMOTE_PATH\"'" || {
  echo "Remote path not found: $REMOTE_PATH" >&2
  exit 2
}

# Optionally upload .env
if [[ "$UPLOAD_ENV" != "never" ]]; then
  HAS_ENV=$(run_remote "bash -lc 'test -f \"$REMOTE_PATH/.env\" && echo yes || echo no'" || echo no)
  if [[ "$UPLOAD_ENV" == "always" || "$HAS_ENV" == "no" ]]; then
    if [[ -f .env ]]; then
      echo "Uploading .env to remote..."
      scp -i "$SSH_KEY" -P "$REMOTE_PORT" .env "$REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH/.env"
      run_remote "bash -lc 'chmod 600 \"$REMOTE_PATH/.env\"'"
    else
      echo "No local .env found to upload; skipping."
    fi
  fi
fi

# Remote deploy script
read -r -d '' REMOTE_SCRIPT <<'EOS'
set -euo pipefail

cd "$REMOTE_PATH"

# Show .env presence and keys (safe)
if [[ -f .env ]]; then
  echo "== .env present =="
  ls -l .env || true
  echo "== .env keys (no values) =="
  sed -n 's/^[^=]\+=//p' .env >/dev/null 2>&1 || true
  sed -n "s/^\([^=]\+\)=.*$/\1/p" .env || true
else
  echo ".env not found"
fi

# Install NVM if not present
if [[ ! -s "$HOME/.nvm/nvm.sh" ]]; then
  echo "Installing NVM..."
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
fi

# Load NVM
export NVM_DIR="$HOME/.nvm"
# shellcheck disable=SC1090
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"

# Install and use LTS Node
nvm install --lts >/dev/null
nvm use --lts >/dev/null

node -v || true
npm -v || true

# Persist NVM autoload
append_once() {
  local file="$1"; shift
  local marker="$1"; shift
  grep -q "$marker" "$file" 2>/dev/null || printf "%s\n" "$@" >> "$file"
}

append_once "$HOME/.bashrc" "NVM_AUTOLOAD_MARKER" \
"# NVM_AUTOLOAD_MARKER" \
"export NVM_DIR=\"$HOME/.nvm\"" \
"[ -s \"$HOME/.nvm/nvm.sh\" ] && . \"$HOME/.nvm/nvm.sh\"" \
"nvm use --lts >/dev/null 2>&1"

append_once "$HOME/.profile" "NVM_AUTOLOAD_MARKER" \
"# NVM_AUTOLOAD_MARKER" \
"export NVM_DIR=\"$HOME/.nvm\"" \
"[ -s \"$HOME/.nvm/nvm.sh\" ] && . \"$HOME/.nvm/nvm.sh\"" \
"nvm use --lts >/dev/null 2>&1"

# Verify SMTP (non-sending)
if [[ -f server/verify.js ]]; then
  echo "== SMTP verify =="
  node server/verify.js || echo 'SMTP verify failed (check credentials/port)'
fi

# Install dependencies and build
npm ci --prefer-offline --no-audit --progress=false
npm run build

# Ensure pm2 available (prefer local, no global install requirement)
# Install as dev dep if missing
if ! npm ls pm2 --depth=0 >/dev/null 2>&1; then
  npm i -D pm2
fi

# Start (or restart) with npx pm2
if npx pm2 describe "$APP_NAME" >/dev/null 2>&1; then
  npx pm2 restart "$APP_NAME"
else
  # If ecosystem file exists, use it; else run server directly
  if [[ -f ecosystem.config.js ]]; then
    npx pm2 start ecosystem.config.js
  else
    npx pm2 start server/index.js --name "$APP_NAME" --update-env
  fi
fi
npx pm2 save

# Add crontab @reboot (idempotent)
CRON_LINE="@reboot . $HOME/.nvm/nvm.sh && cd $REMOTE_PATH && npx pm2 resurrect >/dev/null 2>&1"
( crontab -l 2>/dev/null | grep -v "pm2 resurrect"; echo "$CRON_LINE" ) | crontab -

# Status & logs
npx pm2 status || true
npx pm2 logs "$APP_NAME" --lines 50 || true

echo "== Health endpoint =="
PORT_FROM_ENV=$(grep -E '^PORT=' .env 2>/dev/null | sed 's/^PORT=//') || true
PORT_TO_USE=${PORT_FROM_ENV:-5000}
curl -sS -m 5 "http://127.0.0.1:${PORT_TO_USE}/api/health" || echo "Health check failed"
EOS

# Now run the remote script with env variables exported
ssh -i "$SSH_KEY" -p "$REMOTE_PORT" -o StrictHostKeyChecking=accept-new \
  "$REMOTE_USER@$REMOTE_HOST" \
  "REMOTE_PATH='$REMOTE_PATH' APP_NAME='$APP_NAME' bash -lc '$(printf %q "$REMOTE_SCRIPT")'"

echo "\nDone. If the health check showed ok:true, your site + API are running."
