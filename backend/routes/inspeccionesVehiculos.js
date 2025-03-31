const express = require('express');
const router = express.Router();
const { obtenerInspeccionesVehiculos, crearInspeccionVehiculo } = require('../controllers/inspeccionesVehiculosController');

router.get('/', obtenerInspeccionesVehiculos);
router.post('/', crearInspeccionVehiculo);

module.exports = router;
