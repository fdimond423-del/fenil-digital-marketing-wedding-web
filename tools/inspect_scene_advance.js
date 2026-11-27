const https = require('https');

https.get('https://mypatrika.in/all-invite/gulmohar-reverie/resources/js/mypatrika.js?v=maps-rsvp-20261107', res => {
  let d = '';
  res.on('data', c => d += c);
  res.on('end', () => {
    // Search for any click handlers on document or window
    const lines = d.split('\n');
    lines.forEach((l, idx) => {
      if (l.includes('addEventListener') || l.includes('scene') || l.includes('click') || l.includes('touch') || l.includes('scroll')) {
        console.log(`Line ${idx+1}: ${l.slice(0, 150)}`);
      }
    });
  });
});
