const fs = require('fs');

const rm = fs.readFileSync('templates/rangmahal/index.html', 'utf8');

// Find nav header
const navMatch = rm.match(/<header class="nav"[\s\S]*?<\/header>/i);
if (navMatch) {
  console.log('--- Rangmahal nav header ---');
  console.log(navMatch[0]);
}

// Find any occurrence of Knotlink or knot in nav
const knotMatches = [...rm.matchAll(/knot[a-z0-9_-]*/gi)].map(m => m[0]);
console.log('Knot matches count:', knotMatches.length);
console.log('Unique knot matches:', [...new Set(knotMatches)]);
