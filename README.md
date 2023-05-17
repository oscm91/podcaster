# Podcaster

Podcaster es una aplicación de React que permite a los usuarios escuchar los 100 podcasts más populares según el listado de Apple. La aplicación cuenta con tres vistas principales: la vista principal, los detalles de un podcast y los detalles de un episodio de un podcast.

## Características

- Muestra el listado de los 100 podcasts más populares.
- Filtrado de podcasts por título y autor.
- Detalles de un podcast específico y sus episodios.
- Detalles de un episodio específico con un reproductor de audio incorporado.
- Almacenamiento en el cliente para evitar solicitudes repetidas.

## Tecnologías utilizadas

- React
- React Router
- Sass
- Jest (para pruebas)

## Instalación

Para instalar y ejecutar esta aplicación, necesitarás [Node.js](https://nodejs.org/en/download/) (que viene con [npm](http://npmjs.com)) instalado en tu computadora. Desde tu línea de comandos:

```bash
# Clona este repositorio
$ git clone https://github.com/oscm91/podcaster

# Entra en el repositorio
$ cd podcaster

# Instala las dependencias
$ npm install

# Ejecuta la aplicación en modo de desarrollo
$ npm start
```

Abre [http://localhost:3000](http://localhost:3000) para verla en el navegador. La página se recargará si haces modificaciones. También verás cualquier error lint en la consola.