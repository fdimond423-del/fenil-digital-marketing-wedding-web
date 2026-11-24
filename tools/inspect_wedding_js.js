const fs = require('fs');

const html = fs.readFileSync('demos/aaravandmeera-mussoorie/raw.html', 'utf8');

// Find all script tags that have inline content
const inlineScripts = [...html.matchAll(/<script(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/gi)].map(m => m[1]);
console.log('Inline script count:', inlineScripts.length);
inlineScripts.forEach((sc, i) => {
  if (sc.includes('countdown') || sc.includes('canvas') || sc.includes('reveal') || sc.includes('Audio') || sc.includes('music')) {
    console.log(`\n--- INLINE SCRIPT ${i} (Wedding JS) ---`);
    console.log(sc.slice(0, 1000));
  }
});

// Check if there is a music audio element or player
console.log('\nHas <audio>:', /<audio[\s\S]*?<\/audio>/i.test(html));
const audioMatches = [...html.matchAll(/<(?:audio|source)[^>]*src=["']([^"']+)["']/gi)].map(m => m[1]);
console.log('Audio sources:', audioMatches);
