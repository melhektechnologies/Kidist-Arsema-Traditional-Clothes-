const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// ── CLEANUP 1: Escape single quotes in inline onclick handlers ──
// Specifically looking for addToCart('Men's ...')
html = html.replace(/addToCart\('([^']+)'/g, (match, p1) => {
  return "addToCart('" + p1.replace(/'/g, "\\'") + "'";
});

// ── CLEANUP 2: Remove duplicate script definitions ──
// I will extract the core logic and rewrite the script block to be clean.
// But first, let's just fix the obvious syntax errors.

// Ensure showToast is escaped
html = html.replace("We'll contact you", "We\\'ll contact you");

// ── REWRITE THE SCRIPT BLOCK ──
// I'll take everything from the first <script> at 1689 to the last </script> and replace it with a consolidated version.

const consolidatedJS = `
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
<script src="https://unpkg.com/@studio-freight/lenis@1.0.19/bundled/lenis.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>

<script>
// ── STATE & DATA ──
let cartItems = JSON.parse(localStorage.getItem('ka_cart') || '[]');
const lbImages = Array.from(document.querySelectorAll('.gallery-item img')).map(i => i.src);
let lbCurrent = 0;
let qvCurrent = null;
let slideIdx = 0;

const PRODUCTS = [
  { id: 1, img: "photos/photo_12_2026-05-10_14-19-11.jpg", name: "Addis Gold Kemis", price: "ETB 4,800", badge: "New", cat: "Women · Kemis", desc: "A masterpiece of Ethiopian embroidery. Hand-stitched tilet borders in 22k gold thread adorn this full-length Habesha Kemis, crafted from premium highland cotton.", fabric: "100% Ethiopian Highland Cotton", care: "Dry clean only", origin: "Addis Ababa" },
  { id: 2, img: "photos/photo_13_2026-05-10_14-19-11.jpg", name: "Royal Green Shamma", price: "ETB 3,840", orig: "ETB 4,800", badge: "New", cat: "Women · Shamma", desc: "A regal hand-woven shamma in deep emerald, threaded with gold tilet borders. Worn for ceremonies and cultural celebrations.", fabric: "Hand-woven Ethiopian Cotton", care: "Hand wash cold", origin: "Gondar, Ethiopia" },
  { id: 3, img: "photos/photo_14_2026-05-10_14-19-11.jpg", name: "Cream Ceremony Dress", price: "ETB 6,200", badge: "New", cat: "Women · Ceremony", desc: "Pure ivory ceremony dress featuring intricate cross-stitch embroidery along the neckline and hem. A timeless choice for Ethiopian weddings and feast days.", fabric: "Imported silk-cotton blend", care: "Dry clean only", origin: "Addis Ababa" },
  { id: 4, img: "photos/photo_15_2026-05-10_14-19-11.jpg", name: "Men's Coffee Gabi", price: "ETB 3,600", badge: "New", cat: "Men · Gabi", desc: "A distinguished men's gabi in rich coffee-brown tones. Wrap-style with gold trim, ideal for Timkat, Meskel, and formal Ethiopian ceremonies.", fabric: "Ethiopian hand-woven cotton", care: "Hand wash cold", origin: "Harar, Ethiopia" },
  { id: 5, img: "photos/photo_16_2026-05-10_14-19-11.jpg", name: "Bridal White Kemis", price: "ETB 8,500", badge: "New", cat: "Bridal · Kemis", desc: "The pinnacle of Ethiopian bridal fashion. Full-length white Kemis with delicate gold embroidery cascading from neckline to hem — made to last generations.", fabric: "Premium Ethiopian cotton + silk overlay", care: "Dry clean only", origin: "Addis Ababa" },
  { id: 6, img: "photos/photo_17_2026-05-10_14-19-11.jpg", name: "Men's Ceremony Suit", price: "ETB 5,200", badge: "New", cat: "Men · Suit", desc: "A modern take on the traditional men's Habesha suit. Tailored cut with embroidered lapels and a mandarin collar. Perfect for weddings and cultural events.", fabric: "Ethiopian cotton blend", care: "Dry clean only", origin: "Addis Ababa" },
  { id: 7, img: "photos/photo_18_2026-05-10_14-19-11.jpg", name: "Tilet Gold Edition", price: "ETB 4,200", orig: "ETB 5,000", badge: "Sale", cat: "Women · Special Edition", desc: "Our bestselling Tilet Gold Edition — featuring the most intricate hand-embroidered border patterns in our collection. Limited availability.", fabric: "Luxury Ethiopian cotton", care: "Dry clean only", origin: "Addis Ababa" },
  { id: 8, img: "photos/photo_19_2026-05-10_14-19-11.jpg", name: "Modern Habesha Kemis", price: "ETB 3,900", badge: "New", cat: "Women · Modern", desc: "A contemporary interpretation of the classic Habesha Kemis with a fitted silhouette, shorter length, and minimalist embroidery for the modern Ethiopian woman.", fabric: "Cotton-linen blend", care: "Machine wash gentle", origin: "Addis Ababa" }
];

// ── CURSOR & GLOW ──
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
const glow = document.getElementById('mouseGlow');
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX; mouseY = e.clientY;
  if(cursor) { cursor.style.left = mouseX + 'px'; cursor.style.top = mouseY + 'px'; }
  if(glow) {
    gsap.to(glow, { x: mouseX, y: mouseY, duration: 0.6, ease: 'power2.out' });
  }
});

function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  if(ring) { ring.style.left = ringX + 'px'; ring.style.top = ringY + 'px'; }
  requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a, button, .col-card, .product-card, .gallery-item, .lookbook-item').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('cursor-grow'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-grow'));
});

// ── SMOOTH SCROLL (Lenis) ──
let lenis;
try {
  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smooth: true });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
  }
} catch (e) { document.documentElement.style.scrollBehavior = 'smooth'; }

// ── HERO SLIDER ──
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.hero-dot');
function goSlide(n) {
  if(!slides.length) return;
  slides[slideIdx].classList.remove('active');
  dots[slideIdx].classList.remove('active');
  slideIdx = n;
  slides[slideIdx].classList.add('active');
  dots[slideIdx].classList.add('active');
}
if(slides.length > 0) setInterval(() => goSlide((slideIdx + 1) % slides.length), 5000);

// ── CART ──
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
  if (!cartItems.length) { 
    empty.style.display = 'block'; 
    body.querySelectorAll('.cart-item').forEach(el => el.remove()); 
    document.getElementById('cartTotal').textContent = 'ETB 0'; 
    return; 
  }
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
}
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}
updateCartBadge();

// ── GSAP & SCROLL ──
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
  
  // Parallax images
  gsap.utils.toArray('.col-card-img, .product-img, .lookbook-img').forEach(img => {
    gsap.fromTo(img, { scale: 1.12 }, {
      scale: 1, ease: 'none',
      scrollTrigger: { 
        trigger: img.closest('.col-card, .product-img-wrap, .lookbook-item'), 
        start: 'top bottom', end: 'bottom top', scrub: 1.5 
      }
    });
  });

  // Reveal animations
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal, .reveal-left').forEach(el => revealObs.observe(el));

  // Magnetic Buttons
  document.querySelectorAll('.btn-primary, .btn-outline, .qv-add-btn, .action-btn').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
      gsap.to(btn, { x, y, duration: 0.3, ease: 'power2.out' });
    });
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
    });
  });
}

// ── LIGHTBOX ──
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
document.querySelectorAll('.gallery-item').forEach((el, i) => {
  el.addEventListener('click', () => openLightbox(i));
});
document.querySelectorAll('.lookbook-item img, .col-card-img').forEach(img => {
  img.style.cursor = 'zoom-in';
  img.addEventListener('click', (e) => {
    e.stopPropagation();
    document.getElementById('lbImg').src = img.src;
    document.getElementById('lightbox').classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

// ── QUICK VIEW ──
function openQuickView(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  qvCurrent = p;
  document.getElementById('qvImg').src = p.img;
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
function qvAddToCart() {
  if (!qvCurrent) return;
  addToCart(qvCurrent.name, qvCurrent.price, qvCurrent.img);
  const btn = document.getElementById('qvAddBtn');
  btn.textContent = 'Added ✓';
  setTimeout(() => { btn.textContent = 'Add to Bag →'; }, 2000);
}

// ── UTILS ──
function openMobileNav() { document.getElementById('mobileNav').classList.add('open'); }
function closeMobileNav() { document.getElementById('mobileNav').classList.remove('open'); }
function handleNewsletterSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('.newsletter-btn');
  btn.textContent = 'Sent ✓';
  setTimeout(() => { btn.textContent = 'Subscribe'; e.target.reset(); }, 3000);
}
function handleCustomOrder(e) {
  e.preventDefault();
  const btn = document.getElementById('customSubmitBtn');
  btn.textContent = 'Sending...';
  setTimeout(() => {
    btn.textContent = 'Sent ✓';
    e.target.reset();
    showToast('Request received! We\\'ll contact you soon.');
    setTimeout(() => { btn.textContent = 'Send Request →'; }, 4000);
  }, 1200);
}
function animateCount(el) {
  const target = parseInt(el.dataset.count);
  const suffix = el.dataset.suffix || '';
  gsap.to({val:0}, {
    val: target, duration: 2, ease: 'power3.out',
    onUpdate: function() { el.textContent = Math.floor(this.targets()[0].val) + suffix; },
    scrollTrigger: { trigger: el, start: 'top 90%' }
  });
}
document.querySelectorAll('[data-count]').forEach(el => animateCount(el));

// ── THREE.JS PARTICLES ──
let scene, camera, renderer, particles;
function initParticles() {
  const container = document.getElementById('hero');
  if (!container) return;
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);
  renderer.domElement.style.position = 'absolute'; renderer.domElement.style.top = '0'; renderer.domElement.style.zIndex = '1'; renderer.domElement.style.pointerEvents = 'none';
  const geometry = new THREE.BufferGeometry();
  const vertices = [];
  for (let i = 0; i < 1500; i++) { vertices.push(THREE.MathUtils.randFloatSpread(2000), THREE.MathUtils.randFloatSpread(2000), THREE.MathUtils.randFloatSpread(2000)); }
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  particles = new THREE.Points(geometry, new THREE.PointsMaterial({ color: 0xC8A96B, size: 2, transparent: true, opacity: 0.4 }));
  scene.add(particles);
  camera.position.z = 500;
  function animate() { requestAnimationFrame(animate); particles.rotation.x += 0.0003; particles.rotation.y += 0.0003; renderer.render(scene, camera); }
  animate();
}
window.addEventListener('load', initParticles);

// ── PRELOADER ──
window.addEventListener('load', () => { setTimeout(() => document.getElementById('preloader').classList.add('hidden'), 1000); });

// ── LISTENERS ──
document.querySelectorAll('.product-actions button, .size-btn').forEach(btn => btn.addEventListener('click', e => e.stopPropagation()));
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 50);
});
</script>
`;

// Replace all script tags and their content from the first <script> to the last </body>
// Note: This is a bit aggressive but ensures a clean slate.
const startTag = '<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>';
const endTag = '</body>';

// Actually, I'll find the first script tag and the last /script tag.
const firstScriptPos = html.indexOf('<script');
const lastScriptPos = html.lastIndexOf('</script>') + 9;

if (firstScriptPos !== -1 && lastScriptPos !== -1) {
  html = html.substring(0, firstScriptPos) + consolidatedJS + html.substring(lastScriptPos);
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('✅ Site consolidated and cleaned!');
