import { useContext, useEffect, useState } from "react";
import Filter from "../shared/Filter.jsx";
import ResultsList from "../containers/ResultsList.jsx";
import ls from "../../utils/storage.js";
import { Loading } from "../../contexts/Loading.js";

function Home({ popularPodcasts }) {
  // Estado para almacenar el valor del filtro
  const [filter, setFilter] = useState(ls.get("filter", ""));

  // Obtiene el contexto de carga utilizando el hook useContext
  const loadingContext = useContext(Loading);

  // Función para actualizar el valor del filtro
  const filterUpdater = (value) => {
    setFilter(value);
  };

  useEffect(() => {
    // Guarda el valor del filtro en el almacenamiento local
    ls.set("filter", filter);
  }, [filter]);

  useEffect(() => {
    // Simula una carga de 2 segundos antes de desactivar el contexto de carga
    if (loadingContext.loading) {
      setTimeout(() => {
        loadingContext.setLoading(false);
      }, 2000);
    }
  }, [loadingContext]);

  // Elimina los espacios en blanco al inicio y al final del filtro
  const trimmedFilter = filter && filter.trim();

  // Filtra los podcasts populares según el filtro
  const filteredPodcast = popularPodcasts.filter((podcast) =>
    trimmedFilter
      ? podcast.title.toLowerCase().includes(trimmedFilter.toLowerCase()) ||
        podcast.author.toLowerCase().includes(trimmedFilter.toLowerCase())
      : true
  );

  return (
    <main>
      {/* Componente Filter para filtrar los podcasts */}
      <Filter
        filterUpdater={filterUpdater}
        filter={filter}
        filteredPodcastLength={filteredPodcast.length}
      />

      {/* Muestra la lista de resultados si no hay carga en progreso */}
      {!loadingContext.loading && (
        <ResultsList filteredPodcast={filteredPodcast} />
      )}
    </main>
  );
}

export default Home;
