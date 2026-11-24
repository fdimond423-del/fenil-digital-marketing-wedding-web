/* Kolam opening: a rice-flour kolam draws itself on a red-oxide floor, then sinks into perspective as a brass
   kuthuvilakku rises onto it. Its five wicks light one by one and the lamplight opens onto the courtyard. */
window.OPENING = (function () {
  var kol, lamp, flames = [], glow, yard, names, top, warm, fl;
  function ss(a, b, x) { var t = Math.max(0, Math.min(1, (x - a) / (b - a))); return t * t * (3 - 2 * t); }
  function P(r, a) { return (r * Math.cos(a)).toFixed(2) + "," + (r * Math.sin(a)).toFixed(2); }
  function petal(a, r0, r1, w) { var rm = r0 + (r1 - r0) * 0.55; return "M" + P(r0, a) + "Q" + P(rm, a - w) + " " + P(r1, a) + "Q" + P(rm, a + w) + " " + P(r0, a); }
  function kolamSvg() {
    var T = Math.PI * 2, s = "", d, k, a, layers = [];
    // [path data, delay s, duration s]
    layers.push(["M0,-7A7,7 0 1 1 0,7A7,7 0 1 1 0,-7", 0.2, 0.6]);
    for (k = 0; k < 8; k++) { a = k * T / 8 - Math.PI / 2; layers.push([petal(a, 9, 40, 0.42), 0.5 + k * 0.07, 0.7]); }
    for (k = 0; k < 8; k++) { a = (k + 0.5) * T / 8 - Math.PI / 2; layers.push([petal(a, 30, 68, 0.3) + petal(a, 38, 60, 0.15), 1.0 + k * 0.07, 0.8]); }
    d = ""; for (k = 0; k < 16; k++) { a = k * T / 16 - Math.PI / 2; d += (k ? "" : "M" + P(70, a - 0.12)) + "C" + P(86, a - 0.3) + " " + P(86, a + 0.3) + " " + P(70, a + 0.12) + "Q" + P(66, a + T / 32) + " " + P(70, a + T / 16 - 0.12); }
    layers.push([d + "Z", 1.6, 1.4]);
    d = ""; for (k = 0; k < 16; k++) { a = k * T / 16 - Math.PI / 2; d += (k ? "L" : "M") + P(k % 2 ? 90 : 97, a); } layers.push([d + "Z", 2.4, 1.2]);
    d = ""; for (k = 0; k < 8; k++) { a = k * T / 8 - Math.PI / 2; var c = P(101, a).split(","); d += "M" + (+c[0] + 3) + "," + c[1] + "a3,3 0 1 0 -6,0a3,3 0 1 0 6,0"; } layers.push([d, 3.2, 0.6]);
    layers.forEach(function (L) {
      s += '<path class="kd kd-w" d="' + L[0] + '" pathLength="1" style="--d:' + L[1].toFixed(2) + "s;--t:" + L[2] + 's"/><path class="kd" d="' + L[0] + '" pathLength="1" style="--d:' + L[1].toFixed(2) + "s;--t:" + L[2] + 's"/>';
    });
    // pulli (dots) settle first
    var dots = "";
    for (k = 0; k < 16; k++) { a = (k + 0.5) * T / 16 - Math.PI / 2; dots += '<circle cx="' + P(80, a).split(",")[0] + '" cy="' + P(80, a).split(",")[1] + '" r="1.8" style="--d:' + (0.05 + k * 0.02).toFixed(2) + 's"/>'; }
    for (k = 0; k < 8; k++) { a = k * T / 8 - Math.PI / 2; dots += '<circle cx="' + P(24, a).split(",")[0] + '" cy="' + P(24, a).split(",")[1] + '" r="1.6" style="--d:' + (0.1 + k * 0.02).toFixed(2) + 's"/>'; }
    dots += '<circle cx="0" cy="0" r="2.2" style="--d:0s"/>';
    return '<svg class="ko-svg" viewBox="-110 -110 220 220" aria-hidden="true"><g class="ko-dots">' + dots + '</g><g fill="none" stroke-linecap="round" stroke-linejoin="round">' + s + "</g></svg>";
  }
  return {
    html: function (C, u) {
      var o = C.opening, cp = C.couple, s = "", fx = [0.062, 0.233, 0.5, 0.771, 0.938];
      s += '<div class="ko-floor"></div><div class="ko-top"><p class="ko-ta" lang="ta">' + u.esc(o.tamilLine) + '</p><p class="ko-en">' + u.esc(o.topLine) + "</p></div>";
      s += '<div class="ko-kolam">' + kolamSvg() + "</div>";
      s += '<div class="ko-glow"></div><div class="ko-lamp"><img src="assets/art/lamp.webp" alt="" width="438" height="1090">' +
        fx.map(function (x, i) { return '<i class="ko-f" style="left:' + (x * 100).toFixed(1) + '%;--k:' + i + '"></i>'; }).join("") + "</div>";
      s += '<div class="ko-yard"><img src="assets/art/yard-720.webp" srcset="assets/art/yard-720.webp 720w, assets/art/yard.webp 1080w" sizes="100vw" alt="" width="1080" height="1920"><div class="ko-shade"></div></div>';
      s += '<canvas class="op-fx" aria-hidden="true"></canvas><div class="ko-warm"></div>';
      s += '<div class="ko-names"><p class="ko-eye">' + u.esc(o.eyebrow) + '</p><h1 class="ko-h1"><span>' + u.esc(cp.first1) + '</span><em>&amp;</em><span>' + u.esc(cp.first2) + "</span></h1>" +
        '<p class="ko-date">' + u.esc(o.dateLine) + '</p><p class="ko-city">' + u.esc(o.city) + "</p></div>";
      return s;
    },
    init: function (op, api) {
      kol = api.$(".ko-kolam", op); lamp = api.$(".ko-lamp", op); flames = api.$$(".ko-f", op); glow = api.$(".ko-glow", op);
      yard = api.$(".ko-yard", op); names = api.$(".ko-names", op); top = api.$(".ko-top", op); warm = api.$(".ko-warm", op); fl = api.$(".ko-floor", op);
    },
    update: function (p) {
      var vh = innerHeight / 100;
      var t = ss(0.03, 0.34, p);                       // kolam settles into the floor
      kol.style.transform = "translate(-50%,-50%) translateY(" + (t * 26 * vh).toFixed(1) + "px) rotateX(" + (t * 66).toFixed(1) + "deg) scale(" + (1 + t * 0.55).toFixed(3) + ")";
      top.style.opacity = (1 - ss(0.02, 0.16, p)).toFixed(3);
      var up = ss(0.12, 0.4, p);                       // lamp rises onto the kolam
      lamp.style.transform = "translate(-50%,0) translateY(" + ((1 - up) * 70 * vh).toFixed(1) + "px)";
      lamp.style.opacity = Math.min(1, up * 3).toFixed(3);
      var lit = 0;
      flames.forEach(function (f, i) {                  // centre wick first, then outwards
        var order = [2, 1, 3, 0, 4].indexOf(i), v = ss(0.4 + order * 0.035, 0.45 + order * 0.035, p); lit += v;
        f.style.opacity = v.toFixed(3); f.style.setProperty("--s", v.toFixed(3));
      });
      glow.style.opacity = (lit / 5 * (1 - ss(0.8, 0.95, p))).toFixed(3);
      fl.style.filter = "brightness(" + (0.75 + lit / 5 * 0.35).toFixed(3) + ")";
      var r = ss(0.6, 0.9, p);                          // lamplight opens onto the courtyard
      yard.style.clipPath = r >= 1 ? "none" : "circle(" + (r * 125).toFixed(2) + "% at 50% 46%)";
      yard.style.visibility = r > 0 ? "visible" : "hidden";
      warm.style.opacity = (Math.sin(Math.PI * ss(0.58, 0.9, p)) * 0.55).toFixed(3);
      yard.firstChild.style.transform = "scale(" + (1.18 - 0.18 * ss(0.6, 1, p)).toFixed(4) + ")";
      var n = ss(0.74, 0.94, p);
      names.style.opacity = n.toFixed(3); names.style.transform = "translateY(" + ((1 - n) * 24).toFixed(1) + "px)";
    }
  };
})();
