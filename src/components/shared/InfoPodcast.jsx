import { Link } from "react-router-dom";

const InfoPodcast = ({ podcastFound }) => {
  // Si no se encuentra ningún podcast, se retorna null y no se muestra nada
  if (!podcastFound) {
    return null;
  }

  return (
    <section className="w-1/5 p-5 flex flex-col shadow-md">
      <div className="w-4/5 mx-auto">
        {/* Enlace a la página de detalles del podcast */}
        <Link to={`/podcast/${podcastFound.id}`}>
          <img
            className="w-full"
            src={podcastFound.image}
            alt={`Cover of ${podcastFound.title} by ${podcastFound.author}`}
            title={`Cover of ${podcastFound.title} by ${podcastFound.author}`}
          />
        </Link>
      </div>

      {/* Enlace a la página de detalles del podcast */}
      <Link to={`/podcast/${podcastFound.id}`}>
        <h2 className="font-bold pt-4">{podcastFound.title}</h2>
      </Link>

      <p className="italic py-1">{`by ${podcastFound.author}`}</p>

      {/* Título de la descripción */}
      <h3 className="font-bold pt-4">Description:</h3>

      {/* Descripción del podcast */}
      <p className="italic pb-2 break-words">{podcastFound.summary}</p>
    </section>
  );
};

export default InfoPodcast;
