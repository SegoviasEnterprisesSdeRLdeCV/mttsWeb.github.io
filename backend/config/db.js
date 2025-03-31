require('dotenv').config();
const mysql = require('mysql2/promise');


const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const pool = mysql.createPool({
    host: 'localhost', 
    user: 'root',      
    password: '123456', 
    database: 'mantenimiento_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});


db.getConnection((err, connection) => {
    if (err) {
        console.error('Error al conectar a MySQL:', err);
    } else {
        console.log('Conexión a MySQL establecida');
        connection.release();
    }
});

module.exports = pool;   
