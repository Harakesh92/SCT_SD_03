const gridElement = document.getElementById("sudoku-grid");
const message = document.getElementById("message");

// Create 81 input cells
for (let i = 0; i < 81; i++) {
    const input = document.createElement("input");

    input.type = "number";
    input.min = "1";
    input.max = "9";
    input.classList.add("cell");

    gridElement.appendChild(input);
}

// Read Sudoku grid
function getGrid() {
    const cells = document.querySelectorAll(".cell");
    const grid = [];

    for (let row = 0; row < 9; row++) {
        grid[row] = [];

        for (let col = 0; col < 9; col++) {
            const value = cells[row * 9 + col].value;

            grid[row][col] = value === "" ? 0 : Number(value);
        }
    }

    return grid;
}

// Check whether a number can be placed
function isValid(grid, row, col, num) {

    // Check row
    for (let x = 0; x < 9; x++) {
        if (grid[row][x] === num) {
            return false;
        }
    }

    // Check column
    for (let x = 0; x < 9; x++) {
        if (grid[x][col] === num) {
            return false;
        }
    }

    // Check 3x3 box
    const startRow = row - row % 3;
    const startCol = col - col % 3;

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (grid[startRow + i][startCol + j] === num) {
                return false;
            }
        }
    }

    return true;
}

// Backtracking algorithm
function solve(grid) {

    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {

            if (grid[row][col] === 0) {

                for (let num = 1; num <= 9; num++) {

                    if (isValid(grid, row, col, num)) {

                        grid[row][col] = num;

                        if (solve(grid)) {
                            return true;
                        }

                        grid[row][col] = 0;
                    }
                }

                return false;
            }
        }
    }

    return true;
}

// Solve button
function solveSudoku() {

    const grid = getGrid();

    if (solve(grid)) {

        const cells = document.querySelectorAll(".cell");

        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                cells[row * 9 + col].value = grid[row][col];
            }
        }

        message.textContent = "✅ Sudoku solved successfully!";
    } else {
        message.textContent = "❌ No solution exists for this puzzle.";
    }
}

// Clear button
function clearGrid() {

    const cells = document.querySelectorAll(".cell");

    cells.forEach(cell => {
        cell.value = "";
    });

    message.textContent = "";
}