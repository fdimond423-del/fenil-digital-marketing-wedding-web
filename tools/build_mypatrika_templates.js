const https = require('https');
const fs = require('fs');
const path = require('path');

const templates = [
  { slug: 'gulmohar-reverie', title: 'Gulmohar Reverie', category: 'Shahi (Premium)', desc: 'Regal floral scarlet & gold luxury wedding invitation theme with interactive curtains.' },
  { slug: 'chandrika-utsav', title: 'Chandrika Utsav', category: 'Shahi (Premium)', desc: 'Moonlight royal night celebration with twinkling starlight and golden chandeliers.' },
  { slug: 'kanak', title: 'Kanak', category: 'Shahi (Premium)', desc: 'Pure golden traditional royal invitation adorned with classic temple aesthetics.' },
  { slug: 'himadri', title: 'Himadri', category: 'Shahi (Premium)', desc: 'Serene mountain ivory & gold palace aesthetic with elegant minimalist typography.' },
  { slug: 'lifafa', title: 'Lifafa', category: 'Shahi (Premium)', desc: 'Interactive digital wax-sealed royal envelope unfolding into a multi-page celebration.' },
  { slug: 'ram-mandir', title: 'Patrika Ram Mandir', category: 'Shahi (Premium)', desc: 'Sacred temple architecture invitation with devotional shlokas and ceremonial rituals.' },
  { slug: 'lagnacha-wada', title: 'Lagnacha Wada', category: 'Mangal (Classic)', desc: 'Traditional Maharashtrian Wada heritage architecture celebrating classic cultural vows.' },
  { slug: 'sheesh-mahal', title: 'Sheesh Mahal', category: 'Mangal (Classic)', desc: 'Glittering royal mirror palace aesthetics with sparkling reflections and grand courtyards.' },
  { slug: 'royal-heritage-palace', title: 'Royal Heritage Palace', category: 'Mangal (Classic)', desc: 'Majestic fortress & royal courtyard invitation with elephant processions and fireworks.' },
  { slug: 'phoolon-ki-baarish', title: 'Phoolon Ki Baarish', category: 'Mangal (Classic)', desc: 'Vibrant pastel rose petal shower celebration perfect for Haldi, Mehndi, and Sangeet.' },
  { slug: 'royal-rajputana', title: 'Royal Rajputana', category: 'Mangal (Classic)', desc: 'Grand Rajasthan royal fort, regal jharokhas, and royal heritage court celebration.' }
];

function fetchThemeHtml(slug) {
  return new Promise((resolve, reject) => {
    const url = `https://mypatrika.in/themes/${slug}/index.html`;
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function buildTopBar(t) {
  const waMsg = encodeURIComponent(`Hi Fenil, I want to customise the ${t.title} wedding invitation website (Price ₹1,499).`);
  return `
<!-- FDM Top Demo Bar -->
<div id="fdm-demo-bar" style="position:fixed;top:0;left:0;right:0;z-index:999999;background:rgba(20,11,13,0.94);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border-bottom:1px solid rgba(233,199,123,0.25);padding:10px 16px;display:flex;align-items:center;justify-content:space-between;gap:12px;font-family:'Montserrat',sans-serif;color:#fff;">
  <div style="display:flex;align-items:center;gap:12px;">
    <a href="../../#templates" style="color:#e9c98a;text-decoration:none;font-weight:600;font-size:13.5px;display:flex;align-items:center;gap:6px;padding:6px 12px;border-radius:20px;background:rgba(255,255,255,0.08);">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
      <span>All templates</span>
    </a>
    <div style="display:flex;flex-direction:column;">
      <span style="font-weight:700;font-size:14.5px;color:#fff;letter-spacing:0.02em;">${t.title}</span>
      <span style="font-size:10.5px;color:#e9c98a;letter-spacing:0.12em;text-transform:uppercase;">${t.category} · Fenil Digital Marketing</span>
    </div>
  </div>
  <div style="display:flex;align-items:center;gap:10px;">
    <span style="font-size:13.5px;font-weight:700;color:#98f014;background:rgba(152,240,20,0.12);padding:4px 10px;border-radius:12px;border:1px solid rgba(152,240,20,0.3);">₹1,499</span>
    <a href="https://wa.me/918200095497?text=${waMsg}" target="_blank" rel="noopener" style="background:#25D366;color:#fff;text-decoration:none;font-weight:700;font-size:13px;padding:8px 16px;border-radius:999px;display:flex;align-items:center;gap:6px;box-shadow:0 4px 14px rgba(37,211,102,0.4);">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.043.073.043.419-.101.824z"/></svg>
      <span>Customise on WhatsApp</span>
    </a>
  </div>
</div>
<div style="height:54px;"></div>
`;
}

function buildTemplatePage(t) {
  const waOrderMsg = encodeURIComponent(`Hi Fenil, I want to order the ${t.title} wedding invitation website (Price ₹1,499).`);
  return `<!doctype html><html lang="en-IN"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${t.title} — Hand-Painted Wedding Invitation Website | Fenil Digital Marketing</title>
<meta name="description" content="${t.desc} Mobile-first wedding invitation website with Google Maps, WhatsApp RSVP, countdown, and music. Price: ₹1,499.">
<link rel="stylesheet" href="../../assets/css/store.css">
</head>
<body class="tex">
<header class="top">
  <div class="wrap nav-wrap">
    <a href="../../" class="brand" aria-label="Fenil Digital Marketing">
      <img src="../../assets/img/fdm-logo.jpg" alt="Fenil Digital Marketing" style="width:38px;height:38px;border-radius:50%;object-fit:cover;box-shadow:0 0 0 2px rgba(233,199,123,.45);">
      <span class="brand-text">
        <span class="brand-sub">Fenil Digital Marketing</span>
        <span class="brand-sup">Wedding Websites</span>
      </span>
    </a>
    <nav class="nav">
      <a href="../../#templates">← All templates</a>
      <a href="https://wa.me/918200095497?text=${waOrderMsg}" class="btn btn-sm btn-gold" target="_blank" rel="noopener">WhatsApp: 8200095497</a>
    </nav>
  </div>
</header>

<main class="wrap main-wrap" style="padding:40px 16px 80px;">
  <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(320px, 1fr));gap:40px;align-items:start;">
    <div>
      <div style="position:relative;border-radius:24px;overflow:hidden;box-shadow:0 24px 48px -12px rgba(40,10,18,.35);border:1px solid rgba(233,199,123,.3);">
        <img src="../../assets/img/mypatrika/${t.slug}.jpg" alt="${t.title}" style="width:100%;height:auto;display:block;">
        <div style="position:absolute;bottom:16px;left:16px;right:16px;display:flex;justify-content:center;">
          <a href="../../demos/patrika-${t.slug}/" class="btn btn-gold" style="box-shadow:0 8px 24px rgba(0,0,0,.5);font-size:15px;padding:12px 24px;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            <span>Open live interactive demo</span>
          </a>
        </div>
      </div>
    </div>
    <div style="background:#fff;padding:32px;border-radius:24px;border:1px solid var(--line);box-shadow:0 12px 32px -16px rgba(0,0,0,.08);">
      <div style="display:inline-block;padding:4px 12px;background:rgba(107,26,54,.08);color:var(--maroon);font-weight:700;font-size:12px;border-radius:999px;letter-spacing:.08em;text-transform:uppercase;margin-bottom:12px;">${t.category}</div>
      <h1 style="font-family:'Cinzel',serif;font-size:clamp(28px, 4vw, 36px);color:var(--maroon);margin:0 0 12px;">${t.title}</h1>
      <p style="color:var(--muted);font-size:16px;line-height:1.6;margin:0 0 24px;">${t.desc}</p>
      
      <div style="background:var(--paper);padding:20px;border-radius:16px;border:1px solid var(--line);margin-bottom:28px;">
        <div style="display:flex;align-items:baseline;justify-content:space-between;margin-bottom:8px;">
          <span style="font-size:14px;color:var(--muted);font-weight:600;">Full Website Package:</span>
          <span style="font-size:28px;font-weight:800;color:#25D366;font-family:'Montserrat',sans-serif;">₹1,499</span>
        </div>
        <p style="font-size:13px;color:var(--muted);margin:0;">Includes custom bride & groom names, event schedule, Google Maps directions, WhatsApp RSVP, and background audio.</p>
      </div>

      <div style="display:flex;flex-direction:column;gap:12px;">
        <a href="https://wa.me/918200095497?text=${waOrderMsg}" target="_blank" rel="noopener" class="btn" style="background:#25D366;color:#fff;box-shadow:0 12px 24px -8px rgba(37,211,102,.6);font-size:16px;padding:16px;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.043.073.043.419-.101.824z"/></svg>
          <span>Order via WhatsApp (+91 8200095497)</span>
        </a>
        <a href="../../demos/patrika-${t.slug}/" class="btn" style="background:#fff;color:var(--maroon);border:1px solid var(--maroon);">
          <span>Test Live Demo First</span>
        </a>
      </div>
    </div>
  </div>
</main>

<footer class="foot" style="background:var(--maroon);color:#fff;padding:40px 16px;text-align:center;">
  <div class="wrap">
    <p style="margin:0 0 8px;font-weight:600;">Fenil Digital Marketing · Founder: Fenil Limbachiya</p>
    <p style="margin:0;font-size:14px;color:rgba(255,255,255,.7);">WhatsApp / Direct Call: <a href="https://wa.me/918200095497" style="color:#e9c98a;">+91 8200095497</a></p>
  </div>
</footer>
</body></html>`;
}

async function run() {
  console.log(`Building ${templates.length} MyPatrika demos and template pages...`);

  for (const t of templates) {
    console.log(`Processing: ${t.slug}...`);
    // 1. Demos
    const demoDir = path.resolve(`demos/patrika-${t.slug}`);
    if (!fs.existsSync(demoDir)) fs.mkdirSync(demoDir, { recursive: true });

    let themeHtml = await fetchThemeHtml(t.slug);

    // Inject <base href="https://mypatrika.in/"> into head
    themeHtml = themeHtml.replace(/<head>/i, `<head>\n  <base href="https://mypatrika.in/">`);

    // Replace MyPatrika branding with Fenil Digital Marketing
    themeHtml = themeHtml.replace(/MyPatrika\.in/g, 'Fenil Digital Marketing');
    themeHtml = themeHtml.replace(/MyPatrika/g, 'Fenil Digital Marketing');

    // Inject top bar into body
    const topBar = buildTopBar(t);
    themeHtml = themeHtml.replace(/<body[^>]*>/i, `$&${topBar}`);

    fs.writeFileSync(path.join(demoDir, 'index.html'), themeHtml, 'utf8');

    // 2. Templates
    const tmplDir = path.resolve(`templates/patrika-${t.slug}`);
    if (!fs.existsSync(tmplDir)) fs.mkdirSync(tmplDir, { recursive: true });

    const tmplHtml = buildTemplatePage(t);
    fs.writeFileSync(path.join(tmplDir, 'index.html'), tmplHtml, 'utf8');

    console.log(`✓ Created demos/patrika-${t.slug} and templates/patrika-${t.slug}`);
  }

  console.log('\nAll 11 MyPatrika templates successfully generated!');
}

run();
