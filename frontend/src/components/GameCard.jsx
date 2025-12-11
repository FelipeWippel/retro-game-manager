import { useState } from 'react';

const statusColors = {
  'Jogando': 'bg-blue-500',
  'Zerado': 'bg-green-500',
  'Na Estante': 'bg-yellow-500'
};

const statusEmojis = {
  'Jogando': '🎮',
  'Zerado': '✅',
  'Na Estante': '📚'
};

function GameCard({ game, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    status: game.status,
    rating: game.rating
  });

  const handleSave = () => {
    onUpdate(game.id, editData);
    setIsEditing(false);
  };

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-gray-700 hover:border-retro-purple">
      {/* Cover Image */}
      <div className="relative h-64 bg-gray-900 overflow-hidden">
        {game.cover_url ? (
          <img
            src={game.cover_url}
            alt={game.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/300x400/1a1a2e/9333ea?text=No+Image';
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl">
            🎮
          </div>
        )}
        
        {/* Console Badge */}
        <div className="absolute top-2 right-2 bg-black bg-opacity-80 text-retro-cyan font-bold px-3 py-1 rounded-full text-xs">
          {game.console}
        </div>
      </div>

      {/* Game Info */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-white mb-2 truncate" title={game.title}>
          {game.title}
        </h3>

        {isEditing ? (
          <div className="space-y-3">
            {/* Status Select */}
            <div>
              <label className="block text-xs text-gray-400 mb-1">Status:</label>
              <select
                value={editData.status}
                onChange={(e) => setEditData({ ...editData, status: e.target.value })}
                className="w-full bg-gray-700 text-white rounded px-2 py-1 text-sm"
              >
                <option value="Jogando">🎮 Jogando</option>
                <option value="Zerado">✅ Zerado</option>
                <option value="Na Estante">📚 Na Estante</option>
              </select>
            </div>

            {/* Rating Input */}
            <div>
              <label className="block text-xs text-gray-400 mb-1">Nota (0-10):</label>
              <input
                type="number"
                min="0"
                max="10"
                value={editData.rating}
                onChange={(e) => setEditData({ ...editData, rating: parseInt(e.target.value) || 0 })}
                className="w-full bg-gray-700 text-white rounded px-2 py-1 text-sm"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-1 px-3 rounded text-sm"
              >
                Salvar
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-1 px-3 rounded text-sm"
              >
                Cancelar
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Status Badge */}
            <div className="flex items-center gap-2 mb-2">
              <span className={`${statusColors[game.status]} text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1`}>
                {statusEmojis[game.status]} {game.status}
              </span>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-3">
              <span className="text-yellow-400 text-lg">⭐</span>
              <span className="text-white font-bold">{game.rating}/10</span>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditing(true)}
                className="flex-1 bg-retro-purple hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition-colors"
              >
                ✏️ Editar
              </button>
              <button
                onClick={() => onDelete(game.id)}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors"
              >
                🗑️
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default GameCard;
