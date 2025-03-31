const pool = require('../config/db');

exports.obtenerInspeccionesVehiculos = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM inspecciones_vehiculos");
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener las inspecciones de vehículos" });
    }
};

exports.obtenerInspeccionVehiculoPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query("SELECT * FROM inspecciones_vehiculos WHERE id = ?", [id]);
        rows.length ? res.json(rows[0]) : res.status(404).json({ error: "Inspección de vehículo no encontrada" });
    } catch (error) {
        res.status(500).json({ error: "Error al obtener la inspección de vehículo" });
    }
};

exports.crearInspeccionVehiculo = async (req, res) => {
    try {
        await pool.query("INSERT INTO inspecciones_vehiculos SET ?", req.body);
        res.json({ mensaje: "Inspección de vehículo creada correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al crear la inspección de vehículo" });
    }
};

exports.eliminarInspeccionVehiculo = async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query("DELETE FROM inspecciones_vehiculos WHERE id = ?", [id]);
        res.json({ mensaje: "Inspección de vehículo eliminada correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar la inspección de vehículo" });
    }
};
