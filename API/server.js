const express = require("express");
const http = require('http');
const bodyParser = require("body-parser");
const path = require("path");
const cookieParser = require("cookie-parser"); //for the cookie monster
//const compress = require("compress");
const cors = require("cors");
const helmet = require("helmet");

const models = require('./models');
const routes = require('./routers/index');
const auth  = require('./routers/authRouter');
const users  = require('./routers/userRouter');
const search  = require("./routers/searchRouter");
const verify = require("./routers/verificationRouter");
const remedyLists = require("./routers/remedyListsRoute");
const specialty = require('./routers/specialtyRouter');
const doctors = require('./routers/doctorRouter');

const app = express();

//body-parser -> middleware module, added to the Express.js app
//parsing streamable request objects so that we can simplify browser-server communication by exchanging JSON in the request body. 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser()); //parse and set cookies in request objects. 
//app.use(compress()); //compress response bodies for all requests
app.use(helmet()); // secure apps by setting various HTTP headers
app.use(cors()); // enable CORS - Cross Origin Resource Sharing
app.options('*', cors()) ;

app.get('/api',(req,res) => {
  res.status(200).send({
      data : "Welcome Node Sequlize API v1"
  })
})

app.use('/', cors(), auth);
app.use('/', users);
app.use('/', cors(), search);
app.use('/', verify);
app.use('/', remedyLists);
app.use('/', specialty);
app.use('/', doctors);
app.use(routes);

// Default response for any other request
// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    console.log("err -> " + err.message);
    res.status(err.status || 500).json({
      message: '-> ' + err.message,
      error: err,
      req: req.path
    });
});

//TODO: first add authorisation
// Catch unauthorised errors
// app.use((err, req, res, next) => {
//   if (err.name === 'UnauthorizedError') {
//     res.status(401).json({"error" : err.name + ": " + err.message})
//   }
// })

// Server port
const HTTP_PORT = 3000;
models.sequelize.sync().then(() => {
    app.listen(HTTP_PORT, (err) => {
        if(err) console.log(err);

        console.info("Server running on port %PORT%".replace("%PORT%",HTTP_PORT));
    });  
}); 