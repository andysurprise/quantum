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
