(function () {
  var el = document.getElementById("hours-status");
  if (!el) return;

  function part(parts, type) {
    for (var i = 0; i < parts.length; i++) {
      if (parts[i].type === type) return parts[i].value;
    }
    return "";
  }

  var parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23"
  }).formatToParts(new Date());

  var weekday = part(parts, "weekday");
  var hour = parseInt(part(parts, "hour"), 10);
  var minute = parseInt(part(parts, "minute"), 10);
  if (isNaN(hour) || isNaN(minute) || !weekday) return;

  var t = hour * 60 + minute;
  var open = false;
  if (weekday === "Mon" || weekday === "Tue" || weekday === "Wed" || weekday === "Thu" || weekday === "Fri") {
    open = t >= 7 * 60 + 30 && t < 18 * 60 + 30;
  } else if (weekday === "Sat") {
    open = t >= 10 * 60 && t < 17 * 60;
  }

  el.textContent = open ? "Open now" : "Closed now";
  el.removeAttribute("hidden");
})();
