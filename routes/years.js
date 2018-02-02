const express = require('express');
const router = express.Router();

// INDEX: get all years
router.get('/', (req,res) => {
  res.render('years');
});

module.exports = router;