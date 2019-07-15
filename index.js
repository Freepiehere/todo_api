var express = require('express');
var bodyParser = require('body-parser');
var connection = require('./src/models/dbconnection');
var todoRouter = require('./src/routes/todo/todo');

var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse application/json
app.use(bodyParser.json())

app.get('/',(req,res) => {
    connection.query('SELECT * FROM todo', (err,rows,fields) => {
        return res.send(rows);
    });
    //return res.send("successfully recieved get request \n")
});

app.use('/todo',todoRouter);

var port = process.env.PORT || 3000;
app.listen(port,() => {
    console.log(`Server running on port ${port}`)
});