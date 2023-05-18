import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import Track from "../Track";

describe("Track component", () => {
  test("renders episode information correctly", () => {
    const episode = {
      name: "Episode 1",
      description: "This is the first episode",
      track: "audio.mp3",
    };

    render(<Track episodeFound={episode} />);

    const episodeName = screen.getByText("Episode 1");
    const episodeDescription = screen.getByText("This is the first episode");
    const audioElement = screen.getByTitle("Episode 1 audio track");

    expect(episodeName).toBeInTheDocument();
    expect(episodeDescription).toBeInTheDocument();
    expect(audioElement).toBeInTheDocument();
    expect(audioElement.src).toBe("http://localhost/audio.mp3");
    expect(audioElement.type).toBe("audio/mpeg");
  });
});
