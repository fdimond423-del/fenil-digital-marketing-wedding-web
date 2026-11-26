const fs = require('fs');
const path = require('path');

const newTemplates = [
  {
    slug: 'aaravandmeera-mussoorie',
    name: 'Aarav & Meera (Mussoorie)',
    category: 'Royal',
    desc: 'Mussoorie mountain trail theme with animated wax seal envelope gate, scratch-to-reveal wedding date, multi-event itineraries, venue maps, and WhatsApp RSVP.',
    cover: '/demos/aaravandmeera-mussoorie/assets/re-hero-mobile.webp',
    shots: [
      '/demos/aaravandmeera-mussoorie/assets/re-hero-mobile.webp',
      '/demos/aaravandmeera-mussoorie/assets/re-flap-right.webp',
      '/demos/aaravandmeera-mussoorie/assets/re-rose-seal-cut.webp'
    ]
  },
  {
    slug: 'aaravandmeera-udaipur',
    name: 'Aarav & Meera (Udaipur)',
    category: 'Royal',
    desc: 'Grand Udaipur lake palace theme with animated palace gate doors, royal lakeside graphics, countdown clock, itinerary, and venue directions.',
    cover: '/demos/aaravandmeera-udaipur/assets/pg-palace-blur.webp',
    shots: [
      '/demos/aaravandmeera-udaipur/assets/pg-palace-blur.webp',
      '/demos/aaravandmeera-udaipur/assets/pg-door.webp',
      '/demos/aaravandmeera-udaipur/assets/pg-frame.webp'
    ]
  },
  {
    slug: 'vihaanandmeera',
    name: 'Vihaan & Meera',
    category: 'Minimal',
    desc: 'Contemporary modern luxury wedding invitation featuring clean serif typography, love story gallery, Haldi, Mehendi & Sangeet timelines, and one-tap RSVP.',
    cover: '/demos/vihaanandmeera/assets/wedding-nikhilandrinki-hero.jpg',
    shots: [
      '/demos/vihaanandmeera/assets/wedding-nikhilandrinki-hero.jpg',
      '/demos/vihaanandmeera/assets/wedding-nikhilandrinki-g1.jpg',
      '/demos/vihaanandmeera/assets/wedding-nikhilandrinki-s2.jpg'
    ]
  },
  {
    slug: 'kabirandananya',
    name: 'Kabir & Ananya',
    category: 'Royal',
    desc: 'Grand royal wedding theme with rich maroons, gold accents, multi-event tabs, interactive countdown, high-definition photo gallery, and WhatsApp confirmation.',
    cover: '/demos/kabirandananya/assets/wedding-nikhilandrinki-hero.jpg',
    shots: [
      '/demos/kabirandananya/assets/wedding-nikhilandrinki-hero.jpg',
      '/demos/kabirandananya/assets/wedding-nikhilandrinki-g2.jpg',
      '/demos/kabirandananya/assets/wedding-nikhilandrinki-e1.jpg'
    ]
  },
  {
    slug: 'aaravandshreya',
    name: 'Aarav & Shreya',
    category: 'Floral',
    desc: 'Romantic botanical floral garden theme with soft pastel palettes, countdown clock, couple photo cards, ceremony schedules, and direct Google Maps navigation.',
    cover: '/demos/aaravandshreya/assets/wedding-nikhilandrinki-hero.jpg',
    shots: [
      '/demos/aaravandshreya/assets/wedding-nikhilandrinki-hero.jpg',
      '/demos/aaravandshreya/assets/wedding-nikhilandrinki-g3.jpg',
      '/demos/aaravandshreya/assets/wedding-nikhilandrinki-s1.jpg'
    ]
  },
  {
    slug: 'nikhilandrinki',
    name: 'Nikhil & Rinki',
    category: 'Floral',
    desc: 'Rich Indian heritage festive theme with vibrant ritual celebrations, high-res pre-wedding gallery, dress codes, Google Maps navigation, and WhatsApp RSVP.',
    cover: '/demos/nikhilandrinki/assets/wedding-nikhilandrinki-hero.jpg',
    shots: [
      '/demos/nikhilandrinki/assets/wedding-nikhilandrinki-hero.jpg',
      '/demos/nikhilandrinki/assets/wedding-nikhilandrinki-g4.jpg',
      '/demos/nikhilandrinki/assets/wedding-nikhilandrinki-s2.jpg'
    ]
  }
];

function generateTemplateHtml(t) {
  return `<!doctype html><html lang="en-IN"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${t.name}: Luxury Wedding Invitation Website | Fenil Digital Marketing</title>
<meta name="description" content="${t.desc} Designed by Fenil Digital Marketing (Founder: Fenil Limbachiya). ₹1,499.">
<link rel="canonical" href="http://localhost:3000/templates/${t.slug}/">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="preload" href="/assets/fonts/Cinzel.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/css/store.css">
<style>
  .tmpl-preview-box {
    position: relative;
    border-radius: 18px;
    overflow: hidden;
    box-shadow: 0 16px 40px rgba(0,0,0,0.2);
    border: 1px solid rgba(0,0,0,0.08);
    background: #fff;
    margin-bottom: 24px;
  }
  .tmpl-preview-box img {
    width: 100%;
    height: 380px;
    object-fit: cover;
    display: block;
  }
</style>
</head>
<body class="p-tmpl">
<header class="nav"><div class="nav-c"><a class="skip" href="#main">Skip to content</a>
<a class="brand" href="/" style="display:inline-flex;align-items:center;gap:10px;text-decoration:none;">
  <img src="/assets/img/fdm-logo.jpg" alt="Fenil Digital Marketing Logo" style="height:38px;width:38px;border-radius:50%;object-fit:cover;border:2px solid #ff8c00;box-shadow:0 0 10px rgba(255,140,0,0.4);">
  <span style="display:flex;flex-direction:column;line-height:1.1;">
    <strong style="font-family:'Cinzel',serif;font-size:1.1rem;color:#4C1026;letter-spacing:0.5px;">Fenil Digital Marketing</strong>
    <small style="font-size:0.65rem;color:#8a6d65;letter-spacing:1px;text-transform:uppercase;">Founder: Fenil Limbachiya</small>
  </span>
</a>
<nav class="nav-links"><a href="/#templates">Templates</a><a href="/#how">How it works</a><a href="/#faq">FAQ</a><a href="/blog/">Blog</a><a class="nav-act" href="https://wa.me/918200095497?text=Hi%20Fenil%20Digital%20Marketing!%20I%20have%20a%20question%20about%20your%20wedding%20invites." target="_blank" rel="noopener">WhatsApp</a></nav></div></header>

<main id="main">
<section class="tmpl-hero"><div class="tmpl-c">
<div class="tmpl-view">
  <div class="tmpl-preview-box">
    <img src="${t.cover}" alt="${t.name} Preview">
  </div>
  <div style="display:flex;gap:12px;flex-wrap:wrap;justify-content:center;">
    <a class="btn btn-sec" href="/demos/${t.slug}/" target="_blank" rel="noopener" style="font-size:1.05rem;padding:14px 28px;">▶ View live demo on phone</a>
  </div>
</div>

<div class="tmpl-buy">
<span class="badge" style="margin-bottom:12px;display:inline-block;">${t.category} Wedding Collection</span>
<h1 class="h1">${t.name}</h1>
<p class="lede">${t.desc}</p>
<ul class="tmpl-specs" aria-label="Key features">
  <li><b>Mobile-first</b> — Opens smoothly on WhatsApp and all smartphones</li>
  <li><b>Gate Animation</b> — Interactive gate entrance for an unforgettable experience</li>
  <li><b>One link for everything</b> — Countdown, event itineraries, venue directions & RSVP</li>
  <li><b>Direct WhatsApp RSVP</b> — Confirmations go straight to your WhatsApp</li>
  <li><b>Live in 24 hours</b> — Fast delivery managed by Fenil Digital Marketing</li>
</ul>

<form class="buy" id="buy" data-template="${t.slug}" data-name="${t.name}" data-price="1499" data-addon="999" data-ppu="" data-ppu-setup="" data-wa="918200095497" novalidate>
<div class="price"><span class="price-n" id="price-n">₹1,499</span><span class="price-s">one time · incl. lifetime hosting</span></div>
<label class="addon"><input type="checkbox" id="addon" name="addon"><span class="addon-box"></span><span><b>Done-for-you setup +₹999</b><small>Send us your details and photos on WhatsApp (+91 8200095497) and Fenil Digital Marketing team will fill in everything for you with perfect crops.</small></span></label>
<details class="details-opt" open><summary>Add your wedding details (optional, speeds things up)</summary>
<div class="fields">
  <label>Your name<input name="name" autocomplete="name" placeholder="Groom & Bride Name"></label>
  <label>Mobile<input name="phone" type="tel" autocomplete="tel" placeholder="+91 9876543210"></label>
  <label>Email<input name="email" type="email" autocomplete="email" placeholder="you@example.com"></label>
  <label>Wedding date<input name="date" type="date"></label>
</div>
</details>
<button class="btn btn-pri buy-btn" id="buy-btn" type="submit" style="width:100%;font-size:1.1rem;padding:16px;">Choose and pay <span id="buy-amt">₹1,499</span></button>
<p class="buy-status" id="buy-status" aria-live="polite"></p>
<div class="buy-alt">
  <span>or</span>
  <a class="wa-link" id="wa-alt" href="https://wa.me/918200095497?text=Hi%20Fenil%20Digital%20Marketing!%20I'd%20like%20to%20order%20the%20${encodeURIComponent(t.name)}%20wedding%20invite%20template%20(₹1,499)" target="_blank" rel="noopener">
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path fill="currentColor" d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2z"/></svg>
    Prefer WhatsApp? Order on WhatsApp →
  </a>
</div>
</form>
</div>
</div></section>

<section class="shots-sec"><div class="shots-c"><h2 class="h2">Every screen, as your guests see it</h2>
<p class="shots-sub">Designed for real family celebrations: easy to read for grandparents, easy to tap for friends.</p>
<div class="shots-grid" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px;margin-top:32px;">
  ${t.shots.map((s, idx) => `
    <div style="border-radius:14px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.1);background:#fff;">
      <img src="${s}" alt="${t.name} screen ${idx+1}" style="width:100%;height:320px;object-fit:cover;display:block;">
    </div>
  `).join('')}
</div>
</div></section>

<section class="tmpl-feats"><div class="tmpl-feats-c"><h2 class="h2">What’s included in ${t.name}</h2>
<div class="feats"><article class="feat-i"><span class="feat-n">01</span><h3 class="h3">Interactive Opening Gate</h3><p>An exquisite animated gate entrance that opens when guests tap or scroll.</p></article>
<article class="feat-i"><span class="feat-n">02</span><h3 class="h3">One-tap WhatsApp RSVP</h3><p>Guest RSVPs go directly to your personal WhatsApp number with no spreadsheets or confusion.</p></article>
<article class="feat-i"><span class="feat-n">03</span><h3 class="h3">Google Maps for Every Venue</h3><p>Direct navigation links for Haldi, Mehendi, Sangeet, Wedding and Reception venues.</p></article>
<article class="feat-i"><span class="feat-n">04</span><h3 class="h3">Live Countdown Timer</h3><p>Builds excitement among guests with live days, hours, and minutes ticking down to your big day.</p></article>
<article class="feat-i"><span class="feat-n">05</span><h3 class="h3">Pre-wedding Photo Gallery</h3><p>High-resolution gallery showcasing your favorite couple and family memories.</p></article>
<article class="feat-i"><span class="feat-n">06</span><h3 class="h3">Custom Background Music</h3><p>Plays your romantic or traditional wedding song with play/pause controls.</p></article></div>
</div></section>

<section class="closing"><div class="closing-c">
<h2 class="h2">Ready to create your invitation?</h2>
<p class="closing-p">Your wedding link will be live within 24 hours. Change details anytime after sharing.</p>
<div style="display:flex;gap:16px;justify-content:center;flex-wrap:wrap;margin-top:24px;">
  <a class="btn btn-pri" href="#buy" style="font-size:1.1rem;padding:16px 36px;">Choose and pay ₹1,499</a>
  <a class="btn btn-sec" href="/demos/${t.slug}/" target="_blank" rel="noopener" style="font-size:1.1rem;padding:16px 36px;">View live demo</a>
</div>
</div></section>
</main>

<footer class="foot" style="background:#17050B;color:#f0e4dc;padding:48px 24px 32px;margin-top:60px;">
  <div style="max-width:1120px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:36px;border-bottom:1px solid rgba(255,255,255,0.12);padding-bottom:36px;">
    <div>
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;">
        <img src="/assets/img/fdm-logo.jpg" alt="Fenil Digital Marketing Logo" style="width:48px;height:48px;border-radius:50%;border:2px solid #ff8c00;">
        <div>
          <h4 style="font-family:'Cinzel',serif;font-size:1.15rem;color:#ff8c00;margin:0;">Fenil Digital Marketing</h4>
          <p style="font-size:0.75rem;color:#bcaaa4;margin:0;">Founder: Fenil Limbachiya</p>
        </div>
      </div>
      <p style="font-size:0.88rem;color:#cfc2bd;line-height:1.6;margin-bottom:14px;">All-In-One Digital Solutions: Luxury painted mobile wedding websites, digital invitations, NFC smart cards, and marketing automation.</p>
      <p style="font-size:0.88rem;color:#ff8c00;"><strong>📞 Call &amp; WhatsApp: +91 8200095497</strong></p>
    </div>
    <div>
      <h5 style="color:#fff;font-size:0.95rem;margin-bottom:14px;letter-spacing:1px;text-transform:uppercase;">Wedding Collections (12 Themes)</h5>
      <ul style="list-style:none;padding:0;margin:0;font-size:0.85rem;line-height:2;color:#bcaaa4;">
        <li><a href="/templates/rangmahal/" style="color:#bcaaa4;text-decoration:none;">• Rangmahal (Palace Theme)</a></li>
        <li><a href="/templates/phulkari/" style="color:#bcaaa4;text-decoration:none;">• Phulkari (Punjabi Heritage)</a></li>
        <li><a href="/templates/kolam/" style="color:#bcaaa4;text-decoration:none;">• Kolam (South Indian Tradition)</a></li>
        <li><a href="/templates/noor/" style="color:#bcaaa4;text-decoration:none;">• Noor (Mughal &amp; Nikah)</a></li>
        <li><a href="/templates/aaravandmeera-mussoorie/" style="color:#bcaaa4;text-decoration:none;">• Aarav &amp; Meera (Mussoorie Mountain)</a></li>
        <li><a href="/templates/aaravandmeera-udaipur/" style="color:#bcaaa4;text-decoration:none;">• Aarav &amp; Meera (Udaipur Lake)</a></li>
      </ul>
    </div>
    <div>
      <h5 style="color:#fff;font-size:0.95rem;margin-bottom:14px;letter-spacing:1px;text-transform:uppercase;">Direct Contact &amp; Support</h5>
      <p style="font-size:0.88rem;color:#cfc2bd;line-height:1.8;">
        <strong>Company:</strong> Fenil Digital Marketing<br>
        <strong>Founder:</strong> Fenil Limbachiya<br>
        <strong>Phone / WhatsApp:</strong> <a href="https://wa.me/918200095497" style="color:#ff8c00;text-decoration:none;">+91 8200095497</a><br>
        <strong>Turnaround:</strong> Instant preview on your phone
      </p>
      <div style="margin-top:16px;">
        <a href="https://wa.me/918200095497?text=Hi%20Fenil%20Digital%20Marketing!%20I%20want%20a%20wedding%20website" style="display:inline-block;padding:10px 20px;background:#ff8c00;color:#000;font-weight:700;border-radius:999px;text-decoration:none;font-size:0.85rem;">Order on WhatsApp →</a>
      </div>
    </div>
  </div>
  <div style="max-width:1120px;margin:24px auto 0;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;font-size:0.8rem;color:#8f7b76;">
    <p style="margin:0;">© 2026 Fenil Digital Marketing. All rights reserved. Designed &amp; Founded by Fenil Limbachiya.</p>
    <div style="display:flex;gap:16px;">
      <a href="/terms/" style="color:#8f7b76;text-decoration:none;">Terms</a>
      <a href="/privacy/" style="color:#8f7b76;text-decoration:none;">Privacy</a>
      <a href="/refund/" style="color:#8f7b76;text-decoration:none;">Refund Policy</a>
      <a href="/contact/" style="color:#8f7b76;text-decoration:none;">Contact</a>
    </div>
  </div>
</footer>
<script src="/assets/js/cfg.js" defer></script><script src="/assets/js/store.js" defer></script></body></html>`;
}

console.log('--- Generating templates/<slug>/index.html for all 6 new templates ---');
for (const t of newTemplates) {
  const dir = path.join(__dirname, 'templates', t.slug);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const html = generateTemplateHtml(t);
  fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf8');
  console.log(`Created: templates/${t.slug}/index.html (${html.length} bytes)`);
}

console.log('\n--- Updating index.html cards to match original structure ---');
let indexHtml = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

// Update all 6 new cards in index.html so cover, title, and buttons match original cards:
const newCardsSection = newTemplates.map(t => `
      <article class="card" data-cat="${t.category}">
        <a class="card-cover" href="/templates/${t.slug}/" title="${t.name}">
          <img src="${t.cover}" alt="${t.name} Wedding Invitation" loading="lazy" style="height:280px;object-fit:cover;width:100%;">
          <span class="badge">${t.category}</span>
        </a>
        <div class="card-body">
          <div class="card-head">
            <h3 class="h3"><a href="/templates/${t.slug}/">${t.name}</a></h3>
            <span class="price">₹1,499</span>
          </div>
          <p class="card-tag">${t.desc.split('.')[0]}</p>
          <div class="card-acts">
            <a class="btn btn-sec" href="/demos/${t.slug}/" target="_blank" rel="noopener">View live demo</a>
            <a class="btn btn-pri" href="/templates/${t.slug}/#buy">Choose and pay</a>
          </div>
        </div>
      </article>`).join('\n');

// Replace the vishakha cards block in index.html
const startMarker = '<!-- Additional Luxury Templates (Vishakha Collections by Fenil Digital Marketing) -->';
const endMarker = '</section>';

if (indexHtml.includes(startMarker)) {
  const sIdx = indexHtml.indexOf(startMarker);
  const eIdx = indexHtml.indexOf(endMarker, sIdx);
  indexHtml = indexHtml.slice(0, sIdx) + startMarker + '\n' + newCardsSection + '\n' + indexHtml.slice(eIdx);
} else {
  // Insert before closing </section> of #templates
  const sIdx = indexHtml.indexOf('id="templates"');
  const eIdx = indexHtml.indexOf(endMarker, sIdx);
  indexHtml = indexHtml.slice(0, eIdx) + '\n' + startMarker + '\n' + newCardsSection + '\n' + indexHtml.slice(eIdx);
}

// Also ensure all original 6 cards have target="_blank" rel="noopener" on "View live demo" and href="/templates/.../#buy" on "Choose and pay"
indexHtml = indexHtml.replace(/href="\/demos\/rangmahal\/"/g, 'href="/demos/rangmahal/" target="_blank" rel="noopener"');
indexHtml = indexHtml.replace(/href="\/demos\/phulkari\/"/g, 'href="/demos/phulkari/" target="_blank" rel="noopener"');
indexHtml = indexHtml.replace(/href="\/demos\/kolam\/"/g, 'href="/demos/kolam/" target="_blank" rel="noopener"');
indexHtml = indexHtml.replace(/href="\/demos\/noor\/"/g, 'href="/demos/noor/" target="_blank" rel="noopener"');
indexHtml = indexHtml.replace(/href="\/demos\/capela\/"/g, 'href="/demos/capela/" target="_blank" rel="noopener"');
indexHtml = indexHtml.replace(/href="\/demos\/pichola\/"/g, 'href="/demos/pichola/" target="_blank" rel="noopener"');

fs.writeFileSync(path.join(__dirname, 'index.html'), indexHtml, 'utf8');
console.log('index.html updated successfully with matching Choose and pay links!');

console.log('\n--- Ensuring all demo apps open smoothly and have Choose & Pay link ---');
for (const t of newTemplates) {
  const demoPath = path.join(__dirname, 'demos', t.slug, 'index.html');
  if (!fs.existsSync(demoPath)) continue;
  let demoHtml = fs.readFileSync(demoPath, 'utf8');

  // Add a nice floating header bar on the demo with "Choose and Pay" button
  const demoHeader = `
  <div style="position:fixed;top:10px;left:50%;transform:translateX(-50%);z-index:999999;background:rgba(20,5,10,0.92);backdrop-filter:blur(10px);border:1px solid rgba(255,140,0,0.5);border-radius:999px;padding:8px 20px;display:flex;align-items:center;gap:14px;box-shadow:0 8px 30px rgba(0,0,0,0.6);font-family:system-ui,-apple-system,sans-serif;">
    <a href="/" style="display:flex;align-items:center;gap:8px;text-decoration:none;color:#fff;font-size:0.85rem;">
      <img src="/assets/img/fdm-logo.jpg" alt="FDM Logo" style="width:24px;height:24px;border-radius:50%;border:1px solid #ff8c00;">
      <span style="font-weight:600;">Fenil Digital Marketing</span>
    </a>
    <span style="color:rgba(255,255,255,0.4);">|</span>
    <a href="/templates/${t.slug}/#buy" style="background:#ff8c00;color:#000;font-weight:700;font-size:0.8rem;padding:4px 14px;border-radius:999px;text-decoration:none;box-shadow:0 0 10px rgba(255,140,0,0.4);">Choose &amp; Pay ₹1,499 →</a>
  </div>
  `;

  // Remove old badge if present and insert new header
  demoHtml = demoHtml.replace(/<a href="\/" class="fdm-badge"[\s\S]*?<\/a>/i, '');
  if (!demoHtml.includes('Choose &amp; Pay ₹1,499')) {
    demoHtml = demoHtml.replace(/<body[^>]*>/i, '$&\n' + demoHeader);
  }

  // Ensure gate click script has tap anywhere fallback and smooth removal
  const gateFixScript = `
  <script>
    // Universal tap/click anywhere to open gate
    window.addEventListener('DOMContentLoaded', () => {
      const g = document.getElementById('gate');
      if (g) {
        const doOpen = () => {
          g.classList.add('open');
          document.body.classList.remove('locked');
          g.style.pointerEvents = 'none';
          setTimeout(() => { g.style.display = 'none'; }, 1600);
        };
        g.addEventListener('click', doOpen);
        g.addEventListener('touchstart', doOpen, { passive: true });
        window.addEventListener('keydown', (e) => { if (e.key === ' ' || e.key === 'Enter') doOpen(); });
      }
    });
  </script>
  `;

  if (!demoHtml.includes('Universal tap/click anywhere to open gate')) {
    demoHtml = demoHtml.replace('</body>', gateFixScript + '\n</body>');
  }

  fs.writeFileSync(demoPath, demoHtml, 'utf8');
  console.log(`Updated demo: demos/${t.slug}/index.html`);
}
