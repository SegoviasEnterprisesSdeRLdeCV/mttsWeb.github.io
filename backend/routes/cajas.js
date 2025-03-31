const express = require('express');
const router = express.Router();
const cajasController = require('../controllers/cajasController'); // ✅ Verifica esta ruta

router.get('/', cajasController.obtenerCajas);
router.get('/:numero', cajasController.obtenerCajaPorNumeroEconomico);
router.post('/', cajasController.crearCaja);
router.delete('/:numero', cajasController.eliminarCaja);

module.exports = router;

