const https = require('https');
const fs = require('fs');

const sampleUrls = [
  'https://toran.ink/sample/aarti-and-rohan/sage',
  'https://toran.ink/sample/aarti-and-rohan/ochre',
  'https://toran.ink/sample/aarti-and-rohan/ember',
  'https://toran.ink/sample/aarti-and-rohan/indigo',
  'https://toran.ink/sample/aarti-and-rohan/kumkum',
  'https://toran.ink/sample/aarti-and-rohan/amethyst',
  'https://toran.ink/sample/engagement/sage',
  'https://toran.ink/sample/haldi/ochre',
  'https://toran.ink/sample/griha-pravesh/kumkum'
];

function fetch(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        const og = (data.match(/property=["']og:image["'][^>]+content=["']([^"']+)["']/i) || [])[1];
        const imgs = [...data.matchAll(/<img[^>]+src=["']([^"']+)["']/gi)].map(m => m[1]);
        resolve({ url, og, imgs: imgs.slice(0, 4) });
      });
    }).on('error', e => resolve({ url, error: e.message }));
  });
}

async function run() {
  for (const u of sampleUrls) {
    const r = await fetch(u);
    console.log(u.replace('https://toran.ink/sample/', ''));
    console.log(' OG:', r.og);
    console.log(' Imgs:', r.imgs);
  }
}

run();
