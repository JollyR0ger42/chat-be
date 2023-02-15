module.exports = (collection) => {
  async function addContact(login, contact) {
    let contacts

    try {
      contacts = await collection.findOne({ owner: login })
      if (contacts) {
        contacts = await collection.updateOne(
          { owner: login },
          { $set: { list: [...contacts.list, contact] } }
        )
      } else {
        contacts = await collection.insertOne({ owner: login, list: [contact] })
      }
    }
    catch (e) { console.log(e) }

    return contacts
  }

  return {
    addContact,
  }
}