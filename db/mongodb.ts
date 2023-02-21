import { MongoClient, Db } from 'mongodb';

const url = 'mongodb://127.0.0.1:27017';
const dbName = 'chat-app';

async function dbConnect(): Promise<Db> {
  const client = new MongoClient(url);
  console.log('DB start connecting...');
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  return db;
}

export default dbConnect;
