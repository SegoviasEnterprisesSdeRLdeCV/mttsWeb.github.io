const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const SECRET_KEY = process.env.JWT_SECRET || 'tu_secreto_seguro';


// Middleware para verificar el JWT
const authMiddleware = (req, res, next) => {
    // Verificar si el token está presente en los encabezados
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(403).json({ message: 'Token no proporcionado' });
    }

    // Verificar la validez del token
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.usuario = decoded; // Agregar usuario al request
        next();
    } catch (error) {
        return res.status(401).json({ mensaje: 'Token no válido.' });
    }
};

module.exports = authMiddleware;
