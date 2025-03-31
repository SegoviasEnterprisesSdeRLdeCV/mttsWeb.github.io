const express = require('express');
const router = express.Router();
const { obtenerReportes, crearReporte } = require('../controllers/reportesController');

router.get('/', obtenerReportes);
router.post('/', crearReporte);

module.exports = router;
