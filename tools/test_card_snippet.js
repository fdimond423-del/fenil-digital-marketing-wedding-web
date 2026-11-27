const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const index = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf8');
console.log('Contains "View template":', index.includes('View template'));
const sample = index.match(/<article class="card"[\s\S]*?<\/article>/);
console.log('\nSample card:');
console.log(sample ? sample[0] : 'None');
