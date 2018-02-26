const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');

// Landing Page Root Route
router.get('/', (req,res) => {
  res.render('landing');
});

// ==========================
// AUTH ROUTES ==============
// ==========================

// Show register forms
router.get('/register', (req,res) => {
  res.render('register');
});

// Handle sign up logic
router.post('/register', (req,res) => {
  const newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, (err, user) => {
    if (err) {
      req.flash('error', err.message);
      return res.render('register', {'error': err.message});
    }
    passport.authenticate('local')(req, res, () => {
      req.flash('success', 'Welcome to Duongs 11' + user.username);
      res.redirect('/years');
    });
  });
});

// Show login form
router.get('/login', (req,res) => {
  res.render('login');
});

// Handle login logic
router.post('/login', passport.authenticate('local', {
  successRedirect: '/years',
  failureRedirect: '/login'
  }), (req,res) => {
});

// Logout route
router.get('/logout', (req,res) => {
  req.logout();
  req.flash('success', 'Logged you out!');
  res.redirect('/years');
});

module.exports = router;