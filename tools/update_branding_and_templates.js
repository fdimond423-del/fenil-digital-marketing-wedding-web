const fs = require('fs');
const path = require('path');

console.log('--- Step 1: Updating assets/js/cfg.js ---');
const cfgContent = `window.STORE = {
  "checkoutEnabled": true,
  "brand": "Fenil Digital Marketing",
  "founder": "Fenil Limbachiya",
  "whatsapp": "918200095497",
  "phone": "+91 8200095497",
  "addonName": "Done-for-you setup"
};
`;
fs.writeFileSync(path.join(__dirname, 'assets/js/cfg.js'), cfgContent, 'utf8');

console.log('--- Step 2: Updating index.html ---');
let indexHtml = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

// Replace titles & meta
indexHtml = indexHtml.replace(/<title>.*?<\/title>/i, '<title>Fenil Digital Marketing: Hand-Painted Wedding Invitation Websites</title>');
indexHtml = indexHtml.replace(/content="Knotlink:.*?">/i, 'content="Hand-crafted, mobile-first wedding invite websites with maps, WhatsApp RSVP, music and countdown by Fenil Digital Marketing (Founder: Fenil Limbachiya). From ₹1,499.">');
indexHtml = indexHtml.replace(/content="Knotlink"/g, 'content="Fenil Digital Marketing"');
indexHtml = indexHtml.replace(/https:\/\/www\.knotlink\.in/g, 'http://localhost:3000');

// Replace logo & brand
const oldBrandPattern = /<a class="brand" href="\/">[\s\S]*?<\/a>/i;
const newBrandHtml = `<a class="brand" href="/" style="display:inline-flex;align-items:center;gap:10px;text-decoration:none;">
  <img src="/assets/img/fdm-logo.jpg" alt="Fenil Digital Marketing Logo" style="height:38px;width:38px;border-radius:50%;object-fit:cover;border:2px solid #ff8c00;box-shadow:0 0 10px rgba(255,140,0,0.4);">
  <span style="display:flex;flex-direction:column;line-height:1.1;">
    <strong style="font-family:'Cinzel',serif;font-size:1.1rem;color:#4C1026;letter-spacing:0.5px;">Fenil Digital Marketing</strong>
    <small style="font-size:0.65rem;color:#8a6d65;letter-spacing:1px;text-transform:uppercase;">Founder: Fenil Limbachiya</small>
  </span>
</a>`;

if (oldBrandPattern.test(indexHtml)) {
  indexHtml = indexHtml.replace(oldBrandPattern, newBrandHtml);
}

// Replace WhatsApp number globally
indexHtml = indexHtml.replace(/916362240361/g, '918200095497');
indexHtml = indexHtml.replace(/6362240361/g, '8200095497');
indexHtml = indexHtml.replace(/Hi%20Knotlink/g, 'Hi%20Fenil%20Digital%20Marketing');

// Replace external demo links with local demo links
indexHtml = indexHtml.replace(/https:\/\/rangmahal-invite-demo\.vercel\.app/g, '/demos/rangmahal/');
indexHtml = indexHtml.replace(/https:\/\/phulkari-invite-demo\.vercel\.app/g, '/demos/phulkari/');
indexHtml = indexHtml.replace(/https:\/\/kolam-invite-demo\.vercel\.app/g, '/demos/kolam/');
indexHtml = indexHtml.replace(/https:\/\/noor-invite-demo\.vercel\.app/g, '/demos/noor/');
indexHtml = indexHtml.replace(/https:\/\/capela-invite-demo\.vercel\.app/g, '/demos/capela/');
indexHtml = indexHtml.replace(/https:\/\/pichola-invite-demo\.vercel\.app/g, '/demos/pichola/');

// Add the 6 new Vishakha Collections templates into index.html
const vishakhaCardsHtml = `
      <!-- Additional Luxury Templates (Vishakha Collections by Fenil Digital Marketing) -->
      <article class="card" data-cat="Royal">
        <a class="card-cover" href="/demos/aaravandmeera-mussoorie/" title="Aarav &amp; Meera (Mussoorie)">
          <img src="/demos/aaravandmeera-mussoorie/assets/re-hero-mobile.webp" alt="Aarav &amp; Meera Mussoorie Invitation" loading="lazy" style="height:260px;object-fit:cover;width:100%;">
          <span class="badge">Mussoorie Mountain</span>
        </a>
        <div class="card-body">
          <div class="card-head">
            <h3 class="h3"><a href="/demos/aaravandmeera-mussoorie/">Aarav &amp; Meera</a></h3>
            <span class="price">₹1,499</span>
          </div>
          <p class="card-tag">Mussoorie mountain trail theme · Scratch to reveal date · Animated opening gate · WhatsApp RSVP</p>
          <div class="card-acts">
            <a class="btn btn-sec" href="/demos/aaravandmeera-mussoorie/">View live demo</a>
            <a class="btn btn-pri" href="https://wa.me/918200095497?text=Hi%20Fenil%20Digital%20Marketing!%20I%20want%20to%20order%20the%20Aarav%20%26%20Meera%20Mussoorie%20template%20(₹1,499)">Order on WhatsApp</a>
          </div>
        </div>
      </article>

      <article class="card" data-cat="Royal">
        <a class="card-cover" href="/demos/aaravandmeera-udaipur/" title="Aarav &amp; Meera (Udaipur)">
          <img src="/demos/aaravandmeera-udaipur/assets/pg-palace-blur.webp" alt="Aarav &amp; Meera Udaipur Invitation" loading="lazy" style="height:260px;object-fit:cover;width:100%;">
          <span class="badge">Udaipur Lake Palace</span>
        </a>
        <div class="card-body">
          <div class="card-head">
            <h3 class="h3"><a href="/demos/aaravandmeera-udaipur/">Aarav &amp; Meera (Udaipur)</a></h3>
            <span class="price">₹1,499</span>
          </div>
          <p class="card-tag">Grand lake palace theme · Palace gates entrance · Interactive countdown &amp; itinerary</p>
          <div class="card-acts">
            <a class="btn btn-sec" href="/demos/aaravandmeera-udaipur/">View live demo</a>
            <a class="btn btn-pri" href="https://wa.me/918200095497?text=Hi%20Fenil%20Digital%20Marketing!%20I%20want%20to%20order%20the%20Aarav%20%26%20Meera%20Udaipur%20template%20(₹1,499)">Order on WhatsApp</a>
          </div>
        </div>
      </article>

      <article class="card" data-cat="Minimal">
        <a class="card-cover" href="/demos/vihaanandmeera/" title="Vihaan &amp; Meera">
          <img src="/demos/vihaanandmeera/assets/wedding-nikhilandrinki-hero.jpg" alt="Vihaan &amp; Meera Invitation" loading="lazy" style="height:260px;object-fit:cover;width:100%;">
          <span class="badge">Contemporary Grace</span>
        </a>
        <div class="card-body">
          <div class="card-head">
            <h3 class="h3"><a href="/demos/vihaanandmeera/">Vihaan &amp; Meera</a></h3>
            <span class="price">₹1,499</span>
          </div>
          <p class="card-tag">Modern luxury typography · Story gallery · Haldi, Mehendi &amp; Sangeet schedules</p>
          <div class="card-acts">
            <a class="btn btn-sec" href="/demos/vihaanandmeera/">View live demo</a>
            <a class="btn btn-pri" href="https://wa.me/918200095497?text=Hi%20Fenil%20Digital%20Marketing!%20I%20want%20to%20order%20the%20Vihaan%20%26%20Meera%20template%20(₹1,499)">Order on WhatsApp</a>
          </div>
        </div>
      </article>

      <article class="card" data-cat="Royal">
        <a class="card-cover" href="/demos/kabirandananya/" title="Kabir &amp; Ananya">
          <img src="/demos/kabirandananya/assets/wedding-nikhilandrinki-hero.jpg" alt="Kabir &amp; Ananya Invitation" loading="lazy" style="height:260px;object-fit:cover;width:100%;">
          <span class="badge">Grand Royal</span>
        </a>
        <div class="card-body">
          <div class="card-head">
            <h3 class="h3"><a href="/demos/kabirandananya/">Kabir &amp; Ananya</a></h3>
            <span class="price">₹1,499</span>
          </div>
          <p class="card-tag">Majestic royal celebrations · Multi-event interactive tabs · High-res wedding gallery</p>
          <div class="card-acts">
            <a class="btn btn-sec" href="/demos/kabirandananya/">View live demo</a>
            <a class="btn btn-pri" href="https://wa.me/918200095497?text=Hi%20Fenil%20Digital%20Marketing!%20I%20want%20to%20order%20the%20Kabir%20%26%20Ananya%20template%20(₹1,499)">Order on WhatsApp</a>
          </div>
        </div>
      </article>

      <article class="card" data-cat="Floral">
        <a class="card-cover" href="/demos/aaravandshreya/" title="Aarav &amp; Shreya">
          <img src="/demos/aaravandshreya/assets/wedding-nikhilandrinki-hero.jpg" alt="Aarav &amp; Shreya Invitation" loading="lazy" style="height:260px;object-fit:cover;width:100%;">
          <span class="badge">Floral Garden</span>
        </a>
        <div class="card-body">
          <div class="card-head">
            <h3 class="h3"><a href="/demos/aaravandshreya/">Aarav &amp; Shreya</a></h3>
            <span class="price">₹1,499</span>
          </div>
          <p class="card-tag">Romantic pastel botanicals · Live countdown clock · One-tap WhatsApp RSVP</p>
          <div class="card-acts">
            <a class="btn btn-sec" href="/demos/aaravandshreya/">View live demo</a>
            <a class="btn btn-pri" href="https://wa.me/918200095497?text=Hi%20Fenil%20Digital%20Marketing!%20I%20want%20to%20order%20the%20Aarav%20%26%20Shreya%20template%20(₹1,499)">Order on WhatsApp</a>
          </div>
        </div>
      </article>

      <article class="card" data-cat="Floral">
        <a class="card-cover" href="/demos/nikhilandrinki/" title="Nikhil &amp; Rinki">
          <img src="/demos/nikhilandrinki/assets/wedding-nikhilandrinki-hero.jpg" alt="Nikhil &amp; Rinki Invitation" loading="lazy" style="height:260px;object-fit:cover;width:100%;">
          <span class="badge">Festive Heritage</span>
        </a>
        <div class="card-body">
          <div class="card-head">
            <h3 class="h3"><a href="/demos/nikhilandrinki/">Nikhil &amp; Rinki</a></h3>
            <span class="price">₹1,499</span>
          </div>
          <p class="card-tag">Rich Indian heritage colors · Complete wedding rituals guide · Venue directions</p>
          <div class="card-acts">
            <a class="btn btn-sec" href="/demos/nikhilandrinki/">View live demo</a>
            <a class="btn btn-pri" href="https://wa.me/918200095497?text=Hi%20Fenil%20Digital%20Marketing!%20I%20want%20to%20order%20the%20Nikhil%20%26%20Rinki%20template%20(₹1,499)">Order on WhatsApp</a>
          </div>
        </div>
      </article>
`;

// Insert the new cards right before </section> of #templates
if (indexHtml.includes('id="templates"')) {
  // Find </section> closing the templates section
  const sectionIdx = indexHtml.indexOf('id="templates"');
  const closeSectionIdx = indexHtml.indexOf('</section>', sectionIdx);
  if (closeSectionIdx !== -1) {
    indexHtml = indexHtml.slice(0, closeSectionIdx) + vishakhaCardsHtml + indexHtml.slice(closeSectionIdx);
  }
}

// Update Footer in index.html
const oldFooterPattern = /<footer class="foot">[\s\S]*?<\/footer>/i;
const newFooterHtml = `<footer class="foot" style="background:#17050B;color:#f0e4dc;padding:48px 24px 32px;margin-top:60px;">
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
        <li><a href="/demos/rangmahal/" style="color:#bcaaa4;text-decoration:none;">• Rangmahal (Palace Theme)</a></li>
        <li><a href="/demos/phulkari/" style="color:#bcaaa4;text-decoration:none;">• Phulkari (Punjabi Heritage)</a></li>
        <li><a href="/demos/kolam/" style="color:#bcaaa4;text-decoration:none;">• Kolam (South Indian Tradition)</a></li>
        <li><a href="/demos/noor/" style="color:#bcaaa4;text-decoration:none;">• Noor (Mughal &amp; Nikah)</a></li>
        <li><a href="/demos/aaravandmeera-mussoorie/" style="color:#bcaaa4;text-decoration:none;">• Aarav &amp; Meera (Mussoorie Mountain)</a></li>
        <li><a href="/demos/aaravandmeera-udaipur/" style="color:#bcaaa4;text-decoration:none;">• Aarav &amp; Meera (Udaipur Lake)</a></li>
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
</footer>`;

if (oldFooterPattern.test(indexHtml)) {
  indexHtml = indexHtml.replace(oldFooterPattern, newFooterHtml);
}

fs.writeFileSync(path.join(__dirname, 'index.html'), indexHtml, 'utf8');
console.log('index.html updated with Fenil Digital Marketing branding, logo, and 12 templates!');

console.log('--- Step 3: Updating subpages branding ---');
const subpages = [
  'contact/index.html',
  'terms/index.html',
  'privacy/index.html',
  'refund/index.html',
  'thank-you/index.html',
  'templates/rangmahal/index.html',
  'templates/phulkari/index.html',
  'templates/kolam/index.html',
  'templates/noor/index.html',
  'templates/capela/index.html',
  'templates/pichola/index.html'
];

for (const sp of subpages) {
  const spPath = path.join(__dirname, sp);
  if (!fs.existsSync(spPath)) continue;
  let content = fs.readFileSync(spPath, 'utf8');
  content = content.replace(/Knotlink/g, 'Fenil Digital Marketing');
  content = content.replace(/916362240361/g, '918200095497');
  content = content.replace(/6362240361/g, '8200095497');
  content = content.replace(/https:\/\/rangmahal-invite-demo\.vercel\.app/g, '/demos/rangmahal/');
  content = content.replace(/https:\/\/phulkari-invite-demo\.vercel\.app/g, '/demos/phulkari/');
  content = content.replace(/https:\/\/kolam-invite-demo\.vercel\.app/g, '/demos/kolam/');
  content = content.replace(/https:\/\/noor-invite-demo\.vercel\.app/g, '/demos/noor/');
  content = content.replace(/https:\/\/capela-invite-demo\.vercel\.app/g, '/demos/capela/');
  content = content.replace(/https:\/\/pichola-invite-demo\.vercel\.app/g, '/demos/pichola/');
  
  // Replace old brand in header if present
  if (oldBrandPattern.test(content)) {
    content = content.replace(oldBrandPattern, newBrandHtml);
  }
  if (oldFooterPattern.test(content)) {
    content = content.replace(oldFooterPattern, newFooterHtml);
  }

  fs.writeFileSync(spPath, content, 'utf8');
  console.log(`Updated subpage: ${sp}`);
}

console.log('\n--- Step 4: Updating server.js with all 12 templates & redirects ---');
let serverJs = fs.readFileSync(path.join(__dirname, 'server.js'), 'utf8');

// Update TEMPLATE_PRICES to include all 12 templates
const newPrices = `const TEMPLATE_PRICES = {
  'rangmahal': 1499,
  'phulkari': 1499,
  'kolam': 1499,
  'noor': 1499,
  'capela': 1499,
  'pichola': 1499,
  'aaravandmeera-mussoorie': 1499,
  'aaravandmeera-udaipur': 1499,
  'vihaanandmeera': 1499,
  'kabirandananya': 1499,
  'aaravandshreya': 1499,
  'nikhilandrinki': 1499
};`;

serverJs = serverJs.replace(/const TEMPLATE_PRICES = \{[\s\S]*?\};/, newPrices);
serverJs = serverJs.replace(/name: 'Knotlink'/g, "name: 'Fenil Digital Marketing'");
serverJs = serverJs.replace(/brand: 'Knotlink'/g, "brand: 'Fenil Digital Marketing'");

// Add redirect handler for /pages/wedding/:slug
const redirectSnippet = `
  // Support redirects for Vishakha / custom wedding paths
  if (pathname.startsWith('/pages/wedding/')) {
    const slug = pathname.replace('/pages/wedding/', '').replace(/\\/+$/, '');
    res.writeHead(302, { 'Location': '/demos/' + slug + '/' });
    res.end();
    return;
  }
`;

if (!serverJs.includes('/pages/wedding/')) {
  serverJs = serverJs.replace('// API ROUTING: /api/create-order', redirectSnippet + '\n  // API ROUTING: /api/create-order');
}

fs.writeFileSync(path.join(__dirname, 'server.js'), serverJs, 'utf8');
console.log('server.js updated with all 12 templates, brand name, and redirect rules!');
