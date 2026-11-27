const https = require('https');
const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');

// Curated high-impact, authentic, premium Indian wedding & ceremony photography from Unsplash
const CURATED_IMAGES = [
  // Toran 24 templates
  {
    slug: 'toran-sage',
    dir: 'toran',
    url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&h=900&q=85',
    label: 'Sage Botanical Wedding Couple'
  },
  {
    slug: 'toran-ochre',
    dir: 'toran',
    url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&h=900&q=85',
    label: 'Traditional Marigold Indian Wedding'
  },
  {
    slug: 'toran-ember',
    dir: 'toran',
    url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&h=900&q=85',
    label: 'Twilight Diyas & Evening Wedding'
  },
  {
    slug: 'toran-indigo',
    dir: 'toran',
    url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&h=900&q=85',
    label: 'Regal Formal Navy Wedding'
  },
  {
    slug: 'toran-kumkum',
    dir: 'toran',
    url: 'https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?auto=format&fit=crop&w=600&h=900&q=85',
    label: 'Auspicious Red Kumkum & Sindoor'
  },
  {
    slug: 'toran-amethyst',
    dir: 'toran',
    url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=600&h=900&q=85',
    label: 'Royal Violet Night Reception'
  },
  {
    slug: 'toran-divya-karthik',
    dir: 'toran',
    url: 'https://images.unsplash.com/photo-1597157639073-69284dc0fdaf?auto=format&fit=crop&w=600&h=900&q=85',
    label: 'South Indian Traditional Temple Wedding'
  },
  {
    slug: 'toran-nidhi-saurabh',
    dir: 'toran',
    url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&h=900&q=85',
    label: 'Heritage Marigold Kankotri Wedding'
  },
  {
    slug: 'toran-aditi-omkar',
    dir: 'toran',
    url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=600&h=900&q=85',
    label: 'Minimalist Botanical Wedding Couple'
  },
  {
    slug: 'toran-ananya-rudra',
    dir: 'toran',
    url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=600&h=900&q=85',
    label: 'Grand Palace Sangeet & Vivah'
  },
  {
    slug: 'toran-engagement-sage',
    dir: 'toran',
    url: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=600&h=900&q=85',
    label: 'Floral Ring Ceremony Engagement'
  },
  {
    slug: 'toran-engagement-ochre',
    dir: 'toran',
    url: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=600&h=900&q=85',
    label: 'Traditional Indian Roka Ceremony'
  },
  {
    slug: 'toran-tilak',
    dir: 'toran',
    url: 'https://images.unsplash.com/photo-1609234656388-0ff363383899?auto=format&fit=crop&w=600&h=900&q=85',
    label: 'Sacred Vedic Tilak & Kalash'
  },
  {
    slug: 'toran-haldi',
    dir: 'toran',
    url: 'https://images.unsplash.com/photo-1605007493699-ce65834f8a00?auto=format&fit=crop&w=600&h=900&q=85',
    label: 'Joyful Indian Haldi Ceremony'
  },
  {
    slug: 'toran-mehndi-sage',
    dir: 'toran',
    url: 'https://images.unsplash.com/photo-1560932684-5e552e2894e9?auto=format&fit=crop&w=600&h=900&q=85',
    label: 'Intimate Henna Mehndi Art'
  },
  {
    slug: 'toran-mehndi-ochre',
    dir: 'toran',
    url: 'https://images.unsplash.com/photo-1598880940371-c756e015fea1?auto=format&fit=crop&w=600&h=900&q=85',
    label: 'Festive Marigold Mehndi Night'
  },
  {
    slug: 'toran-sangeet-indigo',
    dir: 'toran',
    url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&h=900&q=85',
    label: 'Starry DJ Sangeet Dance Floor'
  },
  {
    slug: 'toran-sangeet-amethyst',
    dir: 'toran',
    url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=600&h=900&q=85',
    label: 'Glamorous Purple Sangeet Party'
  },
  {
    slug: 'toran-reception-indigo',
    dir: 'toran',
    url: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=600&h=900&q=85',
    label: 'Formal Royal Banquet Reception'
  },
  {
    slug: 'toran-reception-amethyst',
    dir: 'toran',
    url: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=600&h=900&q=85',
    label: 'Violet Ballroom Cocktail Reception'
  },
  {
    slug: 'toran-mundan',
    dir: 'toran',
    url: 'https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=600&h=900&q=85',
    label: 'Sacred Temple Bells & Puja'
  },
  {
    slug: 'toran-griha-pravesh',
    dir: 'toran',
    url: 'https://images.unsplash.com/photo-1582560475093-ba66accbc424?auto=format&fit=crop&w=600&h=900&q=85',
    label: 'Traditional Griha Pravesh Rangoli & Toran'
  },
  {
    slug: 'toran-naamkaran',
    dir: 'toran',
    url: 'https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&w=600&h=900&q=85',
    label: 'Decorated Floral Baby Naming Cradle'
  },
  {
    slug: 'toran-godh-bharai',
    dir: 'toran',
    url: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=600&h=900&q=85',
    label: 'Warm Indian Godh Bharai Celebration'
  },

  // Vishakha 6 templates
  {
    slug: 'aaravandmeera-mussoorie',
    dir: 'vishakha',
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&h=900&q=85',
    label: 'Misty Pine Hills Destination Wedding'
  },
  {
    slug: 'aaravandmeera-udaipur',
    dir: 'vishakha',
    url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&h=900&q=85',
    label: 'Udaipur Lakeside Royal Palace'
  },
  {
    slug: 'vihaanandmeera',
    dir: 'vishakha',
    url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&h=900&q=85',
    label: 'Heritage Palace Gold Embroidery'
  },
  {
    slug: 'kabirandananya',
    dir: 'vishakha',
    url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=600&h=900&q=85',
    label: 'Modern Luxury Pastel Couple'
  },
  {
    slug: 'aaravandshreya',
    dir: 'vishakha',
    url: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=600&h=900&q=85',
    label: 'Dreamy Blush Floral Fairytale'
  },
  {
    slug: 'nikhilandrinki',
    dir: 'vishakha',
    url: 'https://images.unsplash.com/photo-1545232979-fbf68fe9b1af?auto=format&fit=crop&w=600&h=900&q=85',
    label: 'Festive Indian Heritage Wedding'
  }
];

function downloadImage(item) {
  return new Promise((resolve) => {
    const destDir = path.join(rootDir, 'assets', 'img', item.dir);
    if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
    const destFile = path.join(destDir, `${item.slug}.png`);

    https.get(item.url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        https.get(res.headers.location, (res2) => {
          const file = fs.createWriteStream(destFile);
          res2.pipe(file);
          file.on('finish', () => {
            file.close();
            resolve({ item, success: true, size: fs.statSync(destFile).size });
          });
        }).on('error', e => resolve({ item, success: false, error: e.message }));
        return;
      }
      if (res.statusCode === 200) {
        const file = fs.createWriteStream(destFile);
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve({ item, success: true, size: fs.statSync(destFile).size });
        });
      } else {
        resolve({ item, success: false, status: res.statusCode });
      }
    }).on('error', e => resolve({ item, success: false, error: e.message }));
  });
}

async function run() {
  console.log(`Downloading ${CURATED_IMAGES.length} rich, stunning wedding & ceremony images...`);
  let pass = 0;
  for (const item of CURATED_IMAGES) {
    const res = await downloadImage(item);
    if (res.success) {
      console.log(`✅ [${res.size}B] ${item.slug} (${item.label}) -> assets/img/${item.dir}/${item.slug}.png`);
      pass++;
    } else {
      console.log(`❌ Failed: ${item.slug}: ${res.status || res.error}`);
    }
  }
  console.log(`\nDownloaded ${pass} / ${CURATED_IMAGES.length} stunning images!`);
}

run();
