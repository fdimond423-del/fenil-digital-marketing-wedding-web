const http = require('http');

const sampleToranSlugs = [
  'toran-sage',
  'toran-ochre',
  'toran-ember',
  'toran-indigo',
  'toran-kumkum',
  'toran-amethyst',
  'toran-divya-karthik',
  'toran-nidhi-saurabh',
  'toran-aditi-omkar',
  'toran-ananya-rudra',
  'toran-engagement-sage',
  'toran-engagement-ochre',
  'toran-tilak',
  'toran-haldi',
  'toran-mehndi-sage',
  'toran-mehndi-ochre',
  'toran-sangeet-indigo',
  'toran-sangeet-amethyst',
  'toran-reception-indigo',
  'toran-reception-amethyst',
  'toran-mundan',
  'toran-griha-pravesh',
  'toran-naamkaran',
  'toran-godh-bharai'
];

function check(url) {
  return new Promise((resolve) => {
    http.get('http://localhost:3000' + url, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve({ url, status: res.statusCode, len: data.length }));
    }).on('error', e => resolve({ url, error: e.message }));
  });
}

async function run() {
  console.log('Testing Toran templates & demos on http://localhost:3000 ...');
  let pass = 0;
  for (const s of sampleToranSlugs) {
    const rTmpl = await check(`/templates/${s}/`);
    const rDemo = await check(`/demos/${s}/`);
    if (rTmpl.status === 200 && rDemo.status === 200) {
      console.log(`✅ [200] /templates/${s}/ (${rTmpl.len}B) & /demos/${s}/ (${rDemo.len}B)`);
      pass++;
    } else {
      console.log(`❌ Failed: ${s} -> Tmpl: ${rTmpl.status}, Demo: ${rDemo.status}`);
    }
  }
  console.log(`\nAll ${pass} / ${sampleToranSlugs.length} Toran templates and demos verified 200 OK!`);
}

run();
