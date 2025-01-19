const cursorDot = document.querySelector(".cursor-dot");
const cursorCircle = document.querySelector(".cursor-circle");

let mouseX = 0, mouseY = 0;
let dotX = 0, dotY = 0;
let circleX = 0, circleY = 0;

document.addEventListener("mousemove", (event) => {
    // Update the actual mouse position
    mouseX = event.pageX;
    mouseY = event.pageY;

    dotX = mouseX - 4;
    dotY = mouseY - 4;

    // Immediately move the dot to the mouse position
    cursorDot.style.left = `${dotX}px`;
    cursorDot.style.top = `${dotY}px`;
});

// Smoothly animate the circle's movement
function animateCircle() {
    // Gradually move the circle towards the mouse position
    circleX += (mouseX - circleX) * 0.3 // Adjust the 0.1 for speed
    circleY += (mouseY - circleY) * 0.3;

    cursorCircle.style.left = `${circleX}px`;
    cursorCircle.style.top = `${circleY}px`;

    requestAnimationFrame(animateCircle); // Keep animating
}

// Start the animation loop
animateCircle();