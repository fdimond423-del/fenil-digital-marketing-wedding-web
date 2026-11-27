const https = require('https');

https.get('https://mypatrika.in/all-invite/gulmohar-reverie/resources/js/mypatrika.js?v=maps-rsvp-20261107', res => {
  let d = '';
  res.on('data', c => d += c);
  res.on('end', () => {
    console.log('mypatrika.js length:', d.length);
    // Find scene navigation functions (e.g. next, prev, goto, advance, scroll)
    const matches = [...d.matchAll(/(nextScene|goToScene|advance|navigate|dispatch|stage\.|intro)/gi)].map(m => m[0]);
    console.log('Navigation keywords:', [...new Set(matches)]);
    // Find any exported or global objects
    const globals = [...d.matchAll(/window\.([a-zA-Z0-9_$]+)\s*=/g)].map(m => m[1]);
    console.log('Window globals:', globals);
    // Find event listeners
    const events = [...d.matchAll(/addEventListener\(["']([^"']+)["']/g)].map(m => m[1]);
    console.log('Event listeners:', [...new Set(events)]);
  });
});
