const fs = require('fs');
const path = require('path');

function checkCompatScript(dir) {
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, f.name);
    if (f.isDirectory() && f.name !== '.git' && f.name !== 'node_modules') {
      checkCompatScript(full);
    } else if (f.name.endsWith('.html')) {
      const content = fs.readFileSync(full, 'utf8');
      if (content.includes('location.hostname.endsWith(\'github.io\')')) {
        console.log('Compat script found in:', full);
      }
    }
  }
}

checkCompatScript('.');
