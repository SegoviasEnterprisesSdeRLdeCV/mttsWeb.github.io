const pool = require('../config/db');

exports.obtenerReportes = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM reportes");
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los reportes" });
    }
};

exports.obtenerReportePorId = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query("SELECT * FROM reportes WHERE id = ?", [id]);
        rows.length ? res.json(rows[0]) : res.status(404).json({ error: "Reporte no encontrado" });
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el reporte" });
    }
};

exports.crearReporte = async (req, res) => {
    try {
        await pool.query("INSERT INTO reportes SET ?", req.body);
        res.json({ mensaje: "Reporte creado correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al crear el reporte" });
    }
};

exports.eliminarReporte = async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query("DELETE FROM reportes WHERE id = ?", [id]);
        res.json({ mensaje: "Reporte eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar el reporte" });
    }
};
