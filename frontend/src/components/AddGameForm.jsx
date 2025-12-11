import { useState } from 'react';

function AddGameForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    console: 'SNES',
    status: 'Na Estante',
    rating: 0,
    cover_url: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      alert('Por favor, insira o título do jogo!');
      return;
    }

    onSubmit(formData);
    
    // Reset form
    setFormData({
      title: '',
      console: 'SNES',
      status: 'Na Estante',
      rating: 0,
      cover_url: ''
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rating' ? parseInt(value) || 0 : value
    }));
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-2xl p-6 border-2 border-retro-purple">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <span>🎮</span> Adicionar Novo Jogo
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-gray-300 font-semibold mb-2">
            Título do Jogo *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Ex: Super Mario World"
            className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-retro-purple"
            required
          />
        </div>

        {/* Console */}
        <div>
          <label className="block text-gray-300 font-semibold mb-2">
            Console
          </label>
          <select
            name="console"
            value={formData.console}
            onChange={handleChange}
            className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-retro-purple"
          >
            <option value="SNES">SNES</option>
            <option value="PS1">PS1</option>
            <option value="GBA">GBA</option>
            <option value="N64">N64</option>
            <option value="Genesis">Genesis</option>
            <option value="NES">NES</option>
            <option value="PS2">PS2</option>
            <option value="GameCube">GameCube</option>
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="block text-gray-300 font-semibold mb-2">
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-retro-purple"
          >
            <option value="Na Estante">📚 Na Estante</option>
            <option value="Jogando">🎮 Jogando</option>
            <option value="Zerado">✅ Zerado</option>
          </select>
        </div>

        {/* Rating */}
        <div>
          <label className="block text-gray-300 font-semibold mb-2">
            Nota (0-10)
          </label>
          <input
            type="number"
            name="rating"
            min="0"
            max="10"
            value={formData.rating}
            onChange={handleChange}
            className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-retro-purple"
          />
        </div>

        {/* Cover URL */}
        <div>
          <label className="block text-gray-300 font-semibold mb-2">
            URL da Capa (opcional)
          </label>
          <input
            type="url"
            name="cover_url"
            value={formData.cover_url}
            onChange={handleChange}
            placeholder="https://exemplo.com/imagem.jpg"
            className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-retro-purple"
          />
          <p className="text-xs text-gray-400 mt-1">
            💡 Dica: Use imagens de sites como IGDB ou MobyGames
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="flex-1 bg-gradient-to-r from-retro-purple to-retro-pink hover:from-retro-pink hover:to-retro-purple text-white font-bold py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            ✅ Adicionar Jogo
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            ❌ Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddGameForm;
