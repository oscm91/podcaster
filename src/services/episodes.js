const fetchEpisodes = (podcastId) => {
  // Realiza una solicitud fetch a la API de iTunes utilizando la URL con el podcastId proporcionado
  return fetch(
    `https://itunes.apple.com/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=100`
  )
    .then((response) => response.json()) // Convierte la respuesta en formato JSON
    .then((data) => {
      const podcastInfo = data?.results; // Obtiene la información del podcast de los datos
      const dataClean = podcastInfo.map((episode) => {
        // Mapea y transforma los datos de cada episodio
        const {
          collectionId: podcastId,
          trackName: name,
          description,
          releaseDate: date,
          trackTimeMillis: duration,
          previewUrl: track,
          trackId: id,
        } = episode;

        return {
          podcastId,
          name,
          description,
          date,
          duration,
          track,
          id: id.toString(),
        };
      });

      dataClean.shift(); // Elimina el primer elemento del arreglo (información general del podcast)
      return dataClean; // Devuelve los datos transformados
    })
    .catch((error) => {
      console.error("Error fetching podcast episodes:", error); // Maneja el error en caso de que ocurra
      return Promise.resolve([]);
    });
};

export default fetchEpisodes;
