const fs = require('fs');
const path = require('path');
const https = require('https');

const templates = [
  { slug: 'aaravandmeera-mussoorie', title: 'Aarav & Meera — Mussoorie Mountain Wedding' },
  { slug: 'aaravandmeera-udaipur', title: 'Aarav & Meera — Udaipur Royal Lake Wedding' },
  { slug: 'vihaanandmeera', title: 'Vihaan & Meera — Contemporary Elegance Wedding' },
  { slug: 'kabirandananya', title: 'Kabir & Ananya — Grand Royal Wedding' },
  { slug: 'aaravandshreya', title: 'Aarav & Shreya — Romantic Floral Garden Wedding' },
  { slug: 'nikhilandrinki', title: 'Nikhil & Rinki — Traditional Festive Wedding' }
];

function fetchBinary(url) {
  return new Promise((resolve, reject) => {
    let finalUrl = url;
    if (finalUrl.startsWith('//')) finalUrl = 'https:' + finalUrl;
    https.get(finalUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchBinary(res.headers.location).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) return reject(new Error(`Status ${res.statusCode} for ${finalUrl}`));
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    }).on('error', reject);
  });
}

async function processTemplate(t) {
  console.log(`\n================ Processing ${t.slug} ================`);
  const rawPath = path.join(__dirname, 'demos', t.slug, 'raw.html');
  if (!fs.existsSync(rawPath)) {
    console.log(`raw.html not found for ${t.slug}`);
    return;
  }
  const raw = fs.readFileSync(rawPath, 'utf8');

  // Find all <style> tags
  const styleTags = [...raw.matchAll(/<style[\s\S]*?<\/style>/gi)].map(m => m[0]);
  
  // Find gate if any
  const gateMatch = raw.match(/<div\s+id=["']gate["'][\s\S]*?<\/div>\s*<\/div>/i) || raw.match(/<div\s+id=["']gate["'][\s\S]*?<\/div>/i);
  const gateHtml = gateMatch ? gateMatch[0] : '';

  // Find <main>
  const mainMatch = raw.match(/<main[\s\S]*?<\/main>/i);
  const mainHtml = mainMatch ? mainMatch[0] : '';

  // Find toast / audio / controls if any
  const toastMatch = raw.match(/<div\s+id=["']toast["'][\s\S]*?<\/div>/i);
  const toastHtml = toastMatch ? toastMatch[0] : '<div id="toast" class="toast"></div>';

  const audioMatch = raw.match(/<button\s+id=["']music["'][\s\S]*?<\/button>/i) || raw.match(/<audio[\s\S]*?<\/audio>/i);
  const audioHtml = audioMatch ? audioMatch[0] : '';

  // Find wedding scripts
  const inlineScripts = [...raw.matchAll(/<script(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/gi)].map(m => m[1]);
  const weddingScripts = inlineScripts.filter(sc => 
    sc.includes('countdown') || sc.includes('scratch') || sc.includes('openGate') || sc.includes('IntersectionObserver') || sc.includes('canvas')
  );

  // Find fonts and preload links in head
  const fontLinks = [...raw.matchAll(/<link[^>]*rel=["']preload["'][^>]*as=["']font["'][^>]*>/gi)].map(m => m[0]);
  const googleFonts = [...raw.matchAll(/<link[^>]*fonts\.googleapis\.com[^>]*>/gi)].map(m => m[0]);

  // Collect all image URLs inside main and style
  const combinedContent = styleTags.join('\n') + '\n' + gateHtml + '\n' + mainHtml;
  const imgUrls = [...combinedContent.matchAll(/(?:src=["']|url\(['"]?)(https?:\/\/[^'"\)]+|\/\/[^'"\)]+)/gi)].map(m => m[1]);
  const uniqueImgs = [...new Set(imgUrls.filter(u => u.includes('.webp') || u.includes('.jpg') || u.includes('.png') || u.includes('.svg') || u.includes('.mp3')))];

  console.log(`Found ${uniqueImgs.length} media assets to download for ${t.slug}`);

  const assetsDir = path.join(__dirname, 'demos', t.slug, 'assets');
  if (!fs.existsSync(assetsDir)) fs.mkdirSync(assetsDir, { recursive: true });

  let updatedContent = gateHtml + '\n' + mainHtml;
  let updatedStyles = styleTags.join('\n');

  for (const imgUrl of uniqueImgs) {
    try {
      const parsed = path.basename(imgUrl.split('?')[0]);
      const localFileName = parsed.replace(/[^a-zA-Z0-9._-]/g, '_');
      const localDest = path.join(assetsDir, localFileName);
      
      if (!fs.existsSync(localDest)) {
        console.log(`Downloading: ${imgUrl} -> assets/${localFileName}`);
        const buf = await fetchBinary(imgUrl);
        fs.writeFileSync(localDest, buf);
      }
      
      const localRelPath = 'assets/' + localFileName;
      // Replace references
      updatedContent = updatedContent.split(imgUrl).join(localRelPath);
      updatedStyles = updatedStyles.split(imgUrl).join(localRelPath);
    } catch (e) {
      console.warn(`Failed image ${imgUrl}: ${e.message}`);
    }
  }

  // Replace WhatsApp and contact numbers with Fenil Digital Marketing
  updatedContent = updatedContent.replace(/wa\.me\/\d+/g, 'wa.me/918200095497');
  updatedContent = updatedContent.replace(/\+91[\s-]?\d{10}/g, '+91 8200095497');

  // Build clean standalone HTML file
  const standaloneHtml = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>${t.title} | Fenil Digital Marketing</title>
  <meta name="description" content="${t.title} - Hand-crafted digital wedding invitation website by Fenil Digital Marketing (Founder: Fenil Limbachiya).">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  ${googleFonts.join('\n  ')}
  ${fontLinks.join('\n  ')}
  <style>
    /* Reset & Base */
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { width: 100%; min-height: 100%; font-family: system-ui, -apple-system, sans-serif; -webkit-font-smoothing: antialiased; }
    body.locked { overflow: hidden; }
    img { max-width: 100%; height: auto; display: block; }
    
    /* Fenil Digital Marketing Top Bar Badge */
    .fdm-badge {
      position: fixed;
      top: 12px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 999999;
      background: rgba(0, 0, 0, 0.85);
      backdrop-filter: blur(8px);
      border: 1px solid rgba(255, 140, 0, 0.4);
      border-radius: 999px;
      padding: 6px 16px;
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 0.8rem;
      color: #fff;
      box-shadow: 0 4px 20px rgba(0,0,0,0.5);
      text-decoration: none;
      transition: all 0.3s ease;
    }
    .fdm-badge:hover {
      border-color: #ff8c00;
      background: rgba(0, 0, 0, 0.95);
      transform: translateX(-50%) scale(1.02);
    }
    .fdm-badge img {
      width: 22px;
      height: 22px;
      border-radius: 50%;
    }
    .fdm-badge span b {
      color: #ff8c00;
    }
    .fdm-badge .fdm-back {
      background: #ff8c00;
      color: #000;
      font-weight: 700;
      padding: 2px 8px;
      border-radius: 999px;
      font-size: 0.72rem;
      margin-left: 4px;
    }
  </style>
  ${updatedStyles}
</head>
<body class="locked">
  <a href="/" class="fdm-badge" title="Back to Fenil Digital Marketing Store">
    <img src="/assets/img/fdm-logo.jpg" alt="FDM Logo">
    <span><b>Fenil Digital Marketing</b> • Order on WhatsApp: 8200095497</span>
    <span class="fdm-back">← Back to Store</span>
  </a>

  ${gateHtml}
  ${updatedContent}
  ${toastHtml}
  ${audioHtml}

  <script>
  ${weddingScripts.join('\n\n')}
  </script>
</body>
</html>`;

  const destHtmlPath = path.join(__dirname, 'demos', t.slug, 'index.html');
  fs.writeFileSync(destHtmlPath, standaloneHtml, 'utf8');
  console.log(`Generated self-contained demo: demos/${t.slug}/index.html (${standaloneHtml.length} bytes)`);
}

async function run() {
  for (const t of templates) {
    await processTemplate(t);
  }
  console.log('\nAll 6 Vishakha Collections templates processed into self-contained demos!');
}

run().catch(console.error);
