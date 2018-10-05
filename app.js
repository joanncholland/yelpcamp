var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Campground = require('./models/campground');
var seedDB = require('./seeds.js');

seedDB();

mongoose.connect('mongodb://localhost/yelpcamp', {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

// Campground.create(
//   {
//     name: 'Granite Hills',
//     image: "https://farm3.staticflickr.com/2116/2164766085_0229ac3f08.jpg",
//     description: "This is a huge granite hill, no bathrooms. No water. Beautiful."
//   }, function(err, campground){
//     if(err){
//       console.log(err);
//     } else {
//       console.log("Newly created campground: ");
//       console.log(campground);
//     }
//   });

// INDEX - show all campgrounds
app.get('/', function(req,res){
  res.render('landing');
});

app.get('/campgrounds', function(req,res){
  // Get all campgrounds from db
  Campground.find({}, function(err, allCampgrounds){
    if(err){
      console.log(err);
    } else {
      res.render('index', {campgrounds: allCampgrounds});
    }
  });
});

// CREATE - create new campground
app.post('/campgrounds', function(req,res){
  // get data from form and create new object
  var name = req.body.name;
  var image = req.body.image;
  var description = req.body.description;
  var newCampground = {name: name, image: image, description: description};
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

// NEW - show form to create new campground
app.get('/campgrounds/new', function(req,res){
  res.render('new');
});

// SHOW - shows more info about one campground
app.get('/campgrounds/:id', function(req,res){
  // find the campground with provided ID
  var id = req.params.id;
  Campground.findById(id, function(err, foundCampground){
    if(err){
      console.log(err);
    } else {
      // render the show page for that campground
      res.render('show', {campground: foundCampground});
    }
  });
});

app.listen(3000, function(){
  console.log("Server has started...");
});
