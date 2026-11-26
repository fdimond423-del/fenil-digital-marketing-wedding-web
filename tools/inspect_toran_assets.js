const fs = require('fs');

const html = fs.readFileSync('tools/toran_sample_raw.html', 'utf8');

console.log('BASE:', (html.match(/<base[^>]*>/i) || [])[0]);
console.log('STYLESHEETS:', html.match(/<link[^>]+rel=["']stylesheet["'][^>]*>/gi));
console.log('SCRIPTS:', html.match(/<script[^>]*>[\s\S]*?<\/script>/gi));
console.log('IMAGES (first 5):', (html.match(/<img[^>]+src=["']([^"']+)["'][^>]*>/gi) || []).slice(0, 5));
console.log('SAMPLEBAR FULL:', (html.match(/<div class="samplebar">[\s\S]*?<\/div>/i) || [])[0]);
