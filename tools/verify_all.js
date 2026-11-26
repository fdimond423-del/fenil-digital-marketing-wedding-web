const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');

function walkHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    if (file === 'node_modules' || file === '.git' || file === 'tools') return;
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) results = results.concat(walkHtmlFiles(fullPath));
    else if (file.endsWith('.html')) results.push(fullPath);
  });
  return results;
}

const files = walkHtmlFiles(rootDir);
console.log(`Auditing ${files.length} HTML files...`);

let issues = [];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const rel = path.relative(rootDir, f);

  if (content.includes('6362240361')) {
    issues.push(`[Old Phone] ${rel}`);
  }
  if (content.includes('logo-mark') && content.includes('<circle cx="16" cy="16"')) {
    issues.push(`[Knotlink Golden Rings SVG] ${rel}`);
  }
  if (content.match(/href="\/refund\b/i)) {
    issues.push(`[Refund link] ${rel}`);
  }
  if (content.includes('Secured by Razorpay') || content.includes('pay-buy') || content.includes('pay-row')) {
    issues.push(`[Payment badge] ${rel}`);
  }
});

console.log('Audit Results:');
if (issues.length === 0) {
  console.log('PERFECT! No old phone, no old knotlink rings, no refund links, no payment badges found in any HTML file!');
} else {
  console.log(`Found ${issues.length} issues:`);
  issues.slice(0, 20).forEach(i => console.log(' - ' + i));
  if (issues.length > 20) console.log(`... and ${issues.length - 20} more`);
}
