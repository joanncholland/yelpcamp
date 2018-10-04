var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/yelpcamp', {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//   {
//     name: 'Salmon Creek',
//     image: "https://pixabay.com/get/e83db40e28fd033ed1584d05fb1d4e97e07ee3d21cac104496f8c470aee9bdb9_340.jpg"
//   }, function(err, campground){
//     if(err){
//       console.log(err);
//     } else {
//       console.log("Newly created campground: ");
//       console.log(campground);
//     }
//   });

// var campgrounds = [
//   {name: 'Salmon Creek', image: "https://pixabay.com/get/e83db40e28fd033ed1584d05fb1d4e97e07ee3d21cac104496f8c470aee9bdb9_340.jpg"},
//   {name: 'Granite Hills', image: "https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104496f8c470aee9bdb9_340.jpg"},
//   {name: "Mountain Goats' Rest", image: "https://farm1.staticflickr.com/82/225912054_690e32830d.jpg"},
//   {name: 'Salmon Creek', image: "https://pixabay.com/get/e83db40e28fd033ed1584d05fb1d4e97e07ee3d21cac104496f8c470aee9bdb9_340.jpg"},
//   {name: 'Granite Hills', image: "https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104496f8c470aee9bdb9_340.jpg"},
//   {name: "Mountain Goats' Rest", image: "https://farm1.staticflickr.com/82/225912054_690e32830d.jpg"},
//   {name: 'Salmon Creek', image: "https://pixabay.com/get/e83db40e28fd033ed1584d05fb1d4e97e07ee3d21cac104496f8c470aee9bdb9_340.jpg"},
//   {name: 'Granite Hills', image: "https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104496f8c470aee9bdb9_340.jpg"},
//   {name: "Mountain Goats' Rest", image: "https://farm1.staticflickr.com/82/225912054_690e32830d.jpg"}
// ];

app.get('/', function(req,res){
  res.render('landing');
});

app.get('/campgrounds', function(req,res){
  // Get all campgrounds from db
  Campground.find({}, function(err, campgrounds){
    if(err){
      console.log(err);
    } else {
      res.render('campgrounds', {campgrounds: campgrounds});
    }
  });
  res.render('campgrounds');
  // res.send(Campground.find());
});

app.post('/campgrounds', function(req,res){
  // get data from form and add to campgrounds array
  var name = req.body.name;
  var image = req.body.image;
  var newCampground = {name: name, image: image};
  // campgrounds.push(newCampground);
  // Create a new campground and save to DB
  Campground.create(newCampground, function(err, newlyCreated){
    if(err){
      console.log(err);
    } else {
      res.redirect('/campgrounds');
    }
  });
  // redirect back to campgrounds page
  res.redirect('/campgrounds');
});

app.get('/campgrounds/new', function(req,res){
  res.render('new');
});

app.listen(3000, function(){
  console.log("Server has started...");
});
