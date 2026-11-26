const fs = require('fs');
const path = require('path');

const wedvoHtml = fs.readFileSync(path.join(__dirname, 'dump_wedvo.html'), 'utf8');

// Match template links or cards
const regex = /href=["'][^"']*preview\/([a-z0-9-]+)["'][^>]*>([\s\S]*?)<\/a>/gi;
let match;
const found = {};

while ((match = regex.exec(wedvoHtml)) !== null) {
  const slug = match[1];
  const inner = match[2];
  const imgMatch = inner.match(/src=["']([^"']+)["']/i);
  const titleMatch = inner.match(/<h[2-6][^>]*>([^<]+)<\/h[2-6]>/i) || inner.match(/class=["'][^"']*title[^"']*["'][^>]*>([^<]+)</i);
  found[slug] = {
    img: imgMatch ? imgMatch[1] : null,
    title: titleMatch ? titleMatch[1].trim() : null
  };
}

console.log('Found templates from dump_wedvo.html:', Object.keys(found).length);
console.log(JSON.stringify(found, null, 2));
