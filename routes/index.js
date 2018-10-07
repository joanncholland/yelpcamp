var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');

// ==========================================
// AUTH ROUTES
// ==========================================

// SHOW REGISTER FORM
router.get('/register', function(req,res){
  res.render('register');
});

// HANDLER FOR REGISTER FORM
router.post('/register', function(req,res){
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
router.get('/login', function(req,res){
  res.render('login');
});

// HANDLER FOR LOGIN FORM
router.post('/login', passport.authenticate('local',
{
  successRedirect: '/campgrounds',
  failureRedirect: '/login'
}), function(req,res){

});

// LOGOUT ROUTE
router.get('/logout', function(req,res){
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

module.exports = router;
