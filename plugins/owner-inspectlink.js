import * as baileys from '@whiskeysockets/baileys'

let handler = async (m, { conn, text }) => {
	let [, code] = text.match(/chat\.whatsapp\.com\/(?:invite\/)?([0-9A-Za-z]{20,24})/i) || []
	if (!code) throw '⚠️ *_𝘐𝘯𝘨𝘳𝘦𝘴𝘦 𝘶𝘯 𝘦𝘯𝘭𝘢𝘻𝘦 𝘥𝘦 𝘸𝘩𝘢𝘵𝘴𝘢𝘱𝘱._*'
	let res = await conn.query({ tag: 'iq', attrs: { type: 'get', xmlns: 'w:g2', to: '@g.us' }, content: [{ tag: 'invite', attrs: { code } }] }),
		data = extractGroupMetadata(res),
		txt = Object.keys(data).map(v => `*${v.capitalize()}:* ${data[v]}`).join('\n'),
		pp = await conn.profilePictureUrl(data.id, 'image').catch(console.error)
		let groupinfo = `
*╭───────────────╮*
*│🎋❐ 𝙸𝙳:* ◜${data.id}◞
*│🎋❐ 𝙽𝙾𝙼𝙱𝚁𝙴:* ◜${data.subject}◞
*│🎋❐ 𝙲𝚁𝙴𝙰𝙳𝙾:* ◜${data.creation}◞
*│🎋❐ 𝙲𝚁𝙴𝙰𝙳𝙾:* ◜${data.owner}◞
*╰───────────────╯*
`
	await conn.reply(m.chat, groupinfo, fakemsg)
	const botones = [
{index: 1, urlButton: {displayText: `•Copiar Desc`, url: `https://www.whatsapp.com/otp/copy/${data.desc}`}},
]
await conn.sendMessage(m.chat, { text: `*╭──────────────╮*\n│🐳 • ¿Desea copiar la descripción?\n*╰──────────────╯*`, templateButtons: botones, footer: botname })
conn.sendNyanCat(m.chat, `${data.desc}`, adnyancat, 'Dᴇsᴄʀɪᴘᴄɪᴏ́ɴ Gʀᴀᴛɪs🐱', botname, script, m)
}
handler.tags = ['owner']
handler.command = handler.help = ['inspect']

export default handler
handler.owner = true


const extractGroupMetadata = (result) => {
	const group = baileys.getBinaryNodeChild(result, 'group')
	const descChild = baileys.getBinaryNodeChild(group, 'description')
	let desc
	if (descChild) desc = baileys.getBinaryNodeChild(descChild, 'body')?.content
	const metadata = {
		id: group.attrs.id.includes('@') ? group.attrs.id : baileys.jidEncode(group.attrs.id, 'g.us'),
		subject: group.attrs.subject,
		creation: new Date(+group.attrs.creation * 1000).toLocaleString('id', { timeZone: 'Asia/Jakarta' }),
		owner: group.attrs.creator ? 'wa.me/' + baileys.jidNormalizedUser(group.attrs.creator).split('@')[0] : undefined,
		desc
	}
	return metadata
}
