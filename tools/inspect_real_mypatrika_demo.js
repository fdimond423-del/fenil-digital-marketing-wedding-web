const fs = require('fs');

const html = fs.readFileSync('tools/sample_mypatrika_demo.html', 'utf8');

// Find the iframe container and everything inside body
console.log('--- sample_mypatrika_demo.html structure ---');
console.log('Header/Navigation:');
const headerMatch = html.match(/<header[\s\S]*?<\/header>/i);
console.log(headerMatch ? headerMatch[0] : 'No header');

console.log('\nMain iframe container:');
const iframeContainer = html.match(/<main[\s\S]*?<\/main>|<div class="[^"]*h-\[100dvh\][^"]*"[\s\S]*?<\/iframe>[\s\S]*?<\/div>/i);
if (iframeContainer) {
  console.log(iframeContainer[0].slice(0, 1500));
}
