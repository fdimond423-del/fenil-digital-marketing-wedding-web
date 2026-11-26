const fs = require('fs');

const raw = fs.readFileSync('demos/aaravandmeera-mussoorie/raw.html', 'utf8');
console.log('raw.html length:', raw.length);
console.log('Contains DOCTYPE:', raw.startsWith('<!doctype') || raw.startsWith('<!DOCTYPE'));
console.log('First 500 chars:');
console.log(raw.slice(0, 500));
