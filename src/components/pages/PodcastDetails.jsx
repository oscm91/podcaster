import InfoPodcast from "../shared/InfoPodcast.jsx";
import EpisodesList from "../containers/EpisodesList.jsx";
import { useContext, useEffect } from "react";
import { Loading } from "../../contexts/Loading.js";

const PodcastDetails = ({ podcastFound, episodes }) => {
  // Obtiene el contexto de carga utilizando el hook useContext
  const loadingContext = useContext(Loading);

  useEffect(() => {
    // Si hay episodios cargados y el contexto de carga está activo,
    // simula una carga durante 2 segundos antes de desactivar el contexto de carga
    if (episodes?.length > 0 && loadingContext.loading) {
      setTimeout(() => {
        loadingContext.setLoading(false);
      }, 2000);
    }
  }, [episodes?.length, loadingContext, loadingContext.loading]);

  if (!episodes || !podcastFound) {
    return null;
  }

  return (
    <div className="flex justify-around">
      {/* Componente InfoPodcast para mostrar información del podcast */}
      <InfoPodcast podcastFound={podcastFound} />

      {/* Componente EpisodesList para mostrar la lista de episodios */}
      <EpisodesList episodes={episodes} />
    </div>
  );
};

export default PodcastDetails;
