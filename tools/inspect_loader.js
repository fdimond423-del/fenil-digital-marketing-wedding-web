const https = require('https');

https.get('https://mypatrika.in/all-invite/shared/invite-catalogue/invitation-loader-v2.js?v=20261026-1', res => {
  let d = '';
  res.on('data', c => d += c);
  res.on('end', () => {
    console.log('invitation-loader-v2.js len:', d.length);
    console.log(d.slice(0, 2000));
  });
});
