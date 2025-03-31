import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function Home() {
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    // Simulación de obtención del rol desde el localStorage o una API
    const storedRole = localStorage.getItem("userRole") || "administrador"; // Cambiar según el usuario
    setUserRole(storedRole);
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card" style={{ width: "20rem", height: "27rem" }}>
        <div className="card-body">
          <div className="d-grid gap-2 col-6 mx-auto" style={{ width: "15rem", height: "25rem" }}>
            {/* Botón visible para todos los roles */}
            <Link to="/Vehiculos" className="btn btn-primary fs-3 text-wrap d-flex align-items-center justify-content-center">
              Registro de vehículos
            </Link>

            <Link to="/Cajas" className="btn btn-primary fs-3 text-wrap d-flex align-items-center justify-content-center">
              Registro de cajas
            </Link>

            {/* Botón visible solo para administradores */}
            {userRole === "administrador" && (
              <Link to="/Usuarios" className="btn btn-success fs-3 text-wrap d-flex align-items-center justify-content-center">
                Registro de usuarios
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

  