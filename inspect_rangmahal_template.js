const fs = require('fs');

const rangmahal = fs.readFileSync('templates/rangmahal/index.html', 'utf8');
console.log('Rangmahal template page length:', rangmahal.length);

// Extract main sections
const sections = [...rangmahal.matchAll(/<section[\s\S]*?<\/section>/gi)].map(m => m[0]);
console.log('Number of sections in rangmahal page:', sections.length);
sections.forEach((s, i) => {
  const idMatch = s.match(/id=["']([^"']+)["']/i);
  const hMatch = s.match(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/i);
  console.log(`Section ${i}: id=${idMatch ? idMatch[1] : 'none'}, heading=${hMatch ? hMatch[1].replace(/<[^>]+>/g, '').trim() : 'none'}`);
});

// Check buy form in rangmahal
const formMatch = rangmahal.match(/<form[\s\S]*?<\/form>/i);
if (formMatch) {
  console.log('\nBuy Form Snippet:');
  console.log(formMatch[0].slice(0, 800));
}
