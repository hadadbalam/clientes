const express = require('express');
const router = express.Router();

// GET: Obtener todos los clientes
router.get('/', async (req, res) => {
    try {
        const [rows] = await req.db.query('SELECT * FROM clientes ORDER BY fecha_registro DESC');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener clientes", error });
    }
});

// POST: Crear un nuevo cliente
router.post('/', async (req, res) => {
    const { nombre, apellido, email, telefono, direccion, puntos } = req.body;
    try {
        const sql = 'INSERT INTO clientes (nombre, apellido, email, telefono, direccion, puntos) VALUES (?, ?, ?, ?, ?, ?)';
        const [result] = await req.db.query(sql, [nombre, apellido, email, telefono, direccion, puntos || 0]);
        res.status(201).json({ id: result.insertId, message: "Cliente creado con éxito" });
    } catch (error) {
        res.status(500).json({ message: "Error al crear cliente", error });
    }
});

// DELETE: Eliminar un cliente por ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await req.db.query('DELETE FROM clientes WHERE id = ?', [id]);
        res.json({ message: "Cliente eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar", error });
    }
});

module.exports = router;