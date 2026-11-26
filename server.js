const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 3000;
const ROOT_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4',
  '.mp3': 'audio/mpeg',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
  '.ico': 'image/x-icon'
};

const TEMPLATE_PRICES = {
  'rangmahal': 1499,
  'phulkari': 1499,
  'kolam': 1499,
  'noor': 1499,
  'capela': 1499,
  'pichola': 1499,
  'aaravandmeera-mussoorie': 1499,
  'aaravandmeera-udaipur': 1499,
  'vihaanandmeera': 1499,
  'kabirandananya': 1499,
  'aaravandshreya': 1499,
  'nikhilandrinki': 1499
};
const ADDON_PRICE = 999;

function parseBody(req) {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        resolve(JSON.parse(body || '{}'));
      } catch (e) {
        resolve({});
      }
    });
  });
}

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  let pathname = decodeURIComponent(parsedUrl.pathname);

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  
  // Support redirects for Vishakha / custom wedding paths
  if (pathname.startsWith('/pages/wedding/')) {
    const slug = pathname.replace('/pages/wedding/', '').replace(/\/+$/, '');
    const targetFile = path.join(ROOT_DIR, 'pages', 'wedding', slug, 'index.html');
    if (fs.existsSync(targetFile)) {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      fs.createReadStream(targetFile).pipe(res);
      return;
    }
  }

  // API ROUTING: /api/create-order
  if (req.method === 'POST' && pathname === '/api/create-order') {
    const data = await parseBody(req);
    const template = data.template || 'rangmahal';
    const base = TEMPLATE_PRICES[template] || 1499;
    const hasAddon = Boolean(data.addon);
    const totalINR = base + (hasAddon ? ADDON_PRICE : 0);
    const amountPaise = totalINR * 100;
    const orderId = 'order_' + Math.random().toString(36).substring(2, 10).toUpperCase() + Date.now().toString().slice(-4);

    const response = {
      ok: true,
      keyId: process.env.RAZORPAY_KEY_ID || 'rzp_test_knotlink_demo',
      amount: amountPaise,
      currency: 'INR',
      orderId: orderId,
      name: 'Fenil Digital Marketing',
      description: `${template.charAt(0).toUpperCase() + template.slice(1)} Wedding Invite Website`,
      notice: 'Knotlink Local Checkout: Ready for payment simulation or live Razorpay key'
    };

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(response));
    return;
  }

  // API ROUTING: /api/verify-payment
  if (req.method === 'POST' && pathname === '/api/verify-payment') {
    const data = await parseBody(req);
    const payId = data.razorpay_payment_id || 'pay_' + Math.random().toString(36).substring(2, 12);
    const ordId = data.razorpay_order_id || 'order_mock_' + Date.now();

    const response = {
      ok: true,
      status: 'captured',
      paymentId: payId,
      orderId: ordId,
      order: {
        template: 'rangmahal',
        amount: 149900,
        addon: 'setup'
      }
    };

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(response));
    return;
  }

  // API ROUTING: /api/health
  if (pathname === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'online', brand: 'Fenil Digital Marketing', timestamp: new Date().toISOString() }));
    return;
  }

  // Normalize static file paths
  let filePath = path.join(ROOT_DIR, pathname);

  // If path is directory or ends in /, look for index.html
  if (fs.existsSync(filePath)) {
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }
  } else {
    // Try appending .html or /index.html
    if (fs.existsSync(filePath + '.html')) {
      filePath = filePath + '.html';
    } else if (fs.existsSync(path.join(filePath, 'index.html'))) {
      filePath = path.join(filePath, 'index.html');
    }
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=31536000, immutable'
    });

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  } else {
    // 404 handler
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`
      <!doctype html>
      <html>
      <head><title>404 Not Found - Knotlink</title><link rel="stylesheet" href="/assets/css/store.css"></head>
      <body style="display:flex;align-items:center;justify-content:center;height:100vh;flex-direction:column;font-family:sans-serif;background:#FAF8F5;color:#241c1d;text-align:center;">
        <h1 style="font-size:3rem;margin-bottom:1rem;">Page Not Found</h1>
        <p style="margin-bottom:2rem;color:#666;">The page you are looking for does not exist on Knotlink.</p>
        <a href="/" style="display:inline-block;padding:12px 24px;background:#4C1026;color:#fff;border-radius:999px;text-decoration:none;font-weight:600;">Return to Home</a>
      </body>
      </html>
    `);
  }
});

server.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`  Knotlink Web Server running at: http://localhost:${PORT}`);
  console.log(`  - Store Homepage:      http://localhost:${PORT}/`);
  console.log(`  - Rangmahal Template:  http://localhost:${PORT}/templates/rangmahal/`);
  console.log(`  - Phulkari Template:   http://localhost:${PORT}/templates/phulkari/`);
  console.log(`  - Kolam Template:      http://localhost:${PORT}/templates/kolam/`);
  console.log(`  - Noor Template:       http://localhost:${PORT}/templates/noor/`);
  console.log(`  - Capela Template:     http://localhost:${PORT}/templates/capela/`);
  console.log(`  - Pichola Template:    http://localhost:${PORT}/templates/pichola/`);
  console.log(`  - Rangmahal Demo App:  http://localhost:${PORT}/demos/rangmahal/`);
  console.log(`  - Phulkari Demo App:   http://localhost:${PORT}/demos/phulkari/`);
  console.log(`  - Kolam Demo App:      http://localhost:${PORT}/demos/kolam/`);
  console.log(`  - Noor Demo App:       http://localhost:${PORT}/demos/noor/`);
  console.log(`  - Capela Demo App:     http://localhost:${PORT}/demos/capela/`);
  console.log(`  - Pichola Demo App:    http://localhost:${PORT}/demos/pichola/`);
  console.log(`  - Blog Section:        http://localhost:${PORT}/blog/`);
  console.log(`  - Contact Page:        http://localhost:${PORT}/contact/`);
  console.log(`======================================================\n`);
});
