var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

var campgrounds = [
  {name: 'Salmon Creek', image: "https://pixabay.com/get/e83db40e28fd033ed1584d05fb1d4e97e07ee3d21cac104496f8c470aee9bdb9_340.jpg"},
  {name: 'Granite Hills', image: "https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104496f8c470aee9bdb9_340.jpg"},
  {name: "Mountain Goats' Rest", image: "https://farm1.staticflickr.com/82/225912054_690e32830d.jpg"},
  {name: 'Salmon Creek', image: "https://pixabay.com/get/e83db40e28fd033ed1584d05fb1d4e97e07ee3d21cac104496f8c470aee9bdb9_340.jpg"},
  {name: 'Granite Hills', image: "https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104496f8c470aee9bdb9_340.jpg"},
  {name: "Mountain Goats' Rest", image: "https://farm1.staticflickr.com/82/225912054_690e32830d.jpg"},
  {name: 'Salmon Creek', image: "https://pixabay.com/get/e83db40e28fd033ed1584d05fb1d4e97e07ee3d21cac104496f8c470aee9bdb9_340.jpg"},
  {name: 'Granite Hills', image: "https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104496f8c470aee9bdb9_340.jpg"},
  {name: "Mountain Goats' Rest", image: "https://farm1.staticflickr.com/82/225912054_690e32830d.jpg"}
];

app.get('/', function(req,res){
  res.render('landing');
});

app.get('/campgrounds', function(req,res){
  res.render('campgrounds', {campgrounds: campgrounds});
});

app.post('/campgrounds', function(req,res){
  // get data from form and add to campgrounds array
  var name = req.body.name;
  var image = req.body.image;
  var newCampground = {name: name, image: image};
  campgrounds.push(newCampground);
  // redirect back to campgrounds page
  res.redirect('/campgrounds');
});

app.get('/campgrounds/new', function(req,res){
  res.render('new');
});

app.listen(3000, function(){
  console.log("Server has started...");
});
