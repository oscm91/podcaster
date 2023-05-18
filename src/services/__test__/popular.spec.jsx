import fetchPopular from "../popular.js";

describe("fetchPopular", () => {
  it("fetches popular podcasts successfully", async () => {
    const mockResponse = {
      feed: {
        entry: [
          {
            id: {
              attributes: {
                "im:id": "123456",
              },
            },
            "im:image": [
              {},
              {},
              {
                label: "https://example.com/podcast1.jpg",
              },
            ],
            title: {
              label: "Podcast 1",
            },
            "im:artist": {
              label: "Author 1",
            },
            summary: {
              label: "This is podcast 1",
            },
          },
          // Additional podcasts...
        ],
      },
    };
    const mockFetchPromise = Promise.resolve({
      json: () => Promise.resolve(mockResponse),
    });
    jest.spyOn(global, "fetch").mockImplementation(() => mockFetchPromise);

    const { error, data: popularPodcasts } = await fetchPopular();

    expect(global.fetch).toHaveBeenCalledWith(
      "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json"
    );
    expect(error).toBeUndefined();
  });
});
