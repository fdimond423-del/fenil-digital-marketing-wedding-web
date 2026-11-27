const https = require('https');

const slugs = [
  'gulmohar-reverie',
  'chandrika-utsav',
  'kanak',
  'himadri',
  'lifafa',
  'ram-mandir',
  'lagnacha-wada',
  'sheesh-mahal',
  'royal-heritage-palace',
  'phoolon-ki-baarish',
  'royal-rajputana'
];

function fetchInfo(slug) {
  return new Promise((resolve) => {
    const url = `https://mypatrika.in/demo/${slug}`;
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        https.get(res.headers.location, res2 => {
          let data = '';
          res2.on('data', c => data += c);
          res2.on('end', () => {
            const title = (data.match(/<title>([^<]+)<\/title>/i) || [])[1];
            const desc = (data.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i) || [])[1];
            resolve({ slug, url: res.headers.location, status: res2.statusCode, title, desc, len: data.length });
          });
        }).on('error', e => resolve({ slug, error: e.message }));
        return;
      }
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        const title = (data.match(/<title>([^<]+)<\/title>/i) || [])[1];
        const desc = (data.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i) || [])[1];
        resolve({ slug, url, status: res.statusCode, title, desc, len: data.length });
      });
    }).on('error', e => resolve({ slug, error: e.message }));
  });
}

async function run() {
  console.log(`Checking ${slugs.length} MyPatrika demo links...`);
  for (const s of slugs) {
    const r = await fetchInfo(s);
    console.log(`[${r.status}] ${s}: "${r.title}" | ${r.url}`);
  }

  // Also check /themes
  https.get('https://mypatrika.in/themes', (res) => {
    let data = '';
    res.on('data', c => data += c);
    res.on('end', () => {
      console.log('\n/themes status:', res.statusCode, 'len:', data.length);
      const themeLinks = [...data.matchAll(/href=["'](\/demo\/[^"']+|\/designs\/[^"']+)["']/gi)].map(m => m[1]);
      console.log('Theme links found:', [...new Set(themeLinks)]);
    });
  });
}

run();
