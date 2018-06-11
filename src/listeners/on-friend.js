
const { hotImport } = require('hot-import')

module.exports= async function onFriend (contact, request) {
  const config = await hotImport('config.js')
  if (!config.friendEnabled) return

  if (request) {
    let name = contact.name()
    // await request.accept()

    console.log(`Contact: ${name} send request ${request.hello}`)
  }
}
