# GitHub Actions Troubleshooting Guide

## Current Status

### GitHub Pages Deployment - DISABLED ❌
The workflow in `.github/workflows/static.yml` has been commented out since you're no longer using GitHub Pages.

### SSH Deployment - ACTIVE ✅
The workflow in `.github/workflows/deploy.yml` deploys your built React app to World4You via rsync over SSH.

---

## Issue: "Could not resolve hostname ***"

This error means the `SSH_HOST` secret in GitHub is malformed. The `***` you see is GitHub masking the secret value, but underneath it likely has:
- Extra spaces
- Quotes around the hostname  
- Hidden/special characters
- Wrong hostname entirely

### How to Fix

1. **Go to GitHub Secrets:**
   https://github.com/DavidWeinzierl/speakersite2/settings/secrets/actions

2. **Delete the `SSH_HOST` secret** (click the trash icon)

3. **Create a new `SSH_HOST` secret:**
   - Name: `SSH_HOST`
   - Value: `www93.world4you.com` (EXACTLY this, no quotes, no spaces)

4. **Verify all 5 secrets exist:**
   - `SSH_PRIVATE_KEY` - Your private SSH key (full content with BEGIN/END lines)
   - `SSH_HOST` - `www93.world4you.com`
   - `SSH_PORT` - `22`
   - `SSH_USER` - `ftp6887902`
   - `SSH_DESTINATION` - `/home/.sites/872/site6887902/speakersite2/build`

---

## Verification Steps

### Before Pushing to GitHub

Run locally to test your SSH connection:
```bash
ssh -i .github/deploy_key_rsa -p 22 ftp6887902@www93.world4you.com 'echo Connection works'
```

If this works locally, your GitHub secrets should use identical values.

### Check DNS Resolution

```bash
ping www93.world4you.com
nslookup www93.world4you.com
```

Both should succeed. If they fail, there's a network issue (not a GitHub secret issue).

### Use the Helper Script

```bash
./verify-github-secrets.sh
```

This shows you what each secret should contain and tests connectivity.

---

## After Fixing Secrets

1. **Commit the workflow changes:**
   ```bash
   git add .github/workflows/
   git commit -m "Fix SSH deployment and disable GitHub Pages"
   git push origin main
   ```

2. **Watch the Action Run:**
   - Go to https://github.com/DavidWeinzierl/speakersite2/actions
   - Click on the latest "Build and Deploy to Server via SSH" workflow
   - Check the logs for:
     - "Key format check:" should show `-----BEGIN OPENSSH PRIVATE KEY-----`
     - "Connecting to host:" should show `www93.world4you.com` (not ***)
     - "SSH connection successful" should appear

3. **If it still fails:**
   - Check the detailed logs for the exact error
   - The new debug output will show DNS resolution attempts
   - Copy any error messages for further troubleshooting

---

## What the Workflow Does

1. **Checkout code** from GitHub
2. **Install dependencies** (`npm ci`)
3. **Build React app** (`npm run build`)
4. **Sync build/ folder** to your World4You server via rsync/SSH
5. **Only syncs the frontend** (FormSubmit handles contact form, no backend needed)

---

## Important Notes

### FormSubmit Integration
Since you're now using FormSubmit for the contact form:
- The workflow only needs to deploy the `build/` folder
- No server-side Node.js process needed for the form
- The old `/api/contact` endpoint is not used anymore

### Build Folder Only
The workflow syncs `build/` to `/home/.sites/872/site6887902/speakersite2/build` on your server. Make sure your World4You web root points to this directory or its parent.

### No Manual Restart Needed
Unlike the Node.js backend, the static frontend doesn't need restarting. Just refresh your browser after deployment completes.

---

## Quick Reference

| Secret Name | Value | Notes |
|-------------|-------|-------|
| SSH_PRIVATE_KEY | Full SSH key with BEGIN/END | Copy from `.github/deploy_key_rsa` |
| SSH_HOST | www93.world4you.com | No quotes, no spaces! |
| SSH_PORT | 22 | Standard SSH port |
| SSH_USER | ftp6887902 | Your World4You FTP user |
| SSH_DESTINATION | /home/.sites/872/site6887902/speakersite2/build | Target directory |

---

## Alternative: Manual Deployment

If GitHub Actions continues to fail, you can deploy manually:

```bash
# Build locally
npm run build

# Sync to server
rsync -avz --delete \
  -e "ssh -i .github/deploy_key_rsa -p 22" \
  build/ ftp6887902@www93.world4you.com:/home/.sites/872/site6887902/speakersite2/build
```

Or use the deploy script:
```bash
npm run deploy:remote
```

(Note: The deploy:remote script syncs more than just build/ and tries to restart the server, which you don't need anymore with FormSubmit.)
