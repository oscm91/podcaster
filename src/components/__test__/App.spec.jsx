import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../App";
import fetchPopular from "../../services/popular";
import fetchEpisodes from "../../services/episodes";

jest.mock("../../services/popular");
jest.mock("../../services/episodes");

const localStorageMock = (function () {
  let store = {};

  return {
    getItem(key) {
      return store[key];
    },

    setItem(key, value) {
      store[key] = value;
    },

    clear() {
      store = {};
    },

    removeItem(key) {
      delete store[key];
    },

    getAll() {
      return store;
    },
  };
})();

Object.defineProperty(window, "localStorage", { value: localStorageMock });

describe("App", () => {
  beforeEach(() => {
    fetchPopular.mockClear();
    fetchEpisodes.mockClear();
  });

  test("renders Home page", async () => {
    fetchPopular.mockResolvedValue([
      {
        id: "123456",
        image: "https://example.com/podcast1.jpg",
        title: "Podcast 1",
        author: "Author 1",
        summary: "This is podcast 1",
      },
      // Additional podcasts...
    ]);

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    // Verifica que se llame a la función fetchPopular
    expect(fetchPopular).toHaveBeenCalled();

    // Espera a que se complete la carga de podcasts populares
    await waitFor(() => {
      expect(screen.getByText("Podcaster")).toBeInTheDocument();
    });
  });

  test("renders PodcastDetails page", async () => {
    const podcastId = "abc123";
    const episodes = [
      {
        id: "1",
        title: "Episode 1",
        description: "This is episode 1",
        duration: 1000,
        published: "2021-01-01",
        url: "https://example.com/episode1.mp3",
        image: "https://example.com/episode1.jpg",
        podcastId: "abc123",
      },
      {
        id: "2",
        title: "Episode 2",
        description: "This is episode 2",
        duration: 1000,
        published: "2021-01-01",
        url: "https://example.com/episode2.mp3",
        image: "https://example.com/episode2.jpg",
        podcastId: "abc123",
      },
    ];
    fetchEpisodes.mockResolvedValue(episodes);

    localStorage.setItem(
      "popularPodcastLs",
      JSON.stringify([
        {
          id: "abc123",
          image: "https://example.com/episode1.jpg",
          title: "The episode Example",
          author: "The episode Example",
          summary: "Lorem Ipsum",
        },
        {
          id: "abc456",
          image: "https://example.com/episode2.jpg",
          title: "Million Dollaz Worth Of Game",
          author: "Barstool Sports",
          summary: "Lorem Ipsum",
        },
      ])
    );

    render(
      <MemoryRouter initialEntries={[`/podcast/${podcastId}`]}>
        <App />
      </MemoryRouter>
    );

    await waitFor(() => {
      // Verifica que se llame a la función fetchEpisodes con el ID del podcast
      expect(fetchEpisodes).toHaveBeenCalledWith(podcastId);
    });

    // Espera a que se complete la carga de episodios
    await waitFor(() => {
      expect(screen.getByText("The episode Example")).toBeInTheDocument();
    });
  });
});
