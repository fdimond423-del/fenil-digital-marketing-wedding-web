const fs = require('fs');
const path = require('path');

const indexHtml = fs.readFileSync('index.html', 'utf8');
const imgMatches = [...indexHtml.matchAll(/<img[^>]+src=["']([^"']+)["']/gi)].map(m => m[1]);
console.log('Total img tags in index.html:', imgMatches.length);

let totalBytes = 0;
const largeImages = [];

for (const src of imgMatches) {
  const clean = src.split('?')[0];
  if (fs.existsSync(clean)) {
    const size = fs.statSync(clean).size;
    totalBytes += size;
    if (size > 150 * 1024) {
      largeImages.push({ src: clean, size: (size / 1024).toFixed(1) + ' KB' });
    }
  } else {
    console.log('Missing image:', clean);
  }
}

console.log('Total image payload on index.html:', (totalBytes / (1024 * 1024)).toFixed(2), 'MB');
console.log(`Images over 150 KB (${largeImages.length}):`);
largeImages.forEach(img => console.log(`  ${img.src}: ${img.size}`));
