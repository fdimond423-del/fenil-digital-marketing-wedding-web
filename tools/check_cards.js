const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');
const cards = [...html.matchAll(/<article class="card"[^>]*>([\s\S]*?)<\/article>/gi)];
console.log('Total cards found in index.html:', cards.length);

cards.forEach((c, i) => {
  const h3Match = c[1].match(/<h3[^>]*>([\s\S]*?)<\/h3>/i);
  const h3 = h3Match ? h3Match[1].replace(/<[^>]+>/g, '').trim() : 'No H3';
  const catMatch = c[0].match(/data-cat="([^"]+)"/i);
  const cat = catMatch ? catMatch[1] : 'No Cat';
  console.log(`Card ${i + 1}: [${cat}] ${h3}`);
});

// Check where the grid is in index.html
const gridMatch = html.match(/<div class="grid"[^>]*>([\s\S]*?)<\/div>/i);
if (gridMatch) {
  console.log('Found div.grid, inner card count:', (gridMatch[1].match(/<article/g) || []).length);
} else {
  console.log('div.grid not found!');
}

// Check where the section#templates ends and where cards are placed
const tmplSection = html.match(/<section id="templates"[\s\S]*?<\/section>/i);
if (tmplSection) {
  console.log('Templates section length:', tmplSection[0].length);
  // Check if cards are inside .grid or outside .grid
  const insideGrid = tmplSection[0].includes('class="grid"');
  console.log('Has class="grid":', insideGrid);
}
