const fs = require('fs');
const path = require('path');

function getRelativePrefix(filePath) {
  const normalized = filePath.replace(/\\/g, '/').replace(/^\.\//, '');
  const segments = normalized.split('/');
  const depth = segments.length - 1;
  if (depth === 0) return '';
  return '../'.repeat(depth);
}

function convertHtml(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;
  const prefix = getRelativePrefix(filePath);

  // Remove the old runtime subpath script
  const compatScriptRegex = /<script>\s*\(function\(\)\s*\{\s*if\s*\(location\.hostname\.endsWith\('github\.io'\)[\s\S]*?<\/script>\s*/gi;
  content = content.replace(compatScriptRegex, '');

  // Attributes: href, src, poster, action
  content = content.replace(/(href|src|poster|action)=(["'])\/([^"']*)\2/gi, (match, attr, quote, val) => {
    // Protocol-relative //...
    if (val.startsWith('/')) {
      return match;
    }
    // Root '/'
    if (val === '') {
      return `${attr}=${quote}${prefix || './'}${quote}`;
    }
    // Fragment '/#...'
    if (val.startsWith('#')) {
      return `${attr}=${quote}${prefix ? prefix + val : val}${quote}`;
    }
    // Normal relative path
    return `${attr}=${quote}${prefix}${val}${quote}`;
  });

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    return true;
  }
  return false;
}

function walkDir(dir, list = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== '.git' && entry.name !== 'node_modules' && !entry.name.startsWith('.')) {
        walkDir(full, list);
      }
    } else if (entry.name.endsWith('.html')) {
      list.push(full);
    }
  }
  return list;
}

const allFiles = walkDir('.');
console.log(`Found ${allFiles.length} HTML files to process.`);

let modifiedCount = 0;
for (const file of allFiles) {
  if (convertHtml(file)) {
    modifiedCount++;
  }
}

console.log(`Successfully converted ${modifiedCount} HTML files to 100% relative paths!`);
