const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');
const authMiddleware = require('../middleware/authMiddleware');

// Obtener todos los usuarios (solo nombre y rol)
router.get('/', authMiddleware, usuariosController.obtenerUsuarios);

// Login de usuario
router.post('/login', usuariosController.login);

// Obtener usuario por nombre
router.get('/:nombre', usuariosController.obtenerUsuarioPorId);

// Crear un nuevo usuario
router.post('/crear', usuariosController.crearUsuario);

// Eliminar usuario por nombre
router.delete('/:nombre', usuariosController.eliminarUsuario);

module.exports = router;
