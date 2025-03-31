const pool = require('../config/db');

exports.obtenerInspeccionesCajas = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM inspecciones_cajas");
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener las inspecciones de cajas" });
    }
};

exports.obtenerInspeccionCajaPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query("SELECT * FROM inspecciones_cajas WHERE id = ?", [id]);
        rows.length ? res.json(rows[0]) : res.status(404).json({ error: "Inspección de caja no encontrada" });
    } catch (error) {
        res.status(500).json({ error: "Error al obtener la inspección de caja" });
    }
};

exports.crearInspeccionCaja = async (req, res) => {
    try {
        await pool.query("INSERT INTO inspecciones_cajas SET ?", req.body);
        res.json({ mensaje: "Inspección de caja creada correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al crear la inspección de caja" });
    }
};

exports.eliminarInspeccionCaja = async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query("DELETE FROM inspecciones_cajas WHERE id = ?", [id]);
        res.json({ mensaje: "Inspección de caja eliminada correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar la inspección de caja" });
    }
};
