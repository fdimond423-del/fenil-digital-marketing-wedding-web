const fs = require('fs');

const html = fs.readFileSync('tools/sample_mypatrika_demo.html', 'utf8');

const iframeIdx = html.indexOf('<iframe');
if (iframeIdx !== -1) {
  console.log(html.slice(iframeIdx - 200, iframeIdx + 600));
} else {
  console.log('No iframe found in sample_mypatrika_demo.html');
}
