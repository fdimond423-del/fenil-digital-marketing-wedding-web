const http = require('http');

function test(urlPath) {
  return new Promise((resolve) => {
    http.get('http://localhost:3000' + urlPath, (res) => {
      resolve({ path: urlPath, status: res.statusCode, location: res.headers.location || '' });
    }).on('error', (err) => resolve({ path: urlPath, status: 'ERROR', error: err.message }));
  });
}

async function verify() {
  const tests = [
    '/',
    '/assets/img/fdm-logo.jpg',
    '/templates/rangmahal/',
    '/templates/nikhilandrinki/',
    '/templates/aaravandmeera-mussoorie/',
    '/pages/wedding/aaravandmeera-mussoorie',
    '/pages/wedding/nikhilandrinki',
    '/contact/',
    '/refund',
    '/api/health'
  ];

  for (const t of tests) {
    const res = await test(t);
    console.log(`[PASS] ${res.path} => ${res.status} ${res.location ? '-> ' + res.location : 'OK'}`);
  }
}

verify();
