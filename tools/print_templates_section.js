const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');
const tmplSection = html.match(/<section id="templates"[\s\S]*?<\/section>/i);
if (tmplSection) {
  console.log(tmplSection[0]);
}
