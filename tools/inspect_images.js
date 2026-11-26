const fs = require('fs');
const path = require('path');

const dumpDir = path.join(__dirname, 'wedvo_dumps');
const files = fs.readdirSync(dumpDir);

files.forEach(f => {
  const html = fs.readFileSync(path.join(dumpDir, f), 'utf8');
  const slug = f.replace('.html', '');
  const baseMatch = html.match(/<base[^>]+href=["']([^"']+)["']/i);
  const base = baseMatch ? baseMatch[1] : '';

  // Look for poster, og:image, hero img, or envelope image
  const ogImg = (html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i) || [])[1];
  const poster = (html.match(/poster=["']([^"']+)["']/i) || [])[1];
  const heroImg = (html.match(/class=["'][^"']*hero[^"']*["'][^>]*src=["']([^"']+)["']/i) || [])[1];
  const firstImg = (html.match(/<img[^>]+src=["']([^"']+)["']/i) || [])[1];

  console.log(`${slug.padEnd(25)} | Base: ${base.padEnd(30)} | OG: ${ogImg || 'none'} | poster: ${poster || 'none'} | 1stImg: ${firstImg || 'none'}`);
});
