const https = require('https');
const fs = require('fs');
const path = require('path');

const wedvoCards = require('./parse_wedvo_cards.js'); // Or require catalog
const rootDir = path.join(__dirname, '..');
const imgDir = path.join(rootDir, 'assets', 'img', 'wedvo');
if (!fs.existsSync(imgDir)) fs.mkdirSync(imgDir, { recursive: true });

const slugs = [
  'wedding-journey',
  'palace-envelope-hindu',
  'rajwada',
  'royal-envelope',
  'ram-mandir',
  'palace-door',
  'mangal-mandap',
  'ivory-lace',
  'royal-entrance',
  'blush-theme',
  'rose-seal',
  'sage-garden',
  'haveli-utsav',
  'royal-maroon',
  'palace-envelope',
  'shwet-kamal',
  'swarna-pothi',
  'grace-chapel',
  'emerald-vow',
  'phulkari-courtyard',
  'anand-karaj',
  'sunehri-shaam',
  'muslim-heirloom',
  'burgundy-letter',
  'blossom-oud',
  'noor-mahal',
  'sukoon',
  'gulzar',
  'shahi-mahal',
  'champagne-lace',
  'pearl-peony',
  'gulbahar'
];

function downloadThumb(slug) {
  return new Promise((resolve) => {
    const targetFile = path.join(imgDir, `${slug}.jpg`);
    if (fs.existsSync(targetFile) && fs.statSync(targetFile).size > 1000) {
      resolve({ slug, cached: true });
      return;
    }
    const url = `https://wedvo.in/themes/${slug}/thumb.jpg`;
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        const fileStream = fs.createWriteStream(targetFile);
        res.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          resolve({ slug, success: true, size: fs.statSync(targetFile).size });
        });
      } else {
        // Fallback to placeholder if thumb.jpg not found
        resolve({ slug, success: false, status: res.statusCode });
      }
    }).on('error', e => resolve({ slug, success: false, error: e.message }));
  });
}

async function run() {
  console.log(`Downloading thumbnails for ${slugs.length} Wedvo templates...`);
  for (const s of slugs) {
    const r = await downloadThumb(s);
    if (r.cached) {
      console.log(`Cached: ${s}`);
    } else if (r.success) {
      console.log(`Downloaded: ${s} (${r.size} bytes)`);
    } else {
      console.log(`Failed to download thumb for ${s}: ${r.status || r.error}`);
    }
  }
  console.log('All thumbnails processed!');
}

run();
