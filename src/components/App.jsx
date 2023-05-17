import Header from "./shared/Header.jsx";
import Home from "./pages/Home.jsx";
import PodcastDetails from "./pages/PodcastDetails.jsx";
import EpisodeDetails from "./pages/EpisodeDetails.jsx";
import { Loading } from "../contexts/Loading.js";
import getPopularPodcasts from "../services/popular.js";
import fetchEpisodes from "../services/episodes.js";
import ls from "../utils/storage.js";
import { useEffect, useState } from "react";
import { matchPath, Route, Routes, useLocation } from "react-router-dom";

function App() {
  // Estado para almacenar la lista de podcasts populares
  const [popularPodcasts, setPopularPodcasts] = useState(
    ls.get("popularPodcastLs", [])
  );

  // Estado para almacenar la lista de episodios de un podcast
  const [episodes, setEpisodes] = useState(ls.get("podcastEpisodesLs", []));

  // Estado para controlar el estado de carga
  const [loading, setLoading] = useState(true);

  // Obtiene la ruta actual de la aplicación
  const { pathname } = useLocation();

  // Función para actualizar el estado de carga
  const loadingUpdate = (bool) => {
    setLoading(bool);
  };

  // Obtiene el ID del podcast de la URL actual
  const podcastDataPath = matchPath("/podcast/:podcastId", pathname);
  const podcastId =
    podcastDataPath !== null ? podcastDataPath.params.podcastId : null;

  // Obtiene el ID del episodio de la URL actual
  const episodeDataPath = matchPath(
    "/podcast/:podcastId/episode/:episodeId",
    pathname
  );
  const episodeId =
    episodeDataPath !== null ? episodeDataPath.params.episodeId : null;

  useEffect(() => {
    setLoading(true);

    // Obtiene la lista de podcasts populares si aún no se ha cargado
    if (popularPodcasts.length === 0) {
      getPopularPodcasts().then((data) => {
        setPopularPodcasts(data);
        ls.set("popularPodcastLs", data);
      });
    }

    // Obtiene la lista de episodios del podcast si aún no se ha cargado
    if (podcastId && episodes.length === 0) {
      fetchEpisodes(podcastId).then((data) => {
        setEpisodes(data);
        ls.set("podcastEpisodesLs", data);
      });
    }

    setLoading(false);
  }, [popularPodcasts, podcastId, episodes]);

  // Busca el podcast actual en la lista de podcasts populares
  const podcastFound = popularPodcasts.find(
    (podcast) => podcast.id === podcastId
  );

  // Busca el episodio actual en la lista de episodios
  const episodeFound = episodes.find((episode) => episode.id === episodeId);

  return (
    <Loading.Provider value={{ loading: loading, setLoading: setLoading }}>
      <div className="m-12">
        {/* Componente Header */}
        <Header />

        <Routes>
          {/* Ruta para la página de inicio */}
          <Route
            path="/podcaster/"
            element={<Home popularPodcasts={popularPodcasts} />}
          />

          {/* Ruta para los detalles del podcast */}
          <Route
            path="/podcast/:podcastId"
            element={
              <PodcastDetails
                podcastFound={podcastFound}
                episodes={episodes}
                loadingUpdate={loadingUpdate}
              />
            }
          />

          {/* Ruta para los detalles del episodio */}
          <Route
            path="/podcast/:podcastId/episode/:episodeId"
            element={<EpisodeDetails episodeFound={episodeFound} />}
          />
        </Routes>
      </div>
    </Loading.Provider>
  );
}

export default App;
