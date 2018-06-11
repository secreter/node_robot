const finis = require('finis')
const { Wechaty,Room  } = require('wechaty')
const onScan=require('./listeners/on-scan')
const onLogin=require('./listeners/on-login')
const onMessage=require('./listeners/on-message')
const onFriend=require('./listeners/on-friend')
const { inviteToRoom } = require('./lib/room')
const bot = Wechaty.instance({ profile: "default"})

async function main() {

  bot
    .on('scan',     onScan)
    .on('login',    onLogin)
    .on('message',  onMessage)
    .on('friend',   onFriend)
    .start()
    .catch(async function(e) {
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

