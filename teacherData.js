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
app.get('/teacherData',(req, res) => {
  debugger;
  let sql = "SELECT * FROM teachertable";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});


//add new product (Manually)
app.post('/teacherData',(req, res) => {
    let data = {
        Name: req.body.teachername, 
        Adress: req.body.address, 
        Experience:req.body.experience, 
        ContactNo:req.body.contactno,
        Qualification:req.body.qualification,
        Salary:req.body.salary
    };

    let sql = "INSERT INTO teachertable SET ?";
    let query = conn.query(sql, data,(err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });


// Automatically crearing Table
  app.post('/createtable',(req, res) => {
    let sql = "CREATE TABLE Persons (PersonID int,LastName varchar(255),FirstName varchar(255),Address varchar(255), City varchar(255) );"
    let query = conn.query(sql,(err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });




//show single product
app.get('/teacherData/:sid',(req, res) => {
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