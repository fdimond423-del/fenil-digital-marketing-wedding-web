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

async function checkThemes() {
  for (const s of slugs) {
    const url = `https://mypatrika.in/themes/${s}/index.html`;
    await new Promise((resolve) => {
      https.get(url, res => {
        let d = '';
        res.on('data', c => d += c);
        res.on('end', () => {
          console.log(`[${res.statusCode}] ${s} (${d.length} bytes)`);
          resolve();
        });
      }).on('error', e => {
        console.log(`[ERR] ${s}: ${e.message}`);
        resolve();
      });
    });
  }
}

checkThemes();
