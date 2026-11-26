const https = require('https');
const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');

const TORAN_TEMPLATES = [
  {
    slug: 'toran-sage',
    url: 'https://toran.ink/sample/aarti-and-rohan/sage',
    name: 'Toran Sage · Vedic Botanical',
    cat: 'Hindu',
    badge: 'Forest Green',
    desc: 'Mango leaves across the top, forest green on pale paper with delicate Sanskrit shlokas, event timelines, Google Maps navigation, and RSVP.',
    eyebrow: 'Vedic wedding · Mango leaves & sage green',
    art: '/assets/img/rm-01-opening.webp'
  },
  {
    slug: 'toran-ochre',
    url: 'https://toran.ink/sample/aarti-and-rohan/ochre',
    name: 'Toran Ochre · Traditional Kankotri',
    cat: 'Hindu',
    badge: 'Turmeric Kankotri',
    desc: 'A vibrant marigold border on turmeric handmade paper. The closest digital expression of a sacred Gujarati & Rajasthani printed kankotri.',
    eyebrow: 'Traditional Indian · Marigold & turmeric paper',
    art: '/assets/img/rm-03-events.webp'
  },
  {
    slug: 'toran-ember',
    url: 'https://toran.ink/sample/aarti-and-rohan/ember',
    name: 'Toran Ember · Twilight Diyas',
    cat: 'Hindu',
    badge: 'Dusk Diyas',
    desc: 'A glowing row of terracotta diyas burning against a twilight sky, with rich royal maroon and gold foil details for grand evening pheras.',
    eyebrow: 'Evening wedding · Terracotta diyas & royal maroon',
    art: '/assets/img/rm-04-itinerary.webp'
  },
  {
    slug: 'toran-indigo',
    url: 'https://toran.ink/sample/aarti-and-rohan/indigo',
    name: 'Toran Indigo · Navy Regal Luxe',
    cat: 'Modern',
    badge: 'Navy & Gold',
    desc: 'Deep navy ink and embossed gold typography on a cool textured sheet. Sophisticated, formal, and contemporary high-end luxury.',
    eyebrow: 'Modern formal · Navy ink & metallic gold',
    art: '/assets/img/capela-cover.webp'
  },
  {
    slug: 'toran-kumkum',
    url: 'https://toran.ink/sample/aarti-and-rohan/kumkum',
    name: 'Toran Kumkum · Auspicious Paisley',
    cat: 'Hindu',
    badge: 'Sindoor Paisley',
    desc: 'Sacred sindoor red and gold on warm ivory cream, with intricate traditional paisley borders wrapping around ancestral blessings.',
    eyebrow: 'Sacred wedding · Kumkum red & gold paisley',
    art: '/assets/img/kolam-cover.webp'
  },
  {
    slug: 'toran-amethyst',
    url: 'https://toran.ink/sample/aarti-and-rohan/amethyst',
    name: 'Toran Amethyst · Royal Violet Night',
    cat: 'Royal',
    badge: 'Violet Night',
    desc: 'A royal violet velvet night with golden latkan tassels strung across, setting a luxurious atmosphere for cocktail and reception celebrations.',
    eyebrow: 'Royal reception · Violet velvet & golden tassels',
    art: '/assets/img/pichola-cover.webp'
  },
  {
    slug: 'toran-divya-karthik',
    url: 'https://toran.ink/sample/divya-and-karthik/kumkum',
    name: 'Divya & Karthik · South Indian Luxe',
    cat: 'South Indian',
    badge: 'Temple Tradition',
    desc: 'Auspicious South Indian wedding invitation with temple nadaswaram cues, sacred muhurtham timing, and family WhatsApp RSVP.',
    eyebrow: 'South Indian · Kumkum & temple traditions',
    art: '/assets/img/kolam-cover.webp'
  },
  {
    slug: 'toran-nidhi-saurabh',
    url: 'https://toran.ink/sample/nidhi-and-saurabh/ochre',
    name: 'Nidhi & Saurabh · Heritage Kankotri',
    cat: 'Hindu',
    badge: 'Auspicious Ochre',
    desc: 'Festive ochre tones celebrating rituals from Ganesh Sthapana to Vidai, with multi-event itinerary cards and venue maps.',
    eyebrow: 'Heritage wedding · Festive ochre & blessings',
    art: '/assets/img/rm-02-countdown.webp'
  },
  {
    slug: 'toran-aditi-omkar',
    url: 'https://toran.ink/sample/aditi-and-omkar/sage',
    name: 'Aditi & Omkar · Minimalist Botanical',
    cat: 'Modern',
    badge: 'Botanical Sage',
    desc: 'Clean, serene sage green palette crafted for modern couples, with subtle botanical elements and mobile-first RSVP.',
    eyebrow: 'Contemporary wedding · Botanical sage green',
    art: '/assets/img/rm-05-rsvp.webp'
  },
  {
    slug: 'toran-ananya-rudra',
    url: 'https://toran.ink/sample/ananya-and-rudra/ember',
    name: 'Ananya & Rudra · Grand Sangeet & Vivah',
    cat: 'Hindu',
    badge: 'Ember Darbar',
    desc: 'Deep warm amber tones framing high-energy Sangeet performances, Baraat procession, and midnight pheras ceremony.',
    eyebrow: 'Royal wedding · Amber twilight & palace darbar',
    art: '/assets/img/rm-03-events.webp'
  },
  {
    slug: 'toran-engagement-sage',
    url: 'https://toran.ink/sample/engagement/sage',
    name: 'Engagement Sagai (Sage)',
    cat: 'Floral',
    badge: 'Ring Ceremony',
    desc: 'Delicate botanical garden invitation for Roka, Sagai, and Ring Ceremony with date countdown and venue directions.',
    eyebrow: 'Engagement · Roka & ring ceremony flora',
    art: '/assets/img/rm-01-opening.webp'
  },
  {
    slug: 'toran-engagement-ochre',
    url: 'https://toran.ink/sample/engagement/ochre',
    name: 'Engagement Sagai (Ochre)',
    cat: 'Hindu',
    badge: 'Traditional Roka',
    desc: 'Warm marigold aesthetic for traditional engagement, formal family blessings, and celebratory dinner banquet.',
    eyebrow: 'Traditional Roka · Auspicious muhurat & feast',
    art: '/assets/img/rm-02-countdown.webp'
  },
  {
    slug: 'toran-tilak',
    url: 'https://toran.ink/sample/tilak/ochre',
    name: 'Shubh Tilak Ceremony',
    cat: 'Hindu',
    badge: 'Vedic Tilak',
    desc: 'Morning Tilak ceremony invitation with sacred Vedic shlokas, ancestral greetings, and family welcome details.',
    eyebrow: 'Ceremony invite · Morning Vedic tilak rasam',
    art: '/assets/img/rm-04-itinerary.webp'
  },
  {
    slug: 'toran-haldi',
    url: 'https://toran.ink/sample/haldi/ochre',
    name: 'Haldi Utsav Celebration',
    cat: 'Hindu',
    badge: 'Turmeric Haldi',
    desc: 'Vibrant turmeric yellow invitation with floral motifs, poolside haldi dress codes, dhol celebration, and RSVP.',
    eyebrow: 'Ceremony invite · Turmeric yellow & dhol',
    art: '/assets/img/rm-03-events.webp'
  },
  {
    slug: 'toran-mehndi-sage',
    url: 'https://toran.ink/sample/mehndi/sage',
    name: 'Mehndi Night (Sage Flora)',
    cat: 'Floral',
    badge: 'Henna Green',
    desc: 'Lush henna green botanical invitation for an intimate ladies Mehndi afternoon with folk songs and high-tea.',
    eyebrow: 'Ceremony invite · Henna art & ladies sangeet',
    art: '/assets/img/rm-05-rsvp.webp'
  },
  {
    slug: 'toran-mehndi-ochre',
    url: 'https://toran.ink/sample/mehndi/ochre',
    name: 'Mehndi Night (Marigold Festive)',
    cat: 'Hindu',
    badge: 'Marigold Mehndi',
    desc: 'Vibrant marigold-decorated courtyard theme for evening henna festivities, live bangle stalls, and street food stalls.',
    eyebrow: 'Ceremony invite · Traditional marigold & henna',
    art: '/assets/img/rm-01-opening.webp'
  },
  {
    slug: 'toran-sangeet-indigo',
    url: 'https://toran.ink/sample/sangeet/indigo',
    name: 'Sangeet Musical Night (Indigo)',
    cat: 'Modern',
    badge: 'DJ Sangeet',
    desc: 'Starry indigo night sky backdrop for dance performances schedule, DJ musical sets, and celebration itinerary.',
    eyebrow: 'Ceremony invite · High-energy DJ sangeet night',
    art: '/assets/img/capela-cover.webp'
  },
  {
    slug: 'toran-sangeet-amethyst',
    url: 'https://toran.ink/sample/sangeet/amethyst',
    name: 'Sangeet Musical Night (Amethyst)',
    cat: 'Royal',
    badge: 'Violet Sangeet',
    desc: 'Deep purple velvet aesthetic with sparkling lights, cocktail bar timings, and family dance competition line-up.',
    eyebrow: 'Ceremony invite · Glamorous evening dance soirée',
    art: '/assets/img/pichola-cover.webp'
  },
  {
    slug: 'toran-reception-indigo',
    url: 'https://toran.ink/sample/reception/indigo',
    name: 'Grand Wedding Reception (Indigo)',
    cat: 'Modern',
    badge: 'Formal Reception',
    desc: 'Sophisticated navy formal wedding banquet invitation for grand city receptions, dinner timings, and calendar sync.',
    eyebrow: 'Ceremony invite · Formal evening reception banquet',
    art: '/assets/img/noor-cover.webp'
  },
  {
    slug: 'toran-reception-amethyst',
    url: 'https://toran.ink/sample/reception/amethyst',
    name: 'Grand Wedding Reception (Amethyst)',
    cat: 'Royal',
    badge: 'Royal Banquet',
    desc: 'Luxurious violet and gold ballroom invitation for post-wedding cocktail dinner with Google Maps navigation.',
    eyebrow: 'Ceremony invite · Royal cocktail & reception banquet',
    art: '/assets/img/rm-04-itinerary.webp'
  },
  {
    slug: 'toran-mundan',
    url: 'https://toran.ink/sample/mundan/ochre',
    name: 'Mundan Sanskar Ceremony',
    cat: 'Hindu',
    badge: 'Mundan Sanskar',
    desc: 'Auspicious invitation for baby\'s first tonsure ceremony at the sacred family temple with puja timing and feast details.',
    eyebrow: 'Auspicious occasion · Sacred temple tonsure puja',
    art: '/assets/img/rm-02-countdown.webp'
  },
  {
    slug: 'toran-griha-pravesh',
    url: 'https://toran.ink/sample/griha-pravesh/kumkum',
    name: 'Griha Pravesh & Vastu Puja',
    cat: 'Hindu',
    badge: 'Griha Pravesh',
    desc: 'Sacred Vastu Shanti and new home Griha Pravesh invitation with auspicious muhurat, address directions, and lunch feast.',
    eyebrow: 'Auspicious occasion · Home blessing & vastu puja',
    art: '/assets/img/kolam-cover.webp'
  },
  {
    slug: 'toran-naamkaran',
    url: 'https://toran.ink/sample/naamkaran/sage',
    name: 'Naamkaran Naming Ceremony',
    cat: 'Floral',
    badge: 'Baby Naming',
    desc: 'Welcoming the newborn into the world with family blessings, traditional cradle ceremony, and auspicious naming announcement.',
    eyebrow: 'Auspicious occasion · Cradle ceremony & baby naming',
    art: '/assets/img/rm-05-rsvp.webp'
  },
  {
    slug: 'toran-godh-bharai',
    url: 'https://toran.ink/sample/godh-bharai/sage',
    name: 'Godh Bharai / Baby Shower',
    cat: 'Floral',
    badge: 'Baby Shower',
    desc: 'Heartwarming traditional Indian baby shower invitation celebrating the mother-to-be with love, laughter, and blessings.',
    eyebrow: 'Auspicious occasion · Traditional Indian baby shower',
    art: '/assets/img/rm-01-opening.webp'
  }
];

function fetchRawHtml(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve(data));
    }).on('error', e => resolve(''));
  });
}

const baseTemplateHtml = fs.readFileSync(path.join(rootDir, 'templates', 'rangmahal', 'index.html'), 'utf8');

function cleanAndTransformDemoHtml(rawHtml, t) {
  let html = rawHtml;

  // 1. Inject base href so all Toran css, fonts, js, and images load directly
  if (!html.includes('<base')) {
    html = html.replace('<head>', '<head>\n<base href="https://toran.ink/">');
  }

  // 2. USER STRICT REQUIREMENT: Remove the top bar completely!
  // (<div class="samplebar"> ... </div>)
  html = html.replace(/<div class="samplebar">[\s\S]*?<\/div>/gi, '');
  html = html.replace(/<div class=["']samplebar["']>[\s\S]*?<\/div>/gi, '');

  // Add strong CSS rule to permanently hide any samplebar artifact
  const hideBarCss = `
<style>
  .samplebar, [class*="samplebar"], .samplebar__home, .samplebar__tag, .samplebar__text, .samplebar__links, .samplebar__cta {
    display: none !important;
    height: 0 !important;
    max-height: 0 !important;
    overflow: hidden !important;
    visibility: hidden !important;
    pointer-events: none !important;
  }
  body[data-sample] {
    padding-top: 0 !important;
  }
</style>
`;
  html = html.replace('</head>', hideBarCss + '\n</head>');

  // 3. Remove cloudflare tracking scripts
  html = html.replace(/<script[^>]+cloudflareinsights[^>]*>[\s\S]*?<\/script>/gi, '');

  // 4. Update title and favicon
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${t.name} | Fenil Digital Marketing</title>`);
  html = html.replace(/<link[^>]+rel=["']icon["'][^>]*>/gi, '');
  html = html.replace('</head>', '<link rel="icon" href="/favicon.svg" type="image/svg+xml">\n</head>');

  // 5. Inject Fenil Digital Marketing Sticky WhatsApp Button
  const fdmSticky = `
<!-- Fenil Digital Marketing Sticky WhatsApp Button -->
<div style="position:fixed;bottom:24px;right:24px;z-index:9999999;">
  <a href="https://wa.me/918200095497?text=Hi%20Fenil%20Digital%20Marketing!%20I%20want%20to%20order%20the%20${encodeURIComponent(t.name)}%20wedding%20invitation%20website" target="_blank" rel="noopener" style="display:flex;align-items:center;gap:10px;background:#25D366;color:#fff;padding:12px 20px;border-radius:999px;text-decoration:none;font-weight:700;font-size:0.95rem;box-shadow:0 8px 25px rgba(37,211,102,0.5);border:2px solid #fff;font-family:system-ui,-apple-system,sans-serif;">
    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2z"/></svg>
    <span>Order on WhatsApp: 8200095497</span>
  </a>
</div>
`;
  if (html.includes('</body>')) {
    html = html.replace('</body>', fdmSticky + '\n</body>');
  } else {
    html += fdmSticky;
  }

  return html;
}

function generateTemplatePageHtml(t) {
  let html = baseTemplateHtml;

  // Title & Metadata
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${t.name} — Luxury Wedding Website Template | Fenil Digital Marketing</title>`);
  html = html.replace(/<link rel="canonical"[^>]*>/i, `<link rel="canonical" href="http://localhost:3000/templates/${t.slug}/">`);
  html = html.replace(/property="og:url" content="[^"]*"/i, `property="og:url" content="http://localhost:3000/templates/${t.slug}/"`);
  html = html.replace(/property="og:title" content="[^"]*"/i, `property="og:title" content="${t.name} — Luxury Wedding Invite Website"`);
  html = html.replace(/property="og:description" content="[^"]*"/i, `property="og:description" content="${t.desc}"`);
  html = html.replace(/property="og:image" content="[^"]*"/i, `property="og:image" content="${t.art}"`);

  // Eyebrow, Name, Badge
  html = html.replace(/<p class="eyebrow">[^<]*<\/p>/i, `<p class="eyebrow">${t.eyebrow}</p>`);
  html = html.replace(/<h1 class="h1">[^<]*<\/h1>/i, `<h1 class="h1">${t.name}</h1>`);
  html = html.replace(/<span class="badge live">[^<]*<\/span>/i, `<span class="badge live">${t.badge} · ₹1,499</span>`);

  // Description
  html = html.replace(/<p class="lead">[\s\S]*?<\/p>/i, `<p class="lead">${t.desc}</p>`);

  // Buttons & Links
  html = html.replace(/href="\/demos\/[^"]*"/gi, `href="/demos/${t.slug}/"`);
  html = html.replace(/src="\/demos\/[^"]*"/gi, `src="/demos/${t.slug}/"`);
  html = html.replace(/title="Interactive live demo of the [^"]* template"/gi, `title="Interactive live demo of the ${t.name} template"`);
  html = html.replace(/src="\/assets\/img\/rm-01-opening\.webp"/gi, `src="${t.art}"`);

  // Update hidden template slug inputs
  html = html.replace(/value="rangmahal"/gi, `value="${t.slug}"`);
  html = html.replace(/data-tmpl="[^"]*"/gi, `data-tmpl="${t.slug}"`);
  html = html.replace(/name="template" value="[^"]*"/gi, `name="template" value="${t.name}"`);

  return html;
}

async function run() {
  console.log(`=== Processing all ${TORAN_TEMPLATES.length} Toran templates ===`);

  for (const t of TORAN_TEMPLATES) {
    console.log(`Fetching ${t.name} from ${t.url} ...`);
    const raw = await fetchRawHtml(t.url);
    if (!raw || raw.length < 500) {
      console.error(`Failed to fetch ${t.url}`);
      continue;
    }

    const demoHtml = cleanAndTransformDemoHtml(raw, t);

    // 1. Demos
    const demoDir = path.join(rootDir, 'demos', t.slug);
    if (!fs.existsSync(demoDir)) fs.mkdirSync(demoDir, { recursive: true });
    fs.writeFileSync(path.join(demoDir, 'index.html'), demoHtml, 'utf8');

    // 2. Pages/wedding
    const pwDir = path.join(rootDir, 'pages', 'wedding', t.slug);
    if (!fs.existsSync(pwDir)) fs.mkdirSync(pwDir, { recursive: true });
    fs.writeFileSync(path.join(pwDir, 'index.html'), demoHtml, 'utf8');

    // 3. Templates page
    const tmplDir = path.join(rootDir, 'templates', t.slug);
    if (!fs.existsSync(tmplDir)) fs.mkdirSync(tmplDir, { recursive: true });
    const tmplHtml = generateTemplatePageHtml(t);
    fs.writeFileSync(path.join(tmplDir, 'index.html'), tmplHtml, 'utf8');

    console.log(`✅ Saved: /templates/${t.slug}/ & /demos/${t.slug}/ (banner removed)`);
  }

  console.log('\n=== Step 2: Updating index.html with all templates ===');
  // Load existing cards from build_wedvo_master_catalog.js
  // Let's read index.html and append the 24 new cards
  let indexHtml = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf8');

  function renderStoreCard(c) {
    return `<article class="card" data-cat="${c.cat}"><a class="card-art" href="/templates/${c.slug}/" tabindex="-1" aria-hidden="true"><img src="${c.art}" alt="Preview art for the ${c.name} template" width="432" height="768" loading="lazy" decoding="async"></a><div class="card-body"><span class="badge live">Live · ₹1,499</span><h3>${c.name}</h3><p class="card-cat">${c.eyebrow}</p><div class="card-act"><a class="btn sm" href="/templates/${c.slug}/">View template</a><a class="btn sm ghost" href="/demos/${c.slug}/" target="_blank" rel="noopener"><svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/></svg> Live demo</a></div></div></article>`;
  }

  // Count existing cards + new 24
  const existingCardCount = (indexHtml.match(/<article class="card"/g) || []).length;
  console.log(`Current cards in index.html: ${existingCardCount}`);

  // Insert the new cards right before </div>\n<p class="empty"
  const newCardsHtml = TORAN_TEMPLATES.map(renderStoreCard).join('\n');
  const gridEndIdx = indexHtml.indexOf('</div>\n<p class="empty"');
  if (gridEndIdx !== -1) {
    indexHtml = indexHtml.slice(0, gridEndIdx) + newCardsHtml + '\n' + indexHtml.slice(gridEndIdx);
  }

  // Update total count in headline
  const totalCount = existingCardCount + TORAN_TEMPLATES.length;
  indexHtml = indexHtml.replace(/All \(\d+\)/g, `All (${totalCount})`);
  indexHtml = indexHtml.replace(/\d+ luxury live interactive templates/g, `${totalCount} luxury live interactive templates`);

  fs.writeFileSync(path.join(rootDir, 'index.html'), indexHtml, 'utf8');
  console.log(`Updated index.html: now holds ${totalCount} total templates!`);

  console.log('\n=== Step 3: Run apply user exact changes ===');
  require('./apply_user_exact_changes.js');

  console.log('\n=== Done! All 24 Toran templates added with banner removed and local URLs! ===');
}

run();
