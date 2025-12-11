function StatsBar({ stats }) {
  const completionPercentage = stats.total > 0 
    ? Math.round((stats.completed / stats.total) * 100) 
    : 0;

  return (
    <div className="bg-gray-900 border-b border-gray-800 py-6">
      <div className="container mx-auto px-4">
        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-gray-300">
              Progresso de Conclusão
            </span>
            <span className="text-sm font-bold text-retro-purple">
              {stats.completed}/{stats.total} jogos zerados ({completionPercentage}%)
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
            <div
              className="bg-gradient-to-r from-retro-purple to-retro-pink h-full rounded-full transition-all duration-500 flex items-center justify-end pr-2"
              style={{ width: `${completionPercentage}%` }}
            >
              {completionPercentage > 10 && (
                <span className="text-xs font-bold text-white">
                  {completionPercentage}%
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Total */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-lg p-4 border border-gray-600">
            <div className="text-3xl mb-1">🎮</div>
            <div className="text-2xl font-bold text-white">{stats.total}</div>
            <div className="text-xs text-gray-400">Total de Jogos</div>
          </div>

          {/* Completed */}
          <div className="bg-gradient-to-br from-green-900 to-green-800 rounded-lg p-4 border border-green-600">
            <div className="text-3xl mb-1">✅</div>
            <div className="text-2xl font-bold text-white">{stats.completed}</div>
            <div className="text-xs text-gray-300">Zerados</div>
          </div>

          {/* Playing */}
          <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-lg p-4 border border-blue-600">
            <div className="text-3xl mb-1">🎮</div>
            <div className="text-2xl font-bold text-white">{stats.playing}</div>
            <div className="text-xs text-gray-300">Jogando</div>
          </div>

          {/* Backlog */}
          <div className="bg-gradient-to-br from-yellow-900 to-yellow-800 rounded-lg p-4 border border-yellow-600">
            <div className="text-3xl mb-1">📚</div>
            <div className="text-2xl font-bold text-white">{stats.backlog}</div>
            <div className="text-xs text-gray-300">Na Estante</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatsBar;
