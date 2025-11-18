#!/bin/bash
# Server management script for production
# Usage: ./manage-server.sh [start|stop|restart|status|logs]

SSH_KEY=".github/deploy_key_rsa"
REMOTE_USER="ftp6887902"
REMOTE_HOST="www93.world4you.com"
REMOTE_PORT="22"
REMOTE_PATH="/home/.sites/872/site6887902/speakersite2"

# Helper to run commands on remote
run_remote() {
  ssh -i "$SSH_KEY" -p "$REMOTE_PORT" "$REMOTE_USER@$REMOTE_HOST" "$@"
}

case "$1" in
  start)
    echo "🚀 Starting server..."
    run_remote "bash $REMOTE_PATH/restart-remote.sh"
    ;;
    
  stop)
    echo "🛑 Stopping server..."
    run_remote 'for pid in $(ps ax | grep "node server/index.js" | grep -v grep | awk "{print \$1}"); do kill $pid 2>/dev/null && echo "Killed PID: $pid"; done'
    ;;
    
  restart)
    echo "🔄 Restarting server..."
    run_remote "bash $REMOTE_PATH/restart-remote.sh"
    sleep 2
    $0 status
    ;;
    
  status)
    echo "📊 Server status:"
    echo "================"
    run_remote "ps ax | grep '[n]ode server/index.js' && echo '---' && curl -sS http://localhost:5001/api/health || echo 'Server not responding'"
    ;;
    
  logs)
    echo "📋 Server logs (last 50 lines):"
    echo "==============================="
    run_remote "cd $REMOTE_PATH && tail -50 server.log"
    ;;
    
  health)
    echo "🏥 Health check:"
    run_remote "curl -sS http://localhost:5001/api/health"
    echo ""
    ;;
    
  test-email)
    echo "📧 Testing contact form..."
    run_remote 'curl -X POST http://localhost:5001/api/contact -H "Content-Type: application/json" -d "{\"name\":\"Test User\",\"email\":\"test@example.com\",\"subject\":\"Test\",\"message\":\"Test message from manage-server script\"}"'
    echo ""
    echo "✅ Check philipp@philyourvoice.at for the test email"
    ;;
    
  maintenance-on)
    echo "🛠  Enabling maintenance mode..."
    run_remote "bash $REMOTE_PATH/maintenance-on-remote.sh"
    ;;
    
  maintenance-off)
    echo "🔧 Disabling maintenance mode..."
    run_remote "bash $REMOTE_PATH/maintenance-off-remote.sh"
    ;;
  *)
    echo "Usage: $0 {start|stop|restart|status|logs|health|test-email|maintenance-on|maintenance-off}";
    echo "";
    echo "Commands:";
    echo "  start            - Start the server";
    echo "  stop             - Stop the server";
    echo "  restart          - Restart the server";
    echo "  status           - Show server status and process info";
    echo "  logs             - Show last 50 lines of server logs";
    echo "  health           - Check API health endpoint";
    echo "  test-email       - Send a test email via contact form";
    echo "  maintenance-on   - Enable maintenance page (503 + static page)";
    echo "  maintenance-off  - Disable maintenance page";
    exit 1;
    ;;
esac
