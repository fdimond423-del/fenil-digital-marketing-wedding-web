/* Capela opening: a whitewashed Goan chapel front with a bell in its niche. The bell swings and rings,
   the teal doors swing inward, and we glide through them into a lily-filled chapel. */
window.OPENING = (function () {
  var W0 = 390, H0 = 844, DX = 70, DW = 250, DT = 275, AX = 195, BX = 172, BY = 128, BW = 46;
  var front, doors, dl, dr, bell, ring, bg, names, plaque, glow, lastRing = 0;
  function ss(a, b, x) { var t = Math.max(0, Math.min(1, (x - a) / (b - a))); return t * t * (3 - 2 * t); }
  var ARCH = "M" + DX + " 844V" + (DT + DW / 2) + "A" + DW / 2 + " " + DW / 2 + " 0 0 1 " + (DX + DW) + " " + (DT + DW / 2) + "V844Z";
  var NICHE = "M170 215V150A25 25 0 0 1 220 150V215Z";
  function wallMask() {
    var s = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 390 844" preserveAspectRatio="xMidYMid slice"><path fill-rule="evenodd" d="M-400 -400H790V1244H-400Z' + ARCH + NICHE + '"/></svg>';
    return "url('data:image/svg+xml," + encodeURIComponent(s) + "')";
  }
  function layout() {
    var W = innerWidth, H = innerHeight, k = Math.max(W / W0, H / H0), ox = (W - W0 * k) / 2, oy = (H - H0 * k) / 2;
    doors.style.cssText = "left:" + (ox + DX * k).toFixed(1) + "px;top:" + (oy + DT * k).toFixed(1) + "px;width:" + (DW * k).toFixed(1) + "px;height:" + ((H0 - DT) * k + 2).toFixed(1) + "px";
    bell.style.cssText = "left:" + (ox + BX * k).toFixed(1) + "px;top:" + (oy + BY * k).toFixed(1) + "px;width:" + (BW * k).toFixed(1) + "px";
    front.style.transformOrigin = (ox + AX * k).toFixed(1) + "px " + (oy + (DT + 120) * k).toFixed(1) + "px";
  }
  return {
    html: function (C, u) {
      var o = C.opening, cp = C.couple, s = "";
      s += '<div class="cl-bg"><img src="assets/art/chapel-720.webp" srcset="assets/art/chapel-720.webp 720w, assets/art/chapel.webp 1080w" sizes="100vw" alt="" width="1080" height="1920"></div><div class="cl-glow"></div>';
      s += '<canvas class="op-fx" aria-hidden="true"></canvas>';
      s += '<div class="cl-names"><p class="cl-eye">' + u.esc(o.eyebrow) + '</p><h1 class="cl-h1"><span>' + u.esc(cp.first1) + '</span><em>&amp;</em><span>' + u.esc(cp.first2) + "</span></h1>" +
        '<p class="cl-date">' + u.esc(o.dateLine) + '</p><p class="cl-city">' + u.esc(o.city) + "</p></div>";
      s += '<div class="cl-front" aria-hidden="true"><div class="cl-doors"><div class="cl-d cl-dl"><img src="assets/art/doors-720.webp" srcset="assets/art/doors-720.webp 720w, assets/art/doors.webp 1080w" sizes="100vw" alt="" fetchpriority="high"><b></b></div>' +
        '<div class="cl-d cl-dr"><img src="assets/art/doors-720.webp" srcset="assets/art/doors-720.webp 720w, assets/art/doors.webp 1080w" sizes="100vw" alt="" fetchpriority="high"><b></b></div></div>';
      s += '<div class="cl-wall" style="-webkit-mask-image:' + wallMask() + ";mask-image:" + wallMask() + '"></div>';
      s += '<svg class="cl-lines" viewBox="0 0 390 844" preserveAspectRatio="xMidYMid slice"><defs><radialGradient id="cln" cx=".5" cy=".35" r=".8"><stop offset="0" stop-color="#5A4632"/><stop offset="1" stop-color="#241A12"/></radialGradient></defs><g fill="none" stroke-linecap="round">' +
        '<path d="' + NICHE + '" fill="url(#cln)" stroke="none"/><path d="M' + (DX - 12) + ' 742V' + (DT + DW / 2) + 'A' + (DW / 2 + 12) + ' ' + (DW / 2 + 12) + ' 0 0 1 ' + (DX + DW + 12) + ' ' + (DT + DW / 2) + 'V742" stroke="#D9CFBE" stroke-width="10"/>' +
                '<path d="M160 222V150A35 35 0 0 1 230 150V222Z" stroke="#D3C7B2" stroke-width="5"/><path d="M152 226H238" stroke="#CFC2AB" stroke-width="6"/>' +
        '<path d="M22 118C60 118 70 92 104 92C140 92 150 46 195 46C240 46 250 92 286 92C320 92 330 118 368 118" stroke="#D3C7B2" stroke-width="6"/>' +
        '<path d="M195 6V40M183 18H207" stroke="#B8954A" stroke-width="4"/>' +
        '<path d="M22 118V742M368 118V742" stroke="#DED5C5" stroke-width="12"/></g>' +
        '<text x="195" y="257" text-anchor="middle" class="cl-plq">' + u.esc(o.plaque) + "</text></svg>";
      s += '<div class="cl-bell"><img src="assets/art/bell.webp" alt="" width="481" height="678"><i class="cl-ring"></i></div></div>';
      return s;
    },
    init: function (op, api) {
      front = api.$(".cl-front", op); doors = api.$(".cl-doors", op); dl = api.$(".cl-dl", op); dr = api.$(".cl-dr", op); bell = api.$(".cl-bell", op);
      ring = api.$(".cl-ring", op); bg = api.$(".cl-bg img", op); names = api.$(".cl-names", op); glow = api.$(".cl-glow", op);
      layout(); addEventListener("resize", layout);
    },
    update: function (p) {
      var sw = ss(0.0, 0.2, p);                         // the bell swings as you begin to scroll
      bell.firstChild.style.transform = "rotate(" + (Math.sin(p * 46) * 22 * (1 - ss(0.2, 0.4, p)) * Math.min(1, p * 20)).toFixed(2) + "deg)";
      var o = ss(0.12, 0.5, p);                          // doors swing inward
      dl.style.transform = "rotateY(" + (o * 104).toFixed(2) + "deg)";
      dr.style.transform = "rotateY(" + (-o * 104).toFixed(2) + "deg)";
      dl.lastChild.style.opacity = dr.lastChild.style.opacity = (o * 0.6).toFixed(3);
      var z = ss(0.38, 0.86, p);                         // glide through the doorway
      front.style.transform = "scale(" + (1 + z * z * 3.4).toFixed(4) + ")";
      front.style.opacity = (1 - ss(0.74, 0.88, p)).toFixed(3);
      front.style.visibility = p > 0.9 ? "hidden" : "visible";
      bg.style.transform = "scale(" + (1.35 - 0.35 * ss(0.3, 0.95, p)).toFixed(4) + ")";
      glow.style.opacity = (Math.sin(Math.PI * ss(0.2, 0.8, p)) * 0.7).toFixed(3);
      var n = ss(0.76, 0.95, p);
      names.style.opacity = n.toFixed(3); names.style.transform = "translateY(" + ((1 - n) * 22).toFixed(1) + "px)";
      if (sw > 0.05 && sw < 0.95 && performance.now() - lastRing > 900) { lastRing = performance.now(); ring.classList.remove("go"); void ring.offsetWidth; ring.classList.add("go"); }
    }
  };
})();
