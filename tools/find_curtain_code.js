const fs = require('fs');

const html = fs.readFileSync('tools/sample_theme_inner.html', 'utf8');

const introLines = html.split('\n').filter(l => l.includes('intro') || l.includes('curtain'));
console.log('Lines mentioning intro or curtain in sample_theme_inner.html:');
introLines.forEach(l => console.log(l));
