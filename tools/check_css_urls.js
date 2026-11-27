const fs = require('fs');

const css = fs.readFileSync('assets/css/store.css', 'utf8');
const urls = [...css.matchAll(/url\((['"]?)([^)'"]+)\1\)/g)].map(m => m[2]);
console.log('Total URLs in store.css:', urls.length);
urls.forEach(u => console.log(u));
