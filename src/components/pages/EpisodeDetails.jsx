import InfoPodcast from "../shared/InfoPodcast.jsx";
import Track from "../containers/Track.jsx";
import { Loading } from "../../contexts/Loading.js";
import { useContext, useEffect } from "react";
import ls from "../../utils/storage.js";

const EpisodeDetails = ({ episodeFound }) => {
  // Obtiene el podcast encontrado del almacenamiento local
  const podcastFound = ls.get("podcastFound");

  // Obtiene el contexto de carga utilizando el hook useContext
  const loadingContext = useContext(Loading);

  useEffect(() => {
    // Desactiva el contexto de carga cuando se haya cargado la página
    if (loadingContext.loading) {
      loadingContext.setLoading(false);
    }
  }, [loadingContext, loadingContext.loading]);

  return (
    // Renderiza los detalles del episodio solo si no hay carga en progreso
    !loadingContext.loading && (
      <div className="flex justify-around">
        {/* Componente InfoPodcast para mostrar información del podcast */}
        <InfoPodcast podcastFound={podcastFound} />

        {/* Componente Track para mostrar detalles del episodio */}
        <Track episodeFound={episodeFound} />
      </div>
    )
  );
};

export default EpisodeDetails;
