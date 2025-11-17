#!/bin/bash
# Script to deploy .env to production server
set -e

SSH_KEY="${SSH_KEY:-".github/deploy_key_rsa"}"
REMOTE_USER="${REMOTE_USER:-"ftp6887902"}"
REMOTE_HOST="${REMOTE_HOST:-"www93.world4you.com"}"
REMOTE_PORT="${REMOTE_PORT:-"22"}"
REMOTE_PATH="${REMOTE_PATH:-"/home/.sites/872/site6887902/speakersite2"}"

echo "🔐 Deploying .env to production server"
echo "======================================="
echo ""

# Check if local .env exists
if [[ ! -f .env ]]; then
  echo "❌ Error: .env file not found in current directory"
  echo "   Create .env first with your production values"
  exit 1
fi

# Check if SSH key exists
if [[ ! -f "$SSH_KEY" ]]; then
  echo "❌ Error: SSH key not found at $SSH_KEY"
  exit 1
fi

echo "📤 Uploading .env to $REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH"
scp -i "$SSH_KEY" -P "$REMOTE_PORT" .env "$REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH/.env"

echo ""
echo "🔒 Setting secure permissions (600) on remote .env"
ssh -i "$SSH_KEY" -p "$REMOTE_PORT" "$REMOTE_USER@$REMOTE_HOST" \
  "chmod 600 $REMOTE_PATH/.env && ls -l $REMOTE_PATH/.env"

echo ""
echo "✅ .env deployed successfully!"
echo ""
echo "🔄 To restart the server with new .env values:"
echo "   ssh -i $SSH_KEY -p $REMOTE_PORT $REMOTE_USER@$REMOTE_HOST 'cd $REMOTE_PATH && npx pm2 restart speakersite2'"
