const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const mysql = require('mysql');

var corsOption = {
  origin:true,
  methods:'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials:true,
  exposedHeaders:['x-auth-token']
};

// parse application/json
app.use(bodyParser.json());
app.use(cors(corsOption));

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

// show all value
// app.get('/teacherData',(req, res) => {
//   let sql = "SELECT * FROM teachertable";
//   let query = conn.query(sql, (err, results) => {
//     if(err) throw err;
//     res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
//   });
// });


// filtering data using get request
app.get('/teacherData',(req, res) => {
  let sql = "SELECT * FROM teachertable WHERE 1";
  if(req.query.qualification != "" && req.query.qualification != null){
    sql = sql + " AND Qualification = '" +req.query.qualification+ "'"; 
  }
  if(req.query.experience != "" && req.query.experience != null){
    sql = sql + " AND Experience = "+req.query.experience;
  }
      
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});


//Delete value
app.delete('/teacherData/:id',(req, res) => {
  let sql = "DELETE FROM teachertable WHERE Tid="+req.params.id+"";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

//update value 
app.put('/teacherData/:id',(req, res) => {
  let sql = "UPDATE teachertable SET  Name='"+req.body.teachername+"',Adress='"+req.body.address+"',Experience='"+req.body.experience+"',ContactNo='"+req.body.contactno+"',Qualification='"+req.body.qualification+"',Salary='"+req.body.salary+"',uniqueId='"+req.body.uniqueid+"' WHERE Tid="+req.params.id;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

//add new value (Manually)
app.post('/teacherData',(req, res) => {
    let data = {
        Name: req.body.teachername, 
        uniqueID: req.body.uniqueid, 
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


// Automatically creating Table
  app.post('/createtable',(req, res) => {
    let sql = "CREATE TABLE Persons (PersonID int,LastName varchar(255),FirstName varchar(255),Address varchar(255), City varchar(255) );"
    let query = conn.query(sql,(err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });


  app.post('/loginpage',(req, res) => {
    let sql = "SELECT * FROM loginpage WHERE Username = '"+req.body.usernameValue+ "' AND Password = '"+req.body.passwordValue+"'";
    let query = conn.query(sql,(err, results) => {
      if(err) throw err;
      var oResponse={};
        if(results.length>0) {
          oResponse = JSON.stringify({"status": 200, "error": null, "response": true});
        }else {
          oResponse = JSON.stringify({"status": 200, "error": null, "response": false});
        }
      res.send(oResponse);
      
    });
  });

  // post method for signup DB
  app.post('/signUpData',(req, res) => {
    let data = {
        Name: req.body.name, 
        Username: req.body.username, 
        Password: req.body.password, 
    };

    let sql = "INSERT INTO loginpage SET ?";
    let query = conn.query(sql, data,(err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });



//show single product
// app.get('/teacherData/:sid',(req, res) => {
//     let sql = "SELECT * FROM studentData WHERE idStudentData="+req.params.sid;
//     console.log(sql);
//     let query = conn.query(sql, (err, results) => {
//       if(err) throw err;
//       res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
//     });
//   });

// just for example-->path
app.get('/',(req, res) => {
      res.send("Welcome");
  });

//Server listening
app.listen(3000,() =>{
    console.log('Server started on port 3000...');
  });