const dbConnect = require('../db')

let db, users, messages

dbConnect().then((payload) => {
  db = payload
  users = require('./users.js')(db.collection('users'))
  messages = require('./messages.js')(db.collection('messages'))
})

function wrapper(func, args) {
  if (!db) return new Error('DB not connected.')
  else return func(...args)
}

module.exports = {
  Users: {
    addUser: function (login, password) { return wrapper(users.addUser, arguments) },
    getUser: function (login, password) { return wrapper(users.getUser, arguments) },
    getAll: function (login) { return wrapper(users.getAll, arguments) }
  },
  Messages: {
    addMessage:  function (payload) { return wrapper(messages.addMessage, arguments) },
  }
}
