const fs = require('fs');
const path = require('path');

const mainJs = fs.readFileSync('demos/rangmahal/main.js', 'utf8');
const cfgJs = fs.readFileSync('demos/rangmahal/config.js', 'utf8');

const allJs = mainJs + '\n' + cfgJs;
const matches = [...allJs.matchAll(/(['"])(assets\/(art|img)\/[^'"]+)\1/g)].map(m => m[2]);
const unique = [...new Set(matches)];

console.log(`Checking ${unique.length} assets from rangmahal main.js & config.js:`);
for (const rel of unique) {
  const localInDemo = path.join('demos/rangmahal', rel);
  const localInRoot = rel;
  const inDemoExists = fs.existsSync(localInDemo);
  const inRootExists = fs.existsSync(localInRoot);
  console.log(`${rel} -> inDemo: ${inDemoExists} | inRoot: ${inRootExists}`);
}
