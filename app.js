var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Campground = require('./models/campground');
var passport = require('passport');
var LocalStrategy = require('passport-local')
var Comment = require('./models/comment');
var User = require('./models/user');
var seedDB = require('./seeds.js');

// seedDB();

mongoose.connect('mongodb://localhost/yelpcamp', {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');


// PASSPORT CONFIG
app.use(require('express-session')({
  secret: 'this is a secret sentence',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
  res.locals.currentUser = req.user;
  next();
});

// ==========================================
// CAMPGROUND ROUTES
// ==========================================

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
      res.render('campgrounds/index', {campgrounds: allCampgrounds});
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
  res.render('campgrounds/new');
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
      res.render('campgrounds/show', {campground: foundCampground});
    }
  });
});

// ==========================================
// COMMENTS ROUTES
// ==========================================

// NEW
app.get('/campgrounds/:id/comments/new', isLoggedIn, function(req,res){
  Campground.findById(req.params.id, function(err, campground){
    if(err){
      console.log(err);
    } else {
      res.render('comments/new', {campground: campground})
    }
  });
});

// CREATE
app.post('/campgrounds/:id/comments', isLoggedIn, function(req,res){
  Campground.findById(req.params.id, function(err, campground){
    if(err){
      console.log(err);
      res.redirect('/campgrounds');
    } else {
      Comment.create(req.body.comment, function(err, comment){
        if(err){
          console.log(err);
        } else {
          campground.comments.push(comment);
          campground.save();
          res.redirect('/campgrounds/'+campground._id);
        }
      });
    }
  });
});

// ==========================================
// AUTH ROUTES
// ==========================================

// SHOW REGISTER FORM
app.get('/register', function(req,res){
  res.render('register');
});

// HANDLER FOR REGISTER FORM
app.post('/register', function(req,res){
  User.register(new User({username: req.body.username}), req.body.password, function(err, user){
    if(err){
      console.log(err);
      res.render('register');
    }
    passport.authenticate('local')(req,res, function(){
      res.redirect('/campgrounds');
    });
  });
});

// SHOW LOGIN FORM
app.get('/login', function(req,res){
  res.render('login');
});

// HANDLER FOR LOGIN FORM
app.post('/login', passport.authenticate('local',
{
  successRedirect: '/campgrounds',
  failureRedirect: '/login'
}), function(req,res){

});

// LOGOUT ROUTE
app.get('/logout', function(req,res){
  req.logout();
  res.redirect('/campgrounds');
});

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    console.log('logged int');
    return next();
  }
  res.redirect('/login');
}

app.listen(3000, function(){
  console.log("Server has started...");
});
