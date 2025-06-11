# 🎮 Verse Pursuit - Enhanced Game Launcher

Interactive launcher scripts to run the Verse Pursuit Bible word game with advanced features.

## 🚀 How to Launch the Game

### macOS:
```bash
# Option 1: Run the shell script
./start-game.sh

# Option 2: Double-click the .command file (Recommended)
# Double-click: start-game.command
```

### Linux:
```bash
./start-game.sh
```

### Windows:
```batch
# Double-click the batch file or run from command prompt
start-game.bat
```

## ✨ Enhanced Features

### 🎛️ **Interactive Menu System**
- **Persistent menu** - No need to re-enter choices
- **Colorful interface** with status indicators
- **Multiple options** available in one session

### 🔧 **Menu Options**
1. **🚀 Start server only** - Run development server without browser
2. **🌐 Start server and open browser** - Full launch experience  
3. **🔄 Refresh dependencies** - Clean reinstall of npm packages
4. **🛑 Stop server** - Kill running development server (macOS .command only)
5. **📊 Show detailed status** - Check server and dependency status (macOS .command only)
6. **📂 Open project in Finder** - Quick access to project files (macOS .command only)
7. **🌍 Open live websites** - Launch deployed versions
8. **❌ Exit** - Clean exit from launcher

### 🎯 **Smart Features**
- **✅ Server detection** - Shows if development server is already running
- **🔄 Auto-refresh** - Returns to menu after operations
- **🎨 Color-coded output** - Green (success), Yellow (warning), Red (error)
- **📍 Directory awareness** - Shows current project location
- **🛡️ Error handling** - Graceful handling of common issues

## 🌐 **Live Website Access**

The launcher can open both deployed versions:
- **🔗 Vercel**: https://verse-pursuit-public.vercel.app (Primary)
- **🔗 GitHub Pages**: https://tranquility-pages.github.io/Verse-Pursuit-public/ (Backup)

## 📋 **What the Scripts Do**

1. **✅ System Check**: Verify Node.js and npm are installed with version info
2. **📦 Dependency Management**: Auto-install or refresh node_modules  
3. **🚀 Server Management**: Start, stop, and monitor development server
4. **🌐 Browser Integration**: Automatic browser launching
5. **📊 Status Monitoring**: Real-time server and dependency status
6. **🔄 Interactive Flow**: Persistent menu that doesn't exit after operations

## 🔧 **Manual Alternative**

If the scripts don't work, you can manually run:
```bash
npm install    # First time only
npm run dev    # Start the server
```

Then open http://localhost:3000 in your browser.

## 🎯 **Game Features**

- 474 Bible verses across multiple categories
- Single-player mode with AI opponent  
- Easy and Hard difficulty levels
- Turn-based gameplay with timer
- Hint system and scoring
- Responsive design for all devices
- Complete marketing website with privacy policy
- Mobile app promotion and download links

## 🆕 **New in Enhanced Version**

- **🔄 Persistent interface** - No more re-running scripts
- **🎨 Colored output** for better user experience  
- **📊 Real-time status** indicators
- **🌍 Direct access** to live deployed websites
- **🛡️ Better error handling** and recovery options
- **📂 Project file access** from launcher (macOS)
- **🛑 Server management** tools (start/stop/restart)

Enjoy the enhanced Verse Pursuit development experience! 📖✨🚀