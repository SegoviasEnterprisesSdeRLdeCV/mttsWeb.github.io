import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function Vehiculos({ userRole }) {
    const [vehiculos, setVehiculos] = useState([]);
    const [editando, setEditando] = useState(null);
    const [vehiculoEditado, setVehiculoEditado] = useState({});

    useEffect(() => {
        fetchVehiculos();
    }, []);

    const fetchVehiculos = () => {
        fetch("http://localhost:3000/api/vehiculos")
            .then(response => response.json())
            .then(data => setVehiculos(data))
            .catch(error => console.error("Error al obtener vehículos:", error));
    };

    const handleNuevoVehiculo = () => {
        const nuevoVehiculo = {
            numero_economico_v: "000",
            marca: "Desconocida",
            numero_serie: "N/A",
            placas: "N/A",
            anio: 2000,
            kilometraje_actual: 0,
            cambio_aceite: 0,
            estado: "inactivo"
        };

        fetch("http://localhost:3000/api/vehiculos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nuevoVehiculo)
        })
        .then(response => response.json())
        .then(() => fetchVehiculos())
        .catch(error => console.error("Error al agregar vehículo:", error));
    };

    const handleEditarVehiculo = (id) => {
        setEditando(id);
        setVehiculoEditado(vehiculos.find(vehiculo => vehiculo.id === id) || {});
    };

    const handleEliminarVehiculo = (id) => {
        fetch(`http://localhost:3000/api/vehiculos/${id}`, {
            method: "DELETE",
        })
        .then(() => fetchVehiculos())
        .catch(error => console.error("Error al eliminar vehículo:", error));
    };

    const handleGuardarCambios = (id) => {
        fetch(`http://localhost:3000/api/vehiculos/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(vehiculoEditado)
        })
        .then(() => {
            setEditando(null);
            fetchVehiculos();
        })
        .catch(error => console.error("Error al guardar cambios:", error));
    };

    const handleChange = (e, campo) => {
        setVehiculoEditado(prev => ({ ...prev, [campo]: e.target.value }));
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
                    <button className="btn btn-warning" onClick={handleNuevoVehiculo}>Nuevo</button>
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
                                        <th>Km Actual</th>
                                        <th>Próximo Cambio de Aceite</th>
                                        <th>Estado</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {vehiculos.map((vehiculo) => (
                                        <tr key={vehiculo.id}>
                                        <td>
                                            {editando === vehiculo.id && userRole === "administrador" ? 
                                                <input type="text" value={vehiculoEditado.numero_economico_v || ""} onChange={(e) => handleChange(e, "numero_economico_v")} />
                                                : vehiculo.numero_economico_v}
                                        </td>
                                        <td>
                                            {editando === vehiculo.id && userRole === "administrador" ? 
                                                <input type="text" value={vehiculoEditado.marca || ""} onChange={(e) => handleChange(e, "marca")} />
                                                : vehiculo.marca}
                                        </td>
                                        <td>
                                            {editando === vehiculo.id && userRole === "administrador" ? 
                                                <input type="text" value={vehiculoEditado.numero_serie || ""} onChange={(e) => handleChange(e, "numero_serie")} />
                                                : vehiculo.numero_serie}
                                        </td>
                                        <td>
                                            {editando === vehiculo.id && userRole === "administrador" ? 
                                                <input type="text" value={vehiculoEditado.placas || ""} onChange={(e) => handleChange(e, "placas")} />
                                                : vehiculo.placas}
                                        </td>
                                        <td>
                                            {editando === vehiculo.id && userRole === "administrador" ? 
                                                <input type="text" value={vehiculoEditado.anio || ""} onChange={(e) => handleChange(e, "anio")} />
                                                : vehiculo.anio}
                                        </td>
                                        <td>
                                            {(editando === vehiculo.id && (userRole === "administrador" || userRole === "capturista")) ? 
                                                <input type="text" value={vehiculoEditado.kilometraje_actual || ""} onChange={(e) => handleChange(e, "kilometraje_actual")} />
                                                : vehiculo.kilometraje_actual}
                                        </td>
                                        <td>
                                            {(editando === vehiculo.id && (userRole === "administrador" || userRole === "capturista")) ? 
                                                <input type="text" value={vehiculoEditado.cambio_aceite || ""} onChange={(e) => handleChange(e, "cambio_aceite")} />
                                                : vehiculo.cambio_aceite}
                                        </td>
                                        <td>{(editando === vehiculo.id && (userRole === "administrador" || userRole === "capturista"))?
                                                <input type="text" value={vehiculoEditado.estado || ""} onChange={(e) => handleChange(e, "estado")} />
                                                : vehiculo.estado}
                                        </td>
                                        <td>
                                            {userRole !== "operaciones" && (
                                                <>
                                                    {editando === vehiculo.id ? (
                                                        <button className="btn btn-success btn-sm me-2" onClick={() => handleGuardarCambios(vehiculo.id)}>Guardar</button>
                                                    ) : (
                                                        <button className="btn btn-warning btn-sm me-2" onClick={() => handleEditarVehiculo(vehiculo.id)}>Editar</button>
                                                    )}
                                                    {userRole === "administrador" && (
                                                        <button className="btn btn-danger btn-sm" onClick={() => handleEliminarVehiculo(vehiculo.id)}>Eliminar</button>
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

export default Vehiculos;
