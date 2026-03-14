# 2048

A browser-based implementation of the popular 2048 puzzle game.

**Live Demo:** https://lukec404.github.io/2048/

## How to Play

Use arrow keys or WASD to move tiles:
- **Arrow Left / A** - Slide all tiles left
- **Arrow Right / D** - Slide all tiles right
- **Arrow Up / W** - Slide all tiles up
- **Arrow Down / S** - Slide all tiles down

When two tiles with the same number collide, they merge. Reach 2048 to win!

## Running the Game

Simply open `index.html` in your browser.

## Project Structure

```
├── index.html           - Main HTML file
├── style.css           - Styling
├── scripts/
│   ├── main.js         - Entry point, wires components together
│   ├── game-logic.js   - Pure game logic (movement, merging, game state)
│   ├── renderer.js     - DOM rendering (board, tiles, score)
│   └── input-handler.js - Keyboard input handling
└── README.md           - This file
```

## Features

- Arrow keys and WASD support
- Dark/light theme toggle
- Score tracking
- Auto-restart on game over