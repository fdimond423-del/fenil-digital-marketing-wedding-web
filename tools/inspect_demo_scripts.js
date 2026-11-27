const fs = require('fs');

const html = fs.readFileSync('tools/sample_mypatrika_demo.html', 'utf8');
const scripts = [...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/gi)];

console.log('Total scripts in demo outer page:', scripts.length);
scripts.forEach((s, i) => {
  const src = (s[0].match(/src=["']([^"']+)["']/i) || [])[1];
  console.log(`Script ${i}: src=${src}`);
  if (s[1] && s[1].length < 1000) console.log(s[1].trim());
});
