const dbConnect = require('../db')

dbConnect().then(client => {
  const adminDb = client.db().admin()
  adminDb.listDatabases(function(err, result) {
    console.log(result.databases)
  })
}).catch(console.error)