const { Client } = require('pg');
const args = process.argv.slice(2);

const client = new Client({
    user: 'katherine-medina',
    host: 'localhost',
    database: 'estudiantes_db',
    password: 'hola',
    port: 5432,
});

client.connect();

const agregarEstudiante = async (nombre, rut, curso, nivel) => {
    try {
        const res = await client.query('INSERT INTO estudiantes (nombre, rut, curso, nivel) VALUES ($1, $2, $3, $4)', [nombre, rut, curso, nivel]);
        console.log(`Estudiante ${nombre} agregado con éxito`);
    } catch (err) {
        console.error('Error agregando estudiante:', err);
    } finally {
        client.end();
    }
};

const consultarEstudiantes = async () => {
    try {
        const res = await client.query('SELECT * FROM estudiantes');
        console.log('Estudiantes registrados:', res.rows);
    } catch (err) {
        console.error('Error consultando estudiantes:', err);
    } finally {
        client.end();
    }
};

const consultarEstudiantePorRut = async (rut) => {
    try {
        const res = await client.query('SELECT * FROM estudiantes WHERE rut = $1', [rut]);
        console.log('Estudiante encontrado:', res.rows[0]);
    } catch (err) {
        console.error('Error consultando estudiante:', err);
    } finally {
        client.end();
    }
};

const actualizarEstudiante = async (nombre, rut, curso, nivel) => {
    try {
        const res = await client.query('UPDATE estudiantes SET nombre = $1, curso = $2, nivel = $3 WHERE rut = $4', [nombre, curso, nivel, rut]);
        console.log(`Estudiante con rut ${rut} actualizado con éxito`);
    } catch (err) {
        console.error('Error actualizando estudiante:', err);
    } finally {
        client.end();
    }
};

const eliminarEstudiante = async (rut) => {
    try {
        const res = await client.query('DELETE FROM estudiantes WHERE rut = $1', [rut]);
        console.log(`Estudiante con rut ${rut} eliminado con éxito`);
    } catch (err) {
        console.error('Error eliminando estudiante:', err);
    } finally {
        client.end();
    }
};

const comando = args[0];

switch (comando) {
    case 'agregar':
        agregarEstudiante(args[1], args[2], args[3], args[4]);
        break;
    case 'consultar':
        consultarEstudiantes();
        break;
    case 'consultarRut':
        consultarEstudiantePorRut(args[1]);
        break;
    case 'actualizar':
        actualizarEstudiante(args[1], args[2], args[3], args[4]);
        break;
    case 'eliminar':
        eliminarEstudiante(args[1]);
        break;
    default:
        console.log('Comando no reconocido');
        client.end();
        break;
}
