const fs = require('fs');

const code = fs.readFileSync('demos/rangmahal/main.js', 'utf8');

['inner.webp', 'ganesha.webp', 'frame.webp', 'toran.webp', 'dusk.webp'].forEach(img => {
  const idx = code.indexOf(img);
  if (idx !== -1) {
    console.log(`=== ${img} ===`);
    console.log(code.slice(Math.max(0, idx - 150), Math.min(code.length, idx + 150)));
  }
});
