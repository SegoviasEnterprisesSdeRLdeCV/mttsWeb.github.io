const express = require('express');
const router = express.Router();
const { obtenerInspeccionesCajas, crearInspeccionCaja } = require('../controllers/inspeccionesCajasController');

router.get('/', obtenerInspeccionesCajas);
router.post('/', crearInspeccionCaja);

module.exports = router;