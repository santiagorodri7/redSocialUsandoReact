const mysql = require('mysql2/promise');
require('dotenv').config();

async function setupDatabase() {
    const databaseName = process.env.DB_NAME || 'red_social_db';
    if (!/^[A-Za-z0-9_]+$/.test(databaseName)) {
        throw new Error('DB_NAME solo puede contener letras, números y guiones bajos.');
    }

    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || ''
    });

    try {
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${databaseName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
        await connection.query(`USE \`${databaseName}\``);

        await connection.query(`
            CREATE TABLE IF NOT EXISTS usuarios (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nombre VARCHAR(100) NOT NULL,
                email VARCHAR(100) NOT NULL UNIQUE,
                contrasena VARCHAR(255) NOT NULL,
                biografia TEXT DEFAULT NULL,
                ciudad VARCHAR(100) DEFAULT 'Medellín',
                fecha_nacimiento DATE DEFAULT NULL,
                genero ENUM('Hombre', 'Mujer', 'Otro') DEFAULT NULL,
                avatar VARCHAR(255) DEFAULT 'https://www.w3schools.com/w3images/avatar2.png',
                rol ENUM('admin', 'usuario') DEFAULT 'usuario',
                fecha_registro TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
        `);

        const [userColumns] = await connection.query('SHOW COLUMNS FROM usuarios');
        const existingUserColumns = new Set(userColumns.map((column) => column.Field));
        if (!existingUserColumns.has('fecha_nacimiento')) {
            await connection.query('ALTER TABLE usuarios ADD COLUMN fecha_nacimiento DATE DEFAULT NULL');
        }
        if (!existingUserColumns.has('genero')) {
            await connection.query("ALTER TABLE usuarios ADD COLUMN genero ENUM('Hombre', 'Mujer', 'Otro') DEFAULT NULL");
        }

        await connection.query(`
            CREATE TABLE IF NOT EXISTS publicaciones (
                id INT AUTO_INCREMENT PRIMARY KEY,
                usuario_id INT NOT NULL,
                texto TEXT NOT NULL,
                imagen_url VARCHAR(255) DEFAULT NULL,
                fecha_creacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
        `);

        await connection.query(`
            CREATE TABLE IF NOT EXISTS likes (
                id INT AUTO_INCREMENT PRIMARY KEY,
                publicacion_id INT NOT NULL,
                usuario_id INT NOT NULL,
                fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                UNIQUE KEY unique_like (publicacion_id, usuario_id),
                FOREIGN KEY (publicacion_id) REFERENCES publicaciones(id) ON DELETE CASCADE,
                FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
        `);

        await connection.query(`
            CREATE TABLE IF NOT EXISTS comentarios (
                id INT AUTO_INCREMENT PRIMARY KEY,
                publicacion_id INT NOT NULL,
                usuario_id INT NOT NULL,
                contenido TEXT NOT NULL,
                fecha_comentario TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (publicacion_id) REFERENCES publicaciones(id) ON DELETE CASCADE,
                FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
        `);

        await connection.query(`
            CREATE TABLE IF NOT EXISTS grupos (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nombre VARCHAR(100) NOT NULL,
                descripcion TEXT DEFAULT NULL,
                imagen_url VARCHAR(255) DEFAULT NULL
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
        `);

        await connection.query(`
            CREATE TABLE IF NOT EXISTS miembros_grupos (
                grupo_id INT NOT NULL,
                usuario_id INT NOT NULL,
                fecha_union TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (grupo_id, usuario_id),
                FOREIGN KEY (grupo_id) REFERENCES grupos(id) ON DELETE CASCADE,
                FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
        `);

        await connection.query(`
            CREATE TABLE IF NOT EXISTS mensajes (
                id INT AUTO_INCREMENT PRIMARY KEY,
                remitente_id INT NOT NULL,
                destinatario_id INT NOT NULL,
                contenido TEXT NOT NULL,
                fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (remitente_id) REFERENCES usuarios(id),
                FOREIGN KEY (destinatario_id) REFERENCES usuarios(id)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
        `);

        console.log(`Base de datos "${databaseName}" y sus tablas están listas.`);
    } finally {
        await connection.end();
    }
}

setupDatabase().catch((error) => {
    console.error('No se pudo preparar la base de datos:', error.message);
    process.exitCode = 1;
});
