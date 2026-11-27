const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');
const scripts = [...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/gi)];
console.log('Total scripts in index.html:', scripts.length);
scripts.forEach((s, i) => {
  const src = (s[0].match(/src=["']([^"']+)["']/i) || [])[1];
  console.log(`Script ${i}: src=${src} inlineLen=${s[1].length}`);
  if (s[1].length > 0 && s[1].length < 1500) {
    console.log('--- CONTENT ---');
    console.log(s[1].trim());
    console.log('---------------');
  }
});
