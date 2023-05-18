import fetchEpisodes from "../episodes";

describe("fetchEpisodes", () => {
  it("handles error when fetching episodes", async () => {
    const mockPodcastId = "123456";
    const mockError = new Error("Failed to fetch episodes");
    jest.spyOn(global, "fetch").mockRejectedValue(mockError);

    const episodes = await fetchEpisodes(mockPodcastId);

    expect(global.fetch).toHaveBeenCalledWith(
      "https://itunes.apple.com/lookup?id=123456&media=podcast&entity=podcastEpisode&limit=100"
    );
    expect(episodes).toStrictEqual([]);

    global.fetch.mockRestore();
  });
});
