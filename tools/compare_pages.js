const puppeteer = require('puppeteer');

async function testPage(url, label) {
  console.log(`\n=== Testing ${label}: ${url} ===`);
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const errors = [];
  const failedRequests = [];

  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });

  page.on('requestfailed', req => {
    failedRequests.push({ url: req.url(), failure: req.failure() ? req.failure().errorText : 'failed' });
  });

  page.on('response', res => {
    if (res.status() >= 400) {
      failedRequests.push({ url: res.url(), status: res.status() });
    }
  });

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
  } catch (e) {
    console.log(`Goto error: ${e.message}`);
  }

  // Scroll to #templates
  await page.evaluate(() => {
    const el = document.getElementById('templates');
    if (el) el.scrollIntoView();
  });

  await new Promise(r => setTimeout(r, 2000));

  const screenshotPath = `tools/screenshot_${label}.png`;
  await page.screenshot({ path: screenshotPath, fullPage: false });
  console.log(`Saved screenshot to ${screenshotPath}`);

  console.log(`Console Errors (${errors.length}):`, errors);
  console.log(`Failed Requests (${failedRequests.length}):`, failedRequests);

  // Check key elements
  const info = await page.evaluate(() => {
    const cards = document.querySelectorAll('.card, .tp-card, [data-template]');
    const videos = document.querySelectorAll('video');
    const hero = document.querySelector('.hero, header');
    const storeCss = document.querySelector('link[href*="store.css"]');
    return {
      title: document.title,
      cardsCount: cards.length,
      videoPlaying: videos.length > 0 ? !videos[0].paused : false,
      videoSrc: videos.length > 0 ? (videos[0].currentSrc || videos[0].src) : null,
      storeCssFound: !!storeCss,
      storeCssHref: storeCss ? storeCss.href : null,
      bodyBg: window.getComputedStyle(document.body).backgroundColor,
      bodyFont: window.getComputedStyle(document.body).fontFamily
    };
  });

  console.log('Page Info:', info);
  await browser.close();
  return { errors, failedRequests, info };
}

async function run() {
  const local = await testPage('http://localhost:3000/#templates', 'local');
  const gh = await testPage('https://fdimond423-del.github.io/fenil-digital-marketing-wedding-web/#templates', 'github');
}

run();
