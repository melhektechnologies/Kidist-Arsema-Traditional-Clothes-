
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { name, email, garmentType, vision } = req.body;

    // Server-side Validation
    if (!name || !email || !garmentType || !vision) {
      return res.status(400).json({ error: 'Required fields missing' });
    }

    if (!/^[^s@]+@[^s@]+.[^s@]+$/.test(email)) {
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
