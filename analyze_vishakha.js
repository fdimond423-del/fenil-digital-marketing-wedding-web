const fs = require('fs');
const path = require('path');

const sampleHtml = fs.readFileSync('demos/aaravandmeera-mussoorie/raw.html', 'utf8');

console.log('Sample length:', sampleHtml.length);
console.log('Has shopify:', sampleHtml.includes('cdn.shopify.com'));
console.log('Has iframe:', sampleHtml.includes('<iframe'));

// Find scripts
const scripts = [...sampleHtml.matchAll(/<script\s+[^>]*src=["']([^"']+)["']/gi)].map(m => m[1]);
console.log('\nScripts sample:', scripts.slice(0, 10));

// Find stylesheets
const links = [...sampleHtml.matchAll(/<link\s+[^>]*href=["']([^"']+)["']/gi)].map(m => m[1]);
console.log('\nLinks sample:', links.filter(l => l.includes('.css')).slice(0, 10));

// Find main wrapper or wedding sections
const headings = [...sampleHtml.matchAll(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
console.log('\nHeadings sample:', headings.slice(0, 15));

// Check if there is an iframe or full page embedded
const iframes = [...sampleHtml.matchAll(/<iframe\s+[^>]*src=["']([^"']+)["']/gi)].map(m => m[1]);
console.log('\nIframes found:', iframes);
