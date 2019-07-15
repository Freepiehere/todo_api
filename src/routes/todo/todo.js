var express = require('express');
var connection = require('../../models/dbconnection');
var router = express.Router();

router.get('/',(req,res) => {
    connection.query('SELECT * FROM todo', (err, result) => {
        if (err) throw err;
        console.log(result);
        return res.send(result);
    })
});
router.get('/:taskid',(req,res) => {
    var taskid = req.params.taskid;
    connection.query('SELECT * FROM todo WHERE task_id=?',taskid,(err,result)=>{
        if (err) throw err;
        return res.send(result);
    })
})
router.post('/', (req,res) => {
    console.log(req.body.text);
    connection.query("INSERT INTO `todo` (task) VALUES (?)",req.body.text, (err,result) => {
        if (err) throw err;
        console.log("Number of affected rows: " + result.affectedRows);
        return res.sendStatus(200);
    })
});
router.delete('/:taskid',(req,res) => {
    var taskid = req.params.taskid;
    connection.query('DELETE FROM todo WHERE task_id=?',taskid,(err,result)=>{
        if (err) throw err;
        console.log("Successfully deleted item " + taskid);
        return res.send(result);
    })
});
router.put('/:taskid', (req,res) => {
    connection.query('UPDATE `todo` SET `task`=? WHERE `task_id`=?', [req.body.text, req.params.taskid], (err,result) => {
        if (err) throw err;
        console.log("Put request received!");
        return res.sendStatus(200);
    })
})

module.exports=router;
