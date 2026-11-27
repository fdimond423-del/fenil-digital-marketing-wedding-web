const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const indexHtml = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf8');

// Match all cards in index.html
const cardRegex = /<article class="card"[\s\S]*?<\/article>/gi;
const cards = indexHtml.match(cardRegex) || [];
console.log(`Checking images for all ${cards.length} cards in index.html...`);

const missing = [];
const existing = [];

cards.forEach((card, idx) => {
  const slugMatch = card.match(/href="\/templates\/([^\/"]+)\/"/i) || card.match(/href="\/demos\/([^\/"]+)\/"/i);
  const imgMatch = card.match(/<img[^>]+src="([^"]+)"/i);
  const titleMatch = card.match(/<h3>([^<]+)<\/h3>/i);

  const slug = slugMatch ? slugMatch[1] : `card-${idx}`;
  const title = titleMatch ? titleMatch[1] : slug;
  const imgSrc = imgMatch ? imgMatch[1] : null;

  if (!imgSrc) {
    missing.push({ slug, title, error: 'No img src tag found' });
    return;
  }

  // Check if file exists
  let localPath = path.join(rootDir, imgSrc.startsWith('/') ? imgSrc.slice(1) : imgSrc);
  if (!fs.existsSync(localPath)) {
    missing.push({ slug, title, imgSrc, localPath });
  } else {
    existing.push({ slug, title, imgSrc, size: fs.statSync(localPath).size });
  }
});

console.log(`\nExisting valid images: ${existing.length}`);
console.log(`Missing / broken images: ${missing.length}`);

if (missing.length > 0) {
  console.log('\nList of missing images:');
  missing.forEach(m => console.log(` - [${m.slug}] "${m.title}" -> ${m.imgSrc || m.error}`));
}
