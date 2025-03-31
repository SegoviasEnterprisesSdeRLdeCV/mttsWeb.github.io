import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function BuscarVehiculo() {
    const { numeroEconomico } = useParams();
    const [vehiculos, setVehiculos] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        setError(null);

        fetch(`http://localhost:3000/api/vehiculos/${numeroEconomico}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("No se encontraron vehículos");
                }
                return response.json();
            })
            .then(data => {
                setVehiculos(data);
                console.log('Datos recibidos:', data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, [numeroEconomico]);

    return (
        <div className="col-10">
            <div className="container mb-5">
                <div className="card">
                    <div className="card-body">
                        {loading ? (
                            <p className="text-center">Cargando...</p>
                        ) : error ? (
                            <p className="text-danger text-center">{error}</p>
                        ) : vehiculos.length === 0 ? (
                            <p className="text-center">No se encontraron vehículos</p>
                        ) : (
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
                                        <th> </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {vehiculos.map((vehiculo) => (
                                        <tr key={vehiculo.id}>
                                            <td>{vehiculo.numero_economico_v}</td>
                                            <td>{vehiculo.marca}</td>
                                            <td>{vehiculo.numero_serie}</td>
                                            <td>{vehiculo.placas}</td>
                                            <td>{vehiculo.anio}</td>
                                            <td>{vehiculo.kilometraje_actual}</td>
                                            <td>{vehiculo.cambio_aceite}</td>
                                            <td>{vehiculo.estado}</td>
                                            <td>
                                            <button type="button" className="btn btn-secondary">Ver</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BuscarVehiculo;
