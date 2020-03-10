const express = require('express');
const router = express.Router();

const mysqlConnection = require('../../db/database');

router.get('/lista-usuarios', (req, res) => {
    mysqlConnection.query('SELECT * FROM usuario', (error, rows) => {
        if(!error) {
            res.json(rows);
        } else {
            console.log(error);
        }
    });
});

router.get('/:idusuario', (req, res) => {
    const { idusuario } = req.params;
    mysqlConnection.query('SELECT * FROM usuario WHERE idusuario = ?', [idusuario], (error, rows) => {
        if(!error) {
            res.json(rows[0]); // manda un objeto
            //res.json(rows[0]); // manda un arreglo con un objeto
        } else {
            console.log(error);
        }
    });
});

router.post('/validar-usuario', (req, res) => {
    const { usuario, password } = req.body;
    mysqlConnection.query('SELECT idusuario, estado, nombres, apellidos FROM usuario WHERE usuario = ? and password = ?', [usuario, password], (error, rows) => {
        if(!error) {
            res.json(rows[0]);
        } else {
            console.log(error);
        }
    });
});

router.put('/editar-usuario/:idusuario', (req, res) => {
    const { idusuario } = req.params;
    const { usuario, password, nombres, apellidos } = res.body;
    mysqlConnection.query(`UPDATE usuario SET usuario = ?, password = ?, nombres = ?, apellidos = ? WHERE = ${idusuario}`, [usuario, password, nombres, apellidos], (error, rows) => {
        if(!error) {
            res.json('Actualizado correctamente');
        } else {
            console.log(error);
        }
    });
});

router.post('/registrar-usuario', (req, res) => {
    const { usuario, password, nombres, apellidos } = res.body;
    mysqlConnection.query('INSERT INTO usuario(usuario, password, nombres, apellidos, estado) values(?,?,?,?,1)', [usuario, password, nombres, apellidos], (error) => {
        if(!error) {
            res.json('Registrado Correctamente');
        } else {
            console.log(error);
        }
    })
});

module.exports = router;