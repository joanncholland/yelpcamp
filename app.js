// npm install express, ejs --save

var express = require("express");
var app = express();

app.get("/", function(req, res){
  res.render("home.ejs");
});

app.get("/fallinlovewith/:thing", function(req,res){
  var thing = req.params.thing;
  res.render("love.ejs", {thing: thing});
});

app.listen(3000, function(){
  console.log("Server is listening!");
});
