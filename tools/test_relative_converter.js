const fs = require('fs');
const path = require('path');

function getRelativePrefix(filePath) {
  // Normalize path
  const normalized = filePath.replace(/\\/g, '/').replace(/^\.\//, '');
  const segments = normalized.split('/');
  // Last segment is filename (e.g. index.html)
  const depth = segments.length - 1;
  if (depth === 0) return '';
  return '../'.repeat(depth);
}

console.log('index.html prefix:', JSON.stringify(getRelativePrefix('index.html')));
console.log('contact/index.html prefix:', JSON.stringify(getRelativePrefix('contact/index.html')));
console.log('templates/rangmahal/index.html prefix:', JSON.stringify(getRelativePrefix('templates/rangmahal/index.html')));
console.log('demos/rangmahal/index.html prefix:', JSON.stringify(getRelativePrefix('demos/rangmahal/index.html')));
console.log('pages/wedding/toran-sage/index.html prefix:', JSON.stringify(getRelativePrefix('pages/wedding/toran-sage/index.html')));

function convertContent(content, prefix) {
  // Remove the old compat script if present
  const compatScriptRegex = /<script>\s*\(function\(\)\s*\{\s*if\s*\(location\.hostname\.endsWith\('github\.io'\)[\s\S]*?<\/script>\s*/gi;
  content = content.replace(compatScriptRegex, '');

  // Attributes: href, src, poster, action
  // Match attribute="..." with value starting with / but not //
  content = content.replace(/(href|src|poster|action)=(["'])\/([^"']*)\2/gi, (match, attr, quote, val) => {
    // If it starts with / followed by / (protocol-relative like //connect.facebook.net), do not change
    if (val.startsWith('/')) {
      return match;
    }
    // If it's root '/'
    if (val === '') {
      return `${attr}=${quote}${prefix || './'}${quote}`;
    }
    // If it's '/#something'
    if (val.startsWith('#')) {
      return `${attr}=${quote}${prefix ? prefix + val : val}${quote}`;
    }
    // Otherwise it's '/path...' -> prefix + val
    return `${attr}=${quote}${prefix}${val}${quote}`;
  });

  return content;
}

// Test on index.html
const indexHtml = fs.readFileSync('index.html', 'utf8');
const convertedIndex = convertContent(indexHtml, getRelativePrefix('index.html'));

// Check how many root-relative remain in convertedIndex
const remaining = [...convertedIndex.matchAll(/(href|src|poster)=["']\/([^"']*)["']/gi)].filter(m => !m[2].startsWith('/'));
console.log('Remaining root-relative in index.html after conversion:', remaining.length);
if (remaining.length > 0) {
  console.log('Samples:', remaining.slice(0, 10));
}

// Sample checks
console.log('\nSample replacements in index.html:');
const sampleMatches = [...convertedIndex.matchAll(/(href|src)=["'](assets\/css\/store\.css|assets\/js\/store\.js|demos\/rangmahal\/|contact\/|#templates)["']/gi)];
sampleMatches.forEach(m => console.log(m[0]));
