const fs = require('fs');
const path = require('path');

console.log('=== Step 1: Update cfg.js to disable online checkout and route 100% to WhatsApp ===');
const cfgContent = `window.STORE = {
  "checkoutEnabled": false,
  "brand": "Fenil Digital Marketing",
  "founder": "Fenil Limbachiya",
  "whatsapp": "918200095497",
  "phone": "+91 8200095497",
  "addonName": "Done-for-you setup"
};
`;
fs.writeFileSync(path.join(__dirname, 'assets/js/cfg.js'), cfgContent, 'utf8');

console.log('=== Step 2: Delete refund folder ===');
const refundDir = path.join(__dirname, 'refund');
if (fs.existsSync(refundDir)) {
  fs.rmSync(refundDir, { recursive: true, force: true });
  console.log('Removed refund/ directory.');
}

console.log('=== Step 3: Global replacements across all HTML files ===');

const newLogoHeader = `<a class="logo" href="/" style="display:inline-flex;align-items:center;gap:12px;text-decoration:none;">
  <img src="/assets/img/fdm-logo.jpg" alt="Fenil Digital Marketing Logo" style="height:42px;width:42px;border-radius:50%;object-fit:cover;border:2.5px solid #ff8c00;box-shadow:0 0 12px rgba(255,140,0,0.5);">
  <span style="display:flex;flex-direction:column;line-height:1.15;">
    <strong style="font-family:'Cinzel',serif;font-size:1.18rem;color:#4C1026;letter-spacing:0.5px;font-weight:700;">Fenil Digital Marketing</strong>
    <small style="font-size:0.68rem;color:#8a6d65;letter-spacing:1px;text-transform:uppercase;font-weight:700;">Founder: Fenil Limbachiya • 📞 8200095497</small>
  </span>
</a>`;

function walkHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    if (file === 'node_modules' || file === '.git' || file === 'tools') return;
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) results = results.concat(walkHtmlFiles(fullPath));
    else if (file.endsWith('.html')) results.push(fullPath);
  });
  return results;
}

const allHtmlFiles = walkHtmlFiles(__dirname);
console.log(`Processing ${allHtmlFiles.length} HTML files...`);

const oldLogoRegex = /<a class="logo"[^>]*>[\s\S]*?<\/a>/gi;
const oldBrandRegex = /<a class="brand"[^>]*>[\s\S]*?<\/a>/gi;

let modifiedCount = 0;

for (const filePath of allHtmlFiles) {
  let html = fs.readFileSync(filePath, 'utf8');
  const original = html;

  // 1. Replace the old logo (the golden rings + Knotlink mark)
  if (html.includes('logo-mark') || html.includes('Knot<em>link</em>') || html.includes('logo" href="/"')) {
    html = html.replace(oldLogoRegex, newLogoHeader);
  }
  if (html.includes('brand" href="/"')) {
    html = html.replace(oldBrandRegex, newLogoHeader);
  }

  // Also replace any standalone logo-mark SVG if still present
  html = html.replace(/<svg class="logo-mark"[\s\S]*?<\/svg>/gi, `<img src="/assets/img/fdm-logo.jpg" alt="FDM Logo" style="height:36px;width:36px;border-radius:50%;border:2px solid #ff8c00;vertical-align:middle;">`);
  html = html.replace(/<span class="wm">[\s\S]*?<\/span>/gi, `<span class="wm" style="font-family:'Cinzel',serif;color:#4C1026;font-weight:700;">Fenil Digital Marketing</span>`);

  // 2. Remove payment badges and gateways (Razorpay, credit cards, UPI icons)
  html = html.replace(/<div class="pay pay-buy">[\s\S]*?<\/div>/gi, '');
  html = html.replace(/<div class="pay pay-ftr">[\s\S]*?<\/div>/gi, '');
  html = html.replace(/<ul class="pay-row"[\s\S]*?<\/ul>/gi, '');
  html = html.replace(/<p class="pay-sec">[\s\S]*?<\/p>/gi, '');
  html = html.replace(/Secured by Razorpay/gi, 'Direct WhatsApp Confirmation');

  // 3. Remove all refund links
  html = html.replace(/<a href="\/refund\/?"[^>]*>[\s\S]*?<\/a>/gi, '');
  html = html.replace(/<a[^>]*href="\/refund\/?"[^>]*>[\s\S]*?<\/a>/gi, '');

  // 4. Update buy button to WhatsApp Order button
  html = html.replace(/<button class="btn buy-btn"[^>]*>[\s\S]*?<\/button>/gi, `<button class="btn buy-btn" type="submit" id="buy-btn" style="background:#25D366;color:#fff;border:none;display:inline-flex;align-items:center;justify-content:center;gap:8px;font-size:1.1rem;padding:16px;width:100%;box-shadow:0 6px 20px rgba(37,211,102,0.4);border-radius:999px;font-weight:700;cursor:pointer;"><svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2z"/></svg> Order on WhatsApp · <span id="buy-amt">₹1,499</span></button>`);

  // 5. Ensure phone is 8200095497 everywhere
  html = html.replace(/916362240361/g, '918200095497');
  html = html.replace(/6362240361/g, '8200095497');
  html = html.replace(/Hi%20Knotlink/g, 'Hi%20Fenil%20Digital%20Marketing');

  // 6. Ensure brand name is Fenil Digital Marketing and Founder Fenil Limbachiya
  html = html.replace(/Knotlink/g, 'Fenil Digital Marketing');

  if (html !== original) {
    fs.writeFileSync(filePath, html, 'utf8');
    modifiedCount++;
  }
}

console.log(`Updated ${modifiedCount} HTML files!`);

console.log('\n=== Step 4: Updating server.js ===');
let serverJs = fs.readFileSync(path.join(__dirname, 'server.js'), 'utf8');

// Redirect /refund to /contact
if (!serverJs.includes("if (pathname === '/refund' || pathname === '/refund/')")) {
  const refundRedirect = `
  if (pathname === '/refund' || pathname === '/refund/') {
    res.writeHead(302, { 'Location': '/contact/' });
    res.end();
    return;
  }
  `;
  serverJs = serverJs.replace('const server = http.createServer', refundRedirect + '\nconst server = http.createServer');
}

fs.writeFileSync(path.join(__dirname, 'server.js'), serverJs, 'utf8');
console.log('server.js updated.');

console.log('\n=== Step 5: Updating sitemap.xml to remove refund ===');
let sitemap = fs.readFileSync(path.join(__dirname, 'sitemap.xml'), 'utf8');
sitemap = sitemap.replace(/<url><loc>https:\/\/www\.knotlink\.in\/refund\/<\/loc>[\s\S]*?<\/url>/gi, '');
fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), sitemap, 'utf8');
console.log('sitemap.xml updated.');
