const db = require('../config/db');

exports.listarGrupos = async (req, res) => {
    const termino = typeof req.query.buscar === 'string' ? req.query.buscar.trim() : '';
    try {
        const parametros = [];
        let filtro = '';
        if (termino) {
            if (termino.length < 2 || termino.length > 80) {
                return res.status(400).json({ msg: 'El término de búsqueda debe tener entre 2 y 80 caracteres' });
            }
            filtro = 'WHERE g.nombre LIKE ? OR g.descripcion LIKE ?';
            const patron = `%${termino}%`;
            parametros.push(patron, patron);
        }

        const [rows] = await db.query(`
            SELECT g.*, COUNT(m.usuario_id) AS total_miembros 
            FROM grupos g 
            LEFT JOIN miembros_grupos m ON g.id = m.grupo_id 
            ${filtro}
            GROUP BY g.id
            ORDER BY g.nombre
            LIMIT 50
        `, parametros);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.unirseAGrupo = async (req, res) => {
    const { usuario_id, grupo_id } = req.body;
    try {
        await db.query(
            'INSERT INTO miembros_grupos (grupo_id, usuario_id) VALUES (?, ?)',
            [grupo_id, usuario_id]
        );
        res.status(201).json({ msg: 'Te uniste al grupo correctamente' });
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ msg: 'Ya perteneces a este grupo' });
        }
        res.status(500).json({ error: err.message });
    }
};