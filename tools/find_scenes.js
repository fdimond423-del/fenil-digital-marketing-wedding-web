const fs = require('fs');

const html = fs.readFileSync('tools/sample_theme_inner.html', 'utf8');

const sceneMatches = [...html.matchAll(/<section[^>]+class=["']([^"']*)["'][^>]*>/gi)].map(m => m[0]);
console.log('Total sections/scenes in sample_theme_inner.html:', sceneMatches.length);
sceneMatches.forEach(s => console.log(s));
