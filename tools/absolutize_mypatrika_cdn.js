const fs = require('fs');
const path = require('path');

const patrikaDirs = fs.readdirSync('demos').filter(d => d.startsWith('patrika-'));

for (const d of patrikaDirs) {
  const p = path.join('demos', d, 'index.html');
  let content = fs.readFileSync(p, 'utf8');

  // Replace /all-invite/ with https://mypatrika.in/all-invite/
  content = content.replace(/(href|src|poster)=["']\/all-invite\/([^"']*)["']/gi, '$1="https://mypatrika.in/all-invite/$2"');
  // Also any other /assets or /themes
  content = content.replace(/(href|src|poster)=["']\/themes\/([^"']*)["']/gi, '$1="https://mypatrika.in/themes/$2"');

  fs.writeFileSync(p, content, 'utf8');
}

console.log(`Replaced all /all-invite/ and /themes/ in ${patrikaDirs.length} patrika demo files!`);
