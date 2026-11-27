const fs = require('fs');

const t = { slug: 'gulmohar-reverie', title: 'Gulmohar Reverie', category: 'Shahi (Premium)' };
const waMsg = encodeURIComponent(`Hi Fenil, I want to customise the ${t.title} wedding invitation website (Price ₹1,499).`);

// Clean top bar (no bottom auto-scroll pill, no auto-advance timer)
const cleanBar = `
<!-- FDM Top Demo Bar (Clean Real-Web Experience) -->
<div id="fdm-demo-bar" style="position:fixed;top:0;left:0;right:0;z-index:9999999;background:rgba(20,11,13,0.96);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border-bottom:1px solid rgba(233,199,123,0.28);padding:8px 14px;display:flex;align-items:center;justify-content:space-between;gap:10px;font-family:'Montserrat',sans-serif;color:#fff;box-shadow:0 4px 20px rgba(0,0,0,0.5);">
  <div style="display:flex;align-items:center;gap:10px;">
    <button id="fdm-back-btn" type="button" style="background:rgba(255,255,255,0.1);color:#e9c98a;border:1px solid rgba(233,199,123,0.3);cursor:pointer;font-weight:700;font-size:12.5px;display:flex;align-items:center;gap:5px;padding:6px 12px;border-radius:999px;">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
      <span>All templates</span>
    </button>
    <div style="display:flex;flex-direction:column;">
      <span style="font-weight:700;font-size:13.5px;color:#fff;line-height:1.2;">${t.title}</span>
      <span style="font-size:10px;color:#e9c98a;letter-spacing:0.1em;text-transform:uppercase;">${t.category} · Fenil Digital Marketing</span>
    </div>
  </div>
  <div style="display:flex;align-items:center;gap:8px;">
    <span style="font-size:13px;font-weight:800;color:#98f014;background:rgba(152,240,20,0.12);padding:4px 9px;border-radius:10px;border:1px solid rgba(152,240,20,0.35);">₹1,499</span>
    <a href="https://wa.me/918200095497?text=${waMsg}" target="_blank" rel="noopener" style="background:#25D366;color:#fff;text-decoration:none;font-weight:700;font-size:12.5px;padding:7px 14px;border-radius:999px;display:flex;align-items:center;gap:6px;box-shadow:0 4px 12px rgba(37,211,102,0.4);">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.043.073.043.419-.101.824z"/></svg>
      <span>WhatsApp</span>
    </a>
  </div>
</div>

<style>
/* Adjust stage for top bar */
.stage {
  top: 48px !important;
  height: calc(100svh - 48px) !important;
}
/* Ensure curtain dismiss is smooth and unlocks interaction */
.ms-intro.is-done {
  opacity: 0 !important;
  pointer-events: none !important;
  display: none !important;
  transition: opacity 0.5s ease-out !important;
}
</style>

<script>
(function() {
  // Back button returns to homepage #templates
  var backBtn = document.getElementById('fdm-back-btn');
  if (backBtn) {
    backBtn.onclick = function() {
      var path = window.location.pathname;
      if (path.indexOf('/demos/') !== -1) {
        window.location.href = window.location.origin + path.replace(/\\/demos\\/[^\\/]+\\/?$/, '/#templates');
      } else {
        window.location.href = '../../#templates';
      }
    };
  }

  // Smooth click-to-open curtain
  function openCurtain() {
    var intro = document.querySelector('.ms-intro, [data-intro]');
    if (intro) {
      intro.classList.add('is-done');
      setTimeout(function() {
        intro.style.display = 'none';
        intro.style.pointerEvents = 'none';
      }, 500);
    }
    document.documentElement.classList.remove('intro-active');
  }

  document.addEventListener('click', function(e) {
    if (e.target.closest && (e.target.closest('.ms-intro') || e.target.closest('[data-intro]'))) {
      openCurtain();
    }
  });

  // Tap anywhere on curtain hint to open
  window.addEventListener('load', function() {
    var intro = document.querySelector('.ms-intro, [data-intro]');
    if (intro) {
      intro.addEventListener('click', openCurtain);
      intro.addEventListener('touchstart', openCurtain, { passive: true });
    }
  });
})();
</script>
`;

console.log('Clean bar defined successfully without auto-scroll!');
