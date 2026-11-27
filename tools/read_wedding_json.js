const https = require('https');

https.get('https://mypatrika.in/themes/gulmohar-reverie/wedding.json', res => {
  let d = '';
  res.on('data', c => d += c);
  res.on('end', () => {
    console.log('wedding.json status:', res.statusCode, 'len:', d.length);
    console.log(d.slice(0, 1000));
  });
});
