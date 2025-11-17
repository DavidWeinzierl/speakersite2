#!/bin/bash
# Script to help set up GitHub secrets for deployment

echo "📋 GitHub Secrets Setup Helper"
echo "================================"
echo ""
echo "You need to add these secrets to your GitHub repository:"
echo ""
echo "Go to: https://github.com/DavidWeinzierl/speakersite2/settings/secrets/actions"
echo ""

echo "1️⃣  SSH_PRIVATE_KEY"
echo "   Copy the ENTIRE content below (including BEGIN/END lines):"
echo "   ----------------------------------------"
cat .github/deploy_key_rsa
echo "   ----------------------------------------"
echo ""

echo "2️⃣  SSH_HOST"
echo "   Value: www93.world4you.com"
echo ""

echo "3️⃣  SSH_PORT"
echo "   Value: 22"
echo ""

echo "4️⃣  SSH_USER"
echo "   Value: ftp6887902"
echo ""

echo "5️⃣  SSH_DESTINATION"
echo "   Value: /home/.sites/872/site6887902/speakersite2/build"
echo ""

echo "✅ After adding all secrets, push to main branch to trigger deployment"
echo ""
echo "⚠️  IMPORTANT: You must create .env on the server manually (see DEPLOYMENT.md)"
