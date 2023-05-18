import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { Loading } from "../../../contexts/Loading";
import Header from "../Header";

describe("Header component", () => {
  test("renders the title correctly", () => {
    // Renderiza el componente Header dentro del contexto de carga
    render(
      <Loading.Provider value={{ loading: false }}>
        <Router>
          <Header />
        </Router>
      </Loading.Provider>
    );

    // Verifica que el título se muestre correctamente
    const title = screen.getByText("Podcaster");
    expect(title).toBeInTheDocument();
    expect(title.tagName).toBe("A");
    expect(title.getAttribute("href")).toBe("/");
  });
});
