const express = require('express');
const router = express.Router();

const mysqlConnection = require('../../db/database');

router.get('/', (req, res) => {
    mysqlConnection.query('SELECT * FROM usuario', (error, rows, fields) => {
        if(!error) {
            res.json(rows);
        } else {
            console.log(error);
        }
    });
});

router.get('/listado-noticia', (req, res) => {
    mysqlConnection.query('SELECT * FROM noticia WHERE estado = 1', (error, rows, fields) => {
        if(!error) {
            res.json(rows);
        } else {
            console.log(error);
        }
    });
});

router.get('/:idusuario', (req, res) => {
    const { idusuario } = req.params;
    mysqlConnection.query('SELECT * FROM usuario WHERE idusuario = ?', [idusuario], (error, rows, fields) => {
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
    mysqlConnection.query('SELECT idusuario, estado, nombres, apellidos FROM usuario WHERE usuario = ? and password = ?', [usuario, password], (error, rows, fields) => {
        if(!error) {
            res.json(rows[0]);
        } else {
            console.log(error);
        }
    });
});

module.exports = router;