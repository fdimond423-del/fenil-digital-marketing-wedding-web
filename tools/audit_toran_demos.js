const fs = require('fs');
const path = require('path');

const toranDemos = fs.readdirSync('demos').filter(d => d.startsWith('toran-'));
console.log('Toran demos found:', toranDemos.length);
let missing = 0;
for (const td of toranDemos) {
  const p = path.join('demos', td, 'index.html');
  if (!fs.existsSync(p)) {
    console.log('Missing index.html in', td);
    missing++;
    continue;
  }
  const html = fs.readFileSync(p, 'utf8');
  const imgMatches = [...html.matchAll(/src=["']([^"']+)["']/g)].map(m => m[1]);
  for (const src of imgMatches) {
    if (!src.startsWith('http') && !src.startsWith('data:')) {
      const fullPath = path.resolve('demos', td, src);
      if (!fs.existsSync(fullPath)) {
        console.log(`[Toran missing in ${td}] ${src}`);
        missing++;
      }
    }
  }
}
console.log('Total Toran demo missing images:', missing);
