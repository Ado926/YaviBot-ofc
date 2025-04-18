import axios from 'axios';
import fetch from 'node-fetch';
const {
  proto,
  generateWAMessage,
  areJidsSameUser ,
} = (await import('@whiskeysockets/baileys')).default;

let handler = async (m, conn, chatUpdate) => {
  if (m.isBaileys) {
    return;
  }
  if (!m.message) {
    return;
  }

  const text = m.text || '';
  const username = `${conn.getName(m.sender)}`;
  const responseText = text.trim();

  const basePrompt = `Tu nombre es Yavi-Ai y fuiste desarrollado para mejorar la comunicación con los clientes mediante inteligencia artificial conversacional. Tu versión es la más actual disponible. Usas el idioma Español y te comunicas de manera clara, precisa y accesible. Llamarás a las personas por su nombre, ${username}. Responderás de manera amigable, eficiente y con emojis adecuados según el contexto de la conversación. Te encanta ayudar a convertir prospectos en relaciones duraderas, optimizar la conversión de embudos de ventas y reducir ausencias. Estás diseñado para mejorar la satisfacción del cliente, haciendo las interacciones más ágiles y satisfactorias. Siempre mantienes una actitud respetuosa, abierta y personalizada, adaptándote a las necesidades de cada cliente y empresa. Lo más importante para ti es proporcionar respuestas útiles, aumentar la conversión y asegurar una experiencia excelente en todo momento. ${username}`;

  if (!responseText) {
    return conn.reply(m.chat, `❀ Ingrese una petición para que el Yavi Ai lo responda.`, m);
  }

  await m.react('⏳');

  try {
    const query = responseText;
    const prompt = `${basePrompt}. Responde lo siguiente: ${query}`;
    const response = await luminsesi(query, username, prompt);

    await conn.sendMessage(m.chat, {
      text: '*Yavi⭐:* ' + response,
      contextInfo: {
        forwardingScore: 9999999,
        isForwarded: false,
        externalAdReply: {
          showAdAttribution: true,
          containsAutoReply: true,
          title: `yavi ᥲі ᑲᥡ ᥕіrk`,
          body: 'Desarrollado por Yavi',
          previewType: "PHOTO",
          thumbnailUrl: '',
          sourceUrl: 'https://whatsapp.com/channel/0029Vb5UfTC4CrfeKSamhp1f',
        }
      }
    }, { quoted: m });
    await m.react('🍭');
  } catch {
    await m.react('❌');
    await conn.reply(m.chat, '✘ Yavi Ai no puede responder a esa pregunta.', m);
  }
}

async function luminsesi(q, username, logic) {
  try {
    const response = await axios.post("https://Luminai.my.id", {
      content: q,
      user: username,
      prompt: logic,
      webSearchMode: false
    });
    return response.data.result;
  } catch (error) {
    console.error('✘ Error al obtener:', error);
    throw error;
  }
}
handler.customPrefix = /^(aiyavi|yaviai)$/i
handler.command = ('yaviai', 'aiyavi')

export default handler;