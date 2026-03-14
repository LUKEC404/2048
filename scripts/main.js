function getTheme() {
    let cookies = document.cookie.split(";");
    for (let c of cookies) {
        let [key, value] = c.trim().split("=");
        if (key === "theme") return value;
    }
    return "light";
}

function initTheme() {
    let theme = document.cookie;
    if (theme !== "light" && theme !== "dark") {
        theme = "light";
    }
    document.documentElement.setAttribute("data-theme", theme);

    DarkModeButton.addEventListener("click", () => {
        let theme = getTheme();
        document.documentElement.setAttribute("data-theme", theme);
        if (theme === "light") {
            icon.classList.remove("fa-sun");
            icon.classList.add("fa-moon");
        } else {
            icon.classList.remove("fa-moon");
            icon.classList.add("fa-sun");
        }
    });
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

        if (Game.isGameOver()) {
            Renderer.showGameOver();
        }
    }

    return moved;
}

window.onload = function () {
    initTheme();

    Game.init();
    Renderer.init();

    Game.spawnTile();
    Game.spawnTile();
    Renderer.renderBoard(Game.board);
    Renderer.updateScore(Game.getScore());

    InputHandler.init(handleMove);
};