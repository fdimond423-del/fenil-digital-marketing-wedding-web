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

  // Handle /refund redirect to /contact/
  if (pathname === '/refund' || pathname === '/refund/') {
    res.writeHead(302, { 'Location': '/contact/' });
    res.end();
    return;
  }

  // Handle direct /pages/wedding/:slug serving
  if (pathname.startsWith('/pages/wedding/')) {
    const slug = pathname.replace('/pages/wedding/', '').replace(/\/+$/, '');
    const targetFile = path.join(ROOT_DIR, 'pages', 'wedding', slug, 'index.html');
    if (fs.existsSync(targetFile)) {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      fs.createReadStream(targetFile).pipe(res);
      return;
    }
  }

  // API ROUTING: /api/health
  if (pathname === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'online', brand: 'Fenil Digital Marketing', founder: 'Fenil Limbachiya', phone: '8200095497', timestamp: new Date().toISOString() }));
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
      <head><title>404 Not Found - Fenil Digital Marketing</title><link rel="stylesheet" href="/assets/css/store.css"></head>
      <body style="display:flex;align-items:center;justify-content:center;height:100vh;flex-direction:column;font-family:sans-serif;background:#FAF8F5;color:#241c1d;text-align:center;">
        <h1 style="font-size:2.5rem;margin-bottom:1rem;color:#4C1026;">Page Not Found</h1>
        <p style="margin-bottom:2rem;color:#666;">The page you are looking for does not exist on Fenil Digital Marketing.</p>
        <a href="/" style="display:inline-block;padding:12px 24px;background:#ff8c00;color:#000;font-weight:700;border-radius:999px;text-decoration:none;">Return to Home</a>
      </body>
      </html>
    `);
  }
});

server.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`  Fenil Digital Marketing Server: http://localhost:${PORT}`);
  console.log(`  Founder: Fenil Limbachiya | WhatsApp: +91 8200095497`);
  console.log(`======================================================\n`);
});
