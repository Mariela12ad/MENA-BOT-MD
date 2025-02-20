import yts from 'yt-search';
import fs from 'fs';
const handler = async (m, {conn, text, usedPrefix, command}) => {
  if (!text) throw `*[❗] Nombre de la canción faltante, por favor ingrese el comando más el nombre/titulo de una canción*\n\n*—◉ Ejemplo:*\n*${usedPrefix + command} Begin you*`;
  try {
    const vids_ = {
      from: m.sender,
      urls: [],
    };
    if (!global.videoList) {
      global.videoList = [];
    }
    if (global.videoList[0]?.from == m.sender) {
      global.videoList.splice(0, global.videoList.length);
    }
    const results = await yts(text);
    const textoInfo = `*[❗𝙿𝚞𝚎𝚍𝚎𝚜 𝚍𝚎𝚜𝚌𝚊𝚛𝚐𝚊𝚛 𝚎𝚕 𝚟𝚒𝚍𝚎𝚘 𝚚𝚞𝚎 𝚚𝚞𝚒𝚎𝚛𝚊𝚜 𝚍𝚎 𝚕𝚊 𝚜𝚒𝚐𝚞𝚒𝚎𝚗𝚝𝚎 𝚏𝚘𝚛𝚖𝚊:*
◉ ${usedPrefix}audio <numero>
◉ ${usedPrefix}video <numero> 

*—◉ Ejemplos:*
*◉ ${usedPrefix}audio 5*
*◉ ${usedPrefix}video 8*`.trim();
    const teks = results.all.map((v, i) => {
      const link = v.url;
      vids_.urls.push(link);
      return `[${i + 1}] ✎ 📌 *𝚃𝙸𝚃𝚄𝙻𝙾:* ${v.title} ✎ 📎 *_𝙻𝙸𝙽𝙺:_* ${v.url}
✎ 🕒 *_𝙳𝚄𝚁𝙰𝙲𝙸𝙾𝙽 :_* ${v.timestamp}
✎ 📆 *_𝚂𝚄𝙱𝙸𝙳𝙾 :_* ${v.ago}
✎ 👁 *_𝚅𝙸𝚂𝚃𝙰𝚂 :_* ${v.views}`;
    }).join('\n\n◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦\n\n');
    conn.sendFile(m.chat, results.all[0].thumbnail, 'yts.jpeg', textoInfo + '\n\n' + teks, m);
    global.videoList.push(vids_);
  } catch {
    await m.reply('*[❗] 𝙴𝚁𝚁𝙾𝚁, 𝙿𝙾𝚁 𝙵𝙰𝚅𝙾𝚁 𝚅𝚄𝙴𝙻𝚅𝙰 𝙰 𝙸𝙽𝚃𝙴𝙽𝚃𝙰𝚁𝙻𝙾 𝙲𝙾𝙽 𝙾𝚃𝚁𝙾 𝙽𝙾𝙼𝙱𝚁𝙴 𝙳𝙴 𝚄𝙽𝙰 𝙲𝙰𝙽𝙲𝙸𝙾𝙽*');
  }
};
handler.help = ['playlist *<texto>*'];
handler.tags = ['search'];
handler.command = /^playlist|playlist2$/i;
export default handler;
