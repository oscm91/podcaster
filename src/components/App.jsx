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
  const [popularPodcasts, setPopularPodcasts] = useState(
      ls.get("popularPodcastLs", [])
  );

  const [loading, setLoading] = useState(true);

  const loadingUpdate = (bool) => {
    setLoading(bool);
  };

  //Fetch popular podcasts.

  useEffect(() => {
    if (popularPodcasts.length === 0) {
      getPopularPodcasts().then((data) => {
        setPopularPodcasts(data);
        ls.set("popularPodcastLs", data);
      });
    }
  }, [popularPodcasts]);

  const { pathname } = useLocation();
  const podcastDataPath = matchPath("/podcast/:podcastId", pathname);

  //Get podcastFound

  const podcastId =
      podcastDataPath !== null ? podcastDataPath.params.podcastId : null;

  const podcastFound = popularPodcasts.find(
      (podcast) => podcast.id === podcastId
  );

  if (podcastFound) {
    ls.set("podcastFound", podcastFound);
  }

  const [episodes, setEpisodes] = useState([]);
  //Get episodeFound

  const episodeDataPath = matchPath(
      "/podcast/:podcastId/episode/:episodeId",
      pathname
  );

  const episodeId =
      episodeDataPath !== null ? episodeDataPath.params.episodeId : null;

  const episodeFound =
      episodes.length > 0
          ? episodes.find((episode) => episode.id === episodeId)
          : null;

  if (episodeFound) {
    ls.set("episodeFound", episodeFound);
  }

  //Fetch podcast episodes.

  useEffect(() => {
    if (podcastId) {
      fetchEpisodes(podcastId).then((data) => {
        setEpisodes(data);
        ls.set("podcastEpisodesLs", data);
      });
    }
  }, [podcastId]);

  return (
      <Loading.Provider
          value={{ loading: loading, setLoading: setLoading }}
      >
        <div className="globalContainer">
          <Header />
          <Routes>
            <Route
                path="/podcaster/"
                element={<Home popularPodcasts={popularPodcasts} />}
            />
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