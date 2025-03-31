import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function Usuarios({ userRole }) {
    const [usuarios, setUsuarios] = useState([]);
    const [editando, setEditando] = useState(null);
    const [usuarioEditado, setUsuarioEditado] = useState({});

   
    useEffect(() => {
            fetchUsuarios();
    }, []); 

    const fetchUsuarios = () => {
        const token = localStorage.getItem("token"); // Recupera el token almacenado
    
        fetch("http://localhost:3000/api/usuarios", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` // Enviar token
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log("Datos recibidos:", data);
            if (Array.isArray(data.data)) {
                setUsuarios(data.data);
            } else {
                console.error("La respuesta no es un array:", data);
                setUsuarios([]);
            }
        })
        .catch(error => {
            console.error("Error al obtener usuarios:", error);
            setUsuarios([]);
        });
    };
    
    
    
    const handleNuevoUsuario = () => {
        const nuevoUsuario = {
            nombre: "Nuevo Usuario",
            contrasena: "123456",
            rol: "capturista"
        };

        fetch("http://localhost:3000/api/usuarios", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(nuevoUsuario)
        })
        .then(response => response.json())
        .then(() => fetchUsuarios())
        .catch(error => console.error("Error al agregar usuario:", error));
    };

    const handleEditarUsuario = (id) => {
            setEditando(id);
            setUsuarioEditado(usuarios.find (usuario => usuario.id === id) || {});
    };

    const handleEliminarUsuario = (id) => {
        fetch(`http://localhost:3000/api/usuarios/${id}`, {
            method: "DELETE",
        })
        .then(() => fetchUsuarios())
        .catch(error => console.error("Error al eliminar usuario:", error));
    };

    const handleGuardarCambios = (id) => {
        fetch(`http://localhost:3000/api/usuarios/${id}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(usuarioEditado)
        })
        .then(() => {
            setEditando(null);
            fetchUsuarios();
        })
        .catch(error => console.error("Error al guardar cambios:", error));
    };

    const handleChange = (e, campo) => {
        setUsuarioEditado(prev => ({ ...prev, [campo]: e.target.value }));
    };

    return (
        <div className="container my-3">
            <div className="col-2">
                <button className="btn btn-warning mb-3" onClick={handleNuevoUsuario}>
                    Nuevo Usuario
                </button>
            </div>
            <div className="row mb-3">
                <div className="container mb-5">
                    <div className="card">
                        <div className="card-body">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nombre</th>
                                        <th>Rol</th>
                                        <th>Contraseña</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {usuarios.map((usuario) => (
                                        <tr key={usuario.id}>
                                            <td>
                                                {editando === usuario.id && userRole === "administrador" ?
                                                    <input type="text" value={usuarioEditado.nombre || ""} onChange={(e) => handleChange(e, "nombre")}/>
                                                        :usuario.nombre}    
                                            </td>
                                            <td>
                                                {editando === usuario.id && userRole === "administrador" ?
                                                    <select type="text" value={usuarioEditado.rol || ""} onChange={(e) => handleChange(e, "rol")}>
                                                        <option value="administrador">Administrador</option>
                                                        <option value="capturista">Capturista</option>
                                                        <option value="operaciones">Operaciones</option>
                                                    </select>
                                                : usuario.rol}
                                            </td>
                                            <td>
                                                {editando === usuario.id && userRole === "administrador" ?
                                                    <input type="text" value={usuarioEditado.contrasena || ""} onChange={(e) => handleChange(e, "nombre")}/>
                                                    :usuario.contrasena}
                                            </td>
                                                
                                            <td>
                                                {userRole === "administrador" && (
                                                    <>
                                                        {editando === usuario.id ? (
                                                            <button className="btn btn-success btn-sm" onClick={() => handleGuardarCambios(usuario.id)}>Guardar</button>
                                                        ): (
                                                            <button className="btn btn-warning btn-sm" onClick={() => handleEditarUsuario(usuario.id)}>Editar</button>
                                                        )}
                                                    {userRole === "administrador" && ( 
                                                        <button className="btn btn-danger btn-sm ms-2" onClick={() => handleEliminarUsuario(usuario.id)}>Eliminar</button>
                                                )}
                                                    </>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                    {usuarios.length === 0 && userRole === "administrador" && (
                                        <tr>
                                            <td colSpan="5" className="text-center">No hay usuarios registrados</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Usuarios;
