const db = require('../config/db');
const bcrypt = require('bcryptjs');

// Registro de usuario (registro.html)
exports.registrar = async (req, res) => {
    const { nombre, email, contrasena, fecha_nacimiento, genero } = req.body;
    try {
        // Encriptar contraseña (10 rondas de sal)
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(contrasena, salt);

        const query = 'INSERT INTO usuarios (nombre, email, contrasena, fecha_nacimiento, genero) VALUES (?, ?, ?, ?, ?)';
        await db.query(query, [nombre, email, passwordHash, fecha_nacimiento, genero]);

        res.status(201).json({ msg: "Usuario registrado con éxito" });
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ msg: "El correo ya está registrado" });
        }
        res.status(500).json({ error: err.message });
    }
};

// Inicio de sesión (login.html)
exports.login = async (req, res) => {
    const { email, contrasena } = req.body;
    try {
        // Buscar el usuario por email
        const [rows] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
        if (rows.length === 0) return res.status(400).json({ msg: "Credenciales inválidas" });

        const usuario = rows[0];

        // Comparar la contraseña ingresada con el hash de la BD
        const esCorrecta = await bcrypt.compare(contrasena, usuario.contrasena);
        if (!esCorrecta) return res.status(400).json({ msg: "Credenciales inválidas" });

        // En un taller más avanzado aquí se generaría un JWT
        res.json({ 
            msg: "Inicio de sesión exitoso", 
            usuario: { id: usuario.id, nombre: usuario.nombre, email: usuario.email } 
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};