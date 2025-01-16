document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll("[data-cell]");
    const winningMessage = document.querySelector("[data-winning-message]");
    const winningMessageText = winningMessage.querySelector("p");
    const restartButton = document.querySelector(".winning-message button");
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    let board = ["", "", "", "", "", "", "", "", ""];
    let player = "X";
    let gameActive = true;

    function handleCellPlayed(clickedCell, clickedCellIndex) {
        board[clickedCellIndex] = player;
        clickedCell.textContent = player;
    }

    function handlePlayerChange() {
        player = player === "X" ? "O" : "X";
    }

    function checkWinner() {
        for (let condition of winConditions) {
            const [a, b, c] = condition;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return true;
            }
        }
        return false;
    }

    function checkDraw() {
        return board.every(cell => cell !== "");
    }

    function handleResultValidation() {
        if (checkWinner()) {
            gameActive = false;
            winningMessageText.textContent = `${player} Wins!`;
            winningMessage.classList.add("won");
        } else if (checkDraw()) {
            gameActive = false;
            winningMessageText.textContent = "Draw!";
            winningMessage.classList.add("won");
        } else {
            handlePlayerChange();
        }
    }

    function handleCellClick(event) {
        const clickedCell = event.target;
        const clickedCellIndex = Array.from(cells).indexOf(clickedCell);

        if (board[clickedCellIndex] !== "" || !gameActive) {
            return;
        }

        handleCellPlayed(clickedCell, clickedCellIndex);
        handleResultValidation();
    }

    function restartGame() {
        
        board = ["", "", "", "", "", "", "", "", ""];
        player = "X";
        gameActive = true;

        
        
        winningMessageText.textContent = "";

        
        cells.forEach(cell => {
            cell.textContent = "";
        });
    }

    cells.forEach(cell => {
        cell.addEventListener("click", handleCellClick);
    });

    restartButton.addEventListener("click", restartGame);
});






