const Renderer = {
    boardElement: null,
    scoreElement: null,

    init() {
        this.boardElement = document.getElementById("board");
        this.scoreElement = document.getElementById("score");
    },

    clearBoard() {
        this.boardElement.innerHTML = "";
    },

    renderBoard(board) {
        this.clearBoard();
        for (let r = 0; r < board.length; r++) {
            for (let c = 0; c < board[r].length; c++) {
                let tile = document.createElement("div");
                tile.id = `${r}-${c}`;
                this.updateTile(tile, board[r][c]);
                this.boardElement.append(tile);
            }
        }
    },

    updateTile(tile, num) {
        tile.innerText = "";
        tile.className = "tile";
        if (num > 0) {
            tile.innerText = num;
            if (num <= 4096) {
                tile.classList.add(`x${num}`);
            } else {
                tile.classList.add("x8192");
            }
        }
    },

    renderMove(board) {
        for (let r = 0; r < board.length; r++) {
            for (let c = 0; c < board[r].length; c++) {
                let tile = document.getElementById(`${r}-${c}`);
                this.updateTile(tile, board[r][c]);
            }
        }
    },

    updateScore(score) {
        this.scoreElement.innerText = score;
    },

    showGameOver() {
        setTimeout(() => {
            let restart = confirm("Game Over! Play again?");
            if (restart) {
                window.location.reload();
            }
        }, 100);
    }
};