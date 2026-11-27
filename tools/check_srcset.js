const fs = require('fs');

const content = fs.readFileSync('demos/capela/index.html', 'utf8');
const srcsets = [...content.matchAll(/srcset=["']([^"']+)["']/gi)].map(m => m[1]);
console.log('demos/capela/index.html srcsets:', srcsets.slice(0, 5));
