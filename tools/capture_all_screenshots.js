const cp = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const profile = path.join(os.tmpdir(), 'chrome_headless_profile');

// Targets to screenshot
const toranSlugs = [
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

const vishakhaSlugs = [
  'aaravandmeera-mussoorie',
  'aaravandmeera-udaipur',
  'vihaanandmeera',
  'kabirandananya',
  'aaravandshreya',
  'nikhilandrinki'
];

function capture(url, destFile) {
  const tempOut = path.join(os.tmpdir(), `shot_${Date.now()}_${Math.random().toString(36).substring(7)}.png`);
  try {
    cp.spawnSync(chromePath, [
      '--headless=new',
      '--disable-gpu',
      '--hide-scrollbars',
      '--window-size=432,768',
      '--user-data-dir=' + profile,
      '--screenshot=' + tempOut,
      url
    ], { timeout: 15000 });

    if (fs.existsSync(tempOut) && fs.statSync(tempOut).size > 5000) {
      fs.copyFileSync(tempOut, destFile);
      fs.unlinkSync(tempOut);
      return { success: true, size: fs.statSync(destFile).size };
    }
  } catch (e) {
    return { success: false, error: e.message };
  }
  return { success: false, error: 'File not generated or too small' };
}

async function run() {
  const toranDir = path.join(rootDir, 'assets', 'img', 'toran');
  if (!fs.existsSync(toranDir)) fs.mkdirSync(toranDir, { recursive: true });

  const vishakhaDir = path.join(rootDir, 'assets', 'img', 'vishakha');
  if (!fs.existsSync(vishakhaDir)) fs.mkdirSync(vishakhaDir, { recursive: true });

  console.log('=== Step 1: Taking screenshots for Toran templates ===');
  for (const s of toranSlugs) {
    const dest = path.join(toranDir, `${s}.png`);
    const url = `http://localhost:3000/demos/${s}/`;
    const res = capture(url, dest);
    if (res.success) {
      console.log(`✅ [${res.size} bytes] ${s} -> assets/img/toran/${s}.png`);
    } else {
      console.log(`❌ Failed: ${s}: ${res.error}`);
    }
  }

  console.log('\n=== Step 2: Taking screenshots for Vishakha templates ===');
  for (const s of vishakhaSlugs) {
    const dest = path.join(vishakhaDir, `${s}.png`);
    const url = `http://localhost:3000/pages/wedding/${s}`;
    const res = capture(url, dest);
    if (res.success) {
      console.log(`✅ [${res.size} bytes] ${s} -> assets/img/vishakha/${s}.png`);
    } else {
      console.log(`❌ Failed: ${s}: ${res.error}`);
    }
  }

  console.log('\nAll screenshots completed!');
}

run();
