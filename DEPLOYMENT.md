# Deployment Guide

## Overview
This project can be deployed in two ways:
1. **GitHub Actions** (automated on push to main)
2. **Manual deployment** via `npm run deploy:remote`

Both methods sync code to the server and manage the Node.js application.

---

## Method 1: GitHub Actions (Automated)

### One-time Setup

#### 1. Add GitHub Secrets
Go to your repository → Settings → Secrets and variables → Actions → New repository secret

Add these secrets:

- **SSH_PRIVATE_KEY**: Your private SSH key
  ```bash
  # Get the key content (run locally)
  cat .github/deploy_key_rsa
  # Copy the ENTIRE output including -----BEGIN and -----END lines
  ```

- **SSH_HOST**: `www93.world4you.com`
- **SSH_PORT**: `22`
- **SSH_USER**: `ftp6887902`
- **SSH_DESTINATION**: `/home/.sites/872/site6887902/speakersite2/build`

#### 2. Create .env on Server (REQUIRED - Do this manually once)

SSH into your server:
```bash
ssh -i .github/deploy_key_rsa -p 22 ftp6887902@www93.world4you.com
```

Create the `.env` file in `/home/.sites/872/site6887902/speakersite2/`:
```bash
cd /home/.sites/872/site6887902/speakersite2

cat > .env <<'EOF'
SMTP_HOST=smtp.world4you.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=philipp@philyourvoice.at
SMTP_PASS=YOUR_ACTUAL_PASSWORD_HERE
SMTP_FROM="Kontakt Formular <philipp@philyourvoice.at>"
TARGET_EMAIL=philipp@philyourvoice.at
PORT=5001
SERVE_STATIC=true
ALLOWED_ORIGINS=https://philyourvoice.at,https://www.philyourvoice.at
EMAIL_SUBJECT_PREFIX=[Kontakt]
EOF

chmod 600 .env
```

**IMPORTANT:** Replace `YOUR_ACTUAL_PASSWORD_HERE` with the real SMTP password.

#### 3. How it works

When you push to `main`, GitHub Actions will:
1. Checkout code
2. Install dependencies
3. Build the React app (`npm run build`)
4. Sync the `build/` folder to the server via rsync

**Note:** GitHub Actions only deploys the built frontend. You need to manually manage the server-side Node.js app (see below).

---

## Method 2: Manual Deployment via Script

The `npm run deploy:remote` command does a full deployment:
- Syncs ALL code (not just build/)
- Installs dependencies on the server
- Builds the React app on the server
- Starts/restarts the Node.js server with PM2
- Sets up auto-restart on reboot

### Prerequisites
- Local `.env` file with production values (will be uploaded if missing on server)
- SSH key at `.github/deploy_key_rsa`

### Run deployment
```bash
npm run deploy:remote
```

To force upload `.env` even if it exists remotely:
```bash
UPLOAD_ENV=always npm run deploy:remote
```

---

## Server-Side Management (Node.js App)

### Initial Setup (One-time)

SSH into the server and run these commands:

```bash
cd /home/.sites/872/site6887902/speakersite2

# Install dependencies
npm ci

# Build frontend
npm run build

# Start with PM2
npx pm2 start ecosystem.config.js
npx pm2 save

# Set up auto-restart on reboot
npx pm2 startup
# Follow the instructions it gives you (copy/paste the command)
```

### Managing the App

**View status:**
```bash
cd /home/.sites/872/site6887902/speakersite2
npx pm2 status
```

**View logs:**
```bash
npx pm2 logs speakersite2
npx pm2 logs speakersite2 --lines 100
```

**Restart after code changes:**
```bash
npx pm2 restart speakersite2
```

**Stop the app:**
```bash
npx pm2 stop speakersite2
```

**Start the app:**
```bash
npx pm2 start speakersite2
```

---

## Environment Variables (.env)

### Why .env is NOT in git

The `.env` file contains secrets (SMTP password) and should NEVER be committed to git. It's already in `.gitignore`.

### Deployment Strategy

**For Production (Server):**
- Create `.env` manually via SSH (see Method 1, step 2 above)
- OR use `UPLOAD_ENV=always npm run deploy:remote` to upload your local `.env`

**For Local Development:**
- Use the `.env` file in your project root
- This file is already created with your credentials

### Syncing .env changes

If you update `.env` locally and want to deploy it:
```bash
UPLOAD_ENV=always npm run deploy:remote
```

Or manually via SCP:
```bash
scp -i .github/deploy_key_rsa -P 22 .env ftp6887902@www93.world4you.com:/home/.sites/872/site6887902/speakersite2/.env
```

---

## Troubleshooting

### GitHub Actions fails with "error in libcrypto"

**Solution:** Make sure the SSH_PRIVATE_KEY secret contains the ENTIRE key including:
```
-----BEGIN OPENSSH PRIVATE KEY-----
...
-----END OPENSSH PRIVATE KEY-----
```

Copy it exactly as-is from `.github/deploy_key_rsa`.

### "Port already in use" on server

```bash
# SSH into server
ssh -i .github/deploy_key_rsa -p 22 ftp6887902@www93.world4you.com

# Check what's on the port
lsof -nP -iTCP:5001 -sTCP:LISTEN

# Kill the process (replace PID with actual process ID)
kill -9 PID

# Or restart via PM2
npx pm2 restart speakersite2
```

### Email not sending

1. Check server logs:
   ```bash
   npx pm2 logs speakersite2
   ```

2. Verify SMTP credentials in `.env`

3. Test SMTP connection:
   ```bash
   node server/verify.js
   ```

### Site not loading

1. Check if PM2 is running:
   ```bash
   npx pm2 status
   ```

2. Check logs for errors:
   ```bash
   npx pm2 logs speakersite2 --lines 50
   ```

3. Verify `.env` exists and has correct values:
   ```bash
   ls -la .env
   grep PORT .env
   ```

4. Test health endpoint:
   ```bash
   curl http://localhost:5001/api/health
   ```

---

## Quick Reference

**Deploy via GitHub Actions:**
- Push to `main` branch → automatic deployment of frontend

**Deploy everything manually:**
```bash
npm run deploy:remote
```

**Restart server after changes:**
```bash
ssh -i .github/deploy_key_rsa -p 22 ftp6887902@www93.world4you.com 'cd /home/.sites/872/site6887902/speakersite2 && npx pm2 restart speakersite2'
```

**View server logs remotely:**
```bash
ssh -i .github/deploy_key_rsa -p 22 ftp6887902@www93.world4you.com 'cd /home/.sites/872/site6887902/speakersite2 && npx pm2 logs speakersite2 --lines 50'
```
