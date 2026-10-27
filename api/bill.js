import { getDb } from './lib/db.js';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id } = req.query;
  if (!id) return res.status(400).json({ error: 'Missing id' });

  const db = await getDb();
  const bill = await db.collection('bills').findOne({ _id: new ObjectId(id) });

  if (!bill) return res.status(404).json({ error: 'Bill not found' });
  return res.status(200).json(bill);
}
