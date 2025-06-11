@echo off
title Verse Pursuit - Bible Word Game

echo 🎮 Verse Pursuit - Bible Word Game
echo ==================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    echo    Download from: https://nodejs.org/
    pause
    exit /b 1
)

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not installed. Please install npm first.
    pause
    exit /b 1
)

REM Check if node_modules exists
if not exist "node_modules" (
    echo 📦 Installing dependencies...
    npm install
    if %errorlevel% neq 0 (
        echo ❌ Failed to install dependencies
        pause
        exit /b 1
    )
    echo ✅ Dependencies installed successfully
    echo.
)

echo 🚀 Starting development server...
echo.
echo Choose an option:
echo 1^) Start server only
echo 2^) Start server and open browser
echo.
set /p choice="Enter your choice (1 or 2): "

if "%choice%"=="1" (
    echo 📡 Starting server at http://localhost:3000
    echo    Press Ctrl+C to stop the server
    echo.
    npm run dev
) else if "%choice%"=="2" (
    echo 📡 Starting server at http://localhost:3000
    echo    Press Ctrl+C to stop the server
    echo.
    
    REM Start server in background
    start /b npm run dev
    
    REM Wait a moment for server to start
    timeout /t 3 /nobreak >nul
    
    REM Open browser
    echo 🌐 Opening browser...
    start http://localhost:3000
    
    REM Keep window open
    echo.
    echo Server is running. Press any key to stop...
    pause >nul
    
    REM Kill any Node.js processes (simple approach)
    taskkill /f /im node.exe >nul 2>&1
) else (
    echo ❌ Invalid choice. Please run the script again and choose 1 or 2.
    pause
    exit /b 1
)