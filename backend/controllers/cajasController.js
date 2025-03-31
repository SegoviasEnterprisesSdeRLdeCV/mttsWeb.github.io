const pool = require('../config/db');

exports.obtenerCajas = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM cajas");
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener las cajas" });
    }
};

exports.obtenerCajaPorNumeroEconomico = async (req, res) => {
    const { numero } = req.params;
    try {
        const [rows] = await pool.query("SELECT * FROM cajas WHERE numero_economico = ?", [numero]);
        rows.length ? res.json(rows[0]) : res.status(404).json({ error: "Caja no encontrada" });
    } catch (error) {
        res.status(500).json({ error: "Error al obtener la caja" });
    }
};

exports.crearCaja = async (req, res) => {
    try {
        await pool.query("INSERT INTO cajas SET ?", req.body);
        res.json({ mensaje: "Caja creada correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al crear la caja" });
    }
};

exports.eliminarCaja = async (req, res) => {
    const { numero } = req.params;
    try {
        await pool.query("DELETE FROM cajas WHERE numero_economico = ?", [numero]);
        res.json({ mensaje: "Caja eliminada correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar la caja" });
    }
};
