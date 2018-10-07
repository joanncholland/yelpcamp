var express = require('express');
var router = express.Router();
var Campground = require('../models/campground');

// ==========================================
// CAMPGROUND ROUTES
// ==========================================

// INDEX - show all campgrounds
router.get('/', function(req,res){
  res.render('landing');
});

router.get('/campgrounds', function(req,res){
  // Get all campgrounds from db
  Campground.find({}, function(err, allCampgrounds){
    if(err){
      console.log(err);
    } else {
      res.render('campgrounds/index', {campgrounds: allCampgrounds});
    }
  });
});

// CREATE - create new campground
router.post('/campgrounds', isLoggedIn, function(req,res){
  // get data from form and create new object
  var name = req.body.name;
  var image = req.body.image;
  var description = req.body.description;
  var author = {
    id: req.user._id,
    username: req.user.username
  }
  var newCampground = {name: name, image: image, description: description, author: author};
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
router.get('/campgrounds/new', isLoggedIn, function(req,res){
  res.render('campgrounds/new');
});

// SHOW - shows more info about one campground
router.get('/campgrounds/:id', function(req,res){
  // find the campground with provided ID
  var id = req.params.id;
  Campground.findById(id).populate('comments').exec(function(err, foundCampground){
    if(err){
      console.log(err);
    } else {
      console.log(foundCampground);
      // render the show page for that campground
      res.render('campgrounds/show', {campground: foundCampground});
    }
  });
});

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/login');
}

module.exports = router;
