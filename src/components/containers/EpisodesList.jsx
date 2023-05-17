import { Link, useParams } from "react-router-dom";
import { useContext } from "react";
import { Loading } from "../../contexts/Loading";
import { dateFormat } from "../../utils/dateFormat";
import { time } from "../../utils/time";

function EpisodesList({ episodes }) {
  // Obtiene los parámetros de la URL utilizando el hook useParams
  const params = useParams();

  // Obtiene el contexto de carga utilizando el hook useContext
  const loadingContext = useContext(Loading);

  // Mapea los episodios y los renderiza como una lista
  const episode = episodes.map((episode, i) => (
    <ul
      key={episode.id}
      className={`grid grid-cols-3 gap-20 m-0 py-2.5 border-solid border-b border-gray-300 ${
        i % 2 === 0 ? "" : "bg-gray-200"
      }`}
    >
      <li>
        {/* Enlace al detalle del episodio */}
        <Link
          to={`/podcast/${params.podcastId}/episode/${episode.id}`}
          className="no-underline text-blue-500"
          onClick={() => loadingContext.setLoading(true)}
        >
          {episode.name}
        </Link>
      </li>
      <li className="text-center">
        {/* Formatea la fecha del episodio */}
        {dateFormat(episode.date)}
      </li>
      <li className="text-center">
        {/* Convierte la duración del episodio */}
        {time(episode.duration)}
      </li>
    </ul>
  ));

  return (
    <section className="mx-5">
      {/* Título y conteo de episodios */}
      <h2 className="font-bold text-3xl p-5 shadow-md">
        Episodes: {episodes.length}
      </h2>

      {/* Contenedor de episodios */}
      <article className="mt-12 grid gap-0 p-5 shadow-md">
        {/* Encabezado de la lista de episodios */}
        <ul className="grid grid-cols-3 gap-20 font-bold pb-2.5 border-solid border-b-2 border-gray-300">
          <li>Title</li>
          <li className="text-center">Date</li>
          <li className="text-center">Duration</li>
        </ul>
        {/* Renderiza la lista de episodios o muestra un mensaje de carga */}
        {!loadingContext.loading ? episode : "Cargando lista de episodios..."}
      </article>
    </section>
  );
}

export default EpisodesList;
