let handler = async (m) => {

global.db.data.chats[m.chat].isBanned = true
conn.reply(m.chat, `✅ *Yavi Bot Ha Sido Desactivado En Este Chat :c*`, m, rcanal)

}
handler.help = ['banchat']
handler.tags = ['owner']
handler.command = /^banchat$/i
handler.prems = true 

export default handler