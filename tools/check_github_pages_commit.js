const https = require('https');

https.get('https://fdimond423-del.github.io/fenil-digital-marketing-wedding-web/?t=' + Date.now(), res => {
  let data = '';
  res.on('data', c => data += c);
  res.on('end', () => {
    console.log('GitHub response status:', res.statusCode);
    console.log('Age header:', res.headers['age']);
    console.log('Last-Modified header:', res.headers['last-modified']);
    console.log('ETag header:', res.headers['etag']);
    const hasRelativeCss = data.includes('href="assets/css/store.css"');
    const hasAbsoluteCss = data.includes('href="/assets/css/store.css"');
    console.log('Has relative css:', hasRelativeCss);
    console.log('Has absolute css:', hasAbsoluteCss);
    const hasOldCompatScript = data.includes("location.hostname.endsWith('github.io')");
    console.log('Has old compat script:', hasOldCompatScript);
  });
});
