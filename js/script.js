// JavaScript for the animated image slider
const images = [
  "./images/products/product (6).jpg",
  "./images/products/product (2).jpg",
  "./images/products/product (1).jpg",
  "./images/products/product (3).jpg",
  "./images/products/product (4).jpg",
  "./images/products/product (5).jpg",
  "./images/products/product (7).jpg",
  "./images/products/product (8).jpg",
  "./images/products/product (9).jpg",
  "./images/products/product (10).jpg",
  "./images/products/product (11).jpg",
  "./images/products/product (12).jpg",
  "./images/products/product (13).jpg",
  "./images/products/product (14).jpg",
  "./images/products/product (15).jpg",
  "./images/products/product (16).jpg",
  "./images/products/product (17).jpg",
  "./images/products/product (18).jpg",
  "./images/products/product (19).jpg",
  "./images/products/product (20).jpg",
  "./images/products/product (21).jpg",
  "./images/products/product (22).jpg",
  "./images/products/product (23).jpg",
  "./images/products/product (24).jpg",
  "./images/products/product (25).jpg",
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

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('user-info-modal');
    const span = document.getElementsByClassName('close-button')[0];
    const form = document.getElementById('user-info-form');

    // Show the modal if the user info is not in localStorage
    if (!localStorage.getItem('userInfo')) {
        modal.style.display = 'block';
    }

    // When the user clicks on <span> (x), close the modal
    if(span){
        span.onclick = function() {
        modal.style.display = 'none';
    }
    }


    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }

    // When the user submits the form, save the info and close the modal
    if(form){
            form.onsubmit = function(event) {
        event.preventDefault();
        const userInfo = {
            name: form.name.value,
            address: form.address.value,
            email: form.email.value,
        };
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        modal.style.display = 'none';
    }
    }
});