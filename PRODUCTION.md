# Production Server Guide

## ✅ Current Status: DEPLOYED AND RUNNING

Your application is successfully deployed and running on:
- **Server:** www93.world4you.com
- **API Port:** 5001 (internal)
- **Process:** Running via nohup (PID: check with `./manage-server.sh status`)

The contact form is working and sending emails to `philipp@philyourvoice.at`.

---

## Quick Server Management

Use the `manage-server.sh` script for all server operations:

```bash
# Check if server is running
./manage-server.sh status

# View server logs
./manage-server.sh logs

# Restart server
./manage-server.sh restart

# Stop server
./manage-server.sh stop

# Start server
./manage-server.sh start

# Test health endpoint
./manage-server.sh health

# Send test email
./manage-server.sh test-email
```

---

## How the Server is Running

Currently using **nohup** (simple background process):
- Command: `nohup node server/index.js > server.log 2>&1 &`
- Logs: `/home/.sites/872/site6887902/speakersite2/server.log`
- **Pros:** Simple, works immediately, no resource limits
- **Cons:** Doesn't auto-restart on crash or server reboot

---

## Making It Production-Ready

### Option 1: Auto-restart on Reboot (Recommended)

Add a cron job on the server to start on reboot:

1. SSH into the server:
   ```bash
   ssh -i .github/deploy_key_rsa -p 22 ftp6887902@www93.world4you.com
   ```

2. Edit crontab:
   ```bash
   crontab -e
   ```

3. Add this line:
   ```
   @reboot cd /home/.sites/872/site6887902/speakersite2 && nohup node server/index.js > server.log 2>&1 &
   ```

4. Save and exit (`:wq` in vim, or `Ctrl+X` then `Y` in nano)

Now the server will automatically start when the hosting server reboots.

### Option 2: Simple Restart Script

Create a wrapper script on the server that monitors and restarts if needed:

```bash
# SSH into server
ssh -i .github/deploy_key_rsa -p 22 ftp6887902@www93.world4you.com

# Create monitor script
cat > /home/.sites/872/site6887902/speakersite2/monitor.sh <<'EOF'
#!/bin/bash
cd /home/.sites/872/site6887902/speakersite2
while true; do
  if ! pgrep -f "node server/index.js" > /dev/null; then
    echo "$(date): Server not running, starting..."
    nohup node server/index.js > server.log 2>&1 &
  fi
  sleep 60
done
EOF

chmod +x monitor.sh

# Run monitor in background
nohup ./monitor.sh > monitor.log 2>&1 &
```

This checks every 60 seconds if the server is running and restarts it if needed.

---

## Deployment Workflow

### When you make code changes:

1. **Commit and push to GitHub:**
   ```bash
   git add .
   git commit -m "Your changes"
   git push origin main
   ```

2. **Deploy to server:**
   ```bash
   npm run deploy:remote
   ```
   This will:
   - Sync code to server
   - Install dependencies
   - Build React app
   - The deploy script will show output

3. **Restart the server:**
   ```bash
   ./manage-server.sh restart
   ```

4. **Verify it's working:**
   ```bash
   ./manage-server.sh status
   ./manage-server.sh health
   ```

### Alternative: GitHub Actions (Automatic)

GitHub Actions is configured but only deploys the frontend build files. After a push to main:

1. GitHub Actions builds and syncs the `build/` folder
2. You still need to manually restart the Node.js server:
   ```bash
   ./manage-server.sh restart
   ```

---

## Monitoring

### Check server is running
```bash
./manage-server.sh status
```

### View live logs
```bash
ssh -i .github/deploy_key_rsa -p 22 ftp6887902@www93.world4you.com \
  'tail -f /home/.sites/872/site6887902/speakersite2/server.log'
```

### Check for errors
```bash
./manage-server.sh logs | grep -i error
```

### Test contact form
```bash
./manage-server.sh test-email
```
Then check `philipp@philyourvoice.at` for the email.

---

## Troubleshooting

### Server not responding

1. Check if process is running:
   ```bash
   ./manage-server.sh status
   ```

2. If not running, start it:
   ```bash
   ./manage-server.sh start
   ```

3. Check logs for errors:
   ```bash
   ./manage-server.sh logs
   ```

### Emails not sending

1. Check server logs:
   ```bash
   ./manage-server.sh logs | grep -i smtp
   ```

2. Verify .env on server:
   ```bash
   ssh -i .github/deploy_key_rsa -p 22 ftp6887902@www93.world4you.com \
     'grep SMTP_USER /home/.sites/872/site6887902/speakersite2/.env'
   ```

3. Test SMTP connection:
   ```bash
   ssh -i .github/deploy_key_rsa -p 22 ftp6887902@www93.world4you.com \
     'cd /home/.sites/872/site6887902/speakersite2 && node server/verify.js'
   ```

### Port 5001 already in use

Kill existing process and restart:
```bash
./manage-server.sh stop
sleep 2
./manage-server.sh start
```

### Server crashes frequently

Check logs for the error:
```bash
./manage-server.sh logs
```

Common causes:
- Missing environment variables in `.env`
- SMTP authentication failures
- Memory limits (contact World4You support)

---

## Server Access

### SSH into production server:
```bash
ssh -i .github/deploy_key_rsa -p 22 ftp6887902@www93.world4you.com
```

### Navigate to project:
```bash
cd /home/.sites/872/site6887902/speakersite2
```

### Useful commands once SSH'd in:

```bash
# Check server process
ps aux | grep node

# View logs in real-time
tail -f server.log

# Check port 5001
netstat -tlnp | grep 5001

# Test API locally
curl http://localhost:5001/api/health

# Test contact form
curl -X POST http://localhost:5001/api/contact \
  -H 'Content-Type: application/json' \
  -d '{"name":"Test","email":"test@example.com","subject":"Test","message":"Hello"}'

# Check environment variables (safe ones)
grep -v PASS .env
```

---

## Important Files on Server

```
/home/.sites/872/site6887902/speakersite2/
├── .env                    # Environment variables (secrets)
├── server.log              # Server output logs
├── server/index.js         # API server
├── build/                  # Built React app (served by Node)
├── node_modules/           # Dependencies
├── package.json            # Project config
└── ecosystem.config.js     # PM2 config (not used currently)
```

---

## Security Checklist

- ✅ `.env` has permissions 600 (not readable by others)
- ✅ SMTP credentials stored securely in `.env`
- ✅ SSH key not in git
- ✅ Rate limiting enabled in API
- ✅ CORS configured for production domains

### Update ALLOWED_ORIGINS for production

If your domain is live, update `.env` on the server:
```bash
ALLOWED_ORIGINS=https://philyourvoice.at,https://www.philyourvoice.at
```

Then restart:
```bash
./manage-server.sh restart
```

---

## Next Steps

1. ✅ **Set up auto-restart** (Option 1 above - add cron job)
2. ✅ **Test the live site** - Submit the contact form
3. ✅ **Monitor logs** for the first few days
4. ⚠️ **Set up Apache/Nginx proxy** if you want the site on port 80/443 (standard HTTP/HTTPS)
5. ⚠️ **Add SSL certificate** for HTTPS (Let's Encrypt via World4You panel)

---

## Support

If you encounter issues:
1. Check logs: `./manage-server.sh logs`
2. Check status: `./manage-server.sh status`
3. Restart: `./manage-server.sh restart`
4. Review this guide's Troubleshooting section

For hosting-specific issues (resource limits, domain config, SSL):
- Contact World4You support

---

## Summary

🎉 **Your application is live and working!**

- ✅ Code deployed
- ✅ Server running
- ✅ Contact form sends emails
- ✅ Health endpoint responding
- ✅ Management scripts ready

Just remember to:
- Use `./manage-server.sh` for server operations
- Run `npm run deploy:remote` when you update code
- Restart the server after deployments
