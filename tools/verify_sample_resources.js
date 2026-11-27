const https = require('https');

function fetch(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve({ status: res.statusCode, len: data.length }));
    }).on('error', e => resolve({ error: e.message }));
  });
}

async function verifyAllResources() {
  const base = 'https://fdimond423-del.github.io/fenil-digital-marketing-wedding-web/';
  console.log('Fetching live index.html...');
  const res = await fetch(base);
  console.log('Index status:', res.status, 'Len:', res.len);

  // Let's test a sample of images and links from different template groups
  const sampleUrls = [
    'assets/css/store.css',
    'assets/js/cfg.js',
    'assets/js/store.js',
    'assets/fonts/Cinzel.woff2',
    'assets/fonts/Montserrat.woff2',
    'assets/img/fdm-logo.jpg',
    'assets/media/rangmahal-poster.webp',
    'assets/img/phulkari-cover.webp',
    'assets/img/vishakha/aaravandmeera-mussoorie.png',
    'assets/img/wedvo/rajwada.jpg',
    'assets/img/toran/toran-sage.png',
    'demos/rangmahal/',
    'demos/toran-sage/',
    'demos/rajwada/',
    'templates/rangmahal/',
    'templates/toran-sage/'
  ];

  for (const p of sampleUrls) {
    const full = base + p;
    const r = await fetch(full);
    console.log(`[${r.status}] ${p} (len: ${r.len})`);
  }
}

verifyAllResources();
