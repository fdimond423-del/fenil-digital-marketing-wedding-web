const fs = require('fs');
const path = require('path');

const slugs = [
  {
    slug: 'aaravandmeera-mussoorie',
    name: 'Aarav & Meera (Mussoorie)',
    category: 'Hindu',
    tag: 'Mussoorie · Mountain Trail · envelope wax seal & scratch to reveal date',
    cover: '/demos/aaravandmeera-mussoorie/assets/re-hero-mobile.webp'
  },
  {
    slug: 'aaravandmeera-udaipur',
    name: 'Aarav & Meera (Udaipur)',
    category: 'Hindu',
    tag: 'Udaipur · Lake Palace · royal gates entrance, animated moments & countdown',
    cover: '/demos/aaravandmeera-udaipur/assets/pg-palace-blur.webp'
  },
  {
    slug: 'vihaanandmeera',
    name: 'Vihaan & Meera',
    category: 'Hindu',
    tag: 'Contemporary · Minimal Grace · clean serif typography, story gallery & schedules',
    cover: '/demos/vihaanandmeera/assets/wedding-nikhilandrinki-hero.jpg'
  },
  {
    slug: 'kabirandananya',
    name: 'Kabir & Ananya',
    category: 'Hindu',
    tag: 'Grand Royal · Majestic Palaces · rich maroon & gold, multi-event tabs & gallery',
    cover: '/demos/kabirandananya/assets/wedding-nikhilandrinki-hero.jpg'
  },
  {
    slug: 'aaravandshreya',
    name: 'Aarav & Shreya',
    category: 'Hindu',
    tag: 'Botanical · Floral Garden · pastel romantic aesthetics, live countdown & RSVP',
    cover: '/demos/aaravandshreya/assets/wedding-nikhilandrinki-hero.jpg'
  },
  {
    slug: 'nikhilandrinki',
    name: 'Nikhil & Rinki',
    category: 'Hindu',
    tag: 'Traditional · Festive Heritage · complete Indian ritual guide & venue maps',
    cover: '/demos/nikhilandrinki/assets/wedding-nikhilandrinki-hero.jpg'
  }
];

console.log('=== Step 1: Updating favicon.svg with user logo ===');
const logoBuf = fs.readFileSync(path.join(__dirname, 'assets/img/fdm-logo.jpg'));
const logoBase64 = logoBuf.toString('base64');
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100">
  <clipPath id="circle"><circle cx="50" cy="50" r="48"/></clipPath>
  <image width="100" height="100" xlink:href="data:image/jpeg;base64,${logoBase64}" clip-path="url(#circle)"/>
  <circle cx="50" cy="50" r="48" fill="none" stroke="#ff8c00" stroke-width="4"/>
</svg>`;
fs.writeFileSync(path.join(__dirname, 'favicon.svg'), faviconSvg, 'utf8');
console.log('Updated favicon.svg with FDM circular logo!');

console.log('\n=== Step 2: Preparing Exact Vishakha Templates ===');
for (const item of slugs) {
  const rawPath = path.join(__dirname, 'demos', item.slug, 'raw.html');
  if (!fs.existsSync(rawPath)) {
    console.warn('raw.html missing for', item.slug);
    continue;
  }
  let raw = fs.readFileSync(rawPath, 'utf8');

  // Fix protocol relative links so they load over https safely
  raw = raw.replace(/\/\/vishakhacollections\.com/g, 'https://vishakhacollections.com');
  raw = raw.replace(/\/\/cdn\.shopify\.com/g, 'https://cdn.shopify.com');

  // Change URLs from Vishakha to local paths
  raw = raw.replace(/https:\/\/vishakhacollections\.com\/pages\/wedding\//g, '/pages/wedding/');

  // Replace phone numbers and WhatsApp
  raw = raw.replace(/wa\.me\/\d+/g, 'wa.me/918200095497');
  raw = raw.replace(/\+91[\s-]?\d{10}/g, '+91 8200095497');
  raw = raw.replace(/Vishakha Collections/gi, 'Fenil Digital Marketing');

  // Floating top navigation bar linking back to Store & WhatsApp
  const topBar = `
  <div style="position:fixed;top:10px;left:50%;transform:translateX(-50%);z-index:99999999;background:rgba(15,5,10,0.92);backdrop-filter:blur(10px);border:1.5px solid #ff8c00;border-radius:999px;padding:6px 18px;display:flex;align-items:center;gap:12px;box-shadow:0 8px 30px rgba(0,0,0,0.7);font-family:system-ui,-apple-system,sans-serif;">
    <a href="/" style="display:flex;align-items:center;gap:8px;text-decoration:none;color:#fff;font-size:0.85rem;font-weight:700;">
      <img src="/assets/img/fdm-logo.jpg" alt="FDM Logo" style="width:26px;height:26px;border-radius:50%;border:1px solid #ff8c00;">
      <span>Fenil Digital Marketing</span>
    </a>
    <span style="color:#666;">•</span>
    <span style="color:#ff8c00;font-size:0.75rem;font-weight:700;">Founder: Fenil Limbachiya</span>
    <span style="color:#666;">•</span>
    <a href="https://wa.me/918200095497?text=Hi%20Fenil%20Digital%20Marketing!%20I%20want%20to%20order%20the%20${encodeURIComponent(item.name)}%20wedding%20invitation" target="_blank" rel="noopener" style="background:#25D366;color:#fff;padding:4px 12px;border-radius:999px;font-size:0.75rem;font-weight:700;text-decoration:none;display:flex;align-items:center;gap:4px;">
      WhatsApp: 8200095497
    </a>
    <a href="/" style="background:#ff8c00;color:#000;padding:4px 12px;border-radius:999px;font-size:0.75rem;font-weight:700;text-decoration:none;">
      ← Store
    </a>
  </div>
  `;

  // Insert top bar right after <body>
  raw = raw.replace(/<body[^>]*>/i, '$&\n' + topBar);

  // Save to /pages/wedding/<slug>/index.html
  const pwDir = path.join(__dirname, 'pages', 'wedding', item.slug);
  if (!fs.existsSync(pwDir)) fs.mkdirSync(pwDir, { recursive: true });
  fs.writeFileSync(path.join(pwDir, 'index.html'), raw, 'utf8');

  // Save to /demos/<slug>/index.html
  const demoDir = path.join(__dirname, 'demos', item.slug);
  fs.writeFileSync(path.join(demoDir, 'index.html'), raw, 'utf8');

  // Also save to /templates/<slug>/index.html
  const tmplDir = path.join(__dirname, 'templates', item.slug);
  if (!fs.existsSync(tmplDir)) fs.mkdirSync(tmplDir, { recursive: true });
  fs.writeFileSync(path.join(tmplDir, 'index.html'), raw, 'utf8');

  console.log(`Saved exact template for ${item.slug} in pages/wedding, demos, and templates!`);
}

console.log('\n=== Step 3: Fixing index.html Grid & Cards ===');
let indexHtml = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

// The original 6 cards
const originalCards = [
  { slug: 'rangmahal', name: 'Rangmahal', cat: 'Hindu', sub: 'Hindu · Rajasthani palace · painted doors that open on scroll', art: '/assets/img/rm-01-opening.webp' },
  { slug: 'phulkari', name: 'Phulkari', cat: 'Sikh', sub: 'Sikh · Anand Karaj · a phulkari veil that lifts at dawn', art: '/assets/img/phulkari-cover.webp' },
  { slug: 'kolam', name: 'Kolam', cat: 'South Indian', sub: 'South Indian · Tamil wedding · a kolam that draws itself, a lamp that lights', art: '/assets/img/kolam-cover.webp' },
  { slug: 'noor', name: 'Noor', cat: 'Muslim', sub: 'Muslim · Nikah · a marble jaali opens under the crescent moon', art: '/assets/img/noor-cover.webp' },
  { slug: 'capela', name: 'Capela', cat: 'Christian', sub: 'Christian · Church wedding · Goan chapel doors, a bell and falling lilies', art: '/assets/img/capela-cover.webp' },
  { slug: 'pichola', name: 'Pichola', cat: 'Save the date', sub: 'Save the date · Lake Pichola at dusk · a royal boat floats toward the palace', art: '/assets/img/pichola-cover.webp' }
];

// All 12 cards combined
const all12Cards = [
  ...originalCards,
  ...slugs.map(s => ({
    slug: s.slug,
    name: s.name,
    cat: s.category,
    sub: s.tag,
    art: s.cover
  }))
];

function renderCard(c) {
  return `<article class="card" data-cat="${c.cat}"><a class="card-art" href="/templates/${c.slug}/" tabindex="-1" aria-hidden="true"><img src="${c.art}" alt="Preview art for the ${c.name} template" width="432" height="768" loading="lazy" decoding="async"></a><div class="card-body"><span class="badge live">Live · ₹1,499</span><h3>${c.name}</h3><p class="card-cat">${c.sub}</p><div class="card-act"><a class="btn sm" href="/templates/${c.slug}/">View template</a><a class="btn sm ghost" href="/pages/wedding/${c.slug}" target="_blank" rel="noopener"><svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/></svg> Live demo</a></div></div></article>`;
}

// Find <section id="templates" ...>
const sectionStart = indexHtml.indexOf('<section id="templates"');
const sectionEnd = indexHtml.indexOf('</section>', sectionStart) + 10;

const newSectionHtml = `<section id="templates" class="sec"><div class="in"><p class="eyebrow c">The collection</p><h2 class="h2 c">Choose your invite</h2>
<p class="sub c">12 live interactive luxury wedding templates. Hand-crafted artwork with instant WhatsApp RSVP.</p>
<div class="chips" role="group" aria-label="Filter templates">
  <button type="button" class="chip on" data-f="All" aria-pressed="true">All (12)</button>
  <button type="button" class="chip" data-f="Hindu" aria-pressed="false">Hindu &amp; Royal</button>
  <button type="button" class="chip" data-f="Sikh" aria-pressed="false">Sikh</button>
  <button type="button" class="chip" data-f="South Indian" aria-pressed="false">South Indian</button>
  <button type="button" class="chip" data-f="Muslim" aria-pressed="false">Muslim</button>
  <button type="button" class="chip" data-f="Christian" aria-pressed="false">Christian</button>
  <button type="button" class="chip" data-f="Save the date" aria-pressed="false">Save the date</button>
</div>
<div class="grid">
${all12Cards.map(renderCard).join('\n')}
</div>
<p class="empty" hidden>No templates in this category yet. Check back soon, or suggest one on WhatsApp.</p>
</div></section>`;

indexHtml = indexHtml.slice(0, sectionStart) + newSectionHtml + indexHtml.slice(sectionEnd);

// Brand header replacement across index.html
const brandHtml = `<a class="brand" href="/" style="display:inline-flex;align-items:center;gap:12px;text-decoration:none;">
  <img src="/assets/img/fdm-logo.jpg" alt="Fenil Digital Marketing Logo" style="height:46px;width:46px;border-radius:50%;object-fit:cover;border:2.5px solid #ff8c00;box-shadow:0 0 14px rgba(255,140,0,0.5);">
  <span style="display:flex;flex-direction:column;line-height:1.15;">
    <strong style="font-family:'Cinzel',serif;font-size:1.2rem;color:#4C1026;letter-spacing:0.5px;">Fenil Digital Marketing</strong>
    <small style="font-size:0.72rem;color:#8a6d65;letter-spacing:1px;text-transform:uppercase;font-weight:700;">Founder: Fenil Limbachiya • 📞 8200095497</small>
  </span>
</a>`;

indexHtml = indexHtml.replace(/<a class="brand" href="\/">[\s\S]*?<\/a>/i, brandHtml);

fs.writeFileSync(path.join(__dirname, 'index.html'), indexHtml, 'utf8');
console.log('index.html updated with all 12 cards inside div.grid!');

console.log('\n=== Step 4: Updating server.js to serve /pages/wedding/:slug cleanly ===');
let serverJs = fs.readFileSync(path.join(__dirname, 'server.js'), 'utf8');

// Update server routing so /pages/wedding/:slug serves the index.html file in pages/wedding/:slug/index.html
if (serverJs.includes('if (pathname.startsWith(\'/pages/wedding/\'))')) {
  // Replace the 302 redirect with direct file serving
  const oldRedirect = /if \(pathname\.startsWith\('\/pages\/wedding\/'\)\) \{[\s\S]*?return;\s*\}/;
  const newHandler = `if (pathname.startsWith('/pages/wedding/')) {
    const slug = pathname.replace('/pages/wedding/', '').replace(/\\/+$/, '');
    const targetFile = path.join(ROOT_DIR, 'pages', 'wedding', slug, 'index.html');
    if (fs.existsSync(targetFile)) {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      fs.createReadStream(targetFile).pipe(res);
      return;
    }
  }`;
  serverJs = serverJs.replace(oldRedirect, newHandler);
  fs.writeFileSync(path.join(__dirname, 'server.js'), serverJs, 'utf8');
  console.log('server.js updated to serve /pages/wedding/:slug directly with 200 OK!');
}

console.log('\n=== All steps completed successfully! ===');
