@echo off
title Verse Pursuit - Enhanced Game Launcher

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
) else (
    for /f "tokens=*" %%a in ('node --version') do echo ✅ Node.js %%a found
)

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not installed. Please install npm first.
    pause
    exit /b 1
) else (
    for /f "tokens=*" %%a in ('npm --version') do echo ✅ npm %%a found
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
) else (
    echo ✅ Dependencies already installed
)

:menu
echo.
echo Choose an option:
echo 1^) 🚀 Start server only
echo 2^) 🌐 Start server and open browser
echo 3^) 🔄 Refresh dependencies (npm install)
echo 4^) 🌍 Open live websites
echo 5^) ❌ Exit
echo.
set /p choice="Enter your choice (1-5): "

if "%choice%"=="1" (
    echo 📡 Starting server at http://localhost:3000
    echo    Press Ctrl+C to stop the server
    echo.
    npm run dev
    goto menu
) else if "%choice%"=="2" (
    echo 📡 Starting server at http://localhost:3000
    echo    Press Ctrl+C to stop the server
    echo.
    
    REM Start server in background
    start /b npm run dev
    
    REM Wait a moment for server to start
    timeout /t 4 /nobreak >nul
    
    REM Open browser
    echo 🌐 Opening browser...
    start http://localhost:3000
    
    REM Keep window open
    echo.
    echo Server is running. Press any key to stop...
    pause >nul
    
    REM Kill any Node.js processes
    taskkill /f /im node.exe >nul 2>&1
    goto menu
) else if "%choice%"=="3" (
    echo 🔄 Refreshing dependencies...
    echo    Removing old node_modules...
    if exist "node_modules" rmdir /s /q "node_modules"
    if exist "package-lock.json" del "package-lock.json"
    echo    Installing fresh dependencies...
    npm install
    if %errorlevel% neq 0 (
        echo ❌ Failed to refresh dependencies
        pause
    ) else (
        echo ✅ Dependencies refreshed successfully
    )
    goto menu
) else if "%choice%"=="4" (
    echo 🌍 Opening live websites...
    echo    🔗 Vercel: https://verse-pursuit-public.vercel.app
    echo    🔗 GitHub Pages: https://tranquility-pages.github.io/Verse-Pursuit-public/
    start https://verse-pursuit-public.vercel.app
    timeout /t 1 /nobreak >nul
    start https://tranquility-pages.github.io/Verse-Pursuit-public/
    echo.
    pause
    goto menu
) else if "%choice%"=="5" (
    echo 👋 Thanks for using Verse Pursuit!
    echo    Don't forget to support the project! 💖
    pause
    exit /b 0
) else (
    echo ❌ Invalid choice. Please select 1-5.
    timeout /t 2 /nobreak >nul
    goto menu
)