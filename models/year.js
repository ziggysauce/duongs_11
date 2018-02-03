const mongoose = require('mongoose');

const yearSchema = new mongoose.Schema({
  name: String,
  image: String,
  submissions: [
    {
      name: String,
      image: String,
      comments: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Comment'
        }
      ]
    }
  ]
});

module.exports = mongoose.model('Year', yearSchema);