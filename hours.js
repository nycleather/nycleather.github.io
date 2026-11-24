(function () {
  var el = document.getElementById("hours-status");
  if (!el) return;

  var serverMs = null;
  var t0 = null;

  function part(parts, type) {
    for (var i = 0; i < parts.length; i++) {
      if (parts[i].type === type) return parts[i].value;
    }
    return "";
  }

  function hide() {
    el.setAttribute("hidden", "");
    el.classList.remove("is-open", "is-closed");
  }

  function currentMs() {
    if (serverMs == null || t0 == null) return null;
    return serverMs + (performance.now() - t0);
  }

  function update() {
    var ms = currentMs();
    if (ms == null) {
      hide();
      return;
    }

    var parts = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/New_York",
      weekday: "short",
      hour: "numeric",
      minute: "numeric",
      hourCycle: "h23"
    }).formatToParts(new Date(ms));

    var weekday = part(parts, "weekday");
    var hour = parseInt(part(parts, "hour"), 10);
    var minute = parseInt(part(parts, "minute"), 10);
    if (isNaN(hour) || isNaN(minute) || !weekday) {
      hide();
      return;
    }

    var t = hour * 60 + minute;
    var open = false;
    if (weekday === "Mon" || weekday === "Tue" || weekday === "Wed" || weekday === "Thu" || weekday === "Fri") {
      open = t >= 7 * 60 + 30 && t < 18 * 60 + 30;
    } else if (weekday === "Sat") {
      open = t >= 10 * 60 && t < 17 * 60;
    }

    var label = el.querySelector(".hours-status-text");
    if (label) label.textContent = open ? "Open now" : "Closed now";
    else el.textContent = open ? "Open now" : "Closed now";
    el.classList.toggle("is-open", open);
    el.classList.toggle("is-closed", !open);
    el.removeAttribute("hidden");
  }

  var path = location.pathname || "/";
  fetch(path, { method: "HEAD", cache: "no-store" })
    .then(function (res) {
      // Same-origin responses expose the Date header to script.
      var header = res.headers.get("Date");
      var parsed = header ? Date.parse(header) : NaN;
      if (!header || isNaN(parsed)) {
        hide();
        return;
      }
      serverMs = parsed;
      t0 = performance.now();
      update();
      setInterval(update, 30000);
    })
    .catch(function () {
      hide();
    });
})();
