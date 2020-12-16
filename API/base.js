
const express = require("express");
const app = express();
const {userRouter} = require('./routers/userRouter')
const db = require("./database.js");
const md5 = require("md5");
const bodyParser = require("body-parser");
const path = require("path");
const cookieParser = require("cookie-parser"); //for the cookie monster
//add cors

//body-parser -> middleware module, added to the Express.js app
//Will try to parse the body content (URL encoded or JSON) of the post request and store it in req.body object.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Root endpoint
app.get("/", (req, res, next) => {
    res.json({"message":"Ok"});
});

app.use('/', userRoutes);

// Default response for any other request
app.use((req, res) => {
  res.status(404);
});

//TODO: first add authorisation
// Catch unauthorised errors
// app.use((err, req, res, next) => {
//   if (err.name === 'UnauthorizedError') {
//     res.status(401).json({"error" : err.name + ": " + err.message})
//   }
// })

module.exports = {
  app: app
}