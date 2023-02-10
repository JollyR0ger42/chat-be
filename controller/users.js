module.exports = (collection) => {
  async function addUser(login, password) {
    let newUser

    try { newUser = await collection.insertOne({ login, password }) }
    catch (e) { console.log(e) }

    if (newUser) return { login }
    else return false
  }

  async function getUser(login) {
    let user

    try { user = await collection.findOne({ login }) }
    catch (e) { console.log(e) }
    return user
  }

  async function getAll(login) {
    let users

    try {
      users = await collection
        .find({ login: { $ne: login } }, { projection: { _id: 0, login: 1 } })
        .toArray()
    }
    catch (e) { console.log(e) }
    return users
  }

  return {
    addUser,
    getUser,
    getAll
  }
}
