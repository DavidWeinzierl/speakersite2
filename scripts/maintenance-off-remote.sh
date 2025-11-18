#!/bin/bash
# Disable maintenance on World4You (Apache serving static files)
cd /home/.sites/872/site6887902/speakersite2

echo "=== Disabling Maintenance Mode ==="

# Restore original index.html
if [ -f build/index.html.backup ]; then
  mv build/index.html.backup build/index.html
  echo "✓ Restored original index.html"
else
  echo "⚠ No backup found - you may need to redeploy"
fi

# Remove .htaccess
rm -f build/.htaccess
echo "✓ Removed .htaccess"

# Unset env var and restart Node server
if [ -f .env ]; then
  grep -v '^MAINTENANCE_MODE=' .env > .env.tmp 2>/dev/null || true
  mv .env.tmp .env 2>/dev/null || true
fi
echo 'MAINTENANCE_MODE=false' >> .env
rm -f maintenance.flag

# Restart Node server
PIDS=$(ps ax | grep 'node server/index.js' | grep -v grep | awk '{print $1}')
if [ -n "$PIDS" ]; then
  echo "Killing Node PIDs: $PIDS"
  kill $PIDS 2>/dev/null || true
fi
sleep 1
nohup node server/index.js > server.log 2>&1 &
echo "✓ Node server restarted"

# Update timestamp
touch build/index.html
echo "✓ Updated timestamp"

echo ""
echo "=== MAINTENANCE MODE DISABLED ==="
echo "Site should be back online"
