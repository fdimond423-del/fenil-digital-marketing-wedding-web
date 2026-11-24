(function () {
  "use strict";
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var ST = window.STORE || {};
  function inr(n) { return "₹" + Number(n).toLocaleString("en-IN"); }

  /* Meta Pixel: every call is guarded so a blocked pixel never breaks the page */
  function px(kind, name, params, opts) {
    try { if (typeof window.fbq === "function") { if (opts) window.fbq(kind, name, params || {}, opts); else window.fbq(kind, name, params || {}); } } catch (e) {}
  }
  function track(name, params, opts) { px("track", name, params, opts); }

  /* Contact (WhatsApp / mailto) and ViewDemo clicks, delegated */
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("a[href]"); if (!a) return;
    var h = a.getAttribute("href") || "";
    if (/^https:\/\/wa\.me\//.test(h) || /^mailto:/i.test(h)) track("Contact", { content_name: (a.textContent || "").trim().slice(0, 60), method: /^mailto:/i.test(h) ? "email" : "whatsapp" });
    var m = h.match(/^https:\/\/([a-z]+)-invite-demo\.vercel\.app/);
    if (m) px("trackCustom", "ViewDemo", { template: m[1] });
  }, true);

  /* Blog post view */
  var post = $("article.post[data-slug]");
  if (post) track("ViewContent", { content_type: "article", content_ids: [post.dataset.slug], content_name: post.dataset.title, content_category: post.dataset.cat });

  /* filter chips */
  var chips = $$(".chip"), cards = $$(".card"), empty = $(".empty");
  chips.forEach(function (c) {
    c.addEventListener("click", function () {
      var f = c.getAttribute("data-f"), shown = 0;
      chips.forEach(function (o) { o.classList.toggle("on", o === c); o.setAttribute("aria-pressed", o === c ? "true" : "false"); });
      cards.forEach(function (k) { var ok = f === "All" || k.getAttribute("data-cat") === f; k.hidden = !ok; if (ok) shown++; });
      if (empty) empty.hidden = shown > 0;
    });
  });

  /* phone video: load after page load, only if motion is OK */
  var rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.addEventListener("load", function () {
    if (rm) return;
    setTimeout(function () {
      $$(".ph-vid").forEach(function (v) {
        v.src = v.getAttribute("data-src");
        v.addEventListener("playing", function () { v.classList.add("on"); }, { once: true });
        var p = v.play(); if (p && p.catch) p.catch(function () {});
      });
    }, 400);
  });

  /* reveal on scroll */
  if ("IntersectionObserver" in window && !rm) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("shown"); io.unobserve(e.target); } }); }, { rootMargin: "0px 0px -6% 0px" });
    var rvs = $$(".card,.feat-i,.step,.diff-i,.shot,.h2");
    rvs.forEach(function (el) { el.classList.add("rv"); io.observe(el); });
    /* safety net: anything scrolled past (fast fling, anchor jump) is revealed too */
    var tk = 0;
    window.addEventListener("scroll", function () {
      if (tk) return; tk = requestAnimationFrame(function () {
        tk = 0; var h = innerHeight;
        rvs.forEach(function (el) { if (!el.classList.contains("shown") && el.getBoundingClientRect().top < h) { el.classList.add("shown"); io.unobserve(el); } });
      });
    }, { passive: true });
  }

  /* close mobile menu on link tap */
  $$(".menu-p a").forEach(function (a) { a.addEventListener("click", function () { var d = a.closest("details"); if (d) d.open = false; }); });

  /* ---------- BUY FLOW ---------- */
  var form = $("#buy");
  if (form) {
    var base = +form.dataset.price, add = +form.dataset.addon, addon = $("#addon"), status = $("#buy-status"), btn = $("#buy-btn");
    function total() { return base + (addon.checked ? add : 0); }
    function vals() { var o = {}; ["name", "phone", "email", "date"].forEach(function (k) { var i = form.elements[k]; o[k] = i ? i.value.trim() : ""; }); return o; }
    function upd() { $("#price-n").textContent = inr(total()); $("#buy-amt").textContent = inr(total()); $("#wa-alt").href = waLink(); }
    function waLink() {
      var v = vals(), m = "Hi " + ST.brand + "! I'd like to order the " + (form.dataset.name || "") + " wedding invite template" + (addon.checked ? " with " + ST.addonName : "") + " (" + inr(total()) + ").";
      if (v.name) m += "\nName: " + v.name; if (v.date) m += "\nWedding date: " + v.date; if (v.phone) m += "\nMobile: " + v.phone; if (v.email) m += "\nEmail: " + v.email;
      return "https://wa.me/" + form.dataset.wa + "?text=" + encodeURIComponent(m);
    }
    addon.addEventListener("change", upd); form.addEventListener("input", upd); upd();
    function pxItem(v) { return { content_type: "product", content_ids: [form.dataset.template], content_name: form.dataset.name, value: v, currency: "INR" }; }
    track("ViewContent", pxItem(base));
    var leadSent = false;
    addon.addEventListener("change", function () { if (addon.checked && !leadSent) { leadSent = true; track("Lead", { content_name: ST.addonName, content_ids: [form.dataset.template], content_type: "product", value: add, currency: "INR" }); } });
    function say(t, cls) { status.textContent = t; status.className = "buy-status " + (cls || ""); }
    function toWhatsApp(note) { if (note) say(note); track("Contact", { content_name: "Order on WhatsApp", method: "whatsapp" }); window.open(waLink(), "_blank", "noopener"); }
    function loadRzp() {
      return new Promise(function (res, rej) {
        if (window.Razorpay) return res();
        var s = document.createElement("script"); s.src = "https://checkout.razorpay.com/v1/checkout.js"; s.onload = res; s.onerror = rej; document.head.appendChild(s);
      });
    }
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      track("AddToCart", pxItem(total()));
      var ppu = addon.checked ? form.dataset.ppuSetup : form.dataset.ppu;
      if (ppu) { window.location.href = ppu; return; }                 // (a) Razorpay Payment Page
      if (!ST.checkoutEnabled) { toWhatsApp("Opening WhatsApp to place your order…"); return; } // (c) fallback
      btn.disabled = true; say("Starting secure checkout…");          // (b) Standard Checkout
      var v = vals();
      fetch("/api/create-order", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ template: form.dataset.template, addon: addon.checked }) })
        .then(function (r) { return r.json().then(function (j) { if (!r.ok) throw j; return j; }); })
        .then(function (o) {
          var ic = pxItem(o.amount / 100); ic.num_items = addon.checked ? 2 : 1; if (addon.checked) ic.content_ids = [form.dataset.template, "setup"];
          track("InitiateCheckout", ic);
          return loadRzp().then(function () {
            var rz = new window.Razorpay({
              key: o.keyId, amount: o.amount, currency: o.currency, order_id: o.orderId, name: o.name, description: o.description,
              prefill: { name: v.name, email: v.email, contact: v.phone },
              notes: { wedding_date: v.date },
              theme: { color: "#4C1026" },
              handler: function (resp) {
                var q = new URLSearchParams({ o: resp.razorpay_order_id, p: resp.razorpay_payment_id, s: resp.razorpay_signature });
                window.location.href = "/thank-you/?" + q.toString();
              },
              modal: { ondismiss: function () { btn.disabled = false; say("Checkout closed. Nothing was charged."); } }
            });
            rz.on("payment.failed", function (r) { btn.disabled = false; say("Payment failed: " + ((r.error && r.error.description) || "please try again") + ".", "err"); });
            if (o.notice) say(o.notice, "test");
            else say("");
            rz.open();
            track("AddPaymentInfo", pxItem(o.amount / 100));
          });
        })
        .catch(function () { btn.disabled = false; toWhatsApp("Online checkout isn’t available right now, so we opened WhatsApp instead."); });
    });
  }

  /* ---------- THANK YOU ---------- */
  var ty = $("#ty");
  if (ty && ty.dataset.state === "checking") {
    var q = new URLSearchParams(location.search), o = q.get("o"), p = q.get("p"), s = q.get("s");
    function show(state, h, t) { ty.dataset.state = state; $("#ty-h").textContent = h; $("#ty-p").textContent = t; }
    if (p && (!o || !s)) { show("ref", "Thank you!", "Your payment reference is " + p + ". Message us on WhatsApp if you need anything."); return; }
    if (!o || !p || !s) { show("none", "No payment to show", "If you just paid, check your email for Razorpay’s receipt or message us on WhatsApp."); return; }
    fetch("/api/verify-payment", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ razorpay_order_id: o, razorpay_payment_id: p, razorpay_signature: s }) })
      .then(function (r) { return r.json(); })
      .then(function (j) {
        if (!j.ok) { show("bad", "We couldn’t confirm this payment", "Please message us with your payment ID and we’ll check it for you: " + p); return; }
        show("ok", "Thank you! Your payment is confirmed", "We’ve received your order. Keep your payment ID for reference.");
        try {
          var paid = j.order && (j.status === "captured" || j.status === "authorized") ? j.order : null, key = "kl_px_purchase_" + j.paymentId, done = false;
          try { done = localStorage.getItem(key) === "1"; } catch (e) {}
          if (paid && !done) {
            track("Purchase", { content_type: "product", content_ids: [paid.template].concat(paid.addon && paid.addon !== "none" ? [paid.addon] : []), num_items: paid.addon && paid.addon !== "none" ? 2 : 1, value: paid.amount / 100, currency: "INR" }, { eventID: j.paymentId });
            try { localStorage.setItem(key, "1"); } catch (e) {}
          }
        } catch (e) {}
        $("#ty-pay").textContent = j.paymentId; $("#ty-ord").textContent = j.orderId;
        $("#ty-amt").textContent = j.order ? inr(j.order.amount / 100) + (j.order.addon && j.order.addon !== "none" ? " (with done-for-you setup)" : "") : "—";
        $("#ty-dl").hidden = false; $("#ty-next").hidden = false;
        var w = $("#ty-wa"); w.href = w.href + encodeURIComponent(j.paymentId);
        history.replaceState(null, "", "/thank-you/?p=" + encodeURIComponent(j.paymentId));
      })
      .catch(function () { show("bad", "We couldn’t confirm this payment yet", "Please refresh, or message us with payment ID " + p + "."); });
  }
})();
