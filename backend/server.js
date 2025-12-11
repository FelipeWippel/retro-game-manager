const express = require('express');
const cors = require('cors');
const db = require('./database');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// ========== ROTAS DA API ==========

app.get('/api/games', (req, res) => {
  try {
    const { console } = req.query;
    
    let sql = 'SELECT * FROM games ORDER BY created_at DESC';
    let games;
    
    if (console) {
      sql = 'SELECT * FROM games WHERE console = ? ORDER BY created_at DESC';
      games = db.prepare(sql).all(console);
    } else {
      games = db.prepare(sql).all();
    }
    
    res.json(games);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/games/:id', (req, res) => {
  try {
    const { id } = req.params;
    const game = db.prepare('SELECT * FROM games WHERE id = ?').get(id);
    
    if (!game) {
      return res.status(404).json({ error: 'Jogo não encontrado' });
    }
    
    res.json(game);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/games', (req, res) => {
  try {
    const { title, console, status, rating, cover_url } = req.body;
    
    if (!title || !console || !status) {
      return res.status(400).json({ error: 'Título, console e status são obrigatórios' });
    }
    
    const sql = `
      INSERT INTO games (title, console, status, rating, cover_url)
      VALUES (?, ?, ?, ?, ?)
    `;
    
    const result = db.prepare(sql).run(
      title,
      console,
      status,
      rating || 0,
      cover_url || ''
    );
    
    const newGame = db.prepare('SELECT * FROM games WHERE id = ?').get(result.lastInsertRowid);
    
    res.status(201).json(newGame);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/games/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { title, console, status, rating, cover_url } = req.body;
    
    const game = db.prepare('SELECT * FROM games WHERE id = ?').get(id);
    
    if (!game) {
      return res.status(404).json({ error: 'Jogo não encontrado' });
    }
    
    const sql = `
      UPDATE games
      SET title = ?, console = ?, status = ?, rating = ?, cover_url = ?
      WHERE id = ?
    `;
    
    db.prepare(sql).run(
      title || game.title,
      console || game.console,
      status || game.status,
      rating !== undefined ? rating : game.rating,
      cover_url !== undefined ? cover_url : game.cover_url,
      id
    );
    
    const updatedGame = db.prepare('SELECT * FROM games WHERE id = ?').get(id);
    
    res.json(updatedGame);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/games/:id', (req, res) => {
  try {
    const { id } = req.params;
    
    const game = db.prepare('SELECT * FROM games WHERE id = ?').get(id);
    
    if (!game) {
      return res.status(404).json({ error: 'Jogo não encontrado' });
    }
    
    db.prepare('DELETE FROM games WHERE id = ?').run(id);
    
    res.json({ message: 'Jogo removido com sucesso', game });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/stats', (req, res) => {
  try {
    const total = db.prepare('SELECT COUNT(*) as count FROM games').get();
    const completed = db.prepare('SELECT COUNT(*) as count FROM games WHERE status = ?').get('Zerado');
    const playing = db.prepare('SELECT COUNT(*) as count FROM games WHERE status = ?').get('Jogando');
    const backlog = db.prepare('SELECT COUNT(*) as count FROM games WHERE status = ?').get('Na Estante');
    
    res.json({
      total: total.count,
      completed: completed.count,
      playing: playing.count,
      backlog: backlog.count
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🎮 Servidor rodando em http://localhost:${PORT}`);
  console.log(`📊 API disponível em http://localhost:${PORT}/api/games`);
});
