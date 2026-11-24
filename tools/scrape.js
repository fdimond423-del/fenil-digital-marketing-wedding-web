const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const BASE_URL = 'https://www.knotlink.in';

const pagesToFetch = [
  '/',
  '/templates/rangmahal/',
  '/templates/phulkari/',
  '/templates/kolam/',
  '/templates/noor/',
  '/templates/capela/',
  '/templates/pichola/',
  '/contact/',
  '/terms/',
  '/privacy/',
  '/refund/',
  '/thank-you/',
  '/blog/'
];

const downloadedAssets = new Set();
const downloadedPages = new Set();
const queue = [];

function ensureDirectoryExistence(filePath) {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
}

function fetchUrl(url, binary = false) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const client = parsed.protocol === 'https:' ? https : http;
    const req = client.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': '*/*'
      }
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let redirectUrl = res.headers.location;
        if (!redirectUrl.startsWith('http')) {
          redirectUrl = new URL(redirectUrl, url).toString();
        }
        return fetchUrl(redirectUrl, binary).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to fetch ${url}, status: ${res.statusCode}`));
      }
      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => {
        const buffer = Buffer.concat(chunks);
        resolve(binary ? buffer : buffer.toString('utf8'));
      });
    });
    req.on('error', reject);
    req.setTimeout(25000, () => {
      req.destroy();
      reject(new Error(`Timeout fetching ${url}`));
    });
  });
}

async function downloadAsset(relativeUrl) {
  if (!relativeUrl || relativeUrl.startsWith('data:') || relativeUrl.startsWith('#') || relativeUrl.startsWith('javascript:')) return;
  
  // Clean query or hash
  let cleanUrl = relativeUrl.split('?')[0].split('#')[0];
  if (!cleanUrl) return;

  let fullUrl;
  let localPath;

  if (cleanUrl.startsWith('http')) {
    if (cleanUrl.startsWith(BASE_URL)) {
      fullUrl = cleanUrl;
      localPath = cleanUrl.replace(BASE_URL, '');
    } else {
      // External asset (like facebook pixel etc), skip or store if needed
      return;
    }
  } else {
    if (cleanUrl.startsWith('/')) {
      fullUrl = BASE_URL + cleanUrl;
      localPath = cleanUrl;
    } else {
      fullUrl = BASE_URL + '/' + cleanUrl;
      localPath = '/' + cleanUrl;
    }
  }

  // Remove leading slash for local disk path
  localPath = localPath.replace(/^\/+/, '');
  if (!localPath) return;

  if (downloadedAssets.has(localPath)) return;
  downloadedAssets.add(localPath);

  try {
    console.log(`Downloading asset: ${fullUrl} -> ${localPath}`);
    const data = await fetchUrl(fullUrl, true);
    const dest = path.join(__dirname, localPath);
    ensureDirectoryExistence(dest);
    fs.writeFileSync(dest, data);
    console.log(`Saved: ${localPath} (${data.length} bytes)`);

    // If it's a CSS file, parse for url()
    if (localPath.endsWith('.css')) {
      const cssContent = data.toString('utf8');
      const cssUrls = [...cssContent.matchAll(/url\s*\(([^)]+)\)/gi)].map(m => m[1].replace(/['"]/g, '').trim());
      for (const cu of cssUrls) {
        if (cu && !cu.startsWith('data:') && !cu.startsWith('#')) {
          let resolved = cu;
          if (!cu.startsWith('/') && !cu.startsWith('http')) {
            const cssDir = path.dirname(localPath);
            resolved = '/' + path.join(cssDir, cu).replace(/\\/g, '/');
          }
          await downloadAsset(resolved);
        }
      }
    }
  } catch (err) {
    console.warn(`Error downloading asset ${fullUrl}:`, err.message);
  }
}

async function processPage(pagePath) {
  const fullUrl = BASE_URL + pagePath;
  console.log(`\nFetching page: ${fullUrl}`);
  try {
    const html = await fetchUrl(fullUrl, false);
    
    // Determine target local file path
    let localHtmlPath;
    if (pagePath === '/' || pagePath === '') {
      localHtmlPath = 'index.html';
    } else {
      let p = pagePath.replace(/^\/+|\/+$/g, '');
      localHtmlPath = path.join(p, 'index.html');
    }

    const dest = path.join(__dirname, localHtmlPath);
    ensureDirectoryExistence(dest);
    fs.writeFileSync(dest, html, 'utf8');
    console.log(`Saved page: ${localHtmlPath} (${html.length} chars)`);

    // Find all assets in HTML
    // 1. links
    const linkHrefs = [...html.matchAll(/<link\s+[^>]*href=["']([^"']+)["'][^>]*>/gi)].map(m => m[1]);
    // 2. scripts
    const scriptSrcs = [...html.matchAll(/<script\s+[^>]*src=["']([^"']+)["'][^>]*>/gi)].map(m => m[1]);
    // 3. images
    const imgSrcs = [...html.matchAll(/<img\s+[^>]*src=["']([^"']+)["'][^>]*>/gi)].map(m => m[1]);
    const imgDataSrcs = [...html.matchAll(/<img\s+[^>]*data-src=["']([^"']+)["'][^>]*>/gi)].map(m => m[1]);
    // 4. videos & source
    const videoSrcs = [...html.matchAll(/<(?:video|source)\s+[^>]*src=["']([^"']+)["'][^>]*>/gi)].map(m => m[1]);
    const videoDataSrcs = [...html.matchAll(/<(?:video|source)\s+[^>]*data-src=["']([^"']+)["'][^>]*>/gi)].map(m => m[1]);
    const videoPosters = [...html.matchAll(/<video\s+[^>]*poster=["']([^"']+)["'][^>]*>/gi)].map(m => m[1]);

    const allAssetRefs = [
      ...linkHrefs,
      ...scriptSrcs,
      ...imgSrcs,
      ...imgDataSrcs,
      ...videoSrcs,
      ...videoDataSrcs,
      ...videoPosters
    ];

    for (const ref of allAssetRefs) {
      if (ref.endsWith('.html') || ref.endsWith('/')) continue;
      if (ref.includes('.css') || ref.includes('.js') || ref.includes('.webp') || ref.includes('.svg') || 
          ref.includes('.png') || ref.includes('.jpg') || ref.includes('.jpeg') || ref.includes('.mp4') || 
          ref.includes('.woff') || ref.includes('.woff2') || ref.includes('.ttf')) {
        await downloadAsset(ref);
      }
    }
  } catch (err) {
    console.error(`Error processing page ${fullUrl}:`, err.message);
  }
}

async function main() {
  console.log('Starting full download of knotlink.in...');
  
  // Download essential base assets
  const explicitAssets = [
    '/favicon.svg',
    '/og.jpg',
    '/assets/fonts/Cinzel.woff2',
    '/assets/css/store.css',
    '/assets/js/cfg.js',
    '/assets/js/store.js',
    '/assets/img/toran.webp',
    '/assets/img/cs-nikah.webp',
    '/assets/img/cs-std.webp',
    '/assets/media/rangmahal-poster.webp',
    '/assets/media/rangmahal-loop.mp4',
    '/assets/img/rm-01-opening.webp',
    '/assets/img/phulkari-cover.webp',
    '/assets/img/kolam-cover.webp',
    '/assets/img/noor-cover.webp',
    '/assets/img/capela-cover.webp',
    '/assets/img/pichola-cover.webp',
    '/assets/img/dusk.webp',
    '/assets/img/pay/upi.svg',
    '/assets/img/pay/rupay.svg',
    '/assets/img/pay/visa.svg',
    '/assets/img/pay/mastercard.svg',
    '/assets/img/pay/netbanking.svg'
  ];

  for (const asset of explicitAssets) {
    await downloadAsset(asset);
  }

  for (const page of pagesToFetch) {
    await processPage(page);
  }

  console.log('\nAll initial pages and assets downloaded!');
}

main().catch(console.error);
