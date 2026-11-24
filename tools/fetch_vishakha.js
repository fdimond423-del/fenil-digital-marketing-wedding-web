const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const logoSrc = 'C:/Users/FENIL LIMBACHIYA/.gemini/antigravity/brain/53fd48d7-ec8a-4919-9716-e94e5377582f/.user_uploaded/media_1795537969451_d00100d5.jpg';
if (fs.existsSync(logoSrc)) {
  fs.copyFileSync(logoSrc, path.join(__dirname, 'assets/img/fdm-logo.jpg'));
  fs.copyFileSync(logoSrc, path.join(__dirname, 'assets/img/logo.jpg'));
  console.log('Copied FDM logo to assets/img/fdm-logo.jpg and assets/img/logo.jpg');
} else {
  console.log('Logo source not found at:', logoSrc);
}

const vishakhaUrls = [
  { name: 'aaravandmeera-mussoorie', url: 'https://vishakhacollections.com/pages/wedding/aaravandmeera-mussoorie' },
  { name: 'aaravandmeera-udaipur', url: 'https://vishakhacollections.com/pages/wedding/aaravandmeera-udaipur' },
  { name: 'vihaanandmeera', url: 'https://vishakhacollections.com/pages/wedding/vihaanandmeera' },
  { name: 'kabirandananya', url: 'https://vishakhacollections.com/pages/wedding/kabirandananya' },
  { name: 'aaravandshreya', url: 'https://vishakhacollections.com/pages/wedding/aaravandshreya' },
  { name: 'nikhilandrinki', url: 'https://vishakhacollections.com/pages/wedding/nikhilandrinki' }
];

function fetchUrl(targetUrl) {
  return new Promise((resolve, reject) => {
    https.get(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
      }
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let loc = res.headers.location;
        if (!loc.startsWith('http')) loc = new URL(loc, targetUrl).toString();
        return fetchUrl(loc).then(resolve).catch(reject);
      }
      let chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          headers: res.headers,
          body: Buffer.concat(chunks)
        });
      });
    }).on('error', reject);
  });
}

async function inspectAll() {
  for (const item of vishakhaUrls) {
    console.log(`\nFetching ${item.name} (${item.url})...`);
    try {
      const res = await fetchUrl(item.url);
      console.log(`Status: ${res.status}, Length: ${res.body.length}`);
      const text = res.body.toString('utf8');
      const title = text.match(/<title>(.*?)<\/title>/i)?.[1] || 'No title';
      console.log(`Title: ${title}`);
      
      const outDir = path.join(__dirname, 'demos', item.name);
      if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
      fs.writeFileSync(path.join(outDir, 'raw.html'), text);
      console.log(`Saved raw.html in demos/${item.name}`);
    } catch (e) {
      console.error(`Error on ${item.name}:`, e.message);
    }
  }
}

inspectAll().catch(console.error);
