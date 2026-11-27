const fs = require('fs');

const tmpl = fs.readFileSync('templates/toran-mehndi-sage/index.html', 'utf8');
const imgsInTmpl = [...tmpl.matchAll(/<img[^>]+>/gi)].map(m => m[0]);
console.log('Images in templates/toran-mehndi-sage/index.html:');
imgsInTmpl.forEach(img => console.log(' - ' + img));

const index = fs.readFileSync('index.html', 'utf8');
const cardMatch = index.match(/<article[^>]*>[\s\S]*?toran-mehndi-sage[\s\S]*?<\/article>/i);
console.log('\nCard in index.html:');
console.log(cardMatch ? cardMatch[0] : 'Card not found');
