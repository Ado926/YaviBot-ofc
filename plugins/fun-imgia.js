import fetch from 'node-fetch';

const handler = async (m, { conn, text }) => {
  if (!text) {
    await conn.sendMessage(m.chat, { text: '*Falta el texto para crear la imagen ✨*' }, { quoted: m });
    return;
  }

  m.react('💎');
  await conn.sendMessage(m.chat, { text: `*Creando imagen de ${text} :D*` }, { quoted: m });

  try {
    const res = await fetch(`https://eliasar-yt-api.vercel.app/api/ai/text2img?prompt=${encodeURIComponent(text)}`);
    if (!res.ok) throw new Error();

    const buffer = await res.buffer();
    m.react('💪');
    m.react('😏');
    m.react('👍');
    // Lista de ideas para los botones (50 ideas)
    const ideas = [
      { id: '.imgg gato', text: 'Gato 😼' },
      { id: '.imgg perro amigable', text: 'Perrito 🐶' },
      { id: '.imgg loro colorido', text: 'Loro 🦜' },
      { id: '.imgg león poderoso', text: 'León 🦁' },
      { id: '.imgg dragón de fuego', text: 'Dragón 🔥' },
      { id: '.imgg unicornio mágico', text: 'Unicornio 🦄' },
      { id: '.imgg ciudad futurista', text: 'Ciudad Futurista 🏙️' },
      { id: '.imgg bosque encantado', text: 'Bosque Encantado 🌲' },
      { id: '.imgg robot amigable', text: 'Robot 🤖' },
      { id: '.imgg nave espacial', text: 'Nave Espacial 🚀' },
      { id: '.imgg castillo medieval', text: 'Castillo 🏰' },
      { id: '.imgg océano profundo', text: 'Océano 🌊' },
      { id: '.imgg sirena en el mar', text: 'Sirena 🧜‍♀️' },
      { id: '.imgg panda comiendo bambú', text: 'Panda 🐼' },
      { id: '.imgg dinosaurio jurásico', text: 'Dinosaurio 🦖' },
      { id: '.imgg guerrero samurái', text: 'Samurái ⚔️' },
      { id: '.imgg ninja sigiloso', text: 'Ninja 🥷' },
      { id: '.imgg hada del bosque', text: 'Hada ✨' },
      { id: '.imgg vampiro elegante', text: 'Vampiro 🧛‍♂️' },
      { id: '.imgg hombre lobo', text: 'Hombre Lobo 🌕' },
      { id: '.imgg cyberpunk girl', text: 'Chica Cyberpunk 💾' },
      { id: '.imgg guerrero vikingo', text: 'Vikingo 🪓' },
      { id: '.imgg diosa griega', text: 'Diosa Griega 🏛️' },
      { id: '.imgg elfo arquero', text: 'Elfo Arquero 🏹' },
      { id: '.imgg alienígena simpático', text: 'Alien 👽' },
      { id: '.imgg templo antiguo', text: 'Templo Antiguo 🏯' },
      { id: '.imgg dragón de hielo', text: 'Dragón de Hielo ❄️' },
      { id: '.imgg motociclista rebelde', text: 'Motociclista 🏍️' },
      { id: '.imgg auto deportivo', text: 'Auto Deportivo 🏎️' },
      { id: '.imgg puesta de sol', text: 'Atardecer 🌅' },
      { id: '.imgg aurora boreal', text: 'Aurora Boreal 🌌' },
      { id: '.imgg caballero medieval', text: 'Caballero ⚔️' },
      { id: '.imgg superhéroe volador', text: 'Superhéroe 🦸‍♂️' },
      { id: '.imgg ángel celestial', text: 'Ángel 👼' },
      { id: '.imgg demonio infernal', text: 'Demonio 😈' },
      { id: '.imgg zombie aterrador', text: 'Zombie 🧟‍♂️' },
      { id: '.imgg ciudad postapocalíptica', text: 'Postapocalipsis ☢️' },
      { id: '.imgg caballos corriendo', text: 'Caballos 🐎' },
      { id: '.imgg tigre cazador', text: 'Tigre 🐯' },
      { id: '.imgg caricatura divertida', text: 'Caricatura 🎨' },
      { id: '.imgg fractales abstractos', text: 'Arte Abstracto 🌀' },
      { id: '.imgg monstruo marino', text: 'Monstruo Marino 🐙' },
      { id: '.imgg esqueleto pirata', text: 'Pirata Esqueleto ☠️' },
      { id: '.imgg vaquero del oeste', text: 'Vaquero 🤠' },
      { id: '.imgg campo de flores', text: 'Campo de Flores 🌸' },
      { id: '.imgg cocina de sushi', text: 'Sushi 🍣' },
      { id: '.imgg pastel de cumpleaños', text: 'Pastel 🎂' },
      { id: '.imgg oso polar', text: 'Oso Polar 🐻‍❄️' },
      { id: '.imgg galaxia lejana', text: 'Galaxia 🌌' },
    ];

    // Función para mezclar el array (random)
    const shuffle = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };

    // Mezclamos y tomamos los primeros 4 (puedes poner el número que quieras)
    const randomIdeas = shuffle(ideas).slice(0, 4);

    // Creamos los botones a partir de las ideas aleatorias
    const buttons = randomIdeas.map(idea => ({
      buttonId: idea.id,
      buttonText: { displayText: idea.text },
    }));

    await conn.sendMessage(m.chat, { 
      image: buffer, 
      caption: 'Imagen creada con éxitoo. ¡Elige otra idea para seguir creando! :3',
      buttons: buttons,
      footer: '💥 TU IMAGEN :3',
      viewOnce: true,
    }, { quoted: m });
    
  } catch (e) {
    console.error(e);
    await conn.sendMessage(m.chat, { text: '*🚨 Ha ocurrido un error*' }, { quoted: m });
  }
};

handler.tags = ['fun'];
handler.help = ['crear >Prompt<'];
handler.command = ['imgIA', 'imgg', 'crear'];

export default handler;