const fs = require('fs');
const path = require('path');

const html = fs.readFileSync('knotlink_raw.html', 'utf8');

// Find all href
const hrefMatches = [...html.matchAll(/href=["']([^"']+)["']/gi)].map(m => m[1]);
console.log('=== ALL HREF LINKS (' + hrefMatches.length + ') ===');
console.log([...new Set(hrefMatches)]);

// Find all src
const srcMatches = [...html.matchAll(/src=["']([^"']+)["']/gi)].map(m => m[1]);
console.log('\n=== ALL SRC ASSETS (' + srcMatches.length + ') ===');
console.log([...new Set(srcMatches)]);

// Find all headings
const headings = [...html.matchAll(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
console.log('\n=== HEADINGS (' + headings.length + ') ===');
console.log(headings);

// Check sitemap / robots if possible
