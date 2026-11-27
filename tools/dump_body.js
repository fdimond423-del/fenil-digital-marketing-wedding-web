const fs = require('fs');

const html = fs.readFileSync('tools/sample_theme_inner.html', 'utf8');
const body = html.slice(html.indexOf('<body'));
console.log(body);
