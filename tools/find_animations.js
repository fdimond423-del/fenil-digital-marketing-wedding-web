const fs = require('fs');

const css = fs.readFileSync('assets/css/store.css', 'utf8');
const keyframes = [...css.matchAll(/@keyframes\s+([a-zA-Z0-9_-]+)/g)].map(m => m[1]);
console.log('Keyframes in store.css:', keyframes);

const transitions = [...css.matchAll(/transition:[^;]+;/g)].map(m => m[0]);
console.log('Total transitions in store.css:', transitions.length);

const anims = [...css.matchAll(/animation:[^;]+;/g)].map(m => m[0]);
console.log('Animations in store.css:', anims);
