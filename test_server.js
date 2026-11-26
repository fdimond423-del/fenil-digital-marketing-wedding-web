const http = require('http');

function test(urlPath) {
  return new Promise((resolve) => {
    http.get('http://localhost:3000' + urlPath, (res) => {
      resolve({ path: urlPath, status: res.statusCode, location: res.headers.location || '' });
    }).on('error', (err) => resolve({ path: urlPath, status: 'ERROR', error: err.message }));
  });
}

async function verifyAll() {
  console.log('Testing full suite on http://localhost:3000...\n');

  const urls = [
    '/',
    '/assets/img/fdm-logo.jpg',
    '/og.jpg',
    // Original 6 templates
    '/templates/rangmahal/',
    '/templates/phulkari/',
    '/templates/kolam/',
    '/templates/noor/',
    '/templates/capela/',
    '/templates/pichola/',
    // 6 New templates
    '/templates/aaravandmeera-mussoorie/',
    '/templates/aaravandmeera-udaipur/',
    '/templates/vihaanandmeera/',
    '/templates/kabirandananya/',
    '/templates/aaravandshreya/',
    '/templates/nikhilandrinki/',
    // 6 New demos
    '/demos/aaravandmeera-mussoorie/',
    '/demos/aaravandmeera-udaipur/',
    '/demos/vihaanandmeera/',
    '/demos/kabirandananya/',
    '/demos/aaravandshreya/',
    '/demos/nikhilandrinki/',
    // Redirects
    '/pages/wedding/aaravandmeera-mussoorie',
    '/pages/wedding/nikhilandrinki',
    // Auxiliary
    '/contact/',
    '/terms/',
    '/privacy/',
    '/thank-you/'
  ];

  let passed = 0;
  for (const u of urls) {
    const res = await test(u);
    if (res.status === 200 || res.status === 302) {
      console.log(`[PASS] ${res.path} => ${res.status} ${res.location ? '-> ' + res.location : 'OK'}`);
      passed++;
    } else {
      console.log(`[FAIL] ${res.path} => Status ${res.status}`);
    }
  }

  console.log(`\nVerified: ${passed}/${urls.length} endpoints working perfectly!`);
}

verifyAll();
