const token = require('../src/token.js')

module.exports = (collection) => {
  async function addUser(login, password) {
    let result

    try {
      result = await collection.insertOne({ login, password })
    } catch (e) {
      console.log(e)
    }

    if (result)
      return token.generate({ login })
  }

  return { addUser }
}
