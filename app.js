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
  image: String,
  description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

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
      res.render('campgrounds', {campgrounds: allCampgrounds});
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

app.get('/campgrounds/:id', function(req,res){
  // find the campground with provided ID
  // render the show page for that campground
  res.send("this will be the show page one day");
});

app.listen(3000, function(){
  console.log("Server has started...");
});

// RESTFUL ROUTES
// name    url       verb    desc.
// ===========================================
// INDEX   /dogs     GET     Display a list of all dogs
// NEW     /dogs/new GET     Displays form to make a new dog
// CREATE  /dogs     POST    Add new dog to DB
// SHOW    /dogs/:id GET     Shows info about one dog
