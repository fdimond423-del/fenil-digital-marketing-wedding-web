const https = require('https');
const fs = require('fs');

function fetch(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve({ url, status: res.statusCode, body: data }));
    }).on('error', e => resolve({ url, error: e.message }));
  });
}

async function run() {
  // Check sitemap
  console.log('Checking https://toran.ink/sitemap.xml ...');
  const sm = await fetch('https://toran.ink/sitemap.xml');
  console.log('Sitemap status:', sm.status, 'Len:', sm.body ? sm.body.length : 0);
  if (sm.body && sm.body.includes('<loc>')) {
    const locs = [...sm.body.matchAll(/<loc>([^<]+)<\/loc>/gi)].map(m => m[1]);
    console.log(`Found ${locs.length} URLs in sitemap!`);
    const samples = locs.filter(l => l.includes('/sample/'));
    console.log(`Sample URLs in sitemap (${samples.length}):`);
    samples.forEach(s => console.log(' - ' + s));
  }

  // Check robots.txt
  const rb = await fetch('https://toran.ink/robots.txt');
  console.log('Robots.txt:', rb.body);
}

run();
