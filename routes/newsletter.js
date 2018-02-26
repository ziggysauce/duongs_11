const express = require('express');
const router = express.Router({mergeParams: true});

const Year = require('../models/year');
const Newsletter = require('../models/newsletter');
const middleware = require('../middleware')

// NEW newsletter
router.get('/new', middleware.isLoggedIn, (req,res) => {
  Year.findById(req.params.id, (err, year) => {
    if (err) {
      console.log(err)
    } else {
      console.log('year data: ', year);
      res.render('newsletters/new', {year: year});
    }
  });
});

// CREATE newsletter
router.post('/', middleware.isLoggedIn, (req,res) => {
  Year.findById(req.params.id, (err, year) => {
    if (err) {
      console.log('Error: ', err);
      res.redirect('/years');
    } else {
      Newsletter.create(req.body.submission, (err, newsletter) => {
        if (err) {
          // req.flash('error', 'Something went wrong');
          console.log('An error happened: ', err);
        } else {
          newsletter.save();
          console.log('this is the newsletter info: ', newsletter);
          console.log('this is the year selected: ', year);
          year.submissions.push(newsletter);
          year.save();
          console.log('newsletter created: ', newsletter);
          console.log('this is the year data now: ', year);

          // req.flash('success', 'Successfully added a new newsletter');
          res.redirect('/years/' + year._id);
        }
      });
    }
  });
});

module.exports = router;