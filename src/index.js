const finis = require('finis')
const { Wechaty, Room } = require('wechaty')
const onScan = require('./listeners/on-scan')
const onLogin = require('./listeners/on-login')
const onLogout = require('./listeners/on-logout')
const onMessage = require('./listeners/on-message')
const onFriend = require('./listeners/on-friend')
const onRoomInvite = require('./listeners/on-room-invite')
const onRoomJoin = require('./listeners/on-room-join')
const onRoomLeave = require('./listeners/on-room-leave')
const onRoomTopic = require('./listeners/on-room-topic')
const { inviteToRoom } = require('./lib/room')
const bot = Wechaty.instance({ profile: 'default' })

async function main () {
  bot
    .on('scan', onScan)
    .on('login', onLogin)
    .on('logout', onLogout)
    .on('logout', onLogout)
    .on('message', onMessage.bind(null, bot))
    .on('friendship', onFriend.bind(null, bot))
    .on('room-invite', onRoomInvite)
    .on('room-join', onRoomJoin)
    .on('room-leave', onRoomLeave)
    .on('room-topic', onRoomTopic)
    .start()
    .catch(async function (e) {
      console.log(`Init() fail: ${e}.`)
      await bot.stop()
      process.exit(1)
    })
}

main()

finis((code, signal, error) => {
  console.log('Importand data saved at this step.')

  // await bot.stop()
  bot.stop()
  console.log(`Wechaty exit ${code} because of ${signal}/${error})`)
  process.exit(1)
})
