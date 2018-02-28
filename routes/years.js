const express = require('express');
const router = express.Router();
const Year = require('../models/year');
const Newsletter = require('../models/newsletter');
const middleware = require('../middleware')



// INDEX: get all years
router.get('/', (req,res) => {
  Year.find({}, (err, allYears) => {
    if (err) {
      console.log(err);
    } else {
      res.render('years', {years: allYears});
    }
  });
});

// CREATE: add new year to DB
router.post('/', middleware.isLoggedIn, (req,res) => {
  let name = req.body.name;
  let image = req.body.image;
  let year = {name: name, image: image};

  Year.create(year, (err, createdYear) => {
    if (err) {
      console.log(err);
    } else {
      // Redirect to years index
      console.log('year created: ', createdYear);
      req.flash('success', 'Successfully added a new year');
      res.redirect('/years');
    }
  });
});

// NEW: show form to create new year
router.get('/new', middleware.isLoggedIn, (req,res) => {
  res.render('years/new');
});

// SHOW: show newsletters from that year
router.get('/:id', (req,res) => {
  // Store all years for navbar
  Year.find({}, (err, allYears) => {
    if (err) {
      console.log(err);
    } else {
      // Find year in DB with provided ID
      Year.findById(req.params.id).populate('submissions').exec((err, foundYear) => {
        if (err || !foundYear) {
          req.flash('error', 'Year not found');
          res.redirect('back');
        } else {
          Newsletter.find({}, (err, allNewsletters) => {
            if (err) {
              console.log(err);
            } else {
              // Year found
              // Render newsletter show template with that year
              res.render('newsletters', {years: allYears, year: foundYear, newsletters: allNewsletters});
            }
          });
        }
      });
    }
  });
});

// EDIT - shows page for specific newsletter to edit
router.get('/:id/edit', middleware.isLoggedIn, (req,res) => {
  Year.findById(req.params.id, (err, foundYear) => {
    res.render('years/edit', {year: foundYear})
  });
});


// UPDATE YEAR ROUTE
router.put('/:id', middleware.isLoggedIn, (req,res) => {
  // Find and update correct year
  Year.findByIdAndUpdate(req.params.id, req.body.year, (err, updatedYear) => {
    if (err) {
      res.redirect('/years');
    } else {
      req.flash('success', 'Successfully updated year');
      res.redirect('/years');
    }
  });
});

// DESTROY YEAR ROUTE
router.delete('/:id', middleware.isLoggedIn, (req,res) => {
  Year.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      req.flash('error', 'Could not find year');
      res.redirect('/years');
    } else {
      req.flash('success', 'Successfully deleted the year');
      res.redirect('/years');
    }
  });
});

// UPDATE NEWSLETTER ROUTE
router.put('/:id', middleware.isLoggedIn, (req,res) => {
  console.log('this is the params: ', req.params);
  console.log('this is req.body: ', req.body);
  Year.findById(req.params.id, (err, year) => {
    if (err) {
      console.log('Error: ', err);
      req.flash('error', 'Could not update newsletter');
      res.redirect('/years');
    } else {
      // Find and update correct newsletter
      Newsletter.findByIdAndUpdate(req.body.submissions._id, req.body.submissions, (err, updatedNewsletter) => {
        if (err) {
          res.redirect('/years/' + req.params.id);
        } else {
          // console.log('current year 2: ', year);
          // console.log('found newsletter to update: ', updatedNewsletter);
          req.flash('success', 'Successfully updated the newsletter');
          res.redirect('/years/' + req.params.id + '/newsletters/' + req.body.submissions._id);
        }
      });
    }
  });
});

module.exports = router;