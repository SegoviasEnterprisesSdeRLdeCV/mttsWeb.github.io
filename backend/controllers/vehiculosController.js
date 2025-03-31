const pool = require('../config/db');

// Obtener todos los vehículos
exports.obtenerVehiculos = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM vehiculos ORDER BY numero_economico_v asc");
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message || "Error al obtener los vehículos" });
    }
};

// Obtener vehículo por número económico
exports.buscarVehiculo = async (req, res) => {
    try {
        const { numero_economico_v } = req.params; // Asegúrate de que 'numero_economico_v' se obtiene correctamente desde los params
        console.log('Número Económico recibido:', numero_economico_v);

        if (!numero_economico_v) {
            return res.status(400).json({ mensaje: "El número económico es requerido" });
        }


        const query = "SELECT * FROM vehiculos WHERE numero_economico_v = ?";
        const [result] = await pool.query(query, [numero_economico_v]);
        
        if (result.length === 0) {
            return res.status(404).json({ mensaje: "No se encontraron vehículos con ese número económico" });
        }

        res.json(result); // Retorna los datos del vehículo encontrado
    } catch (error) {
        res.status(500).json({ error: error.message || "Error en la búsqueda de vehículos" });
    }
};

//crear nuevo vehiculo
exports.crearVehiculo = async (req, res) => {
    const { numero_economico_v, marca, numero_serie, placas, anio, kilometraje_actual, cambio_aceite, estado } = req.body;

    console.log("Datos recibidos en el backend:", req.body); // Verificar datos entrantes

    try {
        // Verificar si el número económico ya existe
        const [existe] = await pool.query("SELECT * FROM vehiculos WHERE numero_economico_v = ?", [numero_economico_v]);

        if (existe.length > 0) {
            console.log("Error: Número económico ya registrado");
            return res.status(400).json({ error: "El número económico ya está registrado" });
        }

        // Intentar insertar en la base de datos
        const [result] = await pool.query(
            "INSERT INTO vehiculos (numero_economico_v, marca, numero_serie, placas, anio, kilometraje_actual, cambio_aceite, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            [numero_economico_v, marca, numero_serie, placas, anio, kilometraje_actual, cambio_aceite, estado]
        );

        console.log("Vehículo insertado correctamente, ID:", result.insertId);
        res.json({ mensaje: "Vehículo creado correctamente", id: result.insertId });

    } catch (error) {
        console.error("Error en la base de datos:", error);
        res.status(500).json({ error: error.message || "Error al crear el vehículo" });
    }
};


// Actualizar un vehículo por ID
exports.actualizarVehiculo = async (req, res) => {
    const { id } = req.params;
    const { numero_economico_v, marca, numero_serie, placas, anio, kilometraje_actual, cambio_aceite, estado } = req.body;

    try {
        const [result] = await pool.query("UPDATE vehiculos SET ? WHERE id = ?", [{ numero_economico_v, marca, numero_serie, placas, anio, kilometraje_actual, cambio_aceite, estado }, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Vehículo no encontrado para actualizar" });
        }

        res.json({ mensaje: "Vehículo actualizado correctamente" });
    } catch (error) {
        res.status(500).json({ error: error.message || "Error al actualizar el vehículo" });
    }
};

// Eliminar un vehículo por ID
exports.eliminarVehiculo = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query("DELETE FROM vehiculos WHERE id = ?", [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Vehículo no encontrado para eliminar" });
        }

        res.json({ mensaje: "Vehículo eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ error: error.message || "Error al eliminar el vehículo" });
    }
};


