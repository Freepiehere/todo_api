var mysql = require('mysql');

var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'WorldCla$$1',
    database:'todolist'
});
connection.connect();

module.exports=connection;