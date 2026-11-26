const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, 'dump_toran_fresh.html'), 'utf8');

// Find all anchor tags that link to samples or previews or designs
const anchors = [];
const aRegex = /<a[^>]+href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
let m;
while ((m = aRegex.exec(html)) !== null) {
  const href = m[1];
  const text = m[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  if (href.includes('/sample/') || href.includes('sample') || href.includes('/t/') || href.includes('preview')) {
    anchors.push({ href, text });
  }
}

console.log('Sample anchors on templates page:', anchors.length);
anchors.forEach((a, i) => console.log(`${i + 1}. [${a.href}] -> "${a.text}"`));

// Also let's check all ids or sections on toran.ink/templates
const sections = [...html.matchAll(/id=["']([^"']+)["']/gi)].map(m => m[1]);
console.log('\nSections on templates page:', sections);
