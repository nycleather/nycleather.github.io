(function () {
  var root = document.querySelector(".hero-carousel");
  if (!root) return;

  var viewport = root.querySelector(".hero-carousel-viewport");
  var track = root.querySelector(".hero-carousel-track");
  var slides = root.querySelectorAll(".hero-carousel-slide");
  var prev = root.querySelector(".hero-carousel-prev");
  var next = root.querySelector(".hero-carousel-next");
  var dots = root.querySelectorAll("[data-carousel-dot]");
  var pauseBtn = root.querySelector(".hero-carousel-pause");
  var caption = root.querySelector(".hero-carousel-caption");
  var count = slides.length;
  if (!viewport || !track || count < 2) return;

  var index = 0;
  var timer = null;
  var delay = 7000;
  var paused = false;
  var reduce = false;
  if (window.matchMedia) {
    reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function go(nextIndex) {
    index = (nextIndex + count) % count;
    track.style.transform = "translateX(" + -index * 100 + "%)";
    for (var i = 0; i < slides.length; i++) {
      var current = i === index;
      slides[i].setAttribute("aria-hidden", current ? "false" : "true");
      if (dots[i]) {
        if (current) dots[i].setAttribute("aria-current", "true");
        else dots[i].removeAttribute("aria-current");
      }
    }
    if (caption) {
      var label = slides[index].getAttribute("data-caption");
      if (label) caption.textContent = label;
    }
  }

  function stop() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  function play() {
    stop();
    if (reduce || paused) return;
    timer = setInterval(function () {
      go(index + 1);
    }, delay);
  }

  function setPaused(value) {
    paused = value;
    if (pauseBtn) {
      pauseBtn.setAttribute("aria-pressed", paused || reduce ? "true" : "false");
      pauseBtn.textContent = paused || reduce ? "Play" : "Pause";
    }
    if (paused || reduce) stop();
    else play();
  }

  if (prev) {
    prev.addEventListener("click", function () {
      go(index - 1);
    });
  }
  if (next) {
    next.addEventListener("click", function () {
      go(index + 1);
    });
  }
  for (var d = 0; d < dots.length; d++) {
    (function (dotIndex) {
      dots[dotIndex].addEventListener("click", function () {
        go(dotIndex);
      });
    })(d);
  }
  if (pauseBtn) {
    pauseBtn.addEventListener("click", function () {
      setPaused(!paused);
    });
  }

  root.addEventListener("mouseenter", function () {
    stop();
  });
  root.addEventListener("mouseleave", function () {
    if (!paused) play();
  });
  root.addEventListener("focusin", function () {
    stop();
  });
  root.addEventListener("focusout", function (event) {
    if (!root.contains(event.relatedTarget) && !paused) play();
  });

  var startX = null;
  viewport.addEventListener(
    "touchstart",
    function (event) {
      startX = event.changedTouches[0].clientX;
      stop();
    },
    { passive: true }
  );
  viewport.addEventListener(
    "touchend",
    function (event) {
      if (startX == null) return;
      var dx = event.changedTouches[0].clientX - startX;
      startX = null;
      if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
      if (!paused) play();
    },
    { passive: true }
  );

  root.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(index - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      go(index + 1);
    }
  });

  go(0);
  setPaused(reduce);
  if (!reduce) play();
})();
