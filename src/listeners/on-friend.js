
const config = require('../config.js')

module.exports = async function onFriend (contact, request) {
  if (!config.friendEnabled) return

  if (request) {
    let name = contact.name()
    // await request.accept()

    console.log(`Contact: ${name} send request ${request.hello}`)
  }
}
