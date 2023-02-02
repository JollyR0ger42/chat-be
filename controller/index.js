const dbConnect = require('../db')

let db, users

dbConnect().then((payload) => {
  db = payload
  users = require('./users.js')(db.collection('users'))
})

function wrapper(func, args) {
  if (!db) return new Error('DB not connected.')
  else return func(...args)
}

module.exports = {
  addUser: function (login, password) { return wrapper(users.addUser, arguments) }
}
