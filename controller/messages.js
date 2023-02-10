module.exports = (collection) => {
  async function addMessage(payload) {
    let newMessage

    try { newMessage = await collection.insertOne(payload) }
    catch (e) { console.log(e) }

    if (newMessage) return newMessage
    else return false
  }

  return {
    addMessage
  }
}
