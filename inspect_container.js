const fs = require('fs');

const html = fs.readFileSync('demos/aaravandmeera-mussoorie/raw.html', 'utf8');

// Check main content or custom sections
const mainMatch = html.match(/<main[\s\S]*?<\/main>/i);
if (mainMatch) {
  console.log('Found <main>: length =', mainMatch[0].length);
  console.log('Main snippet:', mainMatch[0].slice(0, 1500));
} else {
  console.log('No <main> tag found');
}

// Check header / footer
console.log('Has <header>:', /<header[\s\S]*?<\/header>/i.test(html));
console.log('Has <footer>:', /<footer[\s\S]*?<\/footer>/i.test(html));

// Check any wedding specific CSS or script tags inside
const inlineStyles = [...html.matchAll(/<style[\s\S]*?<\/style>/gi)].map(m => m[0]);
console.log('Inline style tags count:', inlineStyles.length);
console.log('Total inline styles length:', inlineStyles.reduce((acc, s) => acc + s.length, 0));
