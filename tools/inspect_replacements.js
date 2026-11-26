const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    if (file === 'node_modules' || file === '.git' || file === 'tools') return;
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) results = results.concat(walk(fullPath));
    else if (file.endsWith('.html') || file.endsWith('.js')) results.push(fullPath);
  });
  return results;
}

const files = walk(__dirname);
console.log('Total files to check:', files.length);

let logoFound = 0;
let payFound = 0;
let refundFound = 0;

for (const f of files) {
  const content = fs.readFileSync(f, 'utf8');
  if (content.includes('logo-mark') || content.includes('Knot<em>link</em>')) logoFound++;
  if (content.includes('pay-buy') || content.includes('Secured by Razorpay')) payFound++;
  if (content.includes('/refund/')) refundFound++;
}

console.log(`Files with old logo: ${logoFound}`);
console.log(`Files with payment badges: ${payFound}`);
console.log(`Files with refund link: ${refundFound}`);
