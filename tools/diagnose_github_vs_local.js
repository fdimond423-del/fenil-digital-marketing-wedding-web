const https = require('https');
const http = require('http');

function fetchPage(url) {
  return new Promise((resolve) => {
    const client = url.startsWith('https') ? https : http;
    client.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: data }));
    }).on('error', err => resolve({ error: err.message }));
  });
}

async function run() {
  console.log('Fetching GitHub Pages index.html...');
  const gh = await fetchPage('https://fdimond423-del.github.io/fenil-digital-marketing-wedding-web/');
  console.log('GitHub status:', gh.status, 'Body len:', gh.body ? gh.body.length : 0);

  if (!gh.body) return;

  const attrMatches = [...gh.body.matchAll(/(href|src)=["']([^"']+)["']/gi)];
  const rootRelative = [];
  const resources = [];

  for (const m of attrMatches) {
    const val = m[2];
    if (val.startsWith('/') && !val.startsWith('//')) {
      rootRelative.push(val);
    }
  }

  console.log('Total root-relative paths on GitHub page:', rootRelative.length);
  console.log('Sample root-relative paths:', rootRelative.slice(0, 30));

  // Let's test if a sample of these root relative paths 404 on github
  const samples = rootRelative.slice(0, 15);
  for (const s of samples) {
    // If it starts with /assets/
    const directUrl = 'https://fdimond423-del.github.io' + s;
    const res = await fetchPage(directUrl);
    console.log(`Direct fetch: ${directUrl} -> Status: ${res.status}`);
  }
}

run();
