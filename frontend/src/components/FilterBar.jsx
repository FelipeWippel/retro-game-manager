function FilterBar({ selectedConsole, onFilter }) {
  const consoles = ['SNES', 'PS1', 'GBA', 'N64', 'Genesis', 'NES'];

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onFilter('')}
        className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
          selectedConsole === ''
            ? 'bg-gradient-to-r from-retro-purple to-retro-pink text-white shadow-lg'
            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
        }`}
      >
        🎮 Todos
      </button>

      {consoles.map((console) => (
        <button
          key={console}
          onClick={() => onFilter(console)}
          className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
            selectedConsole === console
              ? 'bg-gradient-to-r from-retro-purple to-retro-pink text-white shadow-lg'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          {console}
        </button>
      ))}
    </div>
  );
}

export default FilterBar;
