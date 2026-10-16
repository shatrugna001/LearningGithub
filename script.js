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

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}