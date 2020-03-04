const express = require('express');
const router = express.Router();

const mysqlConnection = require('../../db/database');

router.get('/listado-noticia', (req, res) => {
    mysqlConnection.query('SELECT * FROM noticia WHERE estado = 1', (error, rows) => {
        if(!error) {
            res.json(rows);
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

module.exports = router;