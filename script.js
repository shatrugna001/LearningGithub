const btn = document.getElementById("btn");
const message = document.getElementById("message");
const main = document.querySelector("main");
const emojis = document.getElementById("emojis");
let count = 0;

btn.addEventListener("click", () => {
  count++;
  message.textContent = `You clicked ${count} time${count === 1 ? "" : "s"}!`;
});

main.addEventListener("click", () => {
  const smile = document.createElement("span");
  smile.textContent = "😊";
  smile.setAttribute("role", "img");
  smile.setAttribute("aria-label", "smile");
  emojis.append(smile);
});