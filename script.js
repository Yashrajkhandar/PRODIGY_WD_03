let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;
let mode = "2p"; 
const winningCombos = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");

document.querySelectorAll("input[name='mode']").forEach(input => {
  input.addEventListener("change", e => {
    mode = e.target.value;
    restartGame();
  });
});

cells.forEach(cell => cell.addEventListener("click", handleClick));

function handleClick(e) {
  const index = e.target.dataset.index;
  if (!gameActive || board[index] !== "") return;

  makeMove(index);

  if (mode === "ai" && gameActive && currentPlayer === "O") {
    setTimeout(aiMove, 500);
  }
}

function makeMove(index) {
  board[index] = currentPlayer;
  cells[index].textContent = currentPlayer;
  cells[index].classList.add(currentPlayer === "X" ? "x" : "o");

  if (checkWinner()) {
    statusText.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
  } else if (board.every(cell => cell !== "")) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function aiMove() {
  let emptyIndices = board.map((val, idx) => val === "" ? idx : null).filter(i => i !== null);
  let aiChoice = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  makeMove(aiChoice);
}

function checkWinner() {
  return winningCombos.some(combo => {
    return combo.every(index => board[index] === currentPlayer);
  });
}

function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("x", "o");
  });
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}
