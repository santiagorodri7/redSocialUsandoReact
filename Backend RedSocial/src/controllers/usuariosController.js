const db = require('../config/db');

exports.buscarUsuarios = async (req, res) => {
    const termino = typeof req.query.termino === 'string' ? req.query.termino.trim() : '';
    if (termino.length < 2 || termino.length > 80) {
        return res.status(400).json({ msg: 'El término de búsqueda debe tener entre 2 y 80 caracteres' });
    }

    try {
        const patron = `%${termino}%`;
        const [rows] = await db.query(
            `SELECT id, nombre, biografia, ciudad, avatar
             FROM usuarios
             WHERE nombre LIKE ? OR biografia LIKE ? OR ciudad LIKE ?
             ORDER BY nombre
             LIMIT 50`,
            [patron, patron, patron]
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.obtenerPerfil = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query('SELECT * FROM usuarios WHERE id = ?', [id]);
        if (rows.length === 0) return res.status(404).json({ msg: "Usuario no encontrado" });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.actualizarConfiguracion = async (req, res) => {
    const { id } = req.params;
    const { biografia, ciudad, genero } = req.body;
    try {
        await db.query('UPDATE usuarios SET biografia = ?, ciudad = ?, genero = ? WHERE id = ?', 
        [biografia, ciudad, genero, id]);
        res.json({ msg: "Configuración actualizada correctamente" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};