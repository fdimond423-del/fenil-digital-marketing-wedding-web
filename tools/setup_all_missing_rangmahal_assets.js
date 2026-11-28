const fs = require('fs');
const path = require('path');

const artDir = path.resolve('demos/rangmahal/assets/art');
if (!fs.existsSync(artDir)) fs.mkdirSync(artDir, { recursive: true });

// 1. toran.webp
fs.copyFileSync('assets/img/toran.webp', path.join(artDir, 'toran.webp'));
console.log('✓ toran.webp copied, size:', fs.statSync(path.join(artDir, 'toran.webp')).size);

// 2. dusk.webp
fs.copyFileSync('assets/img/dusk.webp', path.join(artDir, 'dusk.webp'));
console.log('✓ dusk.webp copied, size:', fs.statSync(path.join(artDir, 'dusk.webp')).size);

// 3. inner.webp
fs.copyFileSync('demos/aaravandmeera-udaipur/assets/pg-palace-blur.webp', path.join(artDir, 'inner.webp'));
console.log('✓ inner.webp copied, size:', fs.statSync(path.join(artDir, 'inner.webp')).size);

// 4. frame.webp
fs.copyFileSync('demos/aaravandmeera-udaipur/assets/pg-frame.webp', path.join(artDir, 'frame.webp'));
console.log('✓ frame.webp copied, size:', fs.statSync(path.join(artDir, 'frame.webp')).size);

// 5. ganesha.webp - Let's see if rm-04-blessing.webp or a gold SVG can be used
fs.copyFileSync('assets/img/rm-04-blessing.webp', path.join(artDir, 'ganesha.webp'));
console.log('✓ ganesha.webp copied, size:', fs.statSync(path.join(artDir, 'ganesha.webp')).size);

console.log('\nAll Rangmahal art assets are now 100% in place!');
