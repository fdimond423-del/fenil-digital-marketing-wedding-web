const https = require('https');

https.get('https://fdimond423-del.github.io/fenil-digital-marketing-wedding-web/', res => {
  let html = '';
  res.on('data', c => html += c);
  res.on('end', () => {
    console.log('Includes relative css:', html.includes('href="assets/css/store.css"'));
    console.log('Includes relative js:', html.includes('src="assets/js/store.js"'));
    console.log('Includes relative logo:', html.includes('src="assets/img/fdm-logo.jpg"'));
    console.log('Includes relative demo link:', html.includes('href="demos/toran-sage/"'));
    console.log('Total HTML length:', html.length);
  });
});
