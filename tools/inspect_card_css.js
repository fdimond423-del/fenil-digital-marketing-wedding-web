const fs = require('fs');

const css = fs.readFileSync('assets/css/store.css', 'utf8');

const rules = css.split('}');
const cardRules = rules.filter(r => r.includes('.card') || r.includes('.t-') || r.includes('hover') || r.includes('anim') || r.includes('transform'));

console.log('Total card/hover/transform rules:', cardRules.length);
cardRules.slice(0, 15).forEach(r => console.log(r.trim() + '}'));
