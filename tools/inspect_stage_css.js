const https = require('https');

function fetch(url) {
  return new Promise(resolve => {
    https.get(url, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => resolve(d));
    }).on('error', e => resolve(''));
  });
}

async function run() {
  const stageCss = await fetch('https://mypatrika.in/all-invite/gulmohar-reverie/resources/css/stage.css');
  console.log('--- STAGE CSS ---');
  const stageRules = stageCss.split('}').filter(r => r.includes('overflow') || r.includes('stage') || r.includes('scroll'));
  stageRules.forEach(r => console.log(r.trim() + '}'));

  const introCss = await fetch('https://mypatrika.in/all-invite/gulmohar-reverie/resources/css/intro.css');
  console.log('\n--- INTRO CSS ---');
  const introRules = introCss.split('}').filter(r => r.includes('intro') || r.includes('curtain') || r.includes('pointer'));
  introRules.forEach(r => console.log(r.trim() + '}'));
}

run();
