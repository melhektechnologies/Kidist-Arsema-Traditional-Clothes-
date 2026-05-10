const fs = require('fs');
let html = fs.readFileSync('kidist-arsema.html', 'utf8');

const P = (n) => `photos/photo_${n}_2026-05-10_14-19-11.jpg`;

// ── FIX literal \n bug ──
html = html.replace(/\\n<\/body>/, '</body>');

// ── HERO: full cinematic slider ──
html = html.replace(
  /<section id="hero">[\s\S]*?<\/section>/,
  `<section id="hero">
  <div class="hero-slider" id="heroSlider">
    <div class="hero-slide active" style="background-image:url('${P(1)}')"></div>
    <div class="hero-slide" style="background-image:url('${P(2)}')"></div>
    <div class="hero-slide" style="background-image:url('${P(3)}')"></div>
  </div>
  <div class="hero-overlay"></div>
  <div class="hero-pattern"></div>
  <div class="hero-gradient-orb"></div>
  <svg class="eth-pattern" style="width:500px;height:500px;top:-80px;left:-80px;" viewBox="0 0 400 400" fill="none">
    <circle cx="200" cy="200" r="180" stroke="#C8A96B" stroke-width="0.5"/>
    <circle cx="200" cy="200" r="140" stroke="#C8A96B" stroke-width="0.5"/>
    <circle cx="200" cy="200" r="100" stroke="#C8A96B" stroke-width="0.5"/>
    <line x1="20" y1="200" x2="380" y2="200" stroke="#C8A96B" stroke-width="0.5"/>
    <line x1="200" y1="20" x2="200" y2="380" stroke="#C8A96B" stroke-width="0.5"/>
    <line x1="73" y1="73" x2="327" y2="327" stroke="#C8A96B" stroke-width="0.5"/>
    <line x1="327" y1="73" x2="73" y2="327" stroke="#C8A96B" stroke-width="0.5"/>
  </svg>
  <div class="hero-content">
    <p class="hero-eyebrow">Est. 2010 · Addis Ababa, Ethiopia</p>
    <h1 class="hero-title">Ethiopian Heritage<br>Reimagined For<br><em>Modern Elegance</em></h1>
    <p class="hero-subtitle">Luxury traditional fashion crafted with timeless identity. Where Habesha artistry meets the world's finest runways.</p>
    <div class="hero-ctas">
      <a href="#collections" class="btn-primary">Explore Collection →</a>
      <a href="#custom" class="btn-outline">Book Custom Design</a>
    </div>
  </div>
  <div class="hero-stats">
    <div class="stat"><div class="stat-num">500+</div><div class="stat-label">Designs Created</div></div>
    <div class="stat"><div class="stat-num">40+</div><div class="stat-label">Countries Reached</div></div>
    <div class="stat"><div class="stat-num">15yr</div><div class="stat-label">Of Heritage</div></div>
  </div>
  <div class="hero-slider-dots">
    <button class="hero-dot active" onclick="goSlide(0)"></button>
    <button class="hero-dot" onclick="goSlide(1)"></button>
    <button class="hero-dot" onclick="goSlide(2)"></button>
  </div>
  <div class="hero-scroll-indicator">
    <span>Scroll</span>
    <div class="scroll-line"></div>
  </div>
</section>`
);

// ── COLLECTIONS: inject real photos ──
html = html.replace(/<div class="col-figure">\s*<img src="[^"]*" class="col-card-img"[^>]*>\s*<\/div>/,
  `<div class="col-figure"><img src="${P(4)}" class="col-card-img"></div>`);
// Replace remaining col-figures with gradient divs → use photos sequentially
const colPhotos = [5,6,7,8];
let colIdx = 0;
html = html.replace(/<div class="col-figure">\s*<div class="img-gradient-\d"><\/div>\s*<\/div>/g,
  () => `<div class="col-figure"><img src="${P(colPhotos[colIdx++] || 9)}" class="col-card-img"></div>`);

// ── STORY: inject real photos ──
html = html.replace(
  /<div class="story-img-main">([\s\S]*?)<\/div>/,
  `<div class="story-img-main"><img src="${P(10)}" style="width:100%;height:100%;object-fit:cover;object-position:top;"></div>`
);
html = html.replace(
  /<div class="story-img-accent">([\s\S]*?)<\/div>/,
  `<div class="story-img-accent"><img src="${P(11)}" style="width:100%;height:100%;object-fit:cover;"></div>`
);

// ── PRODUCTS: expand from 4 to 8 cards ──
const products = [
  { img: P(12), name: 'Addis Gold Kemis',       price: 'ETB 4,800', badge: 'New',  orig: '' },
  { img: P(13), name: 'Royal Green Shamma',      price: 'ETB 3,840', badge: 'New',  orig: 'ETB 4,800' },
  { img: P(14), name: 'Cream Ceremony Dress',    price: 'ETB 6,200', badge: 'New',  orig: '' },
  { img: P(15), name: "Men's Coffee Gabi",       price: 'ETB 3,600', badge: 'New',  orig: '' },
  { img: P(16), name: 'Bridal White Kemis',      price: 'ETB 8,500', badge: 'New',  orig: '' },
  { img: P(17), name: "Men's Ceremony Suit",     price: 'ETB 5,200', badge: 'New',  orig: '' },
  { img: P(18), name: 'Tilet Gold Edition',      price: 'ETB 4,200', badge: 'Sale', orig: 'ETB 5,000' },
  { img: P(19), name: 'Modern Habesha Kemis',    price: 'ETB 3,900', badge: 'New',  orig: '' },
];
const prodGrid = products.map((p, i) => `
    <div class="product-card reveal${i > 0 ? ' reveal-delay-' + Math.min(i,4) : ''}">
      <div class="product-img-wrap">
        <img src="${p.img}" class="product-img" alt="${p.name}" loading="lazy">
        <div class="product-badges"><span class="badge badge-${p.badge === 'Sale' ? 'sale' : 'new'}">${p.badge}</span></div>
        <div class="product-actions">
          <button class="action-btn" onclick="addToCart('${p.name}','${p.price}','${p.img}')">Add to Cart</button>
          <button class="action-btn action-btn-icon" title="Wishlist">♡</button>
        </div>
      </div>
      <div class="product-name">${p.name}</div>
      <div class="product-price">
        <span class="price-current">${p.price}</span>
        ${p.orig ? `<span class="price-original">${p.orig}</span>` : ''}
      </div>
      <div class="product-rating">${'★'.repeat(5).split('').map((s,j) => `<span class="star">${s}</span>`).join('')}</div>
    </div>`).join('\n');

html = html.replace(
  /<div class="products-grid">[\s\S]*?<\/div>\s*<\/section>\s*\n\s*<!-- CRAFTSMANSHIP/,
  `<div class="products-grid">${prodGrid}\n  </div>\n</section>\n\n<!-- CRAFTSMANSHIP`
);

// ── LOOKBOOK: inject real photos ──
const lbPhotos = [P(1),P(2),P(3),P(4),P(5)];
let lbIdx = 0;
html = html.replace(/<div class="lookbook-img lb-\d"><\/div>/g,
  () => `<img src="${lbPhotos[lbIdx++]}" class="lookbook-img" loading="lazy">`);

// ── WEDDING VISUAL: inject photo ──
html = html.replace(
  /<div class="wedding-visual">[\s\S]*?<\/div>\s*\n\s*<div class="wedding-content"/,
  `<div class="wedding-visual"><img src="${P(20)}" style="width:100%;height:100%;object-fit:cover;object-position:top;opacity:0.8;clip-path:polygon(10% 0%,100% 0%,100% 100%,0% 100%);"></div>
  <div class="wedding-content"`
);

// ── GALLERY: inject all photos ──
const galleryPhotos = [P(1),P(2),P(3),P(4),P(5),P(6),P(7)];
let gIdx = 0;
html = html.replace(/<div class="gallery-item-inner [^"]*" style="[^"]*"><\/div>/g,
  () => `<img src="${galleryPhotos[gIdx++ % galleryPhotos.length]}" class="gallery-item-inner" style="width:100%;height:100%;object-fit:cover;" loading="lazy">`);

// ── ADD HERO SLIDER CSS ──
const heroSliderCSS = `
/* ── HERO SLIDER ── */
.hero-slider { position:absolute; inset:0; z-index:0; }
.hero-slide { position:absolute; inset:0; background-size:cover; background-position:center top; opacity:0; transition:opacity 1.6s cubic-bezier(0.4,0,0.2,1); }
.hero-slide.active { opacity:1; }
.hero-overlay { position:absolute; inset:0; z-index:1; background:linear-gradient(165deg,rgba(26,17,13,0.82) 0%,rgba(42,30,24,0.65) 50%,rgba(27,67,50,0.4) 100%); }
.hero-slider-dots { position:absolute; bottom:3rem; right:4rem; display:flex; gap:0.6rem; z-index:3; }
.hero-dot { width:24px; height:2px; background:rgba(255,255,255,0.3); border:none; cursor:none; padding:0; transition:background 0.4s,width 0.4s; }
.hero-dot.active { background:var(--gold); width:40px; }

/* ── PRODUCTS GRID 4-col on wide ── */
.products-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:1.5rem; }
@media(max-width:1100px){.products-grid{grid-template-columns:repeat(2,1fr);}}
@media(max-width:600px){.products-grid{grid-template-columns:1fr 1fr;gap:1rem;}}

/* ── CART SIDEBAR ── */
#cart-overlay { position:fixed; inset:0; background:rgba(0,0,0,0.5); z-index:2000; opacity:0; visibility:hidden; transition:opacity 0.4s,visibility 0.4s; backdrop-filter:blur(4px); }
#cart-overlay.open { opacity:1; visibility:visible; }
#cart-panel { position:fixed; top:0; right:0; bottom:0; width:420px; max-width:100vw; background:var(--cream); z-index:2001; transform:translateX(100%); transition:transform 0.5s cubic-bezier(0.16,1,0.3,1); display:flex; flex-direction:column; }
#cart-panel.open { transform:translateX(0); }
.cart-header { padding:2rem; border-bottom:1px solid rgba(59,43,36,0.1); display:flex; justify-content:space-between; align-items:center; }
.cart-header h3 { font-family:'Cormorant Garamond',serif; font-size:1.6rem; font-weight:400; color:var(--coffee); }
.cart-close { background:none; border:none; font-size:1.4rem; cursor:pointer; color:var(--coffee-light); }
.cart-body { flex:1; overflow-y:auto; padding:1.5rem 2rem; }
.cart-empty { text-align:center; padding:3rem 0; color:var(--coffee-light); font-size:0.85rem; }
.cart-item { display:flex; gap:1rem; padding:1rem 0; border-bottom:1px solid rgba(59,43,36,0.08); align-items:center; }
.cart-item-img { width:70px; height:90px; object-fit:cover; flex-shrink:0; }
.cart-item-info { flex:1; }
.cart-item-name { font-family:'Cormorant Garamond',serif; font-size:1rem; color:var(--coffee); margin-bottom:0.3rem; }
.cart-item-price { font-size:0.8rem; color:var(--coffee-light); }
.cart-item-remove { background:none; border:none; color:var(--coffee-light); cursor:pointer; font-size:0.8rem; padding:0.2rem 0.5rem; }
.cart-footer { padding:1.5rem 2rem; border-top:1px solid rgba(59,43,36,0.1); }
.cart-total { display:flex; justify-content:space-between; font-size:0.85rem; font-weight:600; color:var(--coffee); margin-bottom:1.5rem; }
.cart-checkout-btn { width:100%; padding:1rem; background:var(--gold); color:var(--charcoal); border:none; font-size:0.7rem; letter-spacing:0.2em; text-transform:uppercase; font-weight:700; font-family:'Manrope',sans-serif; cursor:pointer; transition:background 0.3s; }
.cart-checkout-btn:hover { background:var(--coffee); color:var(--cream); }

/* ── TOAST ── */
.toast { position:fixed; bottom:2rem; left:50%; transform:translateX(-50%) translateY(100px); background:var(--coffee); color:var(--cream); padding:0.85rem 2rem; font-size:0.75rem; letter-spacing:0.1em; z-index:5000; transition:transform 0.4s cubic-bezier(0.16,1,0.3,1); white-space:nowrap; }
.toast.show { transform:translateX(-50%) translateY(0); }
`;

html = html.replace('</style>', heroSliderCSS + '\n</style>');

// ── ADD CART SIDEBAR HTML + TOAST before </body> ──
const cartHTML = `
<!-- CART SIDEBAR -->
<div id="cart-overlay" onclick="closeCart()"></div>
<div id="cart-panel">
  <div class="cart-header">
    <h3>Your Bag</h3>
    <button class="cart-close" onclick="closeCart()">✕</button>
  </div>
  <div class="cart-body" id="cartBody">
    <div class="cart-empty" id="cartEmpty">Your bag is empty.<br>Discover our collections.</div>
  </div>
  <div class="cart-footer">
    <div class="cart-total"><span>Total</span><span id="cartTotal">ETB 0</span></div>
    <button class="cart-checkout-btn">Proceed to Checkout →</button>
  </div>
</div>
<div class="toast" id="toast"></div>
`;

// ── NAV cart icon → opens cart ──
html = html.replace(
  '<span class="nav-icon cart-badge">⊕</span>',
  '<span class="nav-icon cart-badge" onclick="openCart()" style="cursor:pointer;" id="cartIcon">⊕</span>'
);

// ── GSAP + LENIS properly at end of body ──
const endScripts = `
${cartHTML}
<!-- GSAP & Lenis -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
<script>
// ── SMOOTH SCROLL (native fallback if Lenis unavailable) ──
document.documentElement.style.scrollBehavior = 'smooth';

// ── HERO SLIDER ──
let slideIdx = 0;
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.hero-dot');
function goSlide(n) {
  slides[slideIdx].classList.remove('active');
  dots[slideIdx].classList.remove('active');
  slideIdx = n;
  slides[slideIdx].classList.add('active');
  dots[slideIdx].classList.add('active');
}
setInterval(() => goSlide((slideIdx + 1) % slides.length), 5000);

// ── CART ──
let cartItems = JSON.parse(localStorage.getItem('ka_cart') || '[]');
function saveCart() { localStorage.setItem('ka_cart', JSON.stringify(cartItems)); }
function openCart() {
  document.getElementById('cart-overlay').classList.add('open');
  document.getElementById('cart-panel').classList.add('open');
  renderCart();
}
function closeCart() {
  document.getElementById('cart-overlay').classList.remove('open');
  document.getElementById('cart-panel').classList.remove('open');
}
function addToCart(name, price, img) {
  const existing = cartItems.find(i => i.name === name);
  if (existing) { existing.qty++; } else { cartItems.push({name, price, img, qty:1}); }
  saveCart();
  updateCartBadge();
  showToast(name + ' added to bag');
}
function removeFromCart(idx) {
  cartItems.splice(idx, 1);
  saveCart();
  updateCartBadge();
  renderCart();
}
function renderCart() {
  const body = document.getElementById('cartBody');
  const empty = document.getElementById('cartEmpty');
  if (!cartItems.length) { empty.style.display = ''; body.querySelectorAll('.cart-item').forEach(el => el.remove()); document.getElementById('cartTotal').textContent = 'ETB 0'; return; }
  empty.style.display = 'none';
  body.querySelectorAll('.cart-item').forEach(el => el.remove());
  let total = 0;
  cartItems.forEach((item, i) => {
    const num = parseInt(item.price.replace(/[^0-9]/g,''));
    total += num * item.qty;
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = \`<img src="\${item.img}" class="cart-item-img" alt="\${item.name}">
      <div class="cart-item-info">
        <div class="cart-item-name">\${item.name}</div>
        <div class="cart-item-price">\${item.price} × \${item.qty}</div>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart(\${i})">✕</button>\`;
    body.appendChild(div);
  });
  document.getElementById('cartTotal').textContent = 'ETB ' + total.toLocaleString();
}
function updateCartBadge() {
  const icon = document.getElementById('cartIcon');
  const count = cartItems.reduce((s,i) => s + i.qty, 0);
  icon.dataset.count = count;
  if (!icon.style.cssText.includes('::after')) icon.style.position = 'relative';
}
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}
updateCartBadge();

// ── GSAP SCROLL ANIMATIONS ──
if (typeof gsap !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
  gsap.utils.toArray('.col-card-img, .product-img, .lookbook-img').forEach(img => {
    gsap.fromTo(img, { scale: 1.12 }, {
      scale: 1,
      ease: 'none',
      scrollTrigger: { trigger: img.closest('.col-card, .product-img-wrap, .lookbook-item'), start: 'top bottom', end: 'bottom top', scrub: 1.5 }
    });
  });
  gsap.utils.toArray('.gallery-item').forEach((el, i) => {
    gsap.from(el, { opacity: 0, y: 40, duration: 0.8, delay: i * 0.08,
      scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' }
    });
  });
}
</script>
</body>
</html>`;

// Remove old closing tags + old gsap block
html = html.replace(/\n<!-- GSAP[\s\S]*$/, '');
html = html.replace(/<\/body>\s*<\/html>\s*$/, '');
html = html.trimEnd() + endScripts;

fs.writeFileSync('kidist-arsema.html', html, 'utf8');
console.log('✅ Upgrade complete! Lines:', html.split('\n').length);
