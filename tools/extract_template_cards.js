const fs = require('fs');

console.log('--- FOROUR.DAY DEEP INSPECTION ---');
const fo = fs.readFileSync('tools/dump_forourday.html', 'utf8');
const foCards = [...fo.matchAll(/<a[^>]*href=["'](\/templates\/[^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)];
console.log('Forour.day template cards count:', foCards.length);
foCards.slice(0, 15).forEach((c, i) => {
  const title = c[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const imgMatch = c[2].match(/src=["']([^"']+)["']/i);
  console.log(`[FO ${i+1}] ${c[1]} => "${title}" | img: ${imgMatch ? imgMatch[1].slice(0, 60) : 'none'}`);
});

console.log('\n--- MYPATRIKA.IN DEEP INSPECTION ---');
const mp = fs.readFileSync('tools/dump_mypatrika.html', 'utf8');
const mpCards = [...mp.matchAll(/href=["'](\/demo\/[^"']+)["']/gi)].map(m => m[1]);
console.log('MyPatrika demos:', [...new Set(mpCards)]);

console.log('\n--- TORAN.INK DEEP INSPECTION ---');
const to = fs.readFileSync('tools/dump_toran.html', 'utf8');
const toImgs = [...to.matchAll(/src=["']([^"']+)["']/gi)].map(m => m[1]);
console.log('Toran img count:', toImgs.length);
const toH3 = [...to.matchAll(/<h[2-4][^>]*>([\s\S]*?)<\/h[2-4]>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
console.log('Toran headings:', toH3.slice(0, 10));

console.log('\n--- WEDVO.IN DEEP INSPECTION ---');
const we = fs.readFileSync('tools/dump_wedvo.html', 'utf8');
const weMatches = [...we.matchAll(/(?:href|src|data-preview)=["']([^"']+)["']/gi)].map(m => m[1]);
console.log('Wedvo preview links:', weMatches.filter(m => m.includes('preview') || m.includes('template') || m.includes('demo')).slice(0, 10));
