#!/bin/bash
echo "🚀 Starting LearnStream Services..."

# Start services in background
(cd services/auth && npm start) &
sleep 2

(cd services/user && npm start) &
sleep 2

(cd services/course && npm start) &
sleep 2

(cd services/content && npm start) &
sleep 2

(cd services/activity && npm start) &
sleep 2

(cd services/notification && npm start) &
sleep 2

# Start gateway last
(cd services/gateway && npm start) &

echo -e "\n✨ All services started!"
echo "🌐 Gateway: http://localhost:4000"
echo "📊 Service Status:"
echo "   Auth         http://localhost:4001/health"
echo "   User         http://localhost:4002/health"
echo "   Course       http://localhost:4003/health"
echo "   Content      http://localhost:4004/health"
echo "   Activity     http://localhost:4005/health"
echo "   Notification http://localhost:4006/health"
echo "   Gateway      http://localhost:4000/health"

# Keep script running
wait