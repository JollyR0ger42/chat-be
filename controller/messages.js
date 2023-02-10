module.exports = (collection) => {
  async function addMessage(payload) {
    let newMessage

    try { newMessage = await collection.insertOne(payload) }
    catch (e) { console.log(e) }

    if (newMessage) return newMessage
    else return false
  }

  async function getChat(sender, receiver) {
    let chat

    try {
      chat = await collection
        .find({$or: [
          { sender, receiver },
          { sender: receiver, receiver: sender }
        ]})
        .toArray()
    }
    catch (e) { console.log(e) }

    if (chat) return chat
    else return false
  }

  return {
    addMessage,
    getChat
  }
}
