import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import InfoPodcast from "../InfoPodcast";

describe("InfoPodcast component", () => {
  test("renders the podcast information correctly", () => {
    const podcast = {
      id: "123",
      title: "Podcast Title",
      author: "Podcast Author",
      image: "podcast.jpg",
      summary: "Podcast summary",
    };

    // Renderiza el componente InfoPodcast dentro de Router
    render(
      <Router>
        <InfoPodcast podcastFound={podcast} />
      </Router>
    );

    // Verifica que la imagen, el título y la descripción se muestren correctamente
    const image = screen.getByAltText(
      `Cover of ${podcast.title} by ${podcast.author}`
    );
    expect(image).toBeInTheDocument();
    expect(image.getAttribute("src")).toBe(podcast.image);

    const titleLink = screen.getByText(podcast.title);
    expect(titleLink).toBeInTheDocument();
    expect(titleLink.tagName).toBe("H2");

    const author = screen.getByText(`by ${podcast.author}`);
    expect(author).toBeInTheDocument();

    const descriptionTitle = screen.getByText("Description:");
    expect(descriptionTitle).toBeInTheDocument();

    const description = screen.getByText(podcast.summary);
    expect(description).toBeInTheDocument();
  });

  test("does not render anything when podcastFound is null", () => {
    // Renderiza el componente InfoPodcast con podcastFound establecido en null
    render(<InfoPodcast podcastFound={null} />);

    // Verifica que no se muestre ningún contenido
    const infoPodcast = screen.queryByRole("section");
    expect(infoPodcast).toBeNull();
  });
});
