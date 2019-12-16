require('dotenv').config();
var express = require ('express');
var app = express();
var test = require('./controllers/testcontroller')
var sequelize = require('./db');
var bodyParser = require('body-parser');
var user = require('./controllers/usercontroller')
let log = require('./controllers/log-controller');
let login = require('./controllers/login-controller');
var authTest = require('./controllers/authtest-controller');

sequelize.sync()
app.use(bodyParser.json());
app.use (require("./middleware/header"));
app.use('/api/user', user)
app.use('/test-controller', test)

app.use(require('./middleware/validate-session'))

app.use("/authtest", authTest)
//WORKOUT LOG 
app.use('/api/log', log)
app.use('/api/login', login)
 //must be after bodyparser use



// app.get("/", function(req,res){
//     res.send('hello')
// });

// app.use("/api/test/", function(req,res){
//     res.send("this data is from the api/test endpoint")
// });

// app.use ("/about-me", function(req,res){
//     res.send('how old are you and where are you from')
// });

app.listen(3001, function(){
    console.log('app is listenting to 3001')
})