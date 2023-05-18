import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import { Loading } from "../../../contexts/Loading.js";
import EpisodesList from '../EpisodesList';

describe('EpisodesList component', () => {
  const episodes = [
    {
      id: 1,
      name: 'Episode 1',
      date: '2023-05-01',
      duration: 3600,
    },
    {
      id: 2,
      name: 'Episode 2',
      date: '2023-05-02',
      duration: 2700,
    },
  ];

  test('renders episodes list correctly', () => {
    render(
        <BrowserRouter>
          <Loading.Provider value={{ loading: false, setLoading: jest.fn() }}>
            <EpisodesList episodes={episodes} />
          </Loading.Provider>
        </BrowserRouter>
    );

    const titleElement = screen.getByText('Episodes: 2');
    const headerElements = screen.getAllByRole('listitem');
    const episodeElements = screen.getAllByRole('link');

    expect(titleElement).toBeInTheDocument();
    expect(headerElements.length).toBe(9); // Three header columns
    expect(episodeElements.length).toBe(2); // Two episodes

    const firstEpisodeLink = episodeElements[0];
    fireEvent.click(firstEpisodeLink);

    // Assert any behavior or navigation related to the link click
  });

  test('displays loading message when loading is true', () => {
    render(
        <BrowserRouter>
          <Loading.Provider value={{ loading: true, setLoading: jest.fn() }}>
            <EpisodesList episodes={episodes} />
          </Loading.Provider>
        </BrowserRouter>
    );

    const loadingMessage = screen.getByText('Cargando lista de episodios...');
    expect(loadingMessage).toBeInTheDocument();
  });
});
