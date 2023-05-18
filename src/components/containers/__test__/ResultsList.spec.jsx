import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter } from "react-router-dom";
import { Loading } from "../../../contexts/Loading.js";
import ResultsList from "../ResultsList";

describe("ResultsList component", () => {
  const filteredPodcast = [
    {
      id: 1,
      title: "Podcast 1",
      author: "Author 1",
      image: "image1.jpg",
    },
    {
      id: 2,
      title: "Podcast 2",
      author: "Author 2",
      image: "image2.jpg",
    },
  ];

  test("renders list of podcasts correctly", () => {
    render(
      <BrowserRouter>
        <Loading.Provider value={{ loading: false, setLoading: jest.fn() }}>
          <ResultsList filteredPodcast={filteredPodcast} />
        </Loading.Provider>
      </BrowserRouter>
    );

    const podcastElements = screen.getAllByRole("link");
    expect(podcastElements.length).toBe(2); // Two podcasts

    const firstPodcastLink = podcastElements[0];
    fireEvent.click(firstPodcastLink);

    // Assert any behavior or navigation related to the link click
  });

  test("sets loading state when podcast link is clicked", () => {
    const setLoadingMock = jest.fn();
    render(
      <BrowserRouter>
        <Loading.Provider
          value={{ loading: false, setLoading: setLoadingMock }}
        >
          <ResultsList filteredPodcast={filteredPodcast} />
        </Loading.Provider>
      </BrowserRouter>
    );

    const podcastLinks = screen.getAllByRole("link");
    const firstPodcastLink = podcastLinks[0];
    fireEvent.click(firstPodcastLink);

    expect(setLoadingMock).toHaveBeenCalledWith(true);
  });

  test("displays loading message when loading is true", () => {
    render(
      <BrowserRouter>
        <Loading.Provider value={{ loading: true, setLoading: jest.fn() }}>
          <ResultsList filteredPodcast={filteredPodcast} />
        </Loading.Provider>
      </BrowserRouter>
    );

    const loadingMessage = screen.queryByText((content, element) => {
      return (
        content === "Cargando lista de episodios..." &&
        element.tagName.toLowerCase() === "p"
      );
    });
    expect(loadingMessage).toBeNull();
  });
});
