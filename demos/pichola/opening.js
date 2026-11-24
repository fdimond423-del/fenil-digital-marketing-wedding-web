/* Pichola opening: a marigold-garlanded boat glides across Lake Pichola at sunrise, its reflection and wake
   trailing behind, and the save-the-date rises in the morning sky. */
window.OPENING = (function () {
  var boat, bg, sun, names, wake, title;
  function ss(a, b, x) { var t = Math.max(0, Math.min(1, (x - a) / (b - a))); return t * t * (3 - 2 * t); }
  return {
    html: function (C, u) {
      var o = C.opening, cp = C.couple, s = "";
      s += '<div class="pc-bg"><img src="assets/art/lake-720.webp" srcset="assets/art/lake-720.webp 720w, assets/art/lake.webp 1080w" sizes="100vw" alt="" width="1080" height="1920" fetchpriority="high"></div><div class="pc-sun"></div>';
      s += '<canvas class="op-fx" aria-hidden="true"></canvas>';
      s += '<div class="pc-title"><p class="pc-std">' + u.esc(o.title) + '</p></div>';
      s += '<div class="pc-names"><h1 class="pc-h1"><span>' + u.esc(cp.first1) + '</span><em>&amp;</em><span>' + u.esc(cp.first2) + '</span></h1><p class="pc-date">' + u.esc(o.dateLine) + '</p><p class="pc-city">' + u.esc(o.city) + "</p></div>";
      s += '<div class="pc-boat" aria-hidden="true"><div class="pc-wake"><i></i><i></i><i></i></div><div class="pc-bob"><img class="pc-b" src="assets/art/boat.webp" alt="" width="900" height="467"><img class="pc-r" src="assets/art/boat.webp" alt="" width="900" height="467"></div></div>';
      return s;
    },
    init: function (op, api) {
      boat = api.$(".pc-boat", op); bg = api.$(".pc-bg img", op); sun = api.$(".pc-sun", op); names = api.$(".pc-names", op); title = api.$(".pc-title", op);
    },
    update: function (p) {
      var g = ss(0.02, 0.8, p);   // the boat glides on across the lake and away
      boat.style.transform = "translateX(" + (g * 95).toFixed(2) + "vw) translateY(" + (-g * 6).toFixed(2) + "svh) scale(" + (1 - g * 0.35).toFixed(3) + ")";
      bg.style.transform = "scale(" + (1.12 - 0.12 * ss(0, 0.9, p)).toFixed(4) + ")";
      sun.style.opacity = (0.45 + ss(0.1, 0.8, p) * 0.55).toFixed(3);
      title.style.transform = "translateY(" + (-ss(0.25, 0.7, p) * 3).toFixed(2) + "svh)";
      var n = ss(0.35, 0.8, p);
      names.style.opacity = n.toFixed(3); names.style.transform = "translateY(" + ((1 - n) * 20).toFixed(1) + "px)";
    }
  };
})();
