const Game = {
    board: [],
    score: 0,
    rows: 4,
    columns: 4,
    hasChanged: false,

    init() {
        this.board = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];
        this.score = 0;
        this.hasChanged = false;
    },

    getBoard() {
        return this.board.map(row => [...row]);
    },

    getScore() {
        return this.score;
    },

    hasEmptyTile() {
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.columns; c++) {
                if (this.board[r][c] === 0) return true;
            }
        }
        return false;
    },

    filterZero(row) {
        return row.filter(num => num !== 0);
    },

    slide(row) {
        row = this.filterZero(row);

        for (let i = 0; i < row.length - 1; i++) {
            if (row[i] === row[i + 1]) {
                row[i] *= 2;
                row[i + 1] = 0;
                this.score += row[i];
            }
        }

        row = this.filterZero(row);

        while (row.length < this.columns) {
            row.push(0);
        }
        return row;
    },

    moveLeft() {
        this.hasChanged = false;
        for (let r = 0; r < this.rows; r++) {
            let row = this.board[r];
            let newRow = this.slide([...row]);
            if (row.toString() !== newRow.toString()) {
                this.hasChanged = true;
            }
            this.board[r] = newRow;
        }
        return this.hasChanged;
    },

    moveRight() {
        this.hasChanged = false;
        for (let r = 0; r < this.rows; r++) {
            let row = [...this.board[r]].reverse();
            let newRow = this.slide(row);
            newRow.reverse();
            let original = this.board[r].toString();
            if (original !== newRow.toString()) {
                this.hasChanged = true;
            }
            this.board[r] = newRow;
        }
        return this.hasChanged;
    },

    moveUp() {
        this.hasChanged = false;
        for (let c = 0; c < this.columns; c++) {
            let row = [this.board[0][c], this.board[1][c], this.board[2][c], this.board[3][c]];
            let newRow = this.slide([...row]);
            let original = this.board.map(r => r[c]).toString();
            if (original !== newRow.toString()) {
                this.hasChanged = true;
            }
            for (let r = 0; r < this.rows; r++) {
                this.board[r][c] = newRow[r];
            }
        }
        return this.hasChanged;
    },

    moveDown() {
        this.hasChanged = false;
        for (let c = 0; c < this.columns; c++) {
            let row = [this.board[0][c], this.board[1][c], this.board[2][c], this.board[3][c]];
            row.reverse();
            let newRow = this.slide(row);
            newRow.reverse();
            let original = this.board.map(r => r[c]).toString();
            if (original !== newRow.toString()) {
                this.hasChanged = true;
            }
            for (let r = 0; r < this.rows; r++) {
                this.board[r][c] = newRow[r];
            }
        }
        return this.hasChanged;
    },

    spawnTile() {
        if (!this.hasEmptyTile()) return false;

        let found = false;
        while (!found) {
            let r = Math.floor(Math.random() * this.rows);
            let c = Math.floor(Math.random() * this.columns);
            if (this.board[r][c] === 0) {
                this.board[r][c] = 2;
                found = true;
                return { r, c };
            }
        }
        return false;
    },

    isGameOver() {
        if (this.hasEmptyTile()) return false;

        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.columns; c++) {
                let val = this.board[r][c];
                if (r + 1 < this.rows && this.board[r + 1][c] === val) return false;
                if (c + 1 < this.columns && this.board[r][c + 1] === val) return false;
            }
        }
        return true;
    }
};