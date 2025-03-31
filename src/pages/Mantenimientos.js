import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function Mantenimientos() {
  const [folio, setFolio] = useState("");
  const [fechaIngreso, setFechaIngreso] = useState("");
  const [fechaSalida, setFechaSalida] = useState("");
  const [unidad, setUnidad] = useState("");
  const [km, setKm] = useState("");
  const [operador, setOperador] = useState("");
  const [mantenimiento, setMantenimiento] = useState("");
  const [trabajos, setTrabajos] = useState([
    { id: 1, trabajo: "", refacciones: "", observaciones: "" },
    { id: 2, trabajo: "", refacciones: "", observaciones: "" },
    { id: 3, trabajo: "", refacciones: "", observaciones: "" },
  ]);

  const handleTrabajoChange = (index, field, value) => {
    const updatedTrabajos = [...trabajos];
    updatedTrabajos[index][field] = value;
    setTrabajos(updatedTrabajos);
  };

  return (
    <div>
      <div className="mb-3">
        <label htmlFor="folio" className="form-label">
          <h1>Folio:</h1>
        </label>
        <input
          type="text"
          className="form-control align-items-center"
          id="folio"
          placeholder="Ejemplo: 12345"
          value={folio}
          onChange={(e) => setFolio(e.target.value)}
        />
      </div>
      <div className="container text-center">
        <div className="row align-items-center">
          <div className="col">
            <div className="mb-3">
              <label htmlFor="fechaIngreso" className="form-label">
                Fecha de ingreso
              </label>
              <input
                type="date"
                className="form-control"
                id="fechaIngreso"
                value={fechaIngreso}
                onChange={(e) => setFechaIngreso(e.target.value)}
              />
            </div>
          </div>
          <div className="col">
            <div className="mb-3">
              <label htmlFor="fechaSalida" className="form-label">
                Fecha de salida
              </label>
              <input
                type="date"
                className="form-control"
                id="fechaSalida"
                value={fechaSalida}
                onChange={(e) => setFechaSalida(e.target.value)}
              />
            </div>
          </div>
          <div className="col">
            <div className="mb-3">
              <label htmlFor="unidad" className="form-label">
                Unidad
              </label>
              <input
                type="text"
                className="form-control"
                id="unidad"
                placeholder="Número económico"
                value={unidad}
                onChange={(e) => setUnidad(e.target.value)}
              />
            </div>
          </div>
          <div className="col">
            <div className="mb-3">
              <label htmlFor="km" className="form-label">
                Km
              </label>
              <input
                type="text"
                className="form-control"
                id="km"
                placeholder="Km actuales"
                value={km}
                onChange={(e) => setKm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="container text-center">
        <div className="row align-items-center">
          <div className="col">
            <div className="mb-3">
              <label htmlFor="operador" className="form-label">
                Operador
              </label>
              <input
                type="text"
                className="form-control"
                id="operador"
                placeholder="Nombre del operador"
                value={operador}
                onChange={(e) => setOperador(e.target.value)}
              />
            </div>
          </div>
          <div className="col">
            <div className="mb-3">
              <label htmlFor="mantenimiento" className="form-label">
                Mantenimiento
              </label>
              <input
                type="text"
                className="form-control"
                id="mantenimiento"
                placeholder="Encargado de mantenimiento"
                value={mantenimiento}
                onChange={(e) => setMantenimiento(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Trabajo de mantenimiento realizados</th>
                <th scope="col">Refacciones</th>
                <th scope="col">Observaciones</th>
              </tr>
            </thead>
            <tbody>
              {trabajos.map((trabajo, index) => (
                <tr key={trabajo.id}>
                  <th scope="row">{trabajo.id}</th>
                  <td>
                    <textarea
                      className="form-control"
                      rows="3"
                      value={trabajo.trabajo}
                      onChange={(e) =>
                        handleTrabajoChange(index, "trabajo", e.target.value)
                      }
                    ></textarea>
                  </td>
                  <td>
                    <textarea
                      className="form-control"
                      rows="3"
                      value={trabajo.refacciones}
                      onChange={(e) =>
                        handleTrabajoChange(index, "refacciones", e.target.value)
                      }
                    ></textarea>
                  </td>
                  <td>
                    <textarea
                      className="form-control"
                      rows="3"
                      value={trabajo.observaciones}
                      onChange={(e) =>
                        handleTrabajoChange(index, "observaciones", e.target.value)
                      }
                    ></textarea>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <br />
      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
        <button className="btn btn-primary me-md-2" type="button">
          Editar
        </button>
        <button className="btn btn-primary" type="button">
          Eliminar
        </button>
        <button className="btn btn-primary" type="button">
          Guardar
        </button>
      </div>
    </div>
  );
}

export default Mantenimientos;