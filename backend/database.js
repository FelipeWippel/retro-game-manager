const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, 'games.db'));

// cria tabela de jogo
const createTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS games (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      console TEXT NOT NULL,
      status TEXT NOT NULL,
      rating INTEGER DEFAULT 0,
      cover_url TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `;
  db.exec(sql);
  console.log('✅ Tabela "games" criada/verificada com sucesso!');
};

createTable();

module.exports = db;
