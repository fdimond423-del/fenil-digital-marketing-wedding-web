const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const file = path.join(rootDir, 'templates', 'toran-mehndi-sage', 'index.html');
const content = fs.readFileSync(file, 'utf8');

const regex = /<img[^>]+src=["']([^"']+)["']/gi;
let match;
console.log('Images in templates/toran-mehndi-sage/index.html:');
while ((match = regex.exec(content)) !== null) {
  const src = match[1];
  const local = path.join(rootDir, src.startsWith('/') ? src.slice(1) : src);
  const exists = src.startsWith('http') || fs.existsSync(local);
  console.log(` - ${src} (exists: ${exists})`);
}
