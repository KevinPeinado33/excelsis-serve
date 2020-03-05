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
    const { titulo, categoria, lugar, picture } = req.body;
    mysqlConnection.query('INSERT INTO noticia(titulo, categoria, lugar, url_imagen,estado) values(?, ?, ?, ?, 1)', [titulo, categoria, lugar, picture], (error) => {
        if(!error) {
            res.json('registrado correctamente');
        } else {
            console.log(error);
        }
    });
});

router.put('/cambiar-estado-noticia/:idnoticia', (req, res) => {
    const { idnoticia } = req.params;
    mysqlConnection.query('UPDATE noticia SET estado = 2 WHERE idnoticia = ?', [idnoticia], (error, rows) => {
        if(!error) { 
            res.json('Actualizado Correctamente');
        } else {
            console.log(error);
        }
    })
});

module.exports = router;