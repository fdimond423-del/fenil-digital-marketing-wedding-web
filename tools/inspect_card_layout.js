const fs = require('fs');

const css = fs.readFileSync('assets/css/store.css', 'utf8');

// Find .grid and .card definitions
const gridCss = css.match(/\.grid[\s\S]*?}/gi);
console.log('--- .grid CSS ---');
console.log(gridCss);

const cardCss = css.match(/\.card[\s\S]*?}/gi);
console.log('\n--- .card CSS (first 5) ---');
console.log(cardCss ? cardCss.slice(0, 5) : 'None');

// Check the HTML of one of the original cards (e.g. Rangmahal) vs the new cards in index.html
const html = fs.readFileSync('index.html', 'utf8');
const firstCard = html.match(/<article class="card"[^>]*>[\s\S]*?<\/article>/i);
console.log('\n--- First Card HTML (Rangmahal) ---');
console.log(firstCard ? firstCard[0] : 'None');

// Check the 12th card (Nikhil & Rinki)
const cards = [...html.matchAll(/<article class="card"[^>]*>[\s\S]*?<\/article>/gi)].map(m => m[0]);
console.log('\n--- Total cards in index.html ---', cards.length);
console.log('\n--- 12th Card HTML (Nikhil & Rinki) ---');
console.log(cards[11]);
