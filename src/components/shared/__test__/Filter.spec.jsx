import "@testing-library/jest-dom/extend-expect";
import { render, screen, fireEvent } from "@testing-library/react";
import Filter from "../Filter";

describe("Filter component", () => {
  test("renders the input field and displays the filtered podcast count", () => {
    // Mock del valor de filter y filteredPodcastLength
    const filter = "keyword";
    const filteredPodcastLength = 10;

    // Renderiza el componente Filter
    render(
      <Filter
        filterUpdater={jest.fn()}
        filter={filter}
        filteredPodcastLength={filteredPodcastLength}
      />
    );

    // Verifica que el campo de entrada y el contador de resultados se muestren correctamente
    const inputField = screen.getByPlaceholderText("Filter podcasts...");
    const filteredCount = screen.getByText("10");

    expect(inputField).toBeInTheDocument();
    expect(filteredCount).toBeInTheDocument();
    expect(inputField).toHaveValue("keyword");
  });

  test("calls filterUpdater function on input change", () => {
    // Mock de la función filterUpdater
    const filterUpdater = jest.fn();

    // Renderiza el componente Filter
    render(
      <Filter
        filterUpdater={filterUpdater}
        filter=""
        filteredPodcastLength={0}
      />
    );

    // Simula el cambio en el campo de entrada
    const inputField = screen.getByPlaceholderText("Filter podcasts...");
    fireEvent.change(inputField, { target: { value: "keyword" } });

    // Verifica que la función filterUpdater se haya llamado con el valor correcto
    expect(filterUpdater).toHaveBeenCalledTimes(1);
    expect(filterUpdater).toHaveBeenCalledWith("keyword");
  });
});
