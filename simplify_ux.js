const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(filePath, 'utf8');

// 1. Remove cursor: none; globally
html = html.replace(/cursor:\s*none;?/gi, '');

// 2. Remove Custom Cursor CSS
html = html.replace(/\/\*\s*── CUSTOM CURSOR ──\s*\*\/[\s\S]*?(?=\/\*\s*── PRELOADER ──\s*\*\/)/gi, '');

// 3. Remove other cursor-related CSS classes
html = html.replace(/body:hover #cursor \{ opacity: 1; \}/g, '');
html = html.replace(/\.cursor-grow #cursor \{[^}]+\}/g, '');
html = html.replace(/\.cursor-grow #cursor-ring \{[^}]+\}/g, '');

// 4. Remove cursor HTML
html = html.replace(/<!-- CURSOR -->[\s\S]*?<div id="cursor-ring"><\/div>/g, '');

// 5. Remove Cursor JS Logic
html = html.replace(/\/\*\s*── CURSOR & GLOW ──\s*\*\/[\s\S]*?(?=\/\/ ── SMOOTH SCROLL \(Lenis\) ──)/gi, '');

// 6. Remove Magnetic Buttons JS Logic
html = html.replace(/\/\/ ── MAGNETIC BUTTONS ──[\s\S]*?(?=\/\/ ── LIGHTBOX ──)/gi, '');

// 7. Simplify Product Cards for better UX (add explicit cursor: pointer)
html = html.replace(/\.product-card \{ transition/g, '.product-card { cursor: pointer; transition');

// 8. Improve text readability
html = html.replace(/body \{[\s\S]*?font-family: 'Manrope', sans-serif;/, "body {\n  font-family: 'Manrope', sans-serif;\n  font-size: 16px;");
html = html.replace(/\.section-subtitle \{/g, '.section-subtitle { font-size: 1.05rem; line-height: 2;');
html = html.replace(/\.story-text \{/g, '.story-text { font-size: 1.05rem; line-height: 2.1;');
html = html.replace(/\.timeline-desc \{/g, '.timeline-desc { font-size: 1rem; line-height: 1.9;');
html = html.replace(/\.craft-desc \{/g, '.craft-desc { font-size: 0.95rem; line-height: 1.85;');

// 9. Remove the mouse glow if it makes the screen too busy and complex
html = html.replace(/<div class="mouse-glow" id="mouseGlow"><\/div>/g, '');
html = html.replace(/\/\*\s*── MOUSE FOLLOW GLOW ──\s*\*\/[\s\S]*?(?=\.global-trust-bar)/gi, '');

// 10. Improve Button UX (remove the weird skew hover effect that feels complex/jittery)
html = html.replace(/\.btn-primary::before \{ content: ''; position: absolute; inset: 0; background: rgba\(255,255,255,0.15\); transform: translateX\(-100%\) skewX\(-15deg\); transition: transform 0.4s ease; \}/g, '');
html = html.replace(/\.btn-primary:hover::before \{ transform: translateX\(120%\) skewX\(-15deg\); \}/g, '');
// And instead make the button just slightly fade or lift
html = html.replace(/\.btn-primary:hover \{ transform: translateY\(-2px\); box-shadow: 0 12px 30px rgba\(200, 169, 107, 0.4\); \}/g, '.btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(200, 169, 107, 0.35); background: var(--gold-light); }');

fs.writeFileSync(filePath, html, 'utf8');
console.log('✅ Advanced UX simplification applied successfully.');
