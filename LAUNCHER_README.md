# 🎮 Verse Pursuit - Game Launcher

Quick start scripts to launch the Verse Pursuit Bible word game.

## 🚀 How to Launch the Game

### macOS / Linux:
```bash
# Option 1: Run the shell script
./start-game.sh

# Option 2: Double-click the .command file (macOS only)
# Double-click: start-game.command
```

### Windows:
```batch
# Double-click the batch file or run from command prompt
start-game.bat
```

## 📋 What the Scripts Do

1. **Check Prerequisites**: Verify Node.js and npm are installed
2. **Install Dependencies**: Run `npm install` if node_modules doesn't exist
3. **Launch Options**:
   - **Option 1**: Start development server only (http://localhost:3000)
   - **Option 2**: Start server AND automatically open your browser

## 🔧 Manual Alternative

If the scripts don't work, you can manually run:
```bash
npm install    # First time only
npm run dev    # Start the server
```

Then open http://localhost:3000 in your browser.

## 🎯 Game Features

- 474 Bible verses across multiple categories
- Single-player mode with AI opponent
- Easy and Hard difficulty levels
- Turn-based gameplay with timer
- Hint system and scoring
- Responsive design for all devices

Enjoy playing Verse Pursuit! 📖✨