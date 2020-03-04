const express = require('express');
const router = express.Router();

const mysqlConnection = require('../../db/database');

router.get('/lista-interesados', (req, res) => {
    mysqlConnection.query('SELECT * FROM interesado WHERE estado = 1', (error, rows) => {
        if(!error) {
            res.json(rows);
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

router.put('/marcar-antendido/:idinteresado', (req, res) => {
    const { idinteresado } = req.params;
    mysqlConnection.query('UPDATE interesado SET estado = 2 WHERE idinteresado = ?', [idinteresado], (error, rows) => {
        if(!error) {
            res.json('Actualizado correctamente');
        } else {
            console.log(error);
        }
    });
});

module.exports = router;