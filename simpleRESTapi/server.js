// Create express app
const express = require("express");
const app = express();
const db = require("./database.js");
const md5 = require("md5");

//body-parser -> middleware module, added to the Express.js app
//Will try to parse the body content (URL encoded or JSON) of the post request and store it in req.body object.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Server port
const HTTP_PORT = 3000;
// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT));
});

// Root endpoint
app.get("/", (req, res, next) => {
    res.json({"message":"Ok"});
});

// Insert here other API endpoints
app.get("/api/users", (req, res, next) => {
  const sql = "select * from user";
  const params = [];
  db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
      res.json({
          "message":"success",
          "data":rows
      });
    });
});

app.get("/api/user/:id", (req, res, next) => {
  const sql = "select * from user where id = ?"
  const params = [req.params.id];
  db.get(sql, params, (err, row) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
      res.json({
          "message":"success",
          "data":row
      });
    });
});

//The raw body of this post request could be something like:
//name=test&email=test%40test.com&password=test123
//The body-parser will convert this string to a javascript object:
//{name:'test', email: 'test@test.com', password: 'test123'}
app.post("/api/user/", (req, res, next) => {
  let errors=[];
  if (!req.body.password){
      errors.push("No password specified");
  }
  if (!req.body.email){
      errors.push("No email specified");
  }
  if (errors.length){
      res.status(400).json({"error":errors.join(",")});
      return;
  }

  const data = {
      name: req.body.name,
      email: req.body.email,
      password : md5(req.body.password)
  };
  const sql ='INSERT INTO user (name, email, password) VALUES (?,?,?)';
  const params =[data.name, data.email, data.password];
  db.run(sql, params, (err, result) => {
      if (err){
          res.status(400).json({"error": err.message})
          return;
      }
      res.json({
          "message": "success",
          "data": data,
          "id" : this.lastID
      });
  });
})

//PUT vs PATCH
app.patch("/api/user/:id", (req, res, next) => {
  const data = {
      name: req.body.name,
      email: req.body.email,
      password : req.body.password ? md5(req.body.password) : null
  }
  db.run(
      `UPDATE user set 
         name = COALESCE(?,name), 
         email = COALESCE(?,email), 
         password = COALESCE(?,password) 
         WHERE id = ?`,
      [data.name, data.email, data.password, req.params.id],
      (err, result) => {
          if (err){
              res.status(400).json({"error": res.message})
              return;
          }
          res.json({
              message: "success",
              data: data,
              changes: this.changes
          });
      });
})

app.delete("/api/user/:id", (req, res, next) => {
  db.run(
      'DELETE FROM user WHERE id = ?',
      req.params.id,
      (err, result) =>{
          if (err){
              res.status(400).json({"error": res.message})
              return;
          }
          res.json({"message":"deleted", changes: this.changes});
      });
})

// Default response for any other request
app.use((req, res) => {
    res.status(404);
});