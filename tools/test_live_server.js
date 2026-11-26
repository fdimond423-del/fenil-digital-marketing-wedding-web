const http = require('http');

const urls = [
  '/',
  '/contact/',
  '/refund',
  // Kept original 12
  '/templates/rangmahal/',
  '/templates/nikhilandrinki/',
  '/pages/wedding/aaravandmeera-mussoorie',
  // New Wedvo templates
  '/templates/wedding-journey/',
  '/demos/wedding-journey/',
  '/pages/wedding/wedding-journey/',
  '/templates/palace-envelope-hindu/',
  '/demos/palace-envelope-hindu/',
  '/templates/ram-mandir/',
  '/demos/ram-mandir/',
  '/templates/royal-maroon/',
  '/demos/royal-maroon/',
  '/templates/sage-garden/',
  '/demos/sage-garden/',
  '/templates/muslim-heirloom/',
  '/demos/muslim-heirloom/',
  '/templates/anand-karaj/',
  '/demos/anand-karaj/',
  '/templates/gulbahar/',
  '/demos/gulbahar/',
  // Assets
  '/assets/img/fdm-logo.jpg',
  '/assets/img/wedvo/wedding-journey.jpg',
  '/assets/img/wedvo/palace-envelope-hindu.jpg'
];

function checkUrl(path) {
  return new Promise((resolve) => {
    const req = http.get('http://localhost:3000' + path, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          path,
          statusCode: res.statusCode,
          headers: res.headers,
          dataLength: data.length
        });
      });
    });
    req.on('error', err => resolve({ path, error: err.message }));
  });
}

async function run() {
  console.log('Testing endpoints on http://localhost:3000 ...');
  let pass = 0, fail = 0;
  for (const u of urls) {
    const result = await checkUrl(u);
    if (result.statusCode === 200) {
      console.log(`✅ [${result.statusCode}] ${result.path} (${result.dataLength} bytes)`);
      pass++;
    } else if (result.statusCode === 302) {
      console.log(`✅ [${result.statusCode} Redirect -> ${result.headers.location}] ${result.path}`);
      pass++;
    } else {
      console.log(`❌ [${result.statusCode || 'ERR'}] ${result.path}: ${result.error || ''}`);
      fail++;
    }
  }
  console.log(`\nResults: ${pass} passed, ${fail} failed.`);
}

run();
