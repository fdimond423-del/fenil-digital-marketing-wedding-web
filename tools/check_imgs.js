const fs = require('fs');
const path = require('path');
const https = require('https');

const slugs = ['vihaanandmeera', 'kabirandananya', 'aaravandshreya', 'nikhilandrinki'];

function fetchBinary(url) {
  return new Promise((resolve, reject) => {
    let finalUrl = url.startsWith('//') ? 'https:' + url : url;
    https.get(finalUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchBinary(res.headers.location).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) return reject(new Error(`Status ${res.statusCode}`));
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    }).on('error', reject);
  });
}

async function inspectAndDownload() {
  for (const slug of slugs) {
    const rawPath = path.join('demos', slug, 'raw.html');
    const html = fs.readFileSync(rawPath, 'utf8');
    
    // Find any url or src containing shop/ or cdn/ or assets
    const matches = [...html.matchAll(/(https?:\/\/[^\s"'<>\)]+\.(?:webp|jpg|jpeg|png|svg|mp4|mp3)[^\s"'<>\)]*|\/\/[^\s"'<>\)]+\.(?:webp|jpg|jpeg|png|svg|mp4|mp3)[^\s"'<>\)]*)/gi)].map(m => m[1]);
    const cleanMatches = [...new Set(matches.map(m => m.split('"')[0].split("'")[0].split(')')[0]))];
    console.log(`\n${slug}: found ${cleanMatches.length} media URLs:`);
    cleanMatches.forEach(m => console.log(' - ' + m.slice(0, 80)));

    const assetsDir = path.join('demos', slug, 'assets');
    if (!fs.existsSync(assetsDir)) fs.mkdirSync(assetsDir, { recursive: true });

    let indexHtmlPath = path.join('demos', slug, 'index.html');
    let indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');

    for (const m of cleanMatches) {
      if (m.includes('shopifycloud') || m.includes('favicon') || m.includes('trustify') || m.includes('judgeme')) continue;
      try {
        const baseName = path.basename(m.split('?')[0]).replace(/[^a-zA-Z0-9._-]/g, '_');
        const dest = path.join(assetsDir, baseName);
        if (!fs.existsSync(dest)) {
          console.log(`Downloading: ${m} -> assets/${baseName}`);
          const buf = await fetchBinary(m);
          fs.writeFileSync(dest, buf);
        }
        indexHtml = indexHtml.split(m).join('assets/' + baseName);
      } catch (err) {
        console.warn(`Failed downloading ${m}:`, err.message);
      }
    }
    fs.writeFileSync(indexHtmlPath, indexHtml, 'utf8');
  }
}

inspectAndDownload().catch(console.error);
