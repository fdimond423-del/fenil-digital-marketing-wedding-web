const fs = require('fs');

const indexHtml = fs.readFileSync('index.html', 'utf8');
const totalCards = (indexHtml.match(/<article class="card/g) || []).length;
const patrikaImgs = fs.readdirSync('assets/img/mypatrika').length;
const patrikaDemos = fs.readdirSync('demos').filter(d => d.startsWith('patrika-')).length;
const patrikaTmpls = fs.readdirSync('templates').filter(d => d.startsWith('patrika-')).length;

console.log('Total Cards in index.html:', totalCards);
console.log('MyPatrika images in assets/img/mypatrika/:', patrikaImgs);
console.log('MyPatrika live demos in demos/:', patrikaDemos);
console.log('MyPatrika template pages in templates/:', patrikaTmpls);
