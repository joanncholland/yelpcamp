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

var commentRoutes = require('./routes/comments'),
    campgroundRoutes = require('./routes/campgrounds'),
    indexRoutes = require('./routes/index');

// seedDB();

mongoose.connect('mongodb://localhost/yelpcamp', {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));


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

app.use(indexRoutes);
app.use(commentRoutes);
app.use(campgroundRoutes);

app.listen(3000, function(){
  console.log("Server has started...");
});
