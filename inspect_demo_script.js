const fs = require('fs');

const html = fs.readFileSync('demos/aaravandmeera-mussoorie/index.html', 'utf8');
console.log('HTML length:', html.length);
console.log('Gate present:', html.includes('id="gate"'));
console.log('Script present:', html.includes('<script>'));

// Let's check if there are missing variables in the script
const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/gi)].map(m => m[1]);
console.log('Scripts count:', scripts.length);
scripts.forEach((s, i) => {
  console.log(`Script ${i} length:`, s.length);
  console.log(s.slice(0, 300));
});
