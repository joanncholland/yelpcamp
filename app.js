// npm install express, ejs --save
// sudo npm install nodemon --save -g

var express = require("express");
var app = express();

app.use(express.static("public"));

app.get("/", function(req, res){
  res.render("home.ejs");
});

app.get("/fallinlovewith/:thing", function(req,res){
  var thing = req.params.thing;
  res.render("love.ejs", {thing: thing});
});

app.get("/posts", function(req, res){
  var posts = [
    {title: "Title 1", author: "Author 1"},
    {title: "Title 2", author: "Author 2"},
    {title: "Title 3", author: "Author 3"}
  ];
  res.render("posts.ejs", {posts: posts});
});

app.listen(3000, function(){
  console.log("Server is listening!");
});
