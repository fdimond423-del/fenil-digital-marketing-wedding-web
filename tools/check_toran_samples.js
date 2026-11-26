const https = require('https');

const links = [
  'https://toran.ink/sample/aarti-and-rohan/sage',
  'https://toran.ink/sample/aarti-and-rohan/ochre',
  'https://toran.ink/sample/aarti-and-rohan/ember',
  'https://toran.ink/sample/aarti-and-rohan/indigo',
  'https://toran.ink/sample/aarti-and-rohan/kumkum',
  'https://toran.ink/sample/aarti-and-rohan/amethyst',
  'https://toran.ink/sample/engagement/sage',
  'https://toran.ink/sample/tilak/ochre',
  'https://toran.ink/sample/haldi/ochre',
  'https://toran.ink/sample/mehndi/sage',
  'https://toran.ink/sample/sangeet/indigo',
  'https://toran.ink/sample/reception/indigo',
  'https://toran.ink/sample/mundan/ochre',
  'https://toran.ink/sample/griha-pravesh/kumkum',
  'https://toran.ink/sample/naamkaran/sage',
  'https://toran.ink/sample/godh-bharai/sage'
];

function check(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        const title = (data.match(/<title>([^<]+)<\/title>/i) || [])[1];
        resolve({ url, status: res.statusCode, title, len: data.length });
      });
    }).on('error', e => resolve({ url, error: e.message }));
  });
}

async function run() {
  console.log(`Checking ${links.length} Toran sample links...`);
  for (const l of links) {
    const r = await check(l);
    console.log(`[${r.status}] ${l} -> "${r.title}" (${r.len} bytes)`);
  }
}

run();
