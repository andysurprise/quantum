const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 400;

// Ball properties
let ball = { x: 200, y: 200, radius: 20, color: "red" };
let score = 0;

// Quantum facts
const quantumFacts = [
  "Particles exist in a superposition of states until observed.",
  "Heisenberg's uncertainty principle: You can't know position and momentum precisely.",
  "Quantum entanglement: Two particles can influence each other instantly, no matter the distance.",
  "Schrödinger's cat is alive and dead until observed!",
  "Quantum tunneling allows particles to pass through barriers.",
  "Light behaves as both a particle and a wave.",
];

// Display fact
const factElement = document.getElementById("fact");

function displayFact() {
  const randomFact = quantumFacts[Math.floor(Math.random() * quantumFacts.length)];
  factElement.textContent = randomFact;
  setTimeout(() => (factElement.textContent = ""), 3000); // Clear after 3 seconds
}

// Ball movement logic
function randomizeBallPosition() {
  ball.x = Math.random() * (canvas.width - 2 * ball.radius) + ball.radius;
  ball.y = Math.random() * (canvas.height - 2 * ball.radius) + ball.radius;
}

// Add quantum uncertainty (small random shifts)
function quantumUncertainty() {
  ball.x += Math.random() * 6 - 3; // Random shift in x
  ball.y += Math.random() * 6 - 3; // Random shift in y

  // Keep ball within canvas
  ball.x = Math.max(ball.radius, Math.min(canvas.width - ball.radius, ball.x));
  ball.y = Math.max(ball.radius, Math.min(canvas.height - ball.radius, ball.y));
}

// Event listener for clicks
canvas.addEventListener("click", (e) => {
  const dist = Math.sqrt(
    (e.offsetX - ball.x) ** 2 + (e.offsetY - ball.y) ** 2
  );
  if (dist <= ball.radius) {
    score++;
    randomizeBallPosition();
    displayFact();
  }
});

// Game rendering
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = ball.color;
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.font = "20px Arial";
  ctx.fillStyle = "black";
  ctx.fillText(`Score: ${score}`, 10, 30);

  quantumUncertainty(); // Add uncertainty to ball's position
  requestAnimationFrame(draw);
}

draw();
