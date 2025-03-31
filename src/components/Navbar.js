import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./Navbar.css";

function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault(); // Evita que el formulario recargue la página
    if (searchTerm.trim() !== "") {
      navigate(`/buscar/${searchTerm}`);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/home">Seguimiento de mantenimientos</Link>

        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
          {/* Formulario de búsqueda */}
          <form className="d-flex" role="search" onSubmit={handleSearch}>
            <input 
              className="form-control me-2" 
              type="search" 
              placeholder="Número económico..." 
              aria-label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn btn-secondary" type="submit">Buscar</button>
          </form>

          {/* Menú de usuario */}
          <div className="btn-group dropstart">
            <button 
              type="button" 
              className="btn btn-secondary dropdown-toggle" 
              data-bs-toggle="dropdown" 
              aria-expanded="false">
              <img 
                src="../img/usuario.jpg" 
                className="rounded float-end" 
                width="25px" 
                height="25px" 
                alt="" 
              />
            </button>
        
            <ul className="dropdown-menu">
              <li><Link className="dropdown-item" to="/perfil">Nombre de usuario</Link></li>
              <li><hr className="dropdown-divider" /></li>
              <li><Link className="dropdown-item" to="/">Cerrar sesión</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

