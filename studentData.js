const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const mysql = require('mysql');

// parse application/json
app.use(bodyParser.json());

//create database connection
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database:'schooldata'
});

//connect to database
conn.connect((err) =>{
  if(!err)
  console.log('Mysql Connected...');
  else{
    console.log('Connection failed');
    console.log(err);
  }

});

// show all products
app.get('/students',(req, res) => {
  debugger;
  let sql = "SELECT * FROM studentdata";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});


//add new product
app.post('/students',(req, res) => {
    let data = {
        StudentName: req.body.studentname, 
        Address: req.body.address, 
        class:req.body.classvalue, 
        phoneNumber:req.body.phonenumber};
    let sql = "INSERT INTO studentdata SET ?";
    let query = conn.query(sql, data,(err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });


//show single product
app.get('/students/:sid',(req, res) => {
    let sql = "SELECT * FROM studentData WHERE idStudentData="+req.params.sid;
    console.log(sql);
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });


app.get('/',(req, res) => {

      res.send("Welcome");
  });

//Server listening
app.listen(3000,() =>{
    console.log('Server started on port 3000...');
  });

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

