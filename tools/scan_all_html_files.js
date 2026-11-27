const fs = require('fs');
const path = require('path');

function getHtmlFiles(dir, list = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== '.git' && entry.name !== 'node_modules') {
        getHtmlFiles(full, list);
      }
    } else if (entry.name.endsWith('.html')) {
      list.push(full);
    }
  }
  return list;
}

const allHtml = getHtmlFiles('.');
console.log(`Found ${allHtml.length} HTML files.`);

let totalLeadingSlashes = 0;
const leadingRegex = /(href|src|poster)=["']\/([^"']*)["']/g;

for (const file of allHtml) {
  const content = fs.readFileSync(file, 'utf8');
  let match;
  let count = 0;
  while ((match = leadingRegex.exec(content)) !== null) {
    count++;
  }
  if (count > 0) {
    totalLeadingSlashes += count;
  }
}

console.log(`Total leading slashes across all ${allHtml.length} HTML files: ${totalLeadingSlashes}`);
