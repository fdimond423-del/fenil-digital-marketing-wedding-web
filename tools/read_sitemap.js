const https = require('https');

https.get('https://mypatrika.in/sitemap.xml', res => {
  let d = '';
  res.on('data', c => d += c);
  res.on('end', () => {
    const urls = [...d.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
    console.log('Total URLs in sitemap:', urls.length);
    urls.forEach(u => console.log(u));
  });
});
