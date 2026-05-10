const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// ── STRATEGY 1: Trust & Logistics Bar (The "White Glove" Signal) ──
const trustBarHTML = `
<div class="global-trust-bar">
  <div class="trust-item"><span>✈</span> Priority Global Shipping via DHL Express</div>
  <div class="trust-item"><span>🔒</span> Secure International Payments</div>
  <div class="trust-item"><span>🌍</span> Serving Diaspora in 40+ Countries</div>
</div>`;

const trustBarCSS = `
.global-trust-bar {
  background: var(--black);
  color: var(--gold-light);
  font-size: 0.55rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  padding: 0.6rem 2rem;
  display: flex;
  justify-content: center;
  gap: 3rem;
  font-weight: 600;
  border-bottom: 1px solid rgba(200, 169, 107, 0.15);
  position: relative;
  z-index: 1001;
}
@media (max-width: 768px) { .global-trust-bar { flex-direction: column; gap: 0.5rem; text-align: center; padding: 1rem; } }
`;

html = html.replace('<body>', '<body>\n' + trustBarHTML);
html = html.replace('</style>', trustBarCSS + '\n</style>');

// ── STRATEGY 2: VIP Video Consultation (High-Class Conversion) ──
const conciergeHTML = `
<div class="vip-concierge-card reveal">
  <div class="concierge-content">
    <p class="section-eyebrow">VIP Service</p>
    <h3 class="qv-name" style="font-size:2.5rem; margin-bottom:1rem;">Digital Atelier<br>Appointment</h3>
    <p class="section-subtitle" style="max-width:100%;">For our global clients, we offer 1-on-1 virtual consultations. View fabrics in high-definition and finalize measurements with our head designer via video call.</p>
    <div style="margin-top:2rem;">
        <a href="https://wa.me/251911000000" class="btn-primary">Book Video Call</a>
    </div>
  </div>
  <div class="concierge-visual">
    <div class="glass-overlay"></div>
    <img src="photos/photo_3_2026-05-10_14-19-11.jpg" alt="Tailoring Process">
  </div>
</div>`;

const conciergeCSS = `
.vip-concierge-card {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  background: var(--charcoal);
  margin: 8rem 5rem;
  border: 1px solid rgba(200, 169, 107, 0.1);
  overflow: hidden;
  min-height: 500px;
}
.concierge-content { padding: 5rem; display: flex; flex-direction: column; justify-content: center; background: linear-gradient(135deg, #1A1A1A 0%, #0A0A0A 100%); }
.concierge-visual { position: relative; height: 100%; }
.concierge-visual img { width: 100%; height: 100%; object-fit: cover; filter: sepia(0.2) brightness(0.7); }
.glass-overlay { position: absolute; inset: 0; background: linear-gradient(to right, #0A0A0A, transparent); z-index: 1; }
@media (max-width: 1024px) { 
    .vip-concierge-card { margin: 4rem 2rem; grid-template-columns: 1fr; } 
    .concierge-content { padding: 3rem; }
    .glass-overlay { background: linear-gradient(to top, #0A0A0A, transparent); } 
}
`;

// Insert before the "Custom" section
html = html.replace('<section id="custom">', conciergeHTML + '\n<section id="custom">');
html = html.replace('</style>', conciergeCSS + '\n</style>');

// ── STRATEGY 3: International Currency & Size Mapping (Update Quick View) ──
const sizeMappingHTML = `
<div class="qv-meta-row"><span class="qv-meta-key">Sizing</span><span class="qv-meta-val">International (US/EU/UK Mapping)</span></div>
<div class="qv-meta-row"><span class="qv-meta-key">Delivery</span><span class="qv-meta-val">7-14 Days Worldwide via DHL</span></div>
`;
html = html.replace('<div class="qv-meta-row"><span class="qv-meta-key">Origin</span>', sizeMappingHTML + '<div class="qv-meta-row"><span class="qv-meta-key">Origin</span>');

// ── STRATEGY 4: The "Diaspora Story" (Emotional Connection) ──
html = html.replace('Where Culture<br>Meets <em>Couture</em>', 'Bridging Addis Ababa<br>to the <em>Global Diaspora</em>');
html = html.replace('Every thread tells a story of a thousand years of Ethiopian elegance.', 'Carrying the heartbeat of Ethiopia to our community in DC, London, Dubai, and beyond.');

fs.writeFileSync('index.html', html, 'utf8');
console.log('✅ Global Luxury Gateway elements integrated.');
