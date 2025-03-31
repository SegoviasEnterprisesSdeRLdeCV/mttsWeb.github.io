import React, { useState, useEffect } from "react";
import axios from "axios";

function Perfil() {
  // Estados para almacenar los datos del usuario
  const [nombre, setNombre] = useState("");
  const [rol, setRol] = useState("");;
  const [imagen, setImagen] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // Estado para controlar la edición

  // Imagen predeterminada
  const defaultImage = "./imagenes/usuario.jpg";

  // Obtener datos del usuario desde la base de datos
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Suponiendo que tu backend tenga un endpoint como /api/user
        const response = await axios.get("/api/user");
        const data = response.data;

        // Asignamos los datos al estado
        setNombre(data.nombre);
        setRol(data.rol);
        setImagen(data.imagen || defaultImage); // Usar imagen predeterminada si no hay imagen
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
      }
    };

    fetchData();
  }, []); // Se ejecuta solo una vez al cargar el componente

  // Función para manejar la actualización de los datos
  const handleSave = async () => {
    try {
      // Enviar los datos actualizados a tu API para que se guarden en la base de datos
      const formData = new FormData();
      formData.append("nombre", nombre);
      formData.append("rol", rol);
      formData.append("imagen", imagen); // Si la imagen se cambia

      // Suponiendo que tu API tiene un endpoint de actualización
      await axios.post("/api/user/update", formData);
      alert("Datos guardados correctamente");
      setIsEditing(false); // Detener la edición después de guardar
    } catch (error) {
      console.error("Error al guardar los datos:", error);
      alert("Error al guardar los datos.");
    }
  };

  // Función para manejar el cambio de imagen
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagen(file); // Se guarda el archivo de la imagen seleccionada
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card" style={{ width: "20rem", height: "27rem" }}>
        <div className="card-body">
          <div className="d-grid gap-2 col-6 mx-auto" style={{ width: "15rem", height: "25rem" }}>
            {/* Mostrar imagen de usuario */}
            <img
              src={imagen ? URL.createObjectURL(imagen) : defaultImage} // Usamos URL.createObjectURL para la imagen seleccionada
              className="rounded mx-auto d-block"
              width="200"
              height="200"
              alt="Usuario"
            />

            {/* Si está editando, permitir seleccionar una nueva imagen */}
            {isEditing && (
              <div className="mt-2">
                <input type="file" onChange={handleImageChange} className="form-control" />
              </div>
            )}


            {/* Botones para editar o guardar los cambios */}
            <div className="row mb-3 d-flex justify-content-center align-items-center">
              <div className="col-2">
                {/* Si está en modo edición, mostrar el botón para guardar */}
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => setIsEditing(true)} // Cambiar al modo de edición
                >
                  Editar
                </button>
              </div>
              <div className="col-1"></div>
              <div className="col-2">
                {/* Solo mostrar "Guardar" cuando está en modo edición */}
                {isEditing && (
                  <button type="button" className="btn btn-primary" onClick={handleSave}>
                    Guardar
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Perfil;


  