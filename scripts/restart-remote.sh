#!/bin/bash
# Simple remote restart script
cd /home/.sites/872/site6887902/speakersite2

# Kill existing processes
for pid in $(ps ax | grep 'node server/index.js' | grep -v grep | awk '{print $1}'); do
  echo "Killing PID: $pid"
  kill $pid 2>/dev/null || true
done

sleep 2

# Start server
nohup node server/index.js > server.log 2>&1 &
NEW_PID=$!
echo "Server started with PID: $NEW_PID"

sleep 2

# Test
curl -s http://localhost:5001/api/health || echo "Health check failed"
