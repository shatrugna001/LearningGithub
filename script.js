const btn = document.getElementById("btn");
const message = document.getElementById("message");
let count = 0;

btn.addEventListener("click", () => {
  count++;
  message.textContent = `You clicked ${count} time${count === 1 ? "" : "s"}!`;
});