var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var index = require("./routes/index");
var students = require("./routes/students");
var config = require('./config');

var app = express();

//View Engine
var ejsEngine = require("ejs-locals");
app.engine("ejs",ejsEngine);
app.set("view engine","ejs");

//Set static folder 
app.use(express.static(path.join(__dirname,"client")));


//Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use("/", index);
app.use("/api", students);

app.listen(config.port, function(){
    console.log("Server started on port" + config.port)
});