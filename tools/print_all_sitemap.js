const https = require('https');

https.get('https://toran.ink/sitemap.xml', (res) => {
  let data = '';
  res.on('data', c => data += c);
  res.on('end', () => {
    const locs = [...data.matchAll(/<loc>([^<]+)<\/loc>/gi)].map(m => m[1]);
    console.log(`All ${locs.length} URLs in sitemap:`);
    locs.forEach((l, i) => console.log(`${i + 1}. ${l}`));
  });
});
