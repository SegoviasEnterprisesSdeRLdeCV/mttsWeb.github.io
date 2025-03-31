import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Perfil from "./pages/Perfil";
import Vehiculos from "./pages/Vehiculos";
import Cajas from "./pages/Cajas";
import InspeccionesCajas from "./pages/InspeccionesCajas";
import InspeccionesVehiculos from "./pages/InspeccionesVehiculos";
import Mantenimientos from "./pages/Mantenimientos";
import Usuarios from "./pages/Usuarios";
import Reportes from "./pages/Reportes";
import Navbar from "./components/Navbar";
import BuscarVehiculo from "./components/BuscarVehiculos";
import Login from "./components/Login";

function App() {
  const [usuario, setUsuario] = useState(null);
  const [userRole, setUserRole] = useState(null);

  // Obtener usuario y rol desde localStorage
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuario");
    if (usuarioGuardado) {
      const usuarioParseado = JSON.parse(usuarioGuardado);
      setUsuario(usuarioParseado);
      setUserRole(usuarioParseado.rol); // Asignar el rol del usuario
    }
  }, []);



  return (
    <div>
      {usuario && <Navbar />}
      <Routes>
      <Route path="/" element={<Login onLogin={setUsuario} />} />
        <Route path="/home" element={<Home />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/vehiculos" element={<Vehiculos userRole={userRole} />} />
        <Route path="/cajas" element={<Cajas />} />
        <Route path="/inspeccionescajas" element={<InspeccionesCajas />} />
        <Route path="/inspeccionesvehiculos" element={<InspeccionesVehiculos />} />
        <Route path="/mantenimientos" element={<Mantenimientos />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/reportes" element={<Reportes />} />
        <Route path="/buscar/:numeroEconomico" element={<BuscarVehiculo />} /> 
        <Route path="/usuarios" element={<PrivateRoute usuario={usuario} allowedRole="administrador"> <Usuarios /> </PrivateRoute>}/>
      </Routes>
    </div>
  );
}

// Componente para proteger rutas privadas
const PrivateRoute = ({ usuario, allowedRole, children }) => {
  return usuario && usuario.rol === allowedRole ? children : <Navigate to="/" />;
};

export default App;

