document.addEventListener("DOMContentLoaded", () => {
  const introScreen = document.getElementById("introScreen");

  const cat1 = document.createElement("img");
  cat1.src = "cat1.png"; // Image with wide eyes
  cat1.alt = "Cat with wide eyes";

  const cat2 = document.createElement("img");
  cat2.src = "cat2.png"; // Image with "x" eyes
  cat2.alt = "Cat with 'x' eyes";

  introScreen.appendChild(cat1);
  introScreen.appendChild(cat2);

  setTimeout(() => {
    introScreen.style.transition = "opacity 1s";
    introScreen.style.opacity = 0;
    setTimeout(() => {
      introScreen.style.display = "none";
    }, 1000);
  }, 5000);
});
