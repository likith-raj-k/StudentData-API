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
app.get('/staffData',(req, res) => {
  debugger;
  let sql = "SELECT * FROM Staff";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});




// Automatically crearing Table
  app.post('/staffData',(req, res) => {
    let sql = "CREATE TABLE Staff (staffID int,LastName varchar(255),FirstName varchar(255),Address varchar(255), City varchar(255) );"
    let query = conn.query(sql,(err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });

  //Server listening
app.listen(3000,() =>{
    console.log('Server started on port 3000...');
  });