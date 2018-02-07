const express = require('express');
const router = express.Router();
const Year = require('../models/year');
const Newsletter = require('../models/newsletter');


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
router.post('/', (req,res) => {
  let name = req.body.name;
  let image = req.body.image;
  let year = {name: name, image: image};

  Year.create(year, (err, createdYear) => {
    if (err) {
      console.log(err);
    } else {
      // Redirect to years index
      console.log('year created: ', createdYear);
      res.redirect('/years');
    }
  });
});

// NEW: show form to create new year
router.get('/new', (req,res) => {
  res.render('years/new');
});

// SHOW: show newsletters from that year
router.get('/:id', (req,res) => {
  // Find year in DB with provided ID
  Year.findById(req.params.id).exec((err, foundYear) => {
    if (err || !foundYear) {
      // req.flash('error', 'Year not found');
      res.redirect('back');
    } else {
      Newsletter.find({}, (err, allNewsletters) => {
        if (err) {
          console.log(err);
        } else {
          // Year found
          // Render newsletter show template with that year
          res.render('newsletters', {year: foundYear, newsletters: allNewsletters});
        }
      });
    }
  });
});

module.exports = router;