import { Link } from "react-router-dom";
import { useContext } from "react";
import { Loading } from "../../contexts/Loading";

function Header() {
  // Obtiene el contexto de carga utilizando el hook useContext
  const loadingContext = useContext(Loading);

  return (
    <header className="flex justify-between items-center mb-8 pb-2 border-b border-solid border-main">
      {/* Enlace a la página principal */}
      <Link to="/" className="text-main text-2xl font-bold">
        Podcaster
      </Link>

      {/* Muestra un indicador de carga si loadingContext.loading es verdadero */}
      {loadingContext.loading && (
        <span className="w-10 h-10 inline-block relative">
          <span className="absolute top-0 left-0 w-full h-full bg-main animate-loader"></span>
        </span>
      )}
    </header>
  );
}

export default Header;
