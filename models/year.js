const mongoose = require('mongoose');

const yearSchema = new mongoose.Schema({
  name: String,
  image: String,
  submissions: [
    {
      name: String,
      image: String,
      pdf: String,
    }
  ]
});

module.exports = mongoose.model('Year', yearSchema);