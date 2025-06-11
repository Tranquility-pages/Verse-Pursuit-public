#!/bin/bash

# Verse Pursuit - Enhanced Game Launcher Script (Linux/macOS)
# This script provides an interactive menu for running the development server

# Colors for better UI
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Function to print colored text
print_color() {
    echo -e "${1}${2}${NC}"
}

echo "🎮 Verse Pursuit - Bible Word Game"
echo "=================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_color $RED "❌ Node.js is not installed. Please install Node.js first."
    echo "   Download from: https://nodejs.org/"
    exit 1
else
    print_color $GREEN "✅ Node.js $(node --version) found"
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    print_color $RED "❌ npm is not installed. Please install npm first."
    exit 1
else
    print_color $GREEN "✅ npm $(npm --version) found"
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    print_color $YELLOW "📦 Installing dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        print_color $RED "❌ Failed to install dependencies"
        exit 1
    fi
    print_color $GREEN "✅ Dependencies installed successfully"
    echo ""
else
    print_color $GREEN "✅ Dependencies already installed"
fi

# Function to refresh dependencies
refresh_dependencies() {
    print_color $YELLOW "🔄 Refreshing dependencies..."
    echo "   Removing old node_modules..."
    rm -rf node_modules package-lock.json
    echo "   Installing fresh dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        print_color $RED "❌ Failed to refresh dependencies"
        return 1
    fi
    print_color $GREEN "✅ Dependencies refreshed successfully"
    echo ""
}

# Function to open browser
open_browser() {
    local url="http://localhost:3000"
    print_color $BLUE "🌐 Opening browser at $url..."
    
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

# Interactive menu
while true; do
    echo ""
    print_color $CYAN "Choose an option:"
    echo "1) 🚀 Start server only"
    echo "2) 🌐 Start server and open browser" 
    echo "3) 🔄 Refresh dependencies (npm install)"
    echo "4) 🌍 Open live websites"
    echo "5) ❌ Exit"
    echo ""
    read -p "Enter your choice (1-5): " choice
    
    case $choice in
        1)
            print_color $BLUE "📡 Starting server at http://localhost:3000"
            echo "   Press Ctrl+C to stop the server"
            echo ""
            npm run dev
            ;;
        2)
            print_color $BLUE "📡 Starting server at http://localhost:3000"
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
        3)
            refresh_dependencies
            ;;
        4)
            print_color $BLUE "🌍 Opening live websites..."
            echo "   🔗 Vercel: https://verse-pursuit-public.vercel.app"
            echo "   🔗 GitHub Pages: https://tranquility-pages.github.io/Verse-Pursuit-public/"
            
            # Try to open both sites
            if [[ "$OSTYPE" == "darwin"* ]]; then
                open "https://verse-pursuit-public.vercel.app"
                sleep 1
                open "https://tranquility-pages.github.io/Verse-Pursuit-public/"
            else
                echo "   Please open these URLs in your browser"
            fi
            ;;
        5)
            print_color $GREEN "👋 Thanks for using Verse Pursuit!"
            print_color $CYAN "   Don't forget to support the project! 💖"
            exit 0
            ;;
        *)
            print_color $RED "❌ Invalid choice. Please select 1-5."
            ;;
    esac
done