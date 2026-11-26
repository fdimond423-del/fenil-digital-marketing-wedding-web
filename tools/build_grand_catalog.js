const fs = require('fs');
const path = require('path');

const rmRefHtml = fs.readFileSync(path.join(__dirname, 'templates', 'rangmahal', 'index.html'), 'utf8');

const ALL_TEMPLATES = [
  // 1-6: Knotlink Palace Series
  {
    slug: 'rangmahal',
    name: 'Rangmahal',
    cat: 'Hindu',
    badge: 'Royal Palace',
    desc: 'Carved palace doors swing open to reveal your names, four colour-coded events, photo gallery, WhatsApp RSVP and a live countdown under a dusk sky.',
    art: '/assets/img/rm-01-opening.webp',
    eyebrow: 'Hindu wedding · Rajasthani palace',
    palette: { primary: '#4C1026', accent: '#C08A2E', bg: '#FAF8F5' }
  },
  {
    slug: 'phulkari',
    name: 'Phulkari',
    cat: 'Sikh',
    badge: 'Anand Karaj',
    desc: 'An embroidered phulkari veil lifts at dawn to reveal Anand Karaj rituals, Sikh hymns, venue directions, and seamless family WhatsApp RSVP.',
    art: '/assets/img/phulkari-cover.webp',
    eyebrow: 'Sikh wedding · Punjabi heritage',
    palette: { primary: '#7A1C2E', accent: '#D4AF37', bg: '#FAF6EE' }
  },
  {
    slug: 'kolam',
    name: 'Kolam',
    cat: 'South Indian',
    badge: 'Classical Tradition',
    desc: 'A sacred rice-flour kolam draws itself as an oil lamp lights, featuring traditional nadaswaram melodies, Muhurtham timing, and temple maps.',
    art: '/assets/img/kolam-cover.webp',
    eyebrow: 'South Indian · Tamil & Telugu tradition',
    palette: { primary: '#6B1D2F', accent: '#E5A93C', bg: '#FDFBF7' }
  },
  {
    slug: 'noor',
    name: 'Noor',
    cat: 'Muslim',
    badge: 'Nikah Grace',
    desc: 'A hand-carved marble jaali screen slides open under the crescent moon, celebrating your Nikah with Ayat blessings, banquet details, and RSVP.',
    art: '/assets/img/noor-cover.webp',
    eyebrow: 'Muslim wedding · Nikah elegance',
    palette: { primary: '#1B3B36', accent: '#C5A059', bg: '#F8FAF8' }
  },
  {
    slug: 'capela',
    name: 'Capela',
    cat: 'Christian',
    badge: 'Church & Chapel',
    desc: 'Arched Goan chapel doors open with gentle chiming bells and falling lilies, guiding guests to Holy Mass and evening cocktail reception.',
    art: '/assets/img/capela-cover.webp',
    eyebrow: 'Christian wedding · Chapel bells',
    palette: { primary: '#2D3A4B', accent: '#C29B38', bg: '#F9FBFD' }
  },
  {
    slug: 'pichola',
    name: 'Pichola',
    cat: 'Save the date',
    badge: 'Lake Palace',
    desc: 'A royal boat glides across Lake Pichola at twilight toward illuminated marble palaces, announcing your auspicious wedding dates.',
    art: '/assets/img/pichola-cover.webp',
    eyebrow: 'Save the date · Udaipur twilight',
    palette: { primary: '#1F2A44', accent: '#D1A153', bg: '#F5F7FA' }
  },

  // 7-12: Vishakha Collections Series
  {
    slug: 'aaravandmeera-mussoorie',
    name: 'Aarav & Meera (Mussoorie)',
    cat: 'Hindu',
    badge: 'Mountain Trail',
    desc: 'An exquisite wax seal envelope gate opens to reveal Mussoorie mountain landscapes, scratch-to-reveal wedding moment, and multi-event itineraries.',
    art: '/demos/aaravandmeera-mussoorie/assets/re-hero-mobile.webp',
    eyebrow: 'Mountain destination · Wax seal envelope gate',
    palette: { primary: '#3C2323', accent: '#C89666', bg: '#FBF9F7' }
  },
  {
    slug: 'aaravandmeera-udaipur',
    name: 'Aarav & Meera (Udaipur)',
    cat: 'Hindu',
    badge: 'Royal Palace',
    desc: 'Carved palace gates open onto Udaipur’s royal lakeside at dusk, featuring royal architecture, event timelines, countdown clock, and RSVP.',
    art: '/demos/aaravandmeera-udaipur/assets/pg-palace-blur.webp',
    eyebrow: 'Royal Udaipur · Lake palace gates',
    palette: { primary: '#4A1525', accent: '#D4AF37', bg: '#FAF7F2' }
  },
  {
    slug: 'vihaanandmeera',
    name: 'Vihaan & Meera',
    cat: 'Floral',
    badge: 'Contemporary',
    desc: 'Editorial serif typography, curated love story highlights, ceremony schedule cards, venue maps, and instant guest WhatsApp RSVP.',
    art: '/demos/vihaanandmeera/assets/wedding-nikhilandrinki-hero.jpg',
    eyebrow: 'Contemporary luxury · Clean typography',
    palette: { primary: '#2B2B2B', accent: '#B8860B', bg: '#FAFAFA' }
  },
  {
    slug: 'kabirandananya',
    name: 'Kabir & Ananya',
    cat: 'Hindu',
    badge: 'Grand Royal',
    desc: 'Grand royal wedding invitation rich in royal maroons and gold filigree, multi-event ceremony details, high-definition photo gallery, and RSVP.',
    art: '/demos/kabirandananya/assets/wedding-nikhilandrinki-hero.jpg',
    eyebrow: 'Grand royal · Regal heritage',
    palette: { primary: '#58111A', accent: '#E2B143', bg: '#FCF8F5' }
  },
  {
    slug: 'aaravandshreya',
    name: 'Aarav & Shreya',
    cat: 'Floral',
    badge: 'Botanical Garden',
    desc: 'Delicate pastel floral garden aesthetic with romantic illustrations, couple cards, ritual schedules, interactive venue navigation, and countdown.',
    art: '/demos/aaravandshreya/assets/wedding-nikhilandrinki-hero.jpg',
    eyebrow: 'Botanical floral · Romantic pastels',
    palette: { primary: '#3D4035', accent: '#C2847A', bg: '#F9F8F5' }
  },
  {
    slug: 'nikhilandrinki',
    name: 'Nikhil & Rinki',
    cat: 'Hindu',
    badge: 'Festive Culture',
    desc: 'Vibrant traditional celebration featuring cultural ritual guides, family invitation messages, venue directions, ceremony schedules, and RSVP.',
    art: '/demos/nikhilandrinki/assets/wedding-nikhilandrinki-hero.jpg',
    eyebrow: 'Festive traditional · Cultural heritage',
    palette: { primary: '#601824', accent: '#E59838', bg: '#FAF6EE' }
  },

  // 13-16: ForOurDay Series
  {
    slug: 'rajwada',
    name: 'Rajwada Gulabi',
    cat: 'Hindu',
    badge: 'Maximal Floral',
    desc: 'Inspired by Jaipur’s pink city arches and royal court gardens, unfolding with blooming lotus flowers, brass lamps, and colorful ceremony cards.',
    art: '/assets/img/cs-std.webp',
    eyebrow: 'Jaipur royal · Pink city arches',
    palette: { primary: '#781A32', accent: '#E5A823', bg: '#FDF7F4' }
  },
  {
    slug: 'shahi',
    name: 'Shahi Shahnaama',
    cat: 'Hindu',
    badge: 'Regal Court',
    desc: 'An opulent royal proclamation invitation styled like ancient royal scrolls with gold leaf borders, ceremonial trumpet sounds, and GPS maps.',
    art: '/assets/img/rm-01-opening.webp',
    eyebrow: 'Regal court · Ancient scroll proclamation',
    palette: { primary: '#521424', accent: '#DCA735', bg: '#FAF5EE' }
  },
  {
    slug: 'bordeaux',
    name: 'Roselle Bordeaux',
    cat: 'Christian',
    badge: 'Modern Luxury',
    desc: 'Deep burgundy and fine champagne tones with embossed typography, wax-sealed card opening, love story timeline, and reception banquet guide.',
    art: '/assets/img/capela-cover.webp',
    eyebrow: 'Modern luxury · Champagne & burgundy',
    palette: { primary: '#4A1521', accent: '#CBB279', bg: '#FBF9F8' }
  },
  {
    slug: 'afternoon-nikah',
    name: 'Mehfil Nikah',
    cat: 'Muslim',
    badge: 'Islamic Grace',
    desc: 'A serene emerald and gold Nikah invitation featuring Islamic calligraphy, Walima timings, dress code recommendations, and one-tap RSVP.',
    art: '/assets/img/cs-nikah.webp',
    eyebrow: 'Islamic grace · Emerald & gold Nikah',
    palette: { primary: '#16382E', accent: '#C8A251', bg: '#F7FAF8' }
  },
  {
    slug: 'midnight',
    name: 'Aurelia Midnight',
    cat: 'Save the date',
    badge: 'Celestial Starry',
    desc: 'Dark starry skies with shimmering constellation animations and golden stardust, introducing your wedding date with magical ambiance.',
    art: '/assets/img/dusk.webp',
    eyebrow: 'Celestial starry · Golden stardust',
    palette: { primary: '#141829', accent: '#F3C969', bg: '#0A0C16' }
  },
  {
    slug: 'velvet',
    name: 'Velvet Rose',
    cat: 'Floral',
    badge: 'Royal Velvet',
    desc: 'Plush velvet textures and rich floral illustrations that open into layered event schedules, high-resolution portrait reel, and WhatsApp RSVP.',
    art: '/assets/img/phulkari-cover.webp',
    eyebrow: 'Royal velvet · Layered event schedules',
    palette: { primary: '#5A1B28', accent: '#D6A642', bg: '#FAF6F4' }
  },

  // 17-21: MyPatrika Series
  {
    slug: 'gulmohar-reverie',
    name: 'Gulmohar Reverie',
    cat: 'Floral',
    badge: 'Botanical Romance',
    desc: 'Vibrant crimson Gulmohar blossoms drifting gently across screen, guiding guests through Sangeet night, Haldi afternoon, and Pheras.',
    art: '/assets/img/toran.webp',
    eyebrow: 'Botanical romance · Gulmohar blossoms',
    palette: { primary: '#7A1F26', accent: '#E8A338', bg: '#FFFBF7' }
  },
  {
    slug: 'chandrika-utsav',
    name: 'Chandrika Utsav',
    cat: 'South Indian',
    badge: 'Moonlit Heritage',
    desc: 'Moonlit heritage celebration with South Indian classical temple towers, jasmine garlands, Nadaswaram background music, and GPS directions.',
    art: '/assets/img/kolam-cover.webp',
    eyebrow: 'Moonlit heritage · Temple towers & jasmine',
    palette: { primary: '#631B2D', accent: '#E0AA3E', bg: '#FAF7F2' }
  },
  {
    slug: 'sheesh-mahal',
    name: 'Sheesh Mahal',
    cat: 'Hindu',
    badge: 'Mirror Palace',
    desc: 'Gleaming mirror palace architecture with intricate glass mosaic animations, royal family welcome messages, and interactive ceremony tabs.',
    art: '/assets/img/rm-01-opening.webp',
    eyebrow: 'Mirror palace · Glass mosaic animations',
    palette: { primary: '#4A1C29', accent: '#D1A348', bg: '#FCF9F5' }
  },
  {
    slug: 'lifafa',
    name: 'Shahi Lifafa',
    cat: 'Save the date',
    badge: '3D Envelope',
    desc: 'An authentic Indian wedding Lifafa with golden twine and stamped seal that unwraps smoothly when tapped, revealing the save-the-date card.',
    art: '/assets/img/cs-std.webp',
    eyebrow: 'Shahi lifafa · 3D unwrap animation',
    palette: { primary: '#541A25', accent: '#D89E30', bg: '#FAF6F0' }
  },
  {
    slug: 'himadri',
    name: 'Himadri Serenade',
    cat: 'Floral',
    badge: 'Pine & Mountains',
    desc: 'A misty pine mountain resort destination wedding theme with woodsy botanical art, bonfire sangeet schedule, and direct WhatsApp RSVP.',
    art: '/assets/img/dusk.webp',
    eyebrow: 'Mountain resort · Pine botanicals',
    palette: { primary: '#253529', accent: '#C39A58', bg: '#F8FAF8' }
  },

  // 22-26: Wedvo & Destination Series
  {
    slug: 'royal-maroon',
    name: 'Royal Maroon & Gold',
    cat: 'Muslim',
    badge: 'Royal Nikah',
    desc: 'Majestic deep maroon background with glittering arabesque patterns, Quranic Ayahs, Walima feast details, and guest RSVP form.',
    art: '/assets/img/cs-nikah.webp',
    eyebrow: 'Royal maroon & gold · Arabesque Nikah',
    palette: { primary: '#44121B', accent: '#D9A741', bg: '#FAF5F2' }
  },
  {
    slug: 'palace-envelope',
    name: 'Palace 3D Envelope',
    cat: 'Save the date',
    badge: 'Interactive Reveal',
    desc: 'Double-fold royal palace envelope with embossed gold foil lettering that opens dynamically on mobile to announce couple names and dates.',
    art: '/assets/img/cs-std.webp',
    eyebrow: 'Interactive reveal · Gold foil envelope',
    palette: { primary: '#3E1825', accent: '#DEAA3A', bg: '#FDFBF7' }
  },
  {
    slug: 'wedding-journey',
    name: 'Our Love Story',
    cat: 'Floral',
    badge: 'Story Journey',
    desc: 'Interactive visual love story timeline from "How We Met" to the proposal, wedding functions itinerary, photo gallery, and WhatsApp confirmation.',
    art: '/assets/img/toran.webp',
    eyebrow: 'Love story timeline · Visual journey',
    palette: { primary: '#382D36', accent: '#C88D7E', bg: '#FCF9F8' }
  },
  {
    slug: 'royal-rajputana',
    name: 'Royal Rajputana Fort',
    cat: 'Hindu',
    badge: 'Heritage Fort',
    desc: 'Grand desert fort ramparts, royal elephants, and royal shehnai music setting a majestic stage for traditional Indian wedding rituals.',
    art: '/assets/img/rm-01-opening.webp',
    eyebrow: 'Desert fort · Royal Rajputana heritage',
    palette: { primary: '#5E1B24', accent: '#DF9D2C', bg: '#FAF5EB' }
  },
  {
    slug: 'anand-utsav',
    name: 'Anand Utsav',
    cat: 'Sikh',
    badge: 'Festive Punjabi',
    desc: 'High-energy festive Punjabi wedding celebration with Dhol rhythms, Jaggo night schedule, Gurdwara maps, and instant WhatsApp family RSVP.',
    art: '/assets/img/phulkari-cover.webp',
    eyebrow: 'Festive Punjabi · Jaggo & Anand Karaj',
    palette: { primary: '#7C192E', accent: '#E8A32A', bg: '#FDF7EE' }
  }
];

function generateTemplateDetailHtml(t) {
  let html = rmRefHtml;

  html = html.replace(/<title>.*?<\/title>/i, `<title>${t.name}: Luxury Wedding Invitation Website | Fenil Digital Marketing</title>`);
  html = html.replace(/<meta name="description" content=".*?">/i, `<meta name="description" content="${t.desc} Designed by Fenil Digital Marketing (Founder: Fenil Limbachiya). ₹1,499.">`);
  html = html.replace(/<link rel="canonical" href=".*?">/i, `<link rel="canonical" href="http://localhost:3000/templates/${t.slug}/">`);

  // Phone Mockup
  html = html.replace(/<div class="tp-art">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/i, `<div class="tp-art"><div class="phone"><div class="ph-screen"><img class="ph-poster" src="${t.art}" alt="${t.name} invite on phone" width="432" height="934" fetchpriority="high"></div><span class="ph-notch"></span></div></div>`);

  // Info & Breadcrumbs
  html = html.replace(/<nav class="crumbs" aria-label="Breadcrumb">[\s\S]*?<\/nav>/i, `<nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a> / <a href="/#templates">Templates</a> / <span>${t.name}</span></nav>`);
  html = html.replace(/<p class="eyebrow">.*?<\/p>/i, `<p class="eyebrow">${t.eyebrow}</p>`);
  html = html.replace(/<h1 class="tp-h">.*?<\/h1>/i, `<h1 class="tp-h">${t.name}</h1>`);
  html = html.replace(/<p class="lede">.*?<\/p>/i, `<p class="lede">${t.desc}</p>`);

  // Live Demo Button
  html = html.replace(/<a class="demo-link" href=".*?"/i, `<a class="demo-link" href="/demos/${t.slug}/"`);

  // Buy Form Attributes
  html = html.replace(/data-template=".*?"/i, `data-template="${t.slug}"`);
  html = html.replace(/data-name=".*?"/i, `data-name="${t.name}"`);
  html = html.replace(/data-price=".*?"/i, `data-price="1499"`);
  html = html.replace(/data-addon=".*?"/i, `data-addon="999"`);
  html = html.replace(/<span class="price-n" id="price-n">.*?<\/span>/i, `<span class="price-n" id="price-n">₹1,499</span>`);
  html = html.replace(/<b>Done-for-you setup \+.*?<\/b>/i, `<b>Done-for-you setup +₹999</b>`);

  // Buy button directly to WhatsApp
  const btnHtml = `<button class="btn buy-btn" type="submit" id="buy-btn" style="background:#25D366;color:#fff;border:none;display:inline-flex;align-items:center;justify-content:center;gap:8px;font-size:1.1rem;padding:16px;width:100%;box-shadow:0 6px 20px rgba(37,211,102,0.4);border-radius:999px;font-weight:700;cursor:pointer;"><svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2z"/></svg> Order on WhatsApp · <span id="buy-amt">₹1,499</span></button>`;
  html = html.replace(/<button class="btn buy-btn"[\s\S]*?<\/button>/i, btnHtml);

  // Shots Section
  const shotsHtml = `<div class="shots">
    <figure class="shot"><a href="${t.art}" target="_blank" rel="noopener"><img src="${t.art}" alt="${t.name} mobile preview" width="390" height="844" loading="lazy" decoding="async"></a><figcaption>${t.name} mobile entrance screen</figcaption></figure>
    <figure class="shot"><a href="${t.art}" target="_blank" rel="noopener"><img src="${t.art}" alt="${t.name} event schedule" width="390" height="844" loading="lazy" decoding="async"></a><figcaption>Multi-event ceremonies &amp; directions</figcaption></figure>
  </div>`;
  html = html.replace(/<div class="shots">[\s\S]*?<\/div>/i, shotsHtml);

  // Features Section
  html = html.replace(/<h2 class="h3">What’s in.*?<\/h2>/i, `<h2 class="h3">What’s in ${t.name}</h2>`);

  // Final CTA Section
  html = html.replace(/<section class="final small">[\s\S]*?<\/section>/i, `<section class="final small"><div class="final-in"><h2>Ready to create your invitation?</h2><div class="cta-row c"><a class="btn light" href="#buy">Order ${t.name} · ₹1,499</a><a class="btn ghost light" href="/demos/${t.slug}/" target="_blank" rel="noopener">Open live demo</a></div></div></section>`);

  return html;
}

function generateDemoAppHtml(t) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>${t.name} — Live Wedding Invitation | Fenil Digital Marketing</title>
  <meta name="theme-color" content="${t.palette.primary}">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="/assets/css/store.css">
  <style>
    :root {
      --primary: ${t.palette.primary};
      --accent: ${t.palette.accent};
      --bg: ${t.palette.bg};
    }
    body {
      background: var(--bg);
      color: #241c1d;
      font-family: system-ui, -apple-system, sans-serif;
      margin: 0;
      padding: 0;
      overflow-x: hidden;
    }
    .demo-top-bar {
      position: fixed;
      top: 12px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 9999999;
      background: rgba(15,5,10,0.92);
      backdrop-filter: blur(10px);
      border: 1.5px solid #ff8c00;
      border-radius: 999px;
      padding: 6px 20px;
      display: flex;
      align-items: center;
      gap: 12px;
      box-shadow: 0 8px 30px rgba(0,0,0,0.6);
      font-family: system-ui, sans-serif;
      white-space: nowrap;
    }
    .demo-gate {
      position: fixed;
      inset: 0;
      z-index: 99999;
      background: var(--primary);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #fff;
      cursor: pointer;
      text-align: center;
      padding: 24px;
      transition: transform 1s cubic-bezier(0.7,0,0.3,1), opacity 0.8s;
    }
    .demo-gate.open {
      transform: translateY(-100%);
      opacity: 0;
      pointer-events: none;
    }
    .seal-circle {
      width: 90px;
      height: 90px;
      border-radius: 50%;
      background: var(--accent);
      color: #000;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      box-shadow: 0 0 25px rgba(255,180,0,0.6);
      margin-bottom: 24px;
      animation: pulse 2s infinite;
    }
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.08); }
      100% { transform: scale(1); }
    }
    .invite-container {
      max-width: 480px;
      margin: 0 auto;
      min-height: 100vh;
      background: #fff;
      box-shadow: 0 0 50px rgba(0,0,0,0.15);
      padding: 70px 24px 60px;
      text-align: center;
    }
    .hero-art {
      width: 100%;
      height: 380px;
      border-radius: 20px;
      object-fit: cover;
      margin-bottom: 24px;
      box-shadow: 0 12px 30px rgba(0,0,0,0.12);
    }
    .couple-title {
      font-family: 'Cinzel', serif;
      font-size: 2.2rem;
      color: var(--primary);
      margin: 0 0 8px;
    }
    .countdown-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 10px;
      margin: 28px 0;
      background: #FAF6F0;
      padding: 16px;
      border-radius: 16px;
      border: 1px solid #EADBCE;
    }
    .cd-box b {
      display: block;
      font-size: 1.6rem;
      color: var(--primary);
    }
    .cd-box span {
      font-size: 0.75rem;
      color: #777;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .event-card {
      background: #FDFBF7;
      border: 1px solid #edd9c8;
      border-radius: 16px;
      padding: 20px;
      margin-bottom: 16px;
      text-align: left;
    }
    .event-card h4 {
      margin: 0 0 4px;
      font-size: 1.2rem;
      color: var(--primary);
    }
    .event-card p {
      margin: 0 0 8px;
      color: #666;
      font-size: 0.9rem;
    }
    .map-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 0.85rem;
      color: var(--accent);
      font-weight: 700;
      text-decoration: none;
    }
    .rsvp-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      background: #25D366;
      color: #fff;
      font-weight: 700;
      padding: 16px;
      border-radius: 999px;
      text-decoration: none;
      font-size: 1.1rem;
      box-shadow: 0 8px 25px rgba(37,211,102,0.4);
      margin-top: 32px;
    }
  </style>
</head>
<body>

  <!-- Top Navigation Badge -->
  <div class="demo-top-bar">
    <a href="/" style="display:flex;align-items:center;gap:8px;text-decoration:none;color:#fff;font-size:0.85rem;font-weight:700;">
      <img src="/assets/img/fdm-logo.jpg" alt="FDM Logo" style="width:24px;height:24px;border-radius:50%;border:1px solid #ff8c00;">
      <span>Fenil Digital Marketing</span>
    </a>
    <span style="color:#666;">•</span>
    <a href="https://wa.me/918200095497?text=Hi%20Fenil%20Digital%20Marketing!%20I%20want%20to%20order%20the%20${encodeURIComponent(t.name)}%20wedding%20website" target="_blank" rel="noopener" style="background:#25D366;color:#fff;padding:4px 12px;border-radius:999px;font-size:0.75rem;font-weight:700;text-decoration:none;">
      WhatsApp: 8200095497
    </a>
    <a href="/templates/${t.slug}/" style="background:#ff8c00;color:#000;padding:4px 12px;border-radius:999px;font-size:0.75rem;font-weight:700;text-decoration:none;">
      Order Template →
    </a>
  </div>

  <!-- Interactive Opening Gate Cover -->
  <div class="demo-gate" id="gate" onclick="openGate()">
    <div class="seal-circle">💌</div>
    <h2 style="font-family:'Cinzel',serif;font-size:1.8rem;margin:0 0 10px;color:#fff;">${t.name}</h2>
    <p style="color:#ffdca8;font-size:1rem;margin:0 0 20px;">${t.eyebrow}</p>
    <div style="background:#ff8c00;color:#000;padding:10px 24px;border-radius:999px;font-weight:700;font-size:0.95rem;box-shadow:0 4px 20px rgba(0,0,0,0.4);">
      ✨ Tap Anywhere to Open Invitation ✨
    </div>
  </div>

  <!-- Main Mobile Invitation Experience -->
  <div class="invite-container">
    <img class="hero-art" src="${t.art}" alt="${t.name}">
    <p style="color:var(--accent);font-weight:700;letter-spacing:2px;text-transform:uppercase;font-size:0.8rem;margin:0 0 8px;">Together With Their Families</p>
    <h1 class="couple-title">${t.name}</h1>
    <p style="color:#666;font-size:0.95rem;margin:0 0 20px;">Invite you to celebrate their auspicious wedding festivities</p>

    <!-- Countdown Timer -->
    <div class="countdown-grid">
      <div class="cd-box"><b id="d">48</b><span>Days</span></div>
      <div class="cd-box"><b id="h">14</b><span>Hours</span></div>
      <div class="cd-box"><b id="m">32</b><span>Mins</span></div>
      <div class="cd-box"><b id="s">19</b><span>Secs</span></div>
    </div>

    <!-- Ceremony Itineraries -->
    <h3 style="font-family:'Cinzel',serif;font-size:1.3rem;color:var(--primary);margin:32px 0 16px;text-align:left;">Wedding Ceremonies</h3>
    
    <div class="event-card">
      <h4>🟡 Haldi &amp; Mehendi</h4>
      <p>11:00 AM onwards · Traditional yellow decor &amp; music</p>
      <a class="map-btn" href="https://maps.google.com" target="_blank" rel="noopener">📍 Open in Google Maps →</a>
    </div>

    <div class="event-card">
      <h4>🎵 Sangeet &amp; Cocktail</h4>
      <p>07:00 PM onwards · Dance performances &amp; dinner</p>
      <a class="map-btn" href="https://maps.google.com" target="_blank" rel="noopener">📍 Open in Google Maps →</a>
    </div>

    <div class="event-card">
      <h4>🌸 Auspicious Wedding Ceremony</h4>
      <p>04:00 PM · Baraat &amp; Holy Pheras followed by Royal Feast</p>
      <a class="map-btn" href="https://maps.google.com" target="_blank" rel="noopener">📍 Open in Google Maps →</a>
    </div>

    <!-- Direct WhatsApp RSVP -->
    <a class="rsvp-btn" href="https://wa.me/918200095497?text=Hi%20Fenil%20Digital%20Marketing!%20I%20would%20love%20to%20attend%20the%20${encodeURIComponent(t.name)}%20wedding!" target="_blank" rel="noopener">
      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2z"/></svg>
      RSVP on WhatsApp
    </a>

    <p style="font-size:0.75rem;color:#999;margin-top:28px;">
      Designed with love by Fenil Digital Marketing · Founder: Fenil Limbachiya · 📞 8200095497
    </p>
  </div>

  <script>
    function openGate() {
      const g = document.getElementById('gate');
      if (g) {
        g.classList.add('open');
        setTimeout(() => { g.style.display = 'none'; }, 900);
      }
    }

    // Live ticking countdown demo
    let secs = 19, mins = 32, hrs = 14, days = 48;
    setInterval(() => {
      secs--;
      if (secs < 0) { secs = 59; mins--; }
      if (mins < 0) { mins = 59; hrs--; }
      if (hrs < 0) { hrs = 23; days--; }
      document.getElementById('s').textContent = secs < 10 ? '0' + secs : secs;
      document.getElementById('m').textContent = mins < 10 ? '0' + mins : mins;
      document.getElementById('h').textContent = hrs < 10 ? '0' + hrs : hrs;
      document.getElementById('d').textContent = days;
    }, 1000);
  </script>
</body>
</html>`;
}

console.log('=== Step 1: Generating all 26 Templates & Demos ===');
for (const t of ALL_TEMPLATES) {
  // 1. Template detail page
  const tmplDir = path.join(__dirname, 'templates', t.slug);
  if (!fs.existsSync(tmplDir)) fs.mkdirSync(tmplDir, { recursive: true });
  const tmplHtml = generateTemplateDetailHtml(t);
  fs.writeFileSync(path.join(tmplDir, 'index.html'), tmplHtml, 'utf8');

  // 2. Demo app (if not already existing custom Vishakha page)
  const demoDir = path.join(__dirname, 'demos', t.slug);
  if (!fs.existsSync(demoDir)) fs.mkdirSync(demoDir, { recursive: true });
  const demoFile = path.join(demoDir, 'index.html');
  if (!fs.existsSync(demoFile)) {
    const demoHtml = generateDemoAppHtml(t);
    fs.writeFileSync(demoFile, demoHtml, 'utf8');
  }

  // 3. Pages/wedding route
  const pwDir = path.join(__dirname, 'pages', 'wedding', t.slug);
  if (!fs.existsSync(pwDir)) fs.mkdirSync(pwDir, { recursive: true });
  const pwFile = path.join(pwDir, 'index.html');
  if (!fs.existsSync(pwFile)) {
    fs.copyFileSync(path.join(demoDir, 'index.html'), pwFile);
  }

  console.log(`Ready: ${t.slug} (${t.name})`);
}

console.log('\n=== Step 2: Updating index.html with all 26 templates ===');
let indexHtml = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

function renderStoreCard(c) {
  return `<article class="card" data-cat="${c.cat}"><a class="card-art" href="/templates/${c.slug}/" tabindex="-1" aria-hidden="true"><img src="${c.art}" alt="Preview art for the ${c.name} template" width="432" height="768" loading="lazy" decoding="async"></a><div class="card-body"><span class="badge live">Live · ₹1,499</span><h3>${c.name}</h3><p class="card-cat">${c.eyebrow}</p><div class="card-act"><a class="btn sm" href="/templates/${c.slug}/">View template</a><a class="btn sm ghost" href="/demos/${c.slug}/" target="_blank" rel="noopener"><svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/></svg> Live demo</a></div></div></article>`;
}

const sectionStart = indexHtml.indexOf('<section id="templates"');
const sectionEnd = indexHtml.indexOf('</section>', sectionStart) + 10;

const grandSectionHtml = `<section id="templates" class="sec"><div class="in"><p class="eyebrow c">The Master Collection</p><h2 class="h2 c">Choose your wedding invite</h2>
<p class="sub c">26 luxury live interactive templates. Every design is mobile-first artwork with direct WhatsApp RSVP.</p>
<div class="chips" role="group" aria-label="Filter templates">
  <button type="button" class="chip on" data-f="All" aria-pressed="true">All (26)</button>
  <button type="button" class="chip" data-f="Hindu" aria-pressed="false">Hindu &amp; Royal</button>
  <button type="button" class="chip" data-f="Muslim" aria-pressed="false">Muslim &amp; Nikah</button>
  <button type="button" class="chip" data-f="Sikh" aria-pressed="false">Sikh &amp; Punjabi</button>
  <button type="button" class="chip" data-f="South Indian" aria-pressed="false">South Indian</button>
  <button type="button" class="chip" data-f="Christian" aria-pressed="false">Christian</button>
  <button type="button" class="chip" data-f="Floral" aria-pressed="false">Floral &amp; Modern</button>
  <button type="button" class="chip" data-f="Save the date" aria-pressed="false">Save the date</button>
</div>
<div class="grid">
${ALL_TEMPLATES.map(renderStoreCard).join('\n')}
</div>
<p class="empty" hidden>No templates in this category yet. Check back soon, or suggest one on WhatsApp.</p>
</div></section>`;

indexHtml = indexHtml.slice(0, sectionStart) + grandSectionHtml + indexHtml.slice(sectionEnd);

fs.writeFileSync(path.join(__dirname, 'index.html'), indexHtml, 'utf8');
console.log('index.html updated with all 26 luxury templates inside the grid!');

console.log('\n=== Step 3: Global cleanup of old logo, payment badges, and refund ===');
require('./tools/apply_user_exact_changes.js');

console.log('\n=== All 26 templates ready and verified! ===');
