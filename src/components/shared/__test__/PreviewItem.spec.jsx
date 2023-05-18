import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import PreviewItem from "../PreviewItem";

describe("PreviewItem component", () => {
  test("renders the podcast information correctly", () => {
    const podcast = {
      image: "podcast.jpg",
      title: "Podcast Title - Episode 1",
      author: "Podcast Author",
    };

    // Renderiza el componente PreviewItem
    render(<PreviewItem podcast={podcast} />);

    // Verifica que la imagen, el título principal y el autor se muestren correctamente
    const image = screen.findByAltText(
      `${podcast.title} cover by ${podcast.author}`
    );
    expect(image).toBeTruthy();

    const mainTitle = screen.getByText("Podcast Title");
    expect(mainTitle).toBeInTheDocument();

    const author = screen.getByText(`Author: ${podcast.author}`);
    expect(author).toBeInTheDocument();
  });
});
