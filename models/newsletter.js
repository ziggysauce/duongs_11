const mongoose = require('mongoose');

const newsletterSchema = mongoose.Schema({
  name: String,
  image: String,
  pdf: String,
});

module.exports = mongoose.model('Newsletter', newsletterSchema);