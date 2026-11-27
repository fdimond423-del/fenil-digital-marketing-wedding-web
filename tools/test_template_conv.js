const fs = require('fs');

function convertContent(content, prefix) {
  const compatScriptRegex = /<script>\s*\(function\(\)\s*\{\s*if\s*\(location\.hostname\.endsWith\('github\.io'\)[\s\S]*?<\/script>\s*/gi;
  content = content.replace(compatScriptRegex, '');

  content = content.replace(/(href|src|poster|action)=(["'])\/([^"']*)\2/gi, (match, attr, quote, val) => {
    if (val.startsWith('/')) return match;
    if (val === '') return `${attr}=${quote}${prefix || './'}${quote}`;
    if (val.startsWith('#')) return `${attr}=${quote}${prefix ? prefix + val : val}${quote}`;
    return `${attr}=${quote}${prefix}${val}${quote}`;
  });

  return content;
}

const file = 'templates/rangmahal/index.html';
const raw = fs.readFileSync(file, 'utf8');
const conv = convertContent(raw, '../../');
const matches = [...conv.matchAll(/(href|src)=["'](\.\.\/\.\.\/assets\/[^"']+|\.\.\/\.\.\/demos\/[^"']+)["']/gi)];
console.log('Sample matches in ' + file + ':', matches.slice(0, 10).map(m => m[0]));
