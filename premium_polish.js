const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// ── 1. SKELETON STATES (Pre-content shimmer) ──
const skeletonCSS = `
.skeleton {
  background: linear-gradient(90deg, #1A1A1A 25%, #2A2A2A 50%, #1A1A1A 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 2px;
}
@keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }

.product-card.loading .product-img { opacity: 0; }
.product-card.loading::before {
  content: ''; position: absolute; inset: 0; z-index: 5;
  background: #111;
}
`;

// ── 2. ADVANCED HOVER & MICRO-INTERACTIONS ──
const interactionCSS = `
.btn-primary, .btn-outline {
  position: relative; overflow: hidden;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.btn-primary::after {
  content: ''; position: absolute; top: 50%; left: 50%;
  width: 120%; height: 120%; background: rgba(255,255,255,0.1);
  border-radius: 50%; transform: translate(-50%, -50%) scale(0);
  transition: transform 0.5s;
}
.btn-primary:active::after { transform: translate(-50%, -50%) scale(1); opacity: 0; }

.product-card {
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}
.product-card:hover { transform: translateY(-10px); }

/* Custom Scrollbar for Premium Feel */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: #0A0A0A; }
::-webkit-scrollbar-thumb { background: #C8A96B; border-radius: 10px; }
`;

// ── 3. CINEMATIC LOADING STATE FOR FORMS ──
const formLoadingHTML = `
<div id="form-loader" class="hidden-loader">
  <div class="loader-content">
    <div class="loader-circle"></div>
    <p>Securing Your Vision...</p>
  </div>
</div>`;

const formLoadingCSS = `
.hidden-loader { display: none !important; }
#form-loader {
  position: fixed; inset: 0; background: rgba(10,10,10,0.95);
  z-index: 9999; display: flex; align-items: center; justify-content: center;
  backdrop-filter: blur(10px); transition: opacity 0.4s;
}
#form-loader.active { display: flex !important; opacity: 1; }
.loader-content { text-align: center; color: #C8A96B; letter-spacing: 0.3em; text-transform: uppercase; font-size: 0.7rem; }
.loader-circle {
  width: 40px; height: 40px; border: 2px solid rgba(200,169,107,0.2);
  border-top-color: #C8A96B; border-radius: 50%;
  margin: 0 auto 1.5rem; animation: spin 1s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
`;

// ── 4. EMPTY STATE REFINEMENT (Cart) ──
const emptyStateHTML = `
<div class="cart-empty" id="cartEmpty" style="text-align:center; padding: 4rem 2rem;">
  <div class="empty-icon" style="font-size: 3rem; color: #C8A96B; opacity: 0.3; margin-bottom: 1.5rem; font-family: serif;">♢</div>
  <p style="color: rgba(248,245,240,0.5); font-size: 0.8rem; letter-spacing: 0.1em; margin-bottom: 2rem;">Your Heritage Collection is Empty</p>
  <button class="btn-outline" onclick="closeCart()" style="font-size:0.6rem;">Explore Collections</button>
</div>`;

// ── INJECTION ──
html = html.replace('</body>', formLoadingHTML + '\n</body>');
html = html.replace('</style>', skeletonCSS + interactionCSS + formLoadingCSS + '\n</style>');

// Update Cart Empty State
html = html.replace('<div class="cart-empty" id="cartEmpty">Your bag is empty.<br>Discover our collections.</div>', emptyStateHTML);

// Update handleCustomOrder to use the new loader
const newFormLogic = `
function handleCustomOrder(e) {
  e.preventDefault();
  const loader = document.getElementById('form-loader');
  loader.classList.remove('hidden-loader');
  loader.classList.add('active');
  
  setTimeout(() => {
    loader.classList.remove('active');
    loader.classList.add('hidden-loader');
    showToast('Your vision has been received. Our head designer will contact you.');
    e.target.reset();
  }, 2500);
}
`;
html = html.replace(/function handleCustomOrder\(e\) \{[\s\S]*?\}/, newFormLogic);

fs.writeFileSync('index.html', html, 'utf8');
console.log('✅ Elite SaaS Interface patterns integrated.');
