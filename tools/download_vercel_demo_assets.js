const fs = require('fs');
const path = require('path');
const https = require('https');

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const dir = path.dirname(dest);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    const file = fs.createWriteStream(dest);
    https.get(url, res => {
      if (res.statusCode === 200) {
        res.pipe(file);
        file.on('finish', () => {
          file.close(() => resolve(true));
        });
      } else {
        file.close();
        if (fs.existsSync(dest)) fs.unlinkSync(dest);
        resolve(false);
      }
    }).on('error', err => {
      file.close();
      if (fs.existsSync(dest)) fs.unlinkSync(dest);
      resolve(false);
    });
  });
}

async function fixVercelDemos() {
  const map = {
    'phulkari': 'https://phulkari-invite-demo.vercel.app',
    'kolam': 'https://kolam-invite-demo.vercel.app',
    'noor': 'https://noor-invite-demo.vercel.app',
    'capela': 'https://capela-invite-demo.vercel.app',
    'pichola': 'https://pichola-invite-demo.vercel.app'
  };

  for (const [name, origin] of Object.entries(map)) {
    console.log(`Fixing ${name}...`);
    const demoDir = path.resolve('demos', name);
    const files = fs.readdirSync(demoDir);
    let needed = new Set();
    for (const f of files) {
      if (f.endsWith('.html') || f.endsWith('.js') || f.endsWith('.css')) {
        const content = fs.readFileSync(path.join(demoDir, f), 'utf8');
        const matches = [...content.matchAll(/(?:assets\/(?:art|fonts|audio|img)\/[^'"\)\s,>]+)/g)].map(m => m[0]);
        matches.forEach(m => needed.add(m));
      }
    }

    for (const rel of needed) {
      const localPath = path.join(demoDir, rel);
      if (!fs.existsSync(localPath)) {
        const url = `${origin}/${rel}`;
        const ok = await download(url, localPath);
        console.log(`  [${name}] ${rel} -> ${ok ? 'DOWNLOADED' : 'FAILED: ' + url}`);
      }
    }
  }
}

fixVercelDemos().then(() => console.log('Finished Vercel demos download!'));
