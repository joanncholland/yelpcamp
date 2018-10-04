var express = require('express');
var app = express();

app.set('view engine', 'ejs');

app.get('/', function(req,res){
  res.render('landing');
});

app.get('/campgrounds', function(req,res){
  var campgrounds = [
    {name: 'Salmon Creek', image: "https://pixabay.com/get/e83db40e28fd033ed1584d05fb1d4e97e07ee3d21cac104496f8c470aee9bdb9_340.jpg"},
    {name: 'Granite Holls', image: "https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104496f8c470aee9bdb9_340.jpg"},
    {name: "Mountain Goats' Rest", image: "https://farm1.staticflickr.com/82/225912054_690e32830d.jpg"}
  ];

  res.render('campgrounds', {campgrounds: campgrounds});
});

app.listen(3000, function(){
  console.log("Server has started...");
});
