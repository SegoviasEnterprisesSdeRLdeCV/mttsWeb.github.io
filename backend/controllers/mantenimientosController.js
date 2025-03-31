const pool = require('../config/db');

exports.obtenerMantenimientos = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM mantenimientos");
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los mantenimientos" });
    }
};

exports.obtenerMantenimientoPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query("SELECT * FROM mantenimientos WHERE id = ?", [id]);
        rows.length ? res.json(rows[0]) : res.status(404).json({ error: "Mantenimiento no encontrado" });
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el mantenimiento" });
    }
};

exports.crearMantenimiento = async (req, res) => {
    try {
        await pool.query("INSERT INTO mantenimientos SET ?", req.body);
        res.json({ mensaje: "Mantenimiento creado correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al crear el mantenimiento" });
    }
};
