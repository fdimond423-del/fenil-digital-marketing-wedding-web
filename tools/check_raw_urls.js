const fs = require('fs');

const raw = fs.readFileSync('demos/aaravandmeera-mussoorie/raw.html', 'utf8');

// Check // protocol-relative URLs
const protocolRelative = [...raw.matchAll(/src=["'](\/\/[^"']+)["']/gi)].map(m => m[1]);
console.log('Protocol relative srcs in raw.html:', protocolRelative.length);
console.log('Sample:', protocolRelative.slice(0, 5));

// Check if any links point to vishakhacollections.com
const vishakhaLinks = [...raw.matchAll(/href=["'](https?:\/\/vishakhacollections\.com[^"']*|\/pages\/wedding\/[^"']*)["']/gi)].map(m => m[1]);
console.log('Vishakha links in raw.html:', vishakhaLinks);
