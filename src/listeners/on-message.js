const fs = require('fs')
const { inviteToRoom } = require('../lib/room')

const { MediaMessage, Misc, log } =require( 'wechaty')

module.exports= async function onMessage (message) {
  try {
    // console.log(message)
    const room = message.room()
    const sender = message.from()
    const content = message.content()
    const roomName = room ? `[${await room.topic()}] ` : ''

    process.stdout.write(
      `${roomName}<${sender.name()}>(${message.type()}:${message.typeSub()}): `)

    if (message instanceof MediaMessage) {
      saveMediaFile(message)
      return
    }

    console.log((room ? '[' + await room.topic() + ']' : '')
      + '<' + sender.name() + '>'
      + ':' + message,
    )

    if (message.self()) {
      return // skip self
    }

    /**
     * `ding` will be the magic(toggle) word:
     *  1. say ding first time, will got a room invitation
     *  2. say ding in room, will be removed out
     */
    try {
      await inviteToRoom(sender,'test')
    }catch (e){
      log.error(e)
    }


    console.log(`${Misc.digestEmoji(content)}`)
    // add an extra CR if too long
    if (content.length > 80) console.log("")
    await message.say('hello~')
    // const config = await hotImport('config.js')
    // // Hot import! Try to change the msgKW1&2 to 'ping' & 'pong'
    // // after the bot has already started!
    // if (content === config.msgKW1) {
    //   await message.say(`${config.msgKW2}, thanks for ${config.msgKW1} me`)
    //   log.info('Bot', `REPLY: ${config.msgKW2}`)
    // } else if (content === config.msgKW2) {
    //   await sender.say('ok, ${config.msgKW2} me is welcome, too.')
    // } else if (/^hello/i.test(content)) {
    //   return `How are you, ${sender.name()} from ${roomName}`
    // }
  } catch (e) {
    log.error('Bot', 'on(message) exception: %s' , e)
  }
}

async function saveMediaFile(message) {
  const filename = message.filename()
  console.log('IMAGE local filename: ' + filename)

  const fileStream = fs.createWriteStream(filename)

  process.stdout.write('saving...')
  try {
    const netStream = await message.readyStream()
    netStream
      .pipe(fileStream)
      .on('close', _ => {
        const stat = fs.statSync(filename)
        console.log(', saved as ', filename, ' size: ', stat.size)
      })
  } catch (e) {
    console.error('stream error:', e)
  }
}
