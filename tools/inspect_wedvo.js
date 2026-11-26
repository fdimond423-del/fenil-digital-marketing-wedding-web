const https = require('https');

https.get('https://wedvo.in/preview/wedding-journey', (res) => {
  let data = '';
  res.on('data', c => data += c);
  res.on('end', () => {
    console.log('TITLE:', (data.match(/<title>[\s\S]*?<\/title>/i) || [])[0]);
    console.log('BASE:', (data.match(/<base[^>]*>/i) || [])[0]);
    console.log('STYLESHEETS:', data.match(/<link[^>]+rel=["']stylesheet["'][^>]*>/gi));
    console.log('SCRIPTS:', data.match(/<script[^>]+src=["'][^"']+["'][^>]*>/gi));
    console.log('OG IMAGE:', (data.match(/<meta[^>]+property=["']og:image["'][^>]*>/i) || [])[0]);
    console.log('BODY SNIPPET (500-1500):', data.slice(500, 1500));
  });
});
