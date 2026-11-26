const https = require('https');
const fs = require('fs');
const path = require('path');

const slugs = [
  'wedding-journey',
  'palace-envelope-hindu',
  'rajwada',
  'royal-envelope',
  'ram-mandir',
  'palace-door',
  'mangal-mandap',
  'ivory-lace',
  'royal-entrance',
  'blush-theme',
  'rose-seal',
  'sage-garden',
  'haveli-utsav',
  'royal-maroon',
  'palace-envelope',
  'shwet-kamal',
  'swarna-pothi',
  'grace-chapel',
  'emerald-vow',
  'phulkari-courtyard',
  'anand-karaj',
  'sunehri-shaam',
  'muslim-heirloom',
  'burgundy-letter',
  'blossom-oud',
  'noor-mahal',
  'sukoon',
  'gulzar',
  'shahi-mahal',
  'champagne-lace',
  'pearl-peony',
  'gulbahar'
];

function fetchUrl(slug) {
  return new Promise((resolve) => {
    const url = `https://wedvo.in/preview/${slug}`;
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        // Follow redirect if any
        https.get(res.headers.location, (res2) => {
          let data = '';
          res2.on('data', c => data += c);
          res2.on('end', () => resolve({ slug, url, statusCode: res2.statusCode, html: data }));
        }).on('error', e => resolve({ slug, url, error: e.message }));
        return;
      }
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve({ slug, url, statusCode: res.statusCode, html: data }));
    }).on('error', e => resolve({ slug, url, error: e.message }));
  });
}

async function run() {
  console.log(`Fetching ${slugs.length} Wedvo preview pages...`);
  const results = [];
  for (const s of slugs) {
    const res = await fetchUrl(s);
    if (res.statusCode === 200 && res.html) {
      const baseMatch = res.html.match(/<base[^>]+href=["']([^"']+)["']/i);
      const titleMatch = res.html.match(/<title>([^<]+)<\/title>/i);
      const descMatch = res.html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i);
      const ogImgMatch = res.html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i);
      const themeColorMatch = res.html.match(/<meta[^>]+name=["']theme-color["'][^>]+content=["']([^"']+)["']/i);
      
      const info = {
        slug: s,
        status: res.statusCode,
        title: titleMatch ? titleMatch[1].trim() : s,
        baseHref: baseMatch ? baseMatch[1] : `/themes/${s}/v1/`,
        desc: descMatch ? descMatch[1] : 'Luxury Wedding Invitation Website',
        ogImage: ogImgMatch ? ogImgMatch[1] : null,
        themeColor: themeColorMatch ? themeColorMatch[1] : '#4C1026',
        htmlLen: res.html.length
      };

      // Save raw html for reference
      const dumpDir = path.join(__dirname, 'wedvo_dumps');
      if (!fs.existsSync(dumpDir)) fs.mkdirSync(dumpDir, { recursive: true });
      fs.writeFileSync(path.join(dumpDir, `${s}.html`), res.html, 'utf8');

      console.log(`✅ [200] ${s}: ${info.title} | base: ${info.baseHref}`);
      results.push(info);
    } else {
      console.log(`❌ [${res.statusCode || 'ERR'}] ${s}: ${res.error || 'Failed'}`);
    }
  }

  fs.writeFileSync(path.join(__dirname, 'wedvo_catalog.json'), JSON.stringify(results, null, 2), 'utf8');
  console.log(`\nDone! Saved ${results.length} templates in tools/wedvo_catalog.json`);
}

run();
