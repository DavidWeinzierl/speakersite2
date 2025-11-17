#!/bin/bash
# Helper script to start dev servers in the correct order
# Usage: ./start-dev.sh

set -e

echo "🧹 Cleaning up any existing processes..."
pkill -9 -f 'node server/index.js' 2>/dev/null || true
pkill -9 -f 'react-scripts start' 2>/dev/null || true
lsof -nP -iTCP:5001 -sTCP:LISTEN | awk 'NR>1 {print $2}' | xargs kill -9 2>/dev/null || true
lsof -nP -iTCP:3000 -sTCP:LISTEN | awk 'NR>1 {print $2}' | xargs kill -9 2>/dev/null || true

echo "⏳ Waiting for ports to free..."
sleep 2

echo "🚀 Starting Express server on port 5001..."
node server/index.js > server.log 2>&1 &
SERVER_PID=$!
echo "   Server PID: $SERVER_PID"

echo "⏳ Waiting for server to initialize..."
sleep 3

echo "🚀 Starting React dev server on port 3000..."
PORT=3000 DANGEROUSLY_DISABLE_HOST_CHECK=true npm start > react.log 2>&1 &
REACT_PID=$!
echo "   React PID: $REACT_PID"

echo "⏳ Waiting for React to compile..."
sleep 15

echo ""
echo "✅ Checking servers..."
if curl -sS http://localhost:5001/api/health > /dev/null 2>&1; then
  echo "   ✅ API server running: http://localhost:5001"
else
  echo "   ❌ API server failed to start"
  exit 1
fi

if curl -sS http://localhost:3000 > /dev/null 2>&1; then
  echo "   ✅ React dev server running: http://localhost:3000"
else
  echo "   ❌ React dev server failed to start"
  exit 1
fi

echo ""
echo "🎉 Both servers are running!"
echo ""
echo "   Frontend: http://localhost:3000"
echo "   API:      http://localhost:5001"
echo ""
echo "📋 Server logs:"
echo "   API:   tail -f server.log"
echo "   React: tail -f react.log"
echo ""
echo "🛑 To stop servers:"
echo "   kill $SERVER_PID $REACT_PID"
echo "   or run: pkill -f 'node server/index.js' && pkill -f 'react-scripts'"
echo ""
