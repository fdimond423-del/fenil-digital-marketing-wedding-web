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

async function test() {
  const html = await fetch('https://rangmahal-invite-demo.vercel.app');
  fs.writeFileSync('demo_rangmahal.html', html);
  console.log('Demo HTML length:', html.length);
  console.log('Title:', html.match(/<title>(.*?)<\/title>/i)?.[1]);
  const scripts = [...html.matchAll(/<script\s+[^>]*src=["']([^"']+)["']/gi)].map(m => m[1]);
  const styles = [...html.matchAll(/<link\s+[^>]*href=["']([^"']+)["']/gi)].map(m => m[1]);
  console.log('Scripts:', scripts);
  console.log('Styles:', styles);
  console.log('\nFirst 800 chars:\n', html.slice(0, 800));
}

test().catch(console.error);
