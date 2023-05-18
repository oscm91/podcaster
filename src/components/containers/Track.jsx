import ls from "../../utils/storage.js";

const Track = ({ episodeFound }) => {
  // Obtiene el objeto episode de los props o del almacenamiento local
  const episode = episodeFound || ls.get("episodeFound");

  if(!episode) {
      return null;
  }

  const { name, description, track } = episode;

  return (
    <section className="p-4 mx-5 shadow-md">
      {/* Renderiza el título del episodio */}
      <h2 className="font-bold text-xl pb-4">{name}</h2>

      {/* Renderiza la descripción del episodio */}
      <p className="italic pb-6 text-gray-700">{description}</p>

      <div className="min-w-40vw">
        {/* Renderiza el elemento audio con los controles */}
        <audio className="w-full h-8" controls>
          {/* Renderiza la fuente de audio del episodio */}
          <source
            src={track}
            type="audio/mpeg"
            alt={`${name} audio track`}
            title={`${name} audio track`}
          />
        </audio>
      </div>
    </section>
  );
};

export default Track;
