const handler = async (m, { conn }) => {
    const user = global.db.data.users[m.sender];
        conn.sendMessage(m.chat, {text: `*[❗] @${m.sender.split('@')[0]} 𝙰𝙷𝙾𝚁𝙰 𝚃𝚄𝚂 𝚁𝙴𝙲𝚄𝚁𝚂𝙾𝚂 𝚂𝙾𝙽 𝙸𝙻𝙸𝙼𝙸𝚃𝙰𝙳𝙾𝚂.*`, mentions: [m.sender]}, {quoted: m});
      global.db.data.users[m.sender].money = Infinity;
    global.db.data.users[m.sender].limit = Infinity;
  global.db.data.users[m.sender].level = Infinity;
 global.db.data.users[m.sender].exp = Infinity;
};
handler.help = ['cheat'];
handler.tags = ['owner'];
handler.command = /^(ilimitado|infiniy|chetar)$/i;
handler.rowner = true;
handler.fail = null;
export default handler;
