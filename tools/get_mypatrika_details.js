const https = require('https');

const designs = [
  { name: 'Gulmohar Reverie', slug: 'gulmohar-reverie', category: 'Shahi (Premium)' },
  { name: 'Chandrika Utsav', slug: 'chandrika-utsav', category: 'Shahi (Premium)' },
  { name: 'Kanak', slug: 'kanak', category: 'Shahi (Premium)' },
  { name: 'Himadri', slug: 'himadri', category: 'Shahi (Premium)' },
  { name: 'Lifafa (Digital Envelope)', slug: 'lifafa', category: 'Shahi (Premium)' },
  { name: 'Ram Mandir (Spiritual / Devotional)', slug: 'ram-mandir', category: 'Shahi (Premium)' },
  { name: 'Lagnacha Wada (Traditional Maharashtrian)', slug: 'lagnacha-wada', category: 'Mangal (Classic)' },
  { name: 'Sheesh Mahal (Mirror Palace Luxury)', slug: 'sheesh-mahal', category: 'Mangal (Classic)' },
  { name: 'Royal Heritage Palace', slug: 'royal-heritage-palace', category: 'Mangal (Classic)' },
  { name: 'Phoolon Ki Baarish (Floral Celebration)', slug: 'phoolon-ki-baarish', category: 'Mangal (Classic)' },
  { name: 'Royal Rajputana (Royal Heritage)', slug: 'royal-rajputana', category: 'Mangal (Classic)' }
];

async function run() {
  for (const d of designs) {
    const demoUrl = `https://mypatrika.in/demo/${d.slug}`;
    const designUrl = `https://mypatrika.in/designs/${d.slug}`;
    console.log(`${d.name} [${d.category}] -> Demo: ${demoUrl} | Info: ${designUrl}`);
  }
}
run();
