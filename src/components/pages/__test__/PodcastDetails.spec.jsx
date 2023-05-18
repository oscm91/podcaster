import { render, screen, waitFor } from "@testing-library/react";
import { Loading } from "../../../contexts/Loading";
import PodcastDetails from "../PodcastDetails";

describe("PodcastDetails component", () => {
  test("does not render podcast info and episodes list when loading is true", () => {
    // Renderiza el componente PodcastDetails con loading establecido en true
    render(
      <Loading.Provider value={{ loading: true, setLoading: jest.fn() }}>
        <PodcastDetails podcastFound={null} episodes={[]} />
      </Loading.Provider>
    );

    // Verifica que no se muestre la información del podcast ni la lista de episodios
    const podcastTitle = screen.queryByText("Podcast Title");
    const podcastAuthor = screen.queryByText("Podcast Author");
    const episode1 = screen.queryByText("Episode 1");
    const episode2 = screen.queryByText("Episode 2");

    expect(podcastTitle).toBeFalsy();
    expect(podcastAuthor).toBeFalsy();
    expect(episode1).toBeFalsy();
    expect(episode2).toBeFalsy();
  });
});
