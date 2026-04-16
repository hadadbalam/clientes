require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const clientesRoutes = require('./routes/clientes');

const app = express();

// Middlewares
// CORS es vital para que tu Frontend en Vue (puerto 5173 o similar) pueda comunicarse
app.use(cors()); 
app.use(express.json());

// Configuración de la base de datos (Pool)
// Agregamos process.env.DB_PORT para que use el 3306 de Clever Cloud
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306, 
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Middleware para inyectar la conexión 'db' en el objeto 'req'
// Esto permite que en routes/clientes.js uses 'req.db.query'
app.use((req, res, next) => {
    req.db = db;
    next();
});

// Definición de rutas
app.use('/api/clientes', clientesRoutes);

// Manejador de errores global (opcional pero recomendado)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: 'Algo salió mal en el servidor' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en: http://localhost:${PORT}`);
    console.log(`Conectado a la base de datos: ${process.env.DB_NAME}`);
});