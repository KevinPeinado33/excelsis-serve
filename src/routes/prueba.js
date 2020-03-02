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

module.exports = router;