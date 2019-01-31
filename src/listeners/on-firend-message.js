/**
 * Created by pengchaoyang on 2019/1/31
 */
const fs = require('fs')
const path = require('path')
const config = require('../config')
const { saveMediaFile } = require('../lib/file')
const { inviteToRoom } = require('../lib/room')
const { msgInfo } = require('../lib/logger')
const { log } = require('wechaty')
module.exports = async function onFriendMessage (bot, message) {
  const { Image, Emoticon, Video, Url, Text, Contact, Attachment, Unknown } = bot.Message.Type
  const sender = message.from()
  msgInfo(message)
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
      const text = message.text()
      log.info(text)
      await message.say('hello~')
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
}
