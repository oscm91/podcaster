import { render, screen, waitFor } from "@testing-library/react";
import { Loading } from "../../../contexts/Loading";
import Home from "../Home";
import ls from "../../../utils/storage";

// Mock del módulo 'storage.js' para simular el comportamiento de 'ls.get' y 'ls.set'
jest.mock("../../../utils/storage", () => ({
  get: jest.fn(),
  set: jest.fn(),
}));

describe("Home component", () => {
  test("does not render filter and results list when loading is true", () => {
    // Renderiza el componente Home con loading establecido en true
    render(
      <Loading.Provider value={{ loading: true, setLoading: jest.fn() }}>
        <Home popularPodcasts={[]} />
      </Loading.Provider>
    );

    // Verifica que no se muestre el filtro ni la lista de resultados
    const filterInput = screen.queryByLabelText("Filter");
    const resultsList = screen.queryByRole("list");

    expect(filterInput).toBeFalsy();
    expect(resultsList).toBeFalsy();
  });
});
