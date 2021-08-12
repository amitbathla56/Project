const express = require("express");
//const morgan = require("morgan");
const app = express();
const mysql = require("mysql");
//var bodyParser = require('body-parser');
//app.use(morgan("combined"));

app.use(express.json());




//var urlencodedParser = bodyParser.urlencoded({ extended: false });
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "mydb",
});

//get all  data 
app.get("/users", (req, res) => {

  const querystring = "SELECT * FROM users ";
  connection.query(querystring, (err, rows, fields) => {
    if (err) {
      return console.log("error" + err);
    }

    res.send(rows);
  });
  // res.end()
});

//get data using id
app.get("/users/:id", (req, res) => {

  const querystring = "SELECT * FROM users WHERE id= ?";
  connection.query(querystring, [req.params.id], (err, rows, fields) => {
    if (err) {
      return console.log("error" + err);
    }

    res.send(rows);
  });

  // res.end()
});

//update data using id
app.get("/update/:id", (req, res) => {
  let Newname = "zzzz"
  const querystring = `UPDATE users SET name=${Newname} WHERE id= ?`;
  connection.query(querystring, [req.params.id], (err, rows, fields) => {
    if (err) {
      return console.log("error" + err);
    }

    res.send(rows);
  });

  //  res.end()
});
app.get("/users/add", (req, res) => {

  const querystring = "SELECT * FROM datatb ";
  connection.query(querystring, (err, rows, fields) => {
    if (err) {
      return console.log("error" + err);
    }

    res.send(rows);
  });
  // res.end()
});

app.post("/users/add", (req, res) => {

  console.log(req.body.title);
  console.log(req.body.body);

  var title = req.body.title;
  var body = req.body.body;

  const querystring = `INSERT INTO datatb
   VALUES (default,'${title}','${body}'}');`
  connection.query(querystring, (err, rows, fields) => {
    if (err) {
      return console.log("error" + err);
    }

    res.send(rows);
  });

  res.end()
});




app.post("/users", (req, res) => {


  console.log(req.body.firstname);
  console.log(req.body.lastname);
  console.log(req.body.email);
  console.log(req.body.password);
  console.log(req.body.confirmpassword);
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  var email = req.body.email;
  var password = req.body.password;
  var confirmpassword = req.body.confirmpassword;
  const querystring = `INSERT INTO users 
   VALUES (default,'${firstname}','${lastname}','${email}','${password}','${confirmpassword}');`
  connection.query(querystring, (err, rows, fields) => {
    if (err) {
      return console.log("error" + err);
    }

    res.send(rows);
  });

  //  res.end()
});


app.delete("/users/:id", (req, res) => {

  const query = "DELETE FROM users WHERE id = ?";
  connection.query(query, [req.params.id], (err, rows, fields) => {
    if (err) {
      return console.log("error");
    }
    res.send(rows);
    console.log(rows);
  });
  // res.end()
});

app.listen(3001, () => {
  console.log(`connection is start `);
});



