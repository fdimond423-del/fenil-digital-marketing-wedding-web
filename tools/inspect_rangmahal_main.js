const fs = require('fs');

const mainJs = fs.readFileSync('demos/rangmahal/main.js', 'utf8');

const lines = mainJs.split('\n');
lines.forEach((l, idx) => {
  if (l.includes('toran') || l.includes('facade') || l.includes('<img')) {
    console.log(`Line ${idx+1}: ${l}`);
  }
});
