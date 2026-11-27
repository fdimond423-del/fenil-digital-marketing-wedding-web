const cp = require('child_process');
const path = require('path');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

function capture(url, outName) {
  const outPath = path.resolve('tools', outName);
  const cmd = `"${chromePath}" --headless --disable-gpu --window-size=1440,900 --screenshot="${outPath}" "${url}"`;
  console.log(`Running: ${cmd}`);
  cp.execSync(cmd);
  console.log(`Captured ${outPath}, size: ${fs.statSync(outPath).size}`);
}

try {
  capture('http://localhost:3000/#templates', 'local_view.png');
  capture('https://fdimond423-del.github.io/fenil-digital-marketing-wedding-web/#templates', 'github_view.png');
} catch (e) {
  console.error('Error capturing:', e.message);
}
