const https = require('https');
const fs = require('fs');
const path = require('path');

const templates = [
  { slug: 'gulmohar-reverie', title: 'Gulmohar Reverie', category: 'Shahi (Premium)' },
  { slug: 'chandrika-utsav', title: 'Chandrika Utsav', category: 'Shahi (Premium)' },
  { slug: 'kanak', title: 'Kanak', category: 'Shahi (Premium)' },
  { slug: 'himadri', title: 'Himadri', category: 'Shahi (Premium)' },
  { slug: 'lifafa', title: 'Lifafa', category: 'Shahi (Premium)' },
  { slug: 'ram-mandir', title: 'Patrika Ram Mandir', category: 'Shahi (Premium)' },
  { slug: 'lagnacha-wada', title: 'Lagnacha Wada', category: 'Mangal (Classic)' },
  { slug: 'sheesh-mahal', title: 'Sheesh Mahal', category: 'Mangal (Classic)' },
  { slug: 'royal-heritage-palace', title: 'Royal Heritage Palace', category: 'Mangal (Classic)' },
  { slug: 'phoolon-ki-baarish', title: 'Phoolon Ki Baarish', category: 'Mangal (Classic)' },
  { slug: 'royal-rajputana', title: 'Royal Rajputana', category: 'Mangal (Classic)' }
];

function fetchTheme(slug) {
  return new Promise((resolve, reject) => {
    https.get(`https://mypatrika.in/themes/${slug}/index.html`, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
    }, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => resolve(d));
    }).on('error', reject);
  });
}

function buildEnhancements(t) {
  const waMsg = encodeURIComponent(`Hi Fenil, I want to customise the ${t.title} wedding invitation website (Price ₹1,499).`);

  return `
<!-- FDM Top Demo Bar & Auto-Scroll Controller -->
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
      <span class="wa-btn-text">WhatsApp</span>
    </a>
  </div>
</div>

<!-- Mobile Bottom Floating Navigation -->
<div id="fdm-nav-pill" style="position:fixed;bottom:20px;left:50%;transform:translateX(-50%);z-index:9999999;background:rgba(20,11,13,0.92);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(233,199,123,0.4);border-radius:999px;padding:6px 12px;display:flex;align-items:center;gap:12px;box-shadow:0 8px 32px rgba(0,0,0,0.6);font-family:'Montserrat',sans-serif;">
  <button id="fdm-prev-btn" type="button" aria-label="Previous scene" style="background:none;border:none;color:#e9c98a;cursor:pointer;padding:6px;display:flex;align-items:center;font-size:12px;font-weight:700;gap:4px;">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M15 18l-6-6 6-6"/></svg>
    <span>Prev</span>
  </button>
  <button id="fdm-play-btn" type="button" aria-label="Auto scroll toggle" style="background:rgba(152,240,20,0.18);border:1px solid rgba(152,240,20,0.4);color:#98f014;cursor:pointer;padding:5px 12px;border-radius:999px;font-size:11.5px;font-weight:700;display:flex;align-items:center;gap:5px;">
    <span id="fdm-play-dot" style="width:7px;height:7px;background:#98f014;border-radius:50%;display:inline-block;animation:fdm-pulse 1.5s infinite;"></span>
    <span id="fdm-play-text">Auto: ON</span>
  </button>
  <button id="fdm-next-btn" type="button" aria-label="Next scene" style="background:none;border:none;color:#e9c98a;cursor:pointer;padding:6px;display:flex;align-items:center;font-size:12px;font-weight:700;gap:4px;">
    <span>Next</span>
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 18l6-6-6-6"/></svg>
  </button>
</div>

<style>
@keyframes fdm-pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(0.85); }
}
/* Ensure top bar doesn't obscure content */
.stage {
  top: 48px !important;
  height: calc(100svh - 48px) !important;
}
/* Smooth curtain opening */
.ms-intro.is-done {
  opacity: 0 !important;
  pointer-events: none !important;
  display: none !important;
  transition: opacity 0.5s ease-out !important;
}
</style>

<script>
(function() {
  // 1. Back button returns to homepage #templates
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

  // 2. Unfreeze & Auto-Open Curtain immediately
  function dismissCurtain() {
    var intro = document.querySelector('.ms-intro, [data-intro]');
    if (intro) {
      intro.classList.add('is-done');
      intro.style.display = 'none';
      intro.style.pointerEvents = 'none';
    }
    document.documentElement.classList.remove('intro-active');
  }

  // Click on curtain to dismiss immediately
  document.addEventListener('click', function(e) {
    if (e.target.closest && (e.target.closest('.ms-intro') || e.target.closest('[data-intro]'))) {
      dismissCurtain();
    }
  });

  // Automatically open curtain after 1 second so mobile visitor never gets stuck
  setTimeout(dismissCurtain, 1000);

  // 3. Auto-scroll / Auto-advance through invitation scenes
  var isAutoPlaying = true;
  var autoInterval = null;

  function advanceNext() {
    // 1. Simulate click on active scene or stage
    var activeScene = document.querySelector('.scene.is-active, .scene.is-entering, .stage__viewport');
    if (activeScene) {
      activeScene.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
    }
    // 2. Also dispatch ArrowRight
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', keyCode: 39, code: 'ArrowRight', bubbles: true }));
  }

  function advancePrev() {
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', keyCode: 37, code: 'ArrowLeft', bubbles: true }));
  }

  function startAuto() {
    if (autoInterval) clearInterval(autoInterval);
    isAutoPlaying = true;
    updatePlayUI();
    autoInterval = setInterval(function() {
      if (isAutoPlaying) {
        advanceNext();
      }
    }, 4500);
  }

  function pauseAuto() {
    isAutoPlaying = false;
    updatePlayUI();
  }

  function updatePlayUI() {
    var txt = document.getElementById('fdm-play-text');
    var dot = document.getElementById('fdm-play-dot');
    var btn = document.getElementById('fdm-play-btn');
    if (txt) txt.textContent = isAutoPlaying ? 'Auto: ON' : 'Paused';
    if (dot) dot.style.display = isAutoPlaying ? 'inline-block' : 'none';
    if (btn) {
      btn.style.background = isAutoPlaying ? 'rgba(152,240,20,0.18)' : 'rgba(255,255,255,0.1)';
      btn.style.color = isAutoPlaying ? '#98f014' : '#e9c98a';
      btn.style.borderColor = isAutoPlaying ? 'rgba(152,240,20,0.4)' : 'rgba(233,199,123,0.3)';
    }
  }

  var nextBtn = document.getElementById('fdm-next-btn');
  var prevBtn = document.getElementById('fdm-prev-btn');
  var playBtn = document.getElementById('fdm-play-btn');

  if (nextBtn) {
    nextBtn.onclick = function(e) {
      e.stopPropagation();
      advanceNext();
    };
  }

  if (prevBtn) {
    prevBtn.onclick = function(e) {
      e.stopPropagation();
      advancePrev();
    };
  }

  if (playBtn) {
    playBtn.onclick = function(e) {
      e.stopPropagation();
      if (isAutoPlaying) {
        pauseAuto();
      } else {
        startAuto();
      }
    };
  }

  // Start auto-play after 2.5 seconds
  setTimeout(startAuto, 2500);

  // If user touches/interacts, pause temporarily for 10 seconds then resume
  ['touchstart', 'mousedown'].forEach(function(ev) {
    window.addEventListener(ev, function(e) {
      if (e.target.closest && (e.target.closest('#fdm-nav-pill') || e.target.closest('#fdm-demo-bar'))) return;
      if (isAutoPlaying) {
        if (autoInterval) clearInterval(autoInterval);
        setTimeout(function() {
          if (isAutoPlaying) startAuto();
        }, 10000);
      }
    }, { passive: true });
  });
})();
</script>
`;
}

async function rebuild() {
  console.log(`Rebuilding all ${templates.length} MyPatrika demos with proper theme base & mobile auto-scroll...`);

  for (const t of templates) {
    console.log(`Processing: ${t.slug}...`);
    let themeHtml = await fetchTheme(t.slug);

    // Set exact theme base
    themeHtml = themeHtml.replace(/<head>/i, `<head>\n  <base href="https://mypatrika.in/themes/${t.slug}/">`);

    // Replace MyPatrika branding
    themeHtml = themeHtml.replace(/MyPatrika\.in/g, 'Fenil Digital Marketing');
    themeHtml = themeHtml.replace(/MyPatrika/g, 'Fenil Digital Marketing');

    // Make all /all-invite/ absolute
    themeHtml = themeHtml.replace(/(href|src|poster)=["']\/all-invite\/([^"']*)["']/gi, '$1="https://mypatrika.in/all-invite/$2"');

    // Inject our top bar & auto-scroll controller before </body>
    const enhancements = buildEnhancements(t);
    themeHtml = themeHtml.replace(/<body[^>]*>/i, `$&${enhancements}`);

    const destDir = path.resolve(`demos/patrika-${t.slug}`);
    if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
    fs.writeFileSync(path.join(destDir, 'index.html'), themeHtml, 'utf8');

    console.log(`✓ Rebuilt demos/patrika-${t.slug}/index.html`);
  }

  console.log('\nAll 11 MyPatrika demos rebuilt successfully!');
}

rebuild();
