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
//     name: 'Granite Hills',
//     image: "https://farm3.staticflickr.com/2116/2164766085_0229ac3f08.jpg"
//   }, function(err, campground){
//     if(err){
//       console.log(err);
//     } else {
//       console.log("Newly created campground: ");
//       console.log(campground);
//     }
//   });

app.get('/', function(req,res){
  res.render('landing');
});

app.get('/campgrounds', function(req,res){
  // Get all campgrounds from db
  Campground.find({}, function(err, allCampgrounds){
    if(err){
      console.log(err);
    } else {
      res.render('campgrounds', {campgrounds: allCampgrounds});
    }
  });
});

app.post('/campgrounds', function(req,res){
  // get data from form and create new object
  var name = req.body.name;
  var image = req.body.image;
  var newCampground = {name: name, image: image};
  // Create a new campground and save to DB
  Campground.create(newCampground, function(err, newlyCreated){
    if(err){
      console.log(err);
    } else {
      console.log(newlyCreated);
      res.redirect('/campgrounds');
    }
  });
});

app.get('/campgrounds/new', function(req,res){
  res.render('new');
});

app.listen(3000, function(){
  console.log("Server has started...");
});
