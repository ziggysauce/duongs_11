const express = require('express');
const router = express.Router({mergeParams: true});

const Year = require('../models/year');
const Newsletter = require('../models/newsletter');

// NEW newsletter
router.get('/:id/newsletters/new', (req,res) => {
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
router.post('/:id/newsletters', (req,res) => {
  Year.findById(req.params.id, (err, year) => {
    if (err) {
      console.log('Error: ', err);
      res.redirect('/years');
    } else {
      Newsletter.create(req.body.submission, (err, submission) => {
        if (err) {
          // req.flash('error', 'Something went wrong');
          console.log('An error happened: ', err);
        } else {
          submission.save();
          year.submissions.push(submission._id);
          year.save();
          console.log(submission);
          // req.flash('success', 'Successfully added a new newsletter');
          res.redirect('/years/' + year._id);
        }
      });
    }
  });
});

module.exports = router;