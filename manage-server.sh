#!/bin/bash
# Server management script for production
# Usage: ./manage-server.sh [start|stop|restart|status|logs]

SSH_KEY=".github/deploy_key_rsa"
REMOTE_USER="ftp6887902"
REMOTE_HOST="www93.world4you.com"
REMOTE_PORT="22"
REMOTE_PATH="/home/.sites/872/site6887902/speakersite2"

case "$1" in
  start)
    echo "🚀 Starting server..."
    ssh -i "$SSH_KEY" -p "$REMOTE_PORT" "$REMOTE_USER@$REMOTE_HOST" \
      "cd $REMOTE_PATH && nohup node server/index.js > server.log 2>&1 & echo \"Server started, PID: \$!\""
    echo ""
    echo "✅ Server started. Check status with: ./manage-server.sh status"
    ;;
    
  stop)
    echo "🛑 Stopping server..."
    ssh -i "$SSH_KEY" -p "$REMOTE_PORT" "$REMOTE_USER@$REMOTE_HOST" \
      "pkill -f 'node server/index.js' && echo 'Server stopped' || echo 'No server process found'"
    ;;
    
  restart)
    echo "🔄 Restarting server..."
    $0 stop
    sleep 2
    $0 start
    sleep 3
    $0 status
    ;;
    
  status)
    echo "📊 Server status:"
    echo "================"
    ssh -i "$SSH_KEY" -p "$REMOTE_PORT" "$REMOTE_USER@$REMOTE_HOST" \
      "ps aux | grep '[n]ode server/index.js' && echo '---' && curl -sS http://localhost:5001/api/health || echo 'Server not responding'"
    ;;
    
  logs)
    echo "📋 Server logs (last 50 lines):"
    echo "==============================="
    ssh -i "$SSH_KEY" -p "$REMOTE_PORT" "$REMOTE_USER@$REMOTE_HOST" \
      "cd $REMOTE_PATH && tail -50 server.log"
    ;;
    
  health)
    echo "🏥 Health check:"
    ssh -i "$SSH_KEY" -p "$REMOTE_PORT" "$REMOTE_USER@$REMOTE_HOST" \
      "curl -sS http://localhost:5001/api/health"
    echo ""
    ;;
    
  test-email)
    echo "📧 Testing contact form..."
    ssh -i "$SSH_KEY" -p "$REMOTE_PORT" "$REMOTE_USER@$REMOTE_HOST" \
      'curl -X POST http://localhost:5001/api/contact -H "Content-Type: application/json" -d "{\"name\":\"Test User\",\"email\":\"test@example.com\",\"subject\":\"Test\",\"message\":\"Test message from manage-server script\"}"'
    echo ""
    echo "✅ Check philipp@philyourvoice.at for the test email"
    ;;
    
  *)
    echo "Usage: $0 {start|stop|restart|status|logs|health|test-email}"
    echo ""
    echo "Commands:"
    echo "  start       - Start the server"
    echo "  stop        - Stop the server"
    echo "  restart     - Restart the server"
    echo "  status      - Show server status and process info"
    echo "  logs        - Show last 50 lines of server logs"
    echo "  health      - Check API health endpoint"
    echo "  test-email  - Send a test email via contact form"
    exit 1
    ;;
esac
