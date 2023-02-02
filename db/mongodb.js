const { MongoClient } = require('mongodb')
// Connection URL
const url = 'mongodb://127.0.0.1:27017'
const client = new MongoClient(url)

// Database Name
const dbName = 'chat-app'

async function dbConnect() {
  console.log('DB start connecting...')
  // Use connect method to connect to the server
  await client.connect()
  console.log('Connected successfully to server')
  const db = client.db(dbName)
  const users = db.collection('users')
  return client
}

module.exports = dbConnect
