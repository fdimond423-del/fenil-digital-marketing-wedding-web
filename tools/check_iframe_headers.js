const https = require('https');

https.get('https://mypatrika.in/themes/gulmohar-reverie/index.html', res => {
  console.log('Status:', res.statusCode);
  console.log('x-frame-options:', res.headers['x-frame-options']);
  console.log('content-security-policy:', res.headers['content-security-policy']);
  console.log('access-control-allow-origin:', res.headers['access-control-allow-origin']);
});
