import { useState, useEffect } from 'react';
import axios from 'axios';
import GameCard from './components/GameCard';
import AddGameForm from './components/AddGameForm';
import StatsBar from './components/StatsBar';
import FilterBar from './components/FilterBar';

function App() {
  const [games, setGames] = useState([]);
  const [stats, setStats] = useState({ total: 0, completed: 0, playing: 0, backlog: 0 });
  const [selectedConsole, setSelectedConsole] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  // buscar jogo
  const fetchGames = async (console = '') => {
    try {
      setLoading(true);
      const url = console ? `/api/games?console=${console}` : '/api/games';
      const response = await axios.get(url);
      setGames(response.data);
    } catch (error) {
      console.error('Erro ao buscar jogos:', error);
    } finally {
      setLoading(false);
    }
  };

  // buscar estatística
  const fetchStats = async () => {
    try {
      const response = await axios.get('/api/stats');
      setStats(response.data);
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error);
    }
  };

  // adicionar novo jogo
  const handleAddGame = async (gameData) => {
    try {
      await axios.post('/api/games', gameData);
      fetchGames(selectedConsole);
      fetchStats();
      setShowForm(false);
    } catch (error) {
      console.error('Erro ao adicionar jogo:', error);
      alert('Erro ao adicionar jogo!');
    }
  };

  // atualizar jogo
  const handleUpdateGame = async (id, updates) => {
    try {
      await axios.put(`/api/games/${id}`, updates);
      fetchGames(selectedConsole);
      fetchStats();
    } catch (error) {
      console.error('Erro ao atualizar jogo:', error);
      alert('Erro ao atualizar jogo!');
    }
  };

  // deletar jogo
  const handleDeleteGame = async (id) => {
    if (!window.confirm('Tem certeza que deseja remover este jogo?')) return;
    
    try {
      await axios.delete(`/api/games/${id}`);
      fetchGames(selectedConsole);
      fetchStats();
    } catch (error) {
      console.error('Erro ao deletar jogo:', error);
      alert('Erro ao deletar jogo!');
    }
  };

  // filtrar
  const handleFilterConsole = (console) => {
    setSelectedConsole(console);
    fetchGames(console);
  };

  useEffect(() => {
    fetchGames();
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen text-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-900 to-indigo-900 shadow-2xl border-b-4 border-retro-purple">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-center mb-2 text-transparent bg-clip-text bg-gradient-to-r from-retro-purple to-retro-pink">
            🎮 RETRO GAME MANAGER
          </h1>
          <p className="text-center text-gray-300 text-sm">Gerencie sua coleção de jogos clássicos</p>
        </div>
      </header>

      {/* Stats Bar */}
      <StatsBar stats={stats} />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Filter and Add Button */}
        <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
          <FilterBar 
            selectedConsole={selectedConsole} 
            onFilter={handleFilterConsole} 
          />
          
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-gradient-to-r from-retro-purple to-retro-pink hover:from-retro-pink hover:to-retro-purple text-white font-bold py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            {showForm ? '❌ Cancelar' : '➕ Adicionar Jogo'}
          </button>
        </div>

        {/* Add Game Form */}
        {showForm && (
          <div className="mb-8 animate-fadeIn">
            <AddGameForm onSubmit={handleAddGame} onCancel={() => setShowForm(false)} />
          </div>
        )}

        {/* Games Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-retro-purple"></div>
            <p className="mt-4 text-gray-400">Carregando jogos...</p>
          </div>
        ) : games.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-400">🎮 Nenhum jogo encontrado</p>
            <p className="text-gray-500 mt-2">Adicione seu primeiro jogo à coleção!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {games.map((game) => (
              <GameCard
                key={game.id}
                game={game}
                onUpdate={handleUpdateGame}
                onDelete={handleDeleteGame}
              />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 mt-16 py-6">
        <div className="container mx-auto px-4 text-center text-gray-500">
          <p>🎮 Retro Game Manager © 2024 - Desenvolvido com ❤️ para gamers nostálgicos</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
