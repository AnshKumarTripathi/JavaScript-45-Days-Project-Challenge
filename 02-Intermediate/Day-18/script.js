let currentPlayer = "X";
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const cells = document.querySelectorAll(".btn");

cells.forEach((cell, index) => {
  cell.addEventListener("click", () => handleCellClick(index));
});

function handleCellClick(index) {
  if (gameState[index] !== "" || !gameActive) {
    return;
  }

  gameState[index] = currentPlayer;
  cells[index].innerText = currentPlayer;

  if (checkWin()) {
    con;
    alert(`Player ${currentPlayer} wins!`);
    gameActive = false;
    return;
  }

  if (gameState.every((cell) => cell !== "")) {
    alert("It's a draw!");
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  if (currentPlayer === "O") {
    setTimeout(handleComputerMove, 500);
  }
}

function handleComputerMove() {
  let emptyCells = gameState
    .map((cell, index) => (cell === "" ? index : null))
    .filter((index) => index !== null);

  let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];

  gameState[randomIndex] = currentPlayer;
  cells[randomIndex].innerText = currentPlayer;

  if (checkWin()) {
    alert(`Player ${currentPlayer} wins!`);
    gameActive = false;
    return;
  }

  if (gameState.every((cell) => cell !== "")) {
    alert("It's a draw!");
    gameActive = false;
    return;
  }

  currentPlayer = "X";
}

function checkWin() {
  return winningConditions.some((condition) => {
    return condition.every((index) => gameState[index] === currentPlayer);
  });
}

function resetGame() {
  currentPlayer = "X";
  gameActive = true;
  gameState = ["", "", "", "", "", "", "", "", ""];
  cells.forEach((cell) => (cell.innerText = ""));
}

document.getElementById("resetButton").addEventListener("click", resetGame);
