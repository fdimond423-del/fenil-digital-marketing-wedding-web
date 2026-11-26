const https = require('https');
const fs = require('fs');
const path = require('path');

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function run() {
  console.log('Fetching https://toran.ink/templates ...');
  let html = '';
  try {
    html = await fetchUrl('https://toran.ink/templates');
    fs.writeFileSync(path.join(__dirname, 'dump_toran_fresh.html'), html, 'utf8');
    console.log(`Fetched fresh HTML: ${html.length} bytes`);
  } catch (e) {
    console.log('Failed fetching fresh, falling back to dump_toran.html:', e.message);
    html = fs.readFileSync(path.join(__dirname, 'dump_toran.html'), 'utf8');
  }

  // Find all links (a href), demo links, preview links, or template links
  const hrefMatches = [...html.matchAll(/href=["']([^"']+)["']/gi)].map(m => m[1]);
  console.log(`Total hrefs found: ${hrefMatches.length}`);

  // Filter relevant links
  const relevant = hrefMatches.filter(h => 
    h.includes('demo') || 
    h.includes('preview') || 
    h.includes('/t/') || 
    h.includes('/template') || 
    h.includes('.ink') ||
    h.startsWith('http') ||
    h.startsWith('/')
  );

  console.log('\nSample hrefs:');
  const unique = [...new Set(relevant)];
  unique.forEach(u => console.log(' - ' + u));

  // Also look for cards or template items in HTML
  // Let's search for patterns like class="card", title, etc.
  const cards = [];
  const cardRegex = /<div[^>]*class=["'][^"']*(?:template|card|item)[^"']*["'][^>]*>([\s\S]*?)<\/div>/gi;
  let match;
  while ((match = cardRegex.exec(html)) !== null) {
    cards.push(match[1]);
  }
  console.log(`\nPotential cards found: ${cards.length}`);
}

run();
