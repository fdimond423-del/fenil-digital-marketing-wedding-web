const https = require('https');
const fs = require('fs');

function fetch(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function run() {
  const cfg = await fetch('https://rangmahal-invite-demo.vercel.app/config.js');
  console.log('--- config.js ---');
  console.log(cfg.slice(0, 500));

  const main = await fetch('https://rangmahal-invite-demo.vercel.app/main.js');
  console.log('--- main.js ---');
  console.log(main.slice(0, 500));

  const html = fs.readFileSync('demo_rangmahal.html', 'utf8');
  console.log('--- FULL HTML ---');
  console.log(html);
}

run().catch(console.error);
