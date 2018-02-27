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

// EDIT NEWSLETTER ROUTE
router.get('/:id/edit', middleware.isLoggedIn, (req,res) => {
  let year_id = ('this is years id: ', req.baseUrl.split('years/').pop().split('/').shift());
  Year.findById(year_id, (err, year) => {
    if (err) {
      console.log('Error: ', err);
      res.redirect('/years');
    } else {
      Newsletter.findById(req.params.id, (err, foundNewsletter) => {
        console.log('current year: ', year);
        console.log('found newsletter: ', foundNewsletter);
        res.render('newsletters/edit', {year: year, submissions: foundNewsletter});
      });
    }
  });
});


module.exports = router;