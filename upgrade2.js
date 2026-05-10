const fs = require('fs');
let html = fs.readFileSync('kidist-arsema.html', 'utf8');

const P = (n) => `photos/photo_${n}_2026-05-10_14-19-11.jpg`;

// ── 1. ADD Bodoni Moda font + meta SEO ──
html = html.replace(
  '<link rel="preconnect" href="https://fonts.googleapis.com">',
  `<meta name="description" content="Kidist Arsema — Luxury Ethiopian traditional fashion. Habesha Kemis, wedding collections, and custom tailoring from Addis Ababa.">
<meta name="keywords" content="Ethiopian fashion, Habesha Kemis, Ethiopian traditional clothes, Addis Ababa fashion, Ethiopian wedding dress">
<meta property="og:title" content="Kidist Arsema — Ethiopian Traditional Fashion">
<meta property="og:description" content="Luxury traditional fashion crafted with timeless Ethiopian identity.">
<link rel="preconnect" href="https://fonts.googleapis.com">`
);
html = html.replace(
  "family=Manrope:wght@300;400;500;600;700&display=swap",
  "family=Manrope:wght@300;400;500;600;700&family=Bodoni+Moda:ital,wght@0,400;0,700;1,400&display=swap"
);

// ── 2. ADD EXTRA CSS before </style> ──
const extraCSS = `
/* ── MOBILE BOTTOM NAV ── */
.mobile-bottom-nav {
  display:none; position:fixed; bottom:0; left:0; right:0; z-index:800;
  background:rgba(42,32,24,0.96); backdrop-filter:blur(20px);
  border-top:1px solid rgba(200,169,107,0.2);
  padding:0.6rem 0 calc(0.6rem + env(safe-area-inset-bottom));
}
.mobile-bottom-nav ul { display:flex; list-style:none; justify-content:space-around; }
.mobile-bottom-nav a { display:flex; flex-direction:column; align-items:center; gap:3px; text-decoration:none; color:rgba(248,245,240,0.5); font-size:0.5rem; letter-spacing:0.12em; text-transform:uppercase; transition:color 0.3s; }
.mobile-bottom-nav a:hover, .mobile-bottom-nav a.active { color:var(--gold); }
.mobile-bottom-nav .nav-icon-svg { font-size:1.2rem; line-height:1; }
@media(max-width:768px){ .mobile-bottom-nav{display:block;} body{padding-bottom:70px;} }

/* ── LIGHTBOX ── */
#lightbox { position:fixed; inset:0; z-index:9000; background:rgba(17,8,4,0.97); display:flex; align-items:center; justify-content:center; opacity:0; visibility:hidden; transition:opacity 0.4s,visibility 0.4s; }
#lightbox.open { opacity:1; visibility:visible; }
#lightbox img { max-width:92vw; max-height:88vh; object-fit:contain; box-shadow:0 40px 100px rgba(0,0,0,0.8); }
.lb-close { position:absolute; top:1.5rem; right:2rem; color:var(--gold); font-size:2rem; cursor:pointer; background:none; border:none; line-height:1; }
.lb-prev, .lb-next { position:absolute; top:50%; transform:translateY(-50%); background:rgba(200,169,107,0.15); border:1px solid rgba(200,169,107,0.3); color:var(--gold); font-size:1.5rem; padding:1rem 1.25rem; cursor:pointer; transition:background 0.3s; }
.lb-prev { left:1.5rem; } .lb-next { right:1.5rem; }
.lb-prev:hover,.lb-next:hover { background:rgba(200,169,107,0.3); }

/* ── GALLERY CURSOR HINT ── */
.gallery-item { cursor:zoom-in; }
.gallery-item img { transition:transform 0.7s cubic-bezier(0.16,1,0.3,1), filter 0.4s; }
.gallery-item:hover img { transform:scale(1.06); filter:brightness(1.08); }

/* ── HERO PHOTO FIX ── */
#hero { position:relative; min-height:100vh; display:flex; align-items:flex-end; overflow:hidden; background:var(--charcoal); }
.hero-slide { background-attachment:fixed; }
@media(max-width:768px){ .hero-slide { background-attachment:scroll; } }

/* ── PRODUCT CARD HOVER GLOW ── */
.product-card:hover .product-img-wrap { box-shadow:0 20px 60px rgba(200,169,107,0.2); }
.product-img-wrap { transition:box-shadow 0.5s; }

/* ── STORY IMAGES POLISH ── */
.story-img-main, .story-img-accent { overflow:hidden; }
.story-img-main img, .story-img-accent img { transition:transform 0.9s cubic-bezier(0.16,1,0.3,1); }
.story-img-main:hover img, .story-img-accent:hover img { transform:scale(1.04); }

/* ── COLLECTIONS CARD POLISH ── */
.col-card { border-radius:0; }
.col-figure { width:100%; height:100%; overflow:hidden; }
.col-card-img { width:100%; height:100%; object-fit:cover; display:block; transition:transform 0.9s cubic-bezier(0.16,1,0.3,1); }
.col-card:hover .col-card-img { transform:scale(1.07); }

/* ── LOOKBOOK IMG FIX ── */
.lookbook-img { width:100%; height:500px; display:block; object-fit:cover; object-position:top; transition:transform 0.8s ease; }
.lookbook-item:hover .lookbook-img { transform:scale(1.04); }

/* ── WEDDING VISUAL FIX ── */
.wedding-visual { position:absolute; right:0; top:0; bottom:0; width:45%; overflow:hidden; }
.wedding-visual img { width:100%; height:100%; object-fit:cover; object-position:top; }

/* ── CART BADGE COUNT ── */
#cartIcon { position:relative; }
#cartIcon[data-count]:not([data-count="0"])::after {
  content:attr(data-count); position:absolute; top:-8px; right:-8px;
  background:var(--gold); color:var(--charcoal);
  font-size:0.5rem; font-weight:700; width:16px; height:16px;
  border-radius:50%; display:flex; align-items:center; justify-content:center;
  font-family:'Manrope',sans-serif;
}

/* ── SECTION DIVIDER ── */
.gold-divider { width:60px; height:1px; background:var(--gold); display:block; margin:0 auto 2rem; }

/* ── PRESS / TRUST BAR ── */
#press { background:var(--white); padding:3rem 4rem; border-top:1px solid rgba(59,43,36,0.08); }
.press-inner { display:flex; align-items:center; justify-content:center; gap:4rem; flex-wrap:wrap; }
.press-label { font-size:0.55rem; letter-spacing:0.4em; text-transform:uppercase; color:var(--coffee-light); white-space:nowrap; }
.press-logos { display:flex; gap:3.5rem; align-items:center; flex-wrap:wrap; justify-content:center; }
.press-logo { font-family:'Cormorant Garamond',serif; font-size:1.1rem; font-weight:400; color:rgba(59,43,36,0.25); letter-spacing:0.12em; text-transform:uppercase; transition:color 0.3s; }
.press-logo:hover { color:var(--gold); }

/* ── FLOATING WHATSAPP ── */
.whatsapp-float { position:fixed; bottom:5.5rem; right:1.5rem; z-index:700; background:#25D366; color:#fff; width:52px; height:52px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:1.5rem; box-shadow:0 8px 24px rgba(37,211,102,0.4); text-decoration:none; transition:transform 0.3s,box-shadow 0.3s; }
.whatsapp-float:hover { transform:scale(1.12); box-shadow:0 12px 32px rgba(37,211,102,0.55); }
@media(min-width:769px){ .whatsapp-float { bottom:2rem; } }

/* ── SIZE SELECTOR ── */
.product-sizes { display:flex; gap:0.4rem; margin-top:0.6rem; flex-wrap:wrap; }
.size-btn { background:none; border:1px solid rgba(59,43,36,0.2); color:var(--coffee-mid); font-size:0.6rem; padding:0.25rem 0.55rem; cursor:pointer; font-family:'Manrope',sans-serif; letter-spacing:0.08em; transition:all 0.25s; }
.size-btn:hover, .size-btn.active { background:var(--coffee); color:var(--cream); border-color:var(--coffee); }
`;
html = html.replace('</style>', extraCSS + '\n</style>');

// ── 3. ADD MOBILE BOTTOM NAV + LIGHTBOX + WHATSAPP before </body> ──
const newHTML = `
<!-- MOBILE BOTTOM NAVIGATION -->
<nav class="mobile-bottom-nav" aria-label="Mobile navigation">
  <ul>
    <li><a href="#hero" class="active"><span class="nav-icon-svg">⌂</span>Home</a></li>
    <li><a href="#collections"><span class="nav-icon-svg">◈</span>Shop</a></li>
    <li><a href="#lookbook"><span class="nav-icon-svg">◉</span>Lookbook</a></li>
    <li><a href="#wedding"><span class="nav-icon-svg">♡</span>Wedding</a></li>
    <li><a href="#custom"><span class="nav-icon-svg">✦</span>Custom</a></li>
  </ul>
</nav>

<!-- LIGHTBOX -->
<div id="lightbox" role="dialog" aria-modal="true" aria-label="Image viewer">
  <button class="lb-close" onclick="closeLightbox()" aria-label="Close">✕</button>
  <button class="lb-prev" onclick="lbNav(-1)" aria-label="Previous">‹</button>
  <img id="lbImg" src="" alt="Lightbox image">
  <button class="lb-next" onclick="lbNav(1)" aria-label="Next">›</button>
</div>

<!-- WHATSAPP FLOAT -->
<a href="https://wa.me/251911000000?text=Hello%20Kidist%20Arsema%2C%20I%20am%20interested%20in%20your%20collection" class="whatsapp-float" target="_blank" rel="noopener" title="Chat on WhatsApp">💬</a>
`;

html = html.replace('<!-- CART SIDEBAR -->', newHTML + '\n<!-- CART SIDEBAR -->');

// ── 4. ADD PRESS SECTION before newsletter ──
const pressSection = `
<!-- PRESS / TRUST BAR -->
<section id="press">
  <div class="press-inner">
    <span class="press-label">As Featured In</span>
    <div class="press-logos">
      <span class="press-logo">Vogue Africa</span>
      <span class="press-logo">Ethiopian Herald</span>
      <span class="press-logo">Addis Fashion Week</span>
      <span class="press-logo">Africa Style Daily</span>
      <span class="press-logo">Habesha Magazine</span>
    </div>
  </div>
</section>
`;
html = html.replace('<!-- NEWSLETTER -->', pressSection + '\n<!-- NEWSLETTER -->');

// ── 5. ADD SIZE SELECTORS to each product card ──
html = html.replace(/<div class="product-rating">★[^<]*<\/div>\s*<\/div>/g, (match) => {
  const sizes = `
      <div class="product-sizes">
        <button class="size-btn" onclick="toggleSize(this)">XS</button>
        <button class="size-btn" onclick="toggleSize(this)">S</button>
        <button class="size-btn active" onclick="toggleSize(this)">M</button>
        <button class="size-btn" onclick="toggleSize(this)">L</button>
        <button class="size-btn" onclick="toggleSize(this)">XL</button>
      </div>`;
  return match.replace('</div>\n    </div>', sizes + '\n    </div>\n    </div>');
});

// ── 6. INJECT LIGHTBOX JS + size toggle + mobile nav active ──
const extraJS = `
// ── LIGHTBOX ──
const lbImages = Array.from(document.querySelectorAll('.gallery-item img')).map(i => i.src);
let lbCurrent = 0;
document.querySelectorAll('.gallery-item').forEach((el, i) => {
  el.addEventListener('click', () => openLightbox(i));
});
function openLightbox(idx) {
  lbCurrent = idx;
  document.getElementById('lbImg').src = lbImages[idx];
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}
function lbNav(dir) {
  lbCurrent = (lbCurrent + dir + lbImages.length) % lbImages.length;
  document.getElementById('lbImg').src = lbImages[lbCurrent];
}
document.getElementById('lightbox').addEventListener('click', function(e) {
  if (e.target === this) closeLightbox();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') lbNav(-1);
  if (e.key === 'ArrowRight') lbNav(1);
});

// ── SIZE TOGGLE ──
function toggleSize(btn) {
  btn.closest('.product-sizes').querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

// ── MOBILE NAV ACTIVE STATE ──
const mobileLinks = document.querySelectorAll('.mobile-bottom-nav a');
window.addEventListener('scroll', () => {
  const sections = ['hero','collections','lookbook','wedding','custom'];
  let current = 'hero';
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el && window.scrollY >= el.offsetTop - 200) current = id;
  });
  mobileLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
}, { passive: true });

// ── LOOKBOOK ITEMS: also add to lightbox ──
document.querySelectorAll('.lookbook-item img').forEach((img, i) => {
  img.style.cursor = 'zoom-in';
  img.addEventListener('click', () => {
    document.getElementById('lbImg').src = img.src;
    document.getElementById('lightbox').classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

// ── COLLECTION CARDS: quick view ──
document.querySelectorAll('.col-card-img').forEach(img => {
  img.style.cursor = 'zoom-in';
  img.addEventListener('click', () => {
    document.getElementById('lbImg').src = img.src;
    document.getElementById('lightbox').classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});
`;

// Insert extra JS before the closing </script> of the end block
html = html.replace(
  '// ── COLLECTION CARDS',
  extraJS + '\n// ── COLLECTION CARDS'
);

// If that didn't match, append before </script> in the last script block
if (!html.includes('// ── LIGHTBOX ──')) {
  html = html.replace(/(<\/script>\s*<\/body>)/, extraJS + '\n$1');
}

fs.writeFileSync('kidist-arsema.html', html, 'utf8');
console.log('✅ Phase 2 upgrade complete! Lines:', html.split('\n').length);
