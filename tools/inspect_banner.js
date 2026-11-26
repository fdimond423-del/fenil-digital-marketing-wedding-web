const https = require('https');
const fs = require('fs');

https.get('https://toran.ink/sample/aarti-and-rohan/sage', (res) => {
  let data = '';
  res.on('data', c => data += c);
  res.on('end', () => {
    fs.writeFileSync('tools/toran_sample_raw.html', data, 'utf8');
    console.log('Saved tools/toran_sample_raw.html, len:', data.length);
    // Find the banner text
    const bannerIdx = data.indexOf('A demonstration site for an invented couple');
    if (bannerIdx !== -1) {
      console.log('Banner snippet:');
      console.log(data.slice(Math.max(0, bannerIdx - 300), bannerIdx + 400));
    } else {
      console.log('Banner string not found directly, looking for DEMO or Toran bar:');
      const demoIdx = data.indexOf('DEMO');
      if (demoIdx !== -1) {
        console.log(data.slice(Math.max(0, demoIdx - 200), demoIdx + 300));
      }
    }
  });
});
