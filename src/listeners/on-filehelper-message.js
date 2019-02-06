const { msgInfo } = require('../lib/logger')
const { ContactSelf } = require('wechaty')
const { FileBox }  = require('file-box')
const QRCode = require('qrcode')
module.exports = async function onFileHelperMessage (bot, message){
  const { Image, Emoticon, Video, Url, Text, Contact, Attachment, Unknown } = bot.Message.Type
  const filehelper = bot.Contact.load('filehelper')
  const sender = message.from()
  const receiver = message.to()
  const self = bot.userSelf()
  console.log(11,sender.id,receiver.id)
  // avoid loop response
  if (sender.id === 'filehelper'){
    return
  }
  msgInfo(message)
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
      await onText(bot,message)
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
  // await filehelper.say('auto reply: ')
  if(message.text()=='1'){
    await filehelper.say('auto reply: ')
  }


}
async function onText(bot,message){
  const text=message.text()
  const self = bot.userSelf()
  const filehelper = bot.Contact.load('filehelper')
  switch (text) {
    case 'qr':
      //Unsupported
      const qrcode = await self.qrcode()
      QRCode.toFile('./my.png', qrcode, {
        color: {
          dark: '#00F',  // Blue dots
          light: '#0000' // Transparent background
        }
      }, function (err) {
        if (err) throw err
        console.log('done')
        const qrImg = FileBox.fromFile('./my.png')
        filehelper.say(qrImg).then(()=>{})
      })
  }
}
