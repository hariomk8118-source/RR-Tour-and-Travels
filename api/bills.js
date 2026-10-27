import { getDb } from './lib/db.js';
import { withAuth } from './lib/auth.js';
import { ObjectId } from 'mongodb';

async function handler(req, res) {
  const db = await getDb();
  const bills = db.collection('bills');

  if (req.method === 'GET') {
    const list = await bills.find({}).sort({ createdAt: -1 }).toArray();
    return res.status(200).json(list);
  }

  if (req.method === 'POST') {
    const bill = {
      ...req.body,
      billNo: `RR-${Date.now().toString(36).toUpperCase()}`,
      createdAt: new Date().toISOString(),
    };
    const result = await bills.insertOne(bill);
    return res.status(201).json({ ...bill, _id: result.insertedId });
  }

  if (req.method === 'DELETE') {
    const { id } = req.query;
    if (!id) return res.status(400).json({ error: 'Missing id' });
    await bills.deleteOne({ _id: new ObjectId(id) });
    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

export default withAuth(handler);
