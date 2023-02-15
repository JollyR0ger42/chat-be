const dbConnect = require('../db')

let db, Users, Messages

dbConnect().then((payload) => {
  db = payload
  Users = require('./users.js')(db.collection('users'))
  Messages = require('./messages.js')(db.collection('messages'))
})

module.exports = {
  Users: () => Users,
  Messages: () => Messages
}
