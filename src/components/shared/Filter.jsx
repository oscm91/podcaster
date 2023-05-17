function Filter({ filterUpdater, filter, filteredPodcastLength }) {
  // Maneja el evento de cambio en el campo de entrada
  const handleInput = (ev) => {
    filterUpdater(ev.target.value);
  };

  return (
    <form className="flex justify-end gap-4">
      {/* Muestra el número de resultados filtrados */}
      <p className="bg-main rounded-lg px-4 py-2 text-white font-bold text-xl flex items-center">
        {filteredPodcastLength}
      </p>
      <input
        className="w-1/5 min-w-200 max-w-400 rounded-lg border border-gray-400 px-4 text-lg placeholder-gray-500"
        type="text"
        placeholder="Filter podcasts..."
        name="inputFilter"
        id="inputFilter"
        onChange={handleInput}
        value={filter}
      />
    </form>
  );
}

export default Filter;
