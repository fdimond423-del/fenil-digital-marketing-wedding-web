const https = require('https');

https.get('https://mypatrika.in/all-invite/gulmohar-reverie/resources/js/mypatrika.js?v=maps-rsvp-20261107', res => {
  let d = '';
  res.on('data', c => d += c);
  res.on('end', () => {
    console.log(d.slice(0, 3000));
  });
});
