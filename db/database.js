const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host: 'db4free.net',
    user:'kevin2020',
    password:'kevin2020',
    database: 'dbexcelsis'
});

mysqlConnection.connect(function (e) {
    if(e) {
        console.log(e);
    } else {
        console.log('DB conectada');
    }
});

module.exports = mysqlConnection;