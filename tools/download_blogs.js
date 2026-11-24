const fs = require('fs');
const path = require('path');
const https = require('https');

const sitemap = fs.readFileSync('sitemap.xml', 'utf8');
const blogUrls = [...sitemap.matchAll(/<loc>(https:\/\/www\.knotlink\.in\/blog\/[^<]+)<\/loc>/gi)].map(m => m[1]);

console.log(`Found ${blogUrls.length} blog URLs in sitemap`);

function ensureDir(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function fetchText(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let loc = res.headers.location;
        if (!loc.startsWith('http')) loc = new URL(loc, url).toString();
        return fetchText(loc).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) return reject(new Error(`Status ${res.statusCode}`));
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function main() {
  for (const u of blogUrls) {
    try {
      const rel = u.replace('https://www.knotlink.in/', '');
      const dest = path.join(__dirname, rel, 'index.html');
      if (fs.existsSync(dest)) continue;
      console.log(`Fetching: ${u} -> ${dest}`);
      const html = await fetchText(u);
      ensureDir(dest);
      fs.writeFileSync(dest, html, 'utf8');
    } catch (e) {
      console.warn(`Error on ${u}:`, e.message);
    }
  }
  console.log('All blogs downloaded!');
}

main().catch(console.error);
