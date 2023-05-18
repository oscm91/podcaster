import { render, screen, waitFor } from "@testing-library/react";
import { Loading } from "../../../contexts/Loading";
import EpisodeDetails from "../EpisodeDetails";
import ls from "../../../utils/storage";

// Mock del módulo 'storage.js' para simular el comportamiento de 'ls.get'
jest.mock("../../../utils/storage", () => ({
  get: jest.fn(),
}));

describe("EpisodeDetails component", () => {
  test("does not render episode details and podcast info when loading is true", () => {
    // Renderiza el componente EpisodeDetails con loading establecido en true
    render(
      <Loading.Provider value={{ loading: true, setLoading: jest.fn() }}>
        <EpisodeDetails episodeFound={null} />
      </Loading.Provider>
    );

    // Verifica que no se muestre ninguna información de podcast o detalles de episodio
    const podcastTitle = screen.queryByText("Podcast Title");
    const podcastAuthor = screen.queryByText("Podcast Author");
    const episodeName = screen.queryByText("Episode 1");
    const episodeDescription = screen.queryByText("This is episode 1");
    const audioElement = screen.queryByTitle("Episode 1 audio track");

    expect(podcastTitle).toBeFalsy();
    expect(podcastAuthor).toBeFalsy();
    expect(episodeName).toBeFalsy();
    expect(episodeDescription).toBeFalsy();
    expect(audioElement).toBeFalsy();
  });
});
