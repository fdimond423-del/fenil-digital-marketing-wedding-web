const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');

function run() {
  console.log('=== Step 1: Updating index.html cards with screenshots and pricing ===');
  let indexHtml = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf8');

  // Replace each card in index.html
  // Regex to match every card
  const cardRegex = /<article class="card" data-cat="([^"]+)">([\s\S]*?)<\/article>/gi;

  let updatedCards = 0;

  indexHtml = indexHtml.replace(cardRegex, (fullCard, cat, inner) => {
    // Extract slug
    const slugMatch = inner.match(/href="\/templates\/([^\/"]+)\/"/i) || inner.match(/href="\/demos\/([^\/"]+)\/"/i);
    const slug = slugMatch ? slugMatch[1] : '';

    // Extract title
    const titleMatch = inner.match(/<h3>([^<]+)<\/h3>/i);
    const title = titleMatch ? titleMatch[1] : slug;

    // Extract eyebrow
    const eyebrowMatch = inner.match(/<p class="card-cat">([^<]+)<\/p>/i);
    const eyebrow = eyebrowMatch ? eyebrowMatch[1] : '';

    // Determine correct art path
    let art = '';
    const toranFile = path.join(rootDir, 'assets', 'img', 'toran', `${slug}.png`);
    const vishakhaFile = path.join(rootDir, 'assets', 'img', 'vishakha', `${slug}.png`);
    const wedvoFile = path.join(rootDir, 'assets', 'img', 'wedvo', `${slug}.jpg`);

    if (fs.existsSync(toranFile)) {
      art = `/assets/img/toran/${slug}.png`;
    } else if (fs.existsSync(vishakhaFile)) {
      art = `/assets/img/vishakha/${slug}.png`;
    } else if (fs.existsSync(wedvoFile)) {
      art = `/assets/img/wedvo/${slug}.jpg`;
    } else {
      // Original 6
      if (slug === 'rangmahal') art = '/assets/img/rm-01-opening.webp';
      else if (slug === 'phulkari') art = '/assets/img/phulkari-cover.webp';
      else if (slug === 'kolam') art = '/assets/img/kolam-cover.webp';
      else if (slug === 'noor') art = '/assets/img/noor-cover.webp';
      else if (slug === 'capela') art = '/assets/img/capela-cover.webp';
      else if (slug === 'pichola') art = '/assets/img/pichola-cover.webp';
      else art = '/assets/img/rm-01-opening.webp';
    }

    updatedCards++;

    // New card layout:
    // 1. Image links directly to live demo
    // 2. "View template" is REMOVED
    // 3. Pricing (₹1,499) is displayed prominently
    // 4. "Live demo" button is highlighted
    return `<article class="card" data-cat="${cat}"><a class="card-art" href="/demos/${slug}/" target="_blank" rel="noopener" tabindex="-1" aria-label="Open live demo for ${title}"><img src="${art}" alt="Preview art for the ${title} template" width="432" height="768" loading="lazy" decoding="async"></a><div class="card-body"><span class="badge live">All-Inclusive</span><h3>${title}</h3><p class="card-cat">${eyebrow}</p><div class="card-act"><div class="card-price" style="display:flex;flex-direction:column;line-height:1.1;"><span style="font-size:0.72rem;color:#8a6d65;text-transform:uppercase;font-weight:700;letter-spacing:0.5px;">Price</span><strong style="font-size:1.32rem;font-weight:800;color:#4C1026;font-family:'Cinzel',serif;">₹1,499</strong></div><a class="btn sm" href="/demos/${slug}/" target="_blank" rel="noopener" style="background:#25D366;color:#fff;border-color:#25D366;font-weight:700;box-shadow:0 4px 14px rgba(37,211,102,0.35);display:inline-flex;align-items:center;gap:6px;"><svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/></svg> Live demo</a></div></div></article>`;
  });

  fs.writeFileSync(path.join(rootDir, 'index.html'), indexHtml, 'utf8');
  console.log(`Updated ${updatedCards} cards in index.html with real screenshots and pricing!`);

  // Step 2: Fix any broken images in templates/
  console.log('\n=== Step 2: Fixing image references in templates/ ===');
  const tmplDir = path.join(rootDir, 'templates');
  const tmplDirs = fs.readdirSync(tmplDir);
  let fixedTmpls = 0;

  tmplDirs.forEach(slug => {
    const indexPath = path.join(tmplDir, slug, 'index.html');
    if (!fs.existsSync(indexPath)) return;

    let html = fs.readFileSync(indexPath, 'utf8');
    const orig = html;

    // Check if toran or vishakha screenshot exists
    const toranFile = path.join(rootDir, 'assets', 'img', 'toran', `${slug}.png`);
    const vishakhaFile = path.join(rootDir, 'assets', 'img', 'vishakha', `${slug}.png`);
    const wedvoFile = path.join(rootDir, 'assets', 'img', 'wedvo', `${slug}.jpg`);

    let bestArt = '';
    if (fs.existsSync(toranFile)) bestArt = `/assets/img/toran/${slug}.png`;
    else if (fs.existsSync(vishakhaFile)) bestArt = `/assets/img/vishakha/${slug}.png`;
    else if (fs.existsSync(wedvoFile)) bestArt = `/assets/img/wedvo/${slug}.jpg`;

    if (bestArt) {
      // Replace non-existing rm-02, rm-03, rm-04, rm-05 paths
      html = html.replace(/\/assets\/img\/rm-0[2-5]-[a-z]+\.webp/gi, bestArt);
      html = html.replace(/src="\/assets\/media\/rangmahal-poster\.webp"/gi, `src="${bestArt}"`);
    }

    if (html !== orig) {
      fs.writeFileSync(indexPath, html, 'utf8');
      fixedTmpls++;
    }
  });

  console.log(`Updated image paths in ${fixedTmpls} template pages!`);
}

module.exports = { run };
if (require.main === module) run();
