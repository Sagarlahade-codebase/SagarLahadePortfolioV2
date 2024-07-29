$(document).ready(function () {
  /* For the sticky navigation */
  $(".js--section-features").waypoint(
    function (direction) {
      if (direction == "down") {
        $("nav").addClass("sticky");
      } else {
        $("nav").removeClass("sticky");
      }
    },
    {
      offset: "60px;",
    }
  );

  /* Scroll on buttons*/
  $(".js--scroll-to-plans").click(function () {
    $("html, body").animate(
      { scrollTop: $(".js--section-plans").offset().top },
      1000
    );
  });

  $(".js--scroll-to-start").click(function () {
    $("html, body").animate(
      { scrollTop: $(".js--section-features").offset().top },
      1000
    );
  });
});

/* Navigation scroll */

$(function () {
  $('a[href*="#"]:not([href="#"])').click(function () {
    if (
      location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
      if (target.length) {
        $("html, body").animate({ scrollTop: target.offset().top }, 1000);
        return false;
      }
    }
  });
});

/* Animation on scroll */

$(".js--wp-1").waypoint(
  function (direction) {
    $(".js--wp-1").addClass("animated fadeIn");
  },
  {
    offset: "50%",
  }
);

$(".js--wp-2").waypoint(
  function (direction) {
    $(".js--wp-2").addClass("animated fadeInUp");
  },
  {
    offset: "50%",
  }
);

$(".js--wp-3").waypoint(
  function (direction) {
    $(".js--wp-3").addClass("animated fadeIn");
  },
  {
    offset: "50%",
  }
);

$(".js--wp-4").waypoint(
  function (direction) {
    $(".js--wp-4").addClass("animated pulse");
  },
  {
    offset: "50%",
  }
);

/* Mobile navigation */

$(".js--nav-icon").click(function () {
  var nav = $(".js--main-nav");

  nav.slideToggle(200);
  var icon = $(".js--nav-icon i");
  if (icon.hasClass("ion-navicon-round")) {
    icon.addClass("ion-close-round");
    icon.removeClass("ion-navicon-round");
  } else {
    icon.addClass("ion-navicon-round");
    icon.removeClass("ion-close-round");
  }
});

/* MAPS */

/* SL */

const textElement = document.getElementById("animated-text");
const texts = [
  "I'm sagar lahade ",
  "I'm a java developer ",
  "I'm a web developer ",
  "I'm an AI engineer ",
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 200; // Typing speed in milliseconds (slower)
const backspaceSpeed = 100; // Backspacing speed in milliseconds (slower)
const pauseDuration = 2000; // Pause duration after typing a full text (longer)
const endTypingPauseDuration = 1000; // Pause duration before starting to delete the last character

function type() {
  const currentText = texts[textIndex];
  let displayText;

  if (isDeleting) {
    displayText = currentText.substring(0, charIndex--);
  } else {
    displayText = currentText.substring(0, charIndex++);
  }

  textElement.textContent = displayText;

  if (!isDeleting && charIndex === currentText.length) {
    // Pause after typing the entire text
    setTimeout(() => {
      isDeleting = true;
      setTimeout(type, backspaceSpeed);
    }, pauseDuration);
  } else if (isDeleting && charIndex === currentText.length - 1) {
    // Pause before starting to delete the last character
    setTimeout(type, endTypingPauseDuration);
  } else if (isDeleting && charIndex === 4) {
    // Stop deleting after "I'm "
    isDeleting = false;
    textIndex = (textIndex + 1) % texts.length;
    setTimeout(type, typingSpeed);
  } else {
    setTimeout(type, isDeleting ? backspaceSpeed : typingSpeed);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(type, typingSpeed);
});

/**
 *
 *
 * courosel
 *
 */

/*
let modal = document.getElementById("myModal");
let modalImg = document.getElementById("img01");
let captionText = document.getElementById("caption");
let images = document.querySelectorAll(".meal-photo img");
let currentIndex = 0;

// Function to preload and resize images
function preloadImages() {
  images.forEach((img) => {
    let tempImg = new Image();
    tempImg.onload = function () {
      // Calculate percentages relative to parent container
      let parentWidth = img.parentElement.clientWidth;
      let parentHeight = img.parentElement.clientHeight;
      let widthPercentage = 80; // 80% of parent width
      let heightPercentage = (parentHeight / parentWidth) * widthPercentage; // Maintain aspect ratio

      img.style.width = widthPercentage + "%";
      img.style.height = heightPercentage + "%";
    };

    tempImg.src = img.src;
  });
}

// Call preloadImages function when page loads
window.onload = preloadImages;

images.forEach((img, index) => {
  img.onclick = function () {
    modal.style.display = "block";
    modalImg.src = this.src;
    captionText.innerHTML = this.alt;
    currentIndex = index;
  };
});

let span = document.getElementsByClassName("close")[0];

span.onclick = function () {
  modal.style.display = "none";
};

function changeSlide(n) {
  currentIndex += n;
  if (currentIndex >= images.length) {
    currentIndex = 0;
  } else if (currentIndex < 0) {
    currentIndex = images.length - 1;
  }
  modalImg.src = images[currentIndex].src;
  captionText.innerHTML = images[currentIndex].alt;
}

document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowRight") {
    changeSlide(1);
  } else if (e.key === "ArrowLeft") {
    changeSlide(-1);
  } else if (e.key === "Escape") {
    modal.style.display = "none";
  }
});

*/

/*

COUROSEL
*/

let modal = document.getElementById("myModal");
let modalImg = document.getElementById("img01");
let captionText = document.getElementById("caption");
let mealsShowcase = document.querySelectorAll(".meals-showcase");
let images = document.querySelectorAll(".meal-photo img");
let currentIndex = 0;
let animationTimer;

// Speed factor to control the scrolling speed
const speedFactor = 0.087878699877689; // Adjust this value to control speed: higher is slower, lower is faster

function initializeSlider() {
  preloadImages();
  setTimeout(startAnimation, 1000); // Start animation after a delay
  setupEventListeners();
}

function preloadImages() {
  images.forEach((img) => {
    let tempImg = new Image();
    tempImg.src = img.src;
  });
}

function calculateAnimationDuration() {
  let totalWidth = Array.from(images).reduce((acc, img) => {
    let imgWidth = img.getBoundingClientRect().width;
    let marginRight =
      parseInt(window.getComputedStyle(img.parentElement).marginRight) || 0;
    return acc + imgWidth + marginRight;
  }, 0);

  // Add the widths of two extra images
  let extraImageWidth =
    4 *
    (images[0].getBoundingClientRect().width +
      parseInt(window.getComputedStyle(images[0].parentElement).marginRight) ||
      0);
  totalWidth += extraImageWidth;

  const baseSpeed = 0.1; // Base speed factor to ensure consistent scrolling
  let viewportWidth = window.innerWidth;
  let animationDuration =
    (totalWidth + viewportWidth) * baseSpeed * speedFactor;

  console.log("Total Width:", totalWidth);
  console.log("Viewport Width:", viewportWidth);
  console.log("Animation Duration:", animationDuration);

  return animationDuration;
}

function startAnimation() {
  let animationDuration = calculateAnimationDuration();

  mealsShowcase.forEach((showcase) => {
    showcase.classList.add("show-carousel");
    showcase.style.animation = `scroll ${animationDuration}s linear infinite`;
  });

  animationTimer = setTimeout(() => {
    restartAnimation();
  }, animationDuration * 1000);
}

function restartAnimation() {
  clearTimeout(animationTimer);

  mealsShowcase.forEach((showcase) => {
    showcase.style.animation = "none";
    void showcase.offsetWidth;
    setTimeout(() => {
      let animationDuration = calculateAnimationDuration();
      showcase.style.animation = `scroll ${animationDuration}s linear infinite`;
    }, 0);
  });

  animationTimer = setTimeout(() => {
    restartAnimation();
  }, calculateAnimationDuration() * 700);
}

function setupEventListeners() {
  images.forEach((img, index) => {
    img.onclick = function () {
      modal.style.display = "block";
      modalImg.src = this.src;
      captionText.innerHTML = this.alt;
      currentIndex = index;
    };
  });

  let span = document.getElementsByClassName("close")[0];
  span.onclick = function () {
    modal.style.display = "none";
  };

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") {
      changeSlide(1);
    } else if (e.key === "ArrowLeft") {
      changeSlide(-1);
    } else if (e.key === "Escape") {
      modal.style.display = "none";
    }
  });

  mealsShowcase.forEach((showcase) => {
    showcase.addEventListener("animationiteration", () => {
      restartAnimation();
    });
  });

  window.addEventListener("resize", function () {
    let animationDuration = calculateAnimationDuration();
    mealsShowcase.forEach((showcase) => {
      showcase.style.animation = `scroll ${animationDuration}s linear infinite`;
    });

    clearTimeout(animationTimer);
    restartAnimation();
  });
}

function changeSlide(n) {
  currentIndex += n;
  if (currentIndex >= images.length) {
    currentIndex = 0;
  } else if (currentIndex < 0) {
    currentIndex = images.length - 1;
  }
  modalImg.src = images[currentIndex].src;
  captionText.innerHTML = images[currentIndex].alt;
}

window.onload = function () {
  initializeSlider();
};
