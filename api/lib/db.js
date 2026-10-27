import { MongoClient } from 'mongodb';

let cached = global._mongoClient;

export async function getDb() {
  if (!cached) {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    cached = global._mongoClient = client;
  }
  return cached.db('rrtravels');
}
