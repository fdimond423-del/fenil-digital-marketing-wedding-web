const fs = require('fs');

const indexHtml = fs.readFileSync('index.html', 'utf8');
const leadingSlashRegex = /(href|src|poster)=["']\/([^"']*)["']/g;

let count = 0;
let match;
const found = new Set();
while ((match = leadingSlashRegex.exec(indexHtml)) !== null) {
  count++;
  found.add(match[2]);
}

console.log(`index.html has ${count} attributes with leading slash:`);
console.log(Array.from(found).slice(0, 30));
