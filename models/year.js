const mongoose = require('mongoose');

const yearSchema = new mongoose.Schema({
  name: String,
  image: String,
  submissions: [
    {
      // name: String,
      // image: String,
      // pdf: String,
      type: mongoose.Schema.Types.ObjectId,
      ref: "Newsletter"
    }
  ]
});

module.exports = mongoose.model('Year', yearSchema);