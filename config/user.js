const bcrypt = require('bcrypt-nodejs');
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: '108.179.208.217',
    user: 'thrilaaj_abdo',
    password: 'A7azerty',
    database: 'thrilaaj_testprojet2',
    port: '3306'
});

module.exports = connection;