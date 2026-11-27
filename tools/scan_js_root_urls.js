const fs = require('fs');
const path = require('path');

function checkJs(dir) {
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, f.name);
    if (f.isDirectory() && f.name !== '.git' && f.name !== 'node_modules') {
      checkJs(full);
    } else if (f.name.endsWith('.js') && !full.startsWith('tools')) {
      const content = fs.readFileSync(full, 'utf8');
      const rootMatches = [...content.matchAll(/['"]\/(assets|demos|templates|contact|blog)[^'"]*['"]/g)].map(m => m[0]);
      if (rootMatches.length > 0) {
        console.log(`${full}:`, rootMatches.slice(0, 10));
      }
    }
  }
}

checkJs('.');
