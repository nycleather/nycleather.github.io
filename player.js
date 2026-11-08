(function () {
  var buttons = document.querySelectorAll(".clip-play");

  function start(button) {
    var src = button.getAttribute("data-src");
    if (!src) return;
    var video = document.createElement("video");
    video.className = "clip-video";
    video.controls = true;
    video.muted = true;
    video.playsInline = true;
    video.setAttribute("playsinline", "");
    video.preload = "none";
    video.src = src;
    button.replaceWith(video);
    var pending = video.play();
    if (pending && pending.catch) pending.catch(function () {});
  }

  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function () {
      start(this);
    });
  }
})();
