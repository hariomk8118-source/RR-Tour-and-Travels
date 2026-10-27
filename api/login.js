import { createToken } from './lib/auth.js';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { password } = req.body;
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin@rr2024';

  if (password !== adminPassword) {
    return res.status(401).json({ error: 'Wrong password' });
  }

  const token = createToken();
  return res.status(200).json({ token });
}
