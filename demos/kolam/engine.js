/* Invite kit engine: renders every section from window.INVITE and runs shared motion.
   The signature opening lives in opening.js (window.OPENING). */
(function () {
  "use strict";
  var C = window.INVITE, O = window.OPENING || null;
  var RM = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var root = document.documentElement;
  if (RM) root.classList.add("rm");
  Object.keys(C.colors || {}).forEach(function (k) { root.style.setProperty("--" + k, C.colors[k]); });
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function nl(s) { return esc(s).replace(/\n/g, "<br>"); }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }

  var IC = {
    cal: '<rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
    clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
    pin: '<path d="M12 21s-6.5-6.2-6.5-11a6.5 6.5 0 0 1 13 0c0 4.8-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.4"/>',
    dress: '<path d="M9 3h6l-1 4 4 13H6l4-13z"/><path d="M10 7h4"/>',
    hashtag: '<path d="M9 3 7 21M17 3l-2 18M4 9h17M3 15h17"/>',
    weather: '<circle cx="9" cy="9" r="3.5"/><path d="M9 2.5v1.5M2.5 9H4M4.4 4.4l1 1M13.6 4.4l-1 1"/><path d="M8 20h9a3.5 3.5 0 0 0 0-7 5 5 0 0 0-9.4 1.6A2.8 2.8 0 0 0 8 20z"/>',
    stay: '<path d="M3 18V7M3 13h18v5M21 18v-3"/><path d="M7 13v-2.5a1.5 1.5 0 0 1 1.5-1.5H11a1.5 1.5 0 0 1 1.5 1.5V13"/>',
    parking: '<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M10 16V8h3a2.5 2.5 0 0 1 0 5h-3"/>',
    chat: '<path d="M4.5 19.5 5.6 16A8 8 0 1 1 8.3 18.6z"/><path d="M9.2 9.3c.2 2.4 2.1 4.6 4.7 5.3l1.1-1.2-1.6-.9-.8.7c-.9-.4-1.8-1.3-2.2-2.2l.7-.8-.9-1.6z"/>',
    insta: '<rect x="4" y="4" width="16" height="16" rx="5"/><circle cx="12" cy="12" r="3.8"/><circle cx="16.8" cy="7.2" r=".6"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    star: '<path d="M12 3.5l2.6 5.6 6 .7-4.5 4.1 1.2 6-5.3-3-5.3 3 1.2-6L3.4 9.8l6-.7z"/>',
    plus: '<path d="M12 5v14M5 12h14"/>'
  };
  function icon(n, cls) { return '<svg class="ic ' + (cls || "") + '" viewBox="0 0 24 24" aria-hidden="true">' + IC[n] + "</svg>"; }
  var orn = C.ornament || "";  // small SVG divider from config/theme
  function divider() { return '<div class="divider" aria-hidden="true"><span></span>' + orn + "<span></span></div>"; }

  var cp = C.couple, h = "";
  // ---------- 1. opening ----------
  h += '<section id="opening" class="op" aria-label="' + esc(cp.first1 + " and " + cp.first2) + '"><div class="op-stage">' + (O ? O.html(C, { esc: esc, nl: nl }) : "") + "</div>" +
    '<p class="op-hint" aria-hidden="true"><span>' + esc(C.opening.hint) + '</span><i></i></p></section>';

  // ---------- 2. blessing + invitation ----------
  var B = C.blessing;
  h += '<section id="blessing" class="sec blessing tex"><div class="wrap narrow c">' +
    (B.symbolHtml ? '<div class="b-sym rv" aria-hidden="true">' + B.symbolHtml + "</div>" : "") +
    (B.line ? '<p class="b-line rv" lang="' + esc(B.lang || "en") + '"' + (B.dir ? ' dir="' + B.dir + '"' : "") + ">" + nl(B.line) + "</p>" : "") +
    (B.meaning ? '<p class="b-mean rv">' + nl(B.meaning) + "</p>" : "") + divider() +
    '<p class="inv-fam rv">' + esc(C.invitation.families) + '</p><p class="inv-text rv">' + esc(C.invitation.text) + "</p>" +
    '<h2 class="inv-names rv"><span>' + esc(cp.full1) + '</span><em>' + esc(C.invitation.joiner || "&") + "</em><span>" + esc(cp.full2) + "</span></h2>" +
    '<p class="inv-close rv">' + esc(C.invitation.closing) + "</p></div></section>";

  // ---------- 3. couple ----------
  h += '<section id="couple" class="sec couple"><div class="wrap"><p class="kicker c rv">' + esc(C.coupleTitle.kicker) + '</p><h2 class="h2 c rv">' + esc(C.coupleTitle.title) + "</h2>" +
    '<div class="cp-grid"><figure class="cp-photo rv"><div class="cp-frame"><img src="' + esc(cp.photo) + '" alt="' + esc(cp.photoAlt) + '" width="900" height="1200" loading="lazy"></div></figure>' +
    '<div class="cp-text">' + [1, 2].map(function (i) {
      return '<div class="cp-one rv"><h3>' + esc(cp["full" + i]) + '</h3><p class="cp-par">' + esc(cp["parents" + i]) + "</p><p>" + esc(cp["bio" + i]) + "</p></div>";
    }).join('<div class="cp-amp rv" aria-hidden="true">' + esc(C.invitation.joiner || "&") + "</div>") +
    "</div></div>" + (cp.story ? '<p class="cp-story c rv">' + esc(cp.story) + "</p>" : "") + "</div></section>";

  // ---------- 4. events ----------
  h += '<section id="events" class="sec events tex"><div class="wrap"><p class="kicker c rv">' + esc(C.eventsTitle.kicker) + '</p><h2 class="h2 c rv">' + esc(C.eventsTitle.title) + "</h2><div class=\"ev-list\">";
  C.events.forEach(function (e, i) {
    var p = e.palette || {};
    h += '<article class="ev rv" style="--ev-bg:' + (p.bg || "var(--card)") + ";--ev-deep:" + (p.deep || "var(--ink)") + ";--ev-ink:" + (p.ink || "var(--ink)") + ";--ev-acc:" + (p.accent || "var(--accent)") + '">' +
      '<div class="ev-art"><img src="' + esc(e.image) + '" alt="' + esc(e.imageAlt) + '" width="800" height="800" loading="lazy"><span class="ev-no">' + (i + 1 < 10 ? "0" : "") + (i + 1) + "</span></div>" +
      '<div class="ev-body">' + (e.local ? '<p class="ev-local" lang="' + esc(e.localLang || "en") + '"' + (e.localDir ? ' dir="' + e.localDir + '"' : "") + ">" + esc(e.local) + "</p>" : "") +
      "<h3>" + esc(e.name) + "</h3>" + (e.note ? '<p class="ev-note">' + esc(e.note) + "</p>" : "") +
      (e.highlight ? '<p class="ev-hl">' + icon("star") + "<span><b>" + esc(e.highlight.label) + "</b> " + esc(e.highlight.value) + "</span></p>" : "") +
      '<ul class="ev-meta"><li>' + icon("cal") + esc(e.dateLabel) + "</li><li>" + icon("clock") + esc(e.time) + "</li><li>" + icon("pin") + "<span><b>" + esc(e.venue) + "</b><br>" + esc(e.area) + "</span></li>" +
      (e.dress ? "<li>" + icon("dress") + "Dress: " + esc(e.dress) + "</li>" : "") + "</ul>" +
      '<a class="btn ev-btn" href="' + esc(e.map) + '" target="_blank" rel="noopener">See the route ' + icon("arrow") + "</a></div></article>";
  });
  h += "</div></div></section>";

  // ---------- 5. gallery ----------
  if (C.gallery && C.gallery.items.length) {
    h += '<section id="gallery" class="sec gallery"><div class="wrap"><p class="kicker c rv">' + esc(C.gallery.kicker) + '</p><h2 class="h2 c rv">' + esc(C.gallery.title) + "</h2></div>" +
      '<div class="g-track" tabindex="0" aria-label="Photo gallery, scroll sideways">' + C.gallery.items.map(function (g) {
        return '<figure class="g-item"><div class="g-in"><img src="' + esc(g.src) + '" alt="' + esc(g.alt) + '" width="900" height="1200" loading="lazy"></div>' + (g.caption ? "<figcaption>" + esc(g.caption) + "</figcaption>" : "") + "</figure>";
      }).join("") + '</div><div class="g-dots" aria-hidden="true">' + C.gallery.items.map(function () { return "<i></i>"; }).join("") + "</div></section>";
  }

  // ---------- 6. RSVP ----------
  var R = C.rsvp;
  var waUrl = "https://wa.me/" + R.whatsapp + "?text=" + encodeURIComponent(R.message);
  h += '<section id="rsvp" class="sec rsvp tex"><div class="wrap narrow c"><p class="kicker rv">' + esc(R.kicker) + '</p><h2 class="h2 rv">' + esc(R.title) + "</h2><p class=\"rv\">" + esc(R.text) + "</p>" +
    '<a class="btn big rv" href="' + esc(waUrl) + '" target="_blank" rel="noopener">' + icon("chat") + esc(R.button) + "</a>" +
    (R.deadline ? '<p class="fine rv">' + esc(R.deadline) + "</p>" : "") + "</div></section>";

  // ---------- 7. info ----------
  var I = C.info;
  h += '<section id="info" class="sec info"><div class="wrap"><p class="kicker c rv">' + esc(I.kicker) + '</p><h2 class="h2 c rv">' + esc(I.title) + '</h2><ul class="info-grid">' +
    I.items.map(function (it) { return '<li class="rv">' + icon(it.icon) + "<div><h3>" + esc(it.title) + "</h3><p>" + esc(it.text) + "</p></div></li>"; }).join("") + "</ul>" +
    (C.instagram ? '<div class="ig rv"><p class="tag">' + esc(C.instagram.hashtag) + '</p><a class="btn ghost" href="' + esc(C.instagram.url) + '" target="_blank" rel="noopener">' + icon("insta") + esc(C.instagram.button) + "</a></div>" : "") +
    "</div></section>";

  // ---------- 8. countdown ----------
  h += '<section id="countdown" class="countdown"><div class="cd-bg"><img src="' + esc(C.countdown.bg) + '" alt="" width="900" height="1600" loading="lazy"></div><canvas class="cd-fx" aria-hidden="true"></canvas>' +
    '<div class="wrap c cd-wrap"><p class="kicker rv">' + esc(C.countdown.kicker) + '</p><h2 class="cd-title rv">' + esc(C.countdown.title) + "</h2>" +
    '<div class="cd rv" role="timer" aria-live="off">' + ["Days", "Hours", "Minutes", "Seconds"].map(function (l, i) { return "<div><b id=\"cd-" + "dhms"[i] + '">--</b><span>' + l + "</span></div>"; }).join("") + "</div>" +
    '<p class="cd-after" hidden>' + esc(C.countdown.after) + "</p>" +
    (C.countdown.ics ? '<a class="btn ghost light rv" href="' + esc(C.countdown.ics) + '" download>' + icon("cal") + "Add to calendar</a>" : "") + "</div></section>";

  // ---------- 9. footer ----------
  h += '<footer class="foot"><p class="foot-names">' + esc(cp.first1) + " " + esc(C.invitation.joiner || "&") + " " + esc(cp.first2) + '</p><p class="foot-fam">' + esc(C.footer.withLove) + "</p>" + divider() +
    '<p class="sample">' + esc(C.meta.sampleLabel) + "</p>" + C.credits.map(function (c) { return '<p class="credit">' + esc(c) + "</p>"; }).join("") + "</footer>";

  h = h.replace(/<img([^>]*?) src="([^"]+)"([^>]*?)loading="lazy"/g, '<img$1 data-src="$2"$3loading="lazy"');
  $("#app").innerHTML = h;

  /* ================= MOTION ================= */
  // lazy images
  var lio = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { var im = e.target; im.src = im.getAttribute("data-src"); im.removeAttribute("data-src"); lio.unobserve(im); } }); }, { rootMargin: "600px 0px" });
  $$("img[data-src]").forEach(function (im) { lio.observe(im); });

  // headings: word stagger
  $$(".h2,.cd-title").forEach(function (el) { el.innerHTML = el.textContent.split(" ").map(function (w, i) { return '<span class="w" style="--i:' + i + '"><span>' + esc(w) + "</span></span>"; }).join(" "); });

  // reveal
  var rvs = $$(".rv");
  if (!RM && "IntersectionObserver" in window) {
    var rio = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("shown"); rio.unobserve(e.target); } }); }, { rootMargin: "0px 0px -8% 0px" });
    rvs.forEach(function (el) { rio.observe(el); });
  } else rvs.forEach(function (el) { el.classList.add("shown"); });

  // opening scroll progress
  var op = $("#opening"), opP = -1, opApi = { RM: RM, root: root, $: $, $$: $$, clamp: clamp };
  if (O && O.init) O.init(op, opApi);
  function opProgress() {
    var r = op.getBoundingClientRect(), span = op.offsetHeight - innerHeight;
    return span > 0 ? clamp(-r.top / span, 0, 1) : 1;
  }
  var ticking = false;
  function onScroll() {
    if (ticking) return; ticking = true;
    requestAnimationFrame(function () {
      ticking = false;
      var p = RM ? 1 : opProgress();
      if (Math.abs(p - opP) > 0.0005) { opP = p; if (O) O.update(p, opApi); op.classList.toggle("done", p > 0.98); root.style.setProperty("--opp", p.toFixed(4)); }
      if (C.parallax !== false) $$(".cd-bg img").forEach(function (im) { var r = im.parentNode.getBoundingClientRect(); if (r.bottom > 0 && r.top < innerHeight) im.style.transform = "translateY(" + (r.top * -0.08).toFixed(1) + "px) scale(1.12)"; });
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();

  // gallery: active dot + soft parallax
  var track = $(".g-track");
  if (track) {
    var dots = $$(".g-dots i"), items = $$(".g-item", track), gt = false;
    var gUp = function () {
      var w = track.clientWidth, sc = track.scrollLeft, best = 0, bd = 1e9;
      items.forEach(function (it, i) { var c = it.offsetLeft + it.offsetWidth / 2 - sc - w / 2; if (Math.abs(c) < bd) { bd = Math.abs(c); best = i; } if (!RM) $("img", it).style.transform = "translateX(" + (c * -0.1).toFixed(1) + "px) scale(1.16)"; });
      dots.forEach(function (d, i) { d.classList.toggle("on", i === best); });
    };
    track.addEventListener("scroll", function () { if (!gt) { gt = true; requestAnimationFrame(function () { gt = false; gUp(); }); } }, { passive: true });
    gUp();
  }

  // countdown
  var target = new Date(C.countdown.to).getTime(), cdEls = ["d", "h", "m", "s"].map(function (k) { return document.getElementById("cd-" + k); });
  function pad(n) { return n < 10 ? "0" + n : "" + n; }
  (function tick() {
    var ms = target - Date.now();
    if (ms <= 0) { $(".cd").hidden = true; $(".cd-after").hidden = false; return; }
    var t = Math.floor(ms / 1000), v = [Math.floor(t / 86400), Math.floor(t / 3600) % 24, Math.floor(t / 60) % 60, t % 60];
    v.forEach(function (n, i) { var s = pad(n); if (cdEls[i].textContent !== s) { cdEls[i].textContent = s; if (!RM) { cdEls[i].classList.remove("flip"); void cdEls[i].offsetWidth; cdEls[i].classList.add("flip"); } } });
    setTimeout(tick, 1000 - (Date.now() % 1000) + 5);
  })();

  // music
  var mb = $("#music"), audio = null;
  mb.addEventListener("click", function () {
    if (!audio) { audio = new Audio(C.music.src); audio.loop = true; }
    if (audio.paused) { var pr = audio.play(); if (pr && pr.catch) pr.catch(function () { mb.classList.remove("on"); }); mb.classList.add("on"); mb.setAttribute("aria-pressed", "true"); mb.setAttribute("aria-label", "Pause music"); }
    else { audio.pause(); mb.classList.remove("on"); mb.setAttribute("aria-pressed", "false"); mb.setAttribute("aria-label", "Play music"); }
  });

  /* ---------- particles (opening + countdown) ---------- */
  function particles(canvas, host, cfg) {
    if (!canvas || !cfg) return;
    var cx = canvas.getContext("2d"), W = 0, H = 0, ps = [], run = false, vis = false, allowed = false, last = 0, dpr = Math.min(2, devicePixelRatio || 1);
    function size() { W = host.clientWidth; H = host.clientHeight; canvas.width = W * dpr; canvas.height = H * dpr; canvas.style.width = W + "px"; canvas.style.height = H + "px"; cx.setTransform(dpr, 0, 0, dpr, 0, 0); }
    function mk(top) {
      var c = cfg.colors[Math.floor(Math.random() * cfg.colors.length)];
      var p = { x: Math.random() * W, y: top ? -20 : Math.random() * H, s: cfg.size[0] + Math.random() * (cfg.size[1] - cfg.size[0]), c: c, a: Math.random() * 6.28, va: (Math.random() - 0.5) * 0.04, vy: cfg.speed[0] + Math.random() * (cfg.speed[1] - cfg.speed[0]), vx: (Math.random() - 0.5) * 0.3, f: Math.random() * 6.28, vf: 0.01 + Math.random() * 0.03, o: 0.55 + Math.random() * 0.45 };
      if (cfg.rise) { p.y = top ? H + 20 : Math.random() * H; p.vy = -p.vy; }
      return p;
    }
    function draw(p) {
      cx.save(); cx.translate(p.x, p.y); cx.rotate(p.a); cx.globalAlpha = p.o; cx.fillStyle = p.c;
      var s = p.s;
      if (cfg.shape === "spark" || cfg.shape === "star") {
        var tw = 0.5 + 0.5 * Math.sin(p.f * 3); cx.globalAlpha = p.o * tw; cx.shadowColor = p.c; cx.shadowBlur = s * 3;
        cx.beginPath(); cx.arc(0, 0, s * 0.45, 0, 6.28); cx.fill();
      } else if (cfg.shape === "jasmine") {
        cx.scale(1, Math.abs(Math.cos(p.f)) * 0.6 + 0.4);
        for (var k = 0; k < 5; k++) { cx.rotate(1.2566); cx.beginPath(); cx.ellipse(0, -s * 0.55, s * 0.28, s * 0.55, 0, 0, 6.28); cx.fill(); }
        cx.fillStyle = "#F3D27A"; cx.beginPath(); cx.arc(0, 0, s * 0.16, 0, 6.28); cx.fill();
      } else if (cfg.shape === "lily") {
        cx.scale(Math.abs(Math.cos(p.f)) * 0.7 + 0.3, 1);
        cx.beginPath(); cx.moveTo(0, -s * 1.3); cx.bezierCurveTo(s * 0.55, -s * 0.6, s * 0.4, s * 0.8, 0, s); cx.bezierCurveTo(-s * 0.4, s * 0.8, -s * 0.55, -s * 0.6, 0, -s * 1.3); cx.fill();
        cx.globalAlpha = p.o * 0.35; cx.strokeStyle = "#D9C9A0"; cx.lineWidth = 0.8; cx.beginPath(); cx.moveTo(0, -s); cx.lineTo(0, s * 0.8); cx.stroke();
      } else {
        cx.scale(1, Math.abs(Math.cos(p.f)) * 0.8 + 0.2);
        cx.beginPath(); cx.moveTo(0, -s); cx.bezierCurveTo(s * 0.75, -s * 0.6, s * 0.6, s * 0.7, 0, s); cx.bezierCurveTo(-s * 0.6, s * 0.7, -s * 0.75, -s * 0.6, 0, -s); cx.fill();
        cx.globalAlpha = p.o * 0.3; cx.fillStyle = "#fff"; cx.beginPath(); cx.ellipse(-s * 0.15, -s * 0.2, s * 0.18, s * 0.5, 0, 0, 6.28); cx.fill();
      }
      cx.restore();
    }
    function frame(t) {
      if (!run) return;
      var dt = Math.min(3, (t - last) / 16.7 || 1); last = t; cx.clearRect(0, 0, W, H);
      var k = cfg.boost ? cfg.boost() : 1;
      for (var i = 0; i < ps.length; i++) {
        var p = ps[i]; p.y += p.vy * dt * k; p.f += p.vf * dt; p.x += (p.vx + Math.sin(p.f) * (cfg.sway || 0.6)) * dt; p.a += p.va * dt;
        if (p.y > H + 30 || p.y < -30) { ps[i] = mk(true); continue; }
        draw(p);
      }
      requestAnimationFrame(frame);
    }
    function setRun(v) { if (RM || !allowed) v = false; if (v && !run) { run = true; last = performance.now(); requestAnimationFrame(frame); } else if (!v) run = false; }
    size(); var n = Math.round(clamp(W / 10, 18, 50) * (cfg.density || 1)); for (var i = 0; i < n; i++) ps.push(mk(false));
    window.addEventListener("resize", function () { size(); });
    window.addEventListener("load", function () { setTimeout(function () { allowed = true; setRun(vis && !document.hidden); }, cfg.delay || 900); });
    new IntersectionObserver(function (e) { vis = e[0].isIntersecting; setRun(vis && !document.hidden); }).observe(host);
    document.addEventListener("visibilitychange", function () { setRun(vis && !document.hidden); });
    if (RM) ps.slice(0, 14).forEach(draw);
  }
  var opCv = $(".op-fx", op);
  if (opCv && C.particles && C.particles.opening) { var pc = C.particles.opening; pc.boost = function () { return 1 + Math.max(0, opP) * 1.6; }; particles(opCv, $(".op-stage", op), pc); }
  if (C.particles && C.particles.countdown) particles($(".cd-fx"), $("#countdown"), C.particles.countdown);

  requestAnimationFrame(function () { root.classList.add("ready"); });
})();
