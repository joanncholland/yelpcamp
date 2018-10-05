var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Campground = require('./models/campground');
var seedDB = require('./seeds.js');

// seedDB();

mongoose.connect('mongodb://localhost/yelpcamp', {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

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
  Campground.findById(id).populate('comments').exec(function(err, foundCampground){
    if(err){
      console.log(err);
    } else {
      console.log(foundCampground);
      // render the show page for that campground
      res.render('show', {campground: foundCampground});
    }
  });
});

app.listen(3000, function(){
  console.log("Server has started...");
});
