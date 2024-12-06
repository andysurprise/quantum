// JavaScript File for Quantum Mechanics Clicker Game

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreboardElement = document.getElementById("scoreboard");
const messageElement = document.getElementById("message");

let score = 0;
let level = 1;
let message = "";
let inCelebration = false;

const redBalls = [
  { x: 200, y: 200, radius: 20, color: "red", displayX: 200, displayY: 200 },
];
const greyBall = { x: 100, y: 100, radius: 15, color: "grey", dx: 2, dy: 2 };
const blackBall = { x: 300, y: 300, radius: 20, color: "black" };

// Randomize position for a ball
function randomizeBallPosition(ball) {
  ball.x = Math.random() * (canvas.width - ball.radius * 2) + ball.radius;
  ball.y = Math.random() * (canvas.height - ball.radius * 2) + ball.radius;
}

// Add wiggling effect to balls
function wiggleBall(ball) {
  const wiggleX = Math.random() * 10 - 5; // Random value between -5 and 5
  const wiggleY = Math.random() * 10 - 5; // Random value between -5 and 5
  return { x: ball.x + wiggleX, y: ball.y + wiggleY };
}

// Move the grey ball erratically
function moveGreyBall() {
  greyBall.x += greyBall.dx;
  greyBall.y += greyBall.dy;

  if (greyBall.x - greyBall.radius < 0 || greyBall.x + greyBall.radius > canvas.width) {
    greyBall.dx *= -1;
  }
  if (greyBall.y - greyBall.radius < 0 || greyBall.y + greyBall.radius > canvas.height) {
    greyBall.dy *= -1;
  }
}

// Play celebration animation
function playCelebration() {
  inCelebration = true;
  let progress = 0;

  const savedRedBalls = JSON.parse(JSON.stringify(redBalls));
  const savedGreyBall = { ...greyBall };
  const savedBlackBall = { ...blackBall };

  const animation = setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (progress < 100) {
      ctx.fillStyle = `rgba(255, 0, 0, ${progress / 100})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    if (progress >= 20 && progress <= 80) {
      ctx.font = "16px monospace";
      ctx.fillStyle = "black";

      // Cat with wide eyes
      ctx.fillText("   /\\_/\\ ", 60, 140);
      ctx.fillText("  ( o.o )", 60, 160);
      ctx.fillText("   > ^ <", 60, 180);

      // Cat with "X" eyes
      ctx.fillText("   /\\_/\\ ", 250, 140);
      ctx.fillText("  ( x.x )", 250, 160);
      ctx.fillText("   > ^ <", 250, 180);
    }

    if (progress > 50) {
      for (let i = 0; i < 10; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = Math.random() * 5 + 5;
        ctx.fillStyle = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 1)`;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    progress++;

    if (progress > 100) {
      clearInterval(animation);
      inCelebration = false;
      redBalls = savedRedBalls;
      greyBall = savedGreyBall;
      blackBall = savedBlackBall;
      draw();
    }
  }, 60);
}

// Draw function
function draw() {
  if (inCelebration) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw wiggling red balls
  redBalls.forEach((ball) => {
    const { x, y } = wiggleBall(ball);
    ctx.fillStyle = ball.color;
    ctx.beginPath();
    ctx.arc(x, y, ball.radius, 0, Math.PI * 2);
    ctx.fill();
    ball.displayX = x;
    ball.displayY = y;
  });

  if (level >= 2) {
    ctx.fillStyle = greyBall.color;
    ctx.beginPath();
    ctx.arc(greyBall.x, greyBall.y, greyBall.radius, 0, Math.PI * 2);
    ctx.fill();
  }

  if (level >= 3) {
    ctx.fillStyle = blackBall.color;
    ctx.beginPath();
    ctx.arc(blackBall.x, blackBall.y, blackBall.radius, 0, Math.PI * 2);
    ctx.fill();
  }

  moveGreyBall();
  scoreboardElement.textContent = `Score: ${score} | Level: ${level}`;
  messageElement.textContent = message;

  requestAnimationFrame(draw);
}

// Handle canvas click
canvas.addEventListener("click", (e) => {
  if (inCelebration) return;

  redBalls.forEach((ball) => {
    const dist = Math.sqrt(
      (e.offsetX - ball.displayX) ** 2 + (e.offsetY - ball.displayY) ** 2
    );

    if (dist <= ball.radius) {
      score++;
      randomizeBallPosition(ball);
      if (score % 10 === 0) {
        level++;
        message = "Keep clicking!";
        setTimeout(() => (message = ""), 3000);
      }

      if (level === 3 && redBalls.length === 1) {
        redBalls.push({ x: 300, y: 300, radius: 20, color: "red", displayX: 300, displayY: 300 });
      }

      if (level === 3 && !inCelebration) {
        playCelebration();
      }

      if (level >= 3) {
        blackBall.color = Math.random() < 0.25 ? "green" : "black";
      }
    }
  });
});

// Start the game
draw();
