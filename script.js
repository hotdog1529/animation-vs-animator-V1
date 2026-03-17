const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let mode = "game";

let player = { x: 100, y: 100, vx: 0, vy: 0 };
let ai = { x: 300, y: 100 };

let blocks = [];

function resizeCanvas() {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
}
window.addEventListener("resize", resizeCanvas);

function openApp(app) {
  document.getElementById("window").classList.remove("hidden");
  document.getElementById("title").innerText = app;

  mode = app;
}

function closeApp() {
  document.getElementById("window").classList.add("hidden");
}

// TOUCH CONTROLS
canvas.addEventListener("touchstart", (e) => {
  let touch = e.touches[0];

  if (mode === "sandbox") {
    blocks.push({ x: touch.clientX, y: touch.clientY });
  } else {
    player.vx = 5;
  }
});

canvas.addEventListener("touchend", () => {
  player.vx = 0;
});

// LOOP
function gameLoop() {
  resizeCanvas();
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (mode === "game") runGame();
  if (mode === "sandbox") runSandbox();
  if (mode === "fight") runFight();

  requestAnimationFrame(gameLoop);
}

function drawStickman(x, y) {
  ctx.strokeStyle = "white";
  ctx.beginPath();
  ctx.arc(x, y, 10, 0, Math.PI * 2);
  ctx.moveTo(x, y + 10);
  ctx.lineTo(x, y + 40);
  ctx.moveTo(x, y + 20);
  ctx.lineTo(x - 10, y + 30);
  ctx.moveTo(x, y + 20);
  ctx.lineTo(x + 10, y + 30);
  ctx.stroke();
}

// GAME MODE (Story Level)
function runGame() {
  player.x += player.vx;

  drawStickman(player.x, player.y);

  ctx.fillStyle = "white";
  ctx.fillText("Level 1: Escape the Desktop", 20, 20);
}

// SANDBOX
function runSandbox() {
  blocks.forEach(b => {
    ctx.fillStyle = "red";
    ctx.fillRect(b.x, b.y, 20, 20);
  });

  ctx.fillStyle = "white";
  ctx.fillText("Tap to place blocks", 20, 20);
}

// AI FIGHT MODE
function runFight() {
  // Simple AI follow
  if (ai.x > player.x) ai.x -= 1;
  if (ai.x < player.x) ai.x += 1;

  drawStickman(player.x, player.y);
  drawStickman(ai.x, ai.y);

  ctx.fillStyle = "white";
  ctx.fillText("Fight Mode", 20, 20);
}

gameLoop();
