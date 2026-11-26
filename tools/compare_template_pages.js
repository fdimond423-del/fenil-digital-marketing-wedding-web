const fs = require('fs');

const rmHtml = fs.readFileSync('templates/rangmahal/index.html', 'utf8');
const heroSection = rmHtml.match(/<section class="tmpl-hero"[\s\S]*?<\/section>/i);
if (heroSection) {
  console.log('--- Rangmahal Hero Section ---');
  console.log(heroSection[0]);
}

const nrHtml = fs.readFileSync('templates/nikhilandrinki/index.html', 'utf8');
const nrHero = nrHtml.match(/<section class="tmpl-hero"[\s\S]*?<\/section>/i);
if (nrHero) {
  console.log('\n--- Nikhil & Rinki Hero Section ---');
  console.log(nrHero[0].slice(0, 1000));
}
