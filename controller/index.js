const dbConnect = require('../db')

let db, users

dbConnect().then((payload) => {
  db = payload.db
  users = payload.users
})

function wrapper(func, args) {
  console.log('--------')
  console.log(args)
  if (!db) return new Error('DB not connected.')
  else return func(...args)
}

async function addUser(name, password) {
  // console.log('Args:', name, password)
  console.log('addUser', name, password)
  const result = await users.insertOne({ name, password })
  // console.log('User added:', result)
}

module.exports = {
  addUser: function (name, password) { return wrapper(addUser, arguments) }
}
