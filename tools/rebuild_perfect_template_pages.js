const fs = require('fs');
const path = require('path');

// Read Rangmahal as the pristine reference layout
const rmFullHtml = fs.readFileSync(path.join(__dirname, 'templates', 'rangmahal', 'index.html'), 'utf8');

const templateConfigs = [
  {
    slug: 'aaravandmeera-mussoorie',
    name: 'Aarav & Meera (Mussoorie)',
    eyebrow: 'Hindu & Mountain Destination · Wax Seal Envelope Gate',
    lede: 'An exquisite wax seal envelope gate opens to reveal Mussoorie mountain trail landscapes, scratch-to-reveal wedding moment, multi-event itineraries, venue maps, and WhatsApp RSVP.',
    demoUrl: '/pages/wedding/aaravandmeera-mussoorie',
    poster: '/demos/aaravandmeera-mussoorie/assets/re-hero-mobile.webp',
    shots: [
      { img: '/demos/aaravandmeera-mussoorie/assets/re-hero-mobile.webp', cap: 'Mussoorie mountain hero greeting with couple names' },
      { img: '/demos/aaravandmeera-mussoorie/assets/re-flap-right.webp', cap: 'Animated envelope flap entrance' },
      { img: '/demos/aaravandmeera-mussoorie/assets/re-rose-seal-cut.webp', cap: 'Handcrafted wax seal emblem' }
    ],
    features: [
      'Wax seal envelope gate that opens with smooth 3D animation',
      'Scratch-to-reveal interactive card for the wedding date',
      'Multi-event mountain trail itinerary with color-coded schedules',
      'One-tap Google Maps navigation for every venue',
      'Direct WhatsApp RSVP delivered straight to your phone',
      'High-resolution photo story gallery with background music'
    ]
  },
  {
    slug: 'aaravandmeera-udaipur',
    name: 'Aarav & Meera (Udaipur)',
    eyebrow: 'Hindu & Royal Palace · Udaipur Lake Gate Entrance',
    lede: 'Carved palace gates open onto Udaipur’s royal lakeside at dusk, featuring royal architecture, event timelines, countdown clock, pre-wedding gallery, and WhatsApp confirmation.',
    demoUrl: '/pages/wedding/aaravandmeera-udaipur',
    poster: '/demos/aaravandmeera-udaipur/assets/pg-palace-blur.webp',
    shots: [
      { img: '/demos/aaravandmeera-udaipur/assets/pg-palace-blur.webp', cap: 'Udaipur royal lake palace entrance' },
      { img: '/demos/aaravandmeera-udaipur/assets/pg-door.webp', cap: 'Carved palace gate doors' },
      { img: '/demos/aaravandmeera-udaipur/assets/pg-frame.webp', cap: 'Traditional architectural royal frame' }
    ],
    features: [
      'Royal Udaipur palace gates that swing open as guests scroll',
      'Lakeside dusk aesthetic with marigold floral animations',
      'Comprehensive ceremony guides for Haldi, Mehendi, Sangeet & Reception',
      'Interactive venue directions with one-touch Google Maps',
      'Seamless WhatsApp RSVP with guest count options',
      'Live ticking countdown clock for the auspicious ceremony'
    ]
  },
  {
    slug: 'vihaanandmeera',
    name: 'Vihaan & Meera',
    eyebrow: 'Contemporary & Minimal · Modern Elegance',
    lede: 'Sophisticated modern luxury wedding invitation featuring editorial typography, love story highlights, ceremony schedule cards, venue maps, and instant guest RSVP.',
    demoUrl: '/pages/wedding/vihaanandmeera',
    poster: '/demos/vihaanandmeera/assets/wedding-nikhilandrinki-hero.jpg',
    shots: [
      { img: '/demos/vihaanandmeera/assets/wedding-nikhilandrinki-hero.jpg', cap: 'Editorial pre-wedding portrait cover' },
      { img: '/demos/vihaanandmeera/assets/wedding-nikhilandrinki-g1.jpg', cap: 'Clean ceremony itinerary cards' },
      { img: '/demos/vihaanandmeera/assets/wedding-nikhilandrinki-s2.jpg', cap: 'Curated couple story gallery' }
    ],
    features: [
      'Clean editorial luxury typography designed for modern couples',
      'Smooth scroll reveals with elder-friendly high readability',
      'Interactive Haldi, Sangeet, and Wedding schedule cards',
      'Direct venue location links with Google Maps support',
      'One-touch WhatsApp RSVP confirmation',
      'Photo gallery optimized for mobile and desktop screens'
    ]
  },
  {
    slug: 'kabirandananya',
    name: 'Kabir & Ananya',
    eyebrow: 'Grand Royal & Luxury · Regal Heritage',
    lede: 'Grand imperial royal wedding invitation rich in royal maroons and gold filigree, multi-event ceremony details, high-definition photo gallery, and WhatsApp confirmation.',
    demoUrl: '/pages/wedding/kabirandananya',
    poster: '/demos/kabirandananya/assets/wedding-nikhilandrinki-hero.jpg',
    shots: [
      { img: '/demos/kabirandananya/assets/wedding-nikhilandrinki-hero.jpg', cap: 'Regal couple portrait hero' },
      { img: '/demos/kabirandananya/assets/wedding-nikhilandrinki-g2.jpg', cap: 'Rich royal celebration schedule' },
      { img: '/demos/kabirandananya/assets/wedding-nikhilandrinki-e1.jpg', cap: 'Traditional blessing and ceremony guide' }
    ],
    features: [
      'Regal heritage color palette with gold filigree ornaments',
      'Multi-day ritual timelines covering all pre-wedding celebrations',
      'Venue mapping with direct GPS links for traveling guests',
      'Live wedding countdown clock ticking down to the big moment',
      'Instant RSVP sent directly to bride and groom’s WhatsApp',
      'High-speed mobile optimization with zero loading lag'
    ]
  },
  {
    slug: 'aaravandshreya',
    name: 'Aarav & Shreya',
    eyebrow: 'Botanical & Floral Garden · Romantic Pastel',
    lede: 'Delicate pastel floral garden aesthetic with romantic illustrations, couple cards, ritual schedules, interactive venue navigation, and one-tap WhatsApp RSVP.',
    demoUrl: '/pages/wedding/aaravandshreya',
    poster: '/demos/aaravandshreya/assets/wedding-nikhilandrinki-hero.jpg',
    shots: [
      { img: '/demos/aaravandshreya/assets/wedding-nikhilandrinki-hero.jpg', cap: 'Romantic floral pre-wedding cover' },
      { img: '/demos/aaravandshreya/assets/wedding-nikhilandrinki-g3.jpg', cap: 'Pastel botanical event cards' },
      { img: '/demos/aaravandshreya/assets/wedding-nikhilandrinki-s1.jpg', cap: 'Couple portraits and love story' }
    ],
    features: [
      'Soft pastel watercolor floral borders and romantic styling',
      'Interactive countdown timer with live days, hours, and minutes',
      'Individual event cards for Mehendi, Cocktail, Sangeet & Pheras',
      'Google Maps directions for each specific celebration hall',
      'Instant WhatsApp RSVP without requiring app installation',
      'Smooth background music player with romantic wedding melodies'
    ]
  },
  {
    slug: 'nikhilandrinki',
    name: 'Nikhil & Rinki',
    eyebrow: 'Festive & Traditional Heritage · Vibrant Indian Culture',
    lede: 'Vibrant traditional celebration featuring cultural ritual guides, family invitation messages, venue directions, ceremony schedules, and direct WhatsApp RSVP.',
    demoUrl: '/pages/wedding/nikhilandrinki',
    poster: '/demos/nikhilandrinki/assets/wedding-nikhilandrinki-hero.jpg',
    shots: [
      { img: '/demos/nikhilandrinki/assets/wedding-nikhilandrinki-hero.jpg', cap: 'Festive celebration couple portrait' },
      { img: '/demos/nikhilandrinki/assets/wedding-nikhilandrinki-g4.jpg', cap: 'Traditional ceremony ritual guide' },
      { img: '/demos/nikhilandrinki/assets/wedding-nikhilandrinki-s2.jpg', cap: 'Family memories and celebrations gallery' }
    ],
    features: [
      'Vibrant festive Indian colors reflecting rich cultural heritage',
      'Complete guide to all wedding ceremonies and dress codes',
      'Direct venue navigation with Google Maps integration',
      'Live countdown clock building excitement for family and friends',
      'One-tap RSVP sent straight to your personal WhatsApp',
      'Designed for all generations: large fonts and easy taps for elders'
    ]
  }
];

function buildTemplatePage(cfg) {
  let html = rmFullHtml;

  // Replace title & description
  html = html.replace(/<title>.*?<\/title>/i, `<title>${cfg.name}: Luxury Wedding Invitation Website | Fenil Digital Marketing</title>`);
  html = html.replace(/<meta name="description" content=".*?">/i, `<meta name="description" content="${cfg.lede} From ₹1,499. Designed by Fenil Digital Marketing (Founder: Fenil Limbachiya).">`);
  html = html.replace(/<link rel="canonical" href=".*?">/i, `<link rel="canonical" href="http://localhost:3000/templates/${cfg.slug}/">`);

  // Section 1: Phone art & poster
  html = html.replace(/<div class="tp-art">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/i, `<div class="tp-art"><div class="phone"><div class="ph-screen"><img class="ph-poster" src="${cfg.poster}" alt="${cfg.name} invite on phone" width="432" height="934" fetchpriority="high"></div><span class="ph-notch"></span></div></div>`);

  // Section 1: Breadcrumb & info
  html = html.replace(/<nav class="crumbs" aria-label="Breadcrumb">[\s\S]*?<\/nav>/i, `<nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a> / <a href="/#templates">Templates</a> / <span>${cfg.name}</span></nav>`);
  html = html.replace(/<p class="eyebrow">.*?<\/p>/i, `<p class="eyebrow">${cfg.eyebrow}</p>`);
  html = html.replace(/<h1 class="tp-h">.*?<\/h1>/i, `<h1 class="tp-h">${cfg.name}</h1>`);
  html = html.replace(/<p class="lede">.*?<\/p>/i, `<p class="lede">${cfg.lede}</p>`);

  // Live demo button
  html = html.replace(/<a class="demo-link" href=".*?"/i, `<a class="demo-link" href="${cfg.demoUrl}"`);

  // Form details
  html = html.replace(/data-template=".*?"/i, `data-template="${cfg.slug}"`);
  html = html.replace(/data-name=".*?"/i, `data-name="${cfg.name}"`);
  html = html.replace(/data-price=".*?"/i, `data-price="1499"`);
  html = html.replace(/data-addon=".*?"/i, `data-addon="999"`);
  html = html.replace(/<span class="price-n" id="price-n">.*?<\/span>/i, `<span class="price-n" id="price-n">₹1,499</span>`);
  html = html.replace(/<b>Done-for-you setup \+.*?<\/b>/i, `<b>Done-for-you setup +₹999</b>`);
  html = html.replace(/<button class="btn buy-btn" type="submit" id="buy-btn">.*?<\/button>/i, `<button class="btn buy-btn" type="submit" id="buy-btn">Buy ${cfg.name} · <span id="buy-amt">₹1,499</span></button>`);

  // Section 2: Shots
  const shotsHtml = `<div class="shots">${cfg.shots.map(s => `
  <figure class="shot"><a href="${s.img}" target="_blank" rel="noopener"><img src="${s.img}" alt="${s.cap}" width="390" height="844" loading="lazy" decoding="async"></a><figcaption>${s.cap}</figcaption></figure>
  `).join('')}</div>`;
  html = html.replace(/<div class="shots">[\s\S]*?<\/div>/i, shotsHtml);

  // Section 3: What's in template
  html = html.replace(/<h2 class="h3">What’s in.*?<\/h2>/i, `<h2 class="h3">What’s in ${cfg.name}</h2>`);
  const ticksHtml = `<ul class="ticks">${cfg.features.map(f => `
  <li><svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg><span>${f}</span></li>
  `).join('')}</ul>`;
  html = html.replace(/<ul class="ticks">[\s\S]*?<\/ul>/i, ticksHtml);

  // Section 4: Final CTA
  html = html.replace(/<section class="final small">[\s\S]*?<\/section>/i, `<section class="final small"><div class="final-in"><h2>Ready to create your invitation?</h2><div class="cta-row c"><a class="btn light" href="#buy">Buy ${cfg.name} · ₹1,499</a><a class="btn ghost light" href="${cfg.demoUrl}" target="_blank" rel="noopener">Open live demo</a></div></div></section>`);

  return html;
}

console.log('Generating exact matching template pages for all 6 new templates...');
for (const cfg of templateConfigs) {
  const destDir = path.join(__dirname, 'templates', cfg.slug);
  if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
  const html = buildTemplatePage(cfg);
  fs.writeFileSync(path.join(destDir, 'index.html'), html, 'utf8');
  console.log(`Generated templates/${cfg.slug}/index.html with pristine phone mockup layout (${html.length} bytes)`);
}

console.log('\nAll 6 template pages now match the exact layout of Rangmahal and above templates!');
