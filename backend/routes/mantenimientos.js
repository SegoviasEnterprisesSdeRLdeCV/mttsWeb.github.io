const express = require('express');
const router = express.Router();
const { obtenerMantenimientos, crearMantenimiento } = require('../controllers/mantenimientosController');

router.get('/', obtenerMantenimientos);
router.post('/', crearMantenimiento);

module.exports = router;
