/**
 * Created by pengchaoyang on 2019/1/31
 */
const fs = require('fs')
const path = require('path')
const config = require('../config')
const { saveMediaFile } = require('../lib/file')
const { inviteToRoom } = require('../lib/room')
module.exports = async function onRoomMessage (bot, message) {
  const { Image, Emoticon, Video, Url, Text, Contact, Attachment, Unknown } = bot.Message.Type
  const room = message.room()
  const sender = message.from()
  const roomName = room ? `[${await room.topic()}] ` : ''
  // process.stdout.write(
  //   `${roomName}<${sender.name()}>(${message.type()}): `)
  //
  // console.log((room ? '[' + await room.topic() + ']' : '') +
  //       '<' + sender.name() + '>' +
  //       ':' + message
  // )
  if (message.self()) {
    return // skip self
  }
  switch (message.type()) {
    case Image:
      saveMediaFile(message, config.filePath)
      break
    case Emoticon:
      break
    case Video:
      break
    case Url:
      break
    case Text:
      break
    case Contact:
      break
    case Attachment:
      break
    case Unknown:
      break
    default:
      break
  }
  /**
     * `ding` will be the magic(toggle) word:
     *  1. say ding first time, will got a room invitation
     *  2. say ding in room, will be removed out
     */
  // try {
  //   await inviteToRoom(sender, 'test')
  // } catch (e) {
  //   log.error(e)
  // }
}
