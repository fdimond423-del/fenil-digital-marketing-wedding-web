const https = require('https');

https.get('https://fdimond423-del.github.io/fenil-digital-marketing-wedding-web/demos/patrika-gulmohar-reverie/?t=' + Date.now(), res => {
  let d = '';
  res.on('data', c => d += c);
  res.on('end', () => {
    console.log('patrika-gulmohar-reverie status:', res.statusCode);
    console.log('Includes auto scroll nav:', d.includes('fdm-nav-pill'));
    console.log('Includes theme base:', d.includes('https://mypatrika.in/themes/gulmohar-reverie/'));
  });
});
