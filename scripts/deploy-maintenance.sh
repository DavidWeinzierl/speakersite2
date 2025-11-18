#!/usr/bin/env bash
# Deploy ONLY the maintenance page to GitHub Pages (gh-pages branch)
set -euo pipefail

if ! command -v gh-pages >/dev/null 2>&1; then
  echo "gh-pages CLI not found. Install dev deps first: npm install" >&2
  exit 1
fi

echo "[maintenance-deploy] Preparing minimal build folder..."
rm -rf build
mkdir -p build
cp public/maintenance.html build/index.html
# Add a tiny marker file
printf "Maintenance deployment: %s\n" "$(date -u)" > build/MAINTENANCE.txt

# Optional: create a robots.txt to discourage indexing during maintenance
cat > build/robots.txt <<EOF
User-agent: *
Disallow: /
EOF

# Optional: minimal 404 pointing to maintenance page
cat > build/404.html <<'EOF'
<!doctype html><meta charset="utf-8"/><title>Wartung</title><meta name="robots" content="noindex"><meta name="viewport" content="width=device-width,initial-scale=1"/><style>body{font-family:system-ui;margin:0;display:flex;min-height:100vh;align-items:center;justify-content:center;background:#0f172a;color:#f8fafc}main{max-width:640px;padding:2rem 2rem;background:#1e293bcc;border:1px solid #334155;border-radius:20px;text-align:center}a{color:#38bdf8;text-decoration:none}a:hover{text-decoration:underline}</style><main><h1>Wartungsmodus</h1><p>Diese Seite ist vorübergehend nicht erreichbar.</p><p><a href="/">Zurück</a></p></main>
EOF

# Publish with custom commit message
MSG="Deploy maintenance page $(date -u +%Y-%m-%dT%H:%M:%SZ)"

echo "[maintenance-deploy] Publishing to gh-pages..."
# Use -m to set commit message; -d build uses the folder
npx gh-pages -d build -m "$MSG"

echo "[maintenance-deploy] Done. GitHub Pages should serve maintenance page shortly (may take up to ~1 min)."
