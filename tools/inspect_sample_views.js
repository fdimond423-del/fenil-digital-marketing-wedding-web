const https = require('https');

https.get('https://mypatrika.in/all-invite/shared/invite-catalogue/sample-views.js?v=20260927-4', res => {
  let d = '';
  res.on('data', c => d += c);
  res.on('end', () => {
    console.log('sample-views.js length:', d.length);
    const lines = d.split('\n');
    lines.forEach((l, i) => {
      if (l.includes('intro') || l.includes('curtain') || l.includes('click')) {
        console.log(`Line ${i+1}: ${l.slice(0, 150)}`);
      }
    });
  });
});
