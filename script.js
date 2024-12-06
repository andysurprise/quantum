const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 400;

// Primary red ball properties
let redBall = { x: 200, y: 200, radius: 20, color: "red" };
let greyBall = { x: 100, y: 100, radius: 15, color: "grey", dx: 3, dy: 2 };
let blackBall = { x: 300, y: 300, radius: 15, color: "black" };
let score = 0;
let level = 1;
let inCelebration = false; // Tracks if the celebration animation is running
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

// Celebration animation for 100 clicks
function playCelebration() {
  inCelebration = true;
  let progress = 0;

  // Animation loop
  const animation = setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Fade-in red background
    if (progress < 100) {
      ctx.fillStyle = `rgba(255, 0, 0, ${progress / 100})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // Display ASCII cats
    if (progress >= 20 && progress <= 80) {
      ctx.font = "20px monospace";
      ctx.fillStyle = "black";
      ctx.fillText("(=＾ᆺ＾=)", 100, 180); // Cat with wide eyes
      ctx.fillText("(=xᆺx=)", 250, 180); // Cat with "X" eyes
    }

    // Random light show or fireworks
    if (progress > 50) {
      for (let i = 0; i < 10; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = Math.random() * 5 + 5;
        ctx.fillStyle = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${
          Math.random() * 255
        }, 1)`;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    progress++;

    if (progress > 100) {
      clearInterval(animation);
      inCelebration = false; // End celebration
    }
  }, 60); // Approx. 6 seconds for 100 steps (60ms each)
}

// Handle canvas click
canvas.addEventListener("click", (e) => {
  if (inCelebration) return; // Ignore clicks during celebration

  const dist = Math.sqrt(
    (e.offsetX - redBall.x) ** 2 + (e.offsetY - redBall.y) ** 2
  );

  if (dist <= redBall.radius) {
    score++;
    randomizeBallPosition(redBall);
    displayFact();

    // Trigger celebration at 100 clicks
    if (score === 100) {
      playCelebration();
    }

    if (score % 10 === 0) {
      level++;
      message = "Keep clicking!";
      setTimeout(() => (message = ""), 3000);
    }

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
  if (inCelebration) return; // Stop game rendering during celebration

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

  // Update grey ball movement
  moveGreyBall();

  // Update scoreboard and message
  scoreboardElement.textContent = `Score: ${score} | Level: ${level}`;
  messageElement.textContent = message;

  requestAnimationFrame(draw);
}

draw();
