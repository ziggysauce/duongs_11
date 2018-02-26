// All middleware functions
const Year = require('../models/year');
const Newsletter = require('../models/newsletter');

const middlewareObj = {};

middlewareObj.isLoggedIn = (req,res,next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('error', 'You need to be logged in first!');
  res.redirect('/login');
}

module.exports = middlewareObj;