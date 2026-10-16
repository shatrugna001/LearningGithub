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

const gameChoices = ["rock", "paper", "scissors"];
const gameResult = document.getElementById("game-result");
const playerScore = document.getElementById("player-score");
const computerScore = document.getElementById("computer-score");
const drawScore = document.getElementById("draw-score");
let scores = { player: 0, computer: 0, draws: 0 };

document.querySelectorAll(".choice-button").forEach((button) => {
  button.addEventListener("click", () => {
    const playerChoice = button.dataset.choice;
    const computerChoice = gameChoices[Math.floor(Math.random() * gameChoices.length)];

    if (playerChoice === computerChoice) {
      scores.draws++;
      gameResult.textContent = `It's a draw! You both chose ${computerChoice}.`;
    } else if (
      (playerChoice === "rock" && computerChoice === "scissors") ||
      (playerChoice === "paper" && computerChoice === "rock") ||
      (playerChoice === "scissors" && computerChoice === "paper")
    ) {
      scores.player++;
      gameResult.textContent = `You win! ${capitalize(playerChoice)} beats ${computerChoice}.`;
    } else {
      scores.computer++;
      gameResult.textContent = `Computer wins! ${capitalize(computerChoice)} beats ${playerChoice}.`;
    }

    playerScore.textContent = scores.player;
    computerScore.textContent = scores.computer;
    drawScore.textContent = scores.draws;
  });
});

document.getElementById("reset-game").addEventListener("click", () => {
  scores = { player: 0, computer: 0, draws: 0 };
  playerScore.textContent = "0";
  computerScore.textContent = "0";
  drawScore.textContent = "0";
  gameResult.textContent = "Score reset. Make your move!";
});

const memorySymbols = ["🍋", "🌈", "⭐", "🐸"];
const memoryBoard = document.getElementById("memory-board");
const memoryMoves = document.getElementById("memory-moves");
const memoryPairs = document.getElementById("memory-pairs");
const memoryStatus = document.getElementById("memory-status");
let firstMemoryCard = null;
let memoryLocked = false;
let memoryMoveCount = 0;
let matchedPairCount = 0;
let mismatchTimeout;

function startMemoryGame() {
  window.clearTimeout(mismatchTimeout);
  firstMemoryCard = null;
  memoryLocked = false;
  memoryMoveCount = 0;
  matchedPairCount = 0;
  memoryMoves.textContent = "0";
  memoryPairs.textContent = "0 / 4";
  memoryStatus.textContent = "Find the matching pairs!";
  memoryBoard.replaceChildren();

  const cards = [...memorySymbols, ...memorySymbols];
  for (let index = cards.length - 1; index > 0; index--) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [cards[index], cards[randomIndex]] = [cards[randomIndex], cards[index]];
  }

  cards.forEach((symbol, index) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "memory-card";
    card.dataset.symbol = symbol;
    card.setAttribute("aria-label", `Card ${index + 1}, face down`);
    card.setAttribute("aria-pressed", "false");
    card.addEventListener("click", () => revealMemoryCard(card, index));
    memoryBoard.append(card);
  });
}

function revealMemoryCard(card, index) {
  if (memoryLocked || card.disabled || card === firstMemoryCard) {
    return;
  }

  card.textContent = card.dataset.symbol;
  card.classList.add("is-revealed");
  card.setAttribute("aria-label", `Card ${index + 1}, ${card.dataset.symbol}`);
  card.setAttribute("aria-pressed", "true");

  if (!firstMemoryCard) {
    firstMemoryCard = card;
    return;
  }

  memoryMoveCount++;
  memoryMoves.textContent = memoryMoveCount;

  if (firstMemoryCard.dataset.symbol === card.dataset.symbol) {
    firstMemoryCard.classList.add("is-matched");
    card.classList.add("is-matched");
    firstMemoryCard.disabled = true;
    card.disabled = true;
    matchedPairCount++;
    memoryPairs.textContent = `${matchedPairCount} / ${memorySymbols.length}`;
    firstMemoryCard = null;

    if (matchedPairCount === memorySymbols.length) {
      memoryStatus.textContent = `You found every pair in ${memoryMoveCount} moves!`;
    } else {
      memoryStatus.textContent = "Match found! Keep going.";
    }
    return;
  }

  memoryLocked = true;
  memoryStatus.textContent = "Not a match. Try again!";
  const unmatchedCard = firstMemoryCard;
  mismatchTimeout = window.setTimeout(() => {
    [unmatchedCard, card].forEach((unmatched) => {
      unmatched.textContent = "";
      unmatched.classList.remove("is-revealed");
      unmatched.setAttribute("aria-label", `Card ${[...memoryBoard.children].indexOf(unmatched) + 1}, face down`);
      unmatched.setAttribute("aria-pressed", "false");
    });
    firstMemoryCard = null;
    memoryLocked = false;
    memoryStatus.textContent = "Find the matching pairs!";
  }, 800);
}

document.getElementById("reset-memory-game").addEventListener("click", startMemoryGame);
startMemoryGame();

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
