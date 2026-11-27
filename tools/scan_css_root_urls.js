const fs = require('fs');
const path = require('path');

function checkCss(dir) {
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, f.name);
    if (f.isDirectory() && f.name !== '.git' && f.name !== 'node_modules') {
      checkCss(full);
    } else if (f.name.endsWith('.css')) {
      const content = fs.readFileSync(full, 'utf8');
      const rootUrls = [...content.matchAll(/url\((['"]?)\/([^)'"]+)\1\)/g)].map(m => m[2]);
      if (rootUrls.length > 0) {
        console.log(`${full}: ${rootUrls.length} root URLs ->`, rootUrls);
      }
    }
  }
}

checkCss('.');
