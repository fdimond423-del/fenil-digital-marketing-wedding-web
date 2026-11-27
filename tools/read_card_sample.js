const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');
const cardMatch = html.match(/<article class="card[^"]*"[^>]*>[\s\S]*?<\/article>/i);
console.log('Sample card HTML:');
console.log(cardMatch ? cardMatch[0] : 'Not found');
