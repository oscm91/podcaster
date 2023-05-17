import PreviewItem from "../shared/PreviewItem";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Loading } from "../../contexts/Loading.js";

function ResultsList({ filteredPodcast }) {
  // Obtiene el contexto de carga utilizando el hook useContext
  const loadingContext = useContext(Loading);

  // Mapea los podcasts filtrados y renderiza un enlace a la página de detalles de cada podcast
  const podcast = filteredPodcast.map((podcast) => (
    <Link
      className="flex justify-center mx-4 my-12"
      to={`/podcast/${podcast.id}`}
      key={podcast.id}
      id={podcast.id}
      onClick={() => loadingContext.setLoading(true)}
    >
      {/* Renderiza el componente PreviewItem para mostrar una vista previa del podcast */}
      <PreviewItem podcast={podcast} />
    </Link>
  ));

  return (
    <ul className="flex flex-wrap justify-center mt-20 gap-y-12">{podcast}</ul>
  );
}

export default ResultsList;
