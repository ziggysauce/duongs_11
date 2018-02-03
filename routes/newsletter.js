const express = require('express');
const router = express.Router({mergeParams: true});

const Year = require('../models/year');
const Newsletter = require('../models/newsletter');

// NEW newsletter
router.get('/new', (req,res) => {
  Year.findById(req.params.id, (err, year) => {
    if (err) {
      console.log(err)
    } else {
      res.render('newsletters/new', {year: year});
    }
  });
});

module.exports = router;