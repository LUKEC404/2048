const Storage = {
    saveGame(board, score) {
        localStorage.setItem("board", JSON.stringify(board));
        localStorage.setItem("score", score.toString());
    },

    loadGame() {
        let savedBoard = localStorage.getItem("board");
        let savedScore = localStorage.getItem("score");
        if (savedBoard && savedScore) {
            return {
                board: JSON.parse(savedBoard),
                score: parseInt(savedScore)
            };
        }
        return null;
    },

    saveHighScore(score) {
        let currentHigh = localStorage.getItem("highscore") || 0;
        if (score > parseInt(currentHigh)) {
            localStorage.setItem("highscore", score.toString());
        }
    },

    getHighScore() {
        return parseInt(localStorage.getItem("highscore")) || 0;
    },

    clearGame() {
        localStorage.removeItem("board");
        localStorage.removeItem("score");
    }
};

function getTheme() {
    let cookies = document.cookie.split(";");
    for (let c of cookies) {
        let [key, value] = c.trim().split("=");
        if (key === "theme") return value;
    }
    return "light";
}

function initTheme() {
    let theme = getTheme();
    document.documentElement.setAttribute("data-theme", theme);
    updateThemeIcon(theme);

    DarkModeButton.addEventListener("click", () => {
        let current = getTheme();
        let newTheme = current === "light" ? "dark" : "light";
        document.cookie = "theme=" + newTheme;
        document.documentElement.setAttribute("data-theme", newTheme);
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    if (theme === "light") {
        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");
    } else {
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");
    }
}

function handleMove(direction) {
    let moved = false;

    if (direction === "left") {
        moved = Game.moveLeft();
    } else if (direction === "right") {
        moved = Game.moveRight();
    } else if (direction === "up") {
        moved = Game.moveUp();
    } else if (direction === "down") {
        moved = Game.moveDown();
    }

    if (moved) {
        Game.spawnTile();
        Renderer.renderMove(Game.board);
        Renderer.updateScore(Game.getScore());
        Storage.saveGame(Game.board, Game.getScore());

        if (Game.isGameOver()) {
            Storage.saveHighScore(Game.getScore());
            Renderer.updateHighScore(Storage.getHighScore());
            Renderer.showGameOver(Game.getScore());
            Storage.clearGame();
        }
    }

    return moved;
}

function resetGame() {
    Storage.clearGame();
    Game.init();
    Game.spawnTile();
    Game.spawnTile();
    Renderer.renderBoard(Game.board);
    Renderer.updateScore(Game.getScore());
    Renderer.hideGameOver();
    Storage.saveGame(Game.board, Game.getScore());
}

window.onload = function () {
    initTheme();

    let savedGame = Storage.loadGame();
    Game.init();
    Renderer.init();

    if (savedGame) {
        Game.loadBoard(savedGame.board, savedGame.score);
        Renderer.renderBoard(Game.board);
    } else {
        Game.spawnTile();
        Game.spawnTile();
        Renderer.renderBoard(Game.board);
    }

    Renderer.updateScore(Game.getScore());
    Renderer.updateHighScore(Storage.getHighScore());

    ResetButton.addEventListener("click", resetGame);
    TryAgainButton.addEventListener("click", resetGame);

    InputHandler.init(handleMove);
};