const mongoose = require('mongoose');
const validator = require('validator');

function validateURL(input) {
  return validator.isURL(input);
}

const { Schema } = mongoose;

const cardSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },

  link: {
    type: String,
    required: true,
    validate: validateURL,
  },

  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },

  likes: {
    type: [Schema.Types.ObjectId],
    default: [],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
