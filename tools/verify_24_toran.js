const https = require('https');

const candidate24 = [
  // 1-6: The 6 Core Wedding Themes
  { name: 'Sage (Forest Green & Mango Leaves)', url: 'https://toran.ink/sample/aarti-and-rohan/sage' },
  { name: 'Ochre (Marigold & Turmeric Kankotri)', url: 'https://toran.ink/sample/aarti-and-rohan/ochre' },
  { name: 'Ember (Twilight Diyas & Royal Maroon)', url: 'https://toran.ink/sample/aarti-and-rohan/ember' },
  { name: 'Indigo (Navy Blue & Gold Regal)', url: 'https://toran.ink/sample/aarti-and-rohan/indigo' },
  { name: 'Kumkum (Auspicious Red & Gold Paisley)', url: 'https://toran.ink/sample/aarti-and-rohan/kumkum' },
  { name: 'Amethyst (Royal Violet Night & Tassels)', url: 'https://toran.ink/sample/aarti-and-rohan/amethyst' },

  // 7-10: The 4 Couple Showcase Variations
  { name: 'Divya & Karthik (Kumkum - South Indian)', url: 'https://toran.ink/sample/divya-and-karthik/kumkum' },
  { name: 'Nidhi & Saurabh (Ochre - Classic Kankotri)', url: 'https://toran.ink/sample/nidhi-and-saurabh/ochre' },
  { name: 'Aditi & Omkar (Sage - Botanical Elegance)', url: 'https://toran.ink/sample/aditi-and-omkar/sage' },
  { name: 'Ananya & Rudra (Ember - Royal Sangeet)', url: 'https://toran.ink/sample/ananya-and-rudra/ember' },

  // 11-17: All Wedding Ceremonies
  { name: 'Engagement / Sagai (Sage Theme)', url: 'https://toran.ink/sample/engagement/sage' },
  { name: 'Engagement / Sagai (Ochre Theme)', url: 'https://toran.ink/sample/engagement/ochre' },
  { name: 'Tilak Ceremony (Ochre Theme)', url: 'https://toran.ink/sample/tilak/ochre' },
  { name: 'Haldi Ceremony (Ochre Turmeric Theme)', url: 'https://toran.ink/sample/haldi/ochre' },
  { name: 'Mehndi Ceremony (Sage Botanical Theme)', url: 'https://toran.ink/sample/mehndi/sage' },
  { name: 'Mehndi Ceremony (Ochre Marigold Theme)', url: 'https://toran.ink/sample/mehndi/ochre' },
  { name: 'Sangeet Night (Indigo Royal Theme)', url: 'https://toran.ink/sample/sangeet/indigo' },
  { name: 'Sangeet Night (Amethyst Violet Theme)', url: 'https://toran.ink/sample/sangeet/amethyst' },
  { name: 'Wedding Reception (Indigo Formal Theme)', url: 'https://toran.ink/sample/reception/indigo' },
  { name: 'Wedding Reception (Amethyst Night Theme)', url: 'https://toran.ink/sample/reception/amethyst' },

  // 21-24: Four Non-Wedding Traditional Celebrations
  { name: 'Mundan Ceremony (Ochre Theme)', url: 'https://toran.ink/sample/mundan/ochre' },
  { name: 'Griha Pravesh / Housewarming (Kumkum Theme)', url: 'https://toran.ink/sample/griha-pravesh/kumkum' },
  { name: 'Naamkaran / Baby Naming (Sage Theme)', url: 'https://toran.ink/sample/naamkaran/sage' },
  { name: 'Godh Bharai / Baby Shower (Sage Theme)', url: 'https://toran.ink/sample/godh-bharai/sage' }
];

function check(item) {
  return new Promise((resolve) => {
    https.get(item.url, (res) => {
      resolve({ name: item.name, url: item.url, status: res.statusCode });
    }).on('error', e => resolve({ name: item.name, url: item.url, error: e.message }));
  });
}

async function run() {
  console.log(`Checking ${candidate24.length} candidate links...`);
  let pass = 0;
  for (const c of candidate24) {
    const r = await check(c);
    if (r.status === 200) {
      console.log(`✅ [200] ${r.name} -> ${r.url}`);
      pass++;
    } else {
      console.log(`❌ [${r.status}] ${r.name} -> ${r.url}`);
    }
  }
  console.log(`\nVerified: ${pass} / ${candidate24.length} links are 200 OK!`);
}

run();
