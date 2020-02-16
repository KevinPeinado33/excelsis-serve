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
module.exports = router;