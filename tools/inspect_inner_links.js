const fs = require('fs');

const html = fs.readFileSync('tools/sample_theme_inner.html', 'utf8');
const links = [...html.matchAll(/(href|src)=["']([^"']+)["']/gi)].map(m => m[2]);
console.log('Total links/srcs in theme:', links.length);
links.forEach(l => console.log(l));
