const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// ── FIX 1: Add Lenis CDN back (it was stripped) ──
// Insert before first GSAP script tag
html = html.replace(
  '<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>',
  `<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>`
);

// ── FIX 2: Replace broken Lenis init with safe version ──
// The Lenis CDN from studio-freight@1.0.19 was a bundled build — replace with safe wrapper
html = html.replace(
  /const lenis = new Lenis\(\{[\s\S]*?\}\);[\s\S]*?requestAnimationFrame\(raf\);/,
  `// Lenis smooth scroll (guarded)
  try {
    if (typeof Lenis !== 'undefined') {
      const lenis = new Lenis({ duration: 1.2, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
      function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
      requestAnimationFrame(raf);
    }
  } catch(e) { console.warn('Lenis not available, using native scroll'); }`
);

// ── FIX 3: Add Lenis CDN before GSAP ──
// (Only if not already present)
if (!html.includes('lenis.min.js') && !html.includes('lenis@')) {
  html = html.replace(
    '<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>',
    `<script src="https://unpkg.com/@studio-freight/lenis@1.0.19/bundled/lenis.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>`
  );
}

// ── FIX 4: Guard GSAP animations in case it fails ──
html = html.replace(
  '// GSAP animations\n  gsap.registerPlugin(ScrollTrigger);',
  `// GSAP animations
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);`
);

// Close the if block after the parallax animations
html = html.replace(
  /gsap\.utils\.toArray\('\.col-card-img, \.product-img, \.lookbook-img'\)\.forEach\(img => \{[\s\S]*?\}\);[\s\S]*?\}\);/,
  (match) => match + '\n  } // end if gsap'
);

// ── FIX 5: Remove duplicate ScrollTrigger script (was added twice) ──
// Keep only the first occurrence
let stCount = 0;
html = html.replace(/<script src="https:\/\/cdnjs\.cloudflare\.com\/ajax\/libs\/gsap\/3\.12\.2\/ScrollTrigger\.min\.js"><\/script>/g, (m) => {
  stCount++;
  return stCount === 1 ? m : '';
});

// ── FIX 6: Ensure hero z-index layering is correct ──
// Hero content must be above the slider overlay
if (!html.includes('.hero-content { position: relative; z-index: 3')) {
  html = html.replace(
    '.hero-content {\n  position: relative; z-index: 2;',
    '.hero-content {\n  position: relative; z-index: 3;'
  );
}

// ── FIX 7: Make sure hero overlay sits between slider and content ──
html = html.replace(
  '.hero-overlay { position:absolute; inset:0; z-index:1;',
  '.hero-overlay { position:absolute; inset:0; z-index:1; pointer-events:none;'
);

// ── FIX 8: Ensure hero slider z-index is 0 ──
html = html.replace(
  '.hero-slider { position:absolute; inset:0; z-index:0; }',
  '.hero-slider { position:absolute; inset:0; z-index:0; overflow:hidden; }'
);

// ── FIX 9: Make hero section position:relative properly ──
// The hero #hero already has position:relative in CSS but let's make sure
// the slide has proper background-size
html = html.replace(
  '.hero-slide { position:absolute; inset:0; background-size:cover; background-position:center top; opacity:0; transition:opacity 1.6s cubic-bezier(0.4,0,0.2,1); }',
  '.hero-slide { position:absolute; inset:0; width:100%; height:100%; background-size:cover; background-position:center center; opacity:0; transition:opacity 1.6s cubic-bezier(0.4,0,0.2,1); }'
);

// ── FIX 10: Fix hero-content z-index in existing CSS block ──
html = html.replace(
  '.hero-content {\n  position: relative; z-index: 2;\n  padding: 0 4rem 8rem;\n  max-width: 700px;\n}',
  '.hero-content {\n  position: relative; z-index: 3;\n  padding: 0 4rem 8rem;\n  max-width: 700px;\n}'
);

// ── FIX 11: hero-stats z-index ──
html = html.replace(
  '.hero-stats {\n  position: absolute; right: 4rem; bottom: 8rem;\n  display: flex; gap: 3rem; z-index: 2;',
  '.hero-stats {\n  position: absolute; right: 4rem; bottom: 8rem;\n  display: flex; gap: 3rem; z-index: 3;'
);

// ── FIX 12: hero-scroll-indicator z-index ──
html = html.replace(
  '.hero-scroll-indicator {\n  position: absolute; bottom: 2.5rem; left: 50%; transform: translateX(-50%);\n  display: flex; flex-direction: column; align-items: center; gap: 0.5rem;\n  opacity: 0; animation: heroFadeUp 1s ease forwards 3.2s;\n}',
  '.hero-scroll-indicator {\n  position: absolute; bottom: 2.5rem; left: 50%; transform: translateX(-50%);\n  display: flex; flex-direction: column; align-items: center; gap: 0.5rem;\n  z-index: 3;\n  opacity: 0; animation: heroFadeUp 1s ease forwards 3.2s;\n}'
);

// ── FIX 13: hero slider dots z-index ──
html = html.replace(
  '.hero-slider-dots { position:absolute; bottom:3rem; right:4rem; display:flex; gap:0.6rem; z-index:3; }',
  '.hero-slider-dots { position:absolute; bottom:3rem; right:4rem; display:flex; gap:0.6rem; z-index:4; }'
);

// ── FIX 14: hero pattern z-index fix (must be below content) ──
html = html.replace(
  '.hero-pattern {\n  position: absolute; inset: 0; opacity: 0.05;',
  '.hero-pattern {\n  position: absolute; inset: 0; z-index: 1; opacity: 0.05;'
);

// ── FIX 15: hero gradient orb z-index ──
html = html.replace(
  '.hero-gradient-orb {\n  position: absolute;',
  '.hero-gradient-orb {\n  position: absolute; z-index: 1;'
);

// ── FIX 16: eth-pattern z-index fix ──
html = html.replace(
  '.eth-pattern { position: absolute; opacity: 0.04; pointer-events: none; }',
  '.eth-pattern { position: absolute; z-index: 1; opacity: 0.04; pointer-events: none; }'
);

fs.writeFileSync('index.html', html, 'utf8');
console.log('✅ Fix script done! Lines:', html.split('\n').length);

// Verify fixes
const verify = (label, test) => console.log(test ? '✅' : '❌', label);
verify('Lenis CDN present', html.includes('lenis.min.js'));
verify('Lenis guarded', html.includes('typeof Lenis'));
verify('GSAP guarded', html.includes('typeof gsap'));
verify('Hero overlay pointer-events', html.includes('pointer-events:none'));
