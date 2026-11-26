const fs = require('fs');

const html = fs.readFileSync('demos/aaravandmeera-mussoorie/index.html', 'utf8');
const gateCss = html.match(/#gate[\s\S]*?}/gi);
console.log('Gate CSS matches:', gateCss);
