
const express = require('express');
const cors = require('cors');
const authMiddleware = require('./middleware/authMiddleware');

const app = express();
app.use(express.urlencoded({ extended: true }));
const dotenv = require('dotenv');
app.use(cors());
app.use(express.json()); 

dotenv.config();

// Importar rutas
const usuariosRoutes = require('./routes/usuarios');
const vehiculosRoutes = require('./routes/vehiculos');
const cajasRoutes = require('./routes/cajas');
const reportesRoutes = require('./routes/reportes');
const inspeccionesCajasRoutes = require('./routes/inspeccionesCajas');
const inspeccionesVehiculosRoutes = require('./routes/inspeccionesVehiculos');
const mantenimientosRoutes = require('./routes/mantenimientos');


// Usar las rutas
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/usuarios', authMiddleware);
app.use('/api/vehiculos', vehiculosRoutes);
app.use('/api/cajas', cajasRoutes);
app.use('/api/reportes', reportesRoutes);
app.use('/api/inspeccionesCajas', inspeccionesCajasRoutes);
app.use('/api/inspeccionesVehiculos', inspeccionesVehiculosRoutes);
app.use('/api/mantenimientos', mantenimientosRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('API funcionando correctamente');
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
