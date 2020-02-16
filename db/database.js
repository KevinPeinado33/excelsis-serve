const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password:'',
    database: 'dbexcesil'
});

mysqlConnection.connect(function (e) {
    if(e) {
        console.log(e);
    } else {
        console.log('DB conectada');
    }
});

module.exports = mysqlConnection;