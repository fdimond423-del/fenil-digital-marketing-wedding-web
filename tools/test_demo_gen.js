const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const rawHtml = fs.readFileSync(path.join(__dirname, 'wedvo_dumps', 'wedding-journey.html'), 'utf8');

// Transform base href to absolute HTTPS URL
let transformed = rawHtml.replace(/<base[^>]+href=["'](\/themes\/[^"']+)["']/i, '<base href="https://wedvo.in$1">');

// Remove wedvo ads and analytics scripts
transformed = transformed.replace(/<script[^>]+src=["']\/shared\/[^"']+["'][^>]*><\/script>/gi, '');

// Inject FDM WhatsApp floating badge before </body>
const fdmBadge = `
<!-- Fenil Digital Marketing Sticky WhatsApp Button -->
<div style="position:fixed;bottom:20px;right:20px;z-index:9999999;">
  <a href="https://wa.me/918200095497?text=Hi%20Fenil%20Digital%20Marketing!%20I%20want%20to%20order%20the%20Wedding%20Journey%20invitation%20website" target="_blank" rel="noopener" style="display:flex;align-items:center;gap:10px;background:#25D366;color:#fff;padding:12px 20px;border-radius:999px;text-decoration:none;font-weight:700;font-size:0.95rem;box-shadow:0 8px 25px rgba(37,211,102,0.5);border:2px solid #fff;font-family:system-ui,-apple-system,sans-serif;">
    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2z"/></svg>
    <span>Order on WhatsApp: 8200095497</span>
  </a>
</div>
`;

if (transformed.includes('</body>')) {
  transformed = transformed.replace('</body>', fdmBadge + '\n</body>');
} else {
  transformed += fdmBadge;
}

const targetDir = path.join(rootDir, 'demos', 'wedding-journey');
if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });
fs.writeFileSync(path.join(targetDir, 'index.html'), transformed, 'utf8');

console.log('Tested wedding-journey demo generated!');
