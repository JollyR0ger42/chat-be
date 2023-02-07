module.exports = (collection) => {
  async function addUser(login, password) {
    let newUser

    try { newUser = await collection.insertOne({ login, password }) }
    catch (e) { console.log(e) }

    if (newUser) return { login }
    else return false
  }

  async function getUser(login, password) {
    let user

    try { user = await collection.findOne({ login, password }) }
    catch (e) { console.log(e) }
    return user
  }

  return {
    addUser,
    getUser
  }
}
