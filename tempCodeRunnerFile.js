const express = require("express");
const bodyParser = require("body-parser");
const mysql = require('mysql');
const _ = require("lodash");
var path = require('path');
const { reset } = require("nodemon");
var db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'mysql',
    database : 'puparazzi'
})
db.connect(function(err) {
    if(err){
        throw err;
    }
    console.log('MySQL connected...');
    //var sql1="Create table customers(id INT PRIMARY KEY, name varchar(25), address varchar(255))";
    //db.query(sql1,function(err,result){
      //  if(err) throw err;
        //console.log("table created");
        var sql="INSERT into profile values (1, 'julie', 'pug', 2, 'narnia', 'rycbar123', 'martha', 27, 8403948575)";
        db.query(sql,function(err,result){
            if(err) throw err;
            console.log("record created");
    });
}) ;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", function (req, res){
    res.sendFile(__dirname + "/home.html");
});

app.get("/:pagename", function (req, res){
    const pgname = _.capitalize(req.params.pagename);
    console.log(req.params);
    if(pgname == "Home"){
        res.sendFile(__dirname + "/home.html");
    }
    if(pgname == "Sign"){
        res.sendFile(__dirname + "/sign.html");
    }
    if(pgname == "Signup"){
        res.sendFile(__dirname + "/signup.html");
    }
})

app.listen("3000", function(){
    console.log("Server started at port 3000");
})
