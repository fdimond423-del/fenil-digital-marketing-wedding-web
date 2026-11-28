const fs = require('fs');

const mainJs = fs.readFileSync('demos/rangmahal/main.js', 'utf8');
const cfgJs = fs.readFileSync('demos/rangmahal/config.js', 'utf8');
const styleCss = fs.readFileSync('demos/rangmahal/style.css', 'utf8');
const indexHtml = fs.readFileSync('demos/rangmahal/index.html', 'utf8');

const imgRegex = /(['"][^'"]*?\.(png|jpg|jpeg|webp|svg|gif)[^'"]*?['"])/gi;

function getMatches(text) {
  return [...new Set([...text.matchAll(imgRegex)].map(m => m[0]))];
}

console.log('Images in index.html:', getMatches(indexHtml));
console.log('Images in config.js:', getMatches(cfgJs));
console.log('Images in main.js:', getMatches(mainJs));
console.log('Images in style.css:', getMatches(styleCss));
