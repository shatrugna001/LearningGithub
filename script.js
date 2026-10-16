const btn = document.getElementById("btn");
const message = document.getElementById("message");
const main = document.querySelector("main");
const emojis = document.getElementById("emojis");
let count = 0;

btn.addEventListener("click", () => {
  count++;
  message.textContent = `You clicked ${count} time${count === 1 ? "" : "s"}!`;
});

main.addEventListener("click", (event) => {
  if (event.target.closest(".game-card")) {
    return;
  }

  const smile = document.createElement("span");
  smile.textContent = "😊";
  smile.setAttribute("role", "img");
  smile.setAttribute("aria-label", "smile");
  emojis.append(smile);
});

const ticTacToeCells = Array.from(document.querySelectorAll(".tic-tac-toe-cell"));
const ticTacToeStatus = document.getElementById("tic-tac-toe-status");
const winningLines = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];
let board = Array(9).fill("");
let currentPlayer = "X";
let gameOver = false;

ticTacToeCells.forEach((cell, index) => {
  cell.addEventListener("click", () => {
    if (gameOver || board[index]) {
      return;
    }

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.setAttribute("aria-label", `${cell.getAttribute("aria-label")}, ${currentPlayer}`);

    if (winningLines.some((line) => line.every((position) => board[position] === currentPlayer))) {
      ticTacToeStatus.textContent = `Player ${currentPlayer} wins!`;
      gameOver = true;
      ticTacToeCells.forEach((gameCell) => {
        gameCell.disabled = true;
      });
    } else if (board.every(Boolean)) {
      ticTacToeStatus.textContent = "It's a draw!";
      gameOver = true;
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      ticTacToeStatus.textContent = `Player ${currentPlayer}'s turn`;
    }
  });
});

document.getElementById("reset-tic-tac-toe").addEventListener("click", () => {
  board = Array(9).fill("");
  currentPlayer = "X";
  gameOver = false;
  ticTacToeStatus.textContent = "Player X's turn";

  ticTacToeCells.forEach((cell, index) => {
    cell.textContent = "";
    cell.disabled = false;
    cell.setAttribute("aria-label", `Row ${Math.floor(index / 3) + 1}, column ${(index % 3) + 1}`);
  });
});