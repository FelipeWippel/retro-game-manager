const db = require('./database');

const initialGames = [
  {
    title: 'Super Mario World',
    console: 'SNES',
    status: 'Zerado',
    rating: 10,
    cover_url: 'https://upload.wikimedia.org/wikipedia/pt/0/06/Super-Mario-World.jpg'
  },
  {
    title: 'Chrono Trigger',
    console: 'SNES',
    status: 'Jogando',
    rating: 10,
    cover_url: 'https://preview.redd.it/new-chrono-trigger-cover-art-for-snes-mini-v0-jclead1vbr8d1.png?auto=webp&s=9d3dd5f9d5f1c7dc97732aae42050522ef3b9f98'
  },
  {
    title: 'Final Fantasy VII',
    console: 'PS1',
    status: 'Zerado',
    rating: 9,
    cover_url: 'https://http2.mlstatic.com/D_NQ_NP_843578-MLA47661165116_092021-O.webp'
  },
  {
    title: 'Pokémon Emerald',
    console: 'GBA',
    status: 'Na Estante',
    rating: 9,
    cover_url: 'https://upload.wikimedia.org/wikipedia/pt/7/72/Pok%C3%A9mon_Emerald_cover.png'
  },
  {
    title: 'The Legend of Zelda: A Link to the Past',
    console: 'SNES',
    status: 'Zerado',
    rating: 10,
    cover_url: 'https://upload.wikimedia.org/wikipedia/pt/3/31/The_Legenda_of_Zelda_A_Link_to_the_Past_capa.png'
  },
  {
    title: 'Castlevania: Symphony of the Night',
    console: 'PS1',
    status: 'Jogando',
    rating: 10,
    cover_url: 'https://m.media-amazon.com/images/I/61Bzont0MOL.jpg'
  },
  {
    title: 'Metroid Fusion',
    console: 'GBA',
    status: 'Na Estante',
    rating: 8,
    cover_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsSEsnCIx_nieMx6k2CNws7ukcRU36eKQ0gw&s'
  }
];


const seed = () => {
  try {
    
    db.prepare('DELETE FROM games').run();
    console.log('🗑️  Dados antigos removidos');
    
    const insert = db.prepare(`
      INSERT INTO games (title, console, status, rating, cover_url)
      VALUES (?, ?, ?, ?, ?)
    `);
    
    const insertMany = db.transaction((games) => {
      for (const game of games) {
        insert.run(game.title, game.console, game.status, game.rating, game.cover_url);
      }
    });
    
    insertMany(initialGames);
    
    console.log(`✅ ${initialGames.length} jogos adicionados com sucesso!`);
    console.log('🎮 Banco de dados populado e pronto para uso!');
    
    
    const games = db.prepare('SELECT * FROM games').all();
    console.log('\n📋 Jogos cadastrados:');
    games.forEach(game => {
      console.log(`   - ${game.title} (${game.console}) - ${game.status}`);
    });
    
  } catch (error) {
    console.error('❌ Erro ao popular banco:', error.message);
  }
};

seed();
