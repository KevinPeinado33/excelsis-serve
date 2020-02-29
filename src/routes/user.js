const express = require('express');
const router = express.Router();

const mysqlConnection = require('../../db/database');

router.get('/', (req, res) => {
    mysqlConnection.query('SELECT * FROM usuario', (error, rows) => {
        if(!error) {
            res.json(rows);
        } else {
            console.log(error);
        }
    });
});

router.get('/listado-noticia', (req, res) => {
    mysqlConnection.query('SELECT * FROM noticia WHERE estado = 1', (error, rows) => {
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

router.post('/registrar-noticias', (req, res) => {
    const { titulo, categoria, lugar } = req.body;
    mysqlConnection.query('INSERT INTO noticia(titulo, categoria, lugar, estado) values(?, ?, ?, 1)', [titulo, categoria, lugar], (error) => {
        if(!error) {
            res.json('registrado correctamente');
        } else {
            console.log(error);
        }
    });
});

router.post('/registrar-nuevo-interesado', (req, res)=> {
    const { nombres, numCelular, nivel } = req.body;
    mysqlConnection.query('INSERT INTO interesado(nombres_apellidos, num_cel, nivel_instruccion, estado) values(?,?,?,1)', [nombres, numCelular, nivel], (error) => {
        if(!error) {
            res.json('registrado correctamente');
        } else {
            console.log(error);
        }
    });
});

module.exports = router;