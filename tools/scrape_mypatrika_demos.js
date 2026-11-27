const https = require('https');
const fs = require('fs');

https.get('https://mypatrika.in/demo/gulmohar-reverie', {
  headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
}, res => {
  let html = '';
  res.on('data', c => html += c);
  res.on('end', () => {
    console.log('Status:', res.statusCode, 'Length:', html.length);
    fs.writeFileSync('tools/sample_mypatrika_demo.html', html, 'utf8');
    console.log('Saved to tools/sample_mypatrika_demo.html');
    // Check if it has iframes, scripts, or styles
    console.log('Title:', (html.match(/<title>([^<]+)<\/title>/i) || [])[1]);
    const iframes = [...html.matchAll(/<iframe[^>]+src=["']([^"']+)["']/gi)].map(m => m[1]);
    console.log('Iframes:', iframes);
  });
}).on('error', e => console.error(e));
