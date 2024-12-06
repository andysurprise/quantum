const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 400;

// Ball properties
let redBall = { x: 200, y: 200, radius: 20, color: "red" };
let greyBall = { x: 100, y: 100, radius: 15, color: "grey", dx: 3, dy: 2 };
let blackBall = { x: 300, y: 300, radius: 15, color: "black" };
let score = 0;
let level = 1;
let message = "";
const quantumFacts = [
  "Particles exist in a superposition of states until observed.",
  "Heisenberg's uncertainty principle: You can't know position and momentum precisely.",
  "Quantum entanglement: Two particles can influence each other instantly, no matter the distance.",
  "Schrödinger's cat is alive and dead until observed!",
  "Quantum tunneling allows particles to pass through barriers.",
  "Light behaves as both a particle and a wave.",
];

const factElement = document.getElementById("fact");
const scoreboardElement = document.getElementById("scoreboard");
const messageElement = document.getElementById("message");

// Display a random quantum fact
function displayFact() {
  const randomFact = quantumFacts[Math.floor(Math.random() * quantumFacts.length)];
  factElement.textContent = randomFact;
  setTimeout(() => (factElement.textContent = ""), 3000);
}

// Randomize ball position
function randomizeBallPosition(ball) {
  ball.x = Math.random() * (canvas.width - 2 * ball.radius) + ball.radius;
  ball.y = Math.random() * (canvas.height - 2 * ball.radius) + ball.radius;
}

// Add quantum uncertainty to balls
function quantumUncertainty(ball) {
  ball.x += Math.random() * 6 - 3; // Random shift in x
  ball.y += Math.random() * 6 - 3; // Random shift in y
  ball.x = Math.max(ball.radius, Math.min(canvas.width - ball.radius, ball.x));
  ball.y = Math.max(ball.radius, Math.min(canvas.height - ball.radius, ball.y));
}

// Handle ball click
canvas.addEventListener("click", (e) => {
  const dist = Math.sqrt(
    (e.offsetX - redBall.x) ** 2 + (e.offsetY - redBall.y) ** 2
  );
  if (dist <= redBall.radius) {
    score++;
    randomizeBallPosition(redBall);
    displayFact();

    // Handle level transitions
    if (score % 10 === 0) {
      level++;
      message = "Keep clicking!";
      setTimeout(() => (message = ""), 3000);

      // Celebration at level 3
      if (level === 3) {
        celebrate();
      }
    }

    // Handle black ball color switch at level 3
    if (level >= 3) {
      blackBall.color = Math.random() < 0.25 ? "green" : "black";
    }
  }
});

// Move grey ball at level 2
function moveGreyBall() {
  if (level >= 2) {
    greyBall.x += greyBall.dx;
    greyBall.y += greyBall.dy;

    // Bounce off walls
    if (greyBall.x <= greyBall.radius || greyBall.x >= canvas.width - greyBall.radius) {
      greyBall.dx *= -1;
    }
    if (greyBall.y <= greyBall.radius || greyBall.y >= canvas.height - greyBall.radius) {
      greyBall.dy *= -1;
    }
  }
}

// Render the game
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw red ball
  ctx.fillStyle = redBall.color;
  ctx.beginPath();
  ctx.arc(redBall.x, redBall.y, redBall.radius, 0, Math.PI * 2);
  ctx.fill();

  // Draw grey ball (level 2+)
  if (level >= 2) {
    ctx.fillStyle = greyBall.color;
    ctx.beginPath();
    ctx.arc(greyBall.x, greyBall.y, greyBall.radius, 0, Math.PI * 2);
    ctx.fill();
  }

  // Draw black/green ball (level 3+)
  if (level >= 3) {
    ctx.fillStyle = blackBall.color;
    ctx.beginPath();
    ctx.arc(blackBall.x, blackBall.y, blackBall.radius, 0, Math.PI * 2);
    ctx.fill();
  }

  // Add quantum uncertainty to balls
  quantumUncertainty(redBall);
  if (level >= 2) quantumUncertainty(greyBall);
  if (level >= 3) quantumUncertainty(blackBall);

  // Update grey ball movement
  moveGreyBall();

  // Update scoreboard and message
  scoreboardElement.textContent = `Score: ${score} | Level: ${level}`;
  messageElement.textContent = message;

  requestAnimationFrame(draw);
}

// Celebration animation at level 3
function celebrate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw bright red screen
  ctx.fillStyle = "red";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw cats with fireworks
  ctx.font = "40px Arial";
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.fillText("😺", canvas.width / 4, canvas.height / 2 - 30); // Wide-eyed cat
  ctx.fillText("💥", 3 * canvas.width / 4, canvas.height / 2 - 30); // Exploding cat

  // Light show
  for (let i = 0; i < 50; i++) {
    ctx.fillStyle = `hsl(${Math.random() * 360}, 100%, 50%)`;
    ctx.beginPath();
    ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 5 + 1, 0, Math.PI * 2);
    ctx.fill();
  }

  // Reset after 6 seconds
  setTimeout(() => {
    draw();
  }, 6000);
}

draw();
