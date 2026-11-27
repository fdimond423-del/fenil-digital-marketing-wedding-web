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
const leadingRegex = /(href|src|poster)=["']\/([^"']*)["']/g;

for (const file of allHtml) {
  const content = fs.readFileSync(file, 'utf8');
  let match;
  while ((match = leadingRegex.exec(content)) !== null) {
    if (!match[2].startsWith('/')) { // not // protocol relative
      console.log(`${file}: ${match[0]}`);
    }
  }
}
