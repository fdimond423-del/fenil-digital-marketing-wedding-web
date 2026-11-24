/* Noor opening: a carved marble jaali stands closed under a gold crescent. As you scroll the two halves
   slide apart, the crescent rises into the sky as the moon, and a moonlit garden opens up behind. */
window.OPENING = (function () {
  var L, R, med, moon, bg, names, beam, line, sh;
  function ss(a, b, x) { var t = Math.max(0, Math.min(1, (x - a) / (b - a))); return t * t * (3 - 2 * t); }
  var CRES = '<svg viewBox="0 0 120 120" aria-hidden="true"><defs><linearGradient id="ng" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FBE7AE"/><stop offset=".5" stop-color="#D5A548"/><stop offset="1" stop-color="#F6DA92"/></linearGradient></defs>' +
    '<path d="M74 14a48 48 0 1 0 30 80a40 40 0 1 1 -30 -80z" fill="url(#ng)"/>' +
    '<path d="M86 40l3.6 7.4 8.2 1.2-5.9 5.8 1.4 8.1-7.3-3.8-7.3 3.8 1.4-8.1-5.9-5.8 8.2-1.2z" fill="url(#ng)"/></svg>';
  return {
    html: function (C, u) {
      var o = C.opening, cp = C.couple, s = "";
      s += '<div class="nr-bg"><img src="assets/art/garden-720.webp" srcset="assets/art/garden-720.webp 720w, assets/art/garden.webp 1080w" sizes="100vw" alt="" width="1080" height="1920" fetchpriority="high"></div>';
      s += '<div class="nr-beam"></div><div class="nr-moon"></div>';
      s += '<canvas class="op-fx" aria-hidden="true"></canvas>';
      s += '<div class="nr-names"><p class="nr-eye">' + u.esc(o.eyebrow) + '</p><h1 class="nr-h1"><span>' + u.esc(cp.first1) + '</span><em>&amp;</em><span>' + u.esc(cp.first2) + "</span></h1>" +
        '<p class="nr-date">' + u.esc(o.dateLine) + '</p><p class="nr-city">' + u.esc(o.city) + "</p></div>";
      ["l", "r"].forEach(function (k) {
        s += '<div class="nr-j nr-' + k + '" aria-hidden="true"><img src="assets/art/jaali-720.webp" srcset="assets/art/jaali-720.webp 720w, assets/art/jaali.webp 1080w" sizes="100vw" alt=""><b></b></div>';
      });
      s += '<div class="nr-shade"></div><div class="nr-med">' + CRES + '</div><p class="nr-line"><span>' + u.esc(o.veilLine) + "</span></p>";
      return s;
    },
    init: function (op, api) {
      L = api.$(".nr-l", op); R = api.$(".nr-r", op); med = api.$(".nr-med", op); moon = api.$(".nr-moon", op); bg = api.$(".nr-bg img", op);
      names = api.$(".nr-names", op); beam = api.$(".nr-beam", op); line = api.$(".nr-line", op); sh = api.$(".nr-shade", op);
    },
    update: function (p) {
      var vh = innerHeight / 100, o = ss(0.08, 0.62, p);
      L.style.transform = "translateX(" + (-o * 114).toFixed(2) + "%) rotateY(" + (o * 8).toFixed(1) + "deg)";
      R.style.transform = "translateX(" + (o * 114).toFixed(2) + "%) rotateY(" + (-o * 8).toFixed(1) + "deg)";
      sh.style.opacity = (1 - o).toFixed(3); L.style.visibility = R.style.visibility = o > 0.995 ? "hidden" : "visible";
      line.style.opacity = (1 - ss(0.02, 0.14, p)).toFixed(3);
      var m = ss(0.06, 0.5, p);  // the gold crescent rises and becomes the moon
      med.style.transform = "translate(-50%,-50%) translateY(" + (-m * 25 * vh).toFixed(1) + "px) scale(" + (1 - m * 0.42).toFixed(3) + ")";
      med.style.opacity = (1 - ss(0.3, 0.46, p)).toFixed(3);
      moon.style.opacity = ss(0.34, 0.56, p).toFixed(3);
      beam.style.opacity = (ss(0.4, 0.8, p) * 0.85).toFixed(3);
      bg.style.transform = "scale(" + (1.2 - 0.2 * ss(0.05, 0.95, p)).toFixed(4) + ")";
      var n = ss(0.6, 0.88, p);
      names.style.opacity = n.toFixed(3); names.style.transform = "translateY(" + ((1 - n) * 22).toFixed(1) + "px)";
    }
  };
})();
