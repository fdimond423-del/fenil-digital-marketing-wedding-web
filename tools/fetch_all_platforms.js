const https = require('https');
const http = require('http');
const fs = require('fs');

const sites = [
  { id: 'einvitation', url: 'https://einvitation.app/templates' },
  { id: 'forourday', url: 'https://forour.day/templates' },
  { id: 'mypatrika', url: 'https://mypatrika.in/' },
  { id: 'toran', url: 'https://toran.ink/templates' },
  { id: 'wedvo', url: 'https://wedvo.in/' }
];

function fetchText(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    client.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
      }
    }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let loc = res.headers.location;
        if (!loc.startsWith('http')) loc = new URL(loc, url).toString();
        return fetchText(loc).then(resolve).catch(reject);
      }
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve({ status: res.statusCode, data }));
    }).on('error', reject);
  });
}

async function run() {
  for (const s of sites) {
    console.log(`\nFetching ${s.id} (${s.url})...`);
    try {
      const res = await fetchText(s.url);
      console.log(`Status: ${res.status}, length: ${res.data.length}`);
      fs.writeFileSync(`tools/dump_${s.id}.html`, res.data);
      console.log(`Saved to tools/dump_${s.id}.html`);
    } catch (err) {
      console.error(`Failed ${s.id}:`, err.message);
    }
  }
}

run();
