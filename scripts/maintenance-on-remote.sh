#!/bin/bash
# Enable maintenance on World4You (Apache serving static files)
cd /home/.sites/872/site6887902/speakersite2

echo "=== Enabling Maintenance Mode ==="

# Backup original index.html if not already backed up
if [ ! -f build/index.html.backup ]; then
  cp build/index.html build/index.html.backup
  echo "✓ Backed up original index.html"
fi

# Replace with maintenance page
cp public/maintenance.html build/index.html
echo "✓ Replaced index.html with maintenance page"

# Add .htaccess to prevent caching
cat > build/.htaccess <<'EOF'
# Force no-cache for maintenance mode
<Files "index.html">
    Header set Cache-Control "no-cache, no-store, must-revalidate, max-age=0"
    Header set Pragma "no-cache"
    Header set Expires 0
</Files>

# Return 503 status for maintenance
ErrorDocument 503 /index.html
RewriteEngine On
RewriteCond %{REQUEST_URI} !^/index\.html$
RewriteRule .* - [R=503,L]
EOF
echo "✓ Created .htaccess with no-cache headers"

# Set env var and restart Node server (for API)
if [ -f .env ]; then
  grep -v '^MAINTENANCE_MODE=' .env > .env.tmp 2>/dev/null || true
  mv .env.tmp .env 2>/dev/null || true
fi
echo 'MAINTENANCE_MODE=true' >> .env
touch maintenance.flag

# Restart Node server
PIDS=$(ps ax | grep 'node server/index.js' | grep -v grep | awk '{print $1}')
if [ -n "$PIDS" ]; then
  echo "Killing Node PIDs: $PIDS"
  kill $PIDS 2>/dev/null || true
fi
sleep 1
nohup node server/index.js > server.log 2>&1 &
echo "✓ Node server restarted (API will return 503)"

# Update file timestamps to bust cache
touch build/index.html
echo "✓ Updated timestamp"

echo ""
echo "=== MAINTENANCE MODE ACTIVE ==="
echo "Note: CDN/Browser cache may take 1-5 minutes to clear"
echo "Users can force refresh with Ctrl+F5 or Cmd+Shift+R"
