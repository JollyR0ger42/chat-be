const token = require('../src/token.js')

module.exports = (collection) => {
  async function addUser(login, password) {
    // console.log('Args:', login, password)
    console.log('addUser', login, password)
    let result
    try {
      result = await collection.insertOne({ login, password })
      if (result)
        return token.generate({login})
    } catch (e) {
      console.log(e)
    }
  }

  return {addUser}
}
