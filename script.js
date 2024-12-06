const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 400;

// Primary red ball properties
let redBall = { x: 200, y: 200, radius: 20, color: "red" };

// Ghost balls for superposition
let ghostBalls = [];
let inSuperposition = false;

// Other balls and properties
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

// Create ghost balls for superposition
function enterSuperposition() {
  ghostBalls = [];
  const numGhostBalls = Math.floor(Math.random() * 3) + 2; // 2–4 ghost balls
  for (let i = 0; i < numGhostBalls; i++) {
    ghostBalls.push({
      x: Math.random() * (canvas.width - 2 * redBall.radius) + redBall.radius,
      y: Math.random() * (canvas.height - 2 * redBall.radius) + redBall.radius,
      radius: redBall.radius,
      color: "rgba(255, 0, 0, 0.5)", // Semi-transparent red for ghost balls
    });
  }
  inSuperposition = true;
}

// Collapse superposition when clicked
function collapseSuperposition(clickedX, clickedY) {
  let collapsed = false;

  ghostBalls.forEach((ghost) => {
    const dist = Math.sqrt((clickedX - ghost.x) ** 2 + (clickedY - ghost.y) ** 2);
    if (dist <= ghost.radius) {
      redBall.x = ghost.x;
      redBall.y = ghost.y;
      collapsed = true;
    }
  });

  // Exit superposition if the correct ghost was clicked
  if (collapsed) {
    ghostBalls = [];
    inSuperposition = false;
    score++;
    randomizeBallPosition(redBall);
    displayFact();
  }
}

// Randomize ball position
function randomizeBallPosition(ball) {
  ball.x = Math.random() * (canvas.width - 2 * ball.radius) + ball.radius;
  ball.y = Math.random() * (canvas.height - 2 * ball.radius) + ball.radius;
}

// Add quantum uncertainty to balls
function quantumUncertainty(ball) {
  ball.x += Math.random() * 6 - 3;
  ball.y += Math.random() * 6 - 3;
  ball.x = Math.max(ball.radius, Math.min(canvas.width - ball.radius, ball.x));
  ball.y = Math.max(ball.radius, Math.min(canvas.height - ball.radius, ball.y));
}

// Handle canvas click
canvas.addEventListener("click", (e) => {
  const dist = Math.sqrt(
    (e.offsetX - redBall.x) ** 2 + (e.offsetY - redBall.y) ** 2
  );

  if (inSuperposition) {
    collapseSuperposition(e.offsetX, e.offsetY);
  } else if (dist <= redBall.radius) {
    score++;
    if (score % 10 === 0) {
      level++;
      message = "Keep clicking!";
      setTimeout(() => (message = ""), 3000);
    }

    if (level >= 3) {
      blackBall.color = Math.random() < 0.25 ? "green" : "black";
    }

    if (level >= 2 && !inSuperposition) {
      enterSuperposition();
    }
  }
});

// Move grey ball at level 2
function moveGreyBall() {
  if (level >= 2) {
    greyBall.x += greyBall.dx;
    greyBall.y += greyBall.dy;

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

  // Draw ghost balls (superposition)
  if (inSuperposition) {
    ghostBalls.forEach((ghost) => {
      ctx.fillStyle = ghost.color;
      ctx.beginPath();
      ctx.arc(ghost.x, ghost.y, ghost.radius, 0, Math.PI * 2);
      ctx.fill();
    });
  } else {
    // Draw red ball
    ctx.fillStyle = redBall.color;
    ctx.beginPath();
    ctx.arc(redBall.x, redBall.y, redBall.radius, 0, Math.PI * 2);
    ctx.fill();
  }

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

  // Update grey ball movement
  moveGreyBall();

  // Add uncertainty
  quantumUncertainty(redBall);

  // Update scoreboard and message
  scoreboardElement.textContent = `Score: ${score} | Level: ${level}`;
  messageElement.textContent = message;

  requestAnimationFrame(draw);
}

draw();
