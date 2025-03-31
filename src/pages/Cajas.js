import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function Home({ userRole }) {
  const [cajas, setCajas] = useState([]);
  const [editando, setEditando] = useState(null);
  const [cajaEditado, setCajaEditado] = useState({});

  useEffect(() => {
      fetchCajas();
  }, []);

  const fetchCajas = () => {
      fetch("http://localhost:3000/api/cajas")
          .then(response => response.json())
          .then(data => setCajas(data))
          .catch(error => console.error("Error al obtener cajas:", error));
  };

  const handleNuevoCaja = () => {
      const nuevoCaja = {
          numero_economico_c: "000",
          marca: "Desconocida",
          numero_serie: "N/A",
          placas: "N/A",
          anio: 2000,
          estado: "inactivo"
      };

      fetch("http://localhost:3000/api/cajas", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(nuevoCaja)
      })
      .then(response => response.json())
      .then(() => fetchCajas())
      .catch(error => console.error("Error al agregar caja:", error));
  };

  const handleEditarCaja = (id) => {
      setEditando(id);
      setCajaEditado(cajas.find(caja => caja.id === id) || {});
  };

  const handleEliminarCaja = (id) => {
      fetch(`http://localhost:3000/api/cajas/${id}`, {
          method: "DELETE",
      })
      .then(() => fetchCajas())
      .catch(error => console.error("Error al eliminar caja:", error));
  };

  const handleGuardarCambios = (id) => {
      fetch(`http://localhost:3000/api/cajas/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(cajaEditado)
      })
      .then(() => {
          setEditando(null);
          fetchCajas();
      })
      .catch(error => console.error("Error al guardar cambios:", error));
  };

  const handleChange = (e, campo) => {
      setCajaEditado(prev => ({ ...prev, [campo]: e.target.value }));
  };

    return (
      <div className="container my-3">
          <div className="d-flex justify-content-end mb-3">
              <div className="btn-group">
                  <div className="btn-group">
                      <button className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown">Reporte</button>
                      <ul className="dropdown-menu">
                          <li><Link className="dropdown-item" to="/reportes">Ver</Link></li>
                          {(userRole !== "operaciones") && (
                              <li><Link className="dropdown-item" to="/reportes/nuevo">Nuevo</Link></li>
                          )}
                      </ul>
                  </div>
                  <div className="btn-group">
                      <button className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown">Inspección</button>
                      <ul className="dropdown-menu">
                          <li><Link className="dropdown-item" to="/inspecciones">Ver</Link></li>
                          {(userRole !== "operaciones") && (
                              <li><Link className="dropdown-item" to="/inspecciones/nuevo">Nuevo</Link></li>
                          )}
                      </ul>
                  </div>
                  <div className="btn-group">
                      <button className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown">Mantenimiento</button>
                      <ul className="dropdown-menu">
                          <li><Link className="dropdown-item" to="/mantenimientos">Ver</Link></li>
                          {(userRole !== "operaciones") && (
                              <li><Link className="dropdown-item" to="/mantenimientos/nuevo">Nuevo</Link></li>
                          )}
                      </ul>
                  </div>
              </div>
      </div>


      <div className="col-2">
          {userRole === "administrador" && (
              <div className="btn-group mb-3" role="group">
                  <button className="btn btn-warning" onClick={handleNuevoCaja}>Nuevo</button>
              </div>
          )}
      </div>

      <div className="row mb-3">
              <div className="container mb-5">
                  <div className="card">
                      <div className="card-body">
                          <table className="table">
                              <thead>
                                  <tr>
                                      <th>N. Económico</th>
                                      <th>Marca</th>
                                      <th>N. de serie</th>
                                      <th>Placas</th>
                                      <th>Año</th>
                                      <th>Estado</th>
                                      <th></th>
                                  </tr>
                              </thead>
                              <tbody>
                                  {cajas.map((caja) => (
                                      <tr key={caja.id}>
                                      <td>
                                          {editando === caja.id && userRole === "administrador" ? 
                                              <input type="text" value={cajaEditado.numero_economico_c || ""} onChange={(e) => handleChange(e, "numero_economico_c")} />
                                              : caja.numero_economico_c}
                                      </td>
                                      <td>
                                          {editando === caja.id && userRole === "administrador" ? 
                                              <input type="text" value={cajaEditado.marca || ""} onChange={(e) => handleChange(e, "marca")} />
                                              : caja.marca}
                                      </td>
                                      <td>
                                          {editando === caja.id && userRole === "administrador" ? 
                                              <input type="text" value={cajaEditado.numero_serie || ""} onChange={(e) => handleChange(e, "numero_serie")} />
                                              : caja.numero_serie}
                                      </td>
                                      <td>
                                          {editando === caja.id && userRole === "administrador" ? 
                                              <input type="text" value={cajaEditado.placas || ""} onChange={(e) => handleChange(e, "placas")} />
                                              : caja.placas}
                                      </td>
                                      <td>
                                          {editando === caja.id && userRole === "administrador" ? 
                                              <input type="text" value={cajaEditado.anio || ""} onChange={(e) => handleChange(e, "anio")} />
                                              : caja.anio}
                                      </td>
                                      <td>{(editando === caja.id && (userRole === "administrador" || userRole === "capturista"))?
                                              <input type="text" value={cajaEditado.estado || ""} onChange={(e) => handleChange(e, "estado")} />
                                              : caja.estado}
                                      </td>
                                      <td>
                                          {userRole !== "operaciones" && (
                                              <>
                                                  {editando === caja.id ? (
                                                      <button className="btn btn-success btn-sm me-2" onClick={() => handleGuardarCambios(caja.id)}>Guardar</button>
                                                  ) : (
                                                      <button className="btn btn-warning btn-sm me-2" onClick={() => handleEditarCaja(caja.id)}>Editar</button>
                                                  )}
                                                  {userRole === "administrador" && (
                                                      <button className="btn btn-danger btn-sm" onClick={() => handleEliminarCaja(caja.id)}>Eliminar</button>
                                                  )}
                                              </>
                                          )}
                                      </td>
                                  </tr>
                                  ))}
                              </tbody>
                          </table>
                      </div>
                  </div>
              </div>

          </div>
      </div>
  );

  }
  
  export default Home;
  