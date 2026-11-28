const https = require('https');

https.get('https://fdimond423-del.github.io/fenil-digital-marketing-wedding-web/demos/patrika-gulmohar-reverie/?t=' + Date.now(), res => {
  let d = '';
  res.on('data', c => d += c);
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    console.log('Has fdm-nav-pill (should be false):', d.includes('fdm-nav-pill'));
    console.log('Has autoTimer (should be false):', d.includes('autoTimer'));
    console.log('Has clean top bar:', d.includes('fdm-demo-bar'));
    console.log('Has theme base:', d.includes('https://mypatrika.in/themes/gulmohar-reverie/'));
  });
});
