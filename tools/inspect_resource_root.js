const https = require('https');

https.get('https://mypatrika.in/all-invite/gulmohar-reverie/resources/js/mypatrika.js?v=maps-rsvp-20261107', res => {
  let d = '';
  res.on('data', c => d += c);
  res.on('end', () => {
    const lines = d.split('\n');
    console.log(lines.slice(0, 45).join('\n'));
  });
});
