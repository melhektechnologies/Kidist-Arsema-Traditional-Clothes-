const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// ── 1. RESOURCE HINTS & CRITICAL PATH ──
const resourceHints = `
  <link rel="preconnect" href="https://cdnjs.cloudflare.com">
  <link rel="preconnect" href="https://unpkg.com">
  <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com">
  <link rel="dns-prefetch" href="https://unpkg.com">
  <style>
    @font-face { font-family: 'Bodoni Moda'; font-display: swap; }
    @font-face { font-family: 'Inter'; font-display: swap; }
    @font-face { font-family: 'Cormorant Garamond'; font-display: swap; }
  </style>
`;
html = html.replace('<head>', '<head>' + resourceHints);

// ── 2. IMAGE PRIORITY ──
html = html.replace(
  "style=\"background-image:url('photos/photo_1_2026-05-10_14-19-11.jpg')\"",
  "style=\"background-image:url('photos/photo_1_2026-05-10_14-19-11.jpg')\" fetchpriority=\"high\""
);

// ── 3. GPU-ACCELERATED CURSOR ──
// We need to update the cursor positioning to use translate3d
const optimizedCursorLogic = `
let mouseMoving = false;
let moveTimeout;
document.addEventListener('mousemove', e => {
  mouseX = e.clientX; mouseY = e.clientY;
  mouseMoving = true;
  if(cursor) { cursor.style.transform = \`translate3d(\${mouseX}px, \${mouseY}px, 0)\`; }
  
  clearTimeout(moveTimeout);
  moveTimeout = setTimeout(() => { mouseMoving = false; }, 2000);
});

function animateRing() {
  if (mouseMoving || Math.abs(mouseX - ringX) > 0.1) {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    if(ring) { ring.style.transform = \`translate3d(\${ringX}px, \${ringY}px, 0)\`; }
  }
  requestAnimationFrame(animateRing);
}
`;

// Remove old mousemove and animateRing
html = html.replace(/document\.addEventListener\('mousemove'[\s\S]*?animateRing\(\);/, optimizedCursorLogic + '\nanimateRing();');

// ── 4. DEFER SCRIPTS ──
html = html.replace('<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js', '<script defer src="https://cdnjs.cloudflare.com/ajax/libs/three.js');
html = html.replace('<script src="https://unpkg.com/@studio-freight/lenis', '<script defer src="https://unpkg.com/@studio-freight/lenis');
html = html.replace('<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js', '<script defer src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js');
html = html.replace('<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js', '<script defer src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js');

// ── 5. ADAPTIVE THREE.JS ──
html = html.replace('for (let i = 0; i < 1500; i++)', 'const pCount = window.innerWidth < 768 ? 600 : 1500; for (let i = 0; i < pCount; i++)');

// Remove redundant style updates in script
html = html.replace("cursor.style.left = mouseX + 'px';", "");
html = html.replace("cursor.style.top = mouseY + 'px';", "");
html = html.replace("ring.style.left = ringX + 'px';", "");
html = html.replace("ring.style.top = ringY + 'px';", "");

fs.writeFileSync('index.html', html, 'utf8');
console.log('✅ Senior Performance Optimizations applied.');
