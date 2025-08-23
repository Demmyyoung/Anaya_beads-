// JavaScript for the animated image slider
const images = [
  "./images/Sample product (1).jpg",
  "./images/Sample product (2).jpg",
  "./images/Sample product (3).jpg",
];
let currentIndex = 0;
let isAnimating = false; // A flag to prevent multiple clicks during an animation

const imageWrapper = document.querySelector(".image-wrapper");

function showNextImage() {
  if (isAnimating) return;
  isAnimating = true;

  const oldImage = imageWrapper.querySelector(".product-img");
  oldImage.classList.add("swipe-left"); // Animate current image out to the left
  oldImage.classList.remove("swipe-in");

  currentIndex = (currentIndex + 1) % images.length;

  const newImage = document.createElement("img");
  newImage.src = images[currentIndex];
  newImage.alt = "Sample";
  newImage.className = "product-img swipe-right"; // Position new image off-screen to the right
  imageWrapper.appendChild(newImage);

  // This small delay allows the browser to apply the initial 'swipe-right' style
  // before we add 'swipe-in' to trigger the transition.
  setTimeout(() => {
    newImage.classList.remove("swipe-right");
    newImage.classList.add("swipe-in");
  }, 10);

  // After the 500ms animation is complete, remove the old image and reset the flag.
  setTimeout(() => {
    oldImage.remove();
    isAnimating = false;
  }, 500);
}

function showPrevImage() {
  if (isAnimating) return;
  isAnimating = true;

  const oldImage = imageWrapper.querySelector(".product-img");
  oldImage.classList.add("swipe-right"); // Animate current image out to the right
  oldImage.classList.remove("swipe-in");

  currentIndex = (currentIndex - 1 + images.length) % images.length;

  const newImage = document.createElement("img");
  newImage.src = images[currentIndex];
  newImage.alt = "Sample";
  newImage.className = "product-img swipe-left"; // Position new image off-screen to the left
  imageWrapper.appendChild(newImage);

  setTimeout(() => {
    newImage.classList.remove("swipe-left");
    newImage.classList.add("swipe-in");
  }, 10);

  setTimeout(() => {
    oldImage.remove();
    isAnimating = false;
  }, 500);
}