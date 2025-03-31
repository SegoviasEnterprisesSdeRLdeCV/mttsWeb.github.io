const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const SECRET_KEY = process.env.JWT_SECRET || 'tu_secreto_seguro';

dotenv.config();

// Obtener todos los usuarios (solo nombre y rol)
exports.obtenerUsuarios = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT id, nombre, rol FROM usuarios");
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los usuarios" });
    }
};

// Login de usuario
exports.login = async (req, res) => {
    const { nombre, contrasena } = req.body;
    console.log("Datos recibidos del cliente:", { nombre, contrasena });

    // Verificar que los datos no sean undefined o null
    if (!nombre || !contrasena) {
        return res.status(400).json({ message: "Nombre y contraseña son obligatorios" });
    }

    try {
        const [usuarios] = await pool.query("SELECT id, nombre, contrasena, rol FROM usuarios WHERE nombre = ?", [nombre]);
        console.log("Usuarios encontrados en BD:", usuarios);

        if (usuarios.length === 0) {
            console.log("Usuario no encontrado");
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        const usuario = usuarios[0];
        console.log("Datos del usuario en BD:", usuario);

        // Verificar si la contraseña en BD es undefined o null
        if (!usuario.contrasena) {
            console.log("Error: La contraseña almacenada en BD es inválida");
            return res.status(500).json({ message: "Error del servidor: contraseña no definida en BD" });
        }

        // Comparar la contraseña ingresada con la almacenada
        const contrasenaCorrecta = await bcrypt.compare(contrasena, usuario.contrasena);
        console.log("Resultado de bcrypt.compare:", contrasenaCorrecta);

        if (!contrasenaCorrecta) {
            return res.status(401).json({ message: "Contraseña incorrecta" });
        }

        // Generar el token de autenticación
        const token = jwt.sign(
            { id: usuario.id, nombre: usuario.nombre, rol: usuario.rol },
            SECRET_KEY,
            { expiresIn: "2h" }
        );

        console.log("Token generado:", token);

        res.json({ token, usuario: { id: usuario.id, nombre: usuario.nombre, rol: usuario.rol } });

    } catch (error) {
        console.error("Error en login:", error);
        res.status(500).json({ mensaje: "Error del servidor" });
    }
};

// Obtener usuario por nombre (ID no es necesario)
exports.obtenerUsuarioPorId = async (req, res) => {
    const { nombre } = req.params;
    try {
        const [rows] = await pool.query("SELECT id, nombre, rol FROM usuarios WHERE nombre = ?", [nombre]);
        rows.length ? res.json(rows[0]) : res.status(404).json({ error: "Usuario no encontrado" });
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el usuario" });
    }
};

// Crear un nuevo usuario
exports.crearUsuario = async (req, res) => {
    try {
        const { nombre, contrasena, rol } = req.body;

        if (!nombre || !contrasena || !rol) {
            return res.status(400).json({ error: "Todos los campos son obligatorios" });
        }
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(contrasena, salt);

        await pool.query("INSERT INTO usuarios (nombre, contrasena, rol) VALUES (?, ?, ?)", 
                        [nombre, hashedPassword, rol]);

        res.json({ mensaje: "Usuario creado correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al crear el usuario" });
    }
};


// Eliminar usuario por nombre
exports.eliminarUsuario = async (req, res) => {
    const { nombre } = req.params;
    try {
        const [result] = await pool.query("DELETE FROM usuarios WHERE nombre = ?", [nombre]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        res.json({ mensaje: "Usuario eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar el usuario" });
    }
};

