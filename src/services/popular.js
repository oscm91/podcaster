const fecthPopular = () => {
  // Realiza una solicitud fetch a la API de iTunes para obtener los podcasts populares
  return fetch(
    "https://cors-anywhere.herokuapp.com/https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json"
  )
    .then((response) => response.json()) // Convierte la respuesta en formato JSON
    .then((data) => {
      const podcastList = data.feed.entry; // Obtiene la lista de podcasts de los datos
      const dataClean = podcastList.map((podcast) => {
        // Mapea y transforma los datos de cada podcast
        const {
          id: {
            attributes: { "im:id": id },
          },
          "im:image": [, , { label: image }],
          title: { label: title },
          "im:artist": { label: author },
          summary: { label: summary },
        } = podcast;

        return {
          id: id.toString(), // Convierte el id a una cadena
          image,
          title,
          author,
          summary,
        };
      });
      return dataClean; // Devuelve los datos transformados
    })
    .catch((error) => {
      console.error("Error fetching popular podcasts:", error); // Maneja el error en caso de que ocurra
    });
};

export default fecthPopular;
