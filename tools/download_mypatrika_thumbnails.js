const https = require('https');
const fs = require('fs');
const path = require('path');

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

const destDir = path.resolve('assets/img/mypatrika');
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

function download(slug) {
  return new Promise((resolve, reject) => {
    const url = `https://mypatrika.in/thumbnails/${slug}.jpg`;
    const dest = path.join(destDir, `${slug}.jpg`);
    const file = fs.createWriteStream(dest);

    https.get(url, res => {
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to download ${slug}: ${res.statusCode}`));
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => {
          console.log(`Downloaded: ${slug}.jpg (${fs.statSync(dest).size} bytes)`);
          resolve();
        });
      });
    }).on('error', err => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function run() {
  console.log('Downloading 11 MyPatrika thumbnails...');
  for (const s of slugs) {
    await download(s);
  }
  console.log('All 11 thumbnails successfully downloaded to assets/img/mypatrika/!');
}

run();
