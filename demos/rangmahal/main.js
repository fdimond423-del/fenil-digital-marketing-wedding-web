/* Rangmahal invite — renderer + motion. Content comes from config.js (window.INVITE). */
(function () {
  "use strict";
  var C = window.INVITE;
  var RM = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var root = document.documentElement;
  if (RM) root.classList.add("rm");
  var col = C.colors;
  Object.keys(col).forEach(function (k) { root.style.setProperty("--" + k, col[k]); });

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function nl(s) { return esc(s).replace(/\n/g, "<br>"); }
  function f1(n) { return Math.round(n * 10) / 10; }

  /* ---------- geometry: cusped (multi-foil) pointed arch ---------- */
  function archTop(x0, x1, ys, ya, lobes, bulge) {
    var cx = (x0 + x1) / 2, h = ys - ya;
    var c = (cx * cx + h * h - x0 * x0) / (2 * (cx - x0)), R = c - x0;
    var aL0 = Math.PI, aL1 = Math.atan2(ya - ys, cx - c); if (aL1 < 0) aL1 += 2 * Math.PI;
    function pt(s) {
      if (s <= 0.5) { var a = aL0 + (aL1 - aL0) * (s / 0.5); return [c + R * Math.cos(a), ys + R * Math.sin(a)]; }
      var q = (1 - s) / 0.5, a2 = aL0 + (aL1 - aL0) * q, xL = c + R * Math.cos(a2);
      return [x0 + x1 - xL, ys + R * Math.sin(a2)];
    }
    var d = "", p = pt(0);
    d += "M" + f1(p[0]) + " " + f1(p[1]);
    for (var k = 1; k <= lobes; k++) {
      var p0 = pt((k - 1) / lobes), p1 = pt(k / lobes);
      var ch = Math.hypot(p1[0] - p0[0], p1[1] - p0[1]), r = ch * (bulge || 0.62);
      d += "A" + f1(r) + " " + f1(r) + " 0 0 1 " + f1(p1[0]) + " " + f1(p1[1]);
    }
    return d;
  }
  function archShape(x0, x1, ys, ya, yb, lobes, bulge) {
    return archTop(x0, x1, ys, ya, lobes, bulge) + "L" + x1 + " " + yb + "L" + x0 + " " + yb + "Z";
  }

  /* ---------- small icon set (24px line icons) ---------- */
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
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>'
  };
  function icon(n, cls) { return '<svg class="ic ' + (cls || "") + '" viewBox="0 0 24 24" aria-hidden="true">' + IC[n] + "</svg>"; }

  /* ---------- Ganesha line art (original) ---------- */
  function ganesha(cls) {
    return '<svg class="' + cls + '" viewBox="0 0 120 120" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">' +
      '<path class="g-d" d="M60 8v6M52 30c0-9 4-14 8-16 4 2 8 7 8 16"/>' +
      '<path class="g-d" d="M45 33c4-3 9-4.5 15-4.5S71 30 75 33"/>' +
      '<path class="g-d" d="M47 36C35 30 20 33 17 45c-3 12 6 24 19 25 4 .3 7-1 9-3"/>' +
      '<path class="g-d" d="M73 36c12-6 27-3 30 9 3 12-6 24-19 25-4 .3-7-1-9-3"/>' +
      '<path class="g-d" d="M27 46c2-4 7-6 12-4M93 46c-2-4-7-6-12-4"/>' +
      '<path class="g-d" d="M47 36c-1 8 0 15 4 20M73 36c1 8 0 15-4 20"/>' +
      '<path class="g-d" d="M60 31v7M56.5 35.5h7"/><circle cx="60" cy="42" r="1.6" fill="currentColor"/>' +
      '<path class="g-d" d="M50 46q3-2.2 6 0M64 46q3-2.2 6 0"/>' +
      '<path class="g-d" d="M55 52c-1 12-1 22-6 31-4 7-12 8-14 2-1.6-4.5 2-8 6-6.5 2.4 1 2.6 4 .6 5"/>' +
      '<path class="g-d" d="M65 52c0 13-2 24-7.5 33"/>' +
      '<path class="g-d" d="M69 58c4 2 6 5 6.5 9"/>' +
      '<path class="g-d" d="M38 96c6 8 14 12 22 12s16-4 22-12"/>' +
      '<path class="g-d" d="M46 102c-6 1-11-1-14-5M74 102c6 1 11-1 14-5"/>' +
      '</g></svg>';
  }

  /* ---------- mandala (generated) ---------- */
  function mandala() {
    var s = '<svg class="mandala" viewBox="-200 -200 400 400" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.1">';
    var rings = [[12, 40, 18, 9], [16, 72, 30, 13], [24, 112, 36, 15], [32, 156, 40, 14], [48, 190, 22, 8]];
    rings.forEach(function (r, ri) {
      var n = r[0], rad = r[1], len = r[2], w = r[3];
      s += '<circle r="' + (rad - len * 0.55) + '" opacity=".6"/>';
      for (var i = 0; i < n; i++) {
        var a = (360 / n) * i + (ri % 2 ? 180 / n : 0);
        s += '<path transform="rotate(' + f1(a) + ')" d="M0 ' + (-rad + len) + 'C' + w + ' ' + (-rad + len * 0.55) + ' ' + w * 0.6 + ' ' + (-rad + 4) + ' 0 ' + (-rad) + 'C' + (-w * 0.6) + ' ' + (-rad + 4) + ' ' + (-w) + ' ' + (-rad + len * 0.55) + ' 0 ' + (-rad + len) + 'Z"/>';
        if (ri > 1) s += '<circle transform="rotate(' + f1(a + 180 / n) + ')" cy="' + (-rad + len * 0.4) + '" r="1.8"/>';
      }
    });
    return s + '<circle r="10"/><circle r="4" fill="currentColor"/></g></svg>';
  }

  /* ---------- marigold toran (garland) ---------- */
  function toran(x0, x1, y, swag, cls, vb) {
    var s = '<g class="' + cls + '">';
    s += '<path d="M' + x0 + " " + y + "H" + x1 + '" stroke="#7A3B12" stroke-width="2"/>';
    var step = swag, idx = 0;
    for (var x = x0; x < x1; x += step) {
      // swag of marigolds
      var n = 9;
      for (var i = 0; i <= n; i++) {
        var t = i / n, px = x + t * step, py = y + Math.sin(t * Math.PI) * step * 0.32;
        var cA = (i + idx) % 3 === 0 ? "#FFC23A" : "#F2801B";
        s += '<circle cx="' + f1(px) + '" cy="' + f1(py) + '" r="' + f1(step * 0.075) + '" fill="' + cA + '"/>' +
          '<circle cx="' + f1(px - step * 0.02) + '" cy="' + f1(py - step * 0.02) + '" r="' + f1(step * 0.03) + '" fill="#FFE08A" opacity=".75"/>';
      }
      // hanging strand from peg
      var hx = x, len = step * (idx % 2 ? 0.9 : 1.3);
      s += '<g class="strand" style="transform-origin:' + hx + "px " + y + "px;animation-delay:" + (-idx * 0.7) + 's">';
      for (var j = 0; j < 6; j++) {
        var sy = y + 4 + j * (len / 6);
        s += '<circle cx="' + hx + '" cy="' + f1(sy) + '" r="' + f1(step * 0.068) + '" fill="' + (j % 2 ? "#FFC23A" : "#E8661A") + '"/>';
      }
      var ly = y + 4 + len;
      s += '<path d="M' + hx + " " + f1(ly) + "c" + f1(step * 0.12) + " " + f1(step * 0.1) + " " + f1(step * 0.06) + " " + f1(step * 0.3) + " 0 " + f1(step * 0.36) + "c" + f1(-step * 0.06) + " " + f1(-step * 0.06) + " " + f1(-step * 0.12) + " " + f1(-step * 0.26) + ' 0 ' + f1(-step * 0.36) + 'z" fill="#3F7A32"/>';
      s += "</g>";
      idx++;
    }
    s += '<circle cx="' + x1 + '" cy="' + y + '" r="2" fill="#7A3B12"/></g>';
    return s;
  }
  function toranStrip(cls) {
    return '<svg class="toran-strip ' + (cls || "") + '" viewBox="0 0 400 70" preserveAspectRatio="xMidYMin slice" aria-hidden="true">' + toran(-10, 420, 6, 40, "tor") + "</svg>";
  }

  /* ---------- door ---------- */
  function door(letter, right) {
    var g = '<defs><linearGradient id="wd' + (right ? "r" : "l") + '" x1="0" x2="1"><stop offset="0" stop-color="' + (right ? "#0B302F" : "#17605C") + '"/><stop offset="1" stop-color="' + (right ? "#17605C" : "#0B302F") + '"/></linearGradient></defs>';
    var b = '<rect width="130" height="550" fill="url(#wd' + (right ? "r" : "l") + ')"/>';
    var m = '<g fill="none" stroke="#D9A441">';
    m += '<rect x="5" y="5" width="120" height="540" stroke-width="2.5"/><rect x="13" y="13" width="104" height="524" stroke="#9C7530" stroke-width="1"/>';
    // lattice upper panel
    m += '<g stroke-width=".9" opacity=".55">';
    for (var i = -10; i < 24; i++) m += '<path d="M' + (i * 12) + ' 20l120 120M' + (i * 12 + 120) + ' 20l-120 120"/>';
    m += "</g>";
    m += '<path d="M20 150h90" stroke-width="1.6"/>';
    // mid panel with small cusped arch top
    m += '<path d="' + archShape(24, 106, 214, 172, 360, 5, 0.6) + '" stroke-width="2"/>';
    m += '<circle cx="65" cy="282" r="33" stroke-width="2"/><circle cx="65" cy="282" r="26" stroke="#9C7530"/>';
    for (var p = 0; p < 16; p++) m += '<path transform="rotate(' + p * 22.5 + ' 65 282)" d="M65 243c3 2 4 5 0 9-4-4-3-7 0-9z" fill="#D9A441" stroke="none"/>';
    // lower panel with brass cross bands
    m += '<rect x="24" y="378" width="82" height="148" stroke-width="2"/><path d="M24 378l82 148M106 378L24 526" stroke-width="3" opacity=".8"/>';
    m += '<circle cx="65" cy="452" r="12" fill="#D9A441" stroke="none"/><circle cx="65" cy="452" r="6" fill="#0E3A38" stroke="none"/>';
    m += "</g>";
    // studs
    var st = '<g fill="#E6B653">';
    for (var y = 30; y < 540; y += 22) { st += '<circle cx="9" cy="' + y + '" r="2.4"/><circle cx="121" cy="' + y + '" r="2.4"/>'; }
    for (var x = 30; x < 110; x += 20) st += '<circle cx="' + x + '" cy="366" r="2.4"/>';
    st += "</g>";
    // knocker near inner edge
    var kn = '<g fill="none" stroke="#E6B653" stroke-width="3"><circle cx="112" cy="330" r="9"/></g><circle cx="112" cy="319" r="4" fill="#E6B653"/>';
    var shade = '<rect x="118" width="12" height="550" fill="#000" opacity=".25"/>';
    var art = right ? '<g transform="matrix(-1 0 0 1 130 0)">' + b + m + st + kn + shade + "</g>" : b + m + st + kn + shade;
    var txt = '<text x="65" y="296" text-anchor="middle" class="door-letter">' + esc(letter) + "</text>";
    return '<svg viewBox="0 0 130 550" preserveAspectRatio="none" aria-hidden="true">' + g + art + txt + "</svg>";
  }

  /* ---------- jharokha facade (wall + arch opening) ---------- */
  function facade() {
    var hole = archShape(70, 330, 300, 150, 700, 9, 0.6);
    var s = '<svg class="facade" viewBox="-400 0 1200 760" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs>' +
      '<linearGradient id="sand" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F1C9A2"/><stop offset=".55" stop-color="#E2A57C"/><stop offset="1" stop-color="#C5815A"/></linearGradient>' +
      '<pattern id="jaali" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M12 2c4 6 4 14 0 20-4-6-4-14 0-20zM2 12c6-4 14-4 20 0-6 4-14 4-20 0z" fill="none" stroke="#A9603C" stroke-width=".8"/></pattern>' +
      '<radialGradient id="niche" cx=".5" cy=".3" r=".8"><stop offset="0" stop-color="#9E5A3E"/><stop offset="1" stop-color="#6E3524"/></radialGradient>' +
      "</defs>";
    s += '<path fill="url(#sand)" fill-rule="evenodd" d="M-400 0H800V760H-400Z' + hole + '"/>';
    s += '<path fill="url(#jaali)" opacity=".35" fill-rule="evenodd" d="M-400 0H800V760H-400Z' + hole + '"/>';
    // side blind niches & small jharokhas
    [-330, -170, 470, 630].forEach(function (x, i) {
      var w = 100;
      s += '<path d="' + archShape(x, x + w, 360, 290, 700, 7, 0.6) + '" fill="url(#niche)"/>';
      s += '<path d="' + archShape(x - 8, x + w + 8, 356, 280, 708, 7, 0.6) + '" fill="none" stroke="#FBE3C4" stroke-width="2" opacity=".7"/>';
      s += '<path d="' + archShape(x + 22, x + w - 22, 200, 160, 250, 5, 0.6) + '" fill="url(#niche)"/>';
      s += '<rect x="' + (x + 12) + '" y="250" width="' + (w - 24) + '" height="10" fill="#B46C47"/>';
      s += '<circle cx="' + (x + w / 2) + '" cy="560" r="10" fill="#FFB648" opacity=".85" class="lamp"/>';
    });
    // reveal + gold trim around opening
    s += '<path d="' + hole + '" fill="none" stroke="#8E4A30" stroke-width="14"/>';
    s += '<path d="' + hole + '" fill="none" stroke="#E8B656" stroke-width="3"/>';
    s += '<path d="' + archShape(56, 344, 296, 128, 700, 9, 0.6) + '" fill="none" stroke="#9E5A3B" stroke-width="2"/>';
    s += '<path d="' + archShape(48, 352, 294, 118, 700, 9, 0.6) + '" fill="none" stroke="#FBE3C4" stroke-width="1.5" opacity=".8"/>';
    // pillars
    [26, 338].forEach(function (x) {
      s += '<rect x="' + x + '" y="306" width="36" height="384" fill="#E9B78E"/>';
      for (var k = 0; k < 4; k++) s += '<path d="M' + (x + 6 + k * 8) + ' 318V680" stroke="#B9744E" stroke-width="2"/>';
      s += '<path d="M' + (x - 6) + " 306h48l-6 -14h-36z" + '" fill="#D9925F"/><rect x="' + (x - 8) + '" y="286" width="52" height="7" fill="#C37C51"/>';
      s += '<path d="M' + (x - 6) + " 690h48l6 14h-60z" + '" fill="#C37C51"/>';
    });
    // spandrel rosettes
    [[112, 178], [288, 178]].forEach(function (p) {
      s += '<g transform="translate(' + p[0] + " " + p[1] + ')"><circle r="16" fill="#C97A50"/><circle r="11" fill="none" stroke="#FBE3C4" stroke-width="1.5"/>';
      for (var k = 0; k < 8; k++) s += '<path transform="rotate(' + k * 45 + ')" d="M0-10c2.5 3 2.5 6 0 8-2.5-2-2.5-5 0-8z" fill="#E8B656"/>';
      s += '<circle r="3" fill="#E8B656"/></g>';
    });
    // chhajja (eave) + brackets
    s += '<path d="M-400 96H800V108H-400z" fill="#C88257"/><path d="M-400 108H800L790 124H-390z" fill="#A8603E"/>';
    for (var bx = -390; bx < 800; bx += 60) s += '<path d="M' + bx + " 124h14v10c0 10-14 14-14 22z" + '" fill="#B56B45"/>';
    // kanguras (crest)
    for (var kx = -400; kx < 800; kx += 30) s += '<path d="M' + kx + " 96v-14c0-8 8-14 15-18 7 4 15 10 15 18v14z" + '" fill="#E2A57C" stroke="#B9744E" stroke-width="1.2"/>';
    // central crest medallion with Ganesha
    s += '<g transform="translate(200 52)"><circle r="34" fill="#C97A50" stroke="#E8B656" stroke-width="3"/><circle r="27" fill="#7A2E1F"/></g>';
    s += '<g transform="translate(176 28) scale(.4)" style="color:#F2C56A">' + ganesha("").replace(/^<svg[^>]*>/, "").replace(/<\/svg>$/, "") + "</g>";
    // threshold steps
    s += '<path d="M-400 700H800V760H-400z" fill="#B87150"/><path d="M40 700h320l14 16H26z" fill="#E7B48A"/><path d="M26 716h348l14 18H12z" fill="#D69B71"/>';
    s += '<path d="M-400 700H800" stroke="#FBE3C4" stroke-width="2" opacity=".5"/>';
    // toran across
    s += toran(-400, 800, 136, 50, "tor");
    s += "</svg>";
    return s;
  }

  /* ---------- carved arch frame for couple photo ---------- */
  function coupleFrame(img) {
    var win = archShape(40, 260, 150, 50, 380, 9, 0.6);
    var s = '<svg class="cframe" viewBox="0 0 300 420" role="img" aria-label="' + esc(img.alt) + '"><defs><clipPath id="cwin"><path d="' + win + '"/></clipPath>' +
      '<linearGradient id="gfr" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F7D58C"/><stop offset=".5" stop-color="#C08A2E"/><stop offset="1" stop-color="#F0C46E"/></linearGradient></defs>';
    s += '<path d="' + archShape(14, 286, 140, 18, 410, 9, 0.6) + '" fill="#7A2E2A"/>';
    s += '<path d="' + archShape(14, 286, 140, 18, 410, 9, 0.6) + '" fill="none" stroke="url(#gfr)" stroke-width="4"/>';
    s += '<path d="' + archShape(26, 274, 146, 34, 396, 9, 0.6) + '" fill="none" stroke="url(#gfr)" stroke-width="1.5" stroke-dasharray="2 4"/>';
    s += '<image href="' + esc(img.src) + '" x="40" y="30" width="220" height="350" preserveAspectRatio="xMidYMid slice" clip-path="url(#cwin)" class="cimg"/>';
    s += '<path d="' + win + '" fill="none" stroke="url(#gfr)" stroke-width="3"/>';
    // lotus finial
    s += '<g transform="translate(150 16)"><path d="M0-14c6 5 6 11 0 16-6-5-6-11 0-16z" fill="url(#gfr)"/><path d="M-3 1c-8-1-14-5-15-11 7 0 12 3 15 8zM3 1c8-1 14-5 15-11-7 0-12 3-15 8z" fill="url(#gfr)"/></g>';
    // base plinth
    s += '<rect x="6" y="404" width="288" height="12" rx="3" fill="url(#gfr)"/>';
    return s + "</svg>";
  }

  /* ---------- dusk scene ---------- */
  function dusk() {
    var s = '<div class="dusk-scene" aria-hidden="true">';
    s += '<div class="lake"><i></i><i></i><i></i><i></i><i></i></div>';
    var d = [[10, 30, 0.7], [24, 12, 1.05], [40, 38, 0.55], [52, 20, 0.9], [66, 42, 0.5], [76, 8, 1.1], [90, 30, 0.7]];
    d.forEach(function (p, i) {
      s += '<div class="diya" style="left:' + p[0] + "%;bottom:" + p[1] + "%;--s:" + p[2] + ";animation-delay:" + (-i * 0.9) + 's">' +
        '<span class="glow"></span><span class="flame" style="animation-delay:' + (-i * 0.13) + 's"></span>' +
        '<svg viewBox="0 0 60 26"><path d="M2 6c6 14 18 18 28 18S52 20 58 6C46 10 14 10 2 6z" fill="#B4532A"/><path d="M2 6c12 4 44 4 56 0" stroke="#E08A4B" stroke-width="2" fill="none"/><circle cx="16" cy="14" r="1.6" fill="#E7B04E"/><circle cx="30" cy="16" r="1.6" fill="#E7B04E"/><circle cx="44" cy="14" r="1.6" fill="#E7B04E"/></svg>' +
        '<span class="refl"></span></div>';
    });
    return s + "</div>";
  }

  /* ---------- section heading ---------- */
  function orn(cls) {
    return '<svg class="orn ' + (cls || "") + '" viewBox="0 0 200 24" aria-hidden="true"><path d="M4 12h70M126 12h70" stroke="currentColor" stroke-width="1.2"/><circle cx="78" cy="12" r="2" fill="currentColor"/><circle cx="122" cy="12" r="2" fill="currentColor"/>' +
      '<path d="M100 2c6 4 7 10 0 18-7-8-6-14 0-18z" fill="currentColor"/><path d="M98 18c-7 0-13-3-15-9 6-.5 11 2 15 7zM102 18c7 0 13-3 15-9-6-.5-11 2-15 7z" fill="currentColor" opacity=".7"/></svg>';
  }

  /* ================= RENDER ================= */
  var cp = C.couple, html = "";
  var archMask = "url(\"data:image/svg+xml," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 125" preserveAspectRatio="none"><path d="' + archShape(3, 97, 56, 3, 125, 7, 0.95) + '"/></svg>') + "\")";
  root.style.setProperty("--arch", archMask);

  // 1. Opening — painted facade with an arch; doors behind it swing open in 3D
  function splitLetters(t, base) { return t.split("").map(function (ch, i) { return '<span class="ch" style="--i:' + (base + i) + '">' + esc(ch) + "</span>"; }).join(""); }
  html += '<section id="opening" class="opening" aria-label="Opening">' +
    '<div class="op-sticky">' +
    '<div class="op-inner"><img class="op-bg" data-src="assets/art/inner.webp" alt="" width="720" height="1280" decoding="async"><div class="op-glow"></div>' +
    '<div class="op-names"><p class="eyebrow">' + esc(C.opening.eyebrow) + "</p>" +
    '<h1 class="names"><span class="nm">' + splitLetters(cp.groom, 0) + '</span><span class="amp">&amp;</span><span class="nm">' + splitLetters(cp.bride, cp.groom.length + 1) + "</span></h1>" +
    orn("gold") + '<p class="op-date">' + esc(C.opening.dateLine) + '</p><p class="op-city">' + esc(C.opening.city) + "</p></div></div>" +
    '<div class="op-stage"><div class="doors"><div class="door l"><img src="assets/art/door-l.webp" alt="" width="300" height="1069"><span class="dshade"></span><span class="mono">' + esc(cp.groom.charAt(0)) + '</span></div>' +
    '<div class="door r"><img src="assets/art/door-r.webp" alt="" width="300" height="1063"><span class="dshade"></span><span class="mono">' + esc(cp.bride.charAt(0)) + '</span></div><div class="door-gap"></div></div>' +
    '<img class="facade" src="assets/art/facade.webp" alt="A carved rose-sandstone palace doorway" width="720" height="1280" fetchpriority="high"></div>' +
    '<img class="toran top" src="assets/art/toran.webp" alt="" width="900" height="326">' +
    '<canvas class="petals" aria-hidden="true"></canvas>' +
    '<div class="op-hint"><p class="op-top"><span>' + esc(C.opening.eyebrow) + '</span><b>' + esc(cp.groom) + " &amp; " + esc(cp.bride) + "</b><span>" + esc(C.opening.dateLine) + '</span></p><p class="scroll-cue"><span>' + esc(C.opening.doorHint) + '</span><i aria-hidden="true"></i></p></div>' +
    "</div></section>";

  // 2. Blessing + invitation
  html += '<section id="blessing" class="blessing tex-ivory">' +
    '<div class="wrap">' + '<img class="ganesha rv" src="assets/art/ganesha.webp" alt="Lord Ganesha" width="420" height="452" loading="lazy">' +
    '<p class="mantra rv" lang="sa">' + esc(C.mantra.line) + "</p>" +
    '<p class="shloka rv" lang="sa">' + nl(C.mantra.shloka) + "</p>" +
    '<p class="meaning rv">' + esc(C.mantra.meaning) + "</p>" + orn("rv maroon") +
    '<p class="fam rv">' + esc(C.invitation.families) + "</p>" +
    '<p class="inv rv">' + esc(C.invitation.text) + "</p>" +
    '<p class="full rv"><span>' + esc(cp.groomFull) + '</span><em>with</em><span>' + esc(cp.brideFull) + "</span></p>" +
    '<p class="inv small rv">' + esc(C.invitation.closing) + "</p></div></section>";

  // 3. Events
  html += '<section id="events" class="events tex-ivory"><div class="wrap"><p class="kicker rv">Join us for</p><h2 class="h2 rv">The Celebrations</h2>' + orn("rv maroon") + '<div class="ev-list">';
  C.events.forEach(function (e, i) {
    var p = e.palette;
    html += '<article class="ev" style="--bg:' + p.bg + ";--deep:" + p.deep + ";--ink:" + p.ink + ";--acc:" + p.accent + '">' +
      '<div class="ev-arch"><img src="' + esc(e.image) + '" alt="' + esc(e.imageAlt) + '" width="640" height="800" loading="lazy" decoding="async"></div>' +
      '<svg class="ev-line" viewBox="0 0 100 125" preserveAspectRatio="none" aria-hidden="true"><path pathLength="1" d="' + archShape(3, 97, 56, 3, 125, 7, 0.95) + '"/></svg>' +
      '<div class="ev-body"><p class="ev-num">' + String(i + 1).padStart(2, "0") + " · " + '<span lang="hi">' + esc(e.local) + "</span></p>" +
      "<h3>" + esc(e.name) + "</h3>" +
      '<ul class="ev-facts"><li>' + icon("cal") + "<span>" + esc(e.dateLabel) + "</span></li><li>" + icon("clock") + "<span>" + esc(e.time) + "</span></li><li>" + icon("pin") + "<span>" + esc(e.venue) + "<small>" + esc(e.area) + "</small></span></li><li>" + icon("dress") + "<span>Dress: " + esc(e.dress) + "</span></li></ul>" +
      '<a class="btn ev-btn" href="' + esc(e.map) + '" target="_blank" rel="noopener">See the route ' + icon("arrow") + "</a></div></article>";
  });
  html += "</div></div></section>";

  // 4. Gallery
  html += '<section id="gallery" class="gallery tex-teal"><div class="wrap"><p class="kicker light rv">Pre-wedding</p><h2 class="h2 light rv">' + esc(C.gallery.title) + "</h2>" + orn("rv gold") + "</div>" +
    '<div class="g-track" tabindex="0" aria-label="Photo gallery, swipe to see more">';
  C.gallery.images.forEach(function (g, i) {
    html += '<figure class="g-item"><div class="g-frame"><img src="' + esc(g.src) + '" alt="' + esc(g.alt) + '" width="600" height="800" loading="lazy" decoding="async"></div></figure>';
  });
  html += '</div><div class="g-dots" aria-hidden="true">' + C.gallery.images.map(function (_, i) { return "<i" + (i ? "" : ' class="on"') + "></i>"; }).join("") + '</div><p class="g-hint">Swipe to see more</p></section>';

  // 5. Couple + RSVP
  var wa = "https://wa.me/" + encodeURIComponent(C.rsvp.whatsapp) + "?text=" + encodeURIComponent(C.rsvp.message);
  html += '<section id="couple" class="couple tex-rose"><div class="wrap"><p class="kicker rv">Meet</p><h2 class="h2 rv">The Bride &amp; The Groom</h2>' + orn("rv maroon") +
    '<div class="cframe-wrap rv"><div class="cframe"><img class="cphoto" src="' + esc(C.couplePhoto.src) + '" alt="' + esc(C.couplePhoto.alt) + '" width="640" height="853" loading="lazy"><img class="cfr" src="assets/art/frame.webp" alt="" width="600" height="1002" loading="lazy"></div></div>' +
    '<div class="bios"><div class="bio rv"><h3>' + esc(cp.brideFull) + '</h3><p class="par">' + esc(cp.brideParents) + "</p><p>" + esc(cp.brideBio) + '</p></div>' +
    '<div class="bio rv"><h3>' + esc(cp.groomFull) + '</h3><p class="par">' + esc(cp.groomParents) + "</p><p>" + esc(cp.groomBio) + "</p></div></div>" +
    '<p class="story rv">' + esc(cp.story) + "</p>" +
    '<div class="rsvp rv"><h2 class="h2 light">' + esc(C.rsvp.title) + '</h2><p>' + esc(C.rsvp.text) + "</p>" +
    '<a class="pulse wa" href="' + wa + '" target="_blank" rel="noopener" aria-label="' + esc(C.rsvp.button) + '"><span class="rip"></span><span class="rip"></span><span class="rip"></span>' + icon("chat", "big") + "</a>" +
    '<a class="btn rsvp-btn" href="' + wa + '" target="_blank" rel="noopener">' + esc(C.rsvp.button) + "</a></div></div></section>";

  // 6. Things to know + IG
  html += '<section id="info" class="info tex-ivory">' + '<img class="toran mini" src="assets/art/toran.webp" alt="" width="1241" height="450" loading="lazy">' + '<div class="wrap"><p class="kicker rv">Before you pack</p><h2 class="h2 rv">Good to Know</h2>' + orn("rv maroon") + '<ul class="tiles">';
  C.info.forEach(function (it) { html += '<li class="tile rv"><span class="tile-ic">' + icon(it.icon) + "</span><div><h3>" + esc(it.title) + "</h3><p>" + esc(it.text) + "</p></div></li>"; });
  html += "</ul>" +
    '<div class="ig rv"><p class="tag">' + esc(C.hashtag) + '</p><h2 class="h2">' + esc(C.instagram.title) + "</h2><p>" + esc(C.instagram.handle) + "</p>" +
    '<a class="pulse igb" href="' + esc(C.instagram.url) + '" aria-label="' + esc(C.instagram.button) + '"><span class="rip"></span><span class="rip"></span><span class="rip"></span>' + icon("insta", "big") + "</a></div></div></section>";

  // 7. Countdown + footer
  html += '<section id="countdown" class="countdown"><div class="cd-bg" data-speed="-0.06"><img src="assets/art/dusk.webp" alt="" width="810" height="1440" loading="lazy"></div><div class="stars" aria-hidden="true"></div>' +
    '<div class="wrap cd-wrap"><p class="kicker gold rv">' + esc(C.events[C.events.length - 1].dateLabel) + '</p><h2 class="cd-title rv">' + esc(C.countdownTitle) + '</h2>' +
    '<div class="cd rv" role="timer" aria-live="off"><div><b id="cd-d">--</b><span>Days</span></div><div><b id="cd-h">--</b><span>Hours</span></div><div><b id="cd-m">--</b><span>Minutes</span></div><div><b id="cd-s">--</b><span>Seconds</span></div></div>' +
    '<p class="cd-after" hidden>' + esc(C.countdownAfter) + "</p></div>" + dusk() + "</section>";
  html += '<footer class="foot"><p class="foot-names">' + esc(cp.groom) + " &amp; " + esc(cp.bride) + '</p><p class="foot-fam">With love, ' + esc(C.invitation.families) + '</p><p class="sample">' + esc(C.meta.sampleLabel) + "</p>" +
    C.credits.map(function (c) { return '<p class="credit">' + esc(c) + "</p>"; }).join("") + "</footer>";

  // defer below-the-fold images: swap to data-src, loaded by an observer
  html = html.replace(/<img([^>]*?) src="([^"]+)"([^>]*?)loading="lazy"/g, '<img$1 data-src="$2"$3loading="lazy"');
  document.getElementById("app").innerHTML = html;
  document.title = C.meta.title + " (sample)";

  /* ================= MOTION ================= */
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  function clamp(v, a, b) { return Math.min(b, Math.max(a, v)); }
  function ease(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }

  var op = $("#opening"), stage = $(".op-stage"), dl = $(".door.l"), dr = $(".door.r"), names = $(".op-names"), hint = $(".op-hint"),
    shades = $$(".dshade"), gap = $(".door-gap"), tor = $(".toran.top");
  var opP = RM ? 1 : 0, vh = window.innerHeight;
  var par = $$("[data-speed]");

  function onScroll() {
    vh = window.innerHeight;
    if (!RM) {
      var r = op.getBoundingClientRect(), span = op.offsetHeight - vh;
      opP = clamp(-r.top / span, 0, 1);
      var d = ease(clamp(opP / 0.5, 0, 1)), z = ease(clamp((opP - 0.28) / 0.6, 0, 1));
      dl.style.transform = "rotateY(" + (d * 84).toFixed(2) + "deg)";
      dr.style.transform = "rotateY(" + (-d * 84).toFixed(2) + "deg)";
      shades[0].style.opacity = shades[1].style.opacity = (d * 0.7).toFixed(3);
      gap.style.opacity = (Math.min(1, d * 4)).toFixed(3);
      stage.style.transform = "translate(-50%,-50%) scale(" + (1 + z * 2.4).toFixed(4) + ")";
      stage.style.opacity = (1 - clamp((opP - 0.62) / 0.3, 0, 1)).toFixed(3);
      names.style.transform = "scale(" + (0.82 + 0.18 * z).toFixed(4) + ")";
      names.style.opacity = (0.35 + 0.65 * d).toFixed(3);
      hint.style.opacity = (1 - clamp(opP * 6, 0, 1)).toFixed(3);
      tor.style.transform = "translate(-50%," + (-z * 140).toFixed(1) + "px) scale(" + (1 + z * 0.6).toFixed(3) + ")";
      tor.style.opacity = (1 - clamp((opP - 0.45) / 0.3, 0, 1)).toFixed(3);
      op.classList.toggle("open", d > 0.42);
      op.classList.toggle("idle", opP < 0.01);
      for (var i = 0; i < par.length; i++) {
        var el = par[i], rr = el.getBoundingClientRect();
        if (rr.bottom < -200 || rr.top > vh + 200) continue;
        var off = (rr.top + rr.height / 2 - vh / 2) * parseFloat(el.getAttribute("data-speed"));
        el.style.transform = "translate3d(0," + off.toFixed(1) + "px,0)";
      }
    }
  }
  var ticking = false;
  window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(function () { ticking = false; onScroll(); }); } }, { passive: true });
  window.addEventListener("resize", function () { sizeCanvas(); onScroll(); });
  onScroll();

  // reveal on enter
  var io = new IntersectionObserver(function (ents) {
    ents.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
  $$(".rv, .ev, .tile").forEach(function (el) { io.observe(el); });

  /* ---------- deferred loading ---------- */
  function loadImg(im) { if (im.dataset.src) { im.src = im.dataset.src; im.removeAttribute("data-src"); } }
  var lio = new IntersectionObserver(function (ents) {
    ents.forEach(function (en) { if (en.isIntersecting) { loadImg(en.target); lio.unobserve(en.target); } });
  }, { rootMargin: "900px 0px 900px 0px" });
  $$("img[data-src]").forEach(function (im) { if (!im.classList.contains("op-bg")) lio.observe(im); });
  var tio = new IntersectionObserver(function (ents) {
    ents.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("tex-on"); if (en.target.id === "blessing") root.classList.add("dev-on"); tio.unobserve(en.target); } });
  }, { rootMargin: "1200px 0px" });
  $$("section").forEach(function (sec) { tio.observe(sec); });
  var innerLoaded = false;
  function loadInner() { if (innerLoaded) return; innerLoaded = true; loadImg($(".op-bg")); }
  window.addEventListener("scroll", loadInner, { passive: true, once: true });
  window.addEventListener("load", function () { setTimeout(loadInner, 200); });

  /* ---------- petals ---------- */
  var cv = $(".petals"), cx = cv.getContext("2d"), petals = [], W = 0, H = 0, dpr = 1, running = false, opVisible = true;
  var PC = ["#F28A1E", "#FFB627", "#E8661A", "#C2185B", "#E0405E", "#FFD166"];
  function sizeCanvas() {
    dpr = Math.min(2, window.devicePixelRatio || 1); W = cv.clientWidth; H = cv.clientHeight;
    cv.width = W * dpr; cv.height = H * dpr; cx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  function mk(top) {
    var big = Math.random();
    return { x: Math.random() * W, y: top ? -20 - Math.random() * H * 0.3 : Math.random() * H, s: 5 + big * 9, vy: 0.35 + big * 0.9, vx: (Math.random() - 0.5) * 0.4,
      a: Math.random() * 6.28, va: (Math.random() - 0.5) * 0.05, f: Math.random() * 6.28, vf: 0.02 + Math.random() * 0.04, c: PC[(Math.random() * PC.length) | 0], o: 0.55 + big * 0.45 };
  }
  sizeCanvas();
  var N = Math.round(clamp(W / 10, 26, 60));
  for (var i = 0; i < N; i++) petals.push(mk(false));
  var last = 0;
  function frame(t) {
    if (!running) return;
    var dt = Math.min(3, (t - last) / 16.7 || 1); last = t;
    cx.clearRect(0, 0, W, H);
    var boost = 1 + opP * 2.2;
    for (var i = 0; i < petals.length; i++) {
      var p = petals[i];
      p.y += p.vy * dt * boost; p.f += p.vf * dt; p.x += (p.vx + Math.sin(p.f) * 0.6) * dt; p.a += p.va * dt;
      if (p.y > H + 20) { petals[i] = mk(true); continue; }
      cx.save(); cx.translate(p.x, p.y); cx.rotate(p.a); cx.scale(1, Math.abs(Math.cos(p.f)) * 0.8 + 0.2);
      cx.globalAlpha = p.o; cx.fillStyle = p.c;
      cx.beginPath(); cx.moveTo(0, -p.s); cx.bezierCurveTo(p.s * 0.75, -p.s * 0.6, p.s * 0.6, p.s * 0.7, 0, p.s); cx.bezierCurveTo(-p.s * 0.6, p.s * 0.7, -p.s * 0.75, -p.s * 0.6, 0, -p.s); cx.fill();
      cx.globalAlpha = p.o * 0.35; cx.fillStyle = "#fff"; cx.beginPath(); cx.ellipse(-p.s * 0.15, -p.s * 0.2, p.s * 0.18, p.s * 0.5, 0, 0, 6.28); cx.fill();
      cx.restore();
    }
    requestAnimationFrame(frame);
  }
  var petalsAllowed = false;
  window.addEventListener("load", function () { setTimeout(function () { petalsAllowed = true; setRun(opVisible && !document.hidden); }, 700); });
  function setRun(v) { if (RM || !petalsAllowed) v = false; if (v && !running) { running = true; last = performance.now(); requestAnimationFrame(frame); } else if (!v) running = false; }
  new IntersectionObserver(function (e) { opVisible = e[0].isIntersecting; setRun(opVisible && !document.hidden); }).observe(op);
  document.addEventListener("visibilitychange", function () { setRun(opVisible && !document.hidden); });
  if (RM) {
    // static flourish for reduced motion
    for (var k = 0; k < petals.length; k++) { var q = petals[k]; cx.globalAlpha = 0.6; cx.fillStyle = q.c; cx.beginPath(); cx.ellipse(q.x, q.y, q.s * 0.5, q.s, q.a, 0, 6.28); cx.fill(); }
  }

  /* ---------- gallery ---------- */
  var track = $(".g-track"), dots = $$(".g-dots i"), gImgs = $$(".g-item img");
  function gUpdate() {
    var w = track.clientWidth, sc = track.scrollLeft, items = $$(".g-item", track), best = 0, bd = 1e9;
    items.forEach(function (it, i) {
      var c = it.offsetLeft + it.offsetWidth / 2 - sc - w / 2;
      if (Math.abs(c) < bd) { bd = Math.abs(c); best = i; }
      if (!RM) { gImgs[i].style.transform = "translateX(" + (c * -0.12).toFixed(1) + "px) scale(1.18)"; it.style.setProperty("--k", (1 - Math.min(1, Math.abs(c) / w) * 0.12).toFixed(3)); }
    });
    dots.forEach(function (d, i) { d.classList.toggle("on", i === best); });
  }
  var gt = false;
  track.addEventListener("scroll", function () { if (!gt) { gt = true; requestAnimationFrame(function () { gt = false; gUpdate(); }); } }, { passive: true });
  gUpdate();

  /* ---------- stars ---------- */
  var stars = $(".stars"), sh = "";
  for (var s = 0; s < 70; s++) {
    var sz = Math.random() < 0.15 ? 3 : Math.random() < 0.5 ? 2 : 1.4;
    sh += '<i style="left:' + (Math.random() * 100).toFixed(1) + "%;top:" + (Math.pow(Math.random(), 1.6) * 62).toFixed(1) + "%;width:" + sz + "px;height:" + sz + "px;animation-delay:" + (-Math.random() * 4).toFixed(2) + "s;animation-duration:" + (2.5 + Math.random() * 3).toFixed(2) + 's"></i>';
  }
  stars.innerHTML = sh;

  /* ---------- countdown ---------- */
  var target = new Date(C.countdownTo).getTime(), cdEls = ["d", "h", "m", "s"].map(function (k) { return document.getElementById("cd-" + k); });
  function pad(n) { return n < 10 ? "0" + n : "" + n; }
  function tick() {
    var ms = target - Date.now();
    if (ms <= 0) { $(".cd").hidden = true; $(".cd-after").hidden = false; $(".cd-title").textContent = C.countdownAfter; return; }
    var t = Math.floor(ms / 1000), v = [Math.floor(t / 86400), Math.floor(t / 3600) % 24, Math.floor(t / 60) % 60, t % 60];
    v.forEach(function (n, i) { var s = pad(n); if (cdEls[i].textContent !== s) { cdEls[i].textContent = s; if (!RM) { cdEls[i].classList.remove("flip"); void cdEls[i].offsetWidth; cdEls[i].classList.add("flip"); } } });
    setTimeout(tick, 1000 - (Date.now() % 1000) + 5);
  }
  tick();

  /* ---------- music ---------- */
  var mb = document.getElementById("music"), audio = null;
  mb.addEventListener("click", function () {
    if (!audio) { audio = new Audio(C.music.src); audio.loop = true; audio.preload = "auto"; }
    if (audio.paused) {
      var pr = audio.play();
      if (pr && pr.catch) pr.catch(function () { mb.classList.remove("on"); mb.setAttribute("aria-pressed", "false"); });
      mb.classList.add("on"); mb.setAttribute("aria-pressed", "true"); mb.setAttribute("aria-label", "Pause music");
    } else {
      audio.pause(); mb.classList.remove("on"); mb.setAttribute("aria-pressed", "false"); mb.setAttribute("aria-label", "Play music");
    }
  });

  if (RM) op.classList.add("open");
  // staggered word reveal for headings
  $$(".h2, .cd-title").forEach(function (h) {
    h.innerHTML = h.textContent.split(" ").map(function (w, i) { return '<span class="w" style="--i:' + i + '"><span>' + esc(w) + "</span></span>"; }).join(" ");
  });
  requestAnimationFrame(function () { root.classList.add("ready"); });
})();
