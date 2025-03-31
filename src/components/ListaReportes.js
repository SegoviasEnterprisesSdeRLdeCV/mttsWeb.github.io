import React, { useEffect, useState } from "react";
import { getReportes } from "../services/api";

const ListaReportes = () => {
    const [reportes, setReportes] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getReportes();
            setReportes(data);
        };
        fetchData();
    }, []);

    return (
        <div>
            <h2>Lista de Reportes</h2>
            <ul>
                {reportes.map((reporte) => (
                    <li key={reporte.id}>{reporte.descripcion}</li>
                ))}
            </ul>
        </div>
    );
};

export default ListaReportes;
