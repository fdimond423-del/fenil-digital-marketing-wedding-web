const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');

const ghPagesScript = `
<!-- GitHub Pages Subpath Compatibility -->
<script>
  (function() {
    if (location.hostname.endsWith('github.io') && location.pathname.startsWith('/fenil-digital-marketing-wedding-web')) {
      var repo = '/fenil-digital-marketing-wedding-web';
      document.querySelectorAll('link[href^="/"], script[src^="/"]').forEach(function(el) {
        var attr = el.tagName === 'LINK' ? 'href' : 'src';
        var val = el.getAttribute(attr);
        if (val && val.startsWith('/') && !val.startsWith(repo)) {
          el.setAttribute(attr, repo + val);
        }
      });
      document.addEventListener('DOMContentLoaded', function() {
        document.querySelectorAll('a[href^="/"], img[src^="/"]').forEach(function(el) {
          var attr = el.tagName === 'A' ? 'href' : 'src';
          var val = el.getAttribute(attr);
          if (val && val.startsWith('/') && !val.startsWith(repo)) {
            el.setAttribute(attr, repo + val);
          }
        });
      });
    }
  })();
</script>
`;

function walkHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    if (file === 'node_modules' || file === '.git' || file === 'tools') return;
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) results = results.concat(walkHtmlFiles(fullPath));
    else if (file.endsWith('.html')) results.push(fullPath);
  });
  return results;
}

const allHtml = walkHtmlFiles(rootDir);
console.log(`Injecting GitHub Pages compatibility into ${allHtml.length} HTML files...`);

allHtml.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  if (!content.includes('GitHub Pages Subpath Compatibility') && content.includes('</head>')) {
    content = content.replace('</head>', ghPagesScript + '\n</head>');
    fs.writeFileSync(f, content, 'utf8');
  }
});

// Create 404.html from index.html
fs.copyFileSync(path.join(rootDir, 'index.html'), path.join(rootDir, '404.html'));
console.log('Created 404.html for GitHub Pages routing.');

// Add .nojekyll so GitHub Pages serves all folders like _ or static files without Jekyll filtering
fs.writeFileSync(path.join(rootDir, '.nojekyll'), '', 'utf8');
console.log('Created .nojekyll file.');
