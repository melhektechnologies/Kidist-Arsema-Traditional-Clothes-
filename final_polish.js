const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// ── FIX 1: Remove the syntax error in showToast ──
html = html.replace(
  "showToast('Your custom order request has been received! We'll contact you within 24 hours.');",
  "showToast('Your custom order request has been received! We\\'ll contact you within 24 hours.');"
);

// ── FIX 2: Correct the GSAP if-block and closing braces ──
// Find the GSAP section and clean it up
const gsapSection = `// ── GSAP SCROLL ANIMATIONS ──
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
  
  // Parallax images
  gsap.utils.toArray('.col-card-img, .product-img, .lookbook-img').forEach(img => {
    gsap.fromTo(img, { scale: 1.12 }, {
      scale: 1,
      ease: 'none',
      scrollTrigger: { 
        trigger: img.closest('.col-card, .product-img-wrap, .lookbook-item'), 
        start: 'top bottom', 
        end: 'bottom top', 
        scrub: 1.5 
      }
    });
  });

  // Gallery items reveal
  gsap.utils.toArray('.gallery-item').forEach((el, i) => {
    gsap.from(el, { 
      opacity: 0, 
      y: 40, 
      duration: 0.8, 
      delay: i * 0.08,
      scrollTrigger: { 
        trigger: el, 
        start: 'top 90%', 
        toggleActions: 'play none none none' 
      }
    });
  });
}`;

// Replacing the messy block from line 1964 to 1980 (approx)
html = html.replace(/\/\/ ── GSAP SCROLL ANIMATIONS ──[\s\S]*?\/\/ ── LIGHTBOX ──/, gsapSection + '\n\n// ── LIGHTBOX ──');

// ── FIX 3: Add Lenis Initialization properly ──
const lenisInit = `
// ── SMOOTH SCROLL (Lenis) ──
let lenis;
try {
  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }
} catch (e) {
  console.warn('Lenis initialization failed:', e);
  document.documentElement.style.scrollBehavior = 'smooth';
}`;

html = html.replace(/\/\/ ── SMOOTH SCROLL \(native fallback if Lenis unavailable\) ──\s*document\.documentElement\.style\.scrollBehavior = 'smooth';/, lenisInit);

// ── FEATURE 1: Mouse Follow Glow ──
const glowCSS = `
/* ── MOUSE FOLLOW GLOW ── */
.mouse-glow {
  position: fixed;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(200, 169, 107, 0.08) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
  transform: translate(-50%, -50%);
  mix-blend-mode: screen;
  transition: opacity 0.5s ease;
}
`;
html = html.replace('</style>', glowCSS + '\n</style>');

const glowHTML = `<div class="mouse-glow" id="mouseGlow"></div>`;
html = html.replace('<body>', '<body>\n' + glowHTML);

const glowJS = `
// ── MOUSE GLOW ──
const glow = document.getElementById('mouseGlow');
document.addEventListener('mousemove', e => {
  if (glow) {
    gsap.to(glow, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.6,
      ease: 'power2.out'
    });
  }
});
`;
html = html.replace('// ── CURSOR ──', glowJS + '\n// ── CURSOR ──');

// ── FEATURE 2: Magnetic Buttons ──
const magneticJS = `
// ── MAGNETIC BUTTONS ──
document.querySelectorAll('.btn-primary, .btn-outline, .qv-add-btn, .action-btn').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(btn, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.3,
      ease: 'power2.out'
    });
  });
  btn.addEventListener('mouseleave', () => {
    gsap.to(btn, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)'
    });
  });
});
`;
html = html.replace('// ── MAGNETIC BUTTONS ──', ''); // Remove if exists
html = html.replace('</script>', magneticJS + '\n</script>');

// ── FEATURE 3: Three.js Particles ──
const threeJS = `<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>`;
html = html.replace('<script src="https://unpkg.com/@studio-freight/lenis@1.0.19/bundled/lenis.min.js"></script>', threeJS + '\n<script src="https://unpkg.com/@studio-freight/lenis@1.0.19/bundled/lenis.min.js"></script>');

const particlesJS = `
// ── THREE.JS PARTICLES ──
let scene, camera, renderer, particles;
function initParticles() {
  const container = document.getElementById('hero');
  if (!container) return;

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0);
  container.appendChild(renderer.domElement);
  renderer.domElement.style.position = 'absolute';
  renderer.domElement.style.top = '0';
  renderer.domElement.style.left = '0';
  renderer.domElement.style.zIndex = '1';
  renderer.domElement.style.pointerEvents = 'none';

  const geometry = new THREE.BufferGeometry();
  const vertices = [];
  for (let i = 0; i < 2000; i++) {
    vertices.push(THREE.MathUtils.randFloatSpread(2000));
    vertices.push(THREE.MathUtils.randFloatSpread(2000));
    vertices.push(THREE.MathUtils.randFloatSpread(2000));
  }
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  const material = new THREE.PointsMaterial({ color: 0xC8A96B, size: 2, transparent: true, opacity: 0.5 });
  particles = new THREE.Points(geometry, material);
  scene.add(particles);
  camera.position.z = 500;

  function animate() {
    requestAnimationFrame(animate);
    particles.rotation.x += 0.0005;
    particles.rotation.y += 0.0005;
    renderer.render(scene, camera);
  }
  animate();
  
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}
window.addEventListener('load', initParticles);
`;
html = html.replace('</script>', particlesJS + '\n</script>');

fs.writeFileSync('index.html', html, 'utf8');
console.log('✅ Final polish and bug fixes complete!');
