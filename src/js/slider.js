const slider = document.querySelector(".slider");
const container = document.querySelector(".slider-container");
const slides = document.querySelectorAll(".slide");
const navigations = document.querySelectorAll(".slider-button");
const indicator = document.querySelector(".slider-indicator");
const rewievs = document.querySelectorAll(".rewievs-text");

let activeOrder = 0;

init();

function init() {
  for (let i = 0; i < slides.length; i++) {
    const slide = slides[i];

    slide.dataset.order = i;

    slide.addEventListener("click", clickHandler);
  }

  for (const navigation of navigations) {
    navigation.addEventListener("click", navigationHandler);
  }

  activeOrder = Math.floor(slides.length / 5);

  update();
}

window.addEventListener('resize', function (event) {
  update();
}, false);

function update() {
  const {
    width,
    height
  } = container.getBoundingClientRect();

  let paddingTop, paddingLeft;
  let c = 0;


  let mediaTablet = window.matchMedia("(max-width: 1279px)");
  let mediaPhone = window.matchMedia("(max-width: 767px)");

  if (mediaPhone.matches) {
    c = 0;
    paddingTop = 150;
    paddingLeft = 370;
  } else if (mediaTablet.matches) {
    paddingTop = 160;
    paddingLeft = 270;
    c = 40;
  } else {
    paddingTop = 195;
    paddingLeft = 375;
    c = 65;
  }

  const a = width / 2;
  const b = height / 2 + c;

  for (let i = 0; i < slides.length; i++) {
    const activeSlide = document.querySelector(
      `.slide[data-order = "${activeOrder}"]`
    );

    const leftSlide = document.querySelector(
      `.slide[data-order = "${activeOrder - i}"]`
    );
    slides[i].classList.remove("active");
    activeSlide.classList.add("active");
    if (leftSlide) {
      leftSlide.style.left = `${a - paddingLeft * i}px`;

      leftSlide.style.top = `${b - paddingTop * i}px`;
    }

    const rightSlide = document.querySelector(
      `.slide[data-order = "${activeOrder + i}"]`
    );

    if (rightSlide) {
      rightSlide.style.left = `${a + paddingLeft * i}px`;

      rightSlide.style.top = `${b - paddingTop * i}px`;
    }

    indicator.textContent = `${activeOrder + 1}/${slides.length}`;
    swapRewievsText();

    let w = window.getComputedStyle(slides[i]).width;
  }
}

function swapRewievsText() {
  rewievs.forEach((item) => {
    item.style.display = "none";
  });
  rewievs[activeOrder].style.display = "block";
}

function clickHandler() {
  const order = parseInt(this.dataset.order, 10);
  activeOrder = order;
  update();
}

function navigationHandler() {
  const {
    dir
  } = this.dataset;

  if (dir === "prev") {
    activeOrder = Math.max(0, activeOrder - 1);
  } else if (dir === "next") {
    activeOrder = Math.min(slides.length - 1, activeOrder + 1);
  }

  update();
}