const https = require('https');
const fs = require('fs');

https.get('https://mypatrika.in/themes/gulmohar-reverie/index.html', {
  headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
}, res => {
  let html = '';
  res.on('data', c => html += c);
  res.on('end', () => {
    console.log('Status:', res.statusCode, 'Length:', html.length);
    fs.writeFileSync('tools/sample_theme_inner.html', html, 'utf8');
    console.log('First 1000 chars of theme:');
    console.log(html.slice(0, 1000));
  });
}).on('error', e => console.error(e));
