const fs = require('fs');
const path = require('path');

console.log('=== Step 1: Copying new logo ===');
const logoSrc = 'C:/Users/FENIL LIMBACHIYA/.gemini/antigravity/brain/53fd48d7-ec8a-4919-9716-e94e5377582f/.user_uploaded/media_1795538852412_88385654.jpg';

if (fs.existsSync(logoSrc)) {
  fs.copyFileSync(logoSrc, path.join(__dirname, 'assets/img/fdm-logo.jpg'));
  fs.copyFileSync(logoSrc, path.join(__dirname, 'assets/img/logo.jpg'));
  fs.copyFileSync(logoSrc, path.join(__dirname, 'og.jpg'));
  console.log('Successfully updated assets/img/fdm-logo.jpg, assets/img/logo.jpg, and og.jpg with new uploaded logo!');
} else {
  console.warn('Logo file not found at:', logoSrc);
}

// First execute build_template_pages.js to create all 6 /templates/<slug>/index.html pages
console.log('\n=== Step 2: Executing build_template_pages.js ===');
require('./build_template_pages.js');

console.log('\n=== Step 3: Global branding across ALL HTML pages ===');

const newBrandNav = `<a class="brand" href="/" style="display:inline-flex;align-items:center;gap:12px;text-decoration:none;">
  <img src="/assets/img/fdm-logo.jpg" alt="Fenil Digital Marketing Logo" style="height:42px;width:42px;border-radius:50%;object-fit:cover;border:2px solid #ff8c00;box-shadow:0 0 12px rgba(255,140,0,0.5);">
  <span style="display:flex;flex-direction:column;line-height:1.15;">
    <strong style="font-family:'Cinzel',serif;font-size:1.18rem;color:#4C1026;letter-spacing:0.5px;">Fenil Digital Marketing</strong>
    <small style="font-size:0.7rem;color:#8a6d65;letter-spacing:1px;text-transform:uppercase;font-weight:700;">Founder: Fenil Limbachiya • 📞 8200095497</small>
  </span>
</a>`;

const floatingWhatsAppBtn = `
<!-- Fenil Digital Marketing Sticky WhatsApp Button -->
<div class="fdm-float" style="position:fixed;bottom:24px;right:24px;z-index:9999999;">
  <a href="https://wa.me/918200095497?text=Hi%20Fenil%20Digital%20Marketing!%20I%20want%20to%20order%20a%20wedding%20invitation%20website" target="_blank" rel="noopener" style="display:flex;align-items:center;gap:10px;background:#25D366;color:#fff;padding:12px 20px;border-radius:999px;text-decoration:none;font-weight:700;font-size:0.95rem;box-shadow:0 8px 25px rgba(37,211,102,0.5);border:2px solid #fff;transition:transform 0.2s;font-family:system-ui,-apple-system,sans-serif;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2z"/></svg>
    <span>Order on WhatsApp: 8200095497</span>
  </a>
</div>
`;

function walkHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    if (file === 'node_modules' || file === '.git' || file === 'tools') return;
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walkHtmlFiles(fullPath));
    } else if (file.endsWith('.html')) {
      results.push(fullPath);
    }
  });
  return results;
}

const allHtmlFiles = walkHtmlFiles(__dirname);
console.log(`Found ${allHtmlFiles.length} HTML files to update.`);

let updatedCount = 0;
for (const filePath of allHtmlFiles) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Replace phone & whatsapp numbers
  content = content.replace(/916362240361/g, '918200095497');
  content = content.replace(/6362240361/g, '8200095497');
  content = content.replace(/Hi%20Knotlink/g, 'Hi%20Fenil%20Digital%20Marketing');

  // Replace Brand Name
  content = content.replace(/Knotlink/g, 'Fenil Digital Marketing');

  // Replace Navbar Brand if present
  content = content.replace(/<a class="brand" href="\/">[\s\S]*?<\/a>/i, newBrandNav);

  // If floating button not yet included in page, add before </body>
  if (!content.includes('fdm-float') && content.includes('</body>')) {
    content = content.replace('</body>', floatingWhatsAppBtn + '\n</body>');
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    updatedCount++;
  }
}

console.log(`Updated branding, logo, founder & phone across ${updatedCount} HTML files!`);

console.log('\n=== Step 4: Updating cfg.js ===');
const cfgPath = path.join(__dirname, 'assets/js/cfg.js');
const cfgContent = `window.STORE = {
  "checkoutEnabled": true,
  "brand": "Fenil Digital Marketing",
  "founder": "Fenil Limbachiya",
  "whatsapp": "918200095497",
  "phone": "+91 8200095497",
  "addonName": "Done-for-you setup"
};
`;
fs.writeFileSync(cfgPath, cfgContent, 'utf8');
console.log('cfg.js updated with Fenil Digital Marketing details.');
