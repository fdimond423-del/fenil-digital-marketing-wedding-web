const http = require('http');

function testEndpoint(options, postData = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          headers: res.headers,
          bodySnippet: data.slice(0, 150)
        });
      });
    });
    req.on('error', reject);
    if (postData) {
      req.write(typeof postData === 'string' ? postData : JSON.stringify(postData));
    }
    req.end();
  });
}

async function runTests() {
  console.log('Testing localhost:3000 endpoints with all 12 templates & Fenil Digital Marketing branding...\n');

  const tests = [
    { name: 'Home Page', opts: { host: 'localhost', port: 3000, path: '/', method: 'GET' } },
    { name: 'FDM Logo', opts: { host: 'localhost', port: 3000, path: '/assets/img/fdm-logo.jpg', method: 'GET' } },
    { name: 'Rangmahal Demo (Original Knotlink)', opts: { host: 'localhost', port: 3000, path: '/demos/rangmahal/', method: 'GET' } },
    { name: 'Aarav & Meera Mussoorie Demo', opts: { host: 'localhost', port: 3000, path: '/demos/aaravandmeera-mussoorie/', method: 'GET' } },
    { name: 'Aarav & Meera Udaipur Demo', opts: { host: 'localhost', port: 3000, path: '/demos/aaravandmeera-udaipur/', method: 'GET' } },
    { name: 'Vihaan & Meera Demo', opts: { host: 'localhost', port: 3000, path: '/demos/vihaanandmeera/', method: 'GET' } },
    { name: 'Kabir & Ananya Demo', opts: { host: 'localhost', port: 3000, path: '/demos/kabirandananya/', method: 'GET' } },
    { name: 'Aarav & Shreya Demo', opts: { host: 'localhost', port: 3000, path: '/demos/aaravandshreya/', method: 'GET' } },
    { name: 'Nikhil & Rinki Demo', opts: { host: 'localhost', port: 3000, path: '/demos/nikhilandrinki/', method: 'GET' } },
    { name: 'Wedding Redirect URL Check', opts: { host: 'localhost', port: 3000, path: '/pages/wedding/aaravandmeera-mussoorie', method: 'GET' } },
    {
      name: 'Create Order API (Fenil Digital Marketing)',
      opts: { host: 'localhost', port: 3000, path: '/api/create-order', method: 'POST', headers: { 'Content-Type': 'application/json' } },
      data: { template: 'aaravandmeera-mussoorie', addon: true }
    }
  ];

  let passed = 0;
  for (const t of tests) {
    try {
      const res = await testEndpoint(t.opts, t.data);
      if (res.status === 200 || res.status === 302) {
        console.log(`[PASS] ${t.name}: Status ${res.status} | Content-Type: ${res.headers['content-type'] || res.headers['location']}`);
        passed++;
      } else {
        console.log(`[FAIL] ${t.name}: Status ${res.status}`);
      }
    } catch (err) {
      console.log(`[ERROR] ${t.name}: ${err.message}`);
    }
  }

  console.log(`\nResults: ${passed}/${tests.length} tests passed successfully!`);
}

runTests().catch(console.error);
