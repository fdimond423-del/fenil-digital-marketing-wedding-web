const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const demos = [
  { name: 'rangmahal', url: 'https://rangmahal-invite-demo.vercel.app' },
  { name: 'phulkari', url: 'https://phulkari-invite-demo.vercel.app' },
  { name: 'kolam', url: 'https://kolam-invite-demo.vercel.app' },
  { name: 'noor', url: 'https://noor-invite-demo.vercel.app' },
  { name: 'capela', url: 'https://capela-invite-demo.vercel.app' },
  { name: 'pichola', url: 'https://pichola-invite-demo.vercel.app' }
];

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function fetchBuffer(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let loc = res.headers.location;
        if (!loc.startsWith('http')) loc = new URL(loc, url).toString();
        return fetchBuffer(loc).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Status ${res.statusCode} for ${url}`));
      }
      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    }).on('error', reject);
  });
}

async function downloadFile(url, destPath) {
  try {
    ensureDir(path.dirname(destPath));
    const buf = await fetchBuffer(url);
    fs.writeFileSync(destPath, buf);
    console.log(`Saved: ${destPath} (${buf.length} bytes)`);
    return buf;
  } catch (err) {
    console.warn(`Failed ${url}: ${err.message}`);
    return null;
  }
}

async function scrapeDemo(demo) {
  console.log(`\n================ Scraping ${demo.name} (${demo.url}) ================`);
  const outDir = path.join(__dirname, 'demos', demo.name);
  ensureDir(outDir);

  const htmlBuf = await downloadFile(demo.url + '/', path.join(outDir, 'index.html'));
  if (!htmlBuf) return;
  const html = htmlBuf.toString('utf8');

  // Download config.js, main.js, style.css
  const jsFiles = ['config.js', 'main.js'];
  for (const js of jsFiles) {
    await downloadFile(`${demo.url}/${js}`, path.join(outDir, js));
  }

  // Parse HTML for links, scripts, imgs, preloads
  const hrefs = [...html.matchAll(/href=["']([^"']+)["']/gi)].map(m => m[1]);
  const srcs = [...html.matchAll(/src=["']([^"']+)["']/gi)].map(m => m[1]);
  const allRefs = new Set([...hrefs, ...srcs]);

  for (const ref of allRefs) {
    if (ref.startsWith('data:') || ref.startsWith('http')) continue;
    await downloadFile(`${demo.url}/${ref.replace(/^\//, '')}`, path.join(outDir, ref.replace(/^\//, '')));
  }

  // Also read style.css for fonts, url()
  const stylePath = path.join(outDir, 'style.css');
  let styleBuf = null;
  if (fs.existsSync(stylePath)) {
    styleBuf = fs.readFileSync(stylePath);
  } else {
    styleBuf = await downloadFile(`${demo.url}/style.css`, stylePath);
  }

  if (styleBuf) {
    const cssText = styleBuf.toString('utf8');
    const cssUrls = [...cssText.matchAll(/url\s*\(([^)]+)\)/gi)].map(m => m[1].replace(/['"]/g, '').trim());
    for (const u of cssUrls) {
      if (!u.startsWith('data:') && !u.startsWith('http')) {
        await downloadFile(`${demo.url}/${u.replace(/^\//, '')}`, path.join(outDir, u.replace(/^\//, '')));
      }
    }
  }

  // Also read config.js for music, photos, art
  const cfgPath = path.join(outDir, 'config.js');
  if (fs.existsSync(cfgPath)) {
    const cfgText = fs.readFileSync(cfgPath, 'utf8');
    // Match any string ending in .mp3, .mp4, .webp, .jpg, .png
    const mediaMatches = [...cfgText.matchAll(/["']([^"']+\.(?:mp3|mp4|webp|jpg|jpeg|png|svg|woff2))["']/gi)].map(m => m[1]);
    for (const m of mediaMatches) {
      if (!m.startsWith('http') && !m.startsWith('data:')) {
        await downloadFile(`${demo.url}/${m.replace(/^\//, '')}`, path.join(outDir, m.replace(/^\//, '')));
      }
    }
  }
}

async function main() {
  for (const d of demos) {
    await scrapeDemo(d);
  }
  console.log('\nAll demos scraped successfully!');
}

main().catch(console.error);
