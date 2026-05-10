const fs = require('fs');
const h = fs.readFileSync('index.html', 'utf8');
const check = (label, test) => console.log((test ? '✅' : '❌'), label);
check('QV modal HTML', h.includes('id="qv-modal"'));
check('QV overlay', h.includes('id="qv-overlay"'));
check('openQuickView fn', h.includes('function openQuickView'));
check('PRODUCTS const', h.includes('const PRODUCTS'));
check('Custom form ID', h.includes('customOrderForm'));
check('WhatsApp float', h.includes('whatsapp-float'));
check('openCart fn', h.includes('function openCart'));
check('Cart icon onclick', h.includes('onclick="openCart()'));
check('QV oncl icks', (h.match(/onclick="openQuickView/g)||[]).length + ' product cards');
check('handleCustomOrder fn', h.includes('function handleCustomOrder'));
check('Hero slider', h.includes('hero-slide active'));
check('Lenis script', h.includes('lenis.min.js'));
check('GSAP script', h.includes('gsap.min.js'));
// Show last 300 chars to see if </body></html> is clean
console.log('\nFile end:');
console.log(h.slice(-300));
