const fs = require('fs');

const rmHtml = fs.readFileSync('templates/rangmahal/index.html', 'utf8');
const s1 = rmHtml.match(/<section class="tp-hero tex">[\s\S]*?<\/section>/i);
if (s1) {
  console.log('--- Rangmahal Section 1 Full ---');
  console.log(s1[0]);
}
