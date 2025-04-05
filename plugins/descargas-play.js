import fetch from "node-fetch";
import yts from 'yt-search';
import axios from "axios";

const handler = async (m, { conn, text, usedPrefix, command }) => {
  let user = global.db.data.users[m.sender];

  if (user.chocolates < 0) {
    return conn.reply(m.chat, `ꕥ No tienes suficientes *Chocolates 🍫* Necesitas 2 más para usar este comando.`, m);
  }

  try {
    if (!text.trim()) {
      return conn.reply(m.chat, `✧ Ingresa el nombre de la música a descargar.`, m);
    }

    const search = await yts(text);
    if (!search.all || search.all.length === 0) {
      return m.reply('No se encontraron resultados para tu búsqueda.');
    }

    const videoInfo = search.all[0];
    if (!videoInfo) {
      return m.reply('No se pudo obtener información del video.');
    }

    const { title, timestamp, url, author } = videoInfo;

    if (!title || !timestamp || !url || !author) {
      return m.reply('Información incompleta del video.');
    }

    const canal = author.name ? author.name : 'Desconocido';

    let size = 'Desconocido';
    let quality = 'Desconocido';

    // Obtener información adicional sobre el video
    if (command === 'play2' || command === 'mp4' || command === 'playvideo') {
      try {
        const response = await fetch(`https://api.vreden.my.id/api/ytmp4?url=${url}`);
        const json = await response.json();
        if (json.result && json.result.size && json.result.quality) {
          size = json.result.size;
          quality = json.result.quality;
        }
      } catch (error) {
        console.error('Error al obtener tamaño/calidad del video:', error);
      }
    }

    const infoMessage = `「✦」Descargando *<${title}>*

> ✐ Canal » *${canal}*
> ⴵ Duracion » *${timestamp}*
> 🜸 Link » ${url}\n                _*'Cargando....'*_`;

    await conn.reply(m.chat, infoMessage, m);

    if (command === 'pla' || command === 'mp3' || command === 'playaudio') {
      try {
        const api = await (await fetch(`https://api.vreden.my.id/api/ytmp3?url=${url}`)).json();
        const result = api.result.download.url;

        if (!result) throw new Error('El enlace de audio no se generó correctamente.');

        await conn.sendMessage(
          m.chat,
          { 
            audio: { url: result }, 
            fileName: `${api.result.title}.mp3`, 
            mimetype: 'audio/mpeg', 
            ptt: true 
          }, 
          { quoted: m }
        );
      } catch (e) {
        console.error('Error al enviar el audio:', e.message);
        return conn.reply(m.chat, '⚠︎ No se pudo enviar el audio. Intenta nuevamente más tarde.', m);
      }
    } else if (command === 'play2' || command === 'mp4' || command === 'playvideo') {
      try {
        const response = await fetch(`https://api.vreden.my.id/api/ytmp4?url=${url}`);
        const json = await response.json();
        const resultado = json.result.download.url;

        if (!resultado) throw new Error('El enlace de video no se generó correctamente.');

        await conn.sendMessage(
          m.chat,
          { 
            video: { url: resultado }, 
            fileName: json.result.title, 
            mimetype: 'video/mp4', 
            caption: 'Tomaa :3' 
          }, 
          { quoted: m }
        );
      } catch (e) {
        console.error('Error al enviar el video:', e.message);
        return conn.reply(m.chat, '⚠︎ No se pudo enviar el video. Intenta nuevamente más tarde.', m);
      }
    } else {
      return conn.reply(m.chat, '⚠︎ Comando no reconocido.', m);
    }

    user.chocolates -= 0;
    conn.reply(m.chat, `> ${taguser} 🌼 Aqui tienes :3`, m);
  } catch (error) {
    return m.reply(`⚠︎ Ocurrió un error: ${error}`);
  }
};

handler.command = handler.help = ['mp3', 'playaudio', 'play2', 'mp4', 'playvideo'];
handler.tags = ['downloader'];

export default handler;