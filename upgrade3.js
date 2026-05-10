const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
const P = (n) => `photos/photo_${n}_2026-05-10_14-19-11.jpg`;

// ═══════════════════════════════════════════════
// 1. HERO PHOTO FIX — ensure overlay layering is correct
// ═══════════════════════════════════════════════
// Add z-index to hero content so it sits above slider
html = html.replace('.hero-content {\n  position: relative; z-index: 2;',
  '.hero-content {\n  position: relative; z-index: 3;');

// ═══════════════════════════════════════════════
// 2. PRODUCT DATA — embed in HTML as JSON for modal
// ═══════════════════════════════════════════════
const products = [
  { id:1, img:P(12), name:'Addis Gold Kemis', price:'ETB 4,800', badge:'New', cat:'Women · Kemis',
    desc:'A masterpiece of Ethiopian embroidery. Hand-stitched tilet borders in 22k gold thread adorn this full-length Habesha Kemis, crafted from premium highland cotton.',
    fabric:'100% Ethiopian Highland Cotton', care:'Dry clean only', origin:'Addis Ababa' },
  { id:2, img:P(13), name:'Royal Green Shamma', price:'ETB 3,840', orig:'ETB 4,800', badge:'New', cat:'Women · Shamma',
    desc:'A regal hand-woven shamma in deep emerald, threaded with gold tilet borders. Worn for ceremonies and cultural celebrations.',
    fabric:'Hand-woven Ethiopian Cotton', care:'Hand wash cold', origin:'Gondar, Ethiopia' },
  { id:3, img:P(14), name:'Cream Ceremony Dress', price:'ETB 6,200', badge:'New', cat:'Women · Ceremony',
    desc:'Pure ivory ceremony dress featuring intricate cross-stitch embroidery along the neckline and hem. A timeless choice for Ethiopian weddings and feast days.',
    fabric:'Imported silk-cotton blend', care:'Dry clean only', origin:'Addis Ababa' },
  { id:4, img:P(15), name:"Men's Coffee Gabi", price:'ETB 3,600', badge:'New', cat:"Men · Gabi",
    desc:'A distinguished men\'s gabi in rich coffee-brown tones. Wrap-style with gold trim, ideal for Timkat, Meskel, and formal Ethiopian ceremonies.',
    fabric:'Ethiopian hand-woven cotton', care:'Hand wash cold', origin:'Harar, Ethiopia' },
  { id:5, img:P(16), name:'Bridal White Kemis', price:'ETB 8,500', badge:'New', cat:'Bridal · Kemis',
    desc:'The pinnacle of Ethiopian bridal fashion. Full-length white Kemis with delicate gold embroidery cascading from neckline to hem — made to last generations.',
    fabric:'Premium Ethiopian cotton + silk overlay', care:'Dry clean only', origin:'Addis Ababa' },
  { id:6, img:P(17), name:"Men's Ceremony Suit", price:'ETB 5,200', badge:'New', cat:"Men · Suit",
    desc:'A modern take on the traditional men\'s Habesha suit. Tailored cut with embroidered lapels and a mandarin collar. Perfect for weddings and cultural events.',
    fabric:'Ethiopian cotton blend', care:'Dry clean only', origin:'Addis Ababa' },
  { id:7, img:P(18), name:'Tilet Gold Edition', price:'ETB 4,200', orig:'ETB 5,000', badge:'Sale', cat:'Women · Special Edition',
    desc:'Our bestselling Tilet Gold Edition — featuring the most intricate hand-embroidered border patterns in our collection. Limited availability.',
    fabric:'Luxury Ethiopian cotton', care:'Dry clean only', origin:'Addis Ababa' },
  { id:8, img:P(19), name:'Modern Habesha Kemis', price:'ETB 3,900', badge:'New', cat:'Women · Modern',
    desc:'A contemporary interpretation of the classic Habesha Kemis with a fitted silhouette, shorter length, and minimalist embroidery for the modern Ethiopian woman.',
    fabric:'Cotton-linen blend', care:'Machine wash gentle', origin:'Addis Ababa' },
];

// ═══════════════════════════════════════════════
// 3. ADD PRODUCT DATA ATTRIBUTE to each card
// ═══════════════════════════════════════════════
// Replace product-card divs to include data-id and onclick
let prodIdx = 0;
html = html.replace(/<div class="product-card reveal([^"]*)">/g, (match, delay) => {
  prodIdx++;
  return `<div class="product-card reveal${delay}" data-product-id="${prodIdx}" onclick="openQuickView(${prodIdx})">`;
});

// ═══════════════════════════════════════════════
// 4. ANIMATE STAT NUMBERS
// ═══════════════════════════════════════════════
html = html.replace(
  '<div class="stat-num">500+</div>',
  '<div class="stat-num" data-count="500" data-suffix="+">0+</div>'
);
html = html.replace(
  '<div class="stat-num">40+</div>',
  '<div class="stat-num" data-count="40" data-suffix="+">0+</div>'
);
html = html.replace(
  '<div class="stat-num">15yr</div>',
  '<div class="stat-num" data-count="15" data-suffix="yr">0yr</div>'
);
// Also animate story values
html = html.replace(
  '<div class="story-val-num">500+</div>',
  '<div class="story-val-num" data-count="500" data-suffix="+">0+</div>'
);
html = html.replace(
  '<div class="story-val-num">40+</div>',
  '<div class="story-val-num" data-count="40" data-suffix="+">0+</div>'
);
html = html.replace(
  '<div class="story-val-num">15yr</div>',
  '<div class="story-val-num" data-count="15" data-suffix="yr">0yr</div>'
);

// ═══════════════════════════════════════════════
// 5. REPLACE CUSTOM ORDER SECTION with a functional form
// ═══════════════════════════════════════════════
const customSection = `<!-- CUSTOM ORDER CTA -->
<section id="custom">
  <div class="custom-inner" style="max-width:900px;text-align:center;">
    <div class="custom-divider reveal"></div>
    <p class="section-eyebrow reveal reveal-delay-1" style="text-align:center;margin-top:2rem;">Bespoke Service</p>
    <h2 class="section-title reveal reveal-delay-2" style="font-size:clamp(2.5rem,4.5vw,4rem);margin-top:1rem;">Your Vision.<br><em>Our Craft.</em></h2>
    <p class="section-subtitle reveal reveal-delay-3" style="margin:1.5rem auto 3rem;text-align:center;">Commission a one-of-a-kind Ethiopian garment. From wedding Kemis to ceremonial gabi — our master artisans bring your vision to life.</p>

    <form class="custom-form reveal reveal-delay-3" onsubmit="handleCustomOrder(event)" id="customOrderForm">
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Full Name</label>
          <input type="text" class="form-input" placeholder="Your name" required>
        </div>
        <div class="form-group">
          <label class="form-label">Email Address</label>
          <input type="email" class="form-input" placeholder="your@email.com" required>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Phone / WhatsApp</label>
          <input type="tel" class="form-input" placeholder="+1 or +251...">
        </div>
        <div class="form-group">
          <label class="form-label">Garment Type</label>
          <select class="form-input form-select" required>
            <option value="">Select type...</option>
            <option>Women's Habesha Kemis</option>
            <option>Men's Habesha Suit</option>
            <option>Bridal Wedding Kemis</option>
            <option>Ceremonial Gabi / Shamma</option>
            <option>Complete Wedding Set (His &amp; Hers)</option>
            <option>Children's Traditional Wear</option>
            <option>Other / Not sure</option>
          </select>
        </div>
      </div>
      <div class="form-group" style="grid-column:1/-1;">
        <label class="form-label">Event / Occasion</label>
        <input type="text" class="form-input" placeholder="e.g. Wedding in July 2025, Timkat ceremony, graduation...">
      </div>
      <div class="form-group" style="grid-column:1/-1;">
        <label class="form-label">Describe Your Vision</label>
        <textarea class="form-input form-textarea" rows="4" placeholder="Colors, embroidery style, occasion details, inspirations... anything helps!" required></textarea>
      </div>
      <div class="form-row" style="align-items:center;">
        <div class="form-group">
          <label class="form-label">Budget Range (ETB)</label>
          <select class="form-input form-select">
            <option>Under ETB 5,000</option>
            <option>ETB 5,000 – 10,000</option>
            <option>ETB 10,000 – 20,000</option>
            <option>ETB 20,000+</option>
            <option>Flexible / Discuss</option>
          </select>
        </div>
        <div class="form-group" style="display:flex;align-items:flex-end;padding-bottom:0;">
          <button type="submit" class="btn-primary" style="width:100%;justify-content:center;padding:1.1rem 2rem;" id="customSubmitBtn">
            Send Request →
          </button>
        </div>
      </div>
    </form>
    <p class="custom-note">We typically respond within 24 hours. For urgent requests, WhatsApp us directly.</p>
  </div>
</section>`;

html = html.replace(/<!-- CUSTOM ORDER CTA -->[\s\S]*?<\/section>\s*\n\s*<!-- NEWSLETTER -->/, customSection + '\n\n<!-- NEWSLETTER -->');

// ═══════════════════════════════════════════════
// 6. ADD CSS for new features
// ═══════════════════════════════════════════════
const css3 = `
/* ── QUICK VIEW MODAL ── */
#qv-overlay { position:fixed; inset:0; background:rgba(17,8,4,0.88); z-index:8000; opacity:0; visibility:hidden; transition:opacity 0.4s,visibility 0.4s; backdrop-filter:blur(8px); }
#qv-overlay.open { opacity:1; visibility:visible; }
#qv-modal { position:fixed; top:50%; left:50%; transform:translate(-50%,-60%); z-index:8001; width:min(900px,92vw); max-height:90vh; overflow-y:auto; background:var(--cream); display:grid; grid-template-columns:1fr 1fr; transition:transform 0.5s cubic-bezier(0.16,1,0.3,1),opacity 0.4s; opacity:0; }
#qv-modal.open { transform:translate(-50%,-50%); opacity:1; }
.qv-img-wrap { position:relative; overflow:hidden; aspect-ratio:3/4; }
.qv-img { width:100%; height:100%; object-fit:cover; object-position:top; display:block; }
.qv-body { padding:2.5rem; display:flex; flex-direction:column; gap:1rem; overflow-y:auto; }
.qv-close { position:absolute; top:1rem; right:1rem; z-index:1; background:rgba(42,32,24,0.7); color:var(--cream); border:none; width:36px; height:36px; border-radius:50%; font-size:1.1rem; cursor:pointer; display:flex; align-items:center; justify-content:center; }
.qv-cat { font-size:0.55rem; letter-spacing:0.4em; text-transform:uppercase; color:var(--gold); font-weight:600; }
.qv-name { font-family:'Cormorant Garamond',serif; font-size:1.9rem; font-weight:400; color:var(--coffee); line-height:1.1; }
.qv-price { font-size:1rem; font-weight:600; color:var(--coffee); }
.qv-desc { font-size:0.82rem; line-height:1.9; color:var(--coffee-light); border-top:1px solid rgba(59,43,36,0.1); padding-top:1rem; }
.qv-label { font-size:0.6rem; letter-spacing:0.25em; text-transform:uppercase; color:var(--coffee-mid); font-weight:600; margin-bottom:0.5rem; display:block; }
.qv-sizes { display:flex; gap:0.4rem; flex-wrap:wrap; }
.qv-size { background:none; border:1px solid rgba(59,43,36,0.2); color:var(--coffee); font-size:0.7rem; padding:0.35rem 0.75rem; cursor:pointer; font-family:'Manrope',sans-serif; transition:all 0.2s; }
.qv-size:hover, .qv-size.sel { background:var(--coffee); color:var(--cream); border-color:var(--coffee); }
.qv-colors { display:flex; gap:0.6rem; }
.qv-color { width:28px; height:28px; border-radius:50%; cursor:pointer; border:2px solid transparent; transition:border-color 0.2s; }
.qv-color.sel { border-color:var(--gold); }
.qv-actions { display:flex; gap:0.75rem; margin-top:auto; }
.qv-add-btn { flex:1; padding:1rem; background:var(--gold); color:var(--charcoal); border:none; font-size:0.7rem; letter-spacing:0.2em; text-transform:uppercase; font-weight:700; font-family:'Manrope',sans-serif; cursor:pointer; transition:background 0.3s; }
.qv-add-btn:hover { background:var(--coffee); color:var(--cream); }
.qv-wish-btn { width:52px; border:1px solid rgba(59,43,36,0.2); background:none; font-size:1.2rem; cursor:pointer; transition:all 0.2s; }
.qv-wish-btn:hover { border-color:var(--gold); color:var(--gold); }
.qv-meta { display:flex; flex-direction:column; gap:0.35rem; border-top:1px solid rgba(59,43,36,0.1); padding-top:1rem; }
.qv-meta-row { display:flex; gap:1rem; font-size:0.72rem; }
.qv-meta-key { color:var(--coffee-light); min-width:70px; }
.qv-meta-val { color:var(--coffee); font-weight:500; }
@media(max-width:640px){ #qv-modal{grid-template-columns:1fr;} .qv-img-wrap{aspect-ratio:4/3;} }

/* ── CUSTOM FORM ── */
.custom-form { text-align:left; margin-top:2.5rem; }
.form-row { display:grid; grid-template-columns:1fr 1fr; gap:1.25rem; margin-bottom:1.25rem; }
.form-group { display:flex; flex-direction:column; gap:0.4rem; margin-bottom:1.25rem; }
.form-label { font-size:0.62rem; letter-spacing:0.2em; text-transform:uppercase; color:var(--coffee-mid); font-weight:600; }
.form-input { background:var(--white); border:1px solid rgba(59,43,36,0.15); padding:0.85rem 1.1rem; font-family:'Manrope',sans-serif; font-size:0.85rem; color:var(--coffee); outline:none; transition:border-color 0.3s,box-shadow 0.3s; border-radius:0; appearance:none; }
.form-input:focus { border-color:var(--gold); box-shadow:0 0 0 3px rgba(200,169,107,0.12); }
.form-textarea { resize:vertical; min-height:110px; }
.form-select { cursor:pointer; background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%238B6B5E' stroke-width='1.5' fill='none'/%3E%3C/svg%3E"); background-repeat:no-repeat; background-position:right 1rem center; padding-right:2.5rem; }
.custom-note { font-size:0.72rem; color:var(--coffee-light); margin-top:1.5rem; opacity:0.7; }
@media(max-width:640px){ .form-row{grid-template-columns:1fr;} }

/* ── PRODUCT CARD CURSOR ── */
.product-card { cursor:pointer; }

/* ── COUNTER ANIMATION ── */
.stat-num, .story-val-num { transition:none; }
`;
html = html.replace('</style>', css3 + '\n</style>');

// ═══════════════════════════════════════════════
// 7. INJECT QUICK VIEW MODAL HTML
// ═══════════════════════════════════════════════
const qvModal = `
<!-- QUICK VIEW MODAL -->
<div id="qv-overlay" onclick="closeQV()"></div>
<div id="qv-modal" role="dialog" aria-modal="true" aria-label="Product quick view">
  <div class="qv-img-wrap">
    <button class="qv-close" onclick="closeQV()" aria-label="Close">✕</button>
    <img id="qvImg" class="qv-img" src="" alt="">
  </div>
  <div class="qv-body">
    <div class="qv-cat" id="qvCat"></div>
    <div class="qv-name" id="qvName"></div>
    <div class="qv-price" id="qvPrice"></div>
    <p class="qv-desc" id="qvDesc"></p>
    <div>
      <span class="qv-label">Select Size</span>
      <div class="qv-sizes">
        <button class="qv-size" onclick="selSize(this)">XS</button>
        <button class="qv-size sel" onclick="selSize(this)">S</button>
        <button class="qv-size" onclick="selSize(this)">M</button>
        <button class="qv-size" onclick="selSize(this)">L</button>
        <button class="qv-size" onclick="selSize(this)">XL</button>
        <button class="qv-size" onclick="selSize(this)">XXL</button>
      </div>
    </div>
    <div>
      <span class="qv-label">Color</span>
      <div class="qv-colors">
        <div class="qv-color sel" style="background:#F8F5F0;border:1px solid #ddd;" onclick="selColor(this)" title="Cream"></div>
        <div class="qv-color" style="background:#C8A96B;" onclick="selColor(this)" title="Gold"></div>
        <div class="qv-color" style="background:#1B4332;" onclick="selColor(this)" title="Emerald"></div>
        <div class="qv-color" style="background:#3B2B24;" onclick="selColor(this)" title="Coffee"></div>
        <div class="qv-color" style="background:#121212;" onclick="selColor(this)" title="Midnight"></div>
      </div>
    </div>
    <div class="qv-actions">
      <button class="qv-add-btn" id="qvAddBtn" onclick="qvAddToCart()">Add to Bag →</button>
      <button class="qv-wish-btn" onclick="qvToggleWish(this)" aria-label="Wishlist">♡</button>
    </div>
    <div class="qv-meta">
      <div class="qv-meta-row"><span class="qv-meta-key">Fabric</span><span class="qv-meta-val" id="qvFabric"></span></div>
      <div class="qv-meta-row"><span class="qv-meta-key">Care</span><span class="qv-meta-val" id="qvCare"></span></div>
      <div class="qv-meta-row"><span class="qv-meta-key">Origin</span><span class="qv-meta-val" id="qvOrigin"></span></div>
    </div>
  </div>
</div>
`;
html = html.replace('<!-- CART SIDEBAR -->', qvModal + '\n<!-- CART SIDEBAR -->');

// ═══════════════════════════════════════════════
// 8. ADD JS for all new features
// ═══════════════════════════════════════════════
const js3 = `
// ── PRODUCT DATA ──
const PRODUCTS = ${JSON.stringify(products, null, 2)};

// ── QUICK VIEW ──
let qvCurrent = null;
function openQuickView(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  qvCurrent = p;
  document.getElementById('qvImg').src = p.img;
  document.getElementById('qvImg').alt = p.name;
  document.getElementById('qvCat').textContent = p.cat;
  document.getElementById('qvName').textContent = p.name;
  document.getElementById('qvPrice').textContent = p.price + (p.orig ? '  ' + p.orig : '');
  document.getElementById('qvDesc').textContent = p.desc;
  document.getElementById('qvFabric').textContent = p.fabric;
  document.getElementById('qvCare').textContent = p.care;
  document.getElementById('qvOrigin').textContent = p.origin;
  document.getElementById('qv-overlay').classList.add('open');
  document.getElementById('qv-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeQV() {
  document.getElementById('qv-overlay').classList.remove('open');
  document.getElementById('qv-modal').classList.remove('open');
  document.body.style.overflow = '';
}
function selSize(btn) {
  btn.closest('.qv-sizes').querySelectorAll('.qv-size').forEach(b => b.classList.remove('sel'));
  btn.classList.add('sel');
}
function selColor(el) {
  el.closest('.qv-colors').querySelectorAll('.qv-color').forEach(c => c.classList.remove('sel'));
  el.classList.add('sel');
}
function qvAddToCart() {
  if (!qvCurrent) return;
  addToCart(qvCurrent.name, qvCurrent.price, qvCurrent.img);
  const btn = document.getElementById('qvAddBtn');
  btn.textContent = 'Added to Bag ✓';
  btn.style.background = '#1B4332';
  btn.style.color = '#fff';
  setTimeout(() => { btn.textContent = 'Add to Bag →'; btn.style.background = ''; btn.style.color = ''; }, 2000);
}
function qvToggleWish(btn) {
  const active = btn.dataset.active === '1';
  btn.dataset.active = active ? '0' : '1';
  btn.textContent = active ? '♡' : '♥';
  btn.style.color = active ? '' : 'var(--gold)';
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeQV(); });

// ── ANIMATED COUNTERS ──
function animateCount(el) {
  const target = parseInt(el.dataset.count);
  const suffix = el.dataset.suffix || '';
  let start = null;
  const dur = 1600;
  const step = ts => {
    if (!start) start = ts;
    const progress = Math.min((ts - start) / dur, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(ease * target) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
const counterObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting && e.target.dataset.count) {
      animateCount(e.target);
      counterObs.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-count]').forEach(el => counterObs.observe(el));

// ── CUSTOM ORDER FORM ──
function handleCustomOrder(e) {
  e.preventDefault();
  const btn = document.getElementById('customSubmitBtn');
  btn.textContent = 'Sending...';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = 'Request Sent ✓';
    btn.style.background = '#1B4332';
    e.target.reset();
    showToast('Your custom order request has been received! We\'ll contact you within 24 hours.');
    setTimeout(() => { btn.textContent = 'Send Request →'; btn.style.background = ''; btn.disabled = false; }, 4000);
  }, 1200);
}

// ── PREVENT PRODUCT CARD CLICK when clicking action buttons ──
document.querySelectorAll('.product-actions button, .size-btn').forEach(btn => {
  btn.addEventListener('click', e => e.stopPropagation());
});
`;

// Insert before the last </script>
html = html.replace(/(<\/script>\s*<\/body>)/, js3 + '\n$1');

fs.writeFileSync('index.html', html, 'utf8');
console.log('✅ Phase 3 done! Lines:', html.split('\n').length);
