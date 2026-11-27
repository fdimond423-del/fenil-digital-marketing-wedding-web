const https = require('https');
const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');

const missing = [
  {
    dest: path.join(rootDir, 'assets', 'img', 'toran', 'toran-haldi.png'),
    url: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=600&h=900&q=85'
  },
  {
    dest: path.join(rootDir, 'assets', 'img', 'vishakha', 'nikhilandrinki.png'),
    url: 'https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?auto=format&fit=crop&w=600&h=900&q=85'
  }
];

missing.forEach(m => {
  https.get(m.url, res => {
    if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
      https.get(res.headers.location, res2 => {
        const file = fs.createWriteStream(m.dest);
        res2.pipe(file);
        file.on('finish', () => console.log('Downloaded:', m.dest, fs.statSync(m.dest).size));
      });
      return;
    }
    const file = fs.createWriteStream(m.dest);
    res.pipe(file);
    file.on('finish', () => console.log('Downloaded:', m.dest, fs.statSync(m.dest).size));
  });
});
