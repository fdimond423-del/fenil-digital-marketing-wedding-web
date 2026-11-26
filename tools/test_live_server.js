const http = require('http');

const urls = [
  '/',
  '/contact/',
  '/refund',
  '/templates/rangmahal/',
  '/templates/nikhilandrinki/',
  '/templates/rajwada/',
  '/templates/gulmohar-reverie/',
  '/templates/royal-maroon/',
  '/demos/rajwada/',
  '/demos/gulmohar-reverie/',
  '/pages/wedding/aaravandmeera-mussoorie',
  '/pages/wedding/nikhilandrinki',
  '/assets/img/fdm-logo.jpg'
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
          dataLength: data.length,
          sample: data.slice(0, 150)
        });
      });
    });
    req.on('error', err => resolve({ path, error: err.message }));
  });
}

async function run() {
  console.log('Testing endpoints on http://localhost:3000 ...');
  for (const u of urls) {
    const result = await checkUrl(u);
    if (result.statusCode === 200) {
      console.log(`✅ [${result.statusCode}] ${result.path} (${result.dataLength} bytes)`);
    } else if (result.statusCode === 302) {
      console.log(`✅ [${result.statusCode} Redirect -> ${result.headers.location}] ${result.path}`);
    } else {
      console.log(`❌ [${result.statusCode || 'ERR'}] ${result.path}: ${result.error || ''}`);
    }
  }
}

run();
