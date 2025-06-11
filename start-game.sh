#!/bin/bash

# Verse Pursuit - Game Launcher Script
# This script starts the development server and optionally opens the browser

echo "🎮 Verse Pursuit - Bible Word Game"
echo "=================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "   Download from: https://nodejs.org/"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install dependencies"
        exit 1
    fi
    echo "✅ Dependencies installed successfully"
    echo ""
fi

# Function to open browser
open_browser() {
    local url="http://localhost:3000"
    echo "🌐 Opening browser..."
    
    # Detect OS and open browser accordingly
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        open "$url"
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Linux
        if command -v xdg-open &> /dev/null; then
            xdg-open "$url"
        elif command -v gnome-open &> /dev/null; then
            gnome-open "$url"
        else
            echo "   Please open $url in your browser"
        fi
    elif [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "cygwin" ]]; then
        # Windows (Git Bash/Cygwin)
        start "$url"
    else
        echo "   Please open $url in your browser"
    fi
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
        exit 1
        ;;
esac