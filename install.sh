#!/bin/bash

# Emergency-Mind Installation Script
echo "🚀 Installing Emergency-Mind..."

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install
cd ..

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend
npm install
cd ..

echo "✅ Installation complete!"
echo ""
echo "To start the application:"
echo "  npm run dev"
echo ""
echo "Or start components separately:"
echo "  Backend:  npm run dev:backend"
echo "  Frontend: npm run dev:frontend"
echo ""
echo "Access the application at:"
echo "  Frontend: http://localhost:3000"
echo "  Backend:  http://localhost:3001"



