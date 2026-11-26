const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');

// 1. Slugs to clean up (added earlier today that user asked to remove)
const SLUGS_TO_REMOVE = [
  'afternoon-nikah',
  'anand-utsav',
  'bordeaux',
  'chandrika-utsav',
  'gulmohar-reverie',
  'himadri',
  'lifafa',
  'midnight',
  'shahi',
  'sheesh-mahal',
  'velvet',
  'royal-rajputana'
];

console.log('=== Step 1: Cleaning up earlier today templates ===');
SLUGS_TO_REMOVE.forEach(slug => {
  ['templates', 'demos', 'pages/wedding'].forEach(base => {
    const dir = path.join(rootDir, base, slug);
    if (fs.existsSync(dir)) {
      fs.rmSync(dir, { recursive: true, force: true });
      console.log(`Removed ${base}/${slug}`);
    }
  });
});

// 2. The 12 Original / Vishakha Templates to KEEP (from yesterday)
const KEPT_12_TEMPLATES = [
  {
    slug: 'rangmahal',
    name: 'Rangmahal',
    cat: 'Hindu',
    badge: 'Royal Palace',
    desc: 'Carved palace doors swing open to reveal your names, four colour-coded events, photo gallery, WhatsApp RSVP and a live countdown under a dusk sky.',
    art: '/assets/img/rm-01-opening.webp',
    eyebrow: 'Hindu wedding · Rajasthani palace'
  },
  {
    slug: 'phulkari',
    name: 'Phulkari',
    cat: 'Sikh',
    badge: 'Anand Karaj',
    desc: 'An embroidered phulkari veil lifts at dawn to reveal Anand Karaj rituals, Sikh hymns, venue directions, and seamless family WhatsApp RSVP.',
    art: '/assets/img/phulkari-cover.webp',
    eyebrow: 'Sikh wedding · Punjabi heritage'
  },
  {
    slug: 'kolam',
    name: 'Kolam',
    cat: 'South Indian',
    badge: 'Classical Tradition',
    desc: 'A sacred rice-flour kolam draws itself as an oil lamp lights, featuring traditional nadaswaram melodies, Muhurtham timing, and temple maps.',
    art: '/assets/img/kolam-cover.webp',
    eyebrow: 'South Indian · Tamil & Telugu tradition'
  },
  {
    slug: 'noor',
    name: 'Noor',
    cat: 'Muslim',
    badge: 'Nikah Grace',
    desc: 'A hand-carved marble jaali screen slides open under the crescent moon, celebrating your Nikah with Ayat blessings, banquet details, and RSVP.',
    art: '/assets/img/noor-cover.webp',
    eyebrow: 'Muslim wedding · Nikah elegance'
  },
  {
    slug: 'capela',
    name: 'Capela',
    cat: 'Christian',
    badge: 'Church & Chapel',
    desc: 'Arched Goan chapel doors open with gentle chiming bells and falling lilies, guiding guests to Holy Mass and evening cocktail reception.',
    art: '/assets/img/capela-cover.webp',
    eyebrow: 'Christian wedding · Chapel bells'
  },
  {
    slug: 'pichola',
    name: 'Pichola',
    cat: 'Hindu',
    badge: 'Lake Palace',
    desc: 'Gentle ripples across Lake Pichola part to reveal an Udaipur palace floating under lanterns, with sitar melodies, itinerary, and RSVP.',
    art: '/assets/img/pichola-cover.webp',
    eyebrow: 'Destination wedding · Udaipur lake palace'
  },
  {
    slug: 'aaravandmeera-mussoorie',
    name: 'Aarav & Meera (Mussoorie)',
    cat: 'Destination',
    badge: 'Hills & Pine',
    desc: 'Lush misty pines and golden mountain sunset welcoming your guests to a magical Mussoorie destination wedding with pre-wedding film and map navigation.',
    art: '/assets/img/rm-02-countdown.webp',
    eyebrow: 'Destination wedding · Himalayan retreat'
  },
  {
    slug: 'aaravandmeera-udaipur',
    name: 'Aarav & Meera (Udaipur)',
    cat: 'Hindu',
    badge: 'Udaipur Royalty',
    desc: 'Grand royal heritage celebrating love amidst majestic marble courtyards, illuminated jharokhas, royal banquet details, and WhatsApp RSVP.',
    art: '/assets/img/rm-03-events.webp',
    eyebrow: 'Royal Indian wedding · Lakeside heritage'
  },
  {
    slug: 'vihaanandmeera',
    name: 'Vihaan & Meera',
    cat: 'Hindu',
    badge: 'Palace Romance',
    desc: 'Intimate royal celebration with delicate gold marigold motifs, classical shehnai notes, personalized dress codes, and family accommodations.',
    art: '/assets/img/rm-04-itinerary.webp',
    eyebrow: 'Heritage wedding · Marigold & gold zari'
  },
  {
    slug: 'kabirandananya',
    name: 'Kabir & Ananya',
    cat: 'Modern',
    badge: 'Contemporary Luxe',
    desc: 'Ultra-modern pastel romance featuring sleek serif typography, interactive photo albums, ambient background lounge music, and calendar sync.',
    art: '/assets/img/rm-05-rsvp.webp',
    eyebrow: 'Modern luxury wedding · Pastel elegance'
  },
  {
    slug: 'aaravandshreya',
    name: 'Aarav & Shreya',
    cat: 'Floral',
    badge: 'Blush & Flora',
    desc: 'Cascading floral arches and watercolor botanicals creating a dreamy fairytale aesthetic for modern couples with easy one-tap guest RSVP.',
    art: '/assets/img/rm-01-opening.webp',
    eyebrow: 'Floral fairytale wedding · Watercolor blush'
  },
  {
    slug: 'nikhilandrinki',
    name: 'Nikhil & Rinki',
    cat: 'Floral',
    badge: 'Heritage Festive',
    desc: 'Rich Indian heritage festive theme with vibrant ritual celebrations, high-res pre-wedding gallery, dress codes, Google Maps navigation, and WhatsApp RSVP.',
    art: '/assets/img/rm-03-events.webp',
    eyebrow: 'Festive Indian wedding · Heritage floral'
  }
];

// 3. The 32 NEW Wedvo Templates
const WEDVO_TEMPLATES = [
  {
    slug: 'wedding-journey',
    name: 'Our Wedding Journey',
    cat: 'Journey',
    badge: 'Love Timeline',
    desc: 'An interactive love story timeline with milestones, couple photos, video highlights, venue maps, and instant WhatsApp RSVP.',
    eyebrow: 'Interactive love story · Timeline & highlights'
  },
  {
    slug: 'palace-envelope-hindu',
    name: 'Palace Envelope Hindu',
    cat: 'Hindu',
    badge: 'Royal Wax Seal',
    desc: 'A 3D gold-embossed royal palace envelope that unseals with traditional Vedic mantras, auspicious shlokas, and ceremony details.',
    eyebrow: 'Hindu wedding · 3D wax seal envelope'
  },
  {
    slug: 'rajwada',
    name: 'Rajwada Darbar',
    cat: 'Hindu',
    badge: 'Rajasthani Heritage',
    desc: 'Step into the majestic darbar of Rajasthan with ornate archways, regal trumpets, royal banquet cards, and Google Maps venue pins.',
    eyebrow: 'Rajasthani royal palace · Heritage darbar'
  },
  {
    slug: 'royal-envelope',
    name: 'Royal Wax Seal Envelope',
    cat: 'Royal',
    badge: '3D Gold Foil',
    desc: 'Unfold an opulent burgundy and gold envelope with a glistening wax seal, revealing your wedding invitation in smooth 60 FPS motion.',
    eyebrow: 'Royal invitation · 3D animated wax seal'
  },
  {
    slug: 'ram-mandir',
    name: 'Ram Mandir Vivah',
    cat: 'Hindu',
    badge: 'Divine Vivah',
    desc: 'Sacred temple architecture inspired by Ayodhya with gentle ringing bells, Vedic chanting, diya lighting animations, and ritual itinerary.',
    eyebrow: 'Divine temple wedding · Ayodhya mandir'
  },
  {
    slug: 'palace-door',
    name: 'Palace Gates Entrance',
    cat: 'Royal',
    badge: 'Carved Gates',
    desc: 'Massive hand-carved teak palace gates swing open to the sound of royal shehnai, revealing your names and multi-day celebrations.',
    eyebrow: 'Royal fort entrance · Carved palace gates'
  },
  {
    slug: 'mangal-mandap',
    name: 'Mangal Mandap',
    cat: 'Hindu',
    badge: 'Saat Phere',
    desc: 'A sacred floral mandap glowing under the night stars, guiding guests through Haldi, Mehendi, Sangeet, and the sacred Saat Phere.',
    eyebrow: 'Vedic wedding · Floral mandap & pheras'
  },
  {
    slug: 'ivory-lace',
    name: 'Ivory & Gold Lace',
    cat: 'Modern',
    badge: 'Embossed Lace',
    desc: 'Delicate laser-cut ivory lace with raised gold typography, bespoke monogram seal, dress code guide, and one-click WhatsApp RSVP.',
    eyebrow: 'Modern luxury · Laser-cut ivory lace'
  },
  {
    slug: 'royal-entrance',
    name: 'Royal Heritage Entrance',
    cat: 'Royal',
    badge: 'Grand Courtyard',
    desc: 'Lit lanterns line a majestic palace courtyard with traditional welcome music, ceremony schedule, photo galleries, and guest RSVP.',
    eyebrow: 'Royal courtyard · Lanterns & heritage'
  },
  {
    slug: 'blush-theme',
    name: 'Blush Peony Theme',
    cat: 'Floral',
    badge: 'Pastel Floral',
    desc: 'Dreamy English garden aesthetics with blushing peonies, soft calligraphy, countdown timer, romantic background music, and RSVP.',
    eyebrow: 'Romantic wedding · Blush peonies & pastels'
  },
  {
    slug: 'rose-seal',
    name: 'Rose Wax Seal',
    cat: 'Floral',
    badge: 'Botanical Wax',
    desc: 'Pressed botanicals and a delicate rose gold wax seal opening to an elegant multi-event celebration with RSVP and Google Maps.',
    eyebrow: 'Botanical luxury · Rose wax seal'
  },
  {
    slug: 'sage-garden',
    name: 'Sage Garden & Olive',
    cat: 'Floral',
    badge: 'Eucalyptus & Sage',
    desc: 'Earthy sage green, delicate eucalyptus leaves, and metallic gold accents for modern organic, outdoor, and vineyard weddings.',
    eyebrow: 'Outdoor garden wedding · Sage & eucalyptus'
  },
  {
    slug: 'haveli-utsav',
    name: 'Haveli Utsav',
    cat: 'Hindu',
    badge: 'Heritage Haveli',
    desc: 'Traditional Marigold garlands, courtyards of Jodhpur, auspicious kalash motifs, and vibrant celebrations of love and togetherness.',
    eyebrow: 'Traditional haveli · Marigold & shehnai'
  },
  {
    slug: 'royal-maroon',
    name: 'Royal Maroon Vivah',
    cat: 'Hindu',
    badge: 'Sindoor & Velvet',
    desc: 'Regal maroon velvet embroidered with golden zari threads, shubh vivah shlokas, royal elephant procession, and WhatsApp RSVP.',
    eyebrow: 'Imperial wedding · Royal maroon & gold zari'
  },
  {
    slug: 'palace-envelope',
    name: 'Palace Envelope Luxury',
    cat: 'Royal',
    badge: 'Gold Leaf Flap',
    desc: 'A heavy textured palace envelope opening with golden light to reveal the couple\'s monogram, family details, and event schedule.',
    eyebrow: 'Luxury stationery · 3D palace envelope'
  },
  {
    slug: 'shwet-kamal',
    name: 'Shwet Kamal',
    cat: 'Hindu',
    badge: 'White Lotus',
    desc: 'Serene sacred white lotuses floating on calm waters, adorned with auspicious Sanskrit mantras and divine wedding rituals.',
    eyebrow: 'Sacred Hindu wedding · White lotus & mantras'
  },
  {
    slug: 'swarna-pothi',
    name: 'Swarna Pothi Patrika',
    cat: 'Hindu',
    badge: 'Vedic Patrika',
    desc: 'Traditional gold-inscribed Vedic lagna patrika with ancestral blessings, horoscope muhurtham timings, and venue navigation.',
    eyebrow: 'Traditional patrika · Gilded scriptures'
  },
  {
    slug: 'grace-chapel',
    name: 'Grace Chapel',
    cat: 'Christian',
    badge: 'Cathedral Bells',
    desc: 'Stained-glass sunlight illuminating church aisles, pipe organ melody, exchange of holy vows, and evening ballroom reception.',
    eyebrow: 'Christian wedding · Cathedral bells & vows'
  },
  {
    slug: 'emerald-vow',
    name: 'Emerald Botanical Vows',
    cat: 'Christian',
    badge: 'Emerald Luxe',
    desc: 'Deep emerald velvet, white roses, gold script, and romantic strings creating an unforgettable wedding celebration.',
    eyebrow: 'Luxury vows · Deep emerald & white roses'
  },
  {
    slug: 'phulkari-courtyard',
    name: 'Phulkari Courtyard',
    cat: 'Sikh',
    badge: 'Dhol & Sangeet',
    desc: 'Vibrant Punjabi folk motifs, dhol beats, Anand Karaj timings, langar details, and heartfelt WhatsApp RSVP for family and friends.',
    eyebrow: 'Punjabi wedding · Phulkari & sangeet'
  },
  {
    slug: 'anand-karaj',
    name: 'Anand Karaj Vivah',
    cat: 'Sikh',
    badge: 'Four Laavan',
    desc: 'Gurdwara sahib dome under golden skies, Gurbani Kirtan, the sacred Four Laavan, and warm hospitality for your revered guests.',
    eyebrow: 'Sikh wedding · Sacred Anand Karaj'
  },
  {
    slug: 'sunehri-shaam',
    name: 'Sunehri Shaam',
    cat: 'Sikh',
    badge: 'Golden Twilight',
    desc: 'Warm golden twilight over Punjab fields, royal turban motifs, celebratory Milni ceremony details, and reception dinner itinerary.',
    eyebrow: 'Sikh celebration · Golden twilight & milni'
  },
  {
    slug: 'muslim-heirloom',
    name: 'The Moonlit Heirloom',
    cat: 'Muslim',
    badge: 'Moonlit Jaali',
    desc: 'An antique heirloom jaali screen under the silver crescent moon, blessing the Nikah ceremony with Quranic Ayat and royal feast cards.',
    eyebrow: 'Muslim Nikah · Moonlit heirloom jaali'
  },
  {
    slug: 'burgundy-letter',
    name: 'The Burgundy Letter',
    cat: 'Muslim',
    badge: 'Wax Sealed Letter',
    desc: 'A luxury burgundy envelope with gold leaf calligraphy and wax stamp, unwrapping to announce your Nikah and Walima banquet.',
    eyebrow: 'Royal Nikah · Burgundy wax sealed letter'
  },
  {
    slug: 'blossom-oud',
    name: 'Blossom & Oud',
    cat: 'Muslim',
    badge: 'Emerald & Rose',
    desc: 'Emerald green arches adorned with fragrant Arabian roses, rich oud incense motifs, Nikah timings, and guest accommodations.',
    eyebrow: 'Islamic wedding · Rose, oud & emerald'
  },
  {
    slug: 'noor-mahal',
    name: 'Noor Mahal Nikah',
    cat: 'Muslim',
    badge: 'Marble Jaali',
    desc: 'Pure white Mughal marble with delicate lattice cutouts, soft lantern glow, Qubool Hai moment, and feast celebration details.',
    eyebrow: 'Mughal Nikah · Pure white marble jaali'
  },
  {
    slug: 'sukoon',
    name: 'Sukoon Nikah',
    cat: 'Muslim',
    badge: 'Serene Ivory',
    desc: 'Understated elegance in ivory and gold, geometric Islamic stars, soothing acoustic melodies, and instant WhatsApp family RSVP.',
    eyebrow: 'Minimalist Nikah · Sukoon & ivory elegance'
  },
  {
    slug: 'gulzar',
    name: 'Gulzar Garden',
    cat: 'Floral',
    badge: 'Blooming Roses',
    desc: 'An abundance of red and blush garden roses framing your love story, interactive photo album, countdown timer, and venue directions.',
    eyebrow: 'Floral garden wedding · Blooming roses'
  },
  {
    slug: 'shahi-mahal',
    name: 'Shahi Mahal Darbar',
    cat: 'Royal',
    badge: 'Imperial Arches',
    desc: 'Crystal chandeliers and regal archways of imperial palaces, setting an unforgettable backdrop for your royal celebrations.',
    eyebrow: 'Imperial darbar · Crystal chandeliers'
  },
  {
    slug: 'champagne-lace',
    name: 'Champagne Lace',
    cat: 'Modern',
    badge: 'Champagne Shimmer',
    desc: 'Subtle shimmer of champagne silk and delicate French lace, tailored for black-tie soirees, cocktail nights, and formal weddings.',
    eyebrow: 'Modern black-tie · Champagne silk & lace'
  },
  {
    slug: 'pearl-peony',
    name: 'Pearl Peony',
    cat: 'Floral',
    badge: 'Lustrous Pearl',
    desc: 'Soft ivory pearls and blooming blush peonies paired with modern typography, pre-wedding reel, and venue navigation.',
    eyebrow: 'Romantic luxury · Pearl & peony garden'
  },
  {
    slug: 'gulbahar',
    name: 'Gulbahar Nikah',
    cat: 'Muslim',
    badge: 'Spring Blossom',
    desc: 'Celebration of spring with fresh jasmine, marigold, and rose blooms, announcing the sacred Nikah with joy and grace.',
    eyebrow: 'Spring Nikah · Fresh jasmine & rose blooms'
  }
];

// Add art paths to Wedvo templates
WEDVO_TEMPLATES.forEach(t => {
  t.art = `/assets/img/wedvo/${t.slug}.jpg`;
});

// All 44 Templates in catalog
const ALL_CATALOG = [...KEPT_12_TEMPLATES, ...WEDVO_TEMPLATES];

console.log(`\n=== Step 2: Generating 32 Wedvo Demos and Template Pages ===`);

const baseTemplateHtml = fs.readFileSync(path.join(rootDir, 'templates', 'rangmahal', 'index.html'), 'utf8');

function generateWedvoDemoHtml(t) {
  const dumpFile = path.join(__dirname, 'wedvo_dumps', `${t.slug}.html`);
  if (!fs.existsSync(dumpFile)) {
    console.error(`Dump file missing for ${t.slug}`);
    return '';
  }
  let html = fs.readFileSync(dumpFile, 'utf8');

  // Convert relative /themes/ to absolute https://wedvo.in/themes/
  html = html.replace(/<base[^>]+href=["'](\/themes\/[^"']+)["']/i, '<base href="https://wedvo.in$1">');

  // Remove wedvo ads and analytics scripts
  html = html.replace(/<script[^>]+src=["']\/shared\/[^"']+["'][^>]*><\/script>/gi, '');

  // Update title
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${t.name} | Fenil Digital Marketing</title>`);

  // Ensure favicon
  if (!html.includes('favicon.svg')) {
    html = html.replace('</head>', '<link rel="icon" href="/favicon.svg" type="image/svg+xml">\n</head>');
  }

  // Inject FDM WhatsApp floating badge before </body>
  const fdmBadge = `
<!-- Fenil Digital Marketing Sticky WhatsApp Button -->
<div style="position:fixed;bottom:20px;right:20px;z-index:9999999;">
  <a href="https://wa.me/918200095497?text=Hi%20Fenil%20Digital%20Marketing!%20I%20want%20to%20order%20the%20${encodeURIComponent(t.name)}%20wedding%20invitation%20website" target="_blank" rel="noopener" style="display:flex;align-items:center;gap:10px;background:#25D366;color:#fff;padding:12px 20px;border-radius:999px;text-decoration:none;font-weight:700;font-size:0.95rem;box-shadow:0 8px 25px rgba(37,211,102,0.5);border:2px solid #fff;font-family:system-ui,-apple-system,sans-serif;">
    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2z"/></svg>
    <span>Order on WhatsApp: 8200095497</span>
  </a>
</div>
`;

  if (html.includes('</body>')) {
    html = html.replace('</body>', fdmBadge + '\n</body>');
  } else {
    html += fdmBadge;
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

WEDVO_TEMPLATES.forEach(t => {
  // 1. Demos
  const demoDir = path.join(rootDir, 'demos', t.slug);
  if (!fs.existsSync(demoDir)) fs.mkdirSync(demoDir, { recursive: true });
  const demoHtml = generateWedvoDemoHtml(t);
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

  console.log(`Generated: ${t.slug} (${t.name})`);
});

console.log(`\n=== Step 3: Updating index.html with all ${ALL_CATALOG.length} templates ===`);

function renderStoreCard(c) {
  return `<article class="card" data-cat="${c.cat}"><a class="card-art" href="/templates/${c.slug}/" tabindex="-1" aria-hidden="true"><img src="${c.art}" alt="Preview art for the ${c.name} template" width="432" height="768" loading="lazy" decoding="async"></a><div class="card-body"><span class="badge live">Live · ₹1,499</span><h3>${c.name}</h3><p class="card-cat">${c.eyebrow}</p><div class="card-act"><a class="btn sm" href="/templates/${c.slug}/">View template</a><a class="btn sm ghost" href="/demos/${c.slug}/" target="_blank" rel="noopener"><svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/></svg> Live demo</a></div></div></article>`;
}

let indexHtml = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf8');

const grandSectionHtml = `<section id="templates" class="sec"><div class="in"><p class="eyebrow c">The Master Collection</p><h2 class="h2 c">Choose your wedding invite</h2>
<p class="sub c">${ALL_CATALOG.length} luxury live interactive templates. Every design is mobile-first artwork with direct WhatsApp RSVP.</p>
<div class="chips" role="group" aria-label="Filter templates">
  <button type="button" class="chip on" data-f="All" aria-pressed="true">All (${ALL_CATALOG.length})</button>
  <button type="button" class="chip" data-f="Hindu" aria-pressed="false">Hindu &amp; Royal</button>
  <button type="button" class="chip" data-f="Muslim" aria-pressed="false">Muslim &amp; Nikah</button>
  <button type="button" class="chip" data-f="Sikh" aria-pressed="false">Sikh &amp; Punjabi</button>
  <button type="button" class="chip" data-f="South Indian" aria-pressed="false">South Indian</button>
  <button type="button" class="chip" data-f="Christian" aria-pressed="false">Christian</button>
  <button type="button" class="chip" data-f="Floral" aria-pressed="false">Floral &amp; Modern</button>
  <button type="button" class="chip" data-f="Journey" aria-pressed="false">Love Story &amp; Journey</button>
</div>
<div class="grid">
${ALL_CATALOG.map(renderStoreCard).join('\n')}
</div>
<p class="empty" hidden>No templates in this category yet. Check back soon, or suggest one on WhatsApp.</p>
</div></section>`;

const secStart = indexHtml.indexOf('<section id="templates"');
const secEnd = indexHtml.indexOf('</section>', secStart) + 10;
indexHtml = indexHtml.slice(0, secStart) + grandSectionHtml + indexHtml.slice(secEnd);

fs.writeFileSync(path.join(rootDir, 'index.html'), indexHtml, 'utf8');
console.log(`Updated index.html with all ${ALL_CATALOG.length} cards inside the grid!`);

console.log('\n=== Step 4: Running user exact changes script ===');
require('./apply_user_exact_changes.js');

console.log('\n=== All Wedvo templates integrated, 12 kept, unwanted removed! ===');
