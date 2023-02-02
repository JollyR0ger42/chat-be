const { MongoClient } = require('mongodb')

const url = 'mongodb://127.0.0.1:27017'
const dbName = 'chat-app'

const client = new MongoClient(url)

async function dbConnect() {
  console.log('DB start connecting...')
  await client.connect()
  console.log('Connected successfully to server')
  const db = client.db(dbName)
  return db
}

module.exports = dbConnect
