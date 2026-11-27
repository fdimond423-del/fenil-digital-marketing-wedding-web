const fs = require('fs');

const templates = [
  { slug: 'gulmohar-reverie', title: 'Gulmohar Reverie', category: 'Shahi Collection', sub: 'Royal floral scarlet & gold luxury theme', cat: 'Hindu' },
  { slug: 'chandrika-utsav', title: 'Chandrika Utsav', category: 'Shahi Collection', sub: 'Moonlight royal night celebration', cat: 'Hindu' },
  { slug: 'kanak', title: 'Kanak', category: 'Shahi Collection', sub: 'Pure golden traditional royal celebration', cat: 'Hindu' },
  { slug: 'himadri', title: 'Himadri', category: 'Shahi Collection', sub: 'Serene mountain ivory & gold aesthetic', cat: 'Contemporary' },
  { slug: 'lifafa', title: 'Lifafa', category: 'Shahi Collection', sub: 'Interactive wax-sealed royal envelope', cat: 'Save-the-Date' },
  { slug: 'ram-mandir', title: 'Patrika Ram Mandir', category: 'Shahi Collection', sub: 'Sacred temple architecture & shlokas', cat: 'Hindu' },
  { slug: 'lagnacha-wada', title: 'Lagnacha Wada', category: 'Mangal Collection', sub: 'Traditional Maharashtrian Wada heritage', cat: 'Hindu' },
  { slug: 'sheesh-mahal', title: 'Sheesh Mahal', category: 'Mangal Collection', sub: 'Mughal mirror palace sparkling reflections', cat: 'Muslim' },
  { slug: 'royal-heritage-palace', title: 'Royal Heritage Palace', category: 'Mangal Collection', sub: 'Majestic fortress & grand courtyard', cat: 'Hindu' },
  { slug: 'phoolon-ki-baarish', title: 'Phoolon Ki Baarish', category: 'Mangal Collection', sub: 'Pastel rose petal shower celebration', cat: 'Hindu' },
  { slug: 'royal-rajputana', title: 'Royal Rajputana', category: 'Mangal Collection', sub: 'Grand Rajasthan royal fort & court', cat: 'Hindu' }
];

function generateCard(t) {
  return `<article class="card" data-cat="${t.cat}"><a class="card-art" href="demos/patrika-${t.slug}/" target="_blank" rel="noopener" tabindex="-1" aria-label="Open live demo for ${t.title}"><img src="assets/img/mypatrika/${t.slug}.jpg" alt="Preview art for the ${t.title} template" width="432" height="768" loading="lazy" decoding="async"></a><div class="card-body"><span class="badge live">${t.category}</span><h3>${t.title}</h3><p class="card-cat">${t.sub}</p><div class="card-act"><div class="card-price" style="display:flex;flex-direction:column;line-height:1.1;"><span style="font-size:0.72rem;color:#8a6d65;text-transform:uppercase;font-weight:700;letter-spacing:0.5px;">Price</span><strong style="font-size:1.32rem;font-weight:800;color:#4C1026;font-family:'Cinzel',serif;">₹1,499</strong></div><a class="btn sm" href="demos/patrika-${t.slug}/" target="_blank" rel="noopener" style="background:#25D366;color:#fff;border-color:#25D366;font-weight:700;box-shadow:0 4px 14px rgba(37,211,102,0.35);display:inline-flex;align-items:center;gap:6px;"><svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/></svg> Live demo</a></div></div></article>`;
}

let html = fs.readFileSync('index.html', 'utf8');

// Find the template grid closing tag
// Usually </section> after the cards or <div class="grid">...</div>
const cardsHtml = templates.map(generateCard).join('\n');

// Check where the last </article> is
const lastArticleIdx = html.lastIndexOf('</article>');
if (lastArticleIdx === -1) {
  console.error('Could not find </article> in index.html');
  process.exit(1);
}

const insertionPoint = lastArticleIdx + '</article>'.length;
const newHtml = html.slice(0, insertionPoint) + '\n' + cardsHtml + html.slice(insertionPoint);

fs.writeFileSync('index.html', newHtml, 'utf8');
console.log(`Successfully added ${templates.length} MyPatrika cards to index.html!`);
