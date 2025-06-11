#!/bin/bash

# Verse Pursuit - Game Launcher Script (macOS .command version)
# This script starts the development server and optionally opens the browser

# Get the directory where this script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
cd "$SCRIPT_DIR"

echo "🎮 Verse Pursuit - Bible Word Game"
echo "=================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "   Download from: https://nodejs.org/"
    read -p "Press any key to exit..."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    read -p "Press any key to exit..."
    exit 1
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install dependencies"
        read -p "Press any key to exit..."
        exit 1
    fi
    echo "✅ Dependencies installed successfully"
    echo ""
fi

# Function to open browser
open_browser() {
    local url="http://localhost:3000"
    echo "🌐 Opening browser..."
    open "$url"
}

# Ask user if they want to open browser
echo "🚀 Starting development server..."
echo ""
echo "Choose an option:"
echo "1) Start server only"
echo "2) Start server and open browser"
echo ""
read -p "Enter your choice (1 or 2): " choice

case $choice in
    1)
        echo "📡 Starting server at http://localhost:3000"
        echo "   Press Ctrl+C to stop the server"
        echo ""
        npm run dev
        ;;
    2)
        echo "📡 Starting server at http://localhost:3000"
        echo "   Press Ctrl+C to stop the server"
        echo ""
        
        # Start server in background
        npm run dev &
        SERVER_PID=$!
        
        # Wait a moment for server to start
        sleep 3
        
        # Open browser
        open_browser
        
        # Wait for server process
        wait $SERVER_PID
        ;;
    *)
        echo "❌ Invalid choice. Please run the script again and choose 1 or 2."
        read -p "Press any key to exit..."
        exit 1
        ;;
esac