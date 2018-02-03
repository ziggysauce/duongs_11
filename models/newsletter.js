const mongoose = require('mongoose');

const newsletterSchema = mongoose.Schema({
  title: String,
  image: String,
  link: String,
});

module.exports = mongoose.model('Newsletter', newsletterSchema);