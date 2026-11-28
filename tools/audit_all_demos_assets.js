const fs = require('fs');
const path = require('path');

const demosDir = path.resolve('demos');
const demos = fs.readdirSync(demosDir).filter(d => fs.statSync(path.join(demosDir, d)).isDirectory());

console.log('Total demo directories to check:', demos.length);
let missingList = [];

for (const demo of demos) {
  const demoPath = path.join(demosDir, demo);
  const files = fs.readdirSync(demoPath);
  for (const f of files) {
    if (f.endsWith('.html') || f.endsWith('.js') || f.endsWith('.css')) {
      const content = fs.readFileSync(path.join(demoPath, f), 'utf8');
      const assetMatches = [...content.matchAll(/(?:src|href|url)\s*[:=\(]\s*['"]?(assets\/[^'"\)\s>]+)/g)];
      for (const m of assetMatches) {
        let rel = m[1].replace(/['"]/g, '');
        rel = rel.split('?')[0].split('#')[0];
        const targetPath = path.join(demoPath, rel);
        if (!fs.existsSync(targetPath)) {
          // check if exists in root assets/
          const inRoot = fs.existsSync(path.resolve(rel));
          missingList.push({ demo, file: f, asset: rel, existsInRoot: inRoot });
        }
      }
    }
  }
}

console.log('Total missing asset references:', missingList.length);
if (missingList.length > 0) {
  console.log(JSON.stringify(missingList, null, 2));
} else {
  console.log('✓ ALL demos have 100% of their referenced local assets in place!');
}
