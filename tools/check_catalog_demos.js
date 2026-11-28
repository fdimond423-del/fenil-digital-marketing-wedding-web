const fs = require('fs');
const path = require('path');

const indexHtml = fs.readFileSync('index.html', 'utf8');
const demoLinks = [...indexHtml.matchAll(/href=["'](demos\/[^"'#]+)/g)].map(m => m[1]);
const uniqueDemoLinks = [...new Set(demoLinks)];
console.log('Unique demo links found in index.html:', uniqueDemoLinks.length);
console.log(JSON.stringify(uniqueDemoLinks, null, 2));

// For each unique demo, check if its directory exists, has index.html, and if any local assets are missing
let missingAssets = [];
for (const link of uniqueDemoLinks) {
  let demoDir = link.replace(/\/index\.html$/, '').replace(/\/$/, '');
  const dirPath = path.resolve(demoDir);
  if (!fs.existsSync(dirPath)) {
    console.log(`Directory does not exist: ${demoDir}`);
    continue;
  }
  const files = fs.readdirSync(dirPath);
  for (const f of files) {
    if (f.endsWith('.html') || f.endsWith('.js') || f.endsWith('.css')) {
      const content = fs.readFileSync(path.join(dirPath, f), 'utf8');
      // check assets
      const assetMatches = [...content.matchAll(/(?:src|href|url)\s*[:=\(]\s*['"]?(assets\/[^'"\)\s>]+)/g)];
      for (const m of assetMatches) {
        let rel = m[1].replace(/['"]/g, '');
        rel = rel.split('?')[0].split('#')[0];
        const targetPath = path.join(dirPath, rel);
        if (!fs.existsSync(targetPath)) {
          missingAssets.push({ demo: demoDir, file: f, asset: rel });
        }
      }
    }
  }
}

console.log('Missing assets in CATALOG demos:', missingAssets.length);
if (missingAssets.length > 0) {
  console.log(JSON.stringify(missingAssets, null, 2));
} else {
  console.log('ALL CATALOG DEMOS HAVE 100% ASSETS AVAILABLE!');
}
