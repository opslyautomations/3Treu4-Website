/* 3True4 — shared scripts */
(function () {
  "use strict";

  var BOOKING_EMAIL = "3240true@gmail.com";

  /* ---------- mobile menu ---------- */
  var toggle = document.querySelector(".menu-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var open = document.body.classList.toggle("menu-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.querySelectorAll(".nav a").forEach(function (a) {
      a.addEventListener("click", function () {
        document.body.classList.remove("menu-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- footer year ---------- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---------- scroll reveal ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- music: player + filters ---------- */
  function widgetSrc(url, autoplay) {
    return "https://w.soundcloud.com/player/?url=" + encodeURIComponent(url) +
      "&color=%23e0261b&auto_play=" + (autoplay ? "true" : "false") +
      "&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true";
  }

  var frame = document.getElementById("player-frame");
  var np = document.querySelector(".now-playing");
  var tracks = document.querySelectorAll(".track");

  function setPlaying(card, autoplay) {
    if (!frame || !card) return;
    var d = card.dataset;
    frame.src = widgetSrc(d.url, autoplay);
    frame.title = "SoundCloud player: " + d.title;
    if (np) {
      np.querySelector("[data-np-kind]").textContent = d.kindLabel;
      np.querySelector("[data-np-title]").textContent = d.title;
      np.querySelector("[data-np-meta]").textContent = d.meta;
      np.querySelector("[data-np-desc]").textContent = d.desc;
      np.querySelector("[data-np-link]").href = d.url;
    }
    tracks.forEach(function (t) {
      var on = t === card;
      t.classList.toggle("is-playing", on);
      var btn = t.querySelector(".play");
      if (btn) btn.setAttribute("aria-pressed", on ? "true" : "false");
    });
  }

  tracks.forEach(function (card) {
    var btn = card.querySelector(".play");
    if (btn) btn.addEventListener("click", function () {
      setPlaying(card, true);
      if (window.innerWidth < 860) {
        document.getElementById("player").scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  var filters = document.querySelectorAll(".filter");
  filters.forEach(function (f) {
    f.addEventListener("click", function () {
      var kind = f.dataset.filter;
      filters.forEach(function (x) { x.setAttribute("aria-pressed", x === f ? "true" : "false"); });
      tracks.forEach(function (t) {
        t.hidden = !(kind === "all" || t.dataset.kind === kind);
      });
    });
  });

  // Allow deep links like music.html#papi
  function playFromHash() {
    if (!frame || !location.hash) return;
    var target = document.getElementById(location.hash.slice(1));
    if (target && target.classList.contains("track")) setPlaying(target, false);
  }
  playFromHash();
  window.addEventListener("hashchange", playFromHash);

  /* ---------- booking form ---------- */
  var form = document.getElementById("booking-form");
  if (form) {
    // Prefill event type from ?type=club etc.
    var params = new URLSearchParams(location.search);
    var preType = params.get("type");
    if (preType) {
      var sel = form.querySelector("#event-type");
      if (sel && sel.querySelector('option[value="' + preType + '"]')) sel.value = preType;
    }

    // No past dates
    var dateInput = form.querySelector("#event-date");
    if (dateInput) dateInput.min = new Date().toISOString().split("T")[0];

    function validate() {
      var ok = true;
      form.querySelectorAll("[required]").forEach(function (input) {
        var field = input.closest(".field");
        var valid = input.checkValidity() && input.value.trim() !== "";
        field.classList.toggle("invalid", !valid);
        if (!valid && ok) { input.focus(); ok = false; }
      });
      return ok;
    }

    form.querySelectorAll("input, select, textarea").forEach(function (input) {
      input.addEventListener("input", function () {
        var field = input.closest(".field");
        if (field && field.classList.contains("invalid") && input.checkValidity()) field.classList.remove("invalid");
      });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!validate()) return;

      var v = function (id) { var el = form.querySelector("#" + id); return el ? el.value.trim() : ""; };
      var sel = form.querySelector("#event-type");
      var typeLabel = sel.options[sel.selectedIndex].text;
      var vibes = Array.prototype.map.call(form.querySelectorAll('input[name="vibe"]:checked'), function (c) { return c.value; });

      var lines = [
        "Hey 3True4 — booking inquiry below.",
        "",
        "NAME: " + v("name"),
        "EMAIL: " + v("email"),
        "PHONE: " + (v("phone") || "—"),
        "",
        "EVENT TYPE: " + typeLabel,
        "DATE: " + v("event-date"),
        "SET TIME: " + (v("start-time") || "?") + " – " + (v("end-time") || "?"),
        "VENUE / CITY: " + v("venue"),
        "EXPECTED GUESTS: " + (v("guests") || "—"),
        "BUDGET: " + (v("budget") || "—"),
        "SOUND / DJ GEAR ON SITE: " + (v("gear") || "—"),
        "SOUND WANTED: " + (vibes.length ? vibes.join(", ") : "—"),
        "",
        "DETAILS:",
        v("message") || "—"
      ];

      var subject = "Booking Inquiry — " + typeLabel + " — " + v("event-date");
      var href = "mailto:" + BOOKING_EMAIL +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(lines.join("\n"));

      window.location.href = href;

      var success = document.getElementById("form-success");
      if (success) { success.classList.add("show"); success.scrollIntoView({ behavior: "smooth", block: "center" }); }
    });
  }
})();
