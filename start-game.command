#!/bin/bash

# Verse Pursuit - Enhanced Game Launcher Script (macOS .command version)
# This script provides an interactive menu for running the development server

# Get the directory where this script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
cd "$SCRIPT_DIR"

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

# Function to print header
print_header() {
    clear
    print_color $PURPLE "🎮 Verse Pursuit - Bible Word Game"
    print_color $PURPLE "=================================="
    echo ""
    print_color $CYAN "📍 Project Directory: $(pwd)"
    echo ""
}

# Function to check system requirements
check_requirements() {
    local all_good=true
    
    # Check Node.js
    if ! command -v node &> /dev/null; then
        print_color $RED "❌ Node.js is not installed."
        echo "   Download from: https://nodejs.org/"
        all_good=false
    else
        print_color $GREEN "✅ Node.js $(node --version) found"
    fi
    
    # Check npm
    if ! command -v npm &> /dev/null; then
        print_color $RED "❌ npm is not installed."
        all_good=false
    else
        print_color $GREEN "✅ npm $(npm --version) found"
    fi
    
    if [ "$all_good" = false ]; then
        echo ""
        read -p "Press any key to exit..."
        exit 1
    fi
    
    echo ""
}

# Function to check and install dependencies
check_dependencies() {
    if [ ! -d "node_modules" ]; then
        print_color $YELLOW "📦 Installing dependencies..."
        npm install
        if [ $? -ne 0 ]; then
            print_color $RED "❌ Failed to install dependencies"
            read -p "Press any key to exit..."
            exit 1
        fi
        print_color $GREEN "✅ Dependencies installed successfully"
        echo ""
    else
        print_color $GREEN "✅ Dependencies already installed"
        echo ""
    fi
}

# Function to refresh dependencies
refresh_dependencies() {
    print_color $YELLOW "🔄 Refreshing dependencies..."
    echo "   Removing old node_modules..."
    rm -rf node_modules package-lock.json
    echo "   Installing fresh dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        print_color $RED "❌ Failed to refresh dependencies"
        read -p "Press any key to continue..."
        return 1
    fi
    print_color $GREEN "✅ Dependencies refreshed successfully"
    echo ""
}

# Function to open browser
open_browser() {
    local url="http://localhost:3000"
    print_color $BLUE "🌐 Opening browser at $url..."
    sleep 1
    open "$url"
}

# Function to check if server is running
check_server() {
    if lsof -ti:3000 >/dev/null 2>&1; then
        return 0  # Server is running
    else
        return 1  # Server is not running
    fi
}

# Function to stop server
stop_server() {
    local pids=$(lsof -ti:3000)
    if [ ! -z "$pids" ]; then
        print_color $YELLOW "🛑 Stopping existing server on port 3000..."
        echo "$pids" | xargs kill -9
        sleep 2
        print_color $GREEN "✅ Server stopped"
    fi
}

# Function to start server
start_server() {
    local open_browser_flag=$1
    
    # Check if server is already running
    if check_server; then
        print_color $YELLOW "⚠️  Server is already running on port 3000"
        echo ""
        echo "Choose an option:"
        echo "1) Open browser to existing server"
        echo "2) Stop and restart server"
        echo "3) Return to main menu"
        echo ""
        read -p "Enter your choice (1-3): " server_choice
        
        case $server_choice in
            1)
                open_browser
                return 0
                ;;
            2)
                stop_server
                echo ""
                ;;
            3)
                return 0
                ;;
            *)
                print_color $RED "❌ Invalid choice"
                sleep 1
                return 1
                ;;
        esac
    fi
    
    print_color $BLUE "🚀 Starting development server..."
    echo "   Server will be available at: http://localhost:3000"
    echo "   Press Ctrl+C to stop the server"
    echo ""
    
    if [ "$open_browser_flag" = "true" ]; then
        # Start server in background and open browser
        npm run dev &
        SERVER_PID=$!
        
        # Wait for server to start
        echo "   Waiting for server to start..."
        sleep 4
        
        # Open browser
        open_browser
        
        # Wait for server process
        wait $SERVER_PID
    else
        # Start server in foreground
        npm run dev
    fi
}

# Function to show status
show_status() {
    print_color $CYAN "📊 Current Status:"
    echo ""
    
    # Check server status
    if check_server; then
        print_color $GREEN "✅ Development server is running on port 3000"
        echo "   🌐 Available at: http://localhost:3000"
    else
        print_color $YELLOW "⏸️  Development server is not running"
    fi
    
    # Check dependencies
    if [ -d "node_modules" ]; then
        print_color $GREEN "✅ Dependencies are installed"
    else
        print_color $YELLOW "⚠️  Dependencies need to be installed"
    fi
    
    echo ""
    read -p "Press any key to continue..."
}

# Main menu function
show_menu() {
    while true; do
        print_header
        
        # Show current status briefly
        if check_server; then
            print_color $GREEN "🟢 Server Status: Running on port 3000"
        else
            print_color $YELLOW "🔴 Server Status: Stopped"
        fi
        echo ""
        
        print_color $CYAN "Choose an option:"
        echo "1) 🚀 Start server only"
        echo "2) 🌐 Start server and open browser"
        echo "3) 🔄 Refresh dependencies (npm install)"
        echo "4) 🛑 Stop server"
        echo "5) 📊 Show detailed status"
        echo "6) 📂 Open project in Finder"
        echo "7) 🌍 Open live websites"
        echo "8) ❌ Exit"
        echo ""
        
        read -p "Enter your choice (1-8): " choice
        echo ""
        
        case $choice in
            1)
                start_server false
                ;;
            2)
                start_server true
                ;;
            3)
                refresh_dependencies
                read -p "Press any key to continue..."
                ;;
            4)
                stop_server
                read -p "Press any key to continue..."
                ;;
            5)
                show_status
                ;;
            6)
                print_color $BLUE "📂 Opening project directory in Finder..."
                open .
                ;;
            7)
                print_color $BLUE "🌍 Opening live websites..."
                echo "   🔗 Vercel: https://verse-pursuit-public.vercel.app"
                echo "   🔗 GitHub Pages: https://tranquility-pages.github.io/Verse-Pursuit-public/"
                open "https://verse-pursuit-public.vercel.app"
                sleep 1
                open "https://tranquility-pages.github.io/Verse-Pursuit-public/"
                read -p "Press any key to continue..."
                ;;
            8)
                print_color $GREEN "👋 Thanks for using Verse Pursuit!"
                print_color $CYAN "   Don't forget to support the project! 💖"
                exit 0
                ;;
            *)
                print_color $RED "❌ Invalid choice. Please select 1-8."
                sleep 1
                ;;
        esac
    done
}

# Main execution
main() {
    print_header
    check_requirements
    check_dependencies
    show_menu
}

# Trap Ctrl+C to clean exit
trap 'echo ""; print_color $YELLOW "👋 Goodbye!"; exit 0' INT

# Run main function
main