const { Schema } = require('mongoose');

const articleSchema = new Schema({

  description: {
    type: String,
    required: true,
  },
  uniqueId: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  link: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    }
});

module.exports = articleSchema;