const fs = require('fs');

const rmHtml = fs.readFileSync('templates/rangmahal/index.html', 'utf8');

// Find all sections in Rangmahal
const sections = [...rmHtml.matchAll(/<section[^>]*>([\s\S]*?)<\/section>/gi)];
console.log('Rangmahal has', sections.length, 'sections:');
sections.forEach((s, i) => {
  console.log(`\n=== Section ${i + 1} ===`);
  console.log(s[0].slice(0, 500));
});
