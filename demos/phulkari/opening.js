/* Phulkari opening: an embroidered dupatta unfurls over a dawn sarovar, then lifts away in pleats as you scroll. */
window.OPENING = (function () {
  var N = 9, strips = [], bg, names, med, rod, glow, veil, back;
  function ss(a, b, x) { var t = Math.max(0, Math.min(1, (x - a) / (b - a))); return t * t * (3 - 2 * t); }
  return {
    html: function (C, u) {
      var o = C.opening, cp = C.couple, s = "";
      s += '<div class="pk-bg"><img src="assets/art/dawn-720.webp" srcset="assets/art/dawn-720.webp 720w, assets/art/dawn.webp 1080w" sizes="100vw" alt="" width="1080" height="1920" fetchpriority="high"></div><div class="pk-glow"></div>';
      s += '<div class="pk-names"><p class="pk-eye">' + u.esc(o.eyebrow) + '</p><h1 class="pk-h1"><span>' + u.esc(cp.first1) + '</span><em>&amp;</em><span>' + u.esc(cp.first2) + "</span></h1>" +
        '<p class="pk-date">' + u.esc(o.dateLine) + '</p><p class="pk-city">' + u.esc(o.city) + "</p></div>";
      s += '<canvas class="op-fx" aria-hidden="true"></canvas>';
      s += '<div class="pk-veil" aria-hidden="true"><div class="pk-rod"></div><div class="pk-back"></div>';
      for (var i = 0; i < N; i++) s += '<div class="pk-s" style="--i:' + i + ";top:" + (i * 100 / N).toFixed(3) + "%;height:" + (100 / N + 0.15).toFixed(3) + '%"><i><img src="assets/art/dupatta-720.webp" srcset="assets/art/dupatta-720.webp 720w, assets/art/dupatta.webp 1080w" sizes="100vw" alt="" style="top:' + (-i * 100).toFixed(1) + '%"></i><b></b></div>';
      s += '<div class="pk-med"><span class="pk-ik" lang="pa">ੴ</span><span class="pk-line">' + u.esc(o.veilLine) + "</span></div></div>";
      return s;
    },
    init: function (op, api) {
      strips = api.$$(".pk-s", op); bg = api.$(".pk-bg img", op); names = api.$(".pk-names", op); med = api.$(".pk-med", op); rod = api.$(".pk-rod", op); glow = api.$(".pk-glow", op); veil = api.$(".pk-veil", op); back = api.$(".pk-back", op);
    },
    update: function (p, api) {
      var a = ss(0.04, 0.72, p);
      // Roman-blind gather: every pleat folds by the same angle and stacks under the one above it,
      // so the cloth stays continuous while it draws up towards the rod, then the bundle lifts away.
      var fold = ss(0.0, 0.8, a), th = fold * 84 * Math.PI / 180, ch = Math.cos(th), vh = innerHeight / 100;
      var hh = innerHeight / N, lift = ss(0.78, 1, a) * 40;
      strips.forEach(function (el, i) {
        var y = i * hh * ch - i * hh;   // shift so pleat i starts where pleat i-1 ends
        var ang = (i % 2 ? -1 : 1) * th * 180 / Math.PI;
        el.style.transform = a > 0 ? "translate3d(0," + (y - lift * vh).toFixed(2) + "px,0) rotateX(" + ang.toFixed(2) + "deg)" : "";
        el.lastChild.style.opacity = (fold * (i % 2 ? 0.55 : 0.18)).toFixed(3);
      });
      back.style.transform = "translateY(" + (-lift * vh).toFixed(2) + "px) scaleY(" + Math.max(0.001, ch).toFixed(4) + ")";
      veil.style.opacity = (1 - ss(0.86, 1, a)).toFixed(3);
      rod.style.transform = "translateY(" + (-ss(0.78, 1, a) * 40 * innerHeight / 100).toFixed(1) + "px)";
      med.style.opacity = (1 - ss(0.02, 0.2, p)).toFixed(3);
      med.style.transform = "translate(-50%,-50%) scale(" + (1 + ss(0.02, 0.2, p) * 0.15).toFixed(3) + ")";
      bg.style.transform = "scale(" + (1.16 - 0.16 * ss(0, 0.9, p)).toFixed(4) + ")";
      glow.style.opacity = (ss(0.35, 0.9, p) * 0.9).toFixed(3);
      var n = ss(0.5, 0.86, p);
      names.style.opacity = n.toFixed(3); names.style.transform = "translateY(" + ((1 - n) * 26).toFixed(1) + "px)";
    }
  };
})();
