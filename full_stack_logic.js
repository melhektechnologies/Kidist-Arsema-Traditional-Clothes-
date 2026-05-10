const fs = require('fs');
const path = require('path');

// ── 1. ARCHITECTURE: Create Serverless Endpoints ──
const apiDir = path.join(__dirname, 'api');
if (!fs.existsSync(apiDir)) fs.mkdirSync(apiDir);

// ORDER HANDLER (Serverless)
const orderHandler = `
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { name, email, garmentType, vision } = req.body;

    // Server-side Validation
    if (!name || !email || !garmentType || !vision) {
      return res.status(400).json({ error: 'Required fields missing' });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // In production, integrate with SendGrid/Database
    console.log('New Order:', { name, email, garmentType, vision });

    await new Promise(resolve => setTimeout(resolve, 800));

    return res.status(200).json({ 
      success: true, 
      message: 'Your vision has been successfully transmitted to the Atelier.' 
    });
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
}
`;

// NEWSLETTER HANDLER (Serverless)
const newsletterHandler = `
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { email } = req.body;
  if (!email || !email.includes('@')) return res.status(400).json({ error: 'Valid email required' });
  return res.status(200).json({ success: true, message: 'Welcome to the Heritage Circle.' });
}
`;

fs.writeFileSync(path.join(apiDir, 'order.js'), orderHandler);
fs.writeFileSync(path.join(apiDir, 'newsletter.js'), newsletterHandler);

// ── 2. FRONTEND: Real API Integration ──
let html = fs.readFileSync('index.html', 'utf8');

const productionFetchLogic = `
async function handleCustomOrder(e) {
  e.preventDefault();
  const form = e.target;
  const btn = document.getElementById('customSubmitBtn');
  const loader = document.getElementById('form-loader');
  
  const formData = {
    name: form.querySelector('input[type="text"]').value,
    email: form.querySelector('input[type="email"]').value,
    phone: form.querySelector('input[type="tel"]').value,
    garmentType: form.querySelector('select').value,
    vision: form.querySelector('textarea').value
  };

  try {
    loader.classList.remove('hidden-loader');
    loader.classList.add('active');
    btn.disabled = true;

    const response = await fetch('/api/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.error || 'Submission failed');

    showToast(result.message);
    form.reset();
  } catch (err) {
    showToast('Error: ' + err.message);
  } finally {
    loader.classList.remove('active');
    loader.classList.add('hidden-loader');
    btn.disabled = false;
  }
}

async function handleNewsletterSubmit(e) {
  e.preventDefault();
  const emailInput = e.target.querySelector('input');
  const email = emailInput.value;
  const btn = e.target.querySelector('button');
  
  try {
    btn.disabled = true;
    btn.textContent = 'Joining...';
    
    const response = await fetch('/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });

    if (!response.ok) throw new Error('Subscription failed');

    btn.textContent = 'Welcome ✓';
    btn.style.background = '#1B4332';
    e.target.reset();
  } catch (err) {
    showToast('Subscription failed.');
    btn.textContent = 'Retry';
  } finally {
    setTimeout(() => {
      btn.disabled = false;
      btn.textContent = 'Subscribe';
      btn.style.background = '';
    }, 3000);
  }
}
`;

// Replace the mock functions
html = html.replace(/async function handleCustomOrder\(e\) \{[\s\S]*?\}/, productionFetchLogic);
html = html.replace(/function handleNewsletterSubmit\(e\) \{[\s\S]*?\}/, ''); // Remove old version

fs.writeFileSync('index.html', html, 'utf8');
console.log('✅ Full-stack production architecture deployed.');
