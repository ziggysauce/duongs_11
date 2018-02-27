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
              res.render('newsletters', {years: allYears, year: foundYear, newsletters: allNewsletters});
            }
          });
        }
      });
    }
  });
});

// DESTROY NEWSLETTER ROUTE
router.delete('/:id', middleware.isLoggedIn, (req,res) => {
  Year.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      res.redirect('/years');
    } else {
      res.redirect('/years');
    }
  });
});

// UPDATE NEWSLETTER ROUTE
router.put('/:id', middleware.isLoggedIn, (req,res) => {
  Year.findById(req.params.id, (err, year) => {
    if (err) {
      console.log('Error: ', err);
      res.redirect('/years');
    } else {
      // Find and update correct newsletter
      const updated = {
        name: req.body.submissions.name,
        image: req.body.submissions.image,
        pdf: req.body.submissions.pdf
      }
      console.log('new data: ', updated);
      Year.update(
        req.params.id,
        { $set:{ "submissions.$.[0]": updated } },
        { upsert: true }, 
        function(err){

        }
    );
      console.log('this is the year data: ', year.submissions);
      console.log('this is the matching newsletter ID: ', req.body.submissions._id);
      // year.submissions.map((submission, index) => {
      //   if (submission._id == req.body.submissions._id) {
      //     console.log('this is the matching submission: ', submission);
      //     submission.update(req.body.submissions._id, updated, (err, updatedStuff) => {
      //       if (err) {
      //         res.redirect('years/');
      //       } else {
      //         console.log('final update: ', updatedStuff);
      //       }
      //     });

      //   } else {
      //     console.log('this is the submissions id: ', submission._id);
      //   }
      // });
      res.redirect('/years');
    }
  });
});

module.exports = router;


// req.body.submission,