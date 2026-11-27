const https = require('https');
const fs = require('fs');
const path = require('path');

function fetch(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        https.get(res.headers.location, res2 => {
          let data = '';
          res2.on('data', c => data += c);
          res2.on('end', () => resolve({ url, status: res2.statusCode, body: data }));
        }).on('error', e => resolve({ url, error: e.message }));
        return;
      }
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve({ url, status: res.statusCode, body: data }));
    }).on('error', e => resolve({ url, error: e.message }));
  });
}

async function run() {
  console.log('--- 1. Checking dump_mypatrika.html ---');
  let html = '';
  if (fs.existsSync(path.join(__dirname, 'dump_mypatrika.html'))) {
    html = fs.readFileSync(path.join(__dirname, 'dump_mypatrika.html'), 'utf8');
    console.log(`Loaded dump_mypatrika.html (${html.length} bytes)`);
  }

  // Fetch fresh mypatrika.in
  console.log('--- 2. Fetching fresh https://mypatrika.in ---');
  const fresh = await fetch('https://mypatrika.in/');
  if (fresh.body && fresh.body.length > 500) {
    html = fresh.body;
    fs.writeFileSync(path.join(__dirname, 'dump_mypatrika_fresh.html'), fresh.body, 'utf8');
    console.log(`Fetched fresh HTML: ${fresh.body.length} bytes`);
  }

  // Check sitemap
  console.log('--- 3. Checking https://mypatrika.in/sitemap.xml ---');
  const sm = await fetch('https://mypatrika.in/sitemap.xml');
  console.log('Sitemap status:', sm.status, 'Len:', sm.body ? sm.body.length : 0);
  if (sm.body && sm.body.includes('<loc>')) {
    const locs = [...sm.body.matchAll(/<loc>([^<]+)<\/loc>/gi)].map(m => m[1]);
    console.log(`Found ${locs.length} URLs in sitemap:`);
    locs.forEach(l => console.log(' - ' + l));
  }

  // Find all links to demos, samples, or designs
  const links = [];
  const hrefRegex = /href=["']([^"']+)["']/gi;
  let m;
  while ((m = hrefRegex.exec(html)) !== null) {
    const href = m[1];
    if (
      href.includes('demo') ||
      href.includes('preview') ||
      href.includes('design') ||
      href.includes('/p/') ||
      href.includes('/w/') ||
      href.includes('/invite') ||
      href.includes('.mypatrika.in') ||
      href.includes('mypatrika.in/')
    ) {
      links.push(href);
    }
  }

  console.log(`\nPotential links in HTML (${links.length}):`);
  const uniqueLinks = [...new Set(links)];
  uniqueLinks.forEach(l => console.log(' * ' + l));

  // Search for design cards or elements around #designs
  const designsIdx = html.indexOf('id="designs"');
  if (designsIdx !== -1) {
    console.log('\n--- Section around #designs (first 2500 chars) ---');
    console.log(html.slice(designsIdx, designsIdx + 2500));
  }
}

run();
