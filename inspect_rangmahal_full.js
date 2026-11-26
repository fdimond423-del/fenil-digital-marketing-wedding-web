const fs = require('fs');
const rangmahal = fs.readFileSync('templates/rangmahal/index.html', 'utf8');
console.log('Top 1200 chars:');
console.log(rangmahal.slice(0, 1200));
console.log('\nBottom 1200 chars:');
console.log(rangmahal.slice(-1200));
