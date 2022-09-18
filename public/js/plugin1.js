function createPluginConnectFour() {
    let plugin = new RoundtablePlugin();

    const COLS = 7;
    const ROWS = 6;

    const RAD = 45;

    if (plugin.data.board === undefined) {
        plugin.data.board = [];
        for (let i = 0; i < COLS; ++i) {
            plugin.data.board.push([]);
        }
    }
    if (plugin.data.turn === undefined) {
        plugin.data.turn = 0;
    }
    if (plugin.data.start === undefined) {
        plugin.data.start = Date.now();
    }
    if (plugin.data.frozen === undefined) {
        plugin.data.frozen = false;
    }

    plugin.getData();

    plugin.addEventListener("broadcast", (data) => {
        plugin.data = data;
    })

    function isDraw() {
        if (isWin() === false) {
            return false;
        }
        for (let i = 0; i < COLS; ++i) {
            if (plugin.data.board[i].length != ROWS) {
                return false;
            }
        }
        return true;
    }

    function isWin() {
        //console.log(plugin.data.board);
        for (let i = 0; i < COLS; ++i) {
            for (let j = 0; j <= plugin.data.board[i].length - 4; ++j) {
                let won = true;
                for (let k = j + 1; k < j + 4; ++k) {
                    if (plugin.data.board[i][k] != plugin.data.board[i][k - 1]) {
                        won = false;
                        break;
                    }
                }
                if (won) {
                    plugin.pg.strokeWeight(20);
                    plugin.pg.stroke(255, 255, 255);
                    let deltaX = (1000.0 - 2 * COLS * RAD) / (COLS + 1);
                    let deltaY = (1000.0 - 2 * ROWS * RAD) / (ROWS + 1);
                    plugin.pg.line(deltaX + RAD + i * (deltaX + 2 * RAD), deltaY + RAD + (ROWS - j - 1) * (deltaY + 2 * RAD), deltaX + RAD + i * (deltaX + 2 * RAD), deltaY + RAD + (ROWS - j - 4) * (deltaY + 2 * RAD));
                    return plugin.data.board[i][j];
                }
            }
        }
        for (let i = 0; i < ROWS; ++i) {
            for (let j = 0; j <= COLS - 4; ++j) {
                let won = true;
                if (i >= plugin.data.board[j].length) {
                    continue;
                }
                for (let k = j + 1; k < j + 4; ++k) {
                    if (i >= plugin.data.board[k].length || plugin.data.board[k][i] != plugin.data.board[k - 1][i]) {
                        won = false;
                        break;
                    }
                }
                if (won) {
                    plugin.pg.strokeWeight(20);
                    plugin.pg.stroke(255, 255, 255);
                    let deltaX = (1000.0 - 2 * COLS * RAD) / (COLS + 1);
                    let deltaY = (1000.0 - 2 * ROWS * RAD) / (ROWS + 1);
                    plugin.pg.line(deltaX + RAD + j * (deltaX + 2 * RAD), deltaY + RAD + (ROWS - i - 1) * (deltaY + 2 * RAD), deltaX + RAD + (j + 3) * (deltaX + 2 * RAD), deltaY + RAD + (ROWS - i - 1) * (deltaY + 2 * RAD));
                    return plugin.data.board[j][i];
                }
            }
        }
        for (let i = 0; i < COLS; ++i) {
            for (let j = 0; j < ROWS; ++j) {
                let won = true;
                for (let k = j + 1; k < j + 4; ++k) {
                    if (i + k - j >= COLS || k >= plugin.data.board[i + k - j].length || plugin.data.board[i + k - j][k] != plugin.data.board[i + k - j - 1][k - 1]) {
                        won = false;
                        break;
                    }
                }
                if (won) {
                    plugin.pg.strokeWeight(20);
                    plugin.pg.stroke(255, 255, 255);
                    let deltaX = (1000.0 - 2 * COLS * RAD) / (COLS + 1);
                    let deltaY = (1000.0 - 2 * ROWS * RAD) / (ROWS + 1);
                    plugin.pg.line(deltaX + RAD + i * (deltaX + 2 * RAD), deltaY + RAD + (ROWS - j - 1) * (deltaY + 2 * RAD), deltaX + RAD + (i + 3) * (deltaX + 2 * RAD), deltaY + RAD + (ROWS - j - 4) * (deltaY + 2 * RAD));
                    return plugin.data.board[i][j];
                }
                won = true;
                for (let k = j - 1; k > j - 4; --k) {
                    if (i - k + j >= COLS || k < 0 || plugin.data.board[i - k + j].length <= k || plugin.data.board[i - k + j][k] != plugin.data.board[i - k + j - 1][k + 1]) {
                        won = false;
                        break;
                    }
                }
                if (won) {
                    plugin.pg.strokeWeight(20);
                    plugin.pg.stroke(255, 255, 255);
                    let deltaX = (1000.0 - 2 * COLS * RAD) / (COLS + 1);
                    let deltaY = (1000.0 - 2 * ROWS * RAD) / (ROWS + 1);
                    plugin.pg.line(deltaX + RAD + i * (deltaX + 2 * RAD), deltaY + RAD + (ROWS - j - 1) * (deltaY + 2 * RAD), deltaX + RAD + (i + 3) * (deltaX + 2 * RAD), deltaY + RAD + (ROWS - j + 2) * (deltaY + 2 * RAD));
                    return plugin.data.board[i][j];
                }
            }
        }
        return false;
    }

    function drawing(mouseX, mouseY, mouseIsPressed, actualW, actualH) {
        plugin.pg.background(32, 42, 68);
        let deltaX = (1000.0 - 2 * COLS * RAD) / (COLS + 1);
        let deltaY = (1000.0 - 2 * ROWS * RAD) / (ROWS + 1);
        plugin.pg.strokeWeight(0);
        for (let i = 0; i < COLS; ++i) {
            let x = deltaX + RAD + i * (deltaX + 2 * RAD);
            for (let j = 0; j < ROWS; ++j) {
                let y = deltaY + RAD + j * (deltaY + 2 * RAD);
                if (ROWS - j - 1 < plugin.data.board[i].length && plugin.data.board[i][ROWS - j - 1] == 0) {
                    plugin.pg.fill(255, 0, 0);
                } else if (ROWS - j - 1 < plugin.data.board[i].length && plugin.data.board[i][ROWS - j - 1] == 1) {
                    plugin.pg.fill(255, 255, 0);
                } else {
                    plugin.pg.fill(255);
                }
                plugin.pg.circle(x, y, RAD * 2);
            }
            isWin(); // to draw lines in case frozen
            plugin.pg.strokeWeight(0);
            if (!plugin.data.frozen && x - RAD - deltaX / 2.0 < mouseX / actualW * 1000 && mouseX / actualW * 1000 < x + RAD + deltaX / 2.0 && plugin.active) {
                if (plugin.data.turn == 0) {
                    plugin.pg.fill(255, 0, 0, 80);
                } else if (plugin.data.turn == 1) {
                    plugin.pg.fill(255, 255, 0, 80);
                }
                plugin.pg.rectMode(plugin.pg.CORNERS);
                plugin.pg.rect(x - RAD - deltaX / 2.0, 0, x + RAD + deltaX / 2.0, 1000);
                if (mouseIsPressed && Date.now() - plugin.data.start >= 300 && plugin.data.board[i].length < ROWS) {
                    plugin.data.start = Date.now();
                    plugin.data.board[i].push(plugin.data.turn);
                    plugin.data.turn = 1 - plugin.data.turn;
                    if (isDraw()) {
                        plugin.data.frozen = true;
                    } else if (isWin() !== false) {
                        plugin.data.frozen = true;
                    }
                    plugin.setData();
                }
            }
        }
    }

    plugin.pgDraw = drawing;

    addPlugin(plugin, "connect4_" + Date.now());
}