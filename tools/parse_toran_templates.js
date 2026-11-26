const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, 'dump_toran_fresh.html'), 'utf8');

// Find all sample links and their surrounding context
const sampleRegex = /<a[^>]+href=["'](\/sample\/[^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
let match;
const samples = [];

while ((match = sampleRegex.exec(html)) !== null) {
  const url = match[1];
  const inner = match[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  samples.push({ url: `https://toran.ink${url}`, path: url, text: inner });
}

console.log('Sample links found with text:');
samples.forEach((s, idx) => console.log(`${idx + 1}. [${s.path}] -> "${s.text}"`));

// Also let's inspect the sections in dump_toran_fresh.html
// Look for headings, ceremony categories, themes
console.log('\n--- Checking Sections / Headings in Toran ---');
const headings = [...html.matchAll(/<h[1-4][^>]*>([\s\S]*?)<\/h[1-4]>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
console.log(headings);
