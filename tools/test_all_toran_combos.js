const https = require('https');

const couples = [
  'aarti-and-rohan',
  'divya-and-karthik',
  'nidhi-and-saurabh',
  'aditi-and-omkar',
  'ananya-and-rudra'
];

const ceremonies = [
  'engagement',
  'tilak',
  'haldi',
  'mehndi',
  'sangeet',
  'reception',
  'mundan',
  'griha-pravesh',
  'naamkaran',
  'godh-bharai'
];

const themes = [
  'sage',
  'ochre',
  'ember',
  'indigo',
  'kumkum',
  'amethyst'
];

function check(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      resolve({ url, status: res.statusCode });
    }).on('error', e => resolve({ url, error: e.message }));
  });
}

async function run() {
  console.log('Testing combinations...');
  const valid = [];

  // Check couples x themes
  for (const c of couples) {
    for (const t of themes) {
      const url = `https://toran.ink/sample/${c}/${t}`;
      const r = await check(url);
      if (r.status === 200) {
        console.log(`✅ [200] ${url}`);
        valid.push(url);
      }
    }
  }

  // Check ceremonies x themes
  for (const c of ceremonies) {
    for (const t of themes) {
      const url = `https://toran.ink/sample/${c}/${t}`;
      const r = await check(url);
      if (r.status === 200) {
        console.log(`✅ [200] ${url}`);
        valid.push(url);
      }
    }
  }

  console.log(`\nTotal valid sample URLs found: ${valid.length}`);
}

run();
