const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 400;

let ball = { x: 200, y: 200, radius: 20, color: "red" };
let score = 0;

canvas.addEventListener("click", (e) => {
  const dist = Math.sqrt(
    (e.offsetX - ball.x) ** 2 + (e.offsetY - ball.y) ** 2
  );
  if (dist <= ball.radius) {
    score++;
    ball.x = Math.random() * (canvas.width - 40) + 20;
    ball.y = Math.random() * (canvas.height - 40) + 20;
  }
});

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = ball.color;
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.font = "20px Arial";
  ctx.fillStyle = "black";
  ctx.fillText(`Score: ${score}`, 10, 30);
  requestAnimationFrame(draw);
}

draw();
