const fs = require('fs');

const html = fs.readFileSync('tools/sample_theme_inner.html', 'utf8');

console.log('HTML length:', html.length);
console.log('Body tag:', (html.match(/<body[^>]*>/i) || [])[0]);
console.log('Main/container tags:', [...html.matchAll(/<(main|section|div)[^>]+class=["']([^"']*)["']/gi)].slice(0, 15).map(m => `<${m[1]} class="${m[2]}">`));

// Check intro / curtain / loader
const introMatches = [...html.matchAll(/class=["'][^"']*(intro|curtain|loader|stage|swipe|scroll)[^"']*["']/gi)].map(m => m[0]);
console.log('Intro/curtain/stage/scroll classes:', introMatches.slice(0, 15));

// Check any scripts that handle scroll or touch
const scripts = [...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/gi)];
console.log('Total scripts:', scripts.length);
scripts.forEach((s, i) => {
  const src = (s[0].match(/src=["']([^"']+)["']/i) || [])[1];
  console.log(`Script ${i}: src=${src}`);
  if (s[1] && s[1].length < 500) console.log(s[1].trim());
});
