const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const { obtenerVehiculos, crearVehiculo, actualizarVehiculo, eliminarVehiculo,  buscarVehiculo } = require('../controllers/vehiculosController');

router.get('/', obtenerVehiculos);
router.post('/', crearVehiculo);
router.put('/:id', actualizarVehiculo);
router.delete('/:id', eliminarVehiculo);
router.get('/:numero_economico_v', buscarVehiculo);

module.exports = router;
