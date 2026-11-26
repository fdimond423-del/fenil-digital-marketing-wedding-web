const fs = require('fs');

console.log('=== Parsing einvitation.app ===');
const ei = fs.readFileSync('tools/dump_einvitation.html', 'utf8');
const eiLinks = [...ei.matchAll(/href=["'](\/templates\/[^"']+|https?:\/\/einvitation\.app\/[^"']+)["']/gi)].map(m => m[1]);
console.log('einvitation links count:', eiLinks.length);
console.log('einvitation sample links:', [...new Set(eiLinks)].slice(0, 10));

console.log('\n=== Parsing forour.day ===');
const fo = fs.readFileSync('tools/dump_forourday.html', 'utf8');
const foLinks = [...fo.matchAll(/href=["'](\/templates\/[^"']+|\/demo\/[^"']+|https?:\/\/[^"']+\.forour\.day[^"']*)["']/gi)].map(m => m[1]);
console.log('forour.day links count:', foLinks.length);
console.log('forour.day sample links:', [...new Set(foLinks)].slice(0, 10));

console.log('\n=== Parsing mypatrika.in ===');
const mp = fs.readFileSync('tools/dump_mypatrika.html', 'utf8');
const mpLinks = [...mp.matchAll(/href=["']([^"']*(?:design|template|demo|preview)[^"']*)["']/gi)].map(m => m[1]);
console.log('mypatrika links count:', mpLinks.length);
console.log('mypatrika sample links:', [...new Set(mpLinks)].slice(0, 10));

console.log('\n=== Parsing toran.ink ===');
const to = fs.readFileSync('tools/dump_toran.html', 'utf8');
const toLinks = [...to.matchAll(/href=["'](\/templates\/[^"']+|\/demo\/[^"']+|https?:\/\/[^"']+\.toran\.ink[^"']*)["']/gi)].map(m => m[1]);
console.log('toran links count:', toLinks.length);
console.log('toran sample links:', [...new Set(toLinks)].slice(0, 10));

console.log('\n=== Parsing wedvo.in ===');
const we = fs.readFileSync('tools/dump_wedvo.html', 'utf8');
const weLinks = [...we.matchAll(/href=["']([^"']*(?:template|demo|wedding|website)[^"']*)["']/gi)].map(m => m[1]);
console.log('wedvo links count:', weLinks.length);
console.log('wedvo sample links:', [...new Set(weLinks)].slice(0, 10));
